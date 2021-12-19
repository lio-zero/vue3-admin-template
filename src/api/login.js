import http from '@/utils/request.js'

export function login(data) {
  return http({
    url: '/login',
    method: 'post',
    data
  })
}

export function getUserInfo(id) {
  return http({
    url: `/api/user/getUserDetail/${id}`
  })
}

export function getNewToken(data) {
  return http({
    url: `/refreshToken`,
    method: 'post',
    data
  })
}
