import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'

const IngredientCard = ({ name }) => {
    const [isActive, setIsActive] = useState(false)

    const toggleIsActive = () => {
        setIsActive(!isActive)
    }

    return (
        <Pressable onPress={toggleIsActive}>
            <View style={[styles.card, isActive && styles.active]}>
                <Text>{name}</Text>
            </View>
        </Pressable>
    )
}

export default IngredientCard

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#cfd1d0',
        margin: 10,
        width: 160,
        height: 140,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    active: {
        borderWidth: 2,
        borderColor: 'lightgreen',
    }
})