import { createStore } from 'vuex'
import getters from './getters'
import Cookies from 'js-cookie'
import { getToken, setToken, setRefreshToken, getRefreshToken, removeToken } from '@/utils/auth'
import { login, getUserInfo, getNewToken } from '@/api/login.ts'
import jwtDecode from 'jwt-decode'

import { routes } from '@/router'
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

function filterAsyncRoutes(routes, roles) {
  const res = []

  routes.forEach(route => {
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
      opened: Cookies.get('sidebarStatus') ? !!+Cookies.get('sidebarStatus') : true,
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
    TOGGLE_SIDEBAR: state => {
      state.sidebar.opened = !state.sidebar.opened
      state.sidebar.withoutAnimation = false
      if (state.sidebar.opened) {
        Cookies.set('sidebarStatus', 1)
      } else {
        Cookies.set('sidebarStatus', 0)
      }
    },
    CLOSE_SIDEBAR: (state, withoutAnimation) => {
      Cookies.set('sidebarStatus', 0)
      state.sidebar.opened = false
      state.sidebar.withoutAnimation = withoutAnimation
    },
    TOGGLE_DEVICE: (state, device) => {
      state.device = device
    },
    SET_SIZE: (state, size) => {
      state.size = size
      Cookies.set('size', size)
    },
    SET_ROUTES: (state, routes) => {
      state.addRoutes = routes
      state.routes = constantRoutes.concat(routes)
    },
    // 用户 Token
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_INTRODUCTION: (state, introduction) => {
      state.introduction = introduction
    },
    SET_USER_INFO: (state, userInfo) => {
      state.user_info = userInfo
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    }
  },
  actions: {
    async login({ commit }, userInfo) {
      const { username, password } = userInfo
      const { token, refreshToken } = await login({ username: username.trim(), password: password })
      commit('SET_TOKEN', token)
      setToken(token)
      setRefreshToken(refreshToken)
    },
    async getUserInfo({ commit, state }) {
      const { id, exp, iat } = jwtDecode(state.token)
      const data = await getUserInfo(id)

      if (!data) {
        return '验证失败，请重新登录。'
      }

      const { role, name, avatar, introduction } = data

      commit('SET_ROLES', role)
      commit('SET_NAME', name)
      commit('SET_AVATAR', avatar)
      commit('SET_INTRODUCTION', introduction)
      commit('SET_USER_INFO', data)
      return data
    },
    async logout({ commit, state, dispatch }) {
      // const { id } = jwtDecode(state.token)
      // const data = await logout(id)
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken('Admin-Token')
      // resetRouter()

      // 重置已访问视图和缓存视图
      // to fixed https://github.com/PanJiaChen/vue-element-admin/issues/2485
      // dispatch('tagsView/delAllViews', null, { root: true })
    },
    // 刷新 token
    async refreshToken({ commit }) {
      const token = await getNewToken({ token: getRefreshToken() })
      commit('SET_TOKEN', token)
      setToken(token)
    },
    generateRoutes({ commit }, roles) {
      return new Promise(resolve => {
        let accessedRoutes
        if (roles.includes('admin')) {
          accessedRoutes = asyncRoutes || []
        } else {
          accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
        }
        commit('SET_ROUTES', accessedRoutes)
        resolve(accessedRoutes)
      })
    },
    toggleSideBar({ commit }) {
      commit('TOGGLE_SIDEBAR')
    },
    closeSideBar({ commit }, { withoutAnimation }) {
      commit('CLOSE_SIDEBAR', withoutAnimation)
    },
    toggleDevice({ commit }, device) {
      commit('TOGGLE_DEVICE', device)
    },
    setSize({ commit }, size) {
      commit('SET_SIZE', size)
    }
  },
  modules: {}
})
