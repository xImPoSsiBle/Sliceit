import { Redirect } from 'expo-router';
import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/AuthProvider';
<<<<<<< HEAD
import { Text } from 'react-native';
=======
import { Text } from 'react-native'; // Или ваш компонент загрузки
>>>>>>> 503dc6faa8c479e3395d73593cf3a0abd8b94900
import { SafeAreaView } from 'react-native-safe-area-context';

const ProtectedRoute = ({ children }) => {
    const { isLogged } = useContext(AuthContext);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
<<<<<<< HEAD
=======
        // Устанавливаем флаг, что маршруты смонтированы
>>>>>>> 503dc6faa8c479e3395d73593cf3a0abd8b94900
        setIsMounted(true);
    }, []);

    if (!isMounted || isLogged === null) {

        return (
            <SafeAreaView>
                <Text>Проверка авторизации...</Text>
            </SafeAreaView>
        )
    }

    return isLogged ? children : <Redirect href="/sign-in" />;
};

export default ProtectedRoute;