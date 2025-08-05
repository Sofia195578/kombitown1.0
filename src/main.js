import { createApp } from 'vue'
import { Quasar } from 'quasar'
import router from './router/index.js'
import '@mdi/font/css/materialdesignicons.css'


import '@quasar/extras/material-icons/material-icons.css'
import 'quasar/src/css/index.sass'
import './css/app.scss'

import App from './App.vue'

const myApp = createApp(App)

myApp.use(Quasar, {
  plugins: {}
})

myApp.use(router)

myApp.mount('#app')
createApp(App).use(Quasar, quasarUserOptions).use(router).mount('#app')