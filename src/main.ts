import { createApp } from 'vue'
import App from './App.vue'
import '@/styles/index.scss'
import store from './store'
import 'normalize.css/normalize.css'
import router from './router'
import svgIcon from './icons/index.vue'
import 'nprogress/nprogress.css'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as EleIcon from '@element-plus/icons'

const app = createApp(App)

for (const key in EleIcon) {
  app.component(key, EleIcon[key])
}

app.use(ElementPlus)
app.use(store).use(router).component('svg-icon', svgIcon).mount('#app')
