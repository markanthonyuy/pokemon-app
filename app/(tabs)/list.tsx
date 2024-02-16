import { FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';

import { Text, View } from '@/components/Themed';
import {
  PAGE_OFFSET,
  useGetPokemonPerGeneration,
} from '@/hooks/gql/useGetPokemonPerGeneration';
import { Container } from '@/components/common/Container';
import { Loader } from '@/components/common/Loader';
export default function ListScreen() {
  const { pokemons, loading, loadMore, offset, totalCount, networkStatus } =
    useGetPokemonPerGeneration({ name: 'generation-i' });
  console.log(offset, totalCount, pokemons.length, networkStatus);

  return (
    <Container>
      {loading && networkStatus === 7 && (
        <Container>
          <Loader />
        </Container>
      )}
      {
        <FlatList
          data={pokemons}
          contentContainerStyle={styles.listContainer}
          numColumns={3}
          renderItem={(pokemon) => {
            return (
              <TouchableOpacity
                onPress={() => null}
                style={styles.rowContainer}
              >
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
            );
          }}
          ListFooterComponent={() => {
            return (
              pokemons.length + PAGE_OFFSET < totalCount && (
                <View style={styles.footer}>
                  {loading && networkStatus === 3 && <Loader />}
                  {!loading && networkStatus !== 3 && (
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
      }
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
    alignItems: 'flex-start',
  },
  image: { width: 90, height: 90 },
  name: {
    fontSize: 16,
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
