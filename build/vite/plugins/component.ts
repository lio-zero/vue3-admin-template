/**
 * Vue 的按需组件自动导入
 * https://github.com/antfu/unplugin-vue-components
 */
import Components from 'unplugin-vue-components/vite'
// import IconsResolver from 'unplugin-icons/resolver'
import { ElementPlusResolver, VueUseComponentsResolver } from 'unplugin-vue-components/resolvers'
export function autoRegistryComponents() {
  return Components({
    // dirs: ['src/components'],
    extensions: ['vue'],
    deep: true,
    dts: 'src/components.d.ts',
    directoryAsNamespace: false,
    globalNamespaces: [],
    directives: true,
    include: [/\.vue$/, /\.vue\?vue/],
    resolvers: [ElementPlusResolver(), VueUseComponentsResolver()]
  })
}
