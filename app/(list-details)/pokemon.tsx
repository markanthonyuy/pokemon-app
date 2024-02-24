import { MonoText } from '@/components/StyledText';
import { View, Text } from '@/components/Themed';
import { Container } from '@/components/common/Container';
import { WholePageLoader } from '@/components/common/WholePageLoader';
import { useGetPokemon } from '@/hooks/gql/useGetPokemon';
import { useGlobalSearchParams } from 'expo-router';
import React from 'react';
import { StyleSheet, ScrollView, FlatList, Image } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { PokemonDetailsInfoList } from '@/components/common/pokemon/PokemonDetailsInfoList';

export default function PokemonScreen() {
  const params = useGlobalSearchParams<{ id: string }>();
  const { pokemon, loading } = useGetPokemon({
    id: params.id,
  });

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
          <Text style={styles.informationHeading}>Basic Info</Text>
          <View style={styles.information}>
            <PokemonDetailsInfoList label="ID" value={pokemon?.id} />
            <PokemonDetailsInfoList
              label="Height"
              value={pokemon?.pokemon_v2_pokemons[0].height}
            />
            <PokemonDetailsInfoList
              label="Weight"
              value={pokemon?.pokemon_v2_pokemons[0].weight}
            />
            <PokemonDetailsInfoList
              label="type"
              value={
                pokemon?.pokemon_v2_pokemons[0].pokemon_v2_pokemontypes[0]
                  .pokemon_v2_type?.name
              }
            />
            <PokemonDetailsInfoList label="Color">
              <View style={styles.colorAndText}>
                <MonoText>{pokemon?.pokemon_v2_pokemoncolor?.name}</MonoText>
                <View
                  style={[
                    styles.colorCircle,
                    {
                      backgroundColor: pokemon?.pokemon_v2_pokemoncolor?.name,
                    },
                  ]}
                />
              </View>
            </PokemonDetailsInfoList>
            <PokemonDetailsInfoList
              label="Shape"
              value={pokemon?.pokemon_v2_pokemonshape?.name}
            />
            <PokemonDetailsInfoList
              label="Habitat"
              value={pokemon?.pokemon_v2_pokemonhabitat?.name}
            />
            <PokemonDetailsInfoList
              label="Growth Formula"
              value={pokemon?.pokemon_v2_growthrate?.formula}
            />
            <PokemonDetailsInfoList
              label="Base Happiness"
              value={pokemon?.base_happiness}
            />
            <PokemonDetailsInfoList
              label="Base Experience"
              value={pokemon?.pokemon_v2_pokemons[0].base_experience}
            />
            <PokemonDetailsInfoList
              label="Hatch Counter"
              value={pokemon?.hatch_counter}
            />
            <PokemonDetailsInfoList
              label="Capture rate"
              value={`${pokemon?.capture_rate}%`}
            />
          </View>
          <Text style={styles.informationHeading}>Other Info</Text>
          <View style={styles.information}>
            <PokemonDetailsInfoList label="Baby">
              <Entypo
                name={pokemon?.is_baby ? 'check' : 'cross'}
                size={20}
                color={pokemon?.is_baby ? 'green' : 'red'}
              />
            </PokemonDetailsInfoList>
            <PokemonDetailsInfoList label="Legendary">
              <Entypo
                name={pokemon?.is_legendary ? 'check' : 'cross'}
                size={20}
                color={pokemon?.is_legendary ? 'green' : 'red'}
              />
            </PokemonDetailsInfoList>

            <PokemonDetailsInfoList label="Mythical">
              <Entypo
                name={pokemon?.is_mythical ? 'check' : 'cross'}
                size={20}
                color={pokemon?.is_mythical ? 'green' : 'red'}
              />
            </PokemonDetailsInfoList>

            <PokemonDetailsInfoList label="Forms Switchable">
              <Entypo
                name={pokemon?.forms_switchable ? 'check' : 'cross'}
                size={20}
                color={pokemon?.forms_switchable ? 'green' : 'red'}
              />
            </PokemonDetailsInfoList>
          </View>

          <Text style={styles.informationHeading}>Basic Stats</Text>
          <FlatList
            data={pokemon?.pokemon_v2_pokemons[0].pokemon_v2_pokemonstats}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.statsContainer}
            renderItem={(stats) => {
              return (
                <View style={styles.statBox}>
                  <Text style={styles.statName}>
                    {stats.item.pokemon_v2_stat?.name.toUpperCase()}
                  </Text>
                  <Text style={styles.stat}>{stats.item.base_stat}</Text>
                </View>
              );
            }}
          />

          <Text style={styles.informationHeading}>Moves</Text>
          <FlatList
            data={
              pokemon?.pokemon_v2_pokemons[0].pokemon_v2_pokemontypes[0]
                .pokemon_v2_type?.pokemon_v2_moves
            }
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.statsContainer}
            renderItem={(move) => {
              return (
                <View style={styles.statBox}>
                  <Text style={styles.statName}>
                    {move.item.name.toUpperCase()}
                  </Text>
                  <Text style={styles.stat}>{move.item.accuracy}</Text>
                </View>
              );
            }}
          />
        </ScrollView>
      )}
    </Container>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, gap: 20 },
  scrollViewContainer: {
    paddingTop: 20,
    gap: 10,
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
  informationHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    padding: 5,
  },
  information: {
    gap: 1,
    backgroundColor: '#ddd',
  },
  colorCircle: {
    width: 10,
    height: 10,
    borderRadius: 10,
  },
  colorAndText: {
    flexDirection: 'row',
    gap: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statsContainer: {
    gap: 10,
    paddingHorizontal: 10,
  },
  statBox: {
    padding: 10,
    gap: 5,
    backgroundColor: 'lightblue',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  statName: {
    fontSize: 15,
  },
  stat: {
    fontSize: 22,
    fontWeight: 'bold',
  },
});
