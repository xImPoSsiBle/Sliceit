import { Redirect } from 'expo-router';
import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/AuthProvider';
import { Text } from 'react-native'; // Или ваш компонент загрузки
import { SafeAreaView } from 'react-native-safe-area-context';

const ProtectedRoute = ({ children }) => {
    const { isLogged } = useContext(AuthContext);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        // Устанавливаем флаг, что маршруты смонтированы
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