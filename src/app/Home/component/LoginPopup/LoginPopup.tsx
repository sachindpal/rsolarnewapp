import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { CommonStyle } from '../../../../asset/style/commonStyle'
import { useNavigation } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'
import Button from '../../../commonResources/component/CommonButton/Button'
import { FontStyle } from '../../../../asset/style/FontsStyle'
import TextTranslation from '../../../commonResources/component/CommonInput/TextTranslation'
import { CloseBlack } from '../../../../asset/img'

const LoginPopup = () => {
    const navigation = useNavigation<any>()
    const { t: translate } = useTranslation()

    const goback = () => {
        navigation.goBack()
    }
    const navigationToAccount = (screen: string) => {
        navigation.navigate("AuthStack", { screen: screen })
    }

    return (
        <View style={[CommonStyle.mainView, { backgroundColor: "rgba(0,0,0,0.3)" }]}>
            <Pressable style={{ backgroundColor: "rgba(0,0,0,0.5)", flex: 1 }} onPress={goback} />
            <View style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
                <View style={styles.modelView}>
                    <View style={{ alignItems: "flex-end" }}>
                        <Pressable onPress={goback} >
                            <CloseBlack />
                        </Pressable>
                    </View>
                    <View style={{ alignItems: "center" }}>
                        <View style={{ alignItems: "center", width: "70%" }}>
                            <TextTranslation style={[FontStyle.fontMedium16, { textAlign: "center" }]} text={"__EXPERIENCE_TEXT__"}/>
                        </View>
                    </View>

                    <View style={{ marginTop: 8 }}>
                        <Button title={translate("__LOGIN__")} bgGreen fontSize={16} onPress={() => navigationToAccount("Login")} />
                    </View>
                    <View style={{ marginTop: 24 }}>
                        <TextTranslation style={[FontStyle.fontMedium16, { textAlign: "center" }]} text={"__FARMKART_CUSTOMER__"} />
                    </View>
                    <View style={{ marginTop: 8 }}>
                        <Button title={translate("__SIGNUP_CREATE_ACCOUNT__")} bgBlack fontSize={16} onPress={() => navigationToAccount("SignUp")} />
                    </View>
                </View>
            </View>
        </View >
    )
}

export default LoginPopup

const styles = StyleSheet.create({
    modelView: {
        backgroundColor: "white",
        paddingRight: 20,
        paddingLeft: 20,
        paddingTop: 20,
        paddingBottom: 24,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    }
})