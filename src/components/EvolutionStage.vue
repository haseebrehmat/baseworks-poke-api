<template>
  <div>
    <div class="evolution-stage">
      <img :src="getPokemonImageUrl(evolution.species.url)" :alt="evolution.species.name" />
      <p>{{ evolution.species.name }}</p>
    </div>

    <div v-if="evolution.evolves_to.length > 0">
      <EvolutionStage
        v-for="nextEvo in evolution.evolves_to"
        :key="nextEvo.species.name"
        :evolution="nextEvo"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { usePokemonStore } from '@/stores/pokemon'

export default defineComponent({
  props: {
    evolution: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const pokemonStore = usePokemonStore()
    console.log('Props:', props)

    function getPokemonImageUrl(speciesUrl: string) {
      const pokemonId = speciesUrl.split('/').filter(Boolean).pop()
      return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`
    }

    return {
      pokemonStore,
      getPokemonImageUrl
    }
  }
})
</script>

<style scoped>
.evolution-stage {
  margin-bottom: 10px;
}
</style>
