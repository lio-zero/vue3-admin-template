// const http: AxiosInstance = axios.create({
//   baseURL: import.meta.env.VITE_GLOB_API_URL + '',
//   timeout: 5000
// })

// let loadingInstance
// // 请求拦截
// http.interceptors.request.use(
//   (config: AxiosRequestConfig) => {
//     loadingInstance = ElLoading.service({ fullscreen: true })
//     const token = getToken()
//     if (token && (config as Recordable)?.requestOptions?.withToken !== false) {
//       // (config as Recordable).headers.Authorization = 'Bearer ' + token
//       ;(config as Recordable).headers.Authorization = token
//     }
//     return config
//   },
//   (error: any) => {
//     // 请求错误的统一处理
//     return Promise.reject(error)
//   }
// )

// // 响应拦截器
// http.interceptors.response.use(
//   res => {
//     loadingInstance.close()
//     const { code, result, message } = res.data
//     if (code === -1) {
//       ElMessage.error(message)
//       return Promise.reject(res)
//     }

//     return result
//   },
//   async (error: any) => {
//     loadingInstance.close()
//     const { response } = error || {}
//     const msg: string = response?.data?.error?.message ?? ''
//     checkStatus(error?.response?.status, msg)
//     return Promise.reject(error)
//   }
// )

// export default http
