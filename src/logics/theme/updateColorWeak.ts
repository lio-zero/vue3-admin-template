import { toggleClass } from './util'

/**
 * 更改项目颜色弱模式的状态
 * @param colorWeak
 */
export function updateColorWeak(colorWeak: boolean) {
  toggleClass(colorWeak, 'color-weak', document.documentElement)
}
