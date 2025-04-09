import { Pressable, StyleSheet, Text, View, Image,Modal } from 'react-native'
import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';
import { ColorVariable, CommonStyle } from '../../asset/style/commonStyle';
import { FarmkartGPT, LeftBackIcon, Robot, CloseBlack } from '../../asset/img';
import { useNavigation } from '@react-navigation/native';
import WebView from 'react-native-webview';
import Button from '../commonResources/component/CommonButton/Button';
import { FontStyle } from '../../asset/style/FontsStyle';
import TextTranslation from '../commonResources/component/CommonInput/TextTranslation';
import RatingStar from '../commonResources/component/RatingStar/RatingStar';
import { TextInput } from 'react-native-gesture-handler';
import FastImage from 'react-native-fast-image';
// import { Modal } from 'react-native-paper';

const SubmitFeedbackForm = ({
    openAndCloseSubmitReviewModal,
    isShowSubmitFeed,
    language,
}: any
) => {
    const { t: translate } = useTranslation()
    const navigation = useNavigation<any>()
    const [currentLang, setcurrentLang] = React.useState<any>("en");


    // get current set language from local storage
    async function getCurrentLangauge() {
        let current = await AsyncStorage.getItem("currentLangauge")
        setcurrentLang(current)
    }

    React.useEffect(() => {
        getCurrentLangauge()
    }, [])
    const navigationToChatScreen = () => {
        navigation.navigate('signIn', {
            screen: 'ChatScreen'
        })
    }

    return (
        <Modal visible={isShowSubmitFeed}>
            <View style={[CommonStyle.mainView, { backgroundColor: 'rgba(0,0,0,0.3)' }]}>
                <View style={[CommonStyle.sheet, { marginTop: 200 }]}>
                    <View style={{ padding: 20 }}>
                        {/* <Pressable onPress={ openAndCloseSubmitReviewModal}>
                            <CloseBlack />
                        </Pressable> */}
                    </View>
                    <View style={{ flex: 1, flexGrow: 1 }} >

                        <View style={{ justifyContent: 'center', alignItems: 'center', gap: 24, flexDirection: 'column' }}>
                            <Text style={{ color: '#242734', fontSize: 24, fontFamily: 'Avenir Medium', fontWeight: '800' }}>{translate('__CHATBOT_THANKS')}</Text>
                            <View>

                                <FastImage source={require("../../asset/img/updatedImg/successTick.png")} style={{ width: 110, height: 110 }} />

                            </View>
                            <Text style={{ color: '#242734', fontSize: 16, fontFamily: 'Avenir Medium', fontWeight: '500', lineHeight: 24 }}>{translate('__CHATBOT_FEEDBACK_SUBMITTED')}</Text>

                        </View>

                        <View style={{ marginBottom: 10, paddingLeft: 16, paddingRight: 16, paddingTop: 40 }}>
                            <Button
                                title={translate('__OK__')}
                                fontSize={16}
                                bgGreen
                                onPress={ openAndCloseSubmitReviewModal}
                            />
                        </View>




                    </View>
                </View>
            </View>
        </Modal>
    )
}

export default SubmitFeedbackForm

const styles = StyleSheet.create({
    fotter: {
        paddingHorizontal: 24,
        paddingBottom: 24,
        paddingTop: 8,
        backgroundColor: "rgba(255, 255, 255, 0.6)",
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12
    },
    starStyle: {
        marginHorizontal: 5, // Add margin between stars
    },
    review: {
        borderWidth: 1,
        borderColor: ColorVariable.stroke,
        borderRadius: 7,
        padding: 16,
        height: 120,
        marginTop: 16,
    },
})
