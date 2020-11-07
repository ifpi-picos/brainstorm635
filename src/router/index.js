import Vue from 'vue'
import VueRouter from 'vue-router'
import home from '../views/Home.vue'
import brainstorming from '@/views/brainstorm'
import joinToBrainstorm from '@/views/joinToBrainstorm'
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
    path: 'brainstorm',
    name: 'brainstorm',
    component: brainstorming
  },

  {
    path: 'juntar-se ao brainstorm',
    name: 'joinToBrainstorm',
    component: joinToBrainstorm
  }
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
