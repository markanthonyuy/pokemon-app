import { Stack } from 'expo-router';

export default function ListDetailsLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="pokemon" />
    </Stack>
  );
}
