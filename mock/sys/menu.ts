import { MockMethod } from 'vite-plugin-mock'
import { resultSuccess, resultError, getRequestToken, requestParams } from '../_util'
import { fakeUser } from './user'

const dashboardRoute = {
  path: '/',
  component: 'Layout',
  redirect: '/dashboard',
  children: [
    {
      path: 'dashboard',
      name: 'Dashboard',
      component: '@/views/dashboard/index.vue',
      meta: { title: '首页', icon: 'HomeFilled', badge: 'new' }
    }
  ]
}

export default [
  {
    url: '/api/getMenuList',
    timeout: 1000,
    method: 'get',
    response: (request: requestParams) => {
      const token = getRequestToken(request)
      if (!token) {
        return resultError('Invalid token!')
      }
      const checkUser = fakeUser().find(item => item.token === token)
      if (!checkUser) {
        return resultError('Invalid user token!')
      }
      const id = checkUser.userId
      let menu: Object[]
      switch (id) {
        case 1:
          dashboardRoute.redirect = dashboardRoute.path + '/' + dashboardRoute.children[0].path
          menu = [dashboardRoute]
          break
        case 2:
          dashboardRoute.redirect = dashboardRoute.path + '/' + dashboardRoute.children[1].path
          menu = [dashboardRoute]
          break
        default:
          menu = []
      }

      return resultSuccess(menu)
    }
  }
] as MockMethod[]
