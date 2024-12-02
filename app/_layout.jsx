import { Stack } from 'expo-router'
import AuthProvider from '../context/AuthProvider'
import SearchProvider from '../context/SearchProvider'
import CartProvider from '../context/CartProvider'
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
              <Stack.Screen name="pizza-detail" options={{ headerShown: false }} />
            </Stack>
          </CartProvider>
        </SearchProvider>
      {/* </ProtectedRoute> */}
    </AuthProvider>
  )
}

export default RootLayout