import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import { getFirebaseUser } from '@/firebase/auth'
import { getAuth, onAuthStateChanged, User as FirebaseUser } from 'firebase/auth'
import { initFirebase } from '@/firebase/config'
import Datepicker from 'vue3-date-time-picker'
import 'vue3-date-time-picker/dist/main.css'

import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootswatch/dist/minty/bootstrap.min.css'

console.log('[main] Initialize Firebase')
initFirebase()

const startApp = onAuthStateChanged(getAuth(), async (user: FirebaseUser | null) => {
  const app = createApp(App)
  console.log('[main] Initialize Vue App')
  app.use(createPinia())
  await getFirebaseUser()
  app.use(router)
  app.component('Datepicker', Datepicker)
  app.mount('#app')
  startApp()
})
