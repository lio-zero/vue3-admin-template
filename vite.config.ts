import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import { resolve } from 'path'
import { createSvg } from './src/icons/index'
import VueSetupExtend from 'vite-plugin-vue-setup-extend'
import AutoImport from 'unplugin-auto-import/vite'
import eslintPlugin from 'vite-plugin-eslint'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import {
  createStyleImportPlugin,
  ElementPlusResolve
} from 'vite-plugin-style-import'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [
    vue(),
    VueSetupExtend(),
    eslintPlugin(),
    createSvg('./src/icons/svg/'),
    AutoImport({
      imports: ['vue', 'vue-router', '@vueuse/head', '@vueuse/core'],
      dts: 'src/auto-imports.d.ts'
    }),
    eslintPlugin({
      // https://blog.csdn.net/xuefeng11111/article/details/121688821
      cache: false
    }),
    createStyleImportPlugin({
      resolves: [ElementPlusResolve()]
    }),
    Components({
      resolvers: [ElementPlusResolver()],
      extensions: ['vue'],
      include: [/\.vue$/, /\.vue\?vue/],
      dts: 'src/components.d.ts'
    })
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  css: {},
  server: {
    port: 8080,
    open: true,
    https: false,
    cors: true
  },
  build: {
    terserOptions: {
      compress: {
        drop_console: true
      }
    },
    outDir: 'dist', // 指定输出路径
    assetsDir: 'assets' // 指定生成静态资源的存放路径
  }
})
