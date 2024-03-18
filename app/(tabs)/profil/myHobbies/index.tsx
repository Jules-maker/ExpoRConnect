import { StyleSheet } from 'react-native';

import { Text, View } from '@/components/Themed';
import { useSession } from '@/components/Ctx';
import { useEffect, useState } from 'react';
import { User } from '@/models/userModel';
import { api } from '@/tools/Api';

export default function ProfileUpdateScreen() {
  const { session, idUser } = useSession();
  const [user, setUser] = useState<User | null>(null);
  

  const fetchUser = async () => {
      try {
          const response = await api.get(`api/User/${idUser}`, { headers: { Authorization: session } });
          setUser(response.data);
      } catch (e) {
          setUser(null);
      } 
  }
  
  useEffect(() => {
    if( idUser != null && user == null){
      fetchUser();
    }
  });
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mes centres d'intérêt</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
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
