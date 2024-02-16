import { TSGQLDocuments } from '@/__generated__/ts-gql/@schema';
import { PokemonFragmentData } from '@/gql/fragments/pokemon';
import { GET_GENERATION_QUERY } from '@/gql/queries/pokemon';
import { useQuery } from '@apollo/client';
import { useState } from 'react';
type OrderBy = TSGQLDocuments['GetGeneration']['___type']['variables']['order'];

type UseGetPokemonPerGenerationProps = {
  name: string;
  order?: OrderBy;
};

export const PAGE_OFFSET = 18;

export const useGetPokemonPerGeneration = ({
  name,
  order = 'asc',
}: UseGetPokemonPerGenerationProps) => {
  const { data, error, loading, fetchMore, networkStatus } = useQuery(
    GET_GENERATION_QUERY,
    {
      variables: {
        name,
        order,
        limit: PAGE_OFFSET,
      },
      skip: !name,
      notifyOnNetworkStatusChange: true,
    }
  );

  const initialQueryData =
    data?.pokemon_v2_generation[0]?.pokemon_v2_pokemonspecies || [];
  const totalCount =
    data?.pokemon_v2_generation[0]?.pokemon_v2_pokemonspecies_aggregate
      ?.aggregate?.count || 0;

  const [offset, setOffset] = useState(0);
  const [pokemons, setPokemons] = useState<PokemonFragmentData>(initialQueryData);

  const allPokemons = pokemons.length ? [...pokemons] : [...initialQueryData];

  const loadMore = async (offset: number) => {
    try {
      await fetchMore({
        variables: {
          offset: offset + PAGE_OFFSET,
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prev;
          setPokemons([
            ...allPokemons,
            ...fetchMoreResult.pokemon_v2_generation[0]
              .pokemon_v2_pokemonspecies,
          ]);
          return {
            ...prev,
            pokemon_v2_generation: [
              {
                ...prev.pokemon_v2_generation[0],
                pokemon_v2_pokemonspecies: [
                  ...prev.pokemon_v2_generation[0].pokemon_v2_pokemonspecies,
                  ...fetchMoreResult.pokemon_v2_generation[0]
                    .pokemon_v2_pokemonspecies,
                ],
              },
            ],
          };
        },
      });
      // Increase offset for next fetchMore
      setOffset(offset);
    } catch (error) {
      // Handle error soon
      console.error('error', error);
    }
  };

  return {
    pokemons: allPokemons,
    error,
    loading,
    loadMore,
    networkStatus,
    offset,
    totalCount,
  };
};
