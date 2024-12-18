import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'

import { useRouter } from 'expo-router';


<<<<<<< HEAD
const PizzaCard = ({ id, name, gram, price, img, ingredients, getPizzaDetail }) => {
    const router = useRouter();

    const goToPizzaDetail = () => {
        router.push(`/pizza-detail?id=${id}`);
    };

    return (
        <View style={[styles.card, !ingredients && styles.smallCard]}>
            <Image source={{ uri: img }} style={styles.image} resizeMode='contain' />
=======
const PizzaCard = ({ id, name, gram, price, img, description, getPizzaDetail }) => {
    const router = useRouter();

    const goToPizzaDetail = () => {
        
        router.push(`/pizza-detail?id=${id}`);

    };

    return (
        <View style={[styles.card, !description && styles.smallCard]}>
            <Image source={img} style={styles.image} resizeMode='contain' />
>>>>>>> 503dc6faa8c479e3395d73593cf3a0abd8b94900
            <View style={styles.titleContainer}>
                <Text style={styles.name}>
                    {name}
                </Text>
<<<<<<< HEAD
                {ingredients &&
                    <Text style={styles.ingredients} 
                    numberOfLines={2}
                    >
                        {ingredients}
=======
                {description &&
                    <Text style={styles.description} numberOfLines={2}>
                        {description}
>>>>>>> 503dc6faa8c479e3395d73593cf3a0abd8b94900
                    </Text>
                }
                <View style={styles.priceContainer}>
                    <Text style={styles.gram}>
<<<<<<< HEAD
                        {Math.floor(gram)}г
                    </Text>
                    <Text style={styles.price}>
                        {Math.floor(price)}тг
=======
                        {gram}г
                    </Text>
                    <Text style={styles.price}>
                        {price}тг
>>>>>>> 503dc6faa8c479e3395d73593cf3a0abd8b94900
                    </Text>
                </View>
                <TouchableOpacity style={styles.addBtn} onPress={goToPizzaDetail}>
                    <Text style={styles.btnText}>Добавить</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default PizzaCard

const styles = StyleSheet.create({
    card: {
        width: 170,
        height: 270,
        borderRadius: 30,
        borderWidth: 1,
        borderColor: '#CCCCCC',
        alignItems: 'center',
        marginBottom: 10,
        marginLeft: 6
    },
    smallCard: {
        height: 240
    },
    image: {
        width: 130,
        height: 130
    },
    titleContainer: {
        width: '75%'
    },
    addBtn: {
        width: '100%',
        height: 30,
        backgroundColor: '#F54848',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10
    },
    btnText: {
        color: 'white',
        fontWeight: 'bold'
    },
    name: {
        fontWeight: 'bold'
    },
    priceContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: '#CCCCCC',
        paddingBottom: 10,
        marginTop: 10,
        marginBottom: 5
    },
})