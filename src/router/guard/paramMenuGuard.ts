import type { Router } from 'vue-router'
import { configureDynamicParamsMenu } from '../helper/menuHelper'
import type { Menu } from '../types'
import { PermissionModeEnum } from '@/enums/appEnum'
import { useAppStoreWithOut } from '@/store/modules/app'

import { usePermissionStoreWithOut } from '@/store/modules/permission'

const getPermissionMode = () => {
  const appStore = useAppStoreWithOut()
  return appStore.getProjectConfig.permissionMode
}

const isBackMode = () => {
  return getPermissionMode() === PermissionModeEnum.BACK
}

const isRouteMappingMode = () => {
  return getPermissionMode() === PermissionModeEnum.ROUTE_MAPPING
}

export function createParamMenuGuard(router: Router) {
  const permissionStore = usePermissionStoreWithOut()
  router.beforeEach(async (to, _, next) => {
    // 过滤无 name 路由
    if (!to.name) {
      next()
      return
    }

    // 菜单已生成。
    if (!permissionStore.getIsDynamicAddedRoute) {
      next()
      return
    }

    let menus: Menu[] = []
    if (isBackMode())
      menus = permissionStore.getBackMenuList

    else if (isRouteMappingMode())
      menus = permissionStore.getFrontMenuList

    menus.forEach(item => configureDynamicParamsMenu(item, to.params))

    next()
  })
}

