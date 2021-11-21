export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

export function validatePass(rule, value, callback) {
  console.log(111, this.ruleForm)
  if (value === '') {
    callback(new Error('请重新输入密码'))
  } else {
    if (ruleForm.password.length < 6) {
      callback(new Error('密码需要六位数以上'))
    }
    callback()
  }
}

export function validateComfirmPass(rule, value, callback) {
  if (value === '') {
    callback(new Error('请重新输入密码'))
  } else if (value !== ruleForm.password) {
    callback(new Error('两个密码输入不匹配！'))
  } else {
    callback()
  }
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUsername(str) {
  const valid_map = ['admin', 'editor']
  return valid_map.indexOf(str.trim()) >= 0
}
