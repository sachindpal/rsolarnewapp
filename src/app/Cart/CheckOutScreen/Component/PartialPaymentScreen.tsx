import {Image, Modal, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {
  ColorVariable,
  CommonStyle,
  commanRadius,
} from '../../../../asset/style/commonStyle';
import {CloseBlack} from '../../../../asset/img';
import {FontStyle} from '../../../../asset/style/FontsStyle';
import TextTranslation from '../../../commonResources/component/CommonInput/TextTranslation';
import {useNavigation} from '@react-navigation/native';
import {flingGestureHandlerProps} from 'react-native-gesture-handler/lib/typescript/handlers/FlingGestureHandler';

const PartialPaymentScreen = ({modalClose, partialPaymentModal,getValues}: any) => {
  const navigation = useNavigation<any>();
  const [paymentOption, setpaymentOption] = useState('');
  const selectedOption = (item: any) => {
    setpaymentOption(item);
    getValues(item)
    console.log('===============', item);
    if (item == 'UIC') {
      navigation.navigate('global', {screen: 'RechargeUIC'});
    } else if (item == 'cod') {
      modalClose();
    } else if (item == 'PayOnline') {
      modalClose();
    }
  };

  // const setPaymentMode =(item:any)=>{
  //   getValues(item)
  // }

  return (
    <Modal transparent visible={partialPaymentModal} animationType="slide">
      <View style={{flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.6)'}}>
        <View style={[CommonStyle.sheet, {padding: 20}]}>
          <Pressable style={{width: 54}} onPress={modalClose}>
            <CloseBlack />
          </Pressable>
          <View style={{alignItems: 'center', marginBottom: 40}}>
            <Image
              source={require('../../../../asset/img/updatedImg/partialPayment.png')}
              style={{width: 151, height: 164}}
            />
          </View>
          <View style={{width: '80%', alignSelf: 'center'}}>
            <TextTranslation
              style={[FontStyle.fontHeavy24, {textAlign: 'center'}]}
              text={'__NO_ENOUGH_CREDITS__'}
            />
          </View>

          <Pressable
            style={[
              styles.option,
              {
                borderColor:
                  paymentOption == 'UIC'
                    ? ColorVariable.farmkartGreen
                    : ColorVariable.stroke,
              },
            ]}
            onPress={() => selectedOption('UIC')}>
            <View
              style={[
                CommonStyle.flex_dirRow_alignCenter_justifySpbtw,
                {paddingHorizontal: 8},
              ]}>
              <View style={[CommonStyle.flex_dirRow_alignCenter]}>
                <View style={{padding: 6, marginRight: 16}}>
                  <Image
                    source={require('../../../../asset/img/updatedImg/UICcard.png')}
                    style={{width: 52, height: 32}}
                  />
                </View>
                <TextTranslation
                  style={FontStyle.fontMedium15}
                  text={'__RECHARGE_UIC__'}
                />
              </View>
              {paymentOption == 'UIC' ? (
                <View>
                  <Image
                    source={require('../../../../asset/img/updatedImg/tick.png')}
                    style={{width: 40, height: 40}}
                  />
                </View>
              ) : null}
            </View>
          </Pressable>
          <View style={{width: '80%', alignSelf: 'center'}}>
            <TextTranslation
              style={[
                FontStyle.fontMedium16,
                {marginTop: 16, textAlign: 'center'},
              ]}
              text={'__LIKE_CONTINUE_CHECKOUT__'}
            />
          </View>
          <Pressable
            style={[
              styles.option,
              {
                borderColor:
                  paymentOption == 'cod'
                    ? ColorVariable.farmkartGreen
                    : ColorVariable.stroke,
              },
            ]}
            onPress={() => selectedOption('cod')}>
            <View
              style={[
                CommonStyle.flex_dirRow_alignCenter_justifySpbtw,
                {paddingHorizontal: 8},
              ]}>
              <View style={[CommonStyle.flex_dirRow_alignCenter]}>
                <View style={{padding: 6, marginRight: 16}}>
                  <Image
                    source={require('../../../../asset/img/updatedImg/cod.png')}
                    style={{width: 52, height: 32}}
                  />
                </View>
                <TextTranslation
                  style={FontStyle.fontMedium15}
                  text={'__CASH_ON_DELIVERY__'}
                />
              </View>
              {paymentOption == 'cod' ? (
                <View>
                  <Image
                    source={require('../../../../asset/img/updatedImg/tick.png')}
                    style={{width: 40, height: 40}}
                  />
                </View>
              ) : null}
            </View>
          </Pressable>
          <Pressable
            style={[
              styles.option,
              {
                borderColor:
                  paymentOption == 'PayOnline'
                    ? ColorVariable.farmkartGreen
                    : ColorVariable.stroke,
                marginTop: 16,
              },
            ]}
            onPress={() => selectedOption('PayOnline')}>
            <View
              style={[
                CommonStyle.flex_dirRow_alignCenter_justifySpbtw,
                {paddingHorizontal: 8},
              ]}>
              <View style={[CommonStyle.flex_dirRow_alignCenter, {flex: 1}]}>
                <View style={{padding: 6, marginRight: 16}}>
                  <Image
                    source={require('../../../../asset/img/updatedImg/creditCard.png')}
                    style={{width: 52, height: 32}}
                  />
                </View>
                <View
                  style={[
                    CommonStyle.flex_dirRow_alignCenter,
                    {flexWrap: 'wrap', flex: 1},
                  ]}>
                  <TextTranslation
                    text={'__PAY_ONLINE__'}
                    style={FontStyle.fontMedium15}
                  />
                  <Text style={[FontStyle.fontRegular12]}>
                    {' '}
                    (ATM card/UPI/QR)
                  </Text>
                </View>
              </View>
              {paymentOption == 'PayOnline' ? (
                <View>
                  <Image
                    source={require('../../../../asset/img/updatedImg/tick.png')}
                    style={{width: 40, height: 40}}
                  />
                </View>
              ) : null}
            </View>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

export default PartialPaymentScreen;

const styles = StyleSheet.create({
  option: {
    borderWidth: 1,
    borderRadius: commanRadius.radi6,
    padding: 8,
    marginTop: 16,
  },
});
