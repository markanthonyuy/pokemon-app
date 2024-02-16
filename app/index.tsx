import { Image, StyleSheet, TouchableOpacity, Linking } from 'react-native';

import { Text } from '@/components/Themed';
import { Link } from 'expo-router';
import { Container } from '@/components/common/Container';
import { Separator } from '@/components/common/Separator';
export default function Index() {
  const handleGotoWebsite = () => {
    Linking.openURL('https://markanthonyuy.com');
  };

  return (
    <Container style={styles.container}>
      <Text style={styles.title}>Welcome</Text>
      <Image
        source={require('../assets/images/pokemon-logo.jpg')}
        style={styles.logo}
        resizeMode="contain"
      />
      <Link href="/(tabs)/list">
        <Text style={styles.linkText}>Enter app</Text>
      </Link>
      <Separator />
      <TouchableOpacity onPress={handleGotoWebsite}>
        <Text>
          Prouldy made by <Text style={styles.footerLink}>Mark Uy</Text>
        </Text>
      </TouchableOpacity>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
  },
  logo: {
    width: 350,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  footerLink: {
    color: '#2e78b7',
    fontWeight: 'bold',
  },
  linkText: {
    fontSize: 24,
    color: '#2e78b7',
  },
});
