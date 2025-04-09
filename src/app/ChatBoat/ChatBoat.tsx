import { Pressable, StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';
import { ColorVariable, commanRadius, CommonStyle } from '../../asset/style/commonStyle';
import { FarmkartGPT, LeftBackIcon, Robot, CloseBlack } from '../../asset/img';
import { useNavigation } from '@react-navigation/native';
import WebView from 'react-native-webview';
import Button from '../commonResources/component/CommonButton/Button';
import { FontStyle } from '../../asset/style/FontsStyle';
import TextTranslation from '../commonResources/component/CommonInput/TextTranslation';
import { getLocalStorageData, postAuthReq } from '../Service/APIServices/axoisService';
import moment from 'moment';

const ChatBoat = () => {
    const { t: translate } = useTranslation()
    const navigation = useNavigation<any>()
    const [currentLang, setcurrentLang] = React.useState<any>("en");
    const [token, settoken] = React.useState<any>(null);
    const [condition, setCondition] = React.useState<any>(null);
    const [loader, setLoader] = React.useState<any>(true);


    // get current set language from local storage
    async function getCurrentLangauge() {
        let current = await AsyncStorage.getItem("currentLangauge")
        setcurrentLang(current)
    }

    const navigationToUic = () => {
        navigation.navigate('signIn', {
            screen: 'AddressScreen',
            params: {
                screen: 'UICRegistration',
            },
        })
    }

    React.useEffect(() => {
        getCurrentLangauge()
        checkUser();
    }, [])

    const checkUser = () => {
        getLocalStorageData('auth_Token').then((authToken: any) => {
            settoken(authToken)
            if (authToken) {
                console.log('authToken', authToken)
                setCondition(1)

                postAuthReq('/user/user-info', { lang: currentLang })
                    .then(async data => {


                        await postAuthReq('/order/get-uic-details', {})
                            .then(res => {
                                setLoader(false)

                                var futureMonth = moment(data?.data?.data[0]?.uicappliedon).add(1, 'M').format('YYYY-MM-DD');

                                if (data?.data?.data[0]?.aplyforuic == 'Y') {
                                    setCondition(2)
                                }

                                if (data?.data?.data[0]?.aplyforuic == 'N') {
                                    setCondition(3)
                                }

                                if(res.data.data?.uicDetails.uicamount >= 1000 && futureMonth < moment().format('YYYY-MM-DD')){
                                    setCondition(2)
                                }
                                
                                if (futureMonth < moment().format('YYYY-MM-DD') && res.data.data?.uicDetails.uicamount < 1000 && res.data.data?.uicDetails?.uicType != 'UIC_GOLD') {
                                    setCondition(4)
                                }
                            })


                    })
            }else{
                setLoader(false)
            }
        })
    }
    const navigationToChatScreen = () => {
        // navigation.navigate('signIn', {
        //     screen: 'ChatScreen'
        // })
        navigation.navigate('ChatScreen')
    }

    const navigationToUICRenew = () => {
        navigation.navigate('global', { screen: 'RenewUICQuestion' });
    };

    return (
        <View style={{ flex: 1, backgroundColor: ColorVariable.blueBlack }}>
            <View style={CommonStyle.sheet}>
                <View style={{ padding: 20 }}>
                    <Pressable onPress={() => navigation.goBack()}>
                        <CloseBlack />
                    </Pressable>
                </View>
                <View style={{ flex: 1, flexGrow: 1 }} >

                    <View style={{ justifyContent: 'center', alignItems: 'center', gap: 16 }}>
                        <FarmkartGPT  />
                        {condition == null ? 
                             <Image source={require("../../asset/img/Raichand.png")} style={{ width: 240, height: 240 }} /> : <Image source={require("../../asset/img/Raichand.png")} style={{ width: 280, height: 280 }} />} 
                    </View>
                    <View style={{ justifyContent: 'center', alignItems: 'center', paddingLeft: 20, paddingRight: 20,marginTop:16 }}>
                        <Text style={{ color: '#242734', textAlign: 'center', lineHeight: 21, fontWeight: '400', fontSize: 14, alignSelf: 'stretch', fontFamily: 'Avenir Medium' }}>
                            {translate('__CHATBOT_WELCOME_TEXT__')}
                        </Text>
                    </View>
                    {/* <View style={styles.fotter}>
                        <Button title={translate("__CLOSE__")} fontSize={16} bgBlack onPress={()=>navigation.goBack()} />
                    </View> */}
                    {loader == false?
                    <View>
                        {condition == null ?
                            <View >
                                <View style={{ paddingVertical: 10, paddingHorizontal: 20 }}>
                                    <Button
                                        title={translate('__LOGIN__')}
                                        fontSize={16}
                                        bgGreen
                                        onPress={() => navigation.navigate("AuthStack", { screen: "Login" })}
                                    />
                                </View>

                                <Pressable
                                    style={({ pressed }) => [styles.buttonWrap, {
                                        backgroundColor: '#242734',
                                        marginLeft: 20,
                                        marginRight: 20
                                    }]}
                                    onPress={() => navigation.navigate("AuthStack", {
                                        screen: "SignUp"
                                    })}
                                >
                                    <TextTranslation style={[FontStyle.fontHeavy16, {
                                        fontSize: 16,
                                        color: '#FFF',
                                    }]} text={"__CREATE_FARMKART_ACCOUNT__"} />
                                </Pressable>
                            </View> : null
                        }
                        {condition == 2 ?
                            <View style={{ paddingVertical: 16, paddingHorizontal: 16 }}>
                                <Button
                                    title={translate('__LETS_START_')}
                                    fontSize={16}
                                    bgGreen
                                    onPress={navigationToChatScreen}
                                />
                            </View> : null
                        }

                        {condition == 3 ?
                            <View style={{ paddingVertical: 16, paddingHorizontal: 16 }}>
                                <Button
                                    title={translate('__REGISTER_UIC_FOR_FREE__')}
                                    fontSize={16}
                                    bgGreen
                                    onPress={navigationToUic}
                                />
                            </View> : null
                        }


                        {condition == 4 ?
                            <View style={{ paddingVertical: 16, paddingHorizontal: 16 }}>
                                <Button
                                    title={translate('__RENEW_UIC')}
                                    fontSize={16}
                                    bgGreen
                                    onPress={navigationToUICRenew}
                                />
                            </View> : null
                        }
                    </View>:<View style={{ paddingVertical: 10, paddingHorizontal: 20 }}>
                                    <Button
                                        title={translate('__LOADING__')}
                                        fontSize={16}
                                        bgGreen
                                        // onPress={() => navigation.navigate("AuthStack", { screen: "Login" })}
                                    />
                                </View>}


                </View>
            </View>
        </View>
    )
}

export default ChatBoat

const styles = StyleSheet.create({
    fotter: {
        paddingHorizontal: 24,
        paddingBottom: 24,
        paddingTop: 8,
        backgroundColor: "rgba(255, 255, 255, 0.6)",
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12
    },
    buttonWrap: {
        alignItems: "center",
        justifyContent: "center",
        paddingTop: 11, paddingBottom: 11,
        paddingHorizontal: 16,
        height: 54,
        borderRadius: commanRadius.radi6
    },
})