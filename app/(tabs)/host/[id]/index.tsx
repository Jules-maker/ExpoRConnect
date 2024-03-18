import { View, Text, Image, StyleSheet, Dimensions, ActivityIndicator } from 'react-native';
import { Stack, useLocalSearchParams } from 'expo-router';
import { api } from '@/tools/Api';
import { useSession } from '@/components/Ctx';
import { Host } from '@/models/hostModel';
import { useEffect, useState } from 'react';

const DetailsScreen = () => {
  const { id } = useLocalSearchParams();
  const { session } = useSession();

  const [host, setHost] = useState<Host | null>(null);
  const fetchDataHost = async () => {
    const response = await api.get(`api/Host/${id}`, { headers: { Authorization: session } });
    console.log(id),
    console.log(response.data);
    setHost(response.data);
  }

  useEffect(() => {
    if( id != null && host == null){
      fetchDataHost();
    }
  });

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: true, title: `Restaurant ${id}`, headerTitleAlign: 'center' }} />
      {host == null ? (
        <ActivityIndicator size={'large'} />
      ) : (
        <>
          <Image
            style={styles.mainImg}
            source={{
              uri: host.mainphoto,
            }}
          />
          <View style={styles.containerTitle}>
            <Text style={styles.titleText}>{host.name}</Text>
            <Text>{host.address}</Text>
          </View>
          <View style={styles.containerInfos}>
            <Text style={styles.titleInfos}>Informations</Text>
            <Text>{host.description}</Text>
          </View>
          <View style={styles.containerInfos}>
            <Text style={styles.titleInfos}>Horaires</Text>
            {host.openinghours == null ? (
              <Text>Pas d'horaires renseignés</Text>
            ) : (
              host.openinghours.map((day) => {
                return <Text key={day}>{day}</Text>;
              }
              )
            )}
          </View>
        </>
      )}
    </View>
  );
};

const windowWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  container: {
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