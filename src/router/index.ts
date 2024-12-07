import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CartView from '../views/CartView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/destination/:id',
      name: 'destination-details',
      component: () => import('../views/DestinationView.vue'),
    },
    {
      path: '/cart',
      name: 'cart',
      component: CartView,
    },
  ],
})

export default router
