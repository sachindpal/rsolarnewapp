import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';
import { ColorVariable, CommonStyle } from '../../asset/style/commonStyle';
import { LeftBackIcon } from '../../asset/img';
import { useNavigation } from '@react-navigation/native';
import WebView from 'react-native-webview';
import { PolicyInEnglish } from './PrivacyPolicyContent';
import { PolicyInEnglishDark } from './PrivacyPolicyContentDark';
import Button from '../commonResources/component/CommonButton/Button';
import { FontStyle } from '../../asset/style/FontsStyle';
import TextTranslation from '../commonResources/component/CommonInput/TextTranslation';
import { useData } from '../Service/DataContext';

const PrivacyPolicyRsolar = (props: any) => {
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


    const { isDark, setIsDark } = useData();

    const colors = {
        background: isDark ? '#121212' : '#F7F6FB',
        text: isDark ? '#fff' : '#242734',
        subText: isDark ? '#bbb' : 'rgba(36, 39, 52, 0.50)',
        card: isDark ? '#1E1E1E' : '#F9F9F9',
        tabBg: isDark ? '#222' : 'rgba(231, 230, 236, 0.50)',
        activeTab: isDark ? '#333' : '#FFF',
        label: isDark ? '#ddd' : '#000',
        labelgrey: isDark ? '#ddd' : '#848484',
        backgroungBoxColor: isDark ? '#1A1A1A' : '#FFF'
    };
    const goBack = () => {
        props.navigation.goBack();
    };

    return (
        <View style={[
            { backgroundColor: colors.background }
        ]}>
            <View
                style={[
                    { backgroundColor: colors.background }
                ]}>
                <View style={{ backgroundColor: colors.background, flexDirection: 'row', marginTop: 24, marginLeft: 16, gap: 16, alignItems:'flex-start',justifyContent:'flex-start' }}>
                    <Pressable onPress={() => goBack()}>
                        <LeftBackIcon color={colors.text} width={24} height={24} />
                    </Pressable>
                    <Text
                        style={[

                            { color: colors.text, fontSize: 24, fontWeight: '800', fontFamily: 'Avenir Medium', },

                        ]}
                    >Privacy policy</Text>
                </View>
                <View style={{ height:'90%',marginBottom:10,marginTop:32}} >
                    {isDark ? <WebView
                style={{backgroundColor:colors.background}}
                    viewportContent={'width=device-width, user-scalable=no, initial-scale=1.0'}
                    automaticallyAdjustContentInsets={false}
                    originWhitelist={['*']}
                    source={{
                        html: currentLang == "en" ? PolicyInEnglishDark : currentLang == "hi" ? '' : PolicyInEnglishDark,
                    }}
                />:<WebView
                style={{backgroundColor:colors.background}}
                    viewportContent={'width=device-width, user-scalable=no, initial-scale=1.0'}
                    automaticallyAdjustContentInsets={false}
                    originWhitelist={['*']}
                    source={{
                        html: currentLang == "en" ? PolicyInEnglish : currentLang == "hi" ? '' : PolicyInEnglish,
                    }}
                /> }
                
                </View>
                {/* <View style={styles.fotter}>
                    <Button title={translate("__CLOSE__")} fontSize={16} bgBlack onPress={() => navigation.goBack()} />
                </View> */}
            </View>
        </View>

    )
}

export default PrivacyPolicyRsolar

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