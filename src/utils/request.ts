import axios, { AxiosInstance, AxiosError, AxiosRequestConfig } from 'axios'
import { ElMessage } from 'element-plus'
import { getToken } from './auth'
// import store from '@/store'
// import router from '@/router'
// import errorMap from '@/config/constants'
// import { errMessage } from './constant'

const http: AxiosInstance = axios.create({
  baseURL: import.meta.env.BASE_URL + '',
  timeout: 5000
})

// 请求拦截
http.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const token = getToken()
    if (token && (config as Recordable)?.requestOptions?.withToken !== false) {
      // (config as Recordable).headers.Authorization = 'Bearer ' + token
      ;(config as Recordable).headers.Authorization = token
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
  res => {
    const { code, result, message } = res.data

    if (code === -1) {
      ElMessage.error(message)
      return Promise.reject(res)
    }

    return result
  },
  async (err: AxiosError) => {
    // const { response } = err
    // if (response && response?.data?.message) {
    //   switch (response?.status) {
    //     case 401:
    //       // token 失效
    //       ElMessage.error(response.data.message)
    //       router.push('/login')
    //       break
    //     case 402:
    //       removeToken('Admin-Token')
    //       removeToken('Refresh-Token')
    //       ElMessage.error(response.data.message)
    //       router.push('/login')
    //       break
    //     case 403:
    //       // 没有权限
    //       await store.dispatch('refreshToken')
    //       await store.dispatch('getUserInfo')
    //       break
    //     case 500:
    //       // 服务端错误
    //       break
    //     default:
    //       break
    //   }
    // } else {
    //   ElMessage.error(errorMap.codeMap['-1000'])
    // }
    return Promise.reject(err)
  }
)

export default http
