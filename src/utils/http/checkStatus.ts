// if (response && response?.data?.message) {
// switch (response?.status) {
//   case 401:
//     // token 失效
//     ElMessage.error(response.data.message)
//     router.push('/login')
//     break
//   case 402:
//     removeToken('Admin-Token')
//     removeToken('Refresh-Token')
//     ElMessage.error(response.data.message)
//     router.push('/login')
//     break
//   case 403:
//     // 没有权限
//     await store.dispatch('refreshToken')
//     await store.dispatch('getUserInfo')
//     break
//   case 500:
//     // 服务端错误
//     break
//   default:
//     break
// }
// }

const codeMap = {
  '0': 'SUCCESS',
  '400': '请求错误',
  '401': '未经授权，请重新登录',
  '403': '禁止访问',
  '404': '请求出错',
  '408': '请求超时',
  '500': '服务器错误',
  '501': '服务未实现',
  '502': '网络错误',
  '503': '服务不可用',
  '504': '网络超时',
  '505': 'HTTP 版本不受支持',
  '-1000': '请检查你的网络设置',
  '-1003': 'API 参数错误',
  '-2001': '该用户已注册',
  '-2002': '手机号码已被注册',
  '-2003': '手机号码不能为空',
  '-2004': '验证码错误，请重新输入',
  '-2005': '同一用户一天内只能获取5次验证码',
  '-2006': '一分钟内只能获取1次验证码',
  '-2007': '验证码发送失败，请稍后重试',
  '-3000': '用户不存在',
  '-3001': '密码错误',
  '-3002': '用户已存在',
  '-3003': '用户未登录',
  '-3004': '原始密码错误',
  '-3005': '密码不一致',
  '-10001': '您当前没有访问权限'
}

const errorMap = {
  SUCCESS: '0',
  ERROR: '-1000',
  USER_REGISTERED: '-2001',
  PHONE_REGISTERED: '-2002',
  PHONE_NO_ALLOW_EMPTY: '-2003',
  PHONE_CODE_ERROR: '-2004',
  PHONE_CODE_OVER: '-2005',
  PHONE_CODE_ONCE: '-2006',
  PHONE_CODE_FAIL: '-2007',
  OPUSER_NO_EXIST: '-3000',
  PASSWORD_ERROR: '-3001',
  ADMIN_HAVE_EXIST: '-3002',
  OPUSER_NO_LOGIN: '-3003',
  ORIGIN_PWD_ERROR: '-3004',
  PWD_INCONFORM: '-3005'
}

export const checkStatus = (status: number, msg: string): string => {
  let errMessage = ''
  switch (status) {
    case 400:
      errMessage = msg
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
      errMessage = codeMap[errorMap.ERROR]
  }
  return `${errMessage}，请检查网络或联系管理员！`
}
