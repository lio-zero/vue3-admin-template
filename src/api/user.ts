import { http } from '@/utils/http'

enum Api {
  GetUser = '/user/getUser',
  AddUser = '/user/addUser',
  DelUser = '/user/delUser',
  UpdateUser = '/user/updateUser'
}

export function addUser(params: any) {
  return http.post({
    url: Api.AddUser,
    params
  })
}

export function getAllUser() {
  return http.get({
    url: Api.GetUser
  })
}

export function deleteUser(params: any) {
  return http.post({
    url: Api.DelUser,
    params
  })
}

export function updateUser(params: any) {
  return http.post({
    url: Api.UpdateUser,
    params
  })
}
