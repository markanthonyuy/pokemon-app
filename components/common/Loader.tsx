import { PropsWithChildren } from 'react';
import { ActivityIndicator } from 'react-native';

export const Loader = (
  props?: PropsWithChildren<ActivityIndicator | { color: string }>
) => {
  return <ActivityIndicator size="small" color="black" {...props} />;
};
