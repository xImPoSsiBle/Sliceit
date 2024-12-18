import { View, StyleSheet, ActivityIndicator, Text } from 'react-native';

const LoadingSpinner = () => {
    return (
        <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color="#0000ff" />
            <Text style={styles.loadingText}>Загрузка...</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        width: '100%',
        height: '100%',
        zIndex: 999,
    },
    loadingText: {
        marginTop: 10,
        fontSize: 16,
        color: '#fff',
    },
});

export default LoadingSpinner;
