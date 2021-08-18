
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import Vuelidate from 'vuelidate'
import store from './store'

import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'
import 'es6-promise/auto'
import FirebaseApp from './firebase'

import './assets/css/main.scss'
Vue.use(BootstrapVue)
Vue.use(FirebaseApp)
Vue.use(Vuelidate)
Vue.config.productionTip = false

/* Vue.use(VueClipboards) */

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
