import { http } from '@/utils/http'

enum Api {
  AddPermission = '/permission/addPermission',
  DelPermission = '/permission/delPermission',
  UpdatePermission = '/permission/updatePermission',
  GetAllPermission = '/permission/getPermission'
}

export function getAllPermission() {
  return http.get({ url: Api.GetAllPermission })
}

export function addPermission(params: any) {
  return http.post({ url: Api.AddPermission, params })
}

export function deletePermission(params: any) {
  return http.post({ url: Api.DelPermission, params })
}

export function updatePermission(params: any) {
  return http.post({ url: Api.UpdatePermission, params })
}
