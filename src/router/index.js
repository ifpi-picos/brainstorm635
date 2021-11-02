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

const publicRoutes = ['/privacy-policy', '/home']

const routes = [
  {
    path: '/',
    name: 'default',
    component: defaultTemplate,
    redirect: 'newBrainstorm',
    children: [

      {
        path: '/newbrainstorm',
        name: 'newBrainstorm',
        component: () => import('@/views/newBrainstorm.vue')
      },

      {
        path: '/brainstorm/:id',
        name: 'brainstorm',
        component: () => import('@/views/brainstorm.vue')
      },

      {
        path: '/startbrainstorm/:id/:round',
        name: 'startBrainstorm',
        component: () => import('@/views/startBrainstorm.vue')
      },

      {
        path: '/printbrainstorm/:id/',
        name: 'printBrainstorm',
        component: () => import('@/views/printBrainstorm')
      }
    ]
  },
  {
    path: '/privacy-policy',
    name: 'privacy-policy',
    component: () => import('@/views/privacyPolicy.vue')
  },
  {
    path: '*',
    name: '404',
    component: () => import('@/views/404.vue')
  },

  {
    path: '/home',
    name: 'home',
    component: () => import('@/views/home.vue')
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
  try {
    const HOME = '/home'
    const HOME_LOGIN = '/newbrainstorm'
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        if (to.path === HOME) {
          next({ path: HOME_LOGIN })
        }
        next()
      } else {
        if (!publicRoutes.includes(to.path)) {
          next({ path: HOME })
        }
        next()
      }
    })
  } catch (error) {
    console.error(error)
  }
})

export default router
