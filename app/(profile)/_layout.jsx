import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const ProfileLayout = () => {
    return (
        <Stack>
            <Stack.Screen name="details" options={{ headerShown: false }} />
            <Stack.Screen name="profile" options={{ headerShown: false }} />
            <Stack.Screen name="payment" options={{ headerShown: false }} />
            <Stack.Screen name="support" options={{ headerShown: false }} />  
            <Stack.Screen name="customs" options={{ headerShown: false }} />    
        </Stack>
    );
}

export default ProfileLayout

const styles = StyleSheet.create({})