// Lock screen information
export interface LockInfo {
  // Password required
  pwd?: string | undefined
  // Is it locked?
  isLock?: boolean
}

export interface UserInfo {
  userId: string | number
  username: string
  realName: string
  email: string
  avatar: string
  desc?: string
  homePath?: string
}
