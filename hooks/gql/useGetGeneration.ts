import { GET_GENERATION_QUERY } from "@/gql/queries/pokemon";
import { useQuery } from "@apollo/client";

export const useGetGeneration = () => {
  const { data, loading, error } = useQuery(GET_GENERATION_QUERY);

  const generations = data?.pokemon_v2_generation || null;

  return {
    generations,
    loading,
    error,
  };
}