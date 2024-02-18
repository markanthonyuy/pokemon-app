import { Image, StyleSheet, TouchableOpacity, Linking } from 'react-native';

import { Text, View } from '@/components/Themed';
import { Link } from 'expo-router';
import { Container } from '@/components/common/Container';
import { Separator } from '@/components/common/Separator';
import RNPickerSelect from 'react-native-picker-select';
import { useGenerationContext } from '@/providers/GenerationProvider';
import { useGetGeneration } from '@/hooks/gql/useGetGeneration';
import { useMemo } from 'react';

export default function Index() {
  const { generations } = useGetGeneration()
  const { generation, setGeneration } = useGenerationContext();
  const handleGotoWebsite = () => {
    Linking.openURL('https://markanthonyuy.com');
  };

  const allGenerations = useMemo(() => {
    return generations?.map((generation) => ({ label: `Generation ${generation.id}`, value: generation.name })) || []
  }, [generations])

  return (
    <Container style={styles.container}>
      <Text style={styles.title}>Welcome</Text>
      <Image
        source={require('../assets/images/pokemon-logo.jpg')}
        style={styles.logo}
        resizeMode="contain"
      />

      <View style={styles.generationSelection}>
        <RNPickerSelect
          useNativeAndroidPickerStyle
          fixAndroidTouchableBug
          value={generation}
          placeholder={{ label: 'Select a generation', value: '' }}
          onValueChange={(value) => {
            setGeneration(value)
          }}
          doneText="Select"
          items={allGenerations}
          style={{
            placeholder: {
              color: 'royalblue',
            },
            inputIOS: {
              fontSize: 30,
              fontWeight: 'bold',
              color: 'royalblue',
            }
          }}
        />
      </View>

      {generation && <Link href="/(tabs)/list">
        <Text style={styles.linkText}>Enter app</Text>
      </Link>}

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
    gap: 30,
  },
  logo: {
    width: 350,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  generationSelection: {
    justifyContent: 'center',
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
