import {
    Dimensions,
    Image,
    Pressable,
    StyleSheet,
    Text,
    View,
  } from 'react-native';
  import React from 'react';
  import {
    ColorVariable,
    CommonStyle,
    commanRadius,
  } from '../../../asset/style/commonStyle';
  import {CloseBlack, EmptyBag} from '../../../asset/img';
  import TextTranslation from '../../commonResources/component/CommonInput/TextTranslation';
  import {FontStyle} from '../../../asset/style/FontsStyle';
  import Button from '../../commonResources/component/CommonButton/Button';
  import {useTranslation} from 'react-i18next';
  import {use} from 'i18next';
  import {useNavigation, useRoute} from '@react-navigation/native';
  
  const {width, height} = Dimensions.get('screen');
  
  const OrderPlacedRender = () => {
    const {t: translate} = useTranslation();
    const route = useRoute<any>();
    const navigation = useNavigation<any>();
  
    const navigationToHome = () => {
      navigation.navigate('BottomTabBar');
    };
  
    console.log(route);
    const heading = route.params.delivery;
    return (
      <View style={{flex: 1, backgroundColor: ColorVariable.blueBlack}}>
        <View style={styles.main}>
          <Pressable onPress={navigationToHome} style={{width: 40}}>
            <CloseBlack />
          </Pressable>
          {heading == 'pickup_at_store' ? (
            <View>
              <View style={{alignItems: 'center', paddingTop: 64}}>
                <Image
                  source={require('../../../asset/img/updatedImg/storePickUp.png')}
                  style={{width: 0.66 * width, height: 0.25 * height}}
                />
              </View>
              <View style={{alignItems: 'center', paddingTop: 24}}>
                <TextTranslation
                  text={'__ORDER_IS_CONFIRMED__'}
                  style={FontStyle.fontHeavy24}
                />
                {/* <TextTranslation text={"Your order ID 182934, for Superstore pickup is confirmed."} style={[FontStyle.fontRegular16, { marginTop: 16, textAlign: "center" }]} /> */}
                <Text
                  style={[
                    FontStyle.fontRegular16,
                    {marginTop: 16, textAlign: 'center'},
                  ]}>
                  {translate('__YOUR_ORDER_ID__')} {route.params.order_id}{' '}
                  {translate('__SUPERSTORE_PICK_UP__')}{' '}
                  {translate('__IS_CONFIRMED__')}
                </Text>
              </View>
            </View>
          ) : heading == 'home_delivery' ? (
            <View>
              <View style={{alignItems: 'center', paddingTop: 64}}>
                <Image
                  source={require('../../../asset/img/updatedImg/OrderConfirmed.png')}
                  style={{width: 0.66 * width, height: 0.25 * height}}
                />
              </View>
              <View style={{alignItems: 'center', paddingTop: 24}}>
                <TextTranslation
                  text={'__ORDER_IS_CONFIRMED__'}
                  style={FontStyle.fontHeavy24}
                />
                <Text
                  style={[
                    FontStyle.fontRegular16,
                    {marginTop: 16, textAlign: 'center'},
                  ]}>
                  {translate('__YOUR_ORDER_ID__')} {route.params.order_id}{' '}
                  {translate('__HOME_DELIVERY__')} {translate('__IS_CONFIRMED__')}
                </Text>
              </View>
            </View>
          ) : null}
          <View style={{bottom: 24, position: 'absolute', right: 20, left: 20}}>
            <Pressable style={[styles.btn]} onPress={navigationToHome}>
              <Image
                source={require('../../../asset/img/updatedImg/ShoppingbagWhite.png')}
                style={{width: 24, height: 24, marginRight: 8}}
              />
              <TextTranslation
                style={[FontStyle.fontHeavy18, {color: 'white'}]}
                text={'__CONTINUE_SHOPPING__'}
              />
            </Pressable>
            <Button
              title={translate('__VIEW_ORDER_STATUS__')}
              fontSize={16}
              bgBlack
              onPress={() =>
                navigation.navigate('signIn', {
                  screen: 'MyOrder',
                })
              }
            />
          </View>
        </View>
      </View>
    );
  };
  
  export default OrderPlacedRender;
  
  const styles = StyleSheet.create({
    main: {
      backgroundColor: ColorVariable.white,
      paddingHorizontal: 20,
      paddingTop: 20,
      paddingBottom: 24,
      marginTop: 20,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      flex: 1,
    },
    btn: {
      height: 54,
      borderRadius: commanRadius.radi6,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: ColorVariable.farmkartGreen,
      flexDirection: 'row',
      marginBottom: 16,
    },
  });
  