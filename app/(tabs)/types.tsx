import { FlatList, StyleSheet, Text, TouchableOpacity } from 'react-native';

import { useGetPokemonTypes } from '@/hooks/gql/useGetPokemonTypes';
import { Container } from '@/components/common/Container';
import { WholePageLoader } from '@/components/common/WholePageLoader';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TypesScreen() {
  const { data, loading } = useGetPokemonTypes({ generation: 1 });
  const colorScheme = useColorScheme();
  return (
    <Container>
      {loading && <WholePageLoader />}
      {!loading && (
        <FlatList
          contentContainerStyle={styles.container}
          data={data?.pokemon_v2_pokemontype}
          renderItem={(type) => {
            return (
              <TouchableOpacity
                style={[
                  styles.box,
                  {
                    backgroundColor: Colors[colorScheme ?? 'light'].background,
                  },
                ]}
              >
                <Text style={styles.text}>
                  {type?.item?.pokemon_v2_type?.name.toUpperCase()}
                </Text>
              </TouchableOpacity>
            );
          }}
        />
      )}
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 2,
  },
  box: {
    padding: 20,
  },
  text: {
    fontSize: 20,
  },
});
