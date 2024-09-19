import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory('/'),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/physarum',
      children: [
        { path: '', component: () => import('../views/physarum/PhysarumView.vue') },
        { path: 'about', component: () => import('../views/physarum/AboutPhysarumView.vue') }
      ]
    }
  ]
})

export default router
