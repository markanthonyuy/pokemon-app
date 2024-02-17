import { FlatList, StyleSheet, Text, TouchableOpacity } from 'react-native';

import { useGetPokemonTypes } from '@/hooks/gql/useGetPokemonTypes';
import { Container } from '@/components/common/Container';
import { WholePageLoader } from '@/components/common/WholePageLoader';

export default function TypesScreen() {
  const { data, loading } = useGetPokemonTypes({ generation: 1 });
  return (
    <Container>
      {loading && <WholePageLoader />}
      {!loading && <FlatList
        contentContainerStyle={styles.container}
        data={data?.pokemon_v2_pokemontype}
        renderItem={(type) => {
          return (
            <TouchableOpacity style={styles.box}>
              <Text style={styles.text}>
                {type?.item?.pokemon_v2_type?.name.toUpperCase()}
              </Text>
            </TouchableOpacity>
          );
        }}
      />}
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 2,
  },
  box: {
    padding: 20,
    backgroundColor: 'lightblue',
  },
  text: {
    fontSize: 20,
  },
});
