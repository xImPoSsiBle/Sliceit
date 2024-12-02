import { FlatList, Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { CartContext } from '../../context/CartProvider'
import CartItem from '../../component/CartItem'
import { Shadow } from 'react-native-shadow-2'

import EmptyCartIcon from '../../assets/images/EmptyCartIcon.png'
import CustomButton from '../../component/CustomButton'

const Cart = () => {
    const [choosedType, setChoosedType] = useState('Доставка')
    const [totalPrice, setTotalPrice] = useState(0)

    const { cart, setCart } = useContext(CartContext)

    const deliveryType = ['Доставка', 'Самовывоз']

    const removeItem = (id) => {
        setCart((prevCart) => prevCart.filter(item => item.id !== id))
    }

    const handlePress = (type) => {
        setChoosedType(type)
    }

    const getTotalPrice = () => {
        const total = cart.reduce((acc, item) => {
            return acc += item.price * item.count
        }, 0)

        setTotalPrice(total)
    }

    const getOrder = () => {
        setCart([])
        return alert('Заказ был оформен')
    }

    useEffect(() => {
        getTotalPrice()
    }, [cart])

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
                text={`Оформить за ${totalPrice}₸`}
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
        alignItems: 'center'
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