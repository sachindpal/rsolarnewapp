import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { memo } from 'react'
import { useNavigation } from '@react-navigation/native'
import { ColorVariable, CommonStyle } from '../../../../asset/style/commonStyle'
import { WhiteBack } from '../../../../asset/img'
import { FontStyle } from '../../../../asset/style/FontsStyle'
import TextTranslation from '../CommonInput/TextTranslation'

interface data {
    title: string
}

const HeaderWithBack = ({ title }: data) => {
    const navigation = useNavigation<any>()

    const handleBack = () => {
        navigation.goBack()
    }
    return (
        <View style={[styles.main, CommonStyle.flex_dirRow_alignCenter]}>
            <Pressable onPress={handleBack}>
                <WhiteBack />
            </Pressable>
            <View style={{ flex: 1, marginLeft: 16 }}>
                <TextTranslation style={[FontStyle.fontMedium18, { color: ColorVariable.white }]} text={title} />

            </View>
        </View>
    )
}

export default memo(HeaderWithBack)

const styles = StyleSheet.create({
    main: {
        backgroundColor: ColorVariable.blueBlack,
        justifyContent: "center",
        paddingHorizontal: 16,
        height: 64
    }
})