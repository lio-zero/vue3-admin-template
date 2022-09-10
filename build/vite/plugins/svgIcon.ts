/**
 * @description 用于快速创建 SVG sprites 的 Vite 插件。
 * @link https://github.com/vbenjs/vite-plugin-svg-icons
 */
import path from 'path'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

export function configSvgIconsPlugin(isBuild: boolean) {
  const svgIconsPlugin = createSvgIconsPlugin({
    iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
    svgoOptions: isBuild,
    // default
    symbolId: 'icon-[dir]-[name]',
  })
  return svgIconsPlugin
}
