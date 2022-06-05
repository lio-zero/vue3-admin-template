import 'virtual:svg-icons-register'
import 'virtual:windi-base.css'
import 'virtual:windi-components.css'
import 'virtual:windi-utilities.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import 'nprogress/nprogress.css'

import App from './App.vue'
import { createApp } from 'vue'
import { setupStore } from '@/store'
import { setupRouter } from '@/router'
import { initAppConfigStore } from '@/logics/initAppConfig'
import { setupElIcon } from '@/components/Icon'
import '@/styles/index.scss'

const app = createApp(App)

function bootstrap() {
  // 配置 store
  setupStore(app)

  // 配置路由
  setupRouter(app)

  // 初始化内部系统配置
  initAppConfigStore()

  // 加载 Element-Plus 图标
  setupElIcon(app)

  app.mount('#app')
}

bootstrap()
