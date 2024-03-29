import type { RouteRecordNormalized, Router } from 'vue-router'
import { cloneDeep, omit } from 'lodash-es'
import { createRouter, createWebHashHistory } from 'vue-router'
import type { AppRouteModule, AppRouteRecordRaw } from '@/router/types'

import { EXCEPTION_COMPONENT, LAYOUT, getParentLayout } from '@/router/constant'
import { warn } from '@/utils/log'

export type LayoutMapKey = 'LAYOUT'

const LayoutMap = new Map<string, () => Promise<typeof import('*.vue')>>()

LayoutMap.set('LAYOUT', LAYOUT)

let dynamicViewsModules: Record<string, () => Promise<Recordable>>

// 动态导入路由
function asyncImportRoute(routes: AppRouteRecordRaw[] | undefined) {
  dynamicViewsModules = dynamicViewsModules || import.meta.glob('../../views/**/*.{vue,tsx}')
  if (!routes)
    return
  routes.forEach((item) => {
    if (!item.component && item.meta?.frameSrc)
      item.component = 'IFRAME'

    const { component, name } = item
    const { children } = item
    if (component) {
      const layoutFound = LayoutMap.get(component.toUpperCase())
      if (layoutFound)
        item.component = layoutFound

      else
        item.component = dynamicImport(dynamicViewsModules, component as string)
    }
    else if (name) {
      item.component = getParentLayout()
    }
    children && asyncImportRoute(children)
  })
}

function dynamicImport(
  dynamicViewsModules: Record<string, () => Promise<Recordable>>,
  component: string,
) {
  const keys = Object.keys(dynamicViewsModules)
  const matchKeys = keys.filter((key) => {
    const k = key.replace('../../views', '')
    const startFlag = component.startsWith('/')
    const endFlag = component.endsWith('.vue') || component.endsWith('.tsx')
    const startIndex = startFlag ? 0 : 1
    const lastIndex = endFlag ? k.length : k.lastIndexOf('.')
    return k.substring(startIndex, lastIndex) === component
  })
  if (matchKeys?.length === 1) {
    const matchKey = matchKeys[0]
    return dynamicViewsModules[matchKey]
  }
  else if (matchKeys?.length > 1) {
    warn(
      '请不要在 views 文件夹下相同层次目录中创建具有相同文件名的 `.vue` 和 `.tsx` 文件。这将导致动态引入失败',
    )
  }
  else {
    warn(`在 src/views/ 下找不到\`${component}.vue\` 或 \`${component}.tsx\`, 请自行创建!`)
    return EXCEPTION_COMPONENT
  }
}

// 将背景对象转换为路由对象
export function transformObjToRoute<T = AppRouteModule>(routeList: AppRouteModule[]): T[] {
  routeList.forEach((route) => {
    const component = route.component as string
    if (component) {
      if (component.toUpperCase() === 'LAYOUT') {
        route.component = LayoutMap.get(component.toUpperCase())
      }
      else {
        route.children = [cloneDeep(route)]
        route.component = LAYOUT
        route.name = `${route.name}Parent`
        route.path = ''
        const meta = route.meta || {}
        meta.single = true
        meta.affix = false
        route.meta = meta
      }
    }
    else {
      warn(`请正确配置路由：${route?.name}的 component 属性`)
    }
    route.children && asyncImportRoute(route.children)
  })
  return routeList as unknown as T[]
}

/**
 * 将多级路由转换为二级路由
 */
export function flatMultiLevelRoutes(routeModules: AppRouteModule[]) {
  const modules: AppRouteModule[] = cloneDeep(routeModules)
  for (let index = 0; index < modules.length; index++) {
    const routeModule = modules[index]
    if (!isMultipleRoute(routeModule))
      continue

    promoteRouteLevel(routeModule)
  }
  return modules
}

// 路由级别升级
function promoteRouteLevel(routeModule: AppRouteModule) {
  // 使用 vue-router 拼接菜单
  let router: Router | null = createRouter({
    routes: [routeModule as unknown as RouteRecordNormalized],
    history: createWebHashHistory(),
  })

  const routes = router.getRoutes()
  addToChildren(routes, routeModule.children || [], routeModule)
  router = null

  routeModule.children = routeModule.children?.map(item => omit(item, 'children'))
}

// 将所有子路由添加到次要路由
function addToChildren(
  routes: RouteRecordNormalized[],
  children: AppRouteRecordRaw[],
  routeModule: AppRouteModule,
) {
  for (let index = 0; index < children.length; index++) {
    const child = children[index]
    const route = routes.find(item => item.name === child.name)
    if (!route)
      continue

    routeModule.children = routeModule.children || []
    if (!routeModule.children.find(item => item.name === route.name))
      routeModule.children?.push(route as unknown as AppRouteModule)

    if (child.children?.length)
      addToChildren(routes, child.children, routeModule)
  }
}

// 确定层级是否超过 2 个层级
function isMultipleRoute(routeModule: AppRouteModule) {
  if (!routeModule || !Reflect.has(routeModule, 'children') || !routeModule.children?.length)
    return false

  const children = routeModule.children

  let flag = false
  for (let index = 0; index < children.length; index++) {
    const child = children[index]
    if (child.children?.length) {
      flag = true
      break
    }
  }
  return flag
}
