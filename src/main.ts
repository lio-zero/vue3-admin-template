import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import svgIcon from './icons/index.vue'
import ElementPlus from 'element-plus'
import * as EleIcon from '@element-plus/icons'
import 'normalize.css/normalize.css'
import 'nprogress/nprogress.css'
import '@/styles/index.scss'
import 'element-plus/dist/index.css'

const app = createApp(App)

for (const key in EleIcon) {
  app.component(key, EleIcon[key])
}

// 事件总线：initialize 方法执行时机在主 App 挂载之前，请勿将 dom 操作逻辑放置此处
// export const initialize = async (app: any) => {}

app.use(ElementPlus)
app.use(store).use(router).component('svg-icon', svgIcon).mount('#app')
