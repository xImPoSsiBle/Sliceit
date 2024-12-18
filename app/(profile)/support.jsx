import { Image, StyleSheet, Text, View } from 'react-native'

import SupportIcon from '../../assets/images/supportIcon.png'

const support = () => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ width: 320, height: 243, justifyContent: 'flex-start', alignItems: 'center', backgroundColor: '#D9D9D9', borderRadius: 40 }}>
                <Image source={SupportIcon} style={{ width: 50, height: 50, marginTop: 30 }} resizeMode='contain'/>
                <View>
                    <Text style={{ fontSize: 15, fontWeight: '400' }}>
                        Возникли вопросы или проблемы? Свяжитесь с нашей техподдержкой!
                    </Text>
                    <Text style={{ fontSize: 15, fontWeight: '600' }}>
                        📧 Email: AmirBurmaganov@gmail.com
                    </Text>
                    <Text style={{ fontSize: 15, fontWeight: '400' }}>
                        Мы всегда рады помочь!
                    </Text>
                </View>
            </View>
        </View>
    )
}

export default support

const styles = StyleSheet.create({})