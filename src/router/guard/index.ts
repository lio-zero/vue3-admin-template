import type { Router } from 'vue-router'

import { isNavigationFailure, NavigationFailureType } from 'vue-router'
import NProgress from 'nprogress'
import { getToken } from '@/utils/auth'
import { useAppStore } from '@/store/modules/app'
import { useUserStore } from '@/store/modules/user'
import { useTransitionSetting } from '@/hooks/setting/useTransitionSetting'
import { getPageTitle } from '@/utils/get-page-title'
import { createPermissionGuard } from './permissionGuard'
NProgress.configure({ showSpinner: false })

export function setupRouterGuard(router: Router) {
  createPermissionGuard(router)
}

export default (router: any) => {
  router.beforeEach(async (to: any, _from: any, next: any) => {
    NProgress.start()
    const appStore = useAppStore()
    const userStore = useUserStore()
    const { getOpenPageLoading } = useTransitionSetting()
    if (unref(getOpenPageLoading)) {
      appStore.setPageLoadingAction(true)
    }

    document.title = getPageTitle(to.meta.title)

    // 在上次获取时间为空时获取用户信息
    if (getToken()) {
      if (userStore.getLastUpdateTime === 0) {
        try {
          await userStore.getUserInfoAction()
        } catch (err) {
          return next()
        }
      }
      // store.dispatch('getUserInfo')
      next()
    } else {
      if (to.path === '/login') next()
      else next({ path: '/login' })
    }
  })

  router.beforeResolve(async (_to: any, _from: any, next: any) => {
    next()
  })

  // https://next.router.vuejs.org/api/#navigationfailuretype
  router.afterEach((_to: any, _from: any, failure: any) => {
    if (isNavigationFailure(failure, NavigationFailureType.duplicated)) {
      console.log(failure.type)
    }

    const appStore = useAppStore()
    const { getOpenPageLoading } = useTransitionSetting()

    if (unref(getOpenPageLoading)) {
      // TODO 正在寻找更好的方法
      // 计时器模拟加载时间，以防止闪烁过快
      setTimeout(() => {
        appStore.setPageLoading(false)
      }, 220)
    }

    NProgress.done()
    return true
  })
}