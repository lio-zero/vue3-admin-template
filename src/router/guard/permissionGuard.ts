import type { Router } from 'vue-router'
import { isNavigationFailure, NavigationFailureType } from 'vue-router'
import { getToken } from '@/utils/auth'
import { useUserStore } from '@/store/modules/user'
import { getPageTitle } from '@/utils/get-page-title'

export function createPermissionGuard(router: Router) {
  router.beforeEach(async (to: any, _from: any, next: any) => {
    const userStore = useUserStore()
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

      next()
    } else {
      if (to.path === '/login') next()
      else next({ path: '/login' })
    }
  })

  // https://next.router.vuejs.org/api/#navigationfailuretype
  router.afterEach((_to: any, _from: any, failure: any) => {
    if (isNavigationFailure(failure, NavigationFailureType.duplicated)) {
      console.log(failure.type)
    }

    return true
  })
}
