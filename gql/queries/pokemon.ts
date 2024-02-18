import { gql } from '@ts-gql/tag';

export const GET_GENERATION_QUERY = gql`
  query GetGeneration {
    pokemon_v2_generation {
      ...generation_Fragment
    }
  }
` as import('../../__generated__/ts-gql/GetGeneration').type;

export const GET_POKEMON_BY_GENERATION_QUERY = gql`
  query GetPokemonByGeneration(
    $name: String!
    $limit: Int!
    $offset: Int! = 0
    $order: order_by
  ) {
    pokemon_v2_generation(where: { name: { _eq: $name } }) {
      id
      ...generation_Fragment
      pokemon_v2_pokemonspecies(
        order_by: { order: $order }
        limit: $limit
        offset: $offset
      ) {
        ...pokemon_species_Fragment
      }
      pokemon_v2_pokemonspecies_aggregate {
        aggregate {
          count
        }
      }
    }
  }
` as import('../../__generated__/ts-gql/GetPokemonByGeneration').type;

// TODO: Split to fragments
export const GET_POKEMON_QUERY = gql`
  query GetPokemon($id: Int) {
    pokemon_v2_pokemonspecies(where: { id: { _eq: $id } }) {
      name
      forms_switchable
      gender_rate
      id
      is_baby
      is_legendary
      is_mythical
      order
      pokemon_v2_pokemonshape {
        id
        name
      }
      pokemon_v2_pokemoncolor {
        id
        name
      }
      pokemon_v2_evolutionchain {
        id
      }
      pokemon_v2_pokemonspeciesdescriptions {
        id
        description
      }
      pokemon_v2_pokemonspeciesnames {
        id
        name
      }
      pokemon_v2_pokemons {
        id
        height
        weight
        pokemon_v2_pokemonsprites {
          id
          sprites(path: "other.showdown")
        }
        pokemon_v2_pokemonstats {
          base_stat
          effort
          id
          stat_id
          pokemon_v2_stat {
            id
            name
          }
        }
        pokemon_v2_pokemontypes {
          id
          pokemon_v2_type {
            id
            name
            pokemon_v2_moves {
              id
              name
              accuracy
              move_effect_chance
            }
          }
        }
      }
      pokemon_v2_pokemonhabitat {
        id
        name
      }
      pokemon_v2_growthrate {
        id
        formula
      }
    }
  }
` as import('../../__generated__/ts-gql/GetPokemon').type;
