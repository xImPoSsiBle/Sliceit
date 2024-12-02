import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import HeaderLogo from '../../component/HeaderLogo'

const AuthLayout = () => {
    return (
        <>
            <Stack>
                <Stack.Screen name='sign-in' options={{header: () => <HeaderLogo/>}}/>
                <Stack.Screen name='sign-up' options={{header: () => <HeaderLogo/>}}/>
            </Stack>
        </>
    )
}

export default AuthLayout