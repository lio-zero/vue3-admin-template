import { defineConfig, UserConfig, ConfigEnv, loadEnv } from 'vite'
import { resolve } from 'path'
import { createVitePlugins } from './build/vite/plugins'
import { wrapperEnv } from './build/utils'
import { createProxy } from './build/vite/proxy'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }: ConfigEnv): UserConfig => {
  const isBuild = command === 'build'
  const root = process.cwd()
  const env = loadEnv(mode, root)
  const viteEnv = wrapperEnv(env)
  const { VITE_PORT, VITE_PROXY, VITE_DROP_CONSOLE } = viteEnv
  return {
    base: './',
    plugins: createVitePlugins(viteEnv, isBuild),
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
        '#': resolve(__dirname, 'types')
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
      hmr: { overlay: false },
      port: VITE_PORT,
      open: true,
      https: false,
      cors: true,
      host: '0.0.0.0',
      proxy: createProxy(VITE_PROXY)
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
      // 关闭 brotliSize 显示屏可以稍微缩短包装时间
      brotliSize: false,
      chunkSizeWarningLimit: 2000,
      outDir: 'dist', // 指定输出路径
      assetsDir: 'assets' // 指定生成静态资源的存放路径
    }
  }
})
