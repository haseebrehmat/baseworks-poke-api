<template>
  <RouterLink :to="{ name: 'PokemonDetails', params: { name: pokemon.name } }" class="pokemon-card">
    <img :src="imageUrl" :alt="pokemon.name" class="pokemon-image" />
    <div class="pokemon-info">
      <h3>{{ pokemon.name }}</h3>
      <p>#000{{ pokemon.id }}</p>
      <div class="pokemon-types">
        <div
          v-for="type in pokemon.types"
          :key="type.name"
          class="pokemon-type"
          :style="{ backgroundColor: type.color }"
        >
          {{ type.name }}
        </div>
      </div>
    </div>
  </RouterLink>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue'
import type { Pokemon } from '@/types/pokemon'

export default defineComponent({
  props: {
    pokemon: {
      type: Object as PropType<Pokemon>,
      required: true
    },
    imageUrl: {
      type: String,
      required: true
    }
  }
})
</script>

<style scoped>
.pokemon-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: rgb(238, 238, 238);
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
  padding: 16px;
  transition: box-shadow 0.3s ease;
  text-align: center;
  width: 100%;
  max-width: 240px;
  cursor: pointer;
  text-decoration: none;
}

.pokemon-card:hover {
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.15);
}

.pokemon-image {
  width: 120px;
  height: 120px;
  object-fit: cover;
  margin-bottom: 16px;
}

.pokemon-info h3 {
  font-size: 1.2rem;
  font-weight: 500;
  margin: 0;
  color: #202124;
}

.pokemon-info p {
  font-size: 1rem;
  color: #5f6368;
  margin: 4px 0 0;
}

@media (max-width: 768px) {
  .pokemon-card {
    max-width: 200px;
    padding: 12px;
  }

  .pokemon-image {
    width: 100px;
    height: 100px;
  }

  .pokemon-info h3 {
    font-size: 1rem;
  }

  .pokemon-info p {
    font-size: 0.875rem;
  }
}

.pokemon-types {
  margin-top: 8px;
}

.pokemon-type {
  border-radius: 4px;
  border-radius: 10px;
  padding: 4px 8px;
  margin-right: 4px;
  color: white;
  display: inline-block;
}

@media (max-width: 480px) {
  .pokemon-card {
    max-width: 150px;
    padding: 8px;
  }

  .pokemon-image {
    width: 80px;
    height: 80px;
  }

  .pokemon-info h3 {
    font-size: 0.875rem;
  }

  .pokemon-info p {
    font-size: 0.75rem;
  }
}
</style>
