import http from '@/utils/request.ts'

export function login(data: any) {
  return http({
    url: '/login',
    method: 'post',
    data
  })
}

export function getUserInfo(id: number) {
  return http({
    url: `/api/user/getUserDetail/${id}`
  })
}

export function getNewToken(data: any) {
  return http({
    url: `/refreshToken`,
    method: 'post',
    data
  })
}
