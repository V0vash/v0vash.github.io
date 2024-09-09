import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import P5Plugin from './plugins/P5Plugin'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(P5Plugin)

app.mount('#app')
