import { createApp } from 'vue'
import App from '@/App.vue'
import { router } from '@/router'
import { vCountUp, vReveal } from '@/directives/reveal'
import { vTilt } from '@/directives/tilt'
import '@/styles/main.css'

createApp(App)
  .use(router)
  .directive('reveal', vReveal)
  .directive('count-up', vCountUp)
  .directive('tilt', vTilt)
  .mount('#app')
