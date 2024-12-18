import { StyleSheet, Text, View } from 'react-native'
import React, { createContext, useState } from 'react'

export const LoadContext = createContext()

const LoadProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false)

    const setLoading = (state) => {
        setIsLoading(state);
    };

    return (
        <LoadContext.Provider value={{ isLoading, setLoading }}>
            {children}
        </LoadContext.Provider>
    )
}

export default LoadProvider

const styles = StyleSheet.create({})