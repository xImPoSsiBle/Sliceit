import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import leftArrow from '../../assets/images/arrowLeft.png'
import { Link } from 'expo-router'

const SignUp = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [phone, setPhone] = useState('')

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.scrollView}>
                <View style={styles.container}>
                    <View style={styles.titleConatiner}>
                        <Link href={'/sign-in'} style={styles.signInLink}>
                            <Image style={styles.arrowImg} source={leftArrow} resizeMode='contain' />
                        </Link>
                        <Text style={styles.title}>
                            Sign up
                        </Text>
                    </View>

                    <TextInput placeholder='Name' onChangeText={setName} style={styles.input} />
                    <TextInput placeholder='Email' onChangeText={setEmail} style={styles.input} />
                    <TextInput placeholder='Password' onChangeText={setPassword} style={styles.input} />
                    <TextInput placeholder='Phone' onChangeText={setPhone} style={styles.input} />

                    <TouchableOpacity style={styles.btn}>
                        <Text style={{ color: 'white', fontWeight: 'bold' }}>
                            Sign Up
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default SignUp

const styles = StyleSheet.create({
    safeArea: {
        height: '100%',
        backgroundColor: '#F1F1F1',
    },
    scrollView: {
        height: '100%'
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        width: '90%',
        height: 50,
        margin: 10,
        borderRadius: 10,
        backgroundColor: '#FFF6F5',
        padding: 10
    },
    title: {
        fontSize: 24,
        fontWeight: '600',
        color: 'black',
    },
    btn: {
        backgroundColor: '#F71B33',
        width: '90%',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        borderRadius: 10,
    },
    titleConatiner: {
        width: '100%',
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
        padding: 10,
    },
    signInLink: {
        height: 40,
        position: 'absolute',
        top: 2,
        left: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    arrowImg: {
        width: 30,
        height: 30,
        backgroundColor: 'red',
    }
})