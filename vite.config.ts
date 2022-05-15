import { defineConfig, UserConfig, ConfigEnv, loadEnv } from 'vite'
import { resolve } from 'path'
import { createVitePlugins } from './build/vite/plugins'
import { wrapperEnv } from './build/utils'
import { createProxy } from './build/vite/proxy'
import { OUTPUT_DIR } from './build/constant'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }: ConfigEnv): UserConfig => {
  const isBuild = command === 'build'
  const root = process.cwd()
  const env = loadEnv(mode, root)
  const viteEnv = wrapperEnv(env)
  const { VITE_PORT, VITE_PROXY, VITE_DROP_CONSOLE } = viteEnv
  return {
    base: './',
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
        '#': resolve(__dirname, 'types')
      }
    },
    server: {
      port: VITE_PORT,
      open: true,
      host: true,
      proxy: createProxy(VITE_PROXY)
    },
    build: {
      target: 'es2015',
      outDir: OUTPUT_DIR,
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
      chunkSizeWarningLimit: 2000
    },
    css: {
      preprocessorOptions: {
        scss: {
          charset: false
        }
      }
    },
    plugins: createVitePlugins(viteEnv, isBuild),
    optimizeDeps: {
      // @iconify/iconify: 依赖项是由 @purge-icons/generated 动态和虚拟加载的，因此需要显式指定
      include: ['@iconify/iconify'],
      exclude: []
    }
  }
})
