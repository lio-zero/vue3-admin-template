import http from '@/utils/request'

export function addPermission(data: any) {
  return http({
    url: `/api/permission/addPermission`,
    method: 'post',
    data
  })
}

export function getAllPermission() {
  return http({
    url: `/api/permission/getPermission`
  })
}

export function deletePermission(data: any) {
  return http({
    url: `/api/permission/delPermission`,
    method: 'post',
    data
  })
}

export function updatePermission(data: any) {
  return http({
    url: `/api/permission/updatePermission`,
    method: 'post',
    data
  })
}
