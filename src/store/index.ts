import { createStore } from 'vuex'
import getters from './getters'
import Cookies from 'js-cookie'
import {
  getToken,
  setToken,
  setRefreshToken,
  getRefreshToken,
  removeToken
} from '@/utils/auth'
import { login, getUserInfo, getNewToken } from '@/api/login.ts'
import jwtDecode from 'jwt-decode'

import { routes } from '@/router'
function hasPermission(roles: any, route: any) {
  if (route.meta && route.meta.roles) {
    return roles.some((role: any) => route.meta.roles.includes(role))
  } else {
    return true
  }
}

function filterAsyncRoutes(routes: any, roles: any) {
  const res: any = []

  routes.forEach((route: any) => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })

  return res
}
export default createStore({
  state: {
    sidebar: {
      opened: Cookies.get('sidebarStatus')
        ? !!+Cookies.get('sidebarStatus')
        : true,
      withoutAnimation: false
    },
    device: 'desktop',
    size: Cookies.get('size') || 'medium',
    user_info: '',
    routes: filterAsyncRoutes(routes, ['admin']),
    addRoutes: [],
    token: getToken(),
    roles: '',
    name: '',
    introduction: '',
    avatar: ''
  },
  getters,
  mutations: {
    TOGGLE_SIDEBAR: (state: any) => {
      state.sidebar.opened = !state.sidebar.opened
      state.sidebar.withoutAnimation = false
      if (state.sidebar.opened) {
        Cookies.set('sidebarStatus', 1)
      } else {
        Cookies.set('sidebarStatus', 0)
      }
    },
    CLOSE_SIDEBAR: (state: any, withoutAnimation: any) => {
      Cookies.set('sidebarStatus', 0)
      state.sidebar.opened = false
      state.sidebar.withoutAnimation = withoutAnimation
    },
    TOGGLE_DEVICE: (state: any, device: any) => {
      state.device = device
    },
    SET_SIZE: (state: any, size: any) => {
      state.size = size
      Cookies.set('size', size)
    },
    // 用户 Token
    SET_TOKEN: (state: any, token: any) => {
      state.token = token
    },
    SET_INTRODUCTION: (state: any, introduction: any) => {
      state.introduction = introduction
    },
    SET_USER_INFO: (state: any, userInfo: any) => {
      state.user_info = userInfo
    },
    SET_NAME: (state: any, name: any) => {
      state.name = name
    },
    SET_AVATAR: (state: any, avatar: any) => {
      state.avatar = avatar
    },
    SET_ROLES: (state: any, roles: any) => {
      state.roles = roles
    }
  },
  actions: {
    async login({ commit }: any, userInfo: any) {
      const { token, refreshToken } = await login(userInfo)

      commit('SET_TOKEN', token)
      setToken(token)
      refreshToken && setRefreshToken(refreshToken)
    },
    async getUserInfo({ commit, state }: any) {
      const { id }: any = jwtDecode(state.token)
      const data = await getUserInfo(id)

      if (!data) return '验证失败，请重新登录。'

      const { role, name, avatar, introduction } = data

      commit('SET_ROLES', role)
      commit('SET_NAME', name)
      commit('SET_AVATAR', avatar)
      commit('SET_INTRODUCTION', introduction)
      commit('SET_USER_INFO', data)
      return data
    },
    async logout({ commit }: any) {
      // const { id } = jwtDecode(state.token)
      // const data = await logout(id)
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken('Admin-Token')
      removeToken('Refresh-Token')
    },
    // 刷新 token
    async refreshToken({ commit }: any) {
      const token = await getNewToken({ token: getRefreshToken() })
      commit('SET_TOKEN', token)
      setToken(token)
    },

    toggleSideBar({ commit }: any) {
      commit('TOGGLE_SIDEBAR')
    },
    closeSideBar({ commit }: any, { withoutAnimation }: any) {
      commit('CLOSE_SIDEBAR', withoutAnimation)
    },
    toggleDevice({ commit }: any, device: any) {
      commit('TOGGLE_DEVICE', device)
    },
    setSize({ commit }: any, size: any) {
      commit('SET_SIZE', size)
    }
  },
  modules: {}
})
