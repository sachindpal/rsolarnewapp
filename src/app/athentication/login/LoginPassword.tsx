import { Dimensions, Image, KeyboardAvoidingView, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { CommonStyle, commanRadius } from '../../../asset/style/commonStyle'

import { Back_round, CloseIcon, WhiteBack } from '../../../asset/img'
import { FontStyle } from '../../../asset/style/FontsStyle'
import TextInputField from '../../commonResources/component/CommonInput/TextInputField'
import Button from '../../commonResources/component/CommonButton/Button'
import { ScrollView } from 'react-native-gesture-handler'
import TextTranslation from '../../commonResources/component/CommonInput/TextTranslation'
import { useTranslation } from 'react-i18next'
import CountDown from '../../commonResources/component/CountDownTimer/CountDownTimer'
import { errorFormate, postAuthReq } from '../../Service/APIServices/axoisService'


const { width, height } = Dimensions.get("screen")



const LoginPasswordRender = (props: any) => {
    console.log('props', props)
    const { t: translate } = useTranslation()
    const [resendOtpCount, setresendOtp] = React.useState(false)
    console.log('resendOtpCount', resendOtpCount)
    const navigation = useNavigation<any>()

    const resendOtp = () => {
        postAuthReq('/auth/login-otp', { mobile: props.mobile }).then((res: any) => {
            let result = res.data
            console.log("resend otp", result)
            setresendOtp(false)

        }).catch((error) => {
            if (error.response.data.error_type) {
                errorFormate(error.response.data.error_type)
            }
        })
    }

    return (

        <ScrollView style={[CommonStyle.mainView]}>

            <View style={{ backgroundColor: "white", elevation: 5, }}>
                <Image
                    source={require("../../../asset/img/staticImg/demoLogin.webp")} style={{ width: width, height: 0.45 * height }} />
                <Pressable style={{ position: "absolute", left: 11, top: 20 }} onPress={() => navigation.goBack()}>
                    <Back_round />

                </Pressable>
            </View>
            <View style={[styles.mainFormView,]}>
                <View style={styles.formView}>
                    <View style={{ paddingTop: 16 }}>
                        <TextTranslation style={[FontStyle.fontMedium22, { textAlign: "center", fontSize: 24 }]} text={"__LOGIN_ACCOUNT__"} />
                    </View>
                    <View style={{ paddingTop: 24, paddingBottom: 16, alignItems: 'center', justifyContent: 'center' }}>
                        <TextTranslation style={{
                            "color": "#242734",
                            "fontFamily": "Avenir",
                            "fontSize": 16,
                            "fontStyle": "normal",
                            "fontWeight": "500",
                            "lineHeight": 24,
                            textAlign: "center",
                        }} text={"We_have_sent_and_OTP_to_this_number"} />


                        {/* <View style={{ flexDirection: 'row' }}>
                            <Text style={{
                                "color": "#242734",
                                "fontFamily": "Avenir",
                                "fontSize": 16,
                                "fontStyle": "normal",
                                "fontWeight": "800",
                                "lineHeight": 24,
                                alignSelf: 'stretch',
                            }}>
                                {props.mobile}
                            </Text>

                            <TextTranslation style={{
                                "color": "#242734",
                                "fontFamily": "Avenir",
                                "fontSize": 16,
                                "fontStyle": "normal",
                                "fontWeight": "500",
                                "lineHeight": 24,
                                alignSelf: 'stretch',
                                marginLeft: 5
                            }} text={"to_confirm_or_use_password"} />
                        </View> */}
                    </View>

                    <View style={{ paddingTop: 16 }}>

                        {/* Chose Paswword */}
                        <View>
                            <TextInputField placeholder={translate('__PASSWORD_OR_OTP_PLACEHOLDER__')} passwordIcon={true} onSubmitEditingFunc={() => {
                                props.validateValue(
                                    'password',
                                    props.loginForm.password,
                                    'password',
                                );
                            }}
                                onBlur={() => {
                                    props.validateValue(
                                        'password',
                                        props.loginForm.password,
                                        'password',
                                    );
                                }}
                                onChangeText={val => {
                                    props.handleChangeForm(
                                        'password',
                                        (val ?? '').toLowerCase(),
                                        'password',
                                    );
                                }}
                                error={props.formError.password}
                            />

                        </View>

                        <View style={{ marginTop: 24 }}>
                            <Button title='__SUBMIT__' loader={props.isloading} disableBtn={props.isloading} bgGreen onPress={props.submitForm} fontSize={16} />
                        </View>
                        <View style={styles.timer}>
                            {resendOtpCount ? <Text style={FontStyle.fontMedium16}>0:00</Text> : <CountDown
                                newStyle={FontStyle.fontHeavy15}
                                seconds={60}
                                timerStart={true}
                                trigger={() => setresendOtp(true)}
                            />}
                        </View>

                        <View style={styles.timer}>
                            {resendOtpCount ? <Text style={[FontStyle.fontMedium18, { textDecorationLine: "underline" }]} onPress={resendOtp}>Resend OTP</Text> : <Text style={[FontStyle.fontMedium18, { color: "#afafaf", textDecorationLine: "underline" }]}>Resend OTP</Text>}
                        </View>
                    </View>
                </View>
            </View>

        </ScrollView>

    )
}

export default LoginPasswordRender

const styles = StyleSheet.create({
    mainFormView: {
        paddingLeft: 8,
        paddingRight: 8,
        marginTop: -(0.15 * height),
        paddingBottom: 24,

    },
    timer: {
        alignItems: "center",
        height: 54,
        justifyContent: "center",
        marginTop: 8
    },
    formView: {
        padding: 16,
        backgroundColor: "white",
        elevation: 5,
        borderRadius: commanRadius.radi6,
    }
})