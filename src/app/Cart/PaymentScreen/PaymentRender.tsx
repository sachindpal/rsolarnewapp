import {
  Image,
  ImageComponent,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import {
  ColorVariable,
  CommonStyle,
  commanRadius,
} from '../../../asset/style/commonStyle';
import TextTranslation from '../../commonResources/component/CommonInput/TextTranslation';
import { FontStyle } from '../../../asset/style/FontsStyle';
import CustomButton from '../../commonResources/component/CommonButton/CustomButton';
import { useTranslation } from 'react-i18next';
import Button from '../../commonResources/component/CommonButton/Button';
import SkeletonLoader from '../../commonResources/component/SkeletonLoader';
import { getLocalStorageData, postAuthReq, postUnAuthReq } from '../../Service/APIServices/axoisService';

interface DataType {
  navigationToAddressScreen: any;
  navigationToCheckOutScreen: any;
  goBack: any;
  navigationToAccount: any;
  openlearnMoreModal: any;
  userStatus: any;
  isloadingUserStatus: boolean;
  isLoggedInStatus: boolean;
  total: any
}

const PaymentRender = ({
  navigationToAddressScreen,
  navigationToAccount,
  navigationToCheckOutScreen,
  openlearnMoreModal,
  goBack,
  userStatus,
  isloadingUserStatus,
  isLoggedInStatus,
  total
}: DataType) => {
  const { t: translate } = useTranslation();

  const [nonUICOption, setnonUICOption] = useState('');
  const [UICOption, setUICOption] = useState('UIC');
  const [error, seterror] = useState(false);

  useEffect(() => {
    getCartData()


  }, [])

  const getCartData = async () => {
    // await getLocalStorageData('bagProduct').then((cardData:any)=>{
    //   console.log('cardData',cardData)

    //   if(cardData.length > 0){
    //     JSON.parse(cardData).map((val:any)=>{
    //       console.log('val',val)
    //       postAuthReq('/cart/update-cartdata', {productId:val.id,qty:val.qty}).then((data) => {
    //         console.log('data',data.data)
    //       })
    //     })

    //   }

    // }).catch((err)=>{
    //   console.log('err',err)
    // })
  }

  const nonUICvalidation = () => {
    if (nonUICOption.length == 0) {
      seterror(true);
    } else {
      navigationToAddressScreen(nonUICOption);
    }
  };
  const UICvalidation = () => {
    if (UICOption.length == 0) {
      seterror(true);
    } else {
      navigationToCheckOutScreen(UICOption);
    }
  };

  const selectedOptionNonUIC = (item: any) => {
    console.log('lllllllllllllllllllll', item)
    setnonUICOption(item);
    seterror(false);
  };
  const selectedOptionUIC = (item: any) => {
    console.log('jjjjjjjjj', item)
    setUICOption(item);
  };

  const PaymentForNonUIC = () => {
    return (
      <View
        style={[styles.content, { justifyContent: 'space-between', flex: 1 }]}>
        <View>
          <View style={{ paddingVertical: 24 }}>
            <TextTranslation
              style={FontStyle.fontHeavy18}
              text={'__CHOOSE_PAYMENT_METHOD__NEW'}
            />
          </View>
          <View
            style={[
              styles.option,
              {
                borderColor: error
                  ? ColorVariable.errorRed
                  : nonUICOption == 'UIC'
                    ? ColorVariable.farmkartGreen
                    : ColorVariable.stroke,
              },
            ]}>
            <View
              style={[
                CommonStyle.flex_dirRow_alignCenter,
                {
                  borderBottomColor: ColorVariable.stroke,
                  borderBottomWidth: 0.5,
                },
              ]}>
              <View style={{ padding: 6 }}>
                <Image
                  source={require('../../../asset/img/updatedImg/UICcard.png')}
                  style={{ width: 81, height: 51 }}
                />
              </View>

              <View style={{ flex: 1, marginLeft: 16 }}>
                <TextTranslation
                  style={[FontStyle.fontRegular14]}
                  text={'__PAY_WITH_UIC__'}
                />
              </View>
            </View>
            <View
              style={[
                CommonStyle.flex_dirRow_alignCenter_justifySpbtw,
                { padding: 8 },
              ]}>
              <View style={{ paddingRight: 12 }}>
                <TextTranslation
                  onPress={openlearnMoreModal}
                  text={'__LEARN_MORE__'}
                  style={[
                    FontStyle.fontHeavy15,
                    { textDecorationLine: 'underline', lineHeight: 24 },
                  ]}
                />
              </View>
              <View>
                <CustomButton
                  paddingHorizontal={16}
                  paddingVertical={8}
                  title={translate('__SIGNUP_FOR_UIC__')}
                  bgGreen
                  fontSize={15}
                  onPress={navigationToAccount}
                />
              </View>
            </View>
          </View>

          {/* <View style={{paddingVertical: 16, alignItems: 'center'}}>
            <Text style={FontStyle.fontRegular16}>or</Text>
          </View> */}
          <Pressable
            style={[
              styles.option,
              {
                borderColor: error
                  ? ColorVariable.errorRed
                  : nonUICOption == 'COD'
                    ? ColorVariable.farmkartGreen
                    : ColorVariable.stroke,
                marginTop: 16,
              },
            ]}
            onPress={() => selectedOptionNonUIC('COD')}>
            <View
              style={[
                CommonStyle.flex_dirRow_alignCenter_justifySpbtw,
                { paddingHorizontal: 8 },
              ]}>
              <View style={[CommonStyle.flex_dirRow_alignCenter]}>
                <View style={{ padding: 6, marginRight: 16 }}>
                  <Image
                    source={require('../../../asset/img/updatedImg/cod.png')}
                    style={{ width: 52, height: 32 }}
                  />
                </View>
                <TextTranslation
                  style={FontStyle.fontMedium15}
                  text="__CASH_ON_DELIVERY__"
                />
              </View>
              {nonUICOption == 'COD' ? (
                <View>
                  <Image
                    source={require('../../../asset/img/updatedImg/tick.png')}
                    style={{ width: 40, height: 40 }}
                  />
                </View>
              ) : null}
            </View>
          </Pressable>
          <Pressable
            style={[
              styles.option,
              {
                borderColor: error
                  ? ColorVariable.errorRed
                  : nonUICOption == 'PayOnline'
                    ? ColorVariable.farmkartGreen
                    : ColorVariable.stroke,
                marginTop: 16,
              },
            ]}
            onPress={() => selectedOptionNonUIC('PayOnline')}>
            <View
              style={[
                CommonStyle.flex_dirRow_alignCenter_justifySpbtw,
                { paddingHorizontal: 8 },
              ]}>
              <View style={[CommonStyle.flex_dirRow_alignCenter, { flex: 1 }]}>
                <View style={{ padding: 6, marginRight: 16 }}>
                  <Image
                    source={require('../../../asset/img/updatedImg/creditCard.png')}
                    style={{ width: 52, height: 32 }}
                  />
                </View>
                <View
                  style={[
                    CommonStyle.flex_dirRow_alignCenter,
                    { flexWrap: 'wrap', flex: 1 },
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
              {nonUICOption == 'PayOnline' ? (
                <View>
                  <Image
                    source={require('../../../asset/img/updatedImg/tick.png')}
                    style={{ width: 40, height: 40 }}
                  />
                </View>
              ) : null}
            </View>
          </Pressable>
          {error ? (
            <View style={{ marginTop: 8 }}>
              <TextTranslation
                style={[
                  FontStyle.fontMedium14,
                  { color: ColorVariable.errorRed },
                ]}
                text={'__PAYMENT_METHOD_ERROR__'}
              />
            </View>
          ) : null}
        </View>
        <View style={{ paddingVertical: 24, paddingHorizontal: 16 }}>
          <Button
            title={translate('__CONTINUE_TO_CHECK_OUT__')}
            fontSize={16}
            bgGreen
            onPress={nonUICvalidation}
          />
        </View>
      </View>
    );
  };
  const PaymentForUIC = () => {
    return (
      <View
        style={[styles.content, { justifyContent: 'space-between', flex: 1 }]}>
        <View>
          <View style={{ paddingVertical: 24 }}>
            <TextTranslation
              style={FontStyle.fontHeavy18}
              text={'__CHOOSE_PAYMENT_METHOD__NEW'}
            />
          </View>
          <Pressable
            style={[
              styles.option,
              {
                borderColor:
                  UICOption == 'UIC'
                    ? ColorVariable.farmkartGreen
                    : ColorVariable.stroke,
              },
            ]}
            onPress={() => selectedOptionUIC('UIC')}>
            <View
              style={[
                CommonStyle.flex_dirRow_alignCenter_justifySpbtw,
                { paddingHorizontal: 8 },
              ]}>
              <View style={[CommonStyle.flex_dirRow_alignCenter]}>
                <View style={{ padding: 6, marginRight: 16 }}>
                  <Image
                    source={require('../../../asset/img/updatedImg/UICcard.png')}
                    style={{ width: 52, height: 32 }}
                  />
                </View>
                <TextTranslation
                  style={FontStyle.fontMedium15}
                  text={'__UIC_BALANCE__'}
                />
              </View>
              {UICOption == 'UIC' ? (
                <View>
                  <Image
                    source={require('../../../asset/img/updatedImg/tick.png')}
                    style={{ width: 40, height: 40 }}
                  />
                </View>
              ) : null}
            </View>
          </Pressable>

          <Pressable
            style={[
              styles.option,
              {
                marginTop: 16,
                borderColor:
                  UICOption == 'COD'
                    ? ColorVariable.farmkartGreen
                    : ColorVariable.stroke,
              },
            ]}
            onPress={() => selectedOptionUIC('COD')}>
            <View
              style={[
                CommonStyle.flex_dirRow_alignCenter_justifySpbtw,
                { paddingHorizontal: 8 },
              ]}>
              <View style={[CommonStyle.flex_dirRow_alignCenter]}>
                <View style={{ padding: 6, marginRight: 16 }}>
                  <Image
                    source={require('../../../asset/img/updatedImg/cod.png')}
                    style={{ width: 52, height: 32 }}
                  />
                </View>
                <TextTranslation
                  style={FontStyle.fontMedium15}
                  text="__CASH_ON_DELIVERY__"
                />
              </View>
              {UICOption == 'COD' ? (
                <View>
                  <Image
                    source={require('../../../asset/img/updatedImg/tick.png')}
                    style={{ width: 40, height: 40 }}
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
                  UICOption == 'PayOnline'
                    ? ColorVariable.farmkartGreen
                    : ColorVariable.stroke,
                marginTop: 16,
              },
            ]}
            onPress={() => selectedOptionUIC('PayOnline')}>
            <View
              style={[
                CommonStyle.flex_dirRow_alignCenter_justifySpbtw,
                { paddingHorizontal: 8 },
              ]}>
              <View style={[CommonStyle.flex_dirRow_alignCenter, { flex: 1 }]}>
                <View style={{ padding: 6, marginRight: 16 }}>
                  <Image
                    source={require('../../../asset/img/updatedImg/creditCard.png')}
                    style={{ width: 52, height: 32 }}
                  />
                </View>
                <View
                  style={[
                    CommonStyle.flex_dirRow_alignCenter,
                    { flexWrap: 'wrap', flex: 1 },
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
              {UICOption == 'PayOnline' ? (
                <View>
                  <Image
                    source={require('../../../asset/img/updatedImg/tick.png')}
                    style={{ width: 40, height: 40 }}
                  />
                </View>
              ) : null}
            </View>
          </Pressable>
        </View>
        <View style={{ paddingVertical: 24, paddingHorizontal: 16 }}>
          <Button
            title={translate('__CONTINUE_TO_CHECK_OUT__')}
            fontSize={16}
            bgGreen
            onPress={() => navigationToCheckOutScreen(UICOption)}
          />
        </View>
      </View>
    );
  };

  return (
    <View style={CommonStyle.mainViewWhite}>
      <View style={[styles.header, CommonStyle.flex_dirRow_alignCenter]}>
        <Pressable onPress={goBack}>
          <Image
            source={require('../../../asset/img/updatedImg/backArrow.png')}
            style={{ width: 32, height: 32 }}
          />
        </Pressable>
        <View style={CommonStyle.flex_dirRow_alignCenter}>
          <TextTranslation
            style={[
              FontStyle.fontMedium18,
              { color: ColorVariable.white, marginLeft: 16 },
            ]}
            text={'__ORDER_TOTAL__'}
          />
          <Text style={[FontStyle.fontMedium18, { color: ColorVariable.white }]}>
            {' '}
            ₹{total}
          </Text>
        </View>
      </View>
      {isloadingUserStatus ? (
        <View style={{ marginTop: 24, paddingHorizontal: 24 }}>
          {Array.from({ length: 3 }).map((_, index) => {
            return (
              <View key={index} style={{ marginVertical: 24 }}>
                <SkeletonLoader
                  width={'95%'}
                  height={60}
                  variant="box"
                  variant2="dark"
                />
              </View>
            );
          })}
        </View>
      ) : userStatus === 'UIC' || userStatus === 'UIC_GOLD' ? (
        <PaymentForUIC />
      ) : (
        <PaymentForNonUIC />
      )}
    </View>
  );
};

export default PaymentRender;

const styles = StyleSheet.create({
  header: {
    backgroundColor: ColorVariable.blueBlack,
    padding: 16,
    height: 64,
  },
  content: {
    paddingHorizontal: 20,
  },
  option: {
    borderWidth: 1,
    borderRadius: commanRadius.radi6,
    padding: 8,
  },
});
