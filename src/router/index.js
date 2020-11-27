import Vue from 'vue'
import VueRouter from 'vue-router'
import home from '../views/home.vue'
import brainstorm from '@/views/brainstorm'
import newBrainstorm from '@/views/newBrainstorm'
import waitForMembers from '@/views/waitForMembers'
import startBrainstorm from '@/views/startBrainstorm'
import { BootstrapVue } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false
Vue.use(VueRouter)
// Install BootstrapVue
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin

const routes = [
  {
    path: '/',
    name: 'home',
    component: home
  },

  {
    path: '/brainstorm',
    name: 'brainstorm',
    component: brainstorm
  },

  {
    path: '/novobrainstorm',
    name: 'newBrainstorm',
    component: newBrainstorm
  },

  {
    path: '/esperapormembros',
    name: 'waitForMembers',
    component: waitForMembers
  },

  {
    path: '/startbrainstorm',
    name: 'startBrainstorm',
    component: startBrainstorm
  }

  /* {
    path: '/about',
    name: 'about',
    component: () => import( '../views/about.vue')
  } */
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
