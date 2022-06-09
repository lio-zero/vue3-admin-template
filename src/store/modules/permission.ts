import type { AppRouteRecordRaw, Menu } from '@/router/types'

import { store } from '@/store'
import { defineStore } from 'pinia'
import { asyncRoutes } from '@/router/routes'

import projectSetting from '@/settings/projectSetting'
import { transformRouteToMenu } from '@/router/helper/menuHelper'
import { transformObjToRoute, flatMultiLevelRoutes } from '@/router/helper/routeHelper'
import { NotFound } from '@/router/routes/basic'
import { filter } from '@/utils/helper/treeHelper'
import { PermissionModeEnum } from '@/enums/appEnum'
import { useUserStore } from './user'
import { useAppStoreWithOut } from './app'
import { PageEnum } from '@/enums/pageEnum'
import { getPermCode } from '@/api/user'
import { getMenuList } from '@/api/menu'

interface PermissionState {
  // 权限代码列表
  permCodeList: string[] | number[]
  // 是否已动态添加路由
  isDynamicAddedRoute: boolean
  // 触发菜单更新
  lastBuildMenuTime: number
  // 后台菜单列表
  backMenuList: Menu[]
  frontMenuList: Menu[]
}

export const usePermissionStore = defineStore({
  id: 'Permission',
  state: (): PermissionState => ({
    permCodeList: [],
    isDynamicAddedRoute: false,
    lastBuildMenuTime: 0,
    backMenuList: [],
    frontMenuList: []
  }),
  getters: {
    getBackMenuList(): Menu[] {
      return this.backMenuList
    },
    getFrontMenuList(): Menu[] {
      return this.frontMenuList
    },
    getIsDynamicAddedRoute(): boolean {
      return this.isDynamicAddedRoute
    }
  },
  actions: {
    setFrontMenuList(list: Menu[]) {
      this.frontMenuList = list
    },
    setBackMenuList(list: Menu[]) {
      this.backMenuList = list
      list?.length > 0 && this.setLastBuildMenuTime()
    },
    setLastBuildMenuTime() {
      this.lastBuildMenuTime = new Date().getTime()
    },
    setPermCodeList(codeList: string[]) {
      this.permCodeList = codeList
    },
    setDynamicAddedRoute(added: boolean) {
      this.isDynamicAddedRoute = added
    },
    resetState(): void {
      this.isDynamicAddedRoute = false
      this.permCodeList = []
      this.backMenuList = []
      this.lastBuildMenuTime = 0
    },
    async changePermissionCode() {
      const codeList = await getPermCode()
      this.setPermCodeList(codeList)
    },
    async buildRoutesAction(): Promise<AppRouteRecordRaw[]> {
      const userStore = useUserStore()
      const appStore = useAppStoreWithOut()

      let routes: AppRouteRecordRaw[] = []
      const roleList = toRaw(userStore.getRoleList) || []
      const { permissionMode = projectSetting.permissionMode } = appStore.getProjectConfig

      const routeFilter = (route: AppRouteRecordRaw) => {
        const { meta } = route
        const { roles } = meta || {}
        if (!roles) return true
        return roleList.some(role => roles.includes(role))
      }

      const routeRemoveIgnoreFilter = (route: AppRouteRecordRaw) => {
        const { meta } = route
        const { ignoreRoute } = meta || {}
        return !ignoreRoute
      }

      /**
       * @description 根据设置的首页 path，修正 routes 中的 affix 标记（固定首页）
       * */
      const patchHomeAffix = (routes: AppRouteRecordRaw[]) => {
        if (!routes || routes.length === 0) return
        let homePath: string = userStore.getUserInfo.homePath || PageEnum.BASE_HOME
        function patcher(routes: AppRouteRecordRaw[], parentPath = '') {
          if (parentPath) parentPath = parentPath + '/'
          routes.forEach((route: AppRouteRecordRaw) => {
            const { path, children, redirect } = route
            const currentPath = path.startsWith('/') ? path : parentPath + path
            if (currentPath === homePath) {
              if (redirect) {
                homePath = route.redirect! as string
              } else {
                route.meta = Object.assign({}, route.meta, { affix: true })
                throw new Error('end')
              }
            }
            children && children.length > 0 && patcher(children, currentPath)
          })
        }
        try {
          patcher(routes)
        } catch (e) {
          // 已处理完毕跳出循环
        }
        return
      }

      switch (permissionMode) {
        case PermissionModeEnum.ROLE:
          routes = filter(asyncRoutes, routeFilter)
          routes = routes.filter(routeFilter)
          // 将多级路由转换为二级路由
          routes = flatMultiLevelRoutes(routes)
          break

        case PermissionModeEnum.ROUTE_MAPPING:
          routes = filter(asyncRoutes, routeFilter)
          routes = routes.filter(routeFilter)
          const menuList = transformRouteToMenu(routes, true)
          routes = filter(routes, routeRemoveIgnoreFilter)
          routes = routes.filter(routeRemoveIgnoreFilter)
          menuList.sort((a, b) => {
            return (a.meta?.orderNo || 0) - (b.meta?.orderNo || 0)
          })

          this.setFrontMenuList(menuList)
          // Convert multi-level routing to level 2 routing
          routes = flatMultiLevelRoutes(routes)
          break

        // 如果您确定不需要执行后台动态权限，请在下面对整个判断进行评论
        case PermissionModeEnum.BACK:
          console.log('菜单加载中...')

          let routeList: AppRouteRecordRaw[] = []
          try {
            this.changePermissionCode()
            routeList = (await getMenuList()) as AppRouteRecordRaw[]
          } catch (error) {
            console.error(error)
          }

          // 动态引入组件
          routeList = transformObjToRoute(routeList)

          // 后台路由到菜单结构
          const backMenuList = transformRouteToMenu(routeList)
          this.setBackMenuList(backMenuList)

          // 删除 meta.ignoreRoute 项
          routeList = filter(routeList, routeRemoveIgnoreFilter)
          routeList = routeList.filter(routeRemoveIgnoreFilter)

          routeList = flatMultiLevelRoutes(routeList)
          routes = [NotFound, ...routeList]
          break
      }

      // routes.push(ERROR_LOG_ROUTE)
      patchHomeAffix(routes)
      return routes
    }
  }
})

export function usePermissionStoreWithOut() {
  return usePermissionStore(store)
}
