import axios, { AxiosInstance, AxiosError, AxiosRequestConfig } from 'axios'
import { ElMessage } from 'element-plus'
import { getToken, removeToken } from './auth'
import store from '@/store'
import router from '@/router'
import errorMap from '@/config/constants'

const http: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_API,
  timeout: 5000
})

// 请求拦截
http.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    if (getToken()) {
      config.headers!.Authorization = 'Bearer ' + (getToken() || '')
    }
    return config
  },
  (error: any) => {
    // 请求错误的统一处理
    return Promise.reject(error)
  }
)

// 响应拦截器
http.interceptors.response.use(
  response => {
    const res = response.data
    return res
  },
  async (err: AxiosError) => {
    const { response } = err
    if (response && response?.data?.message) {
      switch (response?.status) {
        case 401:
          // token 失效
          ElMessage.error(response.data.message)
          router.push('/login')
          break
        case 402:
          removeToken('Admin-Token')
          removeToken('Refresh-Token')
          ElMessage.error(response.data.message)
          router.push('/login')
          break
        case 403:
          // 没有权限
          await store.dispatch('refreshToken')
          await store.dispatch('getUserInfo')
          break
        case 500:
          // 服务端错误
          break
        default:
          break
      }
    } else {
      ElMessage.error(errorMap.codeMap['-1000'])
    }
    return Promise.reject(err)
  }
)

export default http
