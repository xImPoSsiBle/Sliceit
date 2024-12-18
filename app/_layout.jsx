import { Stack } from 'expo-router'
import AuthProvider from '../context/AuthProvider'
import SearchProvider from '../context/SearchProvider'
import CartProvider from '../context/CartProvider'
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
              <Stack.Screen name="pizza-detail" options={{ headerShown: false }} />
            </Stack>
          </CartProvider>
        </SearchProvider>
      </AuthProvider>
    </LoadProvider>
  )
}

export default RootLayout