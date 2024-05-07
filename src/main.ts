import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// 样式重置
import '@unocss/reset/normalize.css'
// 主题样式
import 'element-plus/theme-chalk/dark/css-vars.css'
// 全局样式
import '@/assets/css/index.css'
import 'virtual:uno.css'

const app = createApp(App)
app.use(router).mount('#app')
