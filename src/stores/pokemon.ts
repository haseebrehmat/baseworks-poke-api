import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Pokemon } from '@/types/pokemon'

export const usePokemonStore = defineStore('pokemon', () => {
  const pokemons = ref<Pokemon[]>([])
  const filteredPokemons = ref<Pokemon[]>([])
  const searchQuery = ref('')
  const selectedType = ref('')
  const selectedPokemon = ref<Pokemon | null>(null)
  const loading = ref(false)
  const currentPage = ref(1)
  const pokemonsPerPage = ref(20)

  const batchSize = 50

  const typesColors: { [key: string]: string } = {
    normal: '#A8A77A',
    fire: '#EE8130',
    water: '#6390F0',
    electric: '#F7D02C',
    grass: '#7AC74C',
    ice: '#96D9D6',
    fighting: '#C22E28',
    poison: '#A33EA1',
    ground: '#E2BF65',
    flying: '#A98FF3',
    psychic: '#F95587',
    bug: '#A6B91A',
    rock: '#B6A136',
    ghost: '#735797',
    dragon: '#6F35FC',
    dark: '#705746',
    steel: '#B7B7CE',
    fairy: '#D685AD'
  }

  // Helper function to fetch Pokémon details, types, and evolution chain
  async function fetchPokemonDetails(pokemonName: string) {
    loading.value = true
    try {
      // Fetch Pokémon details
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
      const data = await response.json()

      // Extract types and stats from the Pokémon data
      selectedPokemon.value = {
        id: data.id,
        name: data.name,
        url: data.url,
        stats: data.stats.map((stat: any) => ({
          name: stat.stat.name,
          base_stat: stat.base_stat
        })),
        types: data.types.map((typeInfo: any) => ({
          name: typeInfo.type.name,
          color: typesColors[typeInfo.type.name] || '#ccc'
        }))
      }

      // Fetch species data to get the evolution chain URL
      const speciesResponse = await fetch(data.species.url)
      const speciesData = await speciesResponse.json()

      // Fetch evolution chain data
      const evolutionResponse = await fetch(speciesData.evolution_chain.url)
      const evolutionData = await evolutionResponse.json()
      selectedPokemon.value.evolutionChain = evolutionData.chain
    } catch (error) {
      console.error('Error fetching Pokémon details and evolution chain:', error)
    } finally {
      loading.value = false
    }
  }

  // Helper function to fetch details for each Pokémon
  async function fetchPokemonTypes(pokemon: Pokemon) {
    try {
      const response = await fetch(pokemon.url)
      const data = await response.json()
      return {
        ...pokemon,
        types: data.types.map((typeInfo: any) => ({
          name: typeInfo.type.name,
          color: typesColors[typeInfo.type.name]
        }))
      }
    } catch (error) {
      console.error('Error fetching Pokémon details:', error)
      return {
        ...pokemon,
        types: [] // In case of error, return an empty types array
      }
    }
  }

  // Utility function to chunk an array into smaller arrays of a specific size
  function chunkArray(array: any[], chunkSize: number) {
    const result = []
    for (let i = 0; i < array.length; i += chunkSize) {
      result.push(array.slice(i, i + chunkSize))
    }
    return result
  }

  // Fetch all Pokémon and their details in batches
  async function fetchPokemons() {
    loading.value = true
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=1305`)
      const data = await response.json()

      const pokemonResults = data.results.map((pokemon: any) => {
        const id = pokemon.url
          .split('/')
          .filter((part: string) => part)
          .pop()
        return {
          ...pokemon,
          id: Number(id),
          types: [] // Placeholder for types, which will be fetched later
        }
      })

      // Process the pokemons in batches
      const chunks = chunkArray(pokemonResults, batchSize)

      for (const chunk of chunks) {
        const pokemonDetailsPromises = chunk.map((pokemon) => fetchPokemonTypes(pokemon))
        const pokemonDetails = await Promise.all(pokemonDetailsPromises)

        // Merge the fetched details with the existing Pokémon list
        pokemons.value = [...pokemons.value, ...pokemonDetails]
      }

      // Initially set filteredPokemons to all pokemons (no search applied)
      filteredPokemons.value = [...pokemons.value]
    } catch (error) {
      console.error('Error fetching Pokémon:', error)
    } finally {
      loading.value = false
    }
  }

  // Function to handle search
  function searchPokemons(query: string) {
    searchQuery.value = query
    filterPokemons() // Apply the filter when search changes
  }

  // Function to handle filtering by type
  function filterByType(type: string) {
    selectedType.value = type
    filterPokemons() // Apply the filter when type changes
  }

  // Function to filter Pokémon based on both search query and type
  function filterPokemons() {
    filteredPokemons.value = pokemons.value.filter((pokemon) => {
      const matchesSearch =
        pokemon.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        pokemon.id.toString().includes(searchQuery.value)

      const matchesType =
        selectedType.value === '' ||
        pokemon?.types?.some((type) => type.name.toLowerCase() === selectedType.value.toLowerCase())

      return matchesSearch && matchesType
    })

    // Reset pagination to first page after a new filter is applied
    currentPage.value = 1
  }

  // Computed property to slice the filtered Pokémon array based on pagination
  const paginatedPokemons = computed(() => {
    const start = (currentPage.value - 1) * pokemonsPerPage.value
    const end = start + pokemonsPerPage.value
    return filteredPokemons.value.slice(start, end)
  })

  // Compute total pages based on the filtered Pokémon list
  const totalPages = computed(() => {
    return Math.ceil(filteredPokemons.value.length / pokemonsPerPage.value)
  })

  return {
    pokemons,
    filteredPokemons,
    selectedPokemon,
    fetchPokemons,
    currentPage,
    loading,
    pokemonsPerPage,
    searchQuery,
    selectedType,
    searchPokemons, // Expose the search function
    filterByType, // Expose the filter by type function
    paginatedPokemons,
    totalPages,
    fetchPokemonDetails
  }
})
