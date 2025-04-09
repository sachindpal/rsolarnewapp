import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';
import { ColorVariable, CommonStyle } from '../../asset/style/commonStyle';
import { LeftBackIcon } from '../../asset/img';
import { useNavigation } from '@react-navigation/native';
import WebView from 'react-native-webview';
import { PolicyInEnglish, PolicyInHindi } from './PrivacyPolicyContent';
import Button from '../commonResources/component/CommonButton/Button';
import { FontStyle } from '../../asset/style/FontsStyle';
import TextTranslation from '../commonResources/component/CommonInput/TextTranslation';

const PrivacyPolicy = () => {
  const { t: translate } = useTranslation()
  const navigation=useNavigation<any>()
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
                    <Pressable onPress={()=>navigation.goBack()}>
                        <LeftBackIcon />
                    </Pressable>
                </View>
                <View style={{ flex: 1, flexGrow: 1 }} >
                  <View style={{marginHorizontal:16,marginBottom:10}}>
                    <TextTranslation style={FontStyle.fontHeavy24} text={"__PRIVACYPOLICY__"}/>
                  </View>
                    <WebView
                        viewportContent={'width=device-width, user-scalable=no, initial-scale=1.0'}
                        automaticallyAdjustContentInsets={false}
                        originWhitelist={['*']}
                        source={{
                            html: currentLang == "en" ?PolicyInEnglish  : currentLang == "hi" ? PolicyInHindi : PolicyInEnglish,
                        }}
                    />
                    <View style={styles.fotter}>
                        <Button title={translate("__CLOSE__")} fontSize={16} bgBlack onPress={()=>navigation.goBack()} />
                    </View>
                </View>
            </View>
        </View>
  )
}

export default PrivacyPolicy

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