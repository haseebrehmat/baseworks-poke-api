export interface PokemonStat {
  name: string
  base_stat: number
}

export interface PokemonType {
  name: string
  color?: string
}

export interface Evolution {
  species: {
    name: string
    url: string
  }
  evolves_to?: Evolution[]
}

export interface Pokemon {
  id: number
  name: string
  url: URL | RequestInfo
  stats?: PokemonStat[]
  types?: PokemonType[]
  evolutionChain?: Evolution | null
}
