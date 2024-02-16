import { gql } from '@ts-gql/tag';

export const GET_GENERATION_QUERY = gql`
  query GetGeneration(
    $name: String!
    $limit: Int! = 39
    $offset: Int! = 0
    $order: order_by
  ) {
    pokemon_v2_generation(where: { name: { _eq: $name } }) {
      id
      name
      pokemon_v2_pokemonspecies(
        order_by: { order: $order }
        limit: $limit
        offset: $offset
      ) {
        id
        name
        order
        pokemon_v2_pokemons {
          id
          pokemon_v2_pokemonsprites {
            id
            sprites(path: "other.official-artwork.front_shiny")
          }
        }
      }
      pokemon_v2_pokemonspecies_aggregate {
        aggregate {
          count
        }
      }
    }
  }
` as import('../../__generated__/ts-gql/GetGeneration').type;
