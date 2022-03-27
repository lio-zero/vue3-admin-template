import http from '@/utils/request'

export function addRole(data: any) {
  return http({
    url: `/api/role/addRole`,
    method: 'post',
    data
  })
}

export function getAllRole() {
  return http({
    url: `/api/role/getRole`
  })
}

export function deleteRole(data: any) {
  return http({
    url: `/api/role/delRole`,
    method: 'post',
    data
  })
}

export function updateRole(data: any) {
  return http({
    url: `/api/role/updateRole`,
    method: 'post',
    data
  })
}
