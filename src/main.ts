import { createApp } from 'vue'
import App from './App.vue'
import '@/styles/index.scss'
import store from './store'
import 'normalize.css/normalize.css'
import router from './router'
import { Setting, Message } from '@element-plus/icons'
import svgIcon from './icons/index.vue'

const app = createApp(App)
app.component('setting', Setting)
app.component('message', Message)
app.use(router).use(store).component('svg-icon', svgIcon).mount('#app')
