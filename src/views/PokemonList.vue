<template>
  <PokemonSearchFilter />

  <div v-if="loading" class="loading">Loading...</div>

  <div v-else class="pokemon-list">
    <PokemonCard
      v-for="pokemon in paginatedPokemons"
      :key="pokemon.name"
      :pokemon="pokemon"
      :imageUrl="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`"
    />
  </div>

  <PokemonPagination />
</template>

<script lang="ts">
import { defineComponent, onMounted, computed } from 'vue'
import PokemonCard from '@/components/PokemonCard.vue'
import PokemonSearchFilter from '@/components/PokemonSearchFilter.vue'
import PokemonPagination from '@/components/PokemonPagination.vue'
import { usePokemonStore } from '@/stores/pokemon'

export default defineComponent({
  components: { PokemonCard, PokemonSearchFilter, PokemonPagination },
  setup() {
    const pokemonStore = usePokemonStore()

    // Fetch the Pokémon when the component is mounted
    onMounted(() => {
      pokemonStore.fetchPokemons()
    })

    const paginatedPokemons = computed(() => pokemonStore.paginatedPokemons)
    const loading = computed(() => pokemonStore.loading)

    return {
      paginatedPokemons,
      loading
    }
  }
})
</script>

<style scoped>
.pokemon-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 16px;
}

.loading {
  text-align: center;
  font-size: 1.5em;
  padding: 20px;
}
</style>
