import axios from 'axios'

const service = axios.create({
  // 在请求地址前面加上 baseURL
  baseURL: import.meta.env.VITE_BASE_API,
  // 当发送跨域请求时携带cookie
  // withCredentials: true,
  timeout: 5000
})

// 请求拦截
service.interceptors.request.use(
  config => {
    return config
  },
  error => {
    // 请求错误的统一处理
    console.log(error)
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  /**
   * 通过判断状态码统一处理响应，根据情况修改
   * 同时也可以通过HTTP状态码判断请求结果
   */
  response => {
    const res = response.data
    return res
    console.log(res)
  },
  error => {
    return Promise.reject(error)
  }
)

export default http
