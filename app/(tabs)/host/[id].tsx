import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import { Stack, useLocalSearchParams } from 'expo-router';

const DetailsScreen = () => {

  const {id } = useLocalSearchParams();

  const img = 'https://source.unsplash.com/random/320x320';

  const fakeOpeningHours = ['Lundi: 12h-23h', 'Mardi: 12h-23h', 'Mercredi: 12h-23h', 'Jeudi: 12h-23h', 'Vendredi: 12h-23h', 'Samedi: 12h-23h', 'Dimanche: 12h-23h'];
  const renderedDays = fakeOpeningHours.map((day) => {
    return <Text key={day}>{day}</Text>;
  });

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: true, title: `Restaurant ${id}`, headerTitleAlign: 'center' }} />
      <Image
        style={styles.mainImg}
        source={{
          uri: img,
        }}
      />
      <View style={styles.containerTitle}>
        <Text style={styles.titleText}>Restaurant {id}</Text>
        <Text>4 Rue de la Pie</Text>
      </View>
      <View style={styles.containerInfos}>
        <Text style={styles.titleInfos}>Informations</Text>
        <Text>Brasserie moderne avec une cuisine raffinée et une vaste carte des vins.</Text>
      </View>
      <View style={styles.containerInfos}>
        <Text style={styles.titleInfos}>Horaires</Text>
        {renderedDays}
      </View>
    </View>
  );
};

const windowWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  container:{
    flex: 1,
  },
  mainImg: {
    width: windowWidth,
    height: windowWidth * 0.6,
  },
  containerTitle: {
    paddingTop: 15,
    paddingBottom: 10,
    paddingLeft: 15,
    paddingRight: 15,
  },
  containerInfos: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 15,
    paddingRight: 15,
  },
  titleText: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  titleInfos: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
export default DetailsScreen;