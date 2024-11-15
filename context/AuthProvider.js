import { createContext, useState } from 'react'

export const AuthContext = createContext()

const AuthProvider = ({ children }) => {
    const [isLogged, setIsLogged] = useState(false)
    const [accessToken, setAccessToken] = useState('token')
    const [refreshToken, setResfreshToken] = useState(null)

    const login = async (email, password) => {
        // setIsLogged(true)
        const obj = {
            email,
            password
        }
        const resp = await fetch('http://192.168.32.241:8000/api/users/login/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj)
        })

        const data = await resp.json()
        console.log(data)
        if (data.access !== undefined) {
            setIsLogged(true)
            setAccessToken(data.access)
            setResfreshToken(data.refresh)
        }
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

    const logout = () => {
        setIsLogged(false)
    }

    return (
        <AuthContext.Provider value={{ isLogged, login, logout, accessToken }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider