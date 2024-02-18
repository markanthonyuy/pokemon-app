import { View } from '../Themed';
import { Loader } from './Loader';
import { StyleSheet } from 'react-native';

export const WholePageLoader = () => {
  return (
    <View style={styles.container}>
      <Loader />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
