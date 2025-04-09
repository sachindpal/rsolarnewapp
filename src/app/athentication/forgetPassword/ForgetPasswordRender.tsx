import { Dimensions, Image, KeyboardAvoidingView, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Button from '../../commonResources/component/CommonButton/Button'
import TextInputField from '../../commonResources/component/CommonInput/TextInputField'
import { FontStyle } from '../../../asset/style/FontsStyle'
import { CommonStyle } from '../../../asset/style/commonStyle'
import { useNavigation } from '@react-navigation/native'
import { CloseIcon } from '../../../asset/img'
import { useTranslation } from 'react-i18next'
import TextTranslation from '../../commonResources/component/CommonInput/TextTranslation'
import { ScrollView } from 'react-native-gesture-handler'


const { width, height } = Dimensions.get("screen")

interface dataType {
    submitNumber: any
    validateValue: any
    handleChangeNumber: any
    phoneNumber: any
    formError: any
    isloading:any
}

const ForgetPasswordRender = (props: dataType) => {
    const navigation = useNavigation<any>()
    const { t: translate } = useTranslation()
    return (
        <ScrollView style={CommonStyle.mainView} keyboardShouldPersistTaps="handled">


            <View style={{ backgroundColor: "white", elevation: 5, zIndex: 1 }}>
                <Image
                    source={require("../../../asset/img/signup.jpg")} style={{ width: width, height: 0.40 * height }} />
                <Pressable style={{ position: "absolute", left: 11, top: 26.7 }} onPress={() => navigation.goBack()}>
                    <Image source={require("../../../asset/img/left_arrow.png")} style={{ width: 28, height: 24 }} />
                </Pressable>
            </View>
            <View style={styles.mainFormView}>
                <View style={styles.formView}>
                    <View style={{ alignItems: "center" }}>
                        <TextTranslation style={FontStyle.fontMedium24} text={'__FORGOT_PASSWORD__'} />
                    </View>
                    <View style={{ paddingTop: 24 }}>
                        <View style={{ paddingBottom: 16 }}>
                            <TextTranslation style={FontStyle.fontMedium16} text={"__FORGOT_PASSWORD_TEXT__"} />
                        </View>
                        {/* phone  */}
                        <View>
                            <TextInputField label={"__PHONE_NUMBER__"} phoneNumberField={true} placeholder={translate('__PHONE_PLACEHOLDER__')} keyboardType="number-pad"
                               maxLength={10}
                               onSubmitEditingFunc={() => {
                                    props.validateValue(
                                        'phoneNumber',
                                        props.phoneNumber,
                                        'phoneNumber',
                                    );
                                }}
                                onBlur={() => {
                                    props.validateValue(
                                        'phoneNumber',
                                        props.phoneNumber,
                                        'phoneNumber',
                                    );
                                }}
                                onChangeText={val => {
                                    props.handleChangeNumber(
                                        'phoneNumber',
                                        (val ?? '').toLowerCase(),
                                        'phoneNumber',
                                    );
                                }}
                                error={props.formError.phoneNumber} />
                        </View>
                        <View style={{ marginTop: 24 }}>
                            <Button fontSize={16} title='__SUBMIT__' loader={props.isloading} disableBtn={props.isloading} bgGreen onPress={props.submitNumber} />
                        </View>
                    </View>
                </View>
            </View>

        </ScrollView>

    )
}

export default ForgetPasswordRender

const styles = StyleSheet.create({
    mainFormView: {
        paddingLeft: 8,
        paddingRight: 8,
        marginBottom: 24,
        zIndex: 2,
        marginTop: -40

    },
    formView: {
        padding: 16,
        backgroundColor: "white",
        elevation: 5,
        borderRadius: 6,
    }
})