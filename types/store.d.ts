// 锁屏信息
export interface LockInfo {
  // 需要密码
  pwd?: string | undefined
  // 锁上了吗？
  isLock?: boolean
}

export interface UserInfo {
  userId: string | number
  name: string
  password: string | number
  username: string
  realName: string
  email: string
  avatar: string
  desc?: string
  homePath?: string
}
