import React from 'react';
import { StyleSheet, Dimensions, Pressable } from 'react-native';
import { Text, View } from '@/components/Themed';
import { Link } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useSession } from '@/components/Ctx';


// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
}) {
  return <FontAwesome size={28} {...props} />;
}

export default function ProfilScreen() {
  const { signOut } = useSession();

  return (
      <View style={styles.container}>
        <Link
          style={styles.button}
          push href={{
            pathname: "/(tabs)/profil/myProfile/",
            // params: {}
          }}
          asChild
        >
          <Pressable style={styles.row}>
            <TabBarIcon name="user" />
            <Text style={styles.title}>Modifier profil</Text>
          </Pressable>
        </Link>

        <Link
          style={styles.button}
          push href={{
            pathname: "/(tabs)/profil/myHobbies/",
            // params: {}
          }}
          asChild
        >
          <Pressable style={styles.row}>
            <TabBarIcon name="heart" />
            <Text style={styles.title}>Mes centres d'intérêt</Text>
          </Pressable>
        </Link>

        <Link
          style={styles.button}
          push href={{
            pathname: "/(tabs)/profil/myHosts/",
            // params: {}
          }}
          asChild
        >
          <Pressable style={styles.row}>
            <TabBarIcon name="home" />
            <Text style={styles.title}>Mes restaurants</Text>
          </Pressable>
        </Link>

        <Pressable style={styles.button} onPress={signOut}>
          <View style={styles.row}>
            <TabBarIcon name="sign-out" />
            <Text style={styles.title}>Se déconnecter</Text>
          </View>
        </Pressable>
        {/* <Text style={styles.title}>Profil</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" /> */}
      </View>
  );
}

const windowWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    backgroundColor: 'white',
    alignContent: 'center',
  },
  title: {
    flex: 1,
    paddingLeft: 0,
    fontSize: 18,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: 20,
    width: windowWidth,
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignContent: 'center',
    padding: 30,
    width: windowWidth,
    textAlign: 'center',
    textAlignVertical: 'center',
    borderColor: 'black',
    borderBottomWidth: 1,
    gap: 20,
  },
});