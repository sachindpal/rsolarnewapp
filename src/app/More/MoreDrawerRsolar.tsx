import {
    StyleSheet,
    Text,
    View,
    Modal,
    Pressable,
    Linking,
    Share,
    Alert,
    Switch
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
    BlackRight,
    CallSupport,
    CloseBlack,
    DarkIcon,
    DropdownFilled,
    HelpIcon,
    LanguageIcon,
    LoginIcon,
    LogoutIcon,
    OrderIcon,
    PrivacyIcon,
    ProfileIcon,
    RateIcon,
    RightArrow,
    ShareIcon,
    SignUpIcon,
    SwichStore,
} from '../../asset/img';
import { FontStyle } from '../../asset/style/FontsStyle';
import { CommonStyle } from '../../asset/style/commonStyle';

import {
    isLoggedIn,
    isSolarLoggedIn,
    postAuthReq,
    setLocalStorage,
} from '../Service/APIServices/axoisService';
import { useTranslation } from 'react-i18next';
import i18next from 'i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TextTranslation from '../commonResources/component/CommonInput/TextTranslation';
import { ScrollView } from 'react-native-gesture-handler';
import { getFcmTokenFromLocalStorage } from '../Service/notification';
import { useData } from '../Service/DataContext';

const MoreDrawerRsolar = () => {
    const navigation = useNavigation<any>();
    const { t } = useTranslation();

    const [modalVisible, setModalVisible] = useState(false);
    const [isLoggedInStatus, setisLoggedInStatus] = useState<any>(false);
    const [selectedLang, setSelectedLang] = useState<any>();
    const [currentLang, setcurrentLang] = useState<any>('en');
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [userInfo, setUserInfo] = useState<any>({})
    const { isDark, setIsDark } = useData();

    const colors = {
        background: isDarkMode ? '#121212' : '#F7F6FB',
        text: isDarkMode ? '#fff' : '#242734',
        subText: isDarkMode ? '#bbb' : 'rgba(36, 39, 52, 0.50)',
        card: isDarkMode ? '#1E1E1E' : '#F9F9F9',
        tabBg: isDarkMode ? '#222' : 'rgba(231, 230, 236, 0.50)',
        activeTab: isDarkMode ? '#333' : '#FFF',
        label: isDarkMode ? '#ddd' : '#000',
        labelgrey: isDarkMode ? '#ddd' : '#848484',
        labelgreyMobile: isDarkMode ? 'rgba(255, 255, 255, 0.50)' : 'rgba(35, 39, 52, 0.50)',
        boxBackground: isDarkMode ? '#1A1A1A' : '#FFF',
    };

    const setIsDarkModes = (val:any)=>{
        setIsDark(val)
        setIsDarkMode(val)
        
    }
    useEffect(() => {
        getUserInfo()
    }, [])

    // handle go back
    const goBack = () => {
        navigation.goBack();
    };

    // langauge araay
    const langOptions = [
        {
            id: 'en',
            name: 'English',
        },
        {
            id: 'hi',
            name: 'Hindi',
        },
    ];

    const getUserInfo = async () => {
        const getInfo: any = await AsyncStorage.getItem('solar_customer_data');

        setUserInfo(JSON.parse(getInfo))
    }

    // model value select option

    const onSelect = (item: any) => {
        if (selectedLang && selectedLang === item.id) {
        } else {
            setSelectedLang(item);
        }
    };
    // langauge change handler
    const onSubmit = async () => {
        setModalVisible(!modalVisible);
        i18next.changeLanguage(selectedLang.id);
        setLocalStorage('currentLangauge', selectedLang.id);
        getCurrentLangauge();
    };

    // get current set language from local storage
    async function getCurrentLangauge() {
        let current = await AsyncStorage.getItem('currentLangauge');
        setcurrentLang(current);
        if (current == 'en') {
            onSelect({
                id: 'en',
                name: 'English',
            });
        } else if (current == 'hi') {
            onSelect({
                id: 'hi',
                name: 'Hindi',
            });
        } else {
            onSelect({
                id: 'en',
                name: 'English',
            });
        }
    }
    const checkLoginStatus = async () => {
        const isLogged = await isSolarLoggedIn();
        setisLoggedInStatus(isLogged);
    };

    useEffect(() => {
        checkLoginStatus();
        getCurrentLangauge();
    }, []);

    const modelClose = () => {
        setModalVisible(!modalVisible);
    };

    const rateApp = () => {
        Linking.openURL(
            `https://play.google.com/store/apps/details?id=com.rsolar.app&hl=${currentLang}_IN`,
        );
    };

    const logout = async () => {
        // console.log('logout')

        //   postAuthReq('auth/logout', {})
        //     .then(async data => {
        //   await AsyncStorage.clear();
        await AsyncStorage.removeItem('solar_auth_Token')
        getFcmTokenFromLocalStorage();
        checkLoginStatus();

        navigation.navigate('AuthStack', {
            screen: 'RsolarLogin',
        })
        // })
        // .catch(err => {
        //   console.log('err from logout', err);
        // });
    };

    const hindiContent = `भारत का नम्बर 1 खाद, बीज, दवाई खरीदी एप डाउनलोड करे और 2 लाख से अधिक फार्मकार्ट परिवार से जुड़े। डाउनलोड करने के लिए लिंक पर क्लिक करें https://play.google.com/store/apps/details?id=com.rsolar.app&hl=${currentLang}_IN `;

    const EnglishContent = `Download India's No. 1 Fertilizer, Seed, Pesticides purchasing app and join the Farmkart family of over 2  lakhs. Click on the link to download https://play.google.com/store/apps/details?id=com.rsolar.app&hl=${currentLang}_IN`;

    const onShare = async () => {
        try {
            const result = await Share.share({
                title: 'App link',
                message: currentLang == 'hi' ? hindiContent : EnglishContent,
                url: `https://play.google.com/store/apps/details?id=com.rsolar.app&hl=${currentLang}_IN`,
            });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error: any) {
            Alert.alert(error.message);
        }
    };

    const CommanView = ({ text, Icon, mobile = '', secondIcon }: any) => {

        return (
            <View style={{ borderRadius: 8, backgroundColor: colors.boxBackground, marginHorizontal: 16, marginVertical: 8 }}>
                <View style={[CommonStyle.flex_dirRow_alignCenter]}>
                    <View style={{ paddingHorizontal: 16, paddingVertical: 16 }}>{Icon}</View>
                    {mobile ?
                        <View style={{ flexDirection: 'row' }}>
                            {mobile != 'something' ?
                                <View style={{ width: '75%' }}>

                                    <Text style={{ fontFamily: 'Avenir Medium', fontSize: 16, color: colors.text, fontWeight: '800' }}>{text}</Text>

                                    <Text style={{ color: colors.labelgreyMobile }}>{mobile}</Text>
                                </View>
                                :
                                <View style={{ width: '70%' }}>

                                    <Text style={{ fontFamily: 'Avenir Medium', fontSize: 16, color: colors.text, fontWeight: '400' }}>{text}</Text>

                                </View>}


                            <View style={{ paddingTop: '3%' }}>
                                {secondIcon}
                            </View>
                        </View>
                        : <View>
                            <Text style={{ fontFamily: 'Avenir Medium', fontSize: 16, color: colors.text, fontWeight: '400' }} >{text}</Text>
                        </View>
                    }
                </View>
            </View>
        );
    };

    return (
        //   <View
        //     style={{
        //       flex: 1,
        //       alignItems: 'flex-end',
        //       backgroundColor: 'rgba(0, 0, 0, 0.4)',
        //     }}>
        <View style={[styles.mainView, { backgroundColor: colors.background }]}>
            <View>
                <Pressable style={[styles.close, { marginBottom: 35 }]} >
                    {/* <CloseBlack /> */}
                    <Text style={{ color: colors.text, fontFamily: 'Avenir Medium', fontWeight: '800', fontSize: 24 }}>Account</Text>
                </Pressable>

                <ScrollView
                    style={{ marginBottom: 90, marginTop: 12, paddingLeft: 16 }}>
                    {/* auth */}
                    {isLoggedInStatus ? (
                        <>
                            <Pressable
                                onPress={() =>
                                    navigation.navigate('RsolarProfile')
                                }>
                                <CommanView
                                    Icon={<ProfileIcon width={40} height={40} color={colors.labelgrey} />}
                                    text={userInfo.fullname}
                                    mobile={userInfo.mobileno}
                                    secondIcon={<RightArrow width={24} height={24} color={colors.text} />}
                                />
                            </Pressable>

                        </>
                    ) : null}
                    {/* unauthenticate */}
                    {!isLoggedInStatus ? (
                        <Pressable
                            onPress={() =>
                                navigation.navigate('AuthStack', {
                                    screen: 'Login',
                                })
                            }>
                            <CommanView
                                Icon={<LoginIcon width={24} height={24} color={colors.labelgrey} />}
                                text={'Login'}
                            />
                        </Pressable>
                    ) : null}
                    <Pressable
                        onPress={() =>
                            navigation.navigate('PrivacyPolicyRsolar')
                        }>
                        <CommanView
                            Icon={<PrivacyIcon width={24} height={24} color={colors.labelgrey} />}
                            text={'Privacy Policy'}
                        />
                    </Pressable>

                    <Pressable>
                        <CommanView
                            Icon={<DarkIcon width={24} height={24} color={colors.labelgrey} />}
                            text={'Dark Mode'}
                            mobile={'something'}
                            secondIcon={<Switch
                                value={isDarkMode}
                                onValueChange={(val: any) => setIsDarkModes(val)}
                                thumbColor={isDarkMode ? '#FFF' : '#ccc'}
                                trackColor={{ false: '#ccc', true: '#73BE44' }}
                            />}
                        />
                    </Pressable>

                    <Pressable onPress={() => navigation.navigate('CallPopUp', { mobile: 9407059000 })}>
                        <CommanView
                            Icon={<CallSupport width={24} height={24} color={colors.labelgrey} />}
                            text={'Call support'}
                        />
                    </Pressable>



                    {/* only when authenticate */}
                    {isLoggedInStatus ? (
                        <Pressable onPress={() => logout()}>
                            <CommanView
                                Icon={<LogoutIcon width={24} height={24} color={colors.labelgrey} />}
                                text={'Log out'}
                            />
                        </Pressable>
                    ) : null}



                </ScrollView>
            </View>
        </View>


        //   </View>
    );
};

export default React.memo(MoreDrawerRsolar);

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
    },
    close: {
        marginTop: 25.5,
        marginLeft: 22.6,
    },
    icon: {
        paddingLeft: 16,
        paddingRight: 19,
    },
});
