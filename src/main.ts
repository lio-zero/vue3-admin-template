import 'virtual:svg-icons-register'
import App from './App.vue'
import { createApp } from 'vue'

import ElementPlus from 'element-plus'
import * as EleIcon from '@element-plus/icons'
import svgIcon from './icons/index.vue'

import { setupStore } from '@/store'
import router from './router'
import 'normalize.css/normalize.css'
import 'nprogress/nprogress.css'
import '@/styles/index.scss'
import { initAppConfigStore } from '@/logics/initAppConfig'

const app = createApp(App)

const eleIcon: any = EleIcon
for (const key in eleIcon) {
  app.component(key, eleIcon[key])
}

function bootstrap() {
  // 配置 store
  setupStore(app)
  // 初始化内部系统配置
  initAppConfigStore()
}

bootstrap()

app.use(ElementPlus).use(router).component('svg-icon', svgIcon).mount('#app')
