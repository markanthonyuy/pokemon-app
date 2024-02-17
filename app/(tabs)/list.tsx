import { FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';

import { Text, View } from '@/components/Themed';
import {
  PAGE_OFFSET,
  useGetPokemonPerGeneration,
} from '@/hooks/gql/useGetPokemonPerGeneration';
import { Container } from '@/components/common/Container';
import { Loader } from '@/components/common/Loader';
import { Link } from 'expo-router';
import { useGeneration } from '@/providers/GenerationProvider';
export default function ListScreen() {
  const { generation } = useGeneration()
  const { pokemons, loading, loadMore, offset, totalCount, networkStatus } =
    useGetPokemonPerGeneration({ name: generation });

  // Easier to read logic
  const initialDataLoading = loading && networkStatus === 7;
  const loadMoreLoading = loading && networkStatus === 3;
  const showLoadMoreButton = pokemons.length + PAGE_OFFSET < totalCount;

  return (
    <Container>
      {initialDataLoading && (
        <Container>
          <Loader />
        </Container>
      )}
      <FlatList
        data={pokemons}
        contentContainerStyle={styles.listContainer}
        numColumns={3}
        keyExtractor={(pokemon) => pokemon.id.toString()}
        renderItem={(pokemon) => {
          return (
            <Link
              push
              href={{
                pathname: '/(list-details)/pokemon',
                params: { id: pokemon.item.id },
              }}
              asChild
              style={styles.rowContainer}
            >
              <TouchableOpacity>
                <Image
                  source={{
                    uri: pokemon.item.pokemon_v2_pokemons[0]
                      .pokemon_v2_pokemonsprites[0].sprites,
                  }}
                  style={styles.image}
                />
                <Text style={styles.name}>
                  {pokemon.item.name.toUpperCase()}
                </Text>
              </TouchableOpacity>
            </Link>
          );
        }}
        ListFooterComponent={() => {
          return (
            showLoadMoreButton && (
              <View style={styles.footer}>
                {loadMoreLoading && <Loader />}
                {!loadMoreLoading && (
                  <TouchableOpacity
                    onPress={() => {
                      loadMore(offset + PAGE_OFFSET);
                    }}
                    style={styles.footerButton}
                  >
                    <Text style={{ fontSize: 20 }}>Load More</Text>
                  </TouchableOpacity>
                )}
              </View>
            )
          );
        }}
      />
    </Container>
  );
}

const styles = StyleSheet.create({
  listContainer: {},
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
