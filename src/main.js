
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'

import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'
import FirebaseApp from './firebase'

Vue.use(BootstrapVue)
Vue.use(FirebaseApp)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
