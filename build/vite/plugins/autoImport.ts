/**
 * 根据需要自动导入 API
 * https://github.com/antfu/unplugin-auto-import
 */
import AutoImport from 'unplugin-auto-import/vite'
import IconsResolver from 'unplugin-icons/resolver'

export function autoImportDeps() {
  return AutoImport({
    dts: 'src/auto-imports.d.ts',
    imports: ['vue', 'vue-router', '@vueuse/core'],
    resolvers: [
      // 自动导入图标组件
      IconsResolver({
        prefix: 'Icon'
      })
    ]
  })
}
