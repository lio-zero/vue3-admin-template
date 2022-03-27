/**
 * 根据需要自动导入 Vite、Webpack 和 Rollup 的 API
 * https://github.com/antfu/unplugin-auto-import
 */
import AutoImport from 'unplugin-auto-import/vite'
export function autoImportDeps() {
  return AutoImport({
    dts: 'src/auto-imports.d.ts',
    imports: ['vue', 'vue-router', '@vueuse/core']
  })
}
