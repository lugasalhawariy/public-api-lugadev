import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import SIC from '../views/SIC.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/sic',
    name: 'SIC',
    component: SIC
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  linkActiveClass: "active",
})

export default router
