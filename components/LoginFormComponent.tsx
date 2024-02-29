import React, { useState } from 'react';
import { Pressable, StyleSheet, TextInput, View, useColorScheme } from 'react-native';
import { Text } from './Themed';
import { useSession } from './Ctx';


const LoginFormComponent = () => {
    const { signIn } = useSession();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
        alert("Name or Email is invalid");
        return;
      }
    await signIn(email, password);
  };

  const handleRegister = () => {
    // router.navigate('/register');
    console.log('Register');
  }

  return (
    <View style={styles.container}>
        <Text style={styles.title}>Connection</Text>
        <TextInput style={styles.input} placeholder="Email" onChangeText={setEmail} />
        <TextInput style={styles.input} placeholder="Mot de passe" secureTextEntry={true} onChangeText={setPassword} />
        <Pressable style={styles.buttonLogin} onPress={handleLogin}>
            <Text style={styles.buttonTextL}>Se connecter</Text>
        </Pressable>
        <Pressable style={styles.buttonRegister} onPress={handleRegister}>
            <Text style={styles.buttonTextR}>Register</Text>
        </Pressable>
    </View>
  );
};

export default LoginFormComponent;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '80%',
        justifyContent: 'center',
        padding: 20,
        gap: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    input: {
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 5,
        padding: 10,
        backgroundColor: 'white',
    },
    buttonLogin: {
        backgroundColor: '#D9D18C',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonTextL: {
        color: 'black',
        fontWeight: 'bold',
    },
    buttonRegister: {
        backgroundColor: '#232323',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonTextR: {
        color: 'white',
        fontWeight: 'bold',
    },
});