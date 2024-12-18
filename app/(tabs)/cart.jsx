import { FlatList, Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { CartContext } from '../../context/CartProvider'
import CartItem from '../../component/CartItem'
import { Shadow } from 'react-native-shadow-2'

import EmptyCartIcon from '../../assets/images/EmptyCartIcon.png'
import CustomButton from '../../component/CustomButton'
<<<<<<< HEAD
import { AuthContext } from '../../context/AuthProvider'
import { useFocusEffect } from '@react-navigation/native'
=======
>>>>>>> 503dc6faa8c479e3395d73593cf3a0abd8b94900

const Cart = () => {
    const [choosedType, setChoosedType] = useState('Доставка')
    const [totalPrice, setTotalPrice] = useState(0)

    const { cart, setCart } = useContext(CartContext)
<<<<<<< HEAD
    const { accessToken } = useContext(AuthContext)

    const deliveryType = ['Доставка', 'Самовывоз']

    // const removeItem = (id) => {
    //     setCart((prevCart) => prevCart.filter(item => item.id !== id))
    // }
=======

    const deliveryType = ['Доставка', 'Самовывоз']

    const removeItem = (id) => {
        setCart((prevCart) => prevCart.filter(item => item.id !== id))
    }
>>>>>>> 503dc6faa8c479e3395d73593cf3a0abd8b94900

    const handlePress = (type) => {
        setChoosedType(type)
    }

<<<<<<< HEAD
    const getCart = async () => {
        const resp = await fetch('https://amir175.pythonanywhere.com/api/products/cart/', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            },
        })

        const data = await resp.json()
        console.log(data)
        setCart(data)
    }

    // const getTotalPrice = () => {
    //     const total = cart.reduce((acc, item) => {
    //         return acc += item.price * item.count
    //     }, 0)

    //     setTotalPrice(total)
    // }

=======
    const getTotalPrice = () => {
        const total = cart.reduce((acc, item) => {
            return acc += item.price * item.count
        }, 0)

        setTotalPrice(total)
    }

>>>>>>> 503dc6faa8c479e3395d73593cf3a0abd8b94900
    const getOrder = () => {
        setCart([])
        return alert('Заказ был оформен')
    }

<<<<<<< HEAD
    // useEffect(() => {
    //     console.log(cart)
    // }, [cart])

    useFocusEffect(
        React.useCallback(() => {
            getCart();
        }, [])
    );
=======
    useEffect(() => {
        getTotalPrice()
    }, [cart])

>>>>>>> 503dc6faa8c479e3395d73593cf3a0abd8b94900
    return (
        <SafeAreaView style={styles.safeArea}>
            <Text>Корзина</Text>
            <View style={styles.type}>
                <View style={styles.btnContainer}>
                    {deliveryType.map(i => {
                        return (
                            <Pressable onPress={() => handlePress(i)} key={i} style={[styles.btn, choosedType === i ? styles.active : '']}>
                                <Text>{i}</Text>
                            </Pressable>
                        )
                    })}
                </View>
                <View style={styles.line}></View>
                <View>
                    <Text>
                        Укажите адрес доставки <Text style={styles.arrow}>&rarr;</Text>
                    </Text>
                </View>
            </View>
            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                paddingBottom: 10
            }}
            >
<<<<<<< HEAD
                {cart?.items && cart.items.length > 0
                    ? <FlatList
                        data={cart.items}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => (
                            <CartItem item={item} />
=======
                {cart.length
                    ? <FlatList
                        contentContainerStyle={styles.cartList}
                        data={cart}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) => (
                            <CartItem
                                id={item.id}
                                name={item.name}
                                img={item.image}
                                price={item.price}
                                count={item.count}
                                size={item.size}
                                removeItem={removeItem}
                            />
>>>>>>> 503dc6faa8c479e3395d73593cf3a0abd8b94900
                        )}
                    />
                    : <Shadow distance={6}
                        startColor={'#00000020'}
                        endColor={'#00000000'}
                        offset={[0, 5]}
                        radius={15}>
                        <View style={styles.emptyCard}>
                            <Image source={EmptyCartIcon} />
                            <Text>Не выбран товар</Text>
                        </View>
                    </Shadow>}
            </View>
            <CustomButton
<<<<<<< HEAD
                text={`Оформить за ₸`}
=======
                text={`Оформить за ${totalPrice}₸`}
>>>>>>> 503dc6faa8c479e3395d73593cf3a0abd8b94900
                style={[{ marginBottom: 10 }, !cart.length && { display: 'none' }]}
                handlePress={getOrder}
            />
        </SafeAreaView >
    )
}

export default Cart

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        justifyContent: 'center',
<<<<<<< HEAD
        alignItems: 'center',
        marginTop: 10
=======
        alignItems: 'center'
>>>>>>> 503dc6faa8c479e3395d73593cf3a0abd8b94900
    },
    type: {
        width: '90%',
        height: 75,
        backgroundColor: '#D9D9D9',
        borderRadius: 15,
        margin: 'auto',
        alignItems: 'center',
        alignSelf: 'flex-start',
        marginVertical: 10,
        marginHorizontal: '5%',
    },
    btnContainer: {
        width: '80%',
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: '#C1BFBF',
        marginTop: 10,
        padding: 2,
        borderRadius: 5,
    },
    line: {
        width: '90%',
        marginTop: 5,
        borderBottomColor: '#C1BFBF',
        borderBottomWidth: 1,
    },
    btn: {
        width: '50%',
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5
    },
    active: {
        backgroundColor: '#F6EFEF'
    },
    cartEmpty: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyCard: {
        width: 300,
        height: 160,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
    },
    cartList: {
        paddingBottom: 10
    }
})