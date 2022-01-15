import { defineConfig, ConfigEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
// import Components from 'unplugin-vue-components/vite'
// import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { resolve } from 'path'
import { createSvg } from './src/icons/index'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [
    vue(),
    // Components({
    //   resolvers: [ElementPlusResolver()]
    // }),
    createSvg('./src/icons/svg/')
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  css: {},
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
