import axios from 'axios'
import { ElMessage } from 'element-plus'
import { getToken, removeToken } from './auth'
import store from '@/store'
import router from '@/router'

const http = axios.create({
  baseURL: import.meta.env.VITE_BASE_API,
  timeout: 5000
})

// 请求拦截
http.interceptors.request.use(
  config => {
    if (getToken()) {
      config.headers['Authorization'] = 'Bearer ' + (getToken() || '')
    }
    return config
  },
  error => {
    // 请求错误的统一处理
    return Promise.reject(error)
  }
)

// 响应拦截器
http.interceptors.response.use(
  /**
   * 通过判断状态码统一处理响应，根据情况修改
   * 同时也可以通过HTTP状态码判断请求结果
   */
  response => {
    const res = response.data
    return res
  },
  async err => {
    if (err.response && err.response.data.message) {
      switch (err.response.status) {
        case 401:
          ElMessage.error(err.response.data.message)
          router.push('/login')
          break
        case 402:
          removeToken('Admin-Token')
          removeToken('Refresh-Token')
          ElMessage.error(err.response.data.message)
          router.push('/login')
          break
        case 403:
          await store.dispatch('refreshToken')
          await store.dispatch('getUserInfo')
          break
        default:
          break
      }
    }
    return Promise.reject(err)
  }
)

export default http
