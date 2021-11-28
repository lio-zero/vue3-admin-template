import http from '@/utils/request.js'

export function login(data) {
  return http({
    url: '/login',
    method: 'post',
    data
  })
}

export function getUserInfo(data) {
  return http({
    url: '/login',
    method: 'post',
    data
  })
}
