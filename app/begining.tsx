import { StyleSheet } from 'react-native';

import { Text, View } from '@/components/Themed';
import LoginFormComponent from '@/components/LoginFormComponent';

export default function BeginingScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Begining</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <LoginFormComponent />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding:20,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 20,
    height: 1,
    width: '80%',
  },
});
