import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useContext } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import leftArrow from '../../assets/images/arrowLeft.png'
<<<<<<< HEAD
import { Link, Redirect, router } from 'expo-router'
=======
import { Link, Redirect } from 'expo-router'
>>>>>>> 503dc6faa8c479e3395d73593cf3a0abd8b94900

import Avatar from '../../assets/images/avatar.png'
import { AuthContext } from '../../context/AuthProvider'

<<<<<<< HEAD
import ProfileIcon from '../../assets/images/profile-icon.png'
import CardIcon from '../../assets/images/cardIcon.png'
import OrderIcon from '../../assets/images/orderIcon.png'
import SettingsIcon from '../../assets/images/settingsIcon.png'
import SupportIcon from '../../assets/images/supportIcon.png'
import LogoutIcon from '../../assets/images/logoutIcon.png'
import ArrowIcon from '../../assets/images/arrowIcon.png'

const Profile = () => {
    const { logout, isLogged } = useContext(AuthContext)

    const navs = [{
        id: 1,
        name: 'Мой профиль',
        icon: ProfileIcon,
        route: '/profile'
    }
        , {
        id: 2,
        name: 'Споособ оплаты',
        icon: CardIcon,
        route: '/payment'
    }, {
        id: 3,
        name: 'Мои кастомы',
        icon: OrderIcon,
        route: '/customs'
    }, {
        id: 4,
        name: 'Настройки',
        icon: SettingsIcon,
        route: '/settings'
    }, {
        id: 5,
        name: 'Поддержка',
        icon: SupportIcon,
        route: '/support'
    }
    ]

=======
const Profile = () => {
    const { logout, isLogged } = useContext(AuthContext)

>>>>>>> 503dc6faa8c479e3395d73593cf3a0abd8b94900
    const handlPress = async () => {
        // console.log('work')
        await logout()
    }

<<<<<<< HEAD
    const redirectHandler = (route) => {
        router.push(route)
    }

=======
>>>>>>> 503dc6faa8c479e3395d73593cf3a0abd8b94900
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
<<<<<<< HEAD

            <View style={styles.container}>
                {navs.map(item => (
                    <TouchableOpacity key={item.id} style={styles.containerNav} onPress={() => redirectHandler(item.route)}>
                        <View style={styles.navItem}>
                            <Image source={item.icon} style={{ width: 25, height: 25, marginRight: 20 }} resizeMode="contain" />
                            <Text>{item.name}</Text>
                        </View>
                        <Image source={ArrowIcon} style={styles.arrow} resizeMode="contain" />
                    </TouchableOpacity>
                ))}
                <TouchableOpacity key={6} style={styles.containerNav} onPress={handlPress}>
                    <View style={styles.navItem}>
                        <Image source={LogoutIcon} style={{ width: 25, height: 25, marginRight: 20 }} resizeMode="contain" />
                        <Text>Выйти</Text>
                    </View>
                    <Image source={ArrowIcon} style={styles.arrow} resizeMode="contain" />
=======
            <View style={styles.container}>
                <TouchableOpacity onPress={handlPress} style={styles.editBtn}>
                    <Text style={{color: 'white'}}>Logout</Text>
>>>>>>> 503dc6faa8c479e3395d73593cf3a0abd8b94900
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default Profile

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
<<<<<<< HEAD
        marginTop: 30
=======
>>>>>>> 503dc6faa8c479e3395d73593cf3a0abd8b94900
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
<<<<<<< HEAD
        marginTop: 50
    },
    containerNav: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#D9D9D9',
        paddingBottom: 5
    },
    navItem: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    arrow: {
        width: 20,
        height: 20,
        tintColor: 'black'
=======
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
>>>>>>> 503dc6faa8c479e3395d73593cf3a0abd8b94900
    }
})