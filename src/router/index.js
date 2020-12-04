import Vue from 'vue'
import VueRouter from 'vue-router'
import { BootstrapVue } from 'bootstrap-vue'
import defaultTemplate from '@/templates/default.vue'

import firebase from 'firebase/app'

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
    name: 'default',
    component: defaultTemplate,
    redirect: 'home',
    children: [
      {
        path: '/home',
        name: 'home',
        component: () => import('@/views/home')
      },

      {
        path: '/brainstorm',
        name: 'brainstorm',
        component: () => import('@/views/brainstorm')
      },

      {
        path: '/novobrainstorm',
        name: 'newBrainstorm',
        component: () => import('@/views/newBrainstorm')
      },

      {
        path: '/startBrainstorm',
        name: 'startBrainstorm',
        component: () => import('@/views/startBrainstorm')
      }
    ]
  },

  {
    path: '*',
    name: '404',
    component: () => import('@/views/404.vue')
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

router.beforeEach((to, from, next) => {
/*  console.log('from: ', from, ' to: ', to) */
  const HOME = '/'
  /* const LOGIN = '/' */
  const INICIAL_PAGE_AUTH = '/brainstorm'
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      if (to.path === HOME) {
        next({ path: INICIAL_PAGE_AUTH })
      }
      next()
    } else {
      if (to.path !== HOME) {
        next({ path: HOME })
      }
    }
  })
  next()
})

export default router
