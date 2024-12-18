import { createContext, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'

import PizzaImg from "../assets/images/pizzaImg.png"

export const CartContext = createContext()

const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([])

<<<<<<< HEAD

    return (
        <CartContext.Provider value={{ cart, setCart, }}>
=======
    const pizzas = [
        { id: 1, name: 'Margherita', description: 'Томатный соус, Сыр моцарелла, Бекон, Шампиньоны, Оливковое масло, чеснок, зелень', gram: 300, price: 1500, image: PizzaImg },
        { id: 2, name: 'Pepperoni', description: 'Томатный соус, Сыр моцарелла, Бекон, Шампиньоны, Оливковое масло, чеснок, зелень', gram: 300, price: 1200, image: PizzaImg },
        { id: 3, name: 'Vegetarian', description: 'Томатный соус, Сыр моцарелла, Бекон, Шампиньоны, Оливковое масло, чеснок, зелень', gram: 300, price: 1000, image: PizzaImg },
        { id: 4, name: 'Vegetarian', description: 'Томатный соус, Сыр моцарелла, Бекон, Шампиньоны, Оливковое масло, чеснок, зелень', gram: 300, price: 1100, image: PizzaImg },
        { id: 5, name: 'Vegetarian', description: 'Томатный соус, Сыр моцарелла, Бекон, Шампиньоны, Оливковое масло, чеснок, зелень', gram: 300, price: 1300, image: PizzaImg },
    ];

    return (
        <CartContext.Provider value={{ cart, setCart, pizzas }}>
>>>>>>> 503dc6faa8c479e3395d73593cf3a0abd8b94900
            {children}
        </CartContext.Provider>
    )
}

export default CartProvider

const styles = StyleSheet.create({})