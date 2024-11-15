import { Stack } from 'expo-router'
import AuthProvider, { AuthContext } from '../context/AuthProvider'

const RootLayout = () => {
  return (
    <AuthProvider>
      <Stack>
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }}/>
      </Stack>
    </AuthProvider>
  )
}

export default RootLayout