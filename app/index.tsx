import {
  Image,
  StyleSheet,
  TouchableOpacity,
  Linking,
  Alert,
  Platform,
} from 'react-native';

import { Text, View } from '@/components/Themed';
import { useRouter } from 'expo-router';
import { Container } from '@/components/common/Container';
import { Separator } from '@/components/common/Separator';
import RNPickerSelect from 'react-native-picker-select';
import { useGenerationContext } from '@/providers/GenerationProvider';
import { useGetGeneration } from '@/hooks/gql/useGetGeneration';
import { useCallback, useMemo } from 'react';

export default function Index() {
  const { generations } = useGetGeneration();
  const { generation, setGeneration, setGenerationId } = useGenerationContext();
  const router = useRouter();
  const handleGotoWebsite = () => {
    Linking.openURL('https://markanthonyuy.com');
  };

  const allGenerations = useMemo(() => {
    return (
      generations?.map((generation) => ({
        label: `Generation ${generation.id}`,
        value: generation.name,
        id: generation.id,
      })) || []
    );
  }, [generations]);

  const handleCloseGenerationPicker = useCallback(
    (donePress: boolean) => {
      const messageTitle = 'Unable to Proceed';
      const messagePart1 = 'Please select a generation. ';
      const messagePart2 =
        Platform.OS === 'ios'
          ? 'Press "Select" to continue.'
          : 'Please select a generation to continue.';
      if (donePress) {
        if (generation) {
          router.push('/(tabs)/list');
          return;
        }
        Alert.alert(messageTitle, messagePart2);
        return;
      }
      Alert.alert(
        messageTitle,
        `${!generation ? messagePart1 : ''}${messagePart2}`
      );
    },
    [generation]
  );

  const handleGenerationChange = useCallback(
    (value: string) => {
      setGeneration(value);
      const id = allGenerations.find(
        (generation) => generation.value === value
      )?.id;
      setGenerationId(id);
    },
    [allGenerations]
  );

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
          useNativeAndroidPickerStyle={false}
          fixAndroidTouchableBug
          value={generation}
          placeholder={{ label: 'Select a generation', value: '' }}
          onValueChange={handleGenerationChange}
          // Documentation says otherwise, I think creator forgot to add type for the prop. So adding ts-ignore for now
          // From the documentation "Callback triggered right before the closing of the picker. It has one boolean parameter indicating if the done button was pressed or not"
          // @ts-ignore
          onClose={handleCloseGenerationPicker} // IOS only
          doneText="Select"
          items={allGenerations}
          touchableWrapperProps={{
            onBlur: () => handleCloseGenerationPicker(true), // Android only
          }}
          style={{
            inputAndroidContainer: {
              borderRadius: 10,
              backgroundColor: 'lightblue',
              paddingVertical: 10,
              padding: 20,
            },
            inputIOSContainer: {
              borderRadius: 10,
              backgroundColor: 'lightblue',
              paddingVertical: 10,
              padding: 20,
            },
            placeholder: {
              color: 'black',
            },
            inputIOS: {
              fontSize: 24,
              color: 'black',
            },
            inputAndroid: {
              fontSize: 24,
              color: 'black',
            },
          }}
        />
      </View>

      <Separator />
      <TouchableOpacity onPress={handleGotoWebsite}>
        <Text>
          Made with ❤️ by <Text style={styles.footerLink}>Mark Uy</Text>
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
