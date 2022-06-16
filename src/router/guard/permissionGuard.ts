import type { Router, RouteRecordRaw } from 'vue-router'
import { getPageTitle } from '@/utils/get-page-title'
import { usePermissionStoreWithOut } from '@/store/modules/permission'
import { useUserStoreWithOut } from '@/store/modules/user'

import { PAGE_NOT_FOUND_ROUTE } from '@/router/routes/basic'
import { PageEnum } from '@/enums/pageEnum'

const LOGIN_PATH = PageEnum.BASE_LOGIN
const whitePathList: PageEnum[] = [LOGIN_PATH]

export function createPermissionGuard(router: Router) {
  const userStore = useUserStoreWithOut()
  const permissionStore = usePermissionStoreWithOut()

  router.beforeEach(async (to: any, from: any, next) => {
    document.title = getPageTitle(to.meta.title)

    const token = userStore.getToken

    // 白名单
    if (whitePathList.includes(to.path as PageEnum)) {
      // 是否是登录页，并且 token 是否存在
      if (to.path === LOGIN_PATH && token) {
        const isSessionTimeout = userStore.getSessionTimeout
        try {
          await userStore.afterLoginAction()
          if (!isSessionTimeout) {
            next((to.query?.redirect as string) || '/')
            return
          }
        } catch {}
      }
      next()
      return
    }

    // token 不存在
    if (!token) {
      // 您可以不经许可访问。您需要设置路由 meta.ignoreAuth 为 true
      if (to.meta.ignoreAuth) {
        next()
        return
      }

      // 重定向登录页
      const redirectData: { path: string; replace: boolean; query?: Recordable<string> } = {
        path: LOGIN_PATH,
        replace: true
      }

      if (to.path) {
        redirectData.query = {
          ...redirectData.query,
          redirect: to.path
        }
      }

      next(redirectData)
      return
    }

    // 处理登录后跳转到 404 页
    if (
      from.path === LOGIN_PATH &&
      to.name === PAGE_NOT_FOUND_ROUTE.name &&
      to.fullPath !== (userStore.getUserInfo.homePath || PageEnum.BASE_HOME)
    ) {
      next(userStore.getUserInfo.homePath || PageEnum.BASE_HOME)
      return
    }

    // 在上次获取时间为空时获取 userinfo
    if (userStore.getLastUpdateTime === 0) {
      try {
        await userStore.getUserInfoAction()
      } catch (err) {
        next()
        return
      }
    }

    if (permissionStore.getIsDynamicAddedRoute) {
      next()
      return
    }

    const routes = await permissionStore.buildRoutesAction()

    routes.forEach(route => {
      router.addRoute(route as unknown as RouteRecordRaw)
    })

    router.addRoute(PAGE_NOT_FOUND_ROUTE as unknown as RouteRecordRaw)

    permissionStore.setDynamicAddedRoute(true)

    if (to.name === PAGE_NOT_FOUND_ROUTE.name) {
      // 动态添加路由后，此处应当重定向到 fullPath，否则会加载 404 页面内容
      next({ path: to.fullPath, replace: true, query: to.query })
    } else {
      const redirectPath = (from.query.redirect || to.path) as string
      const redirect = decodeURIComponent(redirectPath)
      const nextData = to.path === redirect ? { ...to, replace: true } : { path: redirect }
      next(nextData)
    }
  })
}
