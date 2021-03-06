export interface UserInfo {
  userId: string | number
  password: string
  username: string
  realName: string
  email: string
  avatar: string
  desc?: string
  homePath?: string
  roles: RoleInfo[]
}
