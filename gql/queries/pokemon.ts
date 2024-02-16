import { gql } from '@ts-gql/tag';

export const GET_GENERATION_QUERY = gql`
  query GetGeneration(
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
` as import('../../__generated__/ts-gql/GetGeneration').type;
