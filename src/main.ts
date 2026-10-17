import { createApp } from 'vue'
import App from '@/App.vue'
import { router } from '@/router'
import { vCountUp, vReveal } from '@/directives/reveal'
import '@/styles/main.css'

createApp(App).use(router).directive('reveal', vReveal).directive('count-up', vCountUp).mount('#app')
