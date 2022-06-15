/**
 * @description 基于文件系统的路由生成器的 Vite 插件
 * @link https://github.com/hannoeru/vite-plugin-pages
 */
import Pages from 'vite-plugin-pages'
export function configPagesPlugin() {
  return Pages({
    pagesDir: [{ dir: 'src/pages', baseRoute: '' }],
    extensions: ['vue', 'md'],
    exclude: ['**/components/*.vue'],
    nuxtStyle: true
  })
}
