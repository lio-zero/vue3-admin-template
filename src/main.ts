import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import * as EleIcon from '@element-plus/icons'
import App from './App.vue'
import store from './store'
import router from './router'
import svgIcon from './icons/index.vue'
import 'normalize.css/normalize.css'
import 'nprogress/nprogress.css'
import '@/styles/index.scss'
import { initAppConfigStore } from '@/logics/initAppConfig'

const app = createApp(App)

const eleIcon: any = EleIcon
for (const key in eleIcon) {
  app.component(key, eleIcon[key])
}

initAppConfigStore()

app.use(ElementPlus).use(store).use(router).component('svg-icon', svgIcon).mount('#app')
