import { View } from '@/components/Themed';
import { Container } from '@/components/common/Container';
import { WholePageLoader } from '@/components/common/WholePageLoader';
import { useGetPokemon } from '@/hooks/gql/useGetPokemon';
import { useGlobalSearchParams } from 'expo-router';
import { Text, StyleSheet, ScrollView, FlatList, Image } from 'react-native';

export default function PokemonScreen() {
  const params = useGlobalSearchParams<{ id: string }>();
  const { pokemon, loading } = useGetPokemon({ id: params.id });

  return (
    <Container style={styles.container}>
      {loading && <WholePageLoader />}
      {!loading && (
        <ScrollView contentContainerStyle={styles.scrollViewContainer}>
          <Text style={styles.name}>{pokemon?.name.toLocaleUpperCase()}</Text>
          <FlatList
            data={pokemon?.pokemon_v2_pokemons[0].pokemon_v2_pokemonsprites}
            horizontal
            showsHorizontalScrollIndicator={false}
            // @ts-ignore
            renderItem={({ item }) => {
              return Object.entries<string>(item.sprites).map(
                ([key, value]) => {
                  return (
                    value && (
                      <Image
                        source={{
                          uri: value,
                        }}
                        key={key}
                        style={styles.image}
                        resizeMode="contain"
                      />
                    )
                  );
                }
              );
            }}
          />
          <View style={styles.information}>
            <Text style={styles.informationText}>
              Height: {pokemon?.pokemon_v2_pokemons[0].height}
            </Text>
            <Text style={styles.informationText}>
              Weight: {pokemon?.pokemon_v2_pokemons[0].weight}
            </Text>
            <Text style={styles.informationText}>
              Color: {pokemon?.pokemon_v2_pokemoncolor?.name}
            </Text>
            <Text style={styles.informationText}>
              Shape: {pokemon?.pokemon_v2_pokemonshape?.name}
            </Text>
            <Text style={styles.informationText}>
              Habitat: {pokemon?.pokemon_v2_pokemonhabitat?.name}
            </Text>
            <Text style={styles.informationText}>
              Growth Rate Forumla: {pokemon?.pokemon_v2_growthrate?.formula}
            </Text>
          </View>
        </ScrollView>
      )}
    </Container>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, gap: 20 },
  scrollViewContainer: {
    paddingTop: 20,
    gap: 20,
  },
  name: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  image: {
    width: 130,
    height: 130,
  },
  information: {
    padding: 10,
    gap: 5,
  },
  informationText: {
    fontSize: 18,
  },
});
