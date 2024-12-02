import { FlatList, Image, ImageBackground, StyleSheet, Text, View } from 'react-native'
import { useState, useEffect, useContext } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { TouchableOpacity } from 'react-native'

import CustomPizzaIcon from '../../assets/images/custom-pizza-icon.png'
import IngredientCard from '../../component/IngredientCard'
import { AuthContext } from '../../context/AuthProvider'
import PizzaSize from '../../component/PizzaSize'

import FillingIcon from '../../assets/images/filling.png'
import MainIcon from '../../assets/images/main.png'
import SecondaryIcon from '../../assets/images/secondary.png'
import CustomPageBg from '../../assets/images/CustomPageBg.png'
import CustomButton from '../../component/CustomButton'

const ingr = [{ id: 1, name: 'wasd' }, { id: 2, name: 'dasda' }, { id: 3, name: 'sdw' }, { id: 4, name: 'fds' }, { id: 5, name: 'fg' }]

const CustomPizza = () => {
    const [ingredients, setIngredients] = useState([])
    const [customPizza, setCustomPizza] = useState({ name: 'custom', ingredients: [], size: 20 })
    const [choosedBtn, setChoosedBtn] = useState('filling')
    const [size, setSize] = useState(20)

    const { accessToken, logout } = useContext(AuthContext)

    const categories = [{ id: 'filling', name: 'Начинка', img: FillingIcon }, { id: 'main', name: 'Основа', img: MainIcon }, { id: 'secondary', name: 'Второе', img: SecondaryIcon }]
    const numColumns = 2


    const getIngredients = async (category) => {
        const resp = await fetch('https://amir175.pythonanywhere.com/api/custompizza/ingredients', {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            }
        })
        const data = await resp.json()
        if (data.code === "token_not_valid") {
            await logout()
            return
        }
        setIngredients(data)
    }

    const preparePizzaData = (customPizza) => {
        const ingredientsWithoutImg = customPizza.ingredients.map(({ quantity, id }) => ({
            quantity,
            id,
        }));

        return {
            ...customPizza,
            ingredients: ingredientsWithoutImg,
        };
    };

    const createCustom = async () => {
        const preparedData = preparePizzaData(customPizza);

        const resp = await fetch('https://amir175.pythonanywhere.com/api/custompizza/create_pizza/', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(preparedData)
        })

        const data = await resp.json()
        console.log(data)
    }

    useEffect(() => {
        getIngredients()
    }, [])

    useEffect(() => {
        setCustomPizza((prev) => ({
            ...prev,
            size
        }))
    }, [size])

    return (
        <SafeAreaView style={styles.safeArea}>
            <ImageBackground source={CustomPageBg} style={styles.customPageBg}>
                <View style={styles.btnContainer}>
                    {categories.map(i => {
                        return (
                            <TouchableOpacity
                                key={i.id}
                                style={[styles.btn, choosedBtn === i.id && styles.activeBtn]}
                                onPress={() => setChoosedBtn(i.id)}
                            >
                                <Image source={i.img} style={styles.categoryIcon} resizeMode='containt' />
                                <Text>{i.name}</Text>
                            </TouchableOpacity>
                        )
                    })}
                </View>

                <View style={styles.imgContainer}>
                    <ImageBackground
                        source={CustomPizzaIcon}
                        resizeMode="contain"
                        style={styles.imgBackground}
                    >
                        {customPizza.ingredients.map((ingredient, index) => (
                            <Image
                                key={ingredient.id}
                                source={{ uri: ingredient.img }}
                                style={
                                    styles.ingredientImage
                                }
                            />
                        ))}
                    </ImageBackground>
                </View>
            </ImageBackground>

            <PizzaSize handlePress={setSize} />

            <View style={styles.ingredientsContainer}>
                <FlatList
                    data={ingredients}
                    numColumns={numColumns}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <IngredientCard
                            id={item.id}
                            name={item.name}
                            setCustomPizza={setCustomPizza}
                            customPizza={customPizza}
                            imgMenu={item.image_in_menu}
                            imgPizza={item.image_in_pizza}
                        />
                    )} />
            </View>
            <CustomButton text="Оформить" handlePress={createCustom} />
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
        marginTop: 10
    },
    btn: {
        width: 80,
        height: 60,
        backgroundColor: 'white',
        borderRadius: 15,
        borderWidth: 1,
        borderColor: '#F40D0D',
        alignItems: 'center',
        justifyContent: 'center',
    },
    btnText: {
        fontSize: 24,
        bottom: 2
    },
    activeBtn: {
        borderColor: '#00FF2F'
    },
    imgContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 300,
    },
    imgBackground: {
        width: 250,
        height: 250,
        justifyContent: 'center',
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
    },
    ingredientImage: {
        borderRadius: 220 / 2,
        width: 220,
        height: 220,
        position: 'absolute'
    },
    categoryIcon: {
        width: 50,
        height: 40
    }
})