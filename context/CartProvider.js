import { createContext, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'

import PizzaImg from "../assets/images/pizzaImg.png"

export const CartContext = createContext()

const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([])


    return (
        <CartContext.Provider value={{ cart, setCart, }}>
            {children}
        </CartContext.Provider>
    )
}

export default CartProvider

const styles = StyleSheet.create({})