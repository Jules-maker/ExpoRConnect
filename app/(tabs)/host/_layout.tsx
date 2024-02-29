import { Stack } from "expo-router";

export default function HostLayout() {
  return <Stack screenOptions={{ headerShown: true, title: 'Lieux' }} />;
}