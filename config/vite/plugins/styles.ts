/**
 * @name ConfigCreateStyleImportPlugin
 * @description 监听配置文件修改自动重启Vite
 */
import { createStyleImportPlugin, ElementPlusResolve } from 'vite-plugin-style-import'
export const ConfigCreateStyleImportPlugin = () => {
  return createStyleImportPlugin({
    resolves: [ElementPlusResolve()]
  })
}
