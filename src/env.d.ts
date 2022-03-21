// / <reference types="vite/client" />

// *.d.ts 声明文件，用于类型检测，声明第三方库的类型
declare module '*.vue' {
  import { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module 'js-cookie'
declare module '@vueuse/core'
declare module 'vuex'
declare module 'path-browserify'
declare module 'element-plus'
declare module 'element-plus/*'
declare module 'nprogress'
declare module '@/store'
declare module '@/router'
declare module '@/utils'
declare module '@/utils/*'
declare module '@/types'
declare module '@/api'
declare module '@/api/*'
declare module '@/config/*'
declare module '@/styles'
declare module '@/styles/*'
