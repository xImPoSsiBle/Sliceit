import { View } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import SignIn from './(auth)/sign-in'
import AuthProvider, { AuthContext } from '../context/AuthProvider'
import { useContext } from 'react'
import { Redirect } from 'expo-router'

export default function App() {
  const { isLogged } = useContext(AuthContext)

  if (isLogged) return <Redirect href={'/home'} />

  return (
    <View>
      <StatusBar style='auto' />
      <SignIn />
    </View>
  )
}
