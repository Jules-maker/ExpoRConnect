import React from 'react';
import { StyleSheet, Button, Alert, Dimensions } from 'react-native';
import { Text, View } from '@/components/Themed';
import { Link } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
}) {
  return <FontAwesome size={28} style={{ marginRight: 50 }} {...props} />;
}

export default function ProfilScreen() {
  return (
    <View style={styles.container}>
    <Link
      style={styles.button}
      push href={{
        pathname: "/(tabs)/profil/myProfile/",
        // params: {}
        }}
      >
      <TabBarIcon name="user"/>
      <Text>  </Text>
      <Text style={styles.title}>Modifier profil</Text>
    </Link>

    <Link
      style={styles.button}
      push href={{
        pathname: "/(tabs)/profil/myHobbies/",
        // params: {}
        }}
      >
      <TabBarIcon name="heart"/>
      <Text>  </Text>
      <Text style={styles.title}>Mes centres d'intérêt</Text>
    </Link>

    <Link
      style={styles.button}
      push href={{
        pathname: "/(tabs)/profil/myHosts/",
        // params: {}
        }}
      >
      <TabBarIcon name="home"/>
      <Text>  </Text>
      <Text style={styles.title}>Mes restaurants</Text>
    </Link>

    <Link
      style={styles.button}
      push href={{
        pathname: "/(tabs)/profil/signOut/",
        // params: {}
        }}
      >
      <TabBarIcon name="sign-out"/>
      <Text>  </Text>
      <Text style={styles.title}>Se déconnecter</Text>
    </Link>
      {/* <Text style={styles.title}>Profil</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" /> */}
    </View>
  );
}

const windowWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },
  title: {
    paddingLeft: 0,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  button: {
    backgroundColor: 'white',
    width: windowWidth,
    height: windowWidth*0.175,
    textAlign: 'center',
    textAlignVertical: 'center',
    borderColor:'black',
    // borderTopWidth: 2,
    borderBottomWidth: 2,
    fontSize: 18,
    gap: 10,
  },
});