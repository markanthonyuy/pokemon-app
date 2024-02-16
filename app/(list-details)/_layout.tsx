import { Stack } from 'expo-router';

export default function ListDetailsLayout() {
  return (
    <Stack
      screenOptions={{
        headerBackTitle: 'Back',
        headerShown: true,
        title: 'test',
      }}
    >
      <Stack.Screen
        name="pokemon"
        options={{ headerShown: false, title: 'test' }}
      />
    </Stack>
  );
}
