<template>
  <div v-if="pokemon" class="pokemon-details">
    <!-- Pokemon Name and Image -->
    <h1>{{ pokemon.name }}</h1>
    <img :src="imageUrl" :alt="pokemon.name" class="pokemon-image" />

    <!-- Pokemon Stats -->
    <div class="stats">
      <h3>Stats:</h3>
      <ul>
        <li v-for="stat in pokemon.stats" :key="stat.name">
          <strong>{{ stat.name }}:</strong> {{ stat.base_stat }}
        </li>
      </ul>
    </div>

    <!-- Pokemon Types with Colors -->
    <div class="types">
      <h3>Types:</h3>
      <span
        v-for="type in pokemon.types"
        :key="type.name"
        :style="{ backgroundColor: type.color }"
        class="type-chip"
      >
        {{ type.name }}
      </span>
    </div>

    <!-- Evolution Chain -->
    <div class="evolutions" v-if="pokemon.evolutionChain">
      <h3>Evolution Chain:</h3>
      <div v-if="loading" class="loading">Loading Evolutions...</div>
      <div class="evolution-chain">
        <EvolutionStage :evolution="pokemon.evolutionChain" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { usePokemonStore } from '@/stores/pokemon'
import EvolutionStage from '@/components/EvolutionStage.vue'

export default defineComponent({
  components: { EvolutionStage },
  setup() {
    const route = useRoute()
    const pokemonStore = usePokemonStore()
    const pokemonName = route.params.name as string

    // Fetch Pokémon details when component is mounted
    onMounted(async () => {
      await pokemonStore.fetchPokemonDetails(pokemonName)
    })

    // Helper function to get image URL from Pokémon ID
    function getPokemonImageUrl(ID: number) {
      return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${ID}.png`
    }

    const pokemon = computed(() => pokemonStore.selectedPokemon)
    const loading = computed(() => pokemonStore.loading)

    // Computed property for Pokémon image
    const imageUrl = computed(() => {
      return pokemon.value ? getPokemonImageUrl(pokemon.value.id) : ''
    })

    return {
      pokemon,
      loading,
      imageUrl
    }
  }
})
</script>

<style scoped>
.pokemon-details {
  max-width: 600px;
  margin: 20px auto;
  padding: 20px;
  background-color: #f9f9f9;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  font-family: Arial, sans-serif;
}

.pokemon-details h1 {
  text-align: center;
  font-size: 2.5em;
  margin-bottom: 10px;
}

.pokemon-image {
  display: block;
  margin: 0 auto 20px;
  width: 200px;
  height: 200px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

.stats,
.types,
.evolutions {
  margin: 20px 0;
  padding: 10px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.stats h3,
.types h3,
.evolutions h3 {
  margin: 0 0 10px;
}

.stats ul {
  list-style: none;
  padding: 0;
}

.stats li {
  padding: 5px 0;
  border-bottom: 1px solid #eee;
}

.types {
  display: flex;
  flex-wrap: wrap;
}

.type-chip {
  padding: 8px;
  border-radius: 4px;
  margin-right: 10px;
  margin-bottom: 10px;
  color: white; /* Adjust text color for better contrast */
  font-weight: bold;
}

.evolution-chain {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.loading {
  text-align: center;
  font-style: italic;
}
</style>
