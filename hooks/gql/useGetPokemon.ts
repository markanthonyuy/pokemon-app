import { GET_POKEMON_QUERY } from '@/gql/queries/pokemon';
import { useQuery } from '@apollo/client';

type UseGetPokemonProps = {
  id: string;
};

export const useGetPokemon = ({ id }: UseGetPokemonProps) => {
  const { data, loading, error } = useQuery(GET_POKEMON_QUERY, {
    variables: {
      id: Number(id),
    },
  });

  const pokemon = data?.pokemon_v2_pokemonspecies[0] || null;

  return {
    pokemon,
    loading,
    error,
  };
};
