import { Image, Pressable, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { useEffect, useState } from 'react'


const IngredientCard = ({ id, name, setCustomPizza, customPizza, imgMenu, imgPizza }) => {
    const [isActive, setIsActive] = useState(false)
    const [count, setCount] = useState(10)

    const toggleIsActive = () => {
        setIsActive(!isActive)
    }

    const handlPressPlus = () => {
        if(count >= 60){
            return alert("Максимальная граммовка 60")
        }
        setCount(count + 10)
    }

    const handlPressMinus = () => {
        if (count <= 10) {
            setIsActive(false)
            setCount(10)
            return
        }
        setCount(count - 10)
    }

    const addIngredient = () => {
        setCustomPizza((prev) => ({
            ...prev,
            ingredients: [...prev.ingredients, { id, quantity: count/10, img: imgPizza }],
        }));
    }

    const updateCount = (idx) => {
        setCustomPizza((prev) => {
            const updatedIngredients = prev.ingredients.map((ingredient, index) =>
                index === idx ? { ...ingredient, quantity: count/10 } : ingredient
            );

            return { ...prev, ingredients: updatedIngredients };
        })
    }

    const removeIngredient = (id) => {
        setCustomPizza((prev) => ({
            ...prev,
            ingredients: prev.ingredients.filter(i => i.id !== id)
        }))
    }

    useEffect(() => {
        if (isActive) {
            const idx = customPizza.ingredients.findIndex(item => item.id === id)
            if (idx !== -1) {
                updateCount(idx)
                return;
            }

            addIngredient()
            return;
        }
        removeIngredient(id)
    }, [isActive, count])

    return (
        <Pressable onPress={toggleIsActive}>
            <View style={[styles.card, isActive && styles.active]}>
                <Image source={{uri: imgMenu}} style={styles.image} resizeMode='contain'/>
                {isActive
                    ? <View style={styles.countContainer}>
                        <TouchableOpacity
                            style={styles.btn}
                            onPress={handlPressMinus}
                        >
                            <Text
                                style={styles.text}
                            >
                                -
                            </Text>
                        </TouchableOpacity>

                        <Text
                            style={styles.text}
                        >
                            {count}gr
                        </Text>
                        
                        <TouchableOpacity
                            style={styles.btn}
                            onPress={handlPressPlus}
                        >
                            <Text
                                style={styles.text}
                            >
                                +
                            </Text>
                        </TouchableOpacity>
                    </View>
                    : <Text style={styles.text}>{name}</Text>}
            </View>
        </Pressable>
    )
}

export default IngredientCard

const styles = StyleSheet.create({
    card: {
        borderColor: '#F40D0D',
        borderWidth: 2,
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
    },
    countContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
    },
    text: {
        fontSize: 24,
    },
    btn: {
        width: 50,
        height: 40,
        alignItems: 'center'
    },
    image: {
        width: 60,
        height: 60,
    }
})