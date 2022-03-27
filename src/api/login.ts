import http from '@/utils/request'

export function login(data: any) {
  return http({
    url: '/login',
    method: 'post',
    data
  })
}

export function doLogout() {
  return http({
    url: '/logout',
    method: 'get'
  })
}

// export function getUserInfo(id?: number) {
//   return http({
//     url: `/api/user/getUserDetail/${id}`
//   })
// }

export function getUserInfo() {
  return http({
    url: `/api/user/getUserDetail`
  })
}

export function getNewToken(data: any) {
  return http({
    url: `/refreshToken`,
    method: 'post',
    data
  })
}
