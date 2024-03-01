import Colors from "@/constants/Colors";
import { FontAwesome } from "@expo/vector-icons";
import { Link, Stack } from "expo-router";
import { Pressable, useColorScheme } from "react-native";

export default function HostLayout() {
  const colorScheme = useColorScheme();
  return <Stack screenOptions={{ headerShown: true, title: 'Accueil', headerTitleAlign: 'center', 
  headerRight: () => (
    <Link href="/modal" asChild>
      <Pressable>
        {({ pressed }) => (
          <FontAwesome
            name="info-circle"
            size={25}
            color={Colors[colorScheme ?? 'light'].text}
            style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
          />
        )}
      </Pressable>
    </Link>
  ), }} />;
}