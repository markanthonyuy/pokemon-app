import { FlatList, Platform, StyleSheet, View } from 'react-native';

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
    <>
      {initialDataLoading && (
        <Container style={styles.loadingContainer}>
          <Loader />
        </Container>
      )}
      {!initialDataLoading && (
        <>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              flexGrow: 1,
            }}
          >
            <FlatList
              data={pokemons}
              numColumns={Platform.OS === 'web' ? undefined : 3}
              keyExtractor={(pokemon) => pokemon.id.toString()}
              contentContainerStyle={
                Platform.OS === 'web' ? styles.flatListContainer : {}
              }
              renderItem={(pokemon) => {
                return (
                  <Container>
                    <PokemonListItem
                      pokemon={pokemon.item}
                      key={pokemon.item.id}
                    />
                  </Container>
                );
              }}
              ListFooterComponent={
                Platform.OS === 'web' ? undefined : (
                  <PokemonListFooter
                    showLoadMoreButton={showLoadMoreButton}
                    loading={loadMoreLoading}
                    loadMore={loadMore}
                    offset={offset}
                  />
                )
              }
            />
          </View>
          {Platform.OS === 'web' && (
            <PokemonListFooter
              showLoadMoreButton={showLoadMoreButton}
              loading={loadMoreLoading}
              loadMore={loadMore}
              offset={offset}
            />
          )}
        </>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  loadingContainer: { justifyContent: 'center', flex: 1 },
  flatListContainer: {
    padding: 10,
    flexWrap: 'wrap',
    flexDirection: 'row',
    gap: 8,
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
