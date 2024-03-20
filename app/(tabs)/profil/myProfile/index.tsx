import { View, Text, Image, StyleSheet, Dimensions, ActivityIndicator, TextInput, Button, Pressable } from 'react-native';
import { Stack, useLocalSearchParams } from 'expo-router';
import { api } from '@/tools/Api';
import { useSession } from '@/components/Ctx';
import { User } from '@/models/userModel';
import { useEffect, useState } from 'react';

const UserForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  // const [birthdate, setBirthdate] = useState('');

  const { session } = useSession();
    const [user, setUser] = useState<User | null>(null);
    const fetchDataHost = async () => {
      const response = await api.get(`api/User/65c62c2fa36091dbf73420c3`, { headers: { Authorization: session } });
      console.log(response.data);
      setUser(response.data);
    }
  
    useEffect(() => {
      if(user == null) {
        fetchDataHost();
      }
    });

  const handleRegister = async () => {
    // Code pour envoyer les données d'inscription
    const userData = {
      username: username,
      password: password,
      email: email,
      firstname: firstname,
      lastname: lastname,
      birthdate: user?.birthdate,
      hobbies: user?.hobbies,
      favouritehosts: user?.favouritehosts,
      rating: user?.rating,
      missedmeetings: user?.missedmeetings
    };
    
    try {
      const { data } = await api.post(
        'api/User',
        userData,
        {
          headers: {
            Authorization: session,
            'Content-Type': 'application/json' // Spécifiez le type de contenu JSON
          }
        }
      );
  
      console.log('Réponse de l\'API:', data);
    } catch (error) {
      console.error('Erreur lors de la requête :', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Pseudo:</Text>
        <TextInput
          style={styles.input}
          placeholder="Username"
          onChangeText={text => setUsername(text)}
          value={user?.username}
        />
      </View>

      {/* <View style={styles.inputContainer}>
        <Text style={styles.label}>Mot de passe:</Text>
        <TextInput
          style={styles.input}
          placeholder="Password"
          onChangeText={text => setPassword(text)}
          value={password}
          secureTextEntry={true}
        />
      </View> */}

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email:</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          onChangeText={text => setEmail(text)}
          value={user?.email}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Prénom:</Text>
        <TextInput
          style={styles.input}
          placeholder="First Name"
          onChangeText={text => setFirstname(text)}
          value={user?.firstname}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Nom:</Text>
        <TextInput
          style={styles.input}
          placeholder="Last Name"
          onChangeText={text => setLastname(text)}
          value={user?.lastname}
        />
      </View>

      {/* <View style={styles.inputContainer}>
        <Text style={styles.label}>Date de naissance:</Text>
        <TextInput
          style={styles.input}
          placeholder="Birthdate (YYYY-MM-DD)"
          onChangeText={text => setBirthdate(text)}
          value={birthdate}
        />
      </View> */}

      {/* <View style={styles.buttonContainer}>
        <Button title="Modifier" onPress={handleRegister} color="#ebca04" />
      </View> */}
      <Pressable style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Modifier</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  inputContainer: {
    marginBottom: 10,
    width: '100%',
  },
  label: {
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#ffffff',
  },
  buttonContainer: {
    marginTop: 20,
    width: '60%',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    marginTop: 20,
    width: '60%',
    borderRadius: 20,
    backgroundColor: 'gold',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default UserForm;