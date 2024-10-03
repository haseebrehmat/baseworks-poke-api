export interface PokemonStat {
  name: string
  base_stat: number
}

export interface PokemonType {
  name: string
  color?: string
}

export interface Pokemon {
  id: number
  name: string
  url: URL | RequestInfo
  stats?: PokemonStat[]
  types?: PokemonType[]
  evolutionChain?: Evolution | null
}
