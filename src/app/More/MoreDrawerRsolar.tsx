import {
    StyleSheet,
    Text,
    View,
    Modal,
    Pressable,
    Linking,
    Share,
    Alert,
  } from 'react-native';
  import React, {useEffect, useState} from 'react';
  import {useNavigation} from '@react-navigation/native';
  import {
      CallSupport,
    CloseBlack,
    DropdownFilled,
    HelpIcon,
    LanguageIcon,
    LoginIcon,
    LogoutIcon,
    OrderIcon,
    PrivacyIcon,
    ProfileIcon,
    RateIcon,
    ShareIcon,
    SignUpIcon,
    SwichStore,
  } from '../../asset/img';
  import {FontStyle} from '../../asset/style/FontsStyle';
  import {CommonStyle} from '../../asset/style/commonStyle';
  
  import {
    isLoggedIn,
    isSolarLoggedIn,
    postAuthReq,
    setLocalStorage,
  } from '../Service/APIServices/axoisService';
  import {useTranslation} from 'react-i18next';
  import i18next from 'i18next';
  import AsyncStorage from '@react-native-async-storage/async-storage';
  import TextTranslation from '../commonResources/component/CommonInput/TextTranslation';
  import {ScrollView} from 'react-native-gesture-handler';
  import {getFcmTokenFromLocalStorage} from '../Service/notification';
  
  const MoreDrawerRsolar = () => {
    const navigation = useNavigation<any>();
    const {t} = useTranslation();
  
    const [modalVisible, setModalVisible] = useState(false);
    const [isLoggedInStatus, setisLoggedInStatus] = useState<any>(false);
    const [selectedLang, setSelectedLang] = useState<any>();
    const [currentLang, setcurrentLang] = useState<any>('en');
  
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
        `https://play.google.com/store/apps/details?id=com.farmkart.mobileapp&hl=${currentLang}_IN`,
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
            screen: 'Login',
          })
        // })
        // .catch(err => {
        //   console.log('err from logout', err);
        // });
    };
  
    const hindiContent = `भारत का नम्बर 1 खाद, बीज, दवाई खरीदी एप डाउनलोड करे और 2 लाख से अधिक फार्मकार्ट परिवार से जुड़े। डाउनलोड करने के लिए लिंक पर क्लिक करें https://play.google.com/store/apps/details?id=com.farmkart.mobileapp&hl=${currentLang}_IN `;
  
    const EnglishContent = `Download India's No. 1 Fertilizer, Seed, Pesticides purchasing app and join the Farmkart family of over 2  lakhs. Click on the link to download https://play.google.com/store/apps/details?id=com.farmkart.mobileapp&hl=${currentLang}_IN`;
  
    const onShare = async () => {
      try {
        const result = await Share.share({
          title: 'App link',
          message: currentLang == 'hi' ? hindiContent : EnglishContent,
          url: `https://play.google.com/store/apps/details?id=com.farmkart.mobileapp&hl=${currentLang}_IN`,
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
  
    const CommanView = ({text, Icon}: any) => {
      return (
        <View style={[CommonStyle.flex_dirRow_alignCenter, {paddingTop: 26}]}>
          <View style={styles.icon}>{Icon}</View>
          <View>
            <TextTranslation style={FontStyle.fontMedium18} text={text} />
          </View>
        </View>
      );
    };
  
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'flex-end',
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
        }}>
        <View style={styles.mainView}>
          <View>
            <Pressable style={styles.close} onPress={goBack}>
              <CloseBlack />
            </Pressable>
  
            <ScrollView
              style={{marginBottom: 90, marginTop: 12, paddingLeft: 16}}>
              {/* auth */}
              {isLoggedInStatus ? (
                <>
                  <Pressable
                    onPress={() =>
                      navigation.navigate('RsolarProfile')
                    }>
                    <CommanView
                      Icon={<ProfileIcon width={34} height={34} />}
                      text={'My Profile'}
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
                    Icon={<LoginIcon width={34} height={34} />}
                    text={'Login'}
                  />
                </Pressable>
              ) : null}
              
              {/* <View style={[CommonStyle.flex_dirRow_alignCenter_justifySpbtw]}>
                <CommanView
                  Icon={<LanguageIcon width={34} height={34} />}
                  text={'__LANGUAGE__'}
                />
                <Pressable
                  onPress={() => setModalVisible(!modalVisible)}
                  style={[
                    CommonStyle.flex_dirRow_alignCenter,
                    {marginTop: 26, paddingRight: 16},
                  ]}>
                  <Text style={FontStyle.fontMedium16}>
                    {currentLang == 'en'
                      ? 'English'
                      : currentLang == 'hi'
                      ? 'Hindi'
                      : 'English'}
                  </Text>
                  <DropdownFilled />
                </Pressable>
              </View> */}
              {/* only when authenticate */}
              
              
              <Pressable onPress={()=>navigation.navigate('CallPopUp',{mobile:9407059000})}>
                <CommanView
                  Icon={<CallSupport width={34} height={34} />}
                  text={'Call support'}
                />
              </Pressable>
              <Pressable
                onPress={() =>
                  navigation.navigate('PrivacyPolicyRsolar')
                }>
                <CommanView
                  Icon={<PrivacyIcon width={34} height={34} />}
                  text={'Privacy Policy'}
                />
              </Pressable>
              {/* <Pressable
                onPress={() => navigation.navigate('appSelectionScreen')}>
                <CommanView
                  Icon={<SwichStore width={34} height={34} />}
                  text={'Switch store'}
                />
              </Pressable> */}
  
              {/* only when authenticate */}
              {isLoggedInStatus ? (
                <Pressable onPress={() => logout()}>
                  <CommanView
                    Icon={<LogoutIcon width={34} height={34} />}
                    text={'Log out'}
                  />
                </Pressable>
              ) : null}
            </ScrollView>
          </View>
        </View>
  
        
      </View>
    );
  };
  
  export default React.memo(MoreDrawerRsolar);
  
  const styles = StyleSheet.create({
    mainView: {
      backgroundColor: 'white',
      borderTopLeftRadius: 24,
      borderBottomLeftRadius: 24,
      width: '73%',
      flex: 1,
    },
    close: {
      marginTop: 25.5,
      marginLeft: 22.6,
    },
    icon: {
      paddingLeft: 13,
      paddingRight: 19,
    },
  });
  