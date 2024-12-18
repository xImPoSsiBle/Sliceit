import { Image, StyleSheet, TextInput, View } from 'react-native';
import { useContext } from 'react';
import { SearchContext } from '../context/SearchProvider';

import SearchIcon from '../assets/images/searchIcon.png'
import Logo from '../assets/images/logo.png'
import { SafeAreaView } from 'react-native-safe-area-context';

const HeaderInput = () => {
    const { value, setValue } = useContext(SearchContext);

    return (
<<<<<<< HEAD
        <SafeAreaView style={{ flex: 1, marginBottom: 0 }}>
=======
        <SafeAreaView style={{flex: 1, marginBottom: 0}}>
>>>>>>> 503dc6faa8c479e3395d73593cf3a0abd8b94900
            <View style={styles.header}>
                <View style={styles.searchView}>
                    <Image source={SearchIcon} style={styles.searchIcon} resizeMode='contain' />
                    <TextInput
                        value={value}
                        onChangeText={setValue}
                        style={styles.searchInput}
                        placeholder="Найти продукт"
                    />
                </View>
                <Image source={Logo} style={styles.logo} resizeMode='contain' />
            </View>
        </SafeAreaView>
    );
};

export default HeaderInput;

const styles = StyleSheet.create({
    header: {
        height: 50,
        backgroundColor: '#F54848',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    searchInput: {
<<<<<<< HEAD
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        width: 230,
        height: 35,
        borderRadius: 5,
        paddingLeft: 35,
=======
        backgroundColor: 'white',
        width: 230,
        height: 30,
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingLeft: 30
>>>>>>> 503dc6faa8c479e3395d73593cf3a0abd8b94900
    },
    searchIcon: {
        height: 20,
        width: 20,
        position: 'absolute',
        top: 5,
        left: 5,
        zIndex: 1
    },
    logo: {
        height: 45,
<<<<<<< HEAD
        tintColor: 'white',
=======
        tintColor: 'white'
>>>>>>> 503dc6faa8c479e3395d73593cf3a0abd8b94900
    }
});
