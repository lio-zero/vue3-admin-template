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

  // loadEnv 读取的布尔类型是字符串。此函数可以转换为布尔类型
  const viteEnv = wrapperEnv(env)

  const { VITE_PORT, VITE_PROXY, VITE_DROP_CONSOLE } = viteEnv

  return {
    base: './',
    // 项目使用的 vite 插件。数量可能很多，单独提取管理
    plugins: createVitePlugins(viteEnv, isBuild),
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
        '#': resolve(__dirname, 'types')
      }
    },
    server: {
      hmr: { overlay: false },
      port: VITE_PORT,
      host: true,
      proxy: createProxy(VITE_PROXY)
    },
    build: {
      target: 'es2015',
      outDir: OUTPUT_DIR,
      terserOptions: {
        compress: {
          keep_infinity: true,
          // 用于在生产环境中删除 console
          drop_console: VITE_DROP_CONSOLE
        }
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
    optimizeDeps: {
      // @iconify/iconify: 依赖关系由 @purge-icons/generated 动态和虚拟加载，因此需要显式指定
      include: ['@iconify/iconify'],
      exclude: ['vue-demi', '@vueuse/core']
    }
  }
})
