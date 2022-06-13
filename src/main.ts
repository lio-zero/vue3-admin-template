import 'virtual:svg-icons-register'
import 'virtual:windi-base.css'
import 'virtual:windi-components.css'
import 'virtual:windi-utilities.css'
import 'element-plus/theme-chalk/src/dark/css-vars.scss'
import 'nprogress/nprogress.css'
import '@/styles/index.scss'

import App from './App.vue'
import { createApp } from 'vue'
import { setupStore } from '@/store'
import { router, setupRouter } from '@/router'
import { setupRouterGuard } from '@/router/guard'
import { initAppConfigStore } from '@/logics/initAppConfig'
import { setupElIcon } from '@/components/Icon'

const app = createApp(App)

function bootstrap() {
  // 配置 store
  setupStore(app)

  // 路由配置
  setupRouter(app)

  // 路由守卫
  setupRouterGuard(router)

  // 初始化内部系统配置
  initAppConfigStore()

  // 加载 Element-Plus 图标
  setupElIcon(app)

  app.mount('#app')
}

bootstrap()
