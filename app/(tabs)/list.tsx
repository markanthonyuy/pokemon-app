import { FlatList, StyleSheet } from 'react-native';

import {
  PAGE_OFFSET,
  useGetPokemonByGeneration,
} from '@/hooks/gql/useGetPokemonByGeneration';
import { Container } from '@/components/common/Container';
import { Loader } from '@/components/common/Loader';
import { useGenerationContext } from '@/providers/GenerationProvider';
import { PokemonListItem } from '@/components/common/pokemon/PokemonListItem';
import { PokemonListFooter } from '@/components/common/pokemon/PokemonListFooter';
export default function ListScreen() {
  const { generation } = useGenerationContext();
  const { pokemons, loading, loadMore, offset, totalCount, networkStatus } =
    useGetPokemonByGeneration({ name: generation });

  // Easier to read logic
  const initialDataLoading = loading && networkStatus === 1;
  const loadMoreLoading = loading && networkStatus === 3;
  const showLoadMoreButton = pokemons.length + PAGE_OFFSET < totalCount;

  return (
    <Container>
      {initialDataLoading && (
        <Container style={styles.container}>
          <Loader />
        </Container>
      )}
      {!initialDataLoading && (
        <FlatList
          data={pokemons}
          numColumns={3}
          keyExtractor={(pokemon) => pokemon.id.toString()}
          renderItem={(pokemon) => {
            return (
              <PokemonListItem pokemon={pokemon.item} key={pokemon.item.id} />
            );
          }}
          ListFooterComponent={
            <PokemonListFooter
              showLoadMoreButton={showLoadMoreButton}
              loading={loadMoreLoading}
              loadMore={loadMore}
              offset={offset}
            />
          }
        />
      )}
    </Container>
  );
}

const styles = StyleSheet.create({
  container: { justifyContent: 'center' },
  rowContainer: {
    padding: 10,
    backgroundColor: '#fafafa',
    flexGrow: 1,
    flexBasis: 0,
    gap: 8,
    alignItems: 'center',
  },
  image: { width: 90, height: 90 },
  name: {
    width: '100%',
    fontSize: 16,
    textAlign: 'center',
  },
  footer: {
    padding: 10,
    alignItems: 'center',
    backgroundColor: 'lightblue',
  },
  footerButton: {
    padding: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightblue',
  },
});
