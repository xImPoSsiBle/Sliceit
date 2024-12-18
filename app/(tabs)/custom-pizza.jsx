import { Button, FlatList, Image, ImageBackground, StyleSheet, Text, TextInput, View, ScrollView } from 'react-native'
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
import { useRouter } from 'expo-router'
import { LoadContext } from '../../context/LoadProvider'
import LoadingSpinner from '../../component/LoadingSpinner'

const ingr = [{ id: 1, name: 'wasd' }, { id: 2, name: 'dasda' }, { id: 3, name: 'sdw' }, { id: 4, name: 'fds' }, { id: 5, name: 'fg' }]

// id = 3

const CustomPizza = () => {
    const [ingredients, setIngredients] = useState([])

    const [customPizza, setCustomPizza] = useState({ name: '', ingredients: [], size: 20 })

    const [choosedBtn, setChoosedBtn] = useState('filling')

    const [size, setSize] = useState(20)

    const { accessToken, logout } = useContext(AuthContext)
    const { isLoading, setLoading } = useContext(LoadContext)
    const router = useRouter();

    const categories = [{ id: 'filling', name: 'Начинка', img: FillingIcon }, { id: 'main', name: 'Основа', img: MainIcon }, { id: 'secondary', name: 'Второе', img: SecondaryIcon }]
    const numColumns = 2

    const handleNameChange = (newName) => {
        setCustomPizza(prevState => ({
            ...prevState,
            name: newName,
        }));
    };

    const getIngredients = async () => {
        setLoading(true)
        try {
            const resp = await fetch('https://amir175.pythonanywhere.com/api/custompizza/ingredients', {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                }
            });
            const data = await resp.json();

            if (data.code === "token_not_valid") {
                await logout();
                router.replace('/sign-in');
                return;
            }

            setIngredients(data);
        } catch (error) {
            console.error('Ошибка при получении ингредиентов:', error);
        } finally {
            setLoading(false)
        }
    }

    const toggleIngredient = (ingredient, action) => {
        setCustomPizza((prev) => {
            const existingIngredient = prev.ingredients.find((ing) => ing.id === ingredient.id);
            const updatedIngredients = [...prev.ingredients];

            if (existingIngredient) {
                if (action === 'remove') {
                    return {
                        ...prev,
                        ingredients: updatedIngredients.filter((ing) => ing.id !== ingredient.id),
                    };
                } else if (action === 'increment' && existingIngredient.quantity < 6) {
                    return {
                        ...prev,
                        ingredients: updatedIngredients.map((ing) =>
                            ing.id === ingredient.id
                                ? { ...ing, quantity: ing.quantity + 1 }
                                : ing
                        ),
                    };
                } else if (action === 'decrement' && existingIngredient.quantity > 1) {
                    return {
                        ...prev,
                        ingredients: updatedIngredients.map((ing) =>
                            ing.id === ingredient.id
                                ? { ...ing, quantity: ing.quantity - 1 }
                                : ing
                        ),
                    };
                } else if (action === 'decrement' && existingIngredient.quantity === 1) {
                    return {
                        ...prev,
                        ingredients: updatedIngredients.filter((ing) => ing.id !== ingredient.id),
                    };
                }
            } else if (action === 'add') {
                return {
                    ...prev,
                    ingredients: [...updatedIngredients, { ...ingredient, quantity: 1 }],
                };
            }

            return prev;
        });
    };


    const preparePizzaData = (customPizza) => {
        const ingredientsWithoutImg = customPizza.ingredients.map(({ quantity, id }) => ({
            quantity,
            ingredient: id,
        }));

        return {
            ...customPizza,
            ingredients: ingredientsWithoutImg,
        };
    };

    const clearIngredients = () => {
        setCustomPizza((prev) => ({
            ...prev,
            ingredients: [],
        }));
    }

    const addToCartCustom = async (id) => {
        setLoading(true)
        try {
            const resp = await fetch('https://amir175.pythonanywhere.com/api/products/cart/add/', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ pizza_id: id, quantity: 1 })
            })
            const data = await resp.json()
            console.log(data)
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    const createCustom = async () => {
        setLoading(true)
        try {
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
            addToCartCustom(data.id)
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    const ingredientFilter = (category) => {
        return ingredients.filter(i => i.category === category)
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

    const visibleItems = ingredientFilter(choosedBtn)

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView>
                {isLoading && <LoadingSpinner />}
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

                    <TouchableOpacity onPress={clearIngredients} style={[styles.clearBtn, customPizza.ingredients.length > 0 && { display: 'block' }]}>
                        <Text style={{ color: 'black', textAlign: 'center', }}>X</Text>
                    </TouchableOpacity>

                    <View style={styles.imgContainer}>
                        <ImageBackground
                            source={CustomPizzaIcon}
                            resizeMode="contain"
                            style={styles.imgBackground}
                        >
                            {customPizza.ingredients.map((ingredient) => (
                                <Image
                                    key={ingredient.id}
                                    source={{ uri: ingredient.image_in_pizza }}
                                    style={[
                                        styles.ingredientImage,
                                        ingredient.category === 'filling' && styles.filling,
                                    ]}
                                />
                            ))}
                        </ImageBackground>
                    </View>

                </ImageBackground>

                <PizzaSize handlePress={setSize} />

                <View style={styles.ingredientsContainer}>
                    <FlatList
                        data={visibleItems}
                        numColumns={numColumns}
                        keyExtractor={item => item.id}
                        style={styles.flatList}
                        nestedScrollEnabled={true}
                        renderItem={({ item }) => (
                            <IngredientCard
                                ingredient={item}
                                setCustomPizza={setCustomPizza}
                                customPizza={customPizza}
                                toggleIngredient={toggleIngredient}
                            />
                        )} />
                </View>
                <View>
                    <TextInput placeholder='Название' style={styles.nameInput} onChangeText={handleNameChange} value={customPizza.name} />
                    <CustomButton text="Оформить" handlePress={createCustom} style={{ width: '100%', borderRadius: 0 }} />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default CustomPizza

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        marginTop: 30
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
        height: 280,
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
        borderRadius: 245 / 2,
        width: 245,
        height: 245,
        position: 'absolute',
        zIndex: 1
    },
    categoryIcon: {
        width: 50,
        height: 40
    },
    filling: {
        zIndex: 0
    },
    nameInput: {
        borderRadius: 10,
        width: '90%',
        height: 40,
        margin: 'auto'
    },
    clearBtn: {
        width: 20,
        height: 20,
        position: 'absolute',
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        top: 100,
        right: 30,
        borderRadius: 5,
        zIndex: 1,
        display: 'none'
    },
    flatList: {
        height: 300
    }
})