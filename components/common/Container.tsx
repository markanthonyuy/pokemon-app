import { PropsWithChildren } from 'react';
import { View } from '../Themed';
import { StyleSheet, ViewComponent } from 'react-native';

export const Container = ({
  children,
  ...props
}: PropsWithChildren<ViewComponent['props']>) => {
  return (
    <View style={[styles.container, props.style]} {...props}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
