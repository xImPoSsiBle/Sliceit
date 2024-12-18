import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useRoute } from '@react-navigation/native'

import { useContext, useEffect, useState } from 'react';
import { CartContext } from '../context/CartProvider';
import PizzaSize from '../component/PizzaSize';
import CustomButton from '../component/CustomButton';
import RadioButton from '../component/RadioButton';

import CheddarIcon from '../assets/images/cheddar.png'
import BaconIcon from '../assets/images/BaconIcon.png'
import ChampignonsIcon from '../assets/images/champignons.png'
import { AuthContext } from '../context/AuthProvider';
import LoadingSpinner from '../component/LoadingSpinner';
import { useRouter } from 'expo-router';


const PizzaDetail = () => {
    const [pizza, setPizza] = useState()
    const [size, setSize] = useState(20)
    const [radioSelected, setRadioSelected] = useState(null)

    const route = useRoute();
    const { id } = route.params;
    const { setCart, } = useContext(CartContext)
    const { accessToken } = useContext(AuthContext)

    const router = useRouter();

    const products = [{ id: 1, name: 'Больше сыра', img: CheddarIcon, price: 600 }, { id: 2, name: 'Больше бекона', img: BaconIcon, price: 600 }, { id: 3, name: 'Больше шампиьнона', img: ChampignonsIcon, price: 340 },]

    const addToCart = async (id) => {
        // const { id, name, gram, price, image } = pizza
        // const newItem = { id, name, gram, price, image, count: 1, size };

        // setCart((prevCart) => {
        //     const idx = prevCart.findIndex(item => item.id === id)
        //     if (idx !== -1) {
        //         const updatedCart = [...prevCart]
        //         updatedCart[idx].count += 1
        //         return updatedCart
        //     }
        //     return [...prevCart, newItem]
        // })
        //

        const resp = await fetch('https://amir175.pythonanywhere.com/api/products/cart/add/', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json', 
            },
            body: JSON.stringify({product_id: id, quantity: 1,})
        })

        const data = await resp.json()
        console.log(data)
        // alert('Товар добавлен в корзину')
        // router.push('/home')
    }

    const selectButton = (id) => {
        if (id == radioSelected) return setRadioSelected(null)
        setRadioSelected(id)
    }

    const getPizza = async (id) => {
        const resp = await fetch(`https://amir175.pythonanywhere.com/api/products/products/${id}/`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
        })
        const data = await resp.json()
        setPizza(data)
    }

    useEffect(() => {
        getPizza(id)
    }, [id])

    if (!pizza) {
        return (
            <LoadingSpinner />
        );
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <Image source={{ uri: pizza.image }} style={styles.img} resizeMode='contain' />
                <View style={styles.info}>
                    <Text style={styles.name}>{pizza.name}</Text>
                    <Text style={styles.description}>{pizza.description}</Text>
                </View>

                <PizzaSize handlePress={setSize} />
                <Text>Добавки</Text>
                {products.map((val) => {
                    return (
                        <View style={styles.pizzaDetail} key={val.id}>
                            <View style={styles.pizzaDetailName}>
                                <Image
                                    source={val.img}
                                    style={styles.pizzaDetailImg}
                                    resizeMode='contain'
                                />
                                <Text>{val.name}</Text>
                            </View>
                            <View style={styles.pizzaDetailBtn}>
                                <Text style={styles.price}>+{val.price}</Text>
                                <TouchableOpacity key={val.id} onPress={() => selectButton(val.id)}>
                                    <RadioButton
                                        id={val.id}
                                        radioSelected={radioSelected}
                                        style={radioSelected == val.id && { borderColor: '#FF0000' }}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                    )
                })
                }
                <CustomButton text="Добавить" handlePress={() => addToCart(id)} style={{ marginTop: 150 }} />
            </View>
        </SafeAreaView>
    )
}

export default PizzaDetail

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    img: {
        width: 250,
        height: 250,
    },
    info: {
        width: '90%'
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold'
    },
    description: {
        fontSize: 16
    },
    pizzaDetail: {
        width: '90%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    pizzaDetailImg: {
        width: 35,
        height: 35,
        marginRight: 10
    },
    pizzaDetailName: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    pizzaDetailBtn: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    price: {
        marginRight: 10
    }
})