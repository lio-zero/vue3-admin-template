/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUsername(str: string): boolean {
  const valid_map = ['admin', 'editor', 'lio']
  return valid_map.includes(str.trim())
}
