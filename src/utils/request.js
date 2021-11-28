import axios from 'axios'
import { ElMessage } from 'element-plus'

const http = axios.create({
  baseURL: import.meta.env.VITE_BASE_API,
  timeout: 50000
})

// 请求拦截
http.interceptors.request.use(
  config => {
    if (localStorage.token) {
      config.headers['Authorization'] = 'Bearer ' + (localStorage.token || '')
    }
    return config
  },
  error => {
    // 请求错误的统一处理
    console.log(error)
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
  err => {
    if (err.response.data.message) {
      ElMessage.error(err.response.data.message)
      if (err.response.status === 401) {
        router.push('/login')
      }
    }
    return Promise.reject(err)
  }
)

export default http
