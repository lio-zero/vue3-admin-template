import { isNavigationFailure, NavigationFailureType } from 'vue-router'
import NProgress from 'nprogress'
import { getToken } from '@/utils/auth'
import store from '@/store'
import { getPageTitle } from '@/utils/get-page-title'

export default (router: any) => {
  router.beforeEach(async (to: any, from: any, next: any) => {
    NProgress.start()

    document.title = getPageTitle(to.meta.title)

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
