import Cookies from 'js-cookie'
import { CacheTypeEnum } from '@/enums/cacheEnum'
import { Persistent, BasicKeys } from '@/utils/cache/persistent'
import projectSetting from '@/settings/projectSetting'

const { permissionCacheType } = projectSetting

const TokenKey = 'Admin-Token'
const RefreshTokenKey = 'Refresh-Token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function getRefreshToken() {
  return Cookies.get(RefreshTokenKey)
}

export function setToken(token: string) {
  return Cookies.set(TokenKey, token)
}

export function setRefreshToken(token: string) {
  return Cookies.set(RefreshTokenKey, token)
}

export function removeToken(key: string) {
  return Cookies.remove(key)
}

const isLocal = permissionCacheType === CacheTypeEnum.LOCAL

export function setAuthCache(key: BasicKeys, value) {
  const fn = isLocal ? Persistent.setLocal : Persistent.setSession
  console.log(fn)

  return fn(key, value, true)
}
