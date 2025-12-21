import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import './style.css'
import './assets/css/global.css'
import App from './App.vue'

// 创建应用实例
const app = createApp(App)

// 使用路由
app.use(router)

// 使用状态管理
app.use(createPinia())

// 挂载应用
app.mount('#app')
