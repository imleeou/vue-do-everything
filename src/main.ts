import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// 样式重置
import '@unocss/reset/normalize.css'
import '@/assets/css/main.css'
import 'virtual:uno.css'

const app = createApp(App)
app.use(router).mount('#app')
