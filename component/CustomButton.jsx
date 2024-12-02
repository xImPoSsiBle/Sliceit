import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const CustomButton = ({ text, style, handlePress }) => {
    return (
        <TouchableOpacity style={[styles.btn, style]} onPress={handlePress}>
            <Text style={{ color: 'white' }}>{text}</Text>
        </TouchableOpacity>
    )
}

export default CustomButton

const styles = StyleSheet.create({
    btn: {
        width: '90%',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F71B33',
        borderRadius: 10,

    }
})