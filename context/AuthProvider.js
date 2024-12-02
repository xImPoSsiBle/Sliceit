import { createContext, useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';


export const AuthContext = createContext()

const AuthProvider = ({ children }) => {
    const [isLogged, setIsLogged] = useState(false)
    const [accessToken, setAccessToken] = useState('token')
    const [refreshToken, setResfreshToken] = useState(null)

    const login = async (email, password) => {
        const obj = {
            email,
            password
        }

        if (email === '' || password === '') {
            return alert('Все поля должны быть заполнены')
        }

        const resp = await fetch('https://amir175.pythonanywhere.com/api/users/login/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj)
        })

        const data = await resp.json()

        if (data.access === undefined) {
            return alert('Неверный логин или пароль')
        }

        await AsyncStorage.setItem('accessToken', data.access);
        await AsyncStorage.setItem('refreshToken', data.refresh);
        setAccessToken(data.access)
        setIsLogged(true);
        console.log(data)

    }

    // const signIn = () => {
    //     const login = async (email, password) => {
    //         const obj = {
    //             email,
    //             password
    //         }
    //         const resp = await fetch('http://192.168.2.247:8000/api/users/login/', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             },
    //             body: JSON.stringify(obj)
    //         })

    //         const data = await resp.json()
    //         console.log(data)
    //         // if (data.access) {
    //         //     setIsLogged(true)
    //         // }
    // }

    const logout = async () => {
        await AsyncStorage.clear();
        setIsLogged(false);
    }

    useEffect(() => {
        const checkAuth = async () => {
            const token = await AsyncStorage.getItem('accessToken');
            const refresh = await AsyncStorage.getItem('refreshToken');
            if (token && refresh) {
                setIsLogged(true);
                setAccessToken(token);
                setResfreshToken(refresh);
            } else {
                setIsLogged(false);
            }
        };

        checkAuth()
    }, [])

    return (
        <AuthContext.Provider value={{ isLogged, login, logout, accessToken }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider