import { GET_POKEMON_TYPES_QUERY } from '@/gql/queries/types';
import { useQuery } from '@apollo/client';

type UseGetPokemonTypesProps = {
  generation: number;
};

export const useGetPokemonTypes = ({ generation }: UseGetPokemonTypesProps) => {
  const { data, error, loading } = useQuery(GET_POKEMON_TYPES_QUERY, {
    variables: {
      generation,
    },
    skip: !generation,
  });

  return {
    data,
    error,
    loading,
  };
};
