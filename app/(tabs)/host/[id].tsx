import { Text, View } from "@/components/Themed";
import { Stack, router, useLocalSearchParams } from "expo-router";
import { StyleSheet } from "react-native";

export default function HostDetailsScreen () {
    // Extract the host ID from the route parameters
    const { id } = useLocalSearchParams();
   
    // Now you can use the host ID to fetch data or perform other actions
    return (
      <View style={styles.container}>
      <Stack.Screen options={{ headerShown: true, title: `id:${id}` }} />
      <View style={styles.main}>
        <Text>page id : {id}</Text>
        <Text onPress={() => router.back()}>Go back</Text>
      </View>
    </View>
    );
   };
   

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 24,
  },
  main: {
    flex: 1,
    justifyContent: "center",
    maxWidth: 960,
    marginHorizontal: "auto",
  },
});