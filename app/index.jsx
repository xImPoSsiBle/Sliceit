import { View } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import SignIn from './(auth)/sign-in'
import { AuthContext } from '../context/AuthProvider'
import { useContext } from 'react'
import { Redirect } from 'expo-router'

export default function App() {
  const { isLogged } = useContext(AuthContext)

  if (isLogged === null) {
    return null
  }

  return isLogged ? <Redirect href="/home" /> : <Redirect href="/sign-in" />;
}
