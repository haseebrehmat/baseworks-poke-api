import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PokemonList from '@/views/PokemonList.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: PokemonList, name: 'PokemonList' },
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      component: () => import('../views/AboutView.vue')
    }
  ]
})

export default router
