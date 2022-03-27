/**
 * 按需引入组件库样式。
 * https://github.com/anncwb/vite-plugin-style-import
 */
import { createStyleImportPlugin, ElementPlusResolve } from 'vite-plugin-style-import'

export function configStyleImportPlugin() {
  return createStyleImportPlugin({
    resolves: [ElementPlusResolve()]
  })
}
