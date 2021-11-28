import { isNavigationFailure, NavigationFailureType } from 'vue-router'
import NProgress from 'nprogress'

export default router => {
  router.beforeEach((to: any, from: any, next: any) => {
    NProgress.start()
    // if (!to.meta.isPublic && !localStorage.token) next({ path: '/login' })
    // next()

    // if (to.path === '/login') {
    //   next({ path: '/' })
    //   NProgress.done()
    // }
    // if (!localStorage.token) {
    //   next({ path: '/login' })
    //   NProgress.done() // 页面导航结束
    // } else {
    //   next()
    // }

    if (!localStorage.token) {
      if (to.path === '/login') {
        next()
      } else {
        next({ path: '/login' })
      }
    } else {
      next()
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
