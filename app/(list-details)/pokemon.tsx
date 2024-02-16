import { Container } from '@/components/common/Container';
import { useGlobalSearchParams } from 'expo-router';
import { Text, StyleSheet } from 'react-native';

export default function PokemonScreen() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { params } = useGlobalSearchParams();

  return (
    <Container style={styles.container}>
      <Text>To be continue</Text>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {},
});
