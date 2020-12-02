
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import Vuelidate from 'vuelidate'
import { clipboard } from 'vue-clipboards'

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
  directives: { clipboard },
  data () {
    return {
      copyData: 'copy data'
    }
  },
  router,
  render: h => h(App)
}).$mount('#app')
