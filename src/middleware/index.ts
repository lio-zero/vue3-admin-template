import { isNavigationFailure, NavigationFailureType } from 'vue-router'
import NProgress from 'nprogress'
import { getToken } from '@/utils/auth'
import store from '@/store'
import { getPageTitle } from '@/utils/get-page-title'
NProgress.configure({ showSpinner: false })

export default (router: any) => {
  router.beforeEach(async (to: any, _from: any, next: any) => {
    NProgress.start()

    document.title = getPageTitle(to.meta.title)

    // 在上次获取时间为空时获取用户信息
    if (getToken()) {
      if (store.state.lastUpdateTime === 0) {
        try {
          await store.dispatch('getUserInfoAction')
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

  // https://next.router.vuejs.org/api/#navigationfailuretype
  router.afterEach((_to: any, _from: any, failure: any) => {
    if (isNavigationFailure(failure, NavigationFailureType.duplicated)) {
      console.log(failure.type)
    }
    NProgress.done()
  })
}
