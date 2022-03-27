export const checkStatus = (status: number | string): string => {
  let errMessage = ''
  switch (status) {
    case 400:
      errMessage = '请求错误'
      break
    case 401:
      errMessage = '未经授权，请重新登录'
      break
    case 403:
      errMessage = '禁止访问'
      break
    case 404:
      errMessage = '请求出错'
      break
    case 408:
      errMessage = '请求超时'
      break
    case 500:
      errMessage = '服务器错误'
      break
    case 501:
      errMessage = '服务未实现'
      break
    case 502:
      errMessage = '网络错误'
      break
    case 503:
      errMessage = '服务不可用'
      break
    case 504:
      errMessage = '网络超时'
      break
    case 505:
      errMessage = 'HTTP 版本不受支持'
      break
    default:
      errMessage = '连接出错'
  }
  return `${errMessage}，请检查网络或联系管理员！`
}
