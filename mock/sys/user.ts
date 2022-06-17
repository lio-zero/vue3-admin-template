import { MockMethod } from 'vite-plugin-mock'
import { getRequestToken, resultError, resultSuccess, requestParams } from '../_util'

export function fakeUser() {
  return [
    {
      userId: 1,
      realName: 'Lio',
      username: 'admin',
      password: 123456,
      email: 'admin@admin.com',
      avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
      desc: '我是超级管理员',
      token: 'token',
      homePath: '/dashboard',
      roles: [
        {
          roleName: 'Super Admin',
          value: 'super'
        }
      ]
    }
  ]
}

export default [
  {
    url: '/api/login',
    timeout: 200,
    method: 'post',
    response({ body }) {
      const { username, password } = body
      const checkUser = fakeUser().find(
        item => item.username === username && item.password == password
      )
      if (!checkUser) return resultError('帐户密码不正确！')
      return resultSuccess(checkUser)
    }
  },
  {
    url: '/api/user/getUserDetail',
    method: 'get',
    response(req: requestParams) {
      const token = getRequestToken(req)
      if (!token) return resultError('无效 token')
      const checkUser = fakeUser().find(item => item.token === token)
      if (!checkUser) return resultError('未获得相应的用户信息！')
      return resultSuccess(checkUser)
    }
  },
  {
    url: '/api/logout',
    timeout: 200,
    method: 'get',
    response(request: requestParams) {
      const token = getRequestToken(request)
      if (!token) return resultError('无效 token')
      const checkUser = fakeUser().find(item => item.token === token)
      if (!checkUser) return resultError('无效 token!')
      return resultSuccess(undefined, { message: 'Token 已被销毁' })
    }
  }
] as MockMethod[]
