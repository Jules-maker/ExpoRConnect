import { StyleSheet, Pressable, Image, useColorScheme } from "react-native";
import { Text, View } from "@/components/Themed";
import CarouselAutoScroll from "../components/Carousel/Slider";
import { Link, Stack } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

export default function HomePage() {
  const colorScheme = useColorScheme();
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require("../assets/images/homePhone.png")}
          style={styles.logo}
        />
        <View style={styles.viewContainer} lightColor="black">
          <LinearGradient
            colors={["rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 1)"]}
            locations={[0.3, 1]}
            start={{ x: 0, y: -0.5 }}
            end={{ x: 0, y: 0.6 }}
            style={styles.gradient}
          >
            <Text style={styles.title}>Je t'invite</Text>
          </LinearGradient>
        </View>
      </View>

      <Pressable style={styles.button}>
        <Link replace href="/secondHomeLauncher">
          <Text style={styles.textBottom}>Passer à la suite</Text>
        </Link>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  logoContainer: {
    marginTop: 0,
  },
  viewContainer: {
    backgroundColor:
      "linear-gradient(180deg, rgba(0, 0, 0, 0) 30%, #000000 94.16%);",
    width: "50%",
    height: "100%",
    position: "absolute",
    marginLeft: 26,
    marginBottom: 100,
  },
  logo: {
    width: 250,
    height: 400,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 100,
    elevation: 3,
    backgroundColor: "#D9D18C",
  },
  gradient: {
    height: "100%",
  },
  title: {
    fontSize: 30,
    fontWeight: "400",
  },
  textBottom: {
    fontSize: 20,
    fontWeight: "400",
    textAlign: "center",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
