import { gql, FragmentData } from "@ts-gql/tag";

const GENERATION_FRAGMENT = gql`
  fragment generation_Fragment on pokemon_v2_generation {
    id
    name
  }
`as import("../../__generated__/ts-gql/generation_Fragment").type

export type GenerationFragmentData = FragmentData<typeof GENERATION_FRAGMENT>

const POKEMON_SPRITES_FRAGMENT = gql`
  fragment pokemon_sprites_Fragment on pokemon_v2_pokemonsprites {
    id
    sprites(path: "other.official-artwork.front_shiny")
  }
`as import("../../__generated__/ts-gql/pokemon_sprites_Fragment").type

export type PokemonSpeciesFragmentData = ReadonlyArray<FragmentData<typeof POKEMON_SPRITES_FRAGMENT>>

const POKEMON_SPECIES_FRAGMENT = gql`
  fragment pokemon_species_Fragment on pokemon_v2_pokemonspecies {
    id
    name
    order
    pokemon_v2_pokemons {
      id
      pokemon_v2_pokemonsprites {
        ...pokemon_sprites_Fragment
      }
    }
  }
`as import("../../__generated__/ts-gql/pokemon_species_Fragment").type

export type PokemonFragmentData = ReadonlyArray<FragmentData<typeof POKEMON_SPECIES_FRAGMENT>>