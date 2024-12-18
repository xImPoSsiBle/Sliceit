import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'

import HomeIcon from '../../assets/images/home-icon.png'
import CustomIcon from '../../assets/images/custom-icon.png'
import CartIcon from '../../assets/images/cart-icon.png'
import ProfileIcon from '../../assets/images/profile-icon.png'
import HeaderLogo from '../../component/HeaderLogo'
import HeaderInput from '../../component/HeaderInput'



const TabIcon = ({ icon, color, name, focused }) => {
    return (
        <View
            style={styles.container}
        >
            <Image
                source={icon}
                resizeMode="contain"
                tintColor={color}
                style={styles.icon}
            />
            <Text
                style={[{ color: color }, focused && styles.bold, styles.textSize]}
            >
                {name}
            </Text>
        </View>
    );
};

const TabLayout = () => {
    return (
        <Tabs
            screenOptions={{ tabBarActiveTintColor: 'black' }}
        >
            <Tabs.Screen name='home' options={{
                header: () => <HeaderInput/>,
                tabBarShowLabel: false,
                tabBarIcon: ({ color, focused }) => (
                    <TabIcon
                        name="Home"
                        icon={HomeIcon}
                        color={color}
                        focused={focused} />
                )
            }} />
            <Tabs.Screen name='custom-pizza' options={{
                header: () => <HeaderLogo/>,
                tabBarShowLabel: false,
                tabBarIcon: ({ color, focused }) => (
                    <TabIcon
                        name="Custom"
                        icon={CustomIcon}
                        color={color}
                        focused={focused} />
                )
            }} />
            <Tabs.Screen name='cart' options={{
                header: () => <HeaderLogo/>,
                tabBarShowLabel: false,
                tabBarIcon: ({ color, focused }) => (
                    <TabIcon
                        name="Cart"
                        icon={CartIcon}
                        color={color}
                        focused={focused} />
                )
            }} />
            <Tabs.Screen name='profile' options={{
                 header: () => <HeaderLogo/>,
                tabBarShowLabel: false,
                tabBarIcon: ({ color, focused }) => (
                    <TabIcon
                        name="Profile"
                        icon={ProfileIcon}
                        color={color}
                        focused={focused} />
                )
            }} />
        </Tabs>
    )
}

export default TabLayout

const styles = StyleSheet.create({
    icon: {
        width: 20,
        height: 20,
        // top: 8
    },
    container: {
        flex: 1,
        width: 60,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    textSize: {
        fontSize: 12,
    },
    bold: {
        fontWeight: 'bold',
    },
})