import { Animated, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { TouchableOpacity } from 'react-native'

const PizzaSize = ({handlePress}) => {
    const [selectedSize, setSelectedSize] = useState(0)

    const animatedValue = useRef(new Animated.Value(0)).current
    const sizes = [20, 25, 30]

    const btnWidth = 360;

    const handlePressAnimation = (index) => {
        handlePress(sizes[index]);
        Animated.timing(animatedValue, {
            toValue: index * (btnWidth / 3),
            duration: 300,
            useNativeDriver: false,
        }).start();
<<<<<<< HEAD
        setSelectedSize(index);
=======
>>>>>>> 503dc6faa8c479e3395d73593cf3a0abd8b94900
    }

    

    return (
        <View style={styles.btnSizeContainer}>
            <Animated.View
                style={[
                    styles.highlight,
                    {
                        width: btnWidth / 3,
                        transform: [{ translateX: animatedValue }],
                    },
                ]}
            />
            {sizes.map((size, index) => (
                <TouchableOpacity
                    key={index}
                    style={styles.sizeBtn}
                    onPress={() => handlePressAnimation(index)}
                >
                    <Text style={[styles.text, selectedSize === index && styles.selectedText]}>
                        {size} см
                    </Text>
                </TouchableOpacity>
            ))}
        </View>
    )
}

export default PizzaSize

const styles = StyleSheet.create({
    btnSizeContainer: {
        height: 40,
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderRadius: 15,
        // marginTop: 5,
        backgroundColor: '#c4c4c4',
    },
    sizeBtn: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    highlight: {
        height: 40,
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        backgroundColor: 'white',
        borderRadius: 15,
        zIndex: 0,
    },
    text: {
        fontSize: 16,
        color: 'black',
        zIndex: 2
    },
    selectedText: {
        fontWeight: 'bold',
        zIndex: 2,
    },
})