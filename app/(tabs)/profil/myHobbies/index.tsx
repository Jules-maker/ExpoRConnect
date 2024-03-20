import { View, Text, Image, StyleSheet, Dimensions, ActivityIndicator } from 'react-native';
import { Stack, useLocalSearchParams } from 'expo-router';
import { api } from '@/tools/Api';
import { useSession } from '@/components/Ctx';
import { User } from '@/models/userModel';
import { useEffect, useState } from 'react';

const ProfileUpdateScreen = () => {
  const { id } = useLocalSearchParams();
  const { session } = useSession();
  // console.log(id);

  const [user, setUser] = useState<User | null>(null);
  const fetchDataHost = async () => {
    const response = await api.get(`api/User/65c62c2fa36091dbf73420c3`, { headers: { Authorization: session } });
    // console.log(response.data);
    setUser(response.data);
    const hobbies: any[] = response.data.hobbies;
    hobbies.forEach((hobby: string) => {
      const hobbyObject = JSON.parse(hobby);
      console.log(hobbyObject.Name);
    });
  }

  useEffect(() => {
    if(user == null) {
      fetchDataHost();
    }
  });


  return (
    <View style={styles.container}>
      <Text>Mes hobbies:</Text>
      {/* Les hobbies sont regroupés dans un tableau d'objets */}
      {user?.hobbies.map((hobby: string, index: number) => {
      const hobbyObject = JSON.parse(hobby);
      console.log(hobbyObject);
      return (
        <View key={index}>
          <Text>{hobbyObject.Name}</Text>
        </View>
      );
    })}
    </View>
  );
};

// const windowWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
export default ProfileUpdateScreen;