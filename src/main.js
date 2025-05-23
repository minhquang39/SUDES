import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

// Import CSS trước
import './index.css'
import 'animate.css'
import ToastPlugin from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-bootstrap.css'

// PrimeVue setup

const app = createApp(App)

// Đảm bảo options đúng định dạng
app.use(ToastPlugin)

app.use(createPinia())
app.use(router)

app.mount('#app')
