import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import productsView from '../views/ProductsView.vue'
import pastOrdersView from '../views/PastOrderView.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/products',
    name: 'Products',
    component: productsView
  },
  {
    path: '/past-orders',
    name: 'Past-orders',
    component: pastOrdersView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
