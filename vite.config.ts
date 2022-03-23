import { defineConfig, UserConfig, ConfigEnv } from 'vite'
import { resolve } from 'path'
// import { createSvg } from './src/icons/index'
// import eslintPlugin from 'vite-plugin-eslint'
import { createVitePlugins } from './config/vite/plugins'
import { VITE_DROP_CONSOLE, VITE_PORT } from './config/constant'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }: ConfigEnv): UserConfig => {
  const isBuild = command === 'build'
  console.log(command, mode)
  return {
    base: './',
    plugins: createVitePlugins(isBuild),
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src')
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          charset: false
        }
      }
    },
    server: {
      hmr: { overlay: false }, // 禁用或配置 HMR 连接 设置 server.hmr.overlay 为 false 可以禁用服务器错误遮罩层
      port: VITE_PORT,
      open: true,
      https: false,
      cors: false,
      host: '0.0.0.0'
    },
    build: {
      target: 'es2015',
      terserOptions: {
        compress: {
          keep_infinity: true,
          drop_console: VITE_DROP_CONSOLE
        }
      },
      rollupOptions: {
        // 确保外部化处理那些你不想打包进库的依赖
        external: []
        // https://rollupjs.org/guide/en/#big-list-of-options
      },
      watch: {
        // https://rollupjs.org/guide/en/#watch-options
      },
      // Turning off brotliSize display can slightly reduce packaging time
      brotliSize: false,
      chunkSizeWarningLimit: 2000,
      outDir: 'dist', // 指定输出路径
      assetsDir: 'assets' // 指定生成静态资源的存放路径
    }
  }
})
