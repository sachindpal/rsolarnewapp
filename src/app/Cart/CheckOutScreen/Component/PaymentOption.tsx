import {Image, StyleSheet, Text, View} from 'react-native';
import React, { useEffect } from 'react';
import {FontStyle} from '../../../../asset/style/FontsStyle';
import {ColorVariable, CommonStyle} from '../../../../asset/style/commonStyle';
import TextTranslation from '../../../commonResources/component/CommonInput/TextTranslation';

const PaymentOption = ({option,paymentObj,uicDetails}: any) => {
  console.log('paymentObj',uicDetails)
  // useEffect(()=>{
    
  // },[])
  return (
    <>
      {option == 'cod' ? (
        <View style={[CommonStyle.flex_dirRow_alignCenter, styles.main]}>
          <Image
            source={require('../../../../asset/img/updatedImg/cod.png')}
            style={{width: 96, height: 60, marginRight: 16}}
          />
          <Text style={FontStyle.fontMedium16}>Pay on delivery</Text>
        </View>
      ) : option == 'online' ? (
        <View style={[CommonStyle.flex_dirRow_alignCenter, styles.main]}>
          <Image
            source={require('../../../../asset/img/updatedImg/creditCard.png')}
            style={{width: 96, height: 60, marginRight: 16}}
          />
          <View
            style={[
              CommonStyle.flex_dirRow_alignCenter,
              {flexWrap: 'wrap', flex: 1},
            ]}>
            <TextTranslation
              text={'__PAY_ONLINE__'}
              style={FontStyle.fontMedium15}
            />
            <Text style={[FontStyle.fontRegular12]}> (ATM card/UPI/QR)</Text>
          </View>
        </View>
      ) : option == 'UIC' || option=='uic' ? (
        <View style={[CommonStyle.flex_dirRow_alignCenter, styles.main]}>
          <Image
            source={require('../../../../asset/img/updatedImg/UICcard.png')}
            style={{width: 96, height: 60, marginRight: 16}}
          />
          <View style={{flex: 1}}>
            <View style={CommonStyle.flex_dirRow_alignCenter_justifySpbtw}>
              <TextTranslation style={FontStyle.fontMedium16} text={"__UIC_NUMBER__"}></TextTranslation>
              <Text
                style={[
                  FontStyle.fontMedium16,
                  {color: 'rgba(126, 126, 126, 1)', marginLeft: 8},
                ]}>
                ***-***-{uicDetails?.uicCode?uicDetails.uicCode.slice(uicDetails.uicCode.length-4,uicDetails.uicCode.length):null}
              </Text>
            </View>
            <View style={CommonStyle.flex_dirRow_alignCenter_justifySpbtw}>
              <TextTranslation style={FontStyle.fontMedium16}  text={"__UIC_BALANCE__"}></TextTranslation>
              <Text
                style={[
                  FontStyle.fontMedium16,
                  {
                    color: 'rgba(126, 126, 126, 1)',
                    marginLeft: 8,
                    textAlign: 'left',
                  },
                ]}>
                ₹{uicDetails.uicamount}
              </Text>
            </View>
          </View>
        </View>
      ) : null}
    </>
  );
};

export default PaymentOption;

const styles = StyleSheet.create({
  main: {
    paddingVertical: 16,
    paddingHorizontal: 8,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: ColorVariable.stroke,
  },
});
