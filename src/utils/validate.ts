/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path: string): boolean {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUsername(str: string): boolean {
  const valid_map = ['admin', 'editor', 'lio']
  return valid_map.indexOf(str.trim()) >= 0
}

// export function validatePass(rule, value, callback) {
//   if (value === '') {
//     callback(new Error('请重新输入密码'))
//   } else {
//     if (ruleForm.password.length < 6) {
//       callback(new Error('密码需要六位数以上'))
//     }
//     callback()
//   }
// }

// export function validateComfirmPass(rule, value, callback) {
//   if (value === '') {
//     callback(new Error('请重新输入密码'))
//   } else if (value !== ruleForm.password) {
//     callback(new Error('两个密码输入不匹配！'))
//   } else {
//     callback()
//   }
// }
