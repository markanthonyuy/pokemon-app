import { PAGE_OFFSET } from '@/hooks/gql/useGetPokemonByGeneration';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Loader } from '../Loader';
import { Text, View } from '@/components/Themed';

type PokemonListFooterProps = {
  showLoadMoreButton: boolean;
  loading: boolean;
  offset: number;
  loadMore: (offset: number) => void;
};

export const PokemonListFooter = ({
  showLoadMoreButton,
  loading,
  offset,
  loadMore,
}: PokemonListFooterProps) => {
  if (!showLoadMoreButton) return null;
  return (
    <View style={styles.footer}>
      {loading && <Loader />}
      {!loading && (
        <TouchableOpacity
          onPress={() => {
            if (loading) return;
            loadMore(offset + PAGE_OFFSET);
          }}
          style={styles.footerButton}
        >
          <Text style={styles.loadMore}>Load More</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
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
  loadMore: { fontSize: 20 },
});
