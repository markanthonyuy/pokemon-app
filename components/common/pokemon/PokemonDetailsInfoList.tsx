import { View, Text } from '@/components/Themed';
import { MonoText } from '@/components/StyledText';
import { StyleSheet } from 'react-native';
import { PropsWithChildren } from 'react';

type PokemonDetailsInfoListProps = {
  label: string;
  value?: string | number | null;
};

export const PokemonDetailsInfoList = ({
  label,
  value,
  children,
}: PropsWithChildren<PokemonDetailsInfoListProps>) => {
  return (
    <View style={styles.informationText}>
      <Text style={styles.informationName}>{label} :</Text>
      {children && children}
      {!children && <MonoText>{value || '-'}</MonoText>}
    </View>
  );
};

const styles = StyleSheet.create({
  informationText: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  informationName: {
    fontSize: 16,
  },
});
