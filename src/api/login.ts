import { http } from '@/utils/http'

enum Api {
  Login = '/login',
  Logout = '/logout',
  GetUserDetail = '/user/getUserDetail',
  RefreshToken = '/refreshToken'
}

export function login(params: any) {
  console.log(Api.Login)
  return http.post({
    url: '/login',
    params
  })
}

export function doLogout() {
  return http.get({
    url: Api.Logout
  })
}

// export function getUserInfo(id?: number) {
//   return http({
//     url: `/user/getUserDetail/${id}`
//   })
// }

export function getUserInfo() {
  return http.get({
    url: Api.GetUserDetail
  })
}

export function getNewToken(params: any) {
  return http.post({
    url: Api.RefreshToken,
    params
  })
}
