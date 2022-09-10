/**
 * @name createVitePlugins
 * @description 封装 plugins 数组统一调用
 */
import type { PluginOption } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import legacy from '@vitejs/plugin-legacy'
import purgeIcons from 'vite-plugin-purge-icons'
import vueSetupExtend from 'vite-plugin-vue-setup-extend'
import Icons from 'unplugin-icons/vite'
import windiCSS from 'vite-plugin-windicss'
import { autoRegistryComponents } from './component'
import { autoImportDeps } from './autoImport'
import { configMockPlugin } from './mock'
import { configVisualizerConfig } from './visualizer'
import { configCompressPlugin } from './compress'
import { configRestartPlugin } from './restart'
import { configStyleImportPlugin } from './styleImport'
import { configPwaConfig } from './pwa'
import { configSvgIconsPlugin } from './svgIcon'
import { configHtmlPlugin } from './html'

export function createVitePlugins(viteEnv: ViteEnv, isBuild: boolean) {
  const {
    VITE_LEGACY,
    VITE_USE_MOCK,
    VITE_BUILD_COMPRESS,
    VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE,
  } = viteEnv

  const vitePlugins: (PluginOption | PluginOption[])[] = [
    // vue 支持
    vue(),
    // JSX 支持
    vueJsx(),
    // 自动按需引入组件
    autoRegistryComponents(),
    // 自动按需引入依赖
    autoImportDeps(),
    // setup name 属性
    vueSetupExtend(),
    // 监听配置文件改动重启
    configRestartPlugin(),
    Icons({
      autoInstall: true,
      compiler: 'vue3',
    }),
  ]

  // vite-plugin-windicss
  vitePlugins.push(windiCSS())

  // @vitejs/plugin-legacy
  VITE_LEGACY && isBuild && vitePlugins.push(legacy())

  // vite-plugin-html
  vitePlugins.push(configHtmlPlugin(viteEnv, isBuild))

  // vite-plugin-svg-icons
  vitePlugins.push(configSvgIconsPlugin(isBuild))

  // vite-plugin-purge-icons
  vitePlugins.push(purgeIcons())

  // vite-plugin-mock
  VITE_USE_MOCK && vitePlugins.push(configMockPlugin(isBuild))

  // rollup-plugin-visualizer
  vitePlugins.push(configVisualizerConfig())

  // vite-plugin-style-import
  vitePlugins.push(configStyleImportPlugin())

  if (isBuild) {
    // 开启.gz压缩  rollup-plugin-gzip
    vitePlugins.push(configCompressPlugin(VITE_BUILD_COMPRESS, VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE))

    // vite-plugin-pwa
    vitePlugins.push(configPwaConfig(viteEnv))
  }

  return vitePlugins
}
