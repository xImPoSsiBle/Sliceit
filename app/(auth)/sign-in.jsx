import { View, Text, ScrollView, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { useContext, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Link, Redirect, router } from 'expo-router';
import { AuthContext } from '../../context/AuthProvider';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, isLogged } = useContext(AuthContext);

  const pressHandler = async () => {
    await login(email, password)
    // router.replace('/home')
  }

  if (isLogged) return <Redirect href={'/home'} />

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.container}>
          <Text style={styles.title}>Log in</Text>

          <TextInput placeholder='Email' style={styles.input} value={email} onChangeText={setEmail} />

          <TextInput placeholder='Password' style={styles.input} value={password} onChangeText={setPassword} />

          <TouchableOpacity style={styles.btn} onPress={pressHandler}>
            <Text style={{ color: 'white', fontWeight: 'bold' }}>Log in</Text>
          </TouchableOpacity>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Don't have an account?</Text>
            <Link href="/sign-up" style={styles.signupLink}>
              Sign Up
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    height: '100%',
    backgroundColor: '#F1F1F1',
  },
  scrollView: {
    height: '100%'
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    width: '100%',
    fontSize: 24,
    fontWeight: '600',
    color: 'black',
    backgroundColor: 'white',
    textAlign: 'center',
    marginBottom: 20,
    padding: 10,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 10,
  },
  footerText: {
    fontSize: 16,
    color: '#7B7B8B',
  },
  signupLink: {
    fontSize: 16,
    fontWeight: '600',
    color: '#F71B33',
    marginLeft: 5,
  },
  input: {
    width: '90%',
    height: 50,
    borderRadius: 10,
    marginTop: 20,
    padding: 10,
    backgroundColor: '#FFF6F5'
  },
  btn: {
    backgroundColor: '#F71B33',
    width: '90%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 80,
    borderRadius: 10,
  }
});

export default SignIn;