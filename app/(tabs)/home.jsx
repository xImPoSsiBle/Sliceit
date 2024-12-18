import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import PizzaCard from '../../component/PizzaCard';
import { useContext, useEffect, useState } from 'react';

import { SearchContext } from '../../context/SearchProvider'

import PizzaImg from '../../assets/images/pizzaImg.png'
import PizzasCategoryIcon from '../../assets/images/pizzaCategoryIcon.png'
import DrinksCategoryIcon from '../../assets/images/drinksCategoryIcon.png'
import DessetsCategoryIcon from '../../assets/images/dessertCategoryIcon.png'
import SnaksCategoryIcon from '../../assets/images/snaksCategoryIcon.png'
import { AuthContext } from '../../context/AuthProvider';
import { LoadContext } from '../../context/LoadProvider';
import LoadingSpinner from '../../component/LoadingSpinner';
import { useRouter } from 'expo-router';

const categories = [{ id: 'pizza', name: 'Пицца', img: PizzasCategoryIcon }, { id: 'drinks', name: 'Напитки', img: DrinksCategoryIcon }, { id: 'desserts', name: 'Десерты', img: DessetsCategoryIcon }, { id: 'snaks', name: 'Снэки', img: SnaksCategoryIcon },]

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
    const [products, setProducts] = useState([])
    const [category, setCategory] = useState('pizza')

    const { value } = useContext(SearchContext)
    const { accessToken, logout } = useContext(AuthContext)
    const { isLoading, setLoading } = useContext(LoadContext)
    const router = useRouter();

    const searchProducts = (list) => {
        return list.filter(product => product.name.toLowerCase().includes(value.toLowerCase()))
    }

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
                            onPress={() => setCategory(item.id)}
                        />
                    )}
                    horizontal={true}
                />
            </View>
            {isLoading && <LoadingSpinner/>}
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
                            ingredients={item.ingredients}
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
        marginTop: 50
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