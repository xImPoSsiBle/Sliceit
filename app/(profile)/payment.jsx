import { Button, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import CustomButton from '../../component/CustomButton';
import { AuthContext } from '../../context/AuthProvider';
import RadioButton from '../../component/RadioButton';

const card = () => {
    const [cardNumber, setCardNumber] = useState('');
    const [name, setName] = useState('');
    const [expirationDate, setExpirationDate] = useState('');
    const [cvv, setCvv] = useState('');
    const [cards, setCards] = useState([]);
    const [selectedCard, setSelectedCard] = useState(null);

    const { accessToken } = useContext(AuthContext);

    const formatCardNumber = (value) => {
        return value.replace(/\s+/g, '').replace(/(\d{4})/g, '$1 ').trim();
    };

    const handleCardNumberChange = (value) => {
        const formattedValue = formatCardNumber(value);
        setCardNumber(formattedValue);
    };


    const handleExpirationDateChange = (value) => {
        const formattedValue = value
            .replace(/\s+/g, '')
            .replace(/^(\d{2})(\d{1,2})?$/, (_, m, y) => (y ? `${m}/${y}` : m));
        setExpirationDate(formattedValue);
    };

    const handleNameChange = (value) => {
        setName(value);
    };

    const handleAddCard = async () => {
        if (cardNumber.replace(/\s/g, '').length !== 16) {
            alert('Номер карты должен содержать 16 цифр.');
            return;
        }

        if (name.length < 2) {
            alert('Имя должно содержать минимум 2 символа.');
            return;
        }

        if (!/^\d{2}\/\d{2}$/.test(expirationDate)) {
            alert('Дата должна быть в формате MM/YY.');
            return;
        }

        if (cvv.length !== 3 || !/^\d+$/.test(cvv)) {
            alert('CVV должен быть 3-значным числом.');
            return;
        }

        const resp = await fetch('https://amir175.pythonanywhere.com/api/users/card_details/', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                card_number: cardNumber.replace(/\s/g, ''),
                card_holder_name: name,
                expiration_date: expirationDate,
                cvv
            })
        })

        const data = await resp.json()

        console.log(data)

        alert('Карта успешно добавлена!');
    };

    const getCard = async () => {
        const resp = await fetch('https://amir175.pythonanywhere.com/api/users/card_details/', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            },
        })
        const data = await resp.json()
        console.log(data)
        setCards([data])
    }

    const maskedCardNumber = (value) => {
        if (value !== undefined) {
            const formattedValue = value?.slice(-4);
            return formattedValue;
        }

    };

    useEffect(() => {
        getCard()
    }, [])

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Добавить карту</Text>

            <TextInput
                placeholder="Номер карты"
                style={styles.input}
                keyboardType="numeric"
                value={cardNumber}
                onChangeText={handleCardNumberChange}
                maxLength={19}
            />

            <TextInput
                placeholder="Имя владельца"
                style={styles.input}
                value={name}
                onChangeText={handleNameChange}
                maxLength={19}
            />

            <Text style={styles.title}>Срок действия</Text>

            <View style={styles.dateContainer}>
                <TextInput
                    placeholder="ММ/ГГ"
                    style={styles.date}
                    keyboardType="numeric"
                    value={expirationDate}
                    onChangeText={handleExpirationDateChange}
                    maxLength={5}
                />

                <TextInput
                    placeholder="CVV"
                    style={styles.cvv}
                    keyboardType="numeric"
                    value={cvv}
                    onChangeText={setCvv}
                    maxLength={3}
                />
            </View>

            <View style={styles.cardContainer}>

                <Text style={styles.title}>Доступные карты</Text>

                <FlatList
                    data={cards}
                    renderItem={({ item }) => (
                        <View style={styles.card}>
                            <View style={styles.cardInfo}>
                                <Text>Владелец: {item.card_holder_name}</Text>
                                <Text>{maskedCardNumber(item.card_number)}</Text>
                                <Text>****</Text>
                            </View>
                            <TouchableOpacity onPress={() => setSelectedCard(item.card_number)}>
                                <RadioButton
                                    id={item.card_number}
                                    radioSelected={selectedCard}
                                    style={{
                                        borderColor:
                                            selectedCard === item.card_number ? '#FF0000' : '#D4D5DAB2',
                                    }}

                                />
                            </TouchableOpacity>
                        </View>
                    )}
                    keyExtractor={(item) => item.card_number}
                />
            </View>
            <CustomButton text="Добавить карту" handlePress={handleAddCard} style={{ margin: 'auto', position: 'absolute', top: 650, left: 20 }} />
        </View>
    )
}

export default card

const styles = StyleSheet.create({
    container: {
        margin: 'auto',
        width: '80%',
        marginTop: 20
    },
    input: {
        width: '100%',
        height: 50,
        marginTop: 10,
        marginBottom: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#CCCCCC',
        padding: 10
    },
    title: {
        fontSize: 20,
        fontWeight: '600',
        color: 'black',
    },
    date: {
        width: 100,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#CCCCCC',
        padding: 10
    },
    cvv: {
        width: 100,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#CCCCCC',
        padding: 10,
    },
    dateContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        margin: 'auto',
        marginTop: 20
    },
    card: {
        margin: 10,
        width: '100%',
        height: 70,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: 'auto',
        marginTop: 10,
        borderColor: '#C1BFBF',
        borderBottomWidth: 1,
        borderTopWidth: 1,
        padding: 10
    },
    cardInfo: {
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    cardContainer: {
        marginTop: 20
    }
})