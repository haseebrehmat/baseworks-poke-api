<template>
  <div class="pagination">
    <button @click="prevPage" :disabled="currentPage === 1">Previous</button>
    <span>Page {{ currentPage }} of {{ totalPages }}</span>
    <button @click="nextPage" :disabled="currentPage === totalPages">Next</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { usePokemonStore } from '@/stores/pokemon'

export default defineComponent({
  setup() {
    const pokemonStore = usePokemonStore()

    const totalPages = computed(() => pokemonStore.totalPages)
    const currentPage = computed(() => pokemonStore.currentPage)

    const prevPage = () => {
      if (pokemonStore.currentPage > 1) {
        pokemonStore.currentPage--
      }
    }

    const nextPage = () => {
      if (pokemonStore.currentPage < totalPages.value) {
        pokemonStore.currentPage++
      }
    }

    return {
      currentPage,
      totalPages,
      prevPage,
      nextPage
    }
  }
})
</script>

<style scoped>
.pagination {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
}
button {
  padding: 8px 16px;
  background-color: #4285f4;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>
