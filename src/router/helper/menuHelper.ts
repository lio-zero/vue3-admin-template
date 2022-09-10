import { cloneDeep } from 'lodash-es'
import type { RouteParams } from 'vue-router'
import { toRaw } from 'vue'
import type { AppRouteModule, AppRouteRecordRaw, Menu, MenuModule } from '@/router/types'

import { findPath, treeMap } from '@/utils/helper/treeHelper'
import { isUrl } from '@/utils/is'

export function getAllParentPath<T = Recordable>(treeData: T[], path: string) {
  const menuList = findPath(treeData, n => n.path === path) as Menu[]
  return (menuList || []).map(item => item.path)
}

function joinParentPath(menus: Menu[], parentPath = '') {
  for (let index = 0; index < menus.length; index++) {
    const menu = menus[index]
    // https://next.router.vuejs.org/guide/essentials/nested-routes.html
    // 注意，以 / 开头的嵌套路径将被视为根路径。
    // 这允许您利用组件嵌套，而不必使用嵌套 URL。
    if (!(menu.path.startsWith('/') || isUrl(menu.path))) {
      // 路径不是以 / 开头，也不是 url，请加入父路径
      menu.path = `${parentPath}/${menu.path}`
    }
    if (menu?.children?.length)
      joinParentPath(menu.children, menu.meta?.hidePathForChildren ? parentPath : menu.path)
  }
}

// 分析菜单模块
export function transformMenuModule(menuModule: MenuModule): Menu {
  const { menu } = menuModule

  const menuList = [menu]

  joinParentPath(menuList)
  return menuList[0]
}

export function transformRouteToMenu(routeModList: AppRouteModule[], routerMapping = false) {
  const cloneRouteModList = cloneDeep(routeModList)
  const routeList: AppRouteRecordRaw[] = []

  cloneRouteModList.forEach((item) => {
    if (routerMapping && item.meta?.hideChildrenInMenu && typeof item.redirect === 'string')
      item.path = item.redirect

    if (item.meta?.single) {
      const realItem = item?.children?.[0]
      realItem && routeList.push(realItem)
    }
    else {
      routeList.push(item)
    }
  })
  const list = treeMap(routeList, {
    conversion: (node: AppRouteRecordRaw) => {
      const { meta: { title, hideMenu = false } = {} } = node
      return {
        ...(node.meta || {}),
        meta: node.meta,
        name: title,
        hideMenu,
        path: node.path,
        ...(node.redirect ? { redirect: node.redirect } : {}),
      }
    },
  })

  joinParentPath(list)
  return cloneDeep(list)
}

/**
 * 具有给定参数的配置菜单
 */
const menuParamRegex = /(?::)([\s\S]+?)((?=\/)|$)/g
export function configureDynamicParamsMenu(menu: Menu, params: RouteParams) {
  const { path, paramPath } = toRaw(menu)
  let realPath = paramPath || path
  const matchArr = realPath.match(menuParamRegex)

  matchArr?.forEach((it) => {
    const realIt = it.substr(1)
    if (params[realIt])
      realPath = realPath.replace(`:${realIt}`, params[realIt] as string)
  })
  // 保存原始参数路径。
  if (!paramPath && matchArr && matchArr.length > 0)
    menu.paramPath = path

  menu.path = realPath
  // children
  menu.children?.forEach(item => configureDynamicParamsMenu(item, params))
}
