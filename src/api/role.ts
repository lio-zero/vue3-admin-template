import { http } from '@/utils/http'

enum Api {
  GetRole = '/role/getRole',
  AddRole = '/role/addRole',
  DelRole = '/role/delRole',
  UpdateRole = '/role/updateRole'
}

export function getAllRole() {
  return http.get({
    url: Api.GetRole
  })
}

export function addRole(params: any) {
  return http.post({
    url: Api.AddRole,
    params
  })
}

export function deleteRole(params: any) {
  return http.post({
    url: Api.DelRole,
    params
  })
}

export function updateRole(params: any) {
  return http.post({
    url: Api.UpdateRole,
    params
  })
}
