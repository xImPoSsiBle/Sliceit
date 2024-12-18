import { useContext } from 'react';
import { SearchContext } from '../context/SearchProvider';

import Logo from '../assets/images/logo.png'
import { Image, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const HeaderLogo = () => {
    const { value, setValue } = useContext(SearchContext);

    return (
        <SafeAreaView style={{flex: 1, marginBottom: 18}}>
            <View style={styles.header}>
                <Image source={Logo} style={styles.logo} resizeMode='contain' />
            </View>
        </SafeAreaView>
    );
};

export default HeaderLogo;

const styles = StyleSheet.create({
    header: {
        height: 50,
        backgroundColor: '#F54848',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    logo: {
        height: 45,
        tintColor: 'white'
    }
})