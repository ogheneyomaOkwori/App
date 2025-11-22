import { Stack } from "expo-router";
import { StatusBar } from "react-native";
import './globals.css';

export default function RootLayout() {
  return (
    <>
      <StatusBar hidden={true} />
      <Stack>
        <Stack.Screen
          name="(tabs)"
          options={{
            headerTitle: 'Home',
            headerShown: false
          }}
        />
        <Stack.Screen
          name="(tabs)/search"
          options={{
            headerTitle: 'Search',
            headerShown: false
          }}
        />
        <Stack.Screen
          name="(tabs)/saved"
          options={{
            headerTitle: 'Saved',
            headerShown: false
          }}
        />
        <Stack.Screen
          name="(tabs)/profile"
          options={{
            headerTitle: 'Profile',
            headerShown: false
          }}
        />
        <Stack.Screen
          name="movies/[id]"
          options={{
            headerTitle: 'Movie Details',
            headerShown: false
          }}
        />
      </Stack>
    </>
  );
}
