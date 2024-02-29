import { StyleSheet, Image, useColorScheme } from 'react-native';
import { Text, View } from '@/components/Themed';
import CarouselAutoScroll from '../components/Carousel/Slider';
import { Link } from "expo-router";

export default function HomePage() {
  const colorScheme = useColorScheme();

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require('../assets/images/logo.png')} style={styles.logo} />
      </View>
      <Link href="/(tabs)">'fzergfrtgr'</Link>      
      <Text style={styles.title}>Inscription</Text>
      <CarouselAutoScroll/>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  logoContainer: {
    marginTop: 0,
  },
  logo: {
    width: 250,
    height: 250,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
