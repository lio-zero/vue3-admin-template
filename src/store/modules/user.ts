// import type { ProjectConfig } from '#/config'
import type { UserInfo } from '#/store'
import { store } from '@/store'
import { defineStore } from 'pinia'
import { router } from '@/router'
import { getToken, setAuthCache, getAuthCache } from '@/utils/auth'
import { ROLES_KEY, USER_INFO_KEY, TOKEN_KEY } from '@/enums/cacheEnum'
import { login, getUserInfo, doLogout } from '@/api/login'
import { PageEnum } from '@/enums/pageEnum'
import { RoleEnum } from '@/enums/roleEnum'

interface UserState {
  userInfo: Nullable<UserInfo>
  token?: string
  roleList: RoleEnum[]
  sessionTimeout?: boolean
  lastUpdateTime: number
}

export const useUserStore = defineStore({
  id: 'user',
  state: (): UserState => ({
    userInfo: null,
    token: undefined,
    roleList: [],
    sessionTimeout: false,
    lastUpdateTime: 0
  }),
  getters: {
    getUserInfo(): UserInfo {
      return this.userInfo || getAuthCache<UserInfo>(USER_INFO_KEY) || {}
    },
    getLastUpdateTime(): number {
      return this.lastUpdateTime
    },
    getToken(): string {
      return this.token || getAuthCache<string>(TOKEN_KEY)
    },
    getRoleList(): RoleEnum[] {
      return this.roleList.length > 0 ? this.roleList : getAuthCache<RoleEnum[]>(ROLES_KEY)
    },
    getSessionTimeout(): boolean {
      return !!this.sessionTimeout
    }
  },
  actions: {
    setToken(info) {
      this.token = info ? info : ''
      setAuthCache(TOKEN_KEY, info)
    },
    setUserInfo(info) {
      this.userInfo = info
      this.lastUpdateTime = new Date().getTime()
      setAuthCache(USER_INFO_KEY, info)
    },
    setSessionTimeout(flag) {
      this.sessionTimeout = flag
    },
    resetState() {
      this.userInfo = null
      this.token = ''
      this.sessionTimeout = false
    },
    async login(userInfo: any) {
      try {
        const { token }: any = await login(userInfo)
        this.setToken(token)
        return this.afterLoginAction()
      } catch (error) {
        return Promise.reject(error)
      }
    },
    async afterLoginAction() {
      if (!getToken) return null
      const userInfo = await this.getUserInfoAction
      const sessionTimeout = this.sessionTimeout
      if (sessionTimeout) {
        this.setSessionTimeout(false)
      }

      return userInfo
    },
    async getUserInfoAction() {
      if (!getToken) return null
      const userInfo = await getUserInfo(1)
      this.setUserInfo(userInfo)
      return userInfo
    },
    async logout(goLogin = false) {
      if (this.token) {
        try {
          await doLogout()
        } catch {
          console.log('注销 Token 失败')
        }
      }
      this.setToken(undefined)
      this.setSessionTimeout(false)
      this.setUserInfo(null)
      goLogin && router.push(PageEnum.BASE_LOGIN)
    }
  }
})

// 需要在 setup 之外使用
export function useUserStoreWithOut() {
  return useUserStore(store)
}
