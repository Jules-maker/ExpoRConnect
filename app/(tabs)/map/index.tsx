import { Button, StyleSheet } from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import * as SecureStore from 'expo-secure-store';
import { router } from 'expo-router';

export default function MapScreen() {
  const handleLogout = async () => {
    await SecureStore.deleteItemAsync('jwtToken');
    router.navigate('/begining');
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Map</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <EditScreenInfo path="app/(tabs)/map/index.tsx" />
      <Button title="logout" onPress={handleLogout} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
