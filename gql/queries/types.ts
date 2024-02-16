import { gql } from '@ts-gql/tag';

export const GET_POKEMON_TYPES_QUERY = gql`
  query GetPokemonTypes($generation: Int!) {
    pokemon_v2_pokemontype(
      where: { pokemon_v2_type: { generation_id: { _eq: $generation } } }
      distinct_on: type_id
    ) {
      id
      pokemon_v2_type {
        id
        name
        pokemon_v2_moves {
          id
          name
        }
      }
      type_id
    }
  }
` as import('../../__generated__/ts-gql/GetPokemonTypes').type;
