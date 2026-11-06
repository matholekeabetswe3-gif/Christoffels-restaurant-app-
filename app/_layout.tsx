// app/_layout.tsx
// Root layout: wraps the app in MenuProvider so every screen shares one
// source of truth for menu items, and defines the Stack navigator.

import { Stack } from 'expo-router';
import { MenuProvider } from './context/MenuContext';
import { Colors } from '../constants/Colors';

export default function RootLayout() {
  return (
    <MenuProvider>
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: Colors.primary },
          headerTintColor: Colors.white,
          headerTitleStyle: { fontWeight: 'bold' },
          contentStyle: { backgroundColor: Colors.background },
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="Item_details_Update"
          options={{ title: 'Item Detail / Update' }}
        />
      </Stack>
    </MenuProvider>
  );
}
