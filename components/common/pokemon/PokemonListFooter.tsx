import { PAGE_OFFSET } from '@/hooks/gql/useGetPokemonByGeneration';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Loader } from '../Loader';
import { Text, View } from '@/components/Themed';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

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
  const colorScheme = useColorScheme();
  if (!showLoadMoreButton) return null;
  return (
    <View
      style={[
        styles.footer,
        { backgroundColor: Colors[colorScheme ?? 'light'].background },
      ]}
    >
      {loading && (
        <View style={styles.loaderContainer}>
          <Loader />
        </View>
      )}
      {!loading && (
        <TouchableOpacity
          onPress={() => {
            if (loading) return;
            loadMore(offset + PAGE_OFFSET);
          }}
          style={styles.footerButton}
        >
          <Text style={[styles.loadMore]}>LOAD MORE</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    alignItems: 'center',
  },
  footerButton: {
    width: '100%',
    paddingVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f3f3f3',
  },
  loaderContainer: {
    padding: 20,
  },
  loadMore: { fontSize: 14 },
});
