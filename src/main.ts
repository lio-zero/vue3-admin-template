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

const app = createApp(App)

const eleIcon: any = EleIcon
for (const key in eleIcon) {
  app.component(key, eleIcon[key])
}

// 事件总线：initialize 方法执行时机在主 App 挂载之前，请勿将 dom 操作逻辑放置此处
// export const initialize = async (app: any) => {}

app.use(ElementPlus)
app.use(store).use(router).component('svg-icon', svgIcon).mount('#app')
