import { StyleSheet } from 'react-native';

import { Text } from '@/components/Themed';
import { Link } from 'expo-router';
import { Container } from '@/components/common/Container';
import { Separator } from '@/components/common/Separator';
export default function Index() {
  return (
    <Container style={styles.container}>
      <Text style={styles.title}>Welcome</Text>
      <Link href="/(tabs)/list" style={styles.link}>
        <Text style={styles.linkText}>Enter app</Text>
      </Link>
      <Separator />
      <Text>Prouldy made by Mark Uy</Text>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    fontSize: 24,
    color: '#2e78b7',
  },
});
