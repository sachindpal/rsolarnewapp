import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ColorVariable, CommonStyle } from '../../../asset/style/commonStyle'
import { CloseBlack, LeftBackIcon } from '../../../asset/img'
import WebView from 'react-native-webview'
import { htmlFile, htmlTermInHindi } from './UICterms'
import { FontStyle } from '../../../asset/style/FontsStyle'
import TextTranslation from '../../commonResources/component/CommonInput/TextTranslation'
import Button from '../../commonResources/component/CommonButton/Button'
import { useNavigation } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'
import AsyncStorage from '@react-native-async-storage/async-storage'

const TermsAndCondition = ({ close }: any) => {
    const { t: translate } = useTranslation()
    const [currentLang, setcurrentLang] = React.useState<any>("en");

    // get current set language from local storage
    async function getCurrentLangauge() {
        let current = await AsyncStorage.getItem("currentLangauge")
        setcurrentLang(current)
    }

    React.useEffect(() => {
        getCurrentLangauge()
    }, [])

    return (
        <View style={{ flex: 1, backgroundColor: ColorVariable.blueBlack }}>
            <View style={CommonStyle.sheet}>
                <View style={{ padding: 20 }}>
                    <Pressable onPress={close}>
                        <LeftBackIcon />
                    </Pressable>
                </View>
                <View style={{ flex: 1, flexGrow: 1 }} >
                    <WebView
                        viewportContent={'width=device-width, user-scalable=no, initial-scale=1.0'}
                        automaticallyAdjustContentInsets={false}
                        originWhitelist={['*']}
                        source={{
                            html: currentLang == "en" ? htmlFile : currentLang == "hi" ? htmlTermInHindi : htmlFile,
                        }}
                    />
                    <View style={styles.fotter}>
                        <Button title={translate("__CLOSE__")} fontSize={16} bgBlack onPress={close} />
                    </View>
                </View>


            </View>

        </View>
    )
}

export default React.memo(TermsAndCondition)

const styles = StyleSheet.create({
    fotter: {
        paddingHorizontal: 24,
        paddingBottom: 24,
        paddingTop: 8,
        backgroundColor: "rgba(255, 255, 255, 0.6)",
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12
    }
})