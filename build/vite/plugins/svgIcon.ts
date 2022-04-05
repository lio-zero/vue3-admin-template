/**
 * 用于快速创建 SVG sprites 的 Vite 插件。
 * https://github.com/vbenjs/vite-plugin-svg-icons
 */
// createSvg('./src/icons/svg/')
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import path from 'path'

export function configSvgIconsPlugin(isBuild: boolean) {
  const svgIconsPlugin = createSvgIconsPlugin({
    iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
    svgoOptions: isBuild,
    // default
    symbolId: 'icon-[dir]-[name]'
  })
  return svgIconsPlugin
}
