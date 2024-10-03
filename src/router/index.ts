import { createRouter, createWebHistory } from 'vue-router'

import PokemonDetails from '@/views/PokemonDetails.vue'
import PokemonList from '@/views/PokemonList.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: PokemonList, name: 'PokemonList' },
    { path: '/:name', component: PokemonDetails, name: 'PokemonDetails' }
  ]
})

export default router
