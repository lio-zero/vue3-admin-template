import Cookies from 'js-cookie'

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
