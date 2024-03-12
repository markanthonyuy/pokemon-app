import Colors from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { PropsWithChildren } from 'react';
import { ActivityIndicator } from 'react-native';

export const Loader = (props?: PropsWithChildren<ActivityIndicator | {}>) => {
  const colorScheme = useColorScheme();

  return (
    <ActivityIndicator
      size="small"
      color={Colors[colorScheme ?? 'light'].tint}
      {...props}
    />
  );
};
