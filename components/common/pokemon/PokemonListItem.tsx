import { Link } from 'expo-router';
import { Text } from '@/components/Themed';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';
import { MonoText } from '../../StyledText';
import { GET_POKEMON_BY_GENERATION_QUERY } from '@/gql/queries/pokemon';
import { OperationData } from '@ts-gql/tag';

type PokemonListItemProps = {
  pokemon: OperationData<
    typeof GET_POKEMON_BY_GENERATION_QUERY
  >['pokemon_v2_generation'][number]['pokemon_v2_pokemonspecies'][number];
};

export const PokemonListItem = ({ pokemon }: PokemonListItemProps) => {
  return (
    <Link
      push
      href={{
        pathname: '/(list-details)/pokemon',
        params: { id: pokemon.id },
      }}
      asChild
      style={styles.rowContainer}
    >
      <TouchableOpacity
        style={{
          position: 'relative',
        }}
      >
        <MonoText style={styles.orderText}>{pokemon.order}</MonoText>
        <Image
          source={{
            uri: pokemon.pokemon_v2_pokemons[0].pokemon_v2_pokemonsprites[0]
              .sprites,
          }}
          style={styles.image}
        />
        <Text style={styles.name}>{pokemon.name.toUpperCase()}</Text>
      </TouchableOpacity>
    </Link>
  );
};

const styles = StyleSheet.create({
  rowContainer: {
    padding: 10,
    flexBasis: '33.33%',
    gap: 8,
  },
  image: { width: 90, height: 90 },
  name: {
    width: '100%',
    fontSize: 16,
    textAlign: 'center',
  },
  orderText: {
    position: 'absolute',
    fontSize: 11,
    top: 0,
    right: 0,
    padding: 3,
  },
});
