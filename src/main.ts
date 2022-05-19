import 'virtual:svg-icons-register'

import 'normalize.css/normalize.css'
import 'nprogress/nprogress.css'
import '@/styles/index.scss'

import App from './App.vue'
import { createApp } from 'vue'
import { setupStore } from '@/store'
import { setupRouter } from '@/router'
import { initAppConfigStore } from '@/logics/initAppConfig'
import { setupElIcon } from '@/components/Icon'

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
