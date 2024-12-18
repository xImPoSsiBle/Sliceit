import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { AuthContext } from '../../context/AuthProvider';

const Customs = () => {
    const { accessToken } = useContext(AuthContext);
    const [customPizzas, setCustomPizzas] = useState([]);

    const getCustom = async () => {
        try {
            const res = await fetch('https://amir175.pythonanywhere.com/api/custompizza/history/', {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
            });

            if (!res.ok) {
                throw new Error('Failed to fetch custom pizzas');
            }

            const data = await res.json();
            setCustomPizzas(data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getCustom();
    }, []);

    const renderItem = ({ item }) => (
        <View style={styles.pizzaItem}>
            <Text style={styles.pizzaName}>Name: {item.pizza.name}</Text>
            <Text>Size: {item.pizza.size} cm</Text>
            <Text>Weight: {item.pizza.total_grams} g</Text>
            <Text>Price: {item.pizza.total_price} ₽</Text>
            <Text>Created At: {new Date(item.created_at).toLocaleString()}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Custom Pizzas</Text>
            <FlatList
                data={customPizzas}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
            />
        </View>
    );
};

export default Customs;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    pizzaItem: {
        marginBottom: 15,
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
    },
    pizzaName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
});
