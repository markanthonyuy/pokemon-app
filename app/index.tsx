import { StyleSheet } from 'react-native';

import { Text, View } from '@/components/Themed';
import { Link } from 'expo-router';
export default function Index() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome</Text>
      <Link href="/(tabs)/list" style={styles.link}>
        <Text style={styles.linkText}>Enter</Text>
      </Link>
    </View>
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
