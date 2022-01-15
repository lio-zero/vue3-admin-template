export default {
  codeMap: {
    '0': 'SUCCESS',
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
  },
  errorMap: {
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
}
