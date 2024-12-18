import { Stack } from 'expo-router'
import AuthProvider from '../context/AuthProvider'
import SearchProvider from '../context/SearchProvider'
import CartProvider from '../context/CartProvider'
<<<<<<< HEAD
import LoadProvider from '../context/LoadProvider'

const RootLayout = () => {
  return (
    <LoadProvider>
      <AuthProvider>
        <SearchProvider>
          <CartProvider>
            <Stack>
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen name="(auth)" options={{ headerShown: false }} />
              <Stack.Screen name="index" options={{ headerShown: false }} />
              <Stack.Screen name="(profile)" options={{ headerShown: false }} />
=======
import ProtectedRoute from '../context/ProtectedRoute'

const RootLayout = () => {
  return (
    <AuthProvider>
      {/* <ProtectedRoute> */}
        <SearchProvider>
          <CartProvider>
            <Stack>
              <Stack.Screen name="(auth)" options={{ headerShown: false }} />
              <Stack.Screen name="index" options={{ headerShown: false }} />
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
>>>>>>> 503dc6faa8c479e3395d73593cf3a0abd8b94900
              <Stack.Screen name="pizza-detail" options={{ headerShown: false }} />
            </Stack>
          </CartProvider>
        </SearchProvider>
<<<<<<< HEAD
      </AuthProvider>
    </LoadProvider>
=======
      {/* </ProtectedRoute> */}
    </AuthProvider>
>>>>>>> 503dc6faa8c479e3395d73593cf3a0abd8b94900
  )
}

export default RootLayout