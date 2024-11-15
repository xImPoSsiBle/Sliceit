import { Animated, FlatList, Image, StyleSheet, Text, View } from 'react-native'
import { useState, useRef, useEffect, useContext } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { TouchableOpacity } from 'react-native'

import CustomPizzaIcon from '../../assets/images/custom-pizza-icon.png'
import IngredientCard from '../../component/IngredientCard'
import { AuthContext } from '../../context/AuthProvider'

// const ingredients = ['wasd', 'dsaw', 'dsad', 'aswd']

const CustomPizza = () => {
    const [selectedSize, setSelectedSize] = useState(0)
    const [ingredients, setIngredients] = useState([])
    const { accessToken } = useContext(AuthContext)

    const animatedValue = useRef(new Animated.Value(0)).current
    const sizes = ['15 см', '25 см', '35 см']
    const numColumns = 2

    const btnWidth = 360;

    const handlePress = (index) => {
        setSelectedSize(index);
        Animated.timing(animatedValue, {
            toValue: index * (btnWidth / 3),
            duration: 300,
            useNativeDriver: false,
        }).start();
    }

    const getIngredients = () => {
        fetch('http://192.168.32.241:8000/api/custompizza/ingredients', {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => setIngredients(data))
    }

    useEffect(() => {
        getIngredients()
    }, [])

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.btnContainer}>
                <TouchableOpacity style={styles.btn}
                    onPress={getIngredients}
                >
                    <Text style={styles.btnText}>+</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btn}>
                    <Text style={styles.btnText}>+</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btn}>
                    <Text style={styles.btnText}>+</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.imgContainer}>
                <Image source={CustomPizzaIcon} resizeMode='contain' style={styles.img} />
            </View>

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
                        onPress={() => handlePress(index)}
                    >
                        <Text style={[styles.text, selectedSize === index && styles.selectedText]}>
                            {size}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            <View style={styles.ingredientsContainer}>
                <FlatList
                    data={ingredients}
                    numColumns={numColumns}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <IngredientCard
                            name={item.name}
                        />
                    )} />
            </View>
        </SafeAreaView>
    )
}

export default CustomPizza

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    btnContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 15
    },
    btn: {
        width: 60,
        height: 40,
        backgroundColor: '#c4c4c4',
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },
    btnText: {
        fontSize: 24,
        bottom: 2
    },
    imgContainer: {
        marginTop: 15,
        alignItems: 'center'
    },
    btnSizeContainer: {
        height: 40,
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderRadius: 15,
        marginTop: 15,
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
    ingredientsContainer: {
        flex: 1
    }
})