import http from '@/utils/request.ts'

export function addUser(data: any) {
  return http({
    url: `/api/user/addUser`,
    method: 'post',
    data
  })
}

export function getAllUser() {
  return http({
    url: `/api/user/getUser`
  })
}

export function deleteUser(data: any) {
  return http({
    url: `/api/user/delUser`,
    method: 'post',
    data
  })
}

export function updateUser(data: any) {
  return http({
    url: `/api/user/updateUser`,
    method: 'post',
    data
  })
}
