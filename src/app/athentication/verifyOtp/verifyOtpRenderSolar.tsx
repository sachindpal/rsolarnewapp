import { Dimensions, Image, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect } from 'react'
import Button from '../../commonResources/component/CommonButton/Button'
import TextInputField from '../../commonResources/component/CommonInput/TextInputField'
import { FontStyle } from '../../../asset/style/FontsStyle'
import { CommonStyle } from '../../../asset/style/commonStyle'
import { useNavigation, useRoute } from '@react-navigation/native'
import { CloseIcon } from '../../../asset/img'
import { useTranslation } from 'react-i18next'
import TextTranslation from '../../commonResources/component/CommonInput/TextTranslation'
import AsyncStorage from '@react-native-async-storage/async-storage'
import CountDown from '../../commonResources/component/CountDownTimer/CountDownTimer'
import { ScrollView } from 'react-native-gesture-handler'


const { width, height } = Dimensions.get("screen")

interface dataType {
    currentLang: string,
    resendOtp: boolean,
    setresendOtp: any,
    submitOTP: any
    validateValue: any
    handleChangeOTP: any
    otp: any
    formError: any
    resendHandler: () => void
    inputs: any,
    mobileNum:any
    isloading:any
}

const VerifyOtpRenderSolar = (props: dataType) => {



    const navigation = useNavigation<any>()
    const { t: translate } = useTranslation()

    return (
        <ScrollView style={CommonStyle.mainView}>
            <View style={{ backgroundColor: "white", elevation: 5, zIndex: 1 }}>
                <Image
                    source={require("../../../asset/img/rsolarloginbanner.png")} style={{ width: width, height: 0.45 * height }} />
                <Pressable style={{ position: "absolute", left: 20, top: 26.7 }} onPress={() => navigation.goBack()}>
                    <Image source={require("../../../asset/img/left_arrow.png")} style={{ width: 28, height: 24 }} />
                </Pressable>
            </View>
            <View style={styles.mainFormView}>
                <View style={styles.formView}>
                    <View style={{ alignItems: "center", paddingTop: 16 }}>
                        <TextTranslation style={FontStyle.fontMedium22} text={'Please enter OTP'} />
                    </View>
                    <View style={{}}>
                        <View style={{ paddingTop: 16, paddingBottom: 24, paddingHorizontal: 8 }}>
                            {'en' == "en" ? <><Text
                                style={[FontStyle.fontMedium15, { textAlign: "center" }]}>We have sent an OTP to this number {props.mobileNum} to confirm</Text></> : props.currentLang == "hi" ? <>
                                    <Text
                                        style={[FontStyle.fontMedium15, { textAlign: "center" }]}>हमने पुष्टि करने के लिए इस नंबर {props.mobileNum} पर एक ओटीपी भेजा है</Text></> : <><Text
                                            style={[FontStyle.fontMedium15, { textAlign: "center" }]}>We have sent an OTP to this number {props.mobileNum} to confirm</Text></>}
                        </View>
                        {/* phone  */}
                        <View style={styles.otpView}>
                            {/* <TextInputField label={""} placeholder={translate('__ENTER_OTP__')} otpfield={true} keyboardType="number-pad"
                                onSubmitEditingFunc={() => {
                                    props.validateValue(
                                        'otp',
                                        props.otp,
                                        'otp',
                                    );
                                }}
                                onBlur={() => {
                                    props.validateValue(
                                        'otp',
                                        props.otp,
                                        'otp',
                                    );
                                }}
                                onChangeText={val => {
                                    props.handleChangeOTP(
                                        'otp',
                                        (val ?? '').toLowerCase(),
                                        'otp',
                                    );
                                }}
                                error={props.formError.otp} /> */}
                            {props.otp.map((digit: any, index: any) => (
                                <TextInput
                                    key={index}
                                    autoComplete="sms-otp"
                                    style={[styles.box, {
                                        borderColor: props.formError.otp
                                            ? "#ff8181"
                                            :
                                            "#cacfe3",
                                    }, FontStyle.fontMedium16]}
                                    maxLength={1}
                                    keyboardType="numeric"
                                    onChangeText={val => {
                                        props.handleChangeOTP(
                                            'otp',
                                            (val ?? '').toLowerCase(),
                                            'otp',
                                            index
                                        );
                                    }}
                                    value={digit}
                                    ref={(input: any) => {
                                        props.inputs.current[index] = input;
                                    }}
                                />
                            ))}

                        </View>
                        <View style={{ alignItems: "center" }}>
                            {props.formError.otp && (
                                <TextTranslation style={[FontStyle.fontMedium16, { color: "red", paddingTop: 4 }]} text={props.formError.otp} />
                            )}
                        </View>
                        <View style={{ paddingTop: 24 }}>
                            {/* <Button title='__SUBMIT__' loader={false} bgGreen onPress={props.submitOTP} fontSize={16} /> */}
                            <Button title='SUBMIT' loader={props.isloading} disableBtn={props.isloading} bgGreen onPress={props.submitOTP} fontSize={16} />
                        </View>
                        <View style={styles.timer}>
                            {props.resendOtp ? <Text style={FontStyle.fontMedium16}>0:00</Text> : <CountDown
                                newStyle={FontStyle.fontHeavy15}
                                seconds={60}
                                timerStart={true}
                                trigger={() => props.setresendOtp(true)}
                            />}
                        </View>
                        <View style={styles.timer}>
                            {props.resendOtp ? <Text style={[FontStyle.fontMedium18, { textDecorationLine: "underline" }]} onPress={props.resendHandler}>Resend OTP</Text> : <Text style={[FontStyle.fontMedium18, { color: "#afafaf", textDecorationLine: "underline" }]}>Resend OTP</Text>}
                        </View>

                    </View>

                </View>
            </View>

        </ScrollView>
    )
}

export default VerifyOtpRenderSolar

const styles = StyleSheet.create({
    mainFormView: {
        paddingLeft: 8,
        paddingRight: 8,
        marginBottom: 24,
        zIndex: 2,
        marginTop: -100
    },
    formView: {
        padding: 16,
        backgroundColor: "white",
        elevation: 5,
        borderRadius: 9,
    },
    otpView: {
        flexDirection: "row",

        alignSelf: "center"
    },
    timer: {
        alignItems: "center",
        height: 54,
        justifyContent: "center",
        marginTop: 8
    },
    box: {
        borderWidth: 1,
        borderColor: '#7E7E7E',
        width: 41,
        height: 54,
        marginRight: 8,
        textAlign: 'center',
        borderRadius: 6,
        borderStyle: 'solid',
        padding: 16,
    },

})