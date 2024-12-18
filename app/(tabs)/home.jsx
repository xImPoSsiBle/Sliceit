import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import PizzaCard from '../../component/PizzaCard';
<<<<<<< HEAD
import { useContext, useEffect, useState } from 'react';
=======
import { useContext, useState } from 'react';
>>>>>>> 503dc6faa8c479e3395d73593cf3a0abd8b94900

import { SearchContext } from '../../context/SearchProvider'

import PizzaImg from '../../assets/images/pizzaImg.png'
import PizzasCategoryIcon from '../../assets/images/pizzaCategoryIcon.png'
import DrinksCategoryIcon from '../../assets/images/drinksCategoryIcon.png'
import DessetsCategoryIcon from '../../assets/images/dessertCategoryIcon.png'
import SnaksCategoryIcon from '../../assets/images/snaksCategoryIcon.png'
<<<<<<< HEAD
import { AuthContext } from '../../context/AuthProvider';
import { LoadContext } from '../../context/LoadProvider';
import LoadingSpinner from '../../component/LoadingSpinner';
import { useRouter } from 'expo-router';

const categories = [{ id: 'pizza', name: 'Пицца', img: PizzasCategoryIcon }, { id: 'drinks', name: 'Напитки', img: DrinksCategoryIcon }, { id: 'desserts', name: 'Десерты', img: DessetsCategoryIcon }, { id: 'snaks', name: 'Снэки', img: SnaksCategoryIcon },]
=======

const pizzas = [
    { id: 1, name: 'Margherita', description: 'Томатный соус,Сыр моцарелла,Бекон...', gram: 300, price: 1500, image: PizzaImg },
    { id: 2, name: 'Pepperoni', description: 'Томатный соус,Сыр моцарелла,Бекон...', gram: 300, price: 1200, image: PizzaImg },
    { id: 3, name: 'Vegetarian', description: 'Томатный соус,Сыр моцарелла,Бекон...', gram: 300, price: 1000, image: PizzaImg },
    { id: 4, name: 'Vegetarian', description: 'Томатный соус,Сыр моцарелла,Бекон...', gram: 300, price: 1100, image: PizzaImg },
    { id: 5, name: 'Vegetarian', description: 'Томатный соус,Сыр моцарелла,Бекон...', gram: 300, price: 1300, image: PizzaImg },
];

const categories = [{ id: 1, name: 'Пицца', img: PizzasCategoryIcon }, { id: 2, name: 'Напитки', img: DrinksCategoryIcon }, { id: 3, name: 'Десерты', img: DessetsCategoryIcon }, { id: 4, name: 'Снэки', img: SnaksCategoryIcon },]
>>>>>>> 503dc6faa8c479e3395d73593cf3a0abd8b94900

const CategoryItem = ({ name, img }) => {
    return (
        <View style={styles.categoryCard}>
            <TouchableOpacity style={styles.touchableContainer}>
                <Image source={img} style={styles.categoryIcon} resizeMode='contain' />
                <Text>{name}</Text>
            </TouchableOpacity>
        </View>
    )
}

const PizzaList = () => {
    const [numColumns] = useState(2);
<<<<<<< HEAD
    const [products, setProducts] = useState([])
    const [category, setCategory] = useState('pizza')

    const { value } = useContext(SearchContext)
    const { accessToken, logout } = useContext(AuthContext)
    const { isLoading, setLoading } = useContext(LoadContext)
    const router = useRouter();
=======
    const [products, setProducts] = useState(pizzas)
    const { value } = useContext(SearchContext)

>>>>>>> 503dc6faa8c479e3395d73593cf3a0abd8b94900

    const searchProducts = (list) => {
        return list.filter(product => product.name.toLowerCase().includes(value.toLowerCase()))
    }

<<<<<<< HEAD
    const getProducts = async (category) => {
        setLoading(true)
        try {
            const resp = await fetch(`https://amir175.pythonanywhere.com/api/products/products/${category}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                },
            })
            const data = await resp.json()

            if(data.code === "token_not_valid") {
                await logout();
                router.replace('/sign-in');
            }

            setProducts(data)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getProducts('pizza')
    }, [])

=======
>>>>>>> 503dc6faa8c479e3395d73593cf3a0abd8b94900
    const visibleItems = searchProducts(products)

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.categoryContainer}>
                <FlatList
                    contentContainerStyle={styles.categoryList}
                    data={categories}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <CategoryItem
                            name={item.name}
                            img={item.img}
<<<<<<< HEAD
                            onPress={() => setCategory(item.id)}
=======
>>>>>>> 503dc6faa8c479e3395d73593cf3a0abd8b94900
                        />
                    )}
                    horizontal={true}
                />
            </View>
<<<<<<< HEAD
            {isLoading && <LoadingSpinner/>}
=======
>>>>>>> 503dc6faa8c479e3395d73593cf3a0abd8b94900
            <View style={styles.contentContainer}>
                <FlatList
                    columnWrapperStyle={{
                        justifyContent: 'flex-start',
                    }}
                    data={visibleItems}
                    keyExtractor={item => item.id}
                    numColumns={numColumns}
                    renderItem={({ item }) =>
                        <PizzaCard
                            id={item.id}
                            name={item.name}
<<<<<<< HEAD
                            ingredients={item.ingredients}
=======
                            description={item.description}
>>>>>>> 503dc6faa8c479e3395d73593cf3a0abd8b94900
                            gram={item.gram}
                            price={item.price}
                            img={item.image}
                        />
                    }
                />
            </View>
        </SafeAreaView>
    )
}

export default PizzaList


const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
<<<<<<< HEAD
        marginTop: 50
=======
        marginTop: 20
>>>>>>> 503dc6faa8c479e3395d73593cf3a0abd8b94900
    },
    categoryCard: {
        width: 90,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#CCCCCC',
        borderRadius: 10,
        marginRight: 20
    },
    touchableContainer: {
        flexDirection: 'row',
    },
    categoryIcon: {
        width: 21,
        height: 21,
        marginRight: 5
    },
    categoryContainer: {
        marginTop: 10
    },
    categoryList: {
        marginLeft: 5,
    },
    contentContainer: {
        flex: 1,
        marginTop: 20
    }
})