import { Image, Pressable, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { useEffect, useState } from 'react'


<<<<<<< HEAD
const IngredientCard = ({ ingredient, customPizza, toggleIngredient }) => {
    const [isActive, setIsActive] = useState(false)
    const [count, setCount] = useState(10)

    const { id, name, image_in_menu, category } = ingredient

    const handleIncrement = () => {
        if (count >= 60) {
            alert('Максимальная граммовка 60');
            return;
        }
        setCount(count + 10)
        toggleIngredient(ingredient, 'increment');
    };

    const handleDecrement = () => {
        if (count <= 1) {
            toggleIngredient(ingredient, 'remove');
            return;
        }
        setCount(count - 10)
        toggleIngredient(ingredient, 'decrement');
    };

    const handleToggle = () => {
        if (isActive) {
            toggleIngredient(ingredient, 'remove');
        } else {
            toggleIngredient(ingredient, 'add');
        }
    };


    useEffect(() => {
        const ingredientExists = customPizza.ingredients.some(ing => ing.id === id);
        setIsActive(ingredientExists);
        if (ingredientExists) {
            const existingIngredient = customPizza.ingredients.find(ing => ing.id === id);
            setCount(existingIngredient.quantity * 10);
        }
    }, [customPizza.ingredients, id]);

    return (
        <Pressable onPress={handleToggle}>
            <View style={[styles.card, isActive && styles.active]}>
                <Image source={{ uri: image_in_menu }} style={styles.image} resizeMode="contain" />
                {isActive ? (
                    <View style={[styles.countContainer, category === 'filling' && styles.filling]}>
                        <TouchableOpacity
                            style={[styles.btn, count <= 10 && styles.disabledBtn]}
                            onPress={handleDecrement}
                        >
                            <Text style={styles.text}>-</Text>
                        </TouchableOpacity>

                        <Text style={styles.text}>
                            {count}gr
                        </Text>

                        <TouchableOpacity
                            style={[styles.btn, count >= 60 && styles.disabledBtn]}
                            onPress={handleIncrement}
                        >
                            <Text style={styles.text}>+</Text>
                        </TouchableOpacity>
                    </View>
                ) : (
                    <Text style={styles.text}>{name}</Text>
                )}
                {category === 'filling' && isActive && (<Text style={styles.text}>{name}</Text>)}
=======
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
>>>>>>> 503dc6faa8c479e3395d73593cf3a0abd8b94900
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
<<<<<<< HEAD
    },
    disabledBtn: {
        opacity: 0.3,
    },
    filling: {
        display: 'none'
=======
>>>>>>> 503dc6faa8c479e3395d73593cf3a0abd8b94900
    }
})