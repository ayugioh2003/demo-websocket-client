import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/notify',
      name: 'notify',
      component: () => import('../views/NotifyView.vue')
    },
    {
      path: '/chat',
      name: 'chat',
      component: () => import('../views/ChatView.vue')
    },
    {
      path: '/database',
      name: 'database',
      component: () => import('../views/DatabaseView.vue')
    },
    {
      path: '/room',
      name: 'room',
      component: () => import('../views/RoomView.vue')
    }
  ]
})

export default router
