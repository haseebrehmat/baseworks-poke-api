<template>
  <div class="search-filter">
    <input
      v-model="searchQuery"
      type="text"
      placeholder="Search by name or number"
      @input="handleSearch"
      class="search-input"
    />

    <select v-model="selectedType" @change="handleFilterByType" class="filter-select">
      <option value="">All Types</option>
      <option v-for="type in pokemonTypes" :key="type" :value="type">{{ type }}</option>
    </select>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { usePokemonStore } from '@/stores/pokemon'

export default defineComponent({
  setup() {
    const store = usePokemonStore()
    const searchQuery = ref('')
    const selectedType = ref('')
    const pokemonTypes = [
      'Normal',
      'Fire',
      'Water',
      'Electric',
      'Grass',
      'Ice',
      'Fighting',
      'Poison',
      'Ground',
      'Flying',
      'Psychic',
      'Bug',
      'Rock',
      'Ghost',
      'Dragon',
      'Dark',
      'Steel',
      'Fairy'
    ]

    const handleSearch = () => {
      store.searchPokemons(searchQuery.value)
    }

    const handleFilterByType = () => {
      store.filterByType(selectedType.value)
    }

    return {
      searchQuery,
      selectedType,
      pokemonTypes,
      handleSearch,
      handleFilterByType
    }
  }
})
</script>

<style scoped>
.search-filter {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  gap: 12px;
  padding-inline: 1rem;
}

.search-input {
  flex: 1;
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
  transition: border-color 0.2s;
}

.search-input:focus {
  border-color: #4285f4;
  outline: none;
}

.filter-select {
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
  background-color: white;
  transition: border-color 0.2s;
}

.filter-select:focus {
  border-color: #4285f4;
  outline: none;
}

@media (max-width: 768px) {
  .search-filter {
    flex-direction: column;
    align-items: flex-start;
  }

  .search-input,
  .filter-select {
    width: 100%;
  }
}
</style>
