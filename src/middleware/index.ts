import { isNavigationFailure, NavigationFailureType } from 'vue-router'
import NProgress from 'nprogress'
import { getToken } from '@/utils/auth'
import store from '@/store'

export default router => {
  router.beforeEach(async (to: any, from: any, next: any) => {
    NProgress.start()

    if (getToken()) {
      store.dispatch('getUserInfo')
      next()
    } else {
      if (to.path === '/login') {
        next()
      } else {
        next({ path: '/login' })
      }
    }
  })

  // https://next.router.vuejs.org/api/#navigationfailuretype
  router.afterEach((to: any, from: any, failure: any) => {
    if (isNavigationFailure(failure, NavigationFailureType.duplicated)) {
      console.log(failure.type)
    }
    NProgress.done()
  })
}
