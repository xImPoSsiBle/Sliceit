import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import { useContext, useState } from 'react'
import { CartContext } from '../context/CartProvider'

import DeleteIcon from '../assets/images/deleteIcon.png'
import { Shadow } from 'react-native-shadow-2'

const CartItem = ({ id, name, img, price, removeItem, count, size }) => {

    const { cart, setCart } = useContext(CartContext)

    const handlePlus = () => {
        const idx = cart.findIndex(item => item.id === id)
        setCart((prevCart) => {
            if (idx !== -1) {
                const updatedCart = [...prevCart]
                updatedCart[idx].count += 1
                return updatedCart
            }
        })
    }

    const handleMinus = () => {
        const idx = cart.findIndex(item => item.id === id)
        if (cart[idx].count <= 1) {
            removeItem(id)
            return;
        }
        setCart((prevCart) => {
            if (idx !== -1) {
                const updatedCart = [...prevCart]
                updatedCart[idx].count -= 1
                return updatedCart
            }
        })
    }

    return (
        <Shadow
            distance={6}
            startColor={'#00000020'}
            endColor={'#00000000'}
            offset={[0, 15]}
            radius={20}
        >
            <View style={styles.container}>
                <View style={styles.img}>
                    <Image source={img} />
                </View>

                <View style={styles.info}>
                    <Text style={styles.textInfo}>
                        {name}
                    </Text>
                    <Text style={styles.textInfo}>
                        {price * count}₸
                    </Text>
                    <Text style={[styles.textInfo, { fontSize: 16 }]}>Size: {size}</Text>
                </View>

                <View style={styles.countDiv}>
                    <View style={styles.count}>
                        <Pressable
                            style={styles.btn}
                            onPress={handleMinus}
                        >
                            <Text style={styles.text}>-</Text>
                        </Pressable>

                        <Text style={styles.countText}>{count}</Text>

                        <Pressable
                            style={styles.btn}
                            onPress={handlePlus}
                        >
                            <Text style={styles.text}>+</Text>
                        </Pressable>
                    </View>
                </View>

                <Pressable
                    style={styles.deleteBtn}
                    onPress={() => removeItem(id)}
                >
                    <Image
                        source={DeleteIcon}
                        style={styles.deleteIcon}
                        resizeMode='contain'
                    />
                </Pressable>
            </View>
        </Shadow>
    )
}

export default CartItem

const styles = StyleSheet.create({
    container: {
        width: 330,
        height: 140,
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: '#C1BFBF',
        borderRadius: 20,
        marginTop: 10,
        backgroundColor: 'white'
    },
    img: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    count: {
        flexDirection: 'row',
        marginLeft: 10
    },
    countDiv: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    countText: {
        fontSize: 24,
        marginLeft: 15,
        marginRight: 15
    },
    info: {
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    textInfo: {
        marginTop: 5,
        marginBottom: 5
    },
    btn: {
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        fontSize: 24,
        backgroundColor: '#e6e6e6',
        borderRadius: 10
    },
    text: {
        fontSize: 22
    },
    deleteBtn: {
        width: 100,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: '#FF0000',
        position: 'relative',
        top: 100,
        right: 100,
    }
})