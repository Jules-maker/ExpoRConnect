import { Stack } from "expo-router";

export default function MapLayout() {
  return <Stack screenOptions={{ headerShown: true,  title: 'Carte', headerTitleAlign: 'center' }} />;
}