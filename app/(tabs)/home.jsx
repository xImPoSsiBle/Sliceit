import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import PizzaCard from '../../component/PizzaCard';
import { useState } from 'react';

import PizzaImg from '../../assets/images/pizzaImg.png'
import PizzasCategoryIcon from '../../assets/images/pizzaCategoryIcon.png'
import DrinksCategoryIcon from '../../assets/images/drinksCategoryIcon.png'
import DessetsCategoryIcon from '../../assets/images/dessertCategoryIcon.png'
import SnaksCategoryIcon from '../../assets/images/snaksCategoryIcon.png'

const pizzas = [
    { id: 1, name: 'Margherita', description: 'Томатный соус,Сыр моцарелла,Бекон...', gram: 300, price: 1500, image: PizzaImg },
    { id: 2, name: 'Pepperoni', description: 'Томатный соус,Сыр моцарелла,Бекон...', gram: 300, price: 1200, image: PizzaImg },
    { id: 3, name: 'Vegetarian', description: 'Томатный соус,Сыр моцарелла,Бекон...', gram: 300, price: 1000, image: PizzaImg },
    { id: 4, name: 'Vegetarian', description: 'Томатный соус,Сыр моцарелла,Бекон...', gram: 300, price: 1100, image: PizzaImg },
    { id: 5, name: 'Vegetarian', description: 'Томатный соус,Сыр моцарелла,Бекон...', gram: 300, price: 1300, image: PizzaImg },
];

const categories = [{ id: 1, name: 'Пицца', img: PizzasCategoryIcon }, { id: 2, name: 'Напитки', img: DrinksCategoryIcon }, { id: 3, name: 'Десерты', img: DessetsCategoryIcon }, { id: 4, name: 'Снэки', img: SnaksCategoryIcon },]

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

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.categoryContainer}>
                <FlatList
                    contentContainerStyle={styles.categoryList}
                    data={categories}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <CategoryItem
                            name={item.name}
                            img={item.img}
                        />
                    )}
                    horizontal={true}
                />
            </View>
            <View style={styles.contentContainer}>
                <FlatList
                    columnWrapperStyle={{
                        justifyContent: 'space-around',
                        alignItems: 'flex-start'
                    }}
                    data={pizzas}
                    keyExtractor={item => item.id}
                    numColumns={numColumns}
                    renderItem={({ item }) =>
                        <PizzaCard
                            name={item.name}
                            description={item.description}
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