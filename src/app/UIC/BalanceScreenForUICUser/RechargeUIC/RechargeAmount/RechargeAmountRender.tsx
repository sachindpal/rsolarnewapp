import {
  ActivityIndicator,
  Dimensions,
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {
  ColorVariable,
  CommonStyle,
} from '../../../../../asset/style/commonStyle';
import {CloseBlack} from '../../../../../asset/img';
import {FontStyle} from '../../../../../asset/style/FontsStyle';
import {FlatList, ScrollView, TextInput} from 'react-native-gesture-handler';
import SwipeButton from '../../../../Cart/CheckOutScreen/Component/SwipeButton';
import TextTranslation from '../../../../commonResources/component/CommonInput/TextTranslation';
import {useTranslation} from 'react-i18next';

interface DataType {
  navigateToSuccessScreen: () => void;
  selectAmount: (item: any) => void;
  selectOther: () => void;
  amount: number;
  other: boolean;
  setamount: any;
  goBack: any;
  btnloading: any;
}

const {width, height} = Dimensions.get('screen');

const amt = ['5,000', '10,000', '25,000', '50,000', 'Other'];

const RechargeAmount = ({
  navigateToSuccessScreen,
  selectAmount,
  selectOther,
  btnloading,
  amount,
  other,
  setamount,
  goBack,
}: DataType) => {
  const {t: translate} = useTranslation();
  return (
    <ScrollView
      contentContainerStyle={{flexGrow: 1}}
      keyboardShouldPersistTaps="handled">
      <View style={[CommonStyle.sheet]}>
        <Pressable
          style={{width: 50, paddingHorizontal: 20, paddingTop: 20}}
          onPress={goBack}>
          <CloseBlack />
        </Pressable>

        <View style={{justifyContent: 'space-between', flex: 1}}>
          <View style={{padding: 20}}>
            <View style={{alignItems: 'center', marginTop: 24}}>
              <Image
                source={require('../../../../../asset/img/updatedImg/RechargeUICAmt.png')}
                style={{width: 200, height: 180}}
              />
            </View>
            <View>
              <TextTranslation
                style={[
                  FontStyle.fontHeavy24,
                  {marginTop: 16, textAlign: 'center'},
                ]}
                text={'__THIS_IS_A_SECURE_PAYMENT__'}
              />
            </View>
            <View style={{width: '70%', alignSelf: 'center'}}>
              <TextTranslation
                style={[
                  FontStyle.fontMedium16,
                  {marginTop: 8, textAlign: 'center'},
                ]}
                text={'__CHOOSE_AMOUNT_THAT_LIKE_RECHARGE__'}
              />
            </View>
            <View
              style={{
                marginTop: 8,
                alignSelf: 'center',
                // alignItems: 'center',
                flex: 1,
              }}>
              <View style={{alignItems: 'center', flex: 1}}>
                <FlatList
                  data={other ? amt.slice(0, 4) : amt}
                  scrollEnabled={false}
                  numColumns={2}
                  renderItem={item => {
                    return (
                      <Pressable
                        style={
                          amount === parseFloat(item.item.replace(/,/g, ''))
                            ? styles.selectedAmt
                            : styles.unselectedAmt
                        }
                        onPress={() => selectAmount(item.item)}>
                        <Text
                          style={[
                            FontStyle.fontMedium18,
                            {
                              color:
                                amount ===
                                parseFloat(item.item.replace(/,/g, ''))
                                  ? 'white'
                                  : ColorVariable.blueBlack,
                            },
                          ]}>
                          {item.item !== 'Other'
                            ? `₹ ${item.item}`
                            : translate('__OTHER__')}
                        </Text>
                      </Pressable>
                    );
                  }}
                />
              </View>

              {other ? (
                <>
                  <View style={styles.textView}>
                    <TextInput
                      placeholder="Enter amount"
                      keyboardType="number-pad"
                      placeholderTextColor={'rgba(126, 126, 126, 1)'}
                      onChangeText={val => setamount(Number(val))}
                      style={[FontStyle.fontMedium16]}
                    />
                  </View>
                  <Text
                    style={[
                      FontStyle.fontMedium14,
                      {
                        color: ColorVariable.gray,
                        marginTop: 8,
                        marginLeft: 8,
                      },
                    ]}>
                    {translate('__MINIMUM_RECHARGE_AMOUNT__')} ₹1,000{' '}
                  </Text>
                </>
              ) : null}
            </View>
          </View>
          <View style={styles.footer}>
            <Text
              style={[
                FontStyle.fontHeavy18,
                {color: 'white', textAlign: 'center', marginVertical: 8},
              ]}>
              {`${translate('__AMOUNT__')} ₹ ${amount}`}
            </Text>
            <View
              style={{paddingHorizontal: 24, paddingVertical: 16, flexGrow: 1}}>
              {!btnloading ? (
                <SwipeButton
                  title="__SLIDE_RIGHT_TO_RECHARGE__"
                  navigateToOrderSucess={navigateToSuccessScreen}
                  img="card"
                />
              ) : (
                <View style={styles.switchBtn}>
                  <ActivityIndicator color={'green'} size={'large'} />
                </View>
              )}
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default React.memo(RechargeAmount);

const styles = StyleSheet.create({
  selectedAmt: {
    backgroundColor: ColorVariable.blueBlack,
    borderRadius: 6,
    width: 125,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 8,
  },
  unselectedAmt: {
    backgroundColor: ColorVariable.white,
    borderRadius: 6,
    width: 125,
    height: 45,
    borderWidth: 1,
    borderColor: ColorVariable.blueBlack,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 8,
  },
  textView: {
    backgroundColor: ColorVariable.white,
    borderRadius: 6,
    height: 45,
    borderWidth: 1,
    borderColor: ColorVariable.blueBlack,
    marginTop: 8,
    justifyContent: 'center',
    paddingHorizontal: 16,
    flexGrow: 1,
    marginHorizontal: 8,
  },
  footer: {
    backgroundColor: ColorVariable.blueBlack,
  },
  other: {
    backgroundColor: ColorVariable.white,
    borderRadius: 6,
    minWidth: 125,
    height: 45,
    borderWidth: 1,
    borderColor: ColorVariable.blueBlack,
    alignSelf: 'flex-start',
    // marginLeft: 26,
    margin: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  switchBtn: {
    backgroundColor: ColorVariable.white,
    padding: 8,
    borderRadius: 50,
    height: 70,
    marginTop: 16,
    justifyContent: 'center',
    alignContent: 'center',
  },
});
