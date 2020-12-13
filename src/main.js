
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import Vuelidate from 'vuelidate'

import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'
import FirebaseApp from './firebase'

Vue.use(BootstrapVue)
Vue.use(FirebaseApp)
Vue.use(Vuelidate)
Vue.config.productionTip = false

/* Vue.use(VueClipboards) */

new Vue({
  data () {
    return {
    }
  },
  router,
  render: h => h(App)
}).$mount('#app')
