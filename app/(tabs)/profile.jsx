import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useContext } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import leftArrow from '../../assets/images/arrowLeft.png'
import { Link, Redirect } from 'expo-router'

import Avatar from '../../assets/images/avatar.png'
import { AuthContext } from '../../context/AuthProvider'

const Profile = () => {
    const { logout, isLogged } = useContext(AuthContext)

    const handlPress = async () => {
        // console.log('work')
        await logout()
    }

    if (!isLogged) return <Redirect href={'/sign-in'} />

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.profileBg}>
                <Link href={'/home'} style={styles.homeLink}>
                    <Image source={leftArrow} style={styles.arrowImg} resizeMode='contain' />
                </Link>
                <Text style={{ color: 'white' }}>Profile</Text>

                <View style={styles.avatarContainer}>
                    <Image
                        style={styles.avatarImg}
                        source={Avatar}
                        resizeMode='contain' />
                </View>
            </View>
            <View style={styles.container}>
                <TouchableOpacity onPress={handlPress} style={styles.editBtn}>
                    <Text style={{color: 'white'}}>Logout</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default Profile

const styles = StyleSheet.create({
    safeArea: {
        flex: 1
    },
    profileBg: {
        height: 200,
        backgroundColor: '#FF8D76',
        justifyContent: 'center',
        alignItems: 'center'
    },
    homeLink: {
        height: 30,
        position: 'absolute',
        top: 15,
        left: 10,
    },
    arrowImg: {
        width: 25,
        height: 25,
        tintColor: 'white',
    },
    avatarContainer: {
        width: 122,
        height: 122,
        borderRadius: 122 / 2,
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: 120
    },
    avatarImg: {
        width: 115,
        height: 115,
        borderRadius: 115 / 2
    },
    container: {
        flex: 1,
        alignItems: 'center'
    },
    editBtn: {
        width: 100,
        marginTop: 50,
        alignItems: 'center',
        backgroundColor: 'black',
        paddingTop: 5,
        paddingBottom: 5,
        borderRadius: 5
    }
})