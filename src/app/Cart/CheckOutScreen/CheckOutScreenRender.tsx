import {
  ActivityIndicator,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  ColorVariable,
  CommonStyle,
  commanRadius,
} from '../../../asset/style/commonStyle';
import {BagBlack, CloseBlack, LeftBackIcon} from '../../../asset/img';
import PaymentOption from './Component/PaymentOption';
import TextTranslation from '../../commonResources/component/CommonInput/TextTranslation';
import {FontStyle} from '../../../asset/style/FontsStyle';
import TextInputField from '../../commonResources/component/CommonInput/TextInputField';
import {useTranslation} from 'react-i18next';
import {ScrollView, State} from 'react-native-gesture-handler';
import PromoCarosel from './Component/PromoCarosel';
import SwipeButton from './Component/SwipeButton';
import CustomModal from '../../commonResources/component/ModelPopUp/CustomModal';
import {styles} from './Style';
import {
  getLocalStorageData,
  onCallMobileNumber,
  postAuthReq,
} from '../../Service/APIServices/axoisService';
import Button from '../../commonResources/component/CommonButton/Button';
import {concatAll} from 'rxjs';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';
interface DataTypes {
  navigateToOrderSucess: any;
  deliveryType: any;
  setdeliveryType: any;
  navigateToEditAddress: any;
  goBack: any;
  paymentMethod: any;
  uicDetails: any;
  partialPaymentmodalClose: any;
  partialPaymentMode: any;
  isloading: any;
}

const CheckOutScreenRender = ({
  navigateToOrderSucess,
  deliveryType,
  setdeliveryType,
  navigateToEditAddress,
  goBack,
  paymentMethod,
  uicDetails,
  partialPaymentmodalClose,
  partialPaymentMode,
  isloading,
}: DataTypes) => {
const navigation = useNavigation<any>();

  const [deliveryTime, setdeliveryTime] = React.useState('36');
  const [shipping_type, setshipping_type] = React.useState('free');
  const [showItem, setshowItem] = useState(false);
  const [promoCode, setpromoCode] = useState('');
  const [activepromoCode, setactivepromoCode] = useState('Anand');
  const [promoApplied, setpromoApplied] = useState(false);
  const [promoError, setpromoError] = useState('');
  const [modalShow, setmodalShow] = useState(false);
  const [paymentBreakDown, setPaymentBreakDown] = useState<any>({});
  const [cartProducts, setCartProducts] = useState<any>({});
  const [uicPriceParams, setUicPriceParams] = useState({
    promocodeDiscount: 0,
    paymentMethod: paymentMethod,
    shippingType: shipping_type,
  });

  const [cartData, setCartData] = useState([]);
  const [addChngeFlag, setaddChngeFlag] = useState(false);
  const [currentLang, setCurrentLang] = useState(1);
  const [promocodes, setPromocodes] = useState([]);
  const [localUserInfo, setLocalUserInfo] = useState<any>([]);
  const [state, setState] = useState<any>(0);
  const [customerInfo, setCustomerInfo] = useState<any>({});
  const [isSliderShow, setIsSliderShow] = useState<any>(false);
  const [isSliderShowGold, setIsSliderShowGold] = useState<any>(false);
  const [isSliderShowRenewUic, setIsSliderShowRenewUic] = useState<any>(false);

  // 'order/get-order-prices'
  console.log('_______state', state);
  const focused = useIsFocused();

  useEffect(() => {
    
    
    getLocalStorageData('currentLangauge').then(val => {
      var localLang = 1;
      if (val == 'hi') {
        setCurrentLang(2);
        localLang = 2;
      }
      getUicPrice(deliveryTime);
      getLocalStorageData('userInfo').then(async (userInfo: any) => {
        // setLocalUserInfo(JSON.parse(userInfo));
        console.log('jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj----------',userInfo)
        uicExistOrNot()
        setCustomerInfo(JSON.parse(userInfo))
   var stateId = await getLocalStorageData('current_state');
   setState(stateId)
        // setState(JSON.parse(userInfo).stateid)
        getCartProducts(stateId, localLang);
        getUserAddress(JSON.parse(userInfo).customerid);
      });
    });
  }, [focused]);

  const navigationToUICRenew = () => {
    navigation.navigate('global', {screen: 'RenewUICQuestion'});
  };

  const uicExistOrNot = async()=>{
    var userInfo: any = await AsyncStorage.getItem('userInfo');
    postAuthReq('/order/get-uic-details', {})
        .then(res => {
          console.log('res.data.data?.uicDetails-----------------------------------------',res.data.data?.uicDetails)
          var futureMonth = moment(JSON.parse(userInfo)?.uicappliedon).add(1, 'M').format('YYYY-MM-DD');
          if ((JSON.parse(userInfo)?.aplyforuic == 'Y')
            || res.data.data?.uicDetails.uicamount >= 1000) {
              setIsSliderShow(true)

              if(futureMonth >= moment().format('YYYY-MM-DD')){
                setIsSliderShowRenewUic(true)
              }
            }



            if(res.data.data?.uicDetails?.uicType == 'UIC_GOLD'){
              setIsSliderShow(true)
              setIsSliderShowRenewUic(true)

            }
        })
  }
  

  const getCartProducts = async (state: any, localLang: any) => {
    var stateId = await getLocalStorageData('current_state');
    console.log('state-------------------------------------------', stateId);
    postAuthReq('/cart/get-cartdata', {
      langId: localLang,
      stateId: stateId,
    }).then(data => {
      // console.log('state-------------------------------------------',data.data.data)

      setCartData(data.data.data.cartDetails);
    });
  };

  const getUserAddress = (userId: any) => {
    postAuthReq('/user/get-user-address', {
      langId: currentLang,
      customerid: userId,
    })
      .then(data => {
        setLocalUserInfo(data.data.data[0]);
        // console.log('jkjkjkjkjkjkjkjk',data.data.data[0])
        setaddChngeFlag(!addChngeFlag);
      })
      .catch(err => {
        console.log('pppppppppppppp', err);
      });
  };
  const navigationToUic = ()=>{
    navigation.navigate('signIn', {
      screen: 'AddressScreen',
      params: {
        screen: 'UICRegistration',
      },
    })
  }
  console.log('state---============================', state);

  const getUicPrice = (delTime = '') => {
    let shipping_type = '';
    if (delTime == '24') {
      shipping_type = 'paid';
    } else {
      shipping_type = 'free';
    }

    uicPriceParams.shippingType = shipping_type;
    console.log('uicPriceParams', uicPriceParams);

    postAuthReq('/order/get-order-prices-new', uicPriceParams).then(data => {
      console.log('uicDetails.uicamount+customerInfo.uiclimit',uicDetails.uicamount)
    console.log('uicDetails.paymentBreakDown',data.data.data)
      setPaymentBreakDown(data.data.data);
    });
  };
  const redirectToUic = ()=>{
    navigation.navigate('signIn', {
      screen: 'LearnMoreUic',
    })
  }

  const modalClose = () => {
    setmodalShow(!modalShow);
  };

  const handleDeliveryType = (deliveryType: string) => {
    setdeliveryType(deliveryType);
  };
  const handleDeliveryTime = (deliveryTime: string) => {
    console.log('deliveryTime', deliveryTime);
    setdeliveryTime(deliveryTime);
    getUicPrice(deliveryTime);
  };

  const applyPromo = (code: any) => {
    console.log('code code code', code);
    selectedPromo(code);
  };

  const onclickapplypromo = (code: any) => {
    setpromoCode(code);
  };

  const selectedPromo = (code: string) => {
    let isValid = true;
    var delType = 'home_delivery';
    if (deliveryType == 'store') {
      delType = 'pickup_at_store';
    }
    var applyPromo = {
      promocodeName: code,
      payment_method: paymentMethod,
      shipping_price: paymentBreakDown.shipping_price,
      subTotalAmount: paymentBreakDown.subtotal,
      delivery_method: delType,
      appType: 'app',
      uic_number: uicDetails.uicCode,
    };
    postAuthReq('/order/get-promocode-discount', applyPromo)
      .then(data => {
        if (data.data.data.isValid) {
          uicPriceParams.promocodeDiscount = data.data.data.promocodeDiscount;
          console.log('promocode error', data.data.data);

          setUicPriceParams(uicPriceParams);
          getUicPrice(deliveryTime);
          setmodalShow(true);
          setpromoApplied(true);
        } else {
          isValid = false;
          setpromoError('__PLEASEENTER_VALID_PROMO_CODE__');
        }
      })
      .catch(err => {
        console.log('promocode error', err);
      });
  };

  const promoValidation = () => {
    let isValid = true;
    if (promoCode == '') {
      setpromoError('__PLEASEENTER_PROMO_CODE__');
      isValid = false;
    }
    // if (promoCode != activepromoCode) {
    //     isValid = false
    //     setpromoError("__PLEASEENTER_VALID_PROMO_CODE__")

    // }
    if (isValid) {
      applyPromo(promoCode);
    }
  };
  const removePromocode = () => {
    setpromoCode(''), setpromoApplied(false);
    uicPriceParams.promocodeDiscount = 0;
    setUicPriceParams(uicPriceParams);
    getUicPrice(deliveryTime);
  };

  const {t: translate} = useTranslation();

  const DeliveryOption = () => {
    return (
      <>
        {state == 0 ? (
          <View style={styles.content}>
            <TextTranslation
              text={'__DELIVERY_OPTION__'}
              style={[FontStyle.fontMedium16, {marginBottom: 8}]}
            />
            {deliveryType == 'home' ? (
              <View style={CommonStyle.flex_dirRow_alignCenter_justifySpbtw}>
                <Pressable
                  style={CommonStyle.flex_dirRow_alignCenter}
                  onPress={() => handleDeliveryTime('24')}>
                  <View style={styles.circle}>
                    {deliveryTime == '24' ? (
                      <View style={styles.checkedCircle} />
                    ) : null}
                  </View>
                  <View style={CommonStyle.flex_dirRow_alignCenter}>
                    <TextTranslation
                      text={'__24_HOURS__'}
                      style={[FontStyle.fontMedium16, {marginLeft: 8}]}
                    />
                    <Text
                      style={[
                        FontStyle.fontRegular16,
                        {color: 'rgba(126, 126, 126, 1)'},
                      ]}>
                      {' '}
                      (₹5 extra)
                    </Text>
                  </View>
                </Pressable>
                <Pressable
                  style={CommonStyle.flex_dirRow_alignCenter}
                  onPress={() => handleDeliveryTime('36')}>
                  <View style={styles.circle}>
                    {deliveryTime == '36' ? (
                      <View style={styles.checkedCircle} />
                    ) : null}
                  </View>
                  <View style={CommonStyle.flex_dirRow_alignCenter}>
                    <TextTranslation
                      text={'__36_HOURS__'}
                      style={[FontStyle.fontMedium16, {marginLeft: 8}]}
                    />
                    <Text
                      style={[
                        FontStyle.fontRegular16,
                        {color: 'rgba(126, 126, 126, 1)'},
                      ]}>
                      {' '}
                      (FREE)
                    </Text>
                  </View>
                </Pressable>
              </View>
            ) : deliveryType == 'store' ? (
              <View style={CommonStyle.flex_dirRow_alignCenter_justifySpbtw}>
                <View style={CommonStyle.flex_dirRow_alignCenter}>
                  <View
                    style={[
                      styles.circle,
                      {borderColor: ColorVariable.stroke},
                    ]}>
                    {deliveryTime == '24' ? (
                      <View
                        style={[
                          styles.checkedCircle,
                          {backgroundColor: ColorVariable.stroke},
                        ]}
                      />
                    ) : null}
                  </View>
                  <View style={CommonStyle.flex_dirRow_alignCenter}>
                    <TextTranslation
                      text={'__24_HOURS__'}
                      style={[
                        FontStyle.fontMedium16,
                        {marginLeft: 8, color: ColorVariable.stroke},
                      ]}
                    />
                    <Text
                      style={[
                        FontStyle.fontRegular16,
                        {color: ColorVariable.stroke},
                      ]}>
                      {' '}
                      (₹5 extra)
                    </Text>
                  </View>
                </View>
                <View style={CommonStyle.flex_dirRow_alignCenter}>
                  <View
                    style={[
                      styles.circle,
                      {borderColor: ColorVariable.stroke},
                    ]}>
                    {deliveryTime == '36' ? (
                      <View
                        style={[
                          styles.checkedCircle,
                          {backgroundColor: ColorVariable.stroke},
                        ]}
                      />
                    ) : null}
                  </View>
                  <View style={CommonStyle.flex_dirRow_alignCenter}>
                    <TextTranslation
                      text={'__36_HOURS__'}
                      style={[
                        FontStyle.fontMedium16,
                        {marginLeft: 8, color: ColorVariable.stroke},
                      ]}
                    />
                    <Text
                      style={[
                        FontStyle.fontRegular16,
                        {color: ColorVariable.stroke},
                      ]}>
                      {' '}
                      (FREE)
                    </Text>
                  </View>
                </View>
              </View>
            ) : null}
          </View>
        ) : (
          <View style={styles.content}>
            <TextTranslation
              text={'Your Delivery'}
              style={[FontStyle.fontMedium16, {marginBottom: 8}]}
            />
            <TextTranslation
              text={'__DELIVERY_POST__'}
              style={[FontStyle.fontRegular14]}
            />
            <View style={[CommonStyle.flex_dirRow_alignCenter, styles.address]}>
              <Image
                source={require('../../../asset/img/updatedImg/info.png')}
                style={{width: 20, height: 20, marginRight: 8}}
              />
              {currentLang == 2 ? (
                <Text style={FontStyle.fontRegular12}>
                  अधिक जानने के लिए, हमें
                  <Text
                    style={FontStyle.fontHeavy12}
                    onPress={onCallMobileNumber}>
                    88238 88238
                  </Text>{' '}
                  पर कॉल करें
                </Text>
              ) : (
                <Text style={FontStyle.fontRegular12}>
                  To know more, call us at{' '}
                  <Text
                    style={FontStyle.fontHeavy12}
                    onPress={onCallMobileNumber}>
                    88238 88238
                  </Text>
                </Text>
              )}
            </View>
          </View>
        )}
      </>
    );
  };

  const Address = () => {
    return (
      <View style={styles.content}>
        {state == 0 ? (
          <>
            <View style={CommonStyle.flex_dirRow_alignCenter_justifySpbtw}>
              <Pressable
                style={CommonStyle.flex_dirRow_alignCenter}
                onPress={() => handleDeliveryType('home')}>
                <View style={styles.circle}>
                  {deliveryType == 'home' ? (
                    <View style={styles.checkedCircle} />
                  ) : null}
                </View>
                <TextTranslation
                  text={'__HOME_DELIVERY__'}
                  style={[FontStyle.fontMedium16, {marginLeft: 8}]}
                />
              </Pressable>
              <Pressable
                style={CommonStyle.flex_dirRow_alignCenter}
                onPress={() => handleDeliveryType('store')}>
                <View style={styles.circle}>
                  {deliveryType == 'store' ? (
                    <View style={styles.checkedCircle} />
                  ) : null}
                </View>
                <TextTranslation
                  text={'__SUPERSTORE_PICK_UP__'}
                  style={[FontStyle.fontMedium16, {marginLeft: 8}]}
                />
              </Pressable>
            </View>
            {deliveryType == 'store' ? (
              <View style={styles.address}>
                <View>
                  <TextTranslation
                    text={'__ORDER_PICKUP_FROM__'}
                    style={[FontStyle.fontMedium16]}
                  />
                </View>
                <View>
                  <TextTranslation
                    style={[
                      FontStyle.fontRegular14,
                      {color: ColorVariable.gray, marginTop: 8},
                    ]}
                    text={'__BARWANI_ADDRESS__'}
                  />
                </View>
              </View>
            ) : deliveryType == 'home' ? (
              <View style={styles.address}>
                <View style={CommonStyle.flex_dirRow_alignCenter_justifySpbtw}>
                  <TextTranslation
                    text={'__ORDER_WILL_BE_DELIVERED_TO__'}
                    style={[FontStyle.fontMedium16]}
                  />
                  <TextTranslation
                    style={[
                      FontStyle.fontRegular14,
                      {textDecorationLine: 'underline'},
                    ]}
                    text={'__EDIT__'}
                    onPress={navigateToEditAddress}
                  />
                </View>
                <View>
                  <Text
                    style={[
                      FontStyle.fontRegular14,
                      {color: ColorVariable.gray, marginTop: 8},
                    ]}>
                    {localUserInfo.address}, {localUserInfo.districtname},
                    {localUserInfo.statename} {localUserInfo.user_pincode}
                  </Text>
                </View>
              </View>
            ) : null}
          </>
        ) : (
          <View style={{}}>
            <View style={CommonStyle.flex_dirRow_alignCenter_justifySpbtw}>
              <TextTranslation
                text={'__ORDER_WILL_BE_DELIVERED_TO__'}
                style={[FontStyle.fontMedium16]}
              />
              <TextTranslation
                style={[
                  FontStyle.fontRegular14,
                  {textDecorationLine: 'underline'},
                ]}
                text={'__EDIT__'}
                onPress={navigateToEditAddress}
              />
            </View>
            <View>
              <Text
                style={[
                  FontStyle.fontRegular14,
                  {color: ColorVariable.gray, marginTop: 8},
                ]}>
                {localUserInfo.address}, {localUserInfo.districtname},
                {localUserInfo.statename} {localUserInfo.user_pincode}
              </Text>
            </View>
          </View>
        )}
      </View>
    );
  };

  const BagItem = () => {
    return (
      <View style={styles.content}>
        <View style={CommonStyle.flex_dirRow_alignCenter_justifySpbtw}>
          <View style={CommonStyle.flex_dirRow_alignCenter}>
            {/* <Image
              source={require('../../../asset/img/updatedImg/CheckoutBag.png')}
              style={{ width: 32, height: 32 }}
            /> */}
            <BagBlack />
            <TextTranslation
              style={[FontStyle.fontHeavy16, {marginHorizontal: 8}]}
              text={'__BAG__'}
            />
            <Text
              style={[FontStyle.fontRegular16, {color: ColorVariable.gray}]}>
              ({paymentBreakDown.get_bags_count} {translate('__ITEM__')})
            </Text>
          </View>
          <Pressable onPress={() => setshowItem(!showItem)}>
            {showItem ? (
              <Image
                source={require('../../../asset/img/updatedImg/collapseDropdown.png')}
                style={{width: 32, height: 32}}
              />
            ) : (
              <Image
                source={require('../../../asset/img/updatedImg/CheckoutDropDown.png')}
                style={{width: 32, height: 32}}
              />
            )}
          </Pressable>
        </View>
        {showItem && showItem ? (
          <>
            {cartData.map((value: any, ind) => {
              return (
                <View style={{flexDirection: 'row', marginTop: 8}} key={ind}>
                  <View style={styles.imgView}>
                    <Image
                      source={{uri: value.image}}
                      style={{width: 120, height: 120, borderRadius: 6}}
                    />
                    <View style={styles.badge}>
                      <Text
                        style={[
                          FontStyle.fontMedium14,
                          {color: ColorVariable.white},
                        ]}>
                        x{value.quantity}
                      </Text>
                    </View>
                  </View>
                  <View style={{marginRight: 16, marginVertical: 10, flex: 1}}>
                    <Text style={[FontStyle.fontMedium14]} numberOfLines={2}>
                      {value.name}
                    </Text>
                    <Text style={[FontStyle.fontHeavy18, {marginTop: 12}]}>
                      ₹{value.uic_price}
                    </Text>
                  </View>
                </View>
              );
            })}
          </>
        ) : null}
      </View>
    );
  };
  return (
    <View style={{flex: 1, backgroundColor: ColorVariable.blueBlack}}>
      <ScrollView style={styles.main} keyboardShouldPersistTaps={'handled'}>
        <View style={{paddingHorizontal: 8}}>
          <View style={{paddingLeft: 12}}>
            <Pressable onPress={goBack}>
              <LeftBackIcon />
            </Pressable>
          </View>
          <View style={{marginTop: 20}}>
            <PaymentOption
              option={paymentMethod}
              paymentObj={paymentBreakDown}
              uicDetails={uicDetails}
            />
          </View>
          <Address />
          <DeliveryOption />
          <BagItem />
          {/* promo code section  */}
          <View style={styles.content}>
            <TextTranslation
              style={FontStyle.fontMedium16}
              text={'__PROMOCODE_OFFER__'}
            />
            {promoApplied === false ? (
              <View style={[{paddingTop: 8, flexDirection: 'row'}]}>
                <View style={{flex: 1}}>
                  <TextInputField
                    placeholder={translate('_PROMOCODE_')}
                    value={promoCode}
                    error={promoError}
                    onChangeText={val => setpromoCode(val)}
                    onSubmitEditingFunc={() => setpromoError('')}
                  />
                </View>
                <Pressable style={styles.promoBtn} onPress={promoValidation}>
                  <TextTranslation
                    style={[
                      FontStyle.fontHeavy16,
                      {color: ColorVariable.white},
                    ]}
                    text={'__APPLY__'}></TextTranslation>
                </Pressable>
              </View>
            ) : (
              <>
                <View style={[{paddingTop: 8, flexDirection: 'row'}]}>
                  <View style={styles.appliedCode}>
                    <Text style={FontStyle.fontMedium16}>{promoCode}</Text>
                    <Image
                      source={require('../../../asset/img/updatedImg/check_circle_green.png')}
                      style={{width: 24, height: 24}}
                    />
                  </View>
                  <Pressable
                    style={[
                      styles.promoBtn,
                      {backgroundColor: ColorVariable.errorRed},
                    ]}
                    onPress={removePromocode}>
                    <TextTranslation
                      style={[
                        FontStyle.fontHeavy16,
                        {color: ColorVariable.white},
                      ]}
                      text={'__REMOVE__'}
                    />
                  </Pressable>
                </View>
                <Text
                  style={[
                    FontStyle.fontMedium14,
                    {color: ColorVariable.farmkartGreen, marginTop: 8},
                  ]}>
                  Promo-code applied successfully
                </Text>
              </>
            )}
            <PromoCarosel
              selectCodeFromBanner={onclickapplypromo}
              addChngeFlag={addChngeFlag}
            />
          </View>
          {/* order proce break out */}
          <View
            style={{
              paddingHorizontal: 8,
              paddingVertical: 16,
              marginVertical: 8,
            }}>
            <TextTranslation
              text={'__TOTAL_AFTETR_DISCOUNTS__'}
              style={FontStyle.fontMedium16}
            />
            <View
              style={{
                marginTop: 16,
                borderBottomColor: ColorVariable.stroke,
                borderBottomWidth: 1,
              }}>
              <View
                style={[
                  CommonStyle.flex_dirRow_alignCenter_justifySpbtw,
                  {marginBottom: 9},
                ]}>
                <TextTranslation
                  style={[FontStyle.fontMedium16, {color: ColorVariable.gray}]}
                  text={'__PRICE__'}>
                  {' '}
                  <Text
                    style={[
                      FontStyle.fontRegular16,
                      {color: ColorVariable.gray},
                    ]}>
                    (incl. taxes)
                  </Text>
                </TextTranslation>
                <Text style={[FontStyle.fontMedium16]}>
                  ₹{paymentBreakDown.order_total}
                </Text>
              </View>
              <View
                style={[
                  CommonStyle.flex_dirRow_alignCenter_justifySpbtw,
                  {marginBottom: 9},
                ]}>
                <TextTranslation
                  style={[
                    FontStyle.fontMedium16,
                    {color: ColorVariable.farmkartGreen},
                  ]}
                  text={'__UIC_CHECKOUT_DISCOUNT__'}
                />
                <Text
                  style={[
                    FontStyle.fontMedium16,
                    {color: ColorVariable.farmkartGreen},
                  ]}>
                  ₹{paymentBreakDown.uic_checkout_discount}
                </Text>
              </View>
              <View
                style={[
                  CommonStyle.flex_dirRow_alignCenter_justifySpbtw,
                  {marginBottom: 9},
                ]}>
                <TextTranslation
                  style={[
                    FontStyle.fontMedium16,
                    {color: ColorVariable.farmkartGreen},
                  ]}
                  text={'__EXTRA_CHECKOUT_DISCOUNT__'}
                />
                <Text
                  style={[
                    FontStyle.fontMedium16,
                    {color: ColorVariable.farmkartGreen},
                  ]}>
                  -₹{paymentBreakDown.extra__checkout_discount}
                </Text>
              </View>
              <View
                style={[
                  CommonStyle.flex_dirRow_alignCenter_justifySpbtw,
                  {marginBottom: 9},
                ]}>
                <TextTranslation
                  style={[
                    FontStyle.fontMedium16,
                    {color: ColorVariable.farmkartGreen},
                  ]}
                  text={'_PROMOCODE_DISCOUNT_'}
                />
                <Text
                  style={[
                    FontStyle.fontMedium16,
                    {color: ColorVariable.farmkartGreen},
                  ]}>
                  -₹{paymentBreakDown.promoCodeDiscount}
                </Text>
              </View>
              <View
                style={[
                  CommonStyle.flex_dirRow_alignCenter_justifySpbtw,
                  {marginBottom: 9},
                ]}>
                <TextTranslation
                  style={[FontStyle.fontMedium16, {color: ColorVariable.gray}]}
                  text={'__SHIPPING__'}
                />
                <Text style={[FontStyle.fontMedium16]}>
                  ₹{paymentBreakDown.shipping_price}
                </Text>
              </View>
            </View>
            <View
              style={{
                marginTop: 8,
                borderBottomColor: ColorVariable.stroke,
                borderBottomWidth: 1,
              }}>
              <View
                style={[
                  CommonStyle.flex_dirRow_alignCenter_justifySpbtw,
                  {marginBottom: 9},
                ]}>
                <TextTranslation
                  style={[FontStyle.fontHeavy16]}
                  text={'__SUB_TOTAL__'}
                />
                <Text style={[FontStyle.fontHeavy16]}>
                  ₹{paymentBreakDown.subtotal}
                </Text>
              </View>
              <View
                style={[
                  CommonStyle.flex_dirRow_alignCenter_justifySpbtw,
                  {marginBottom: 9},
                ]}>
                <TextTranslation
                  style={[FontStyle.fontMedium16, {color: ColorVariable.gray}]}
                  text={'__UIC_BALANCE_DEDUCTED__'}
                />
                <Text style={[FontStyle.fontMedium16]}>
                  ₹{paymentBreakDown.uic_deduct_amount}
                </Text>
              </View>
            </View>
            <View style={{alignItems:"flex-end",paddingTop:8}}><Text style={[FontStyle.fontMedium24,{textAlign:"right"}]}>- ₹{paymentBreakDown.total_price} </Text></View>
          </View>

          {isSliderShow==true && paymentMethod == 'uic' && isSliderShowRenewUic==true ? (
            <View
              style={[
                CommonStyle.flex_dirRow_alignCenter_justifySpbtw,
                styles.UIC,
              ]}>
              <View style={[CommonStyle.flex_dirRow_alignCenter, {flex: 1}]}>
                <Image
                  source={require('../../../asset/img/updatedImg/UICcard.png')}
                  style={{width: 66, height: 40, marginRight: 16}}
                />
                <TextTranslation 
                  style={[FontStyle.fontMedium16,{width:'90%'}]}
                  text={'__CURRENT_UIC_BALANCE__'}
                />
              </View>
              <View style={{alignItems:'flex-end'}}>
                <Text style={FontStyle.fontHeavy16}>
                  {paymentBreakDown.current_uic_balance}
                </Text>
              </View>
            </View>
          ) : null}

{isSliderShow==false || isSliderShowRenewUic== false  ? (
            <View
            style={{paddingHorizontal: 8, paddingTop: 16}}>
            <View
              style={[{flexDirection: 'row', marginBottom: 32}, styles.UIC]}>
              <Image
                source={require('../../../asset/img/updatedImg/info.png')}
                style={{width: 20, height: 20, marginRight: 8}}
              />
              <View style={{flex: 1}}>
                
                <TextTranslation
                  style={[FontStyle.fontMedium12,{textAlign:'left'}]}
                  text={'__UIC_REGISTRATION_REQUIRED__'}
                />
                <Pressable onPress={redirectToUic}>
                <Text
                  style={{textDecorationLine:'underline',textDecorationStyle: 'solid',textAlign:'right',fontSize:12,fontWeight:'800',fontFamily:'Avenir',color:'#242734'}}
                 
                >{translate('__LEARN_MORE_ABOUT_UIC__')}
                </Text>
                </Pressable>
              </View>
            </View>
            
          </View>
          ) : null}
        </View>
        {((paymentBreakDown.subtotal == paymentBreakDown?.uic_deduct_amount && paymentMethod == 'uic') ||
            partialPaymentMode ||
            paymentMethod != 'uic') && isSliderShow==true && isSliderShowRenewUic==true ? (
        <View style={styles.fotter}>
          <View
            style={[
              CommonStyle.flex_dirRow_justifySpbtw,
              {paddingHorizontal: 16, alignItems: 'flex-end'},
            ]}>
            <View style={CommonStyle.flex_dirRow_alignCenter}>
              <TextTranslation
                style={[FontStyle.fontMedium14, {color: ColorVariable.white}]}
                text={'__TOTAL_SAVINGS__'}
              />
              <Text
                style={[FontStyle.fontMedium14, {color: ColorVariable.white}]}>
                {' '}
                ₹{paymentBreakDown.total_saving}
              </Text>
            </View>
            <View style={CommonStyle.flex_dirRow_alignCenter}>
              <TextTranslation
                style={[FontStyle.fontHeavy18, {color: ColorVariable.white}]}
                text={'__YOU_PAY__'}
              />
              <Text
                style={[FontStyle.fontHeavy18, {color: ColorVariable.white}]}>
                {' '}
                ₹{paymentBreakDown.total_price}
              </Text>
            </View>
          </View>
      
           {!isloading? <View style={{ paddingTop: 16, paddingHorizontal: 24 }}>
              <SwipeButton
                navigateToOrderSucess={() =>
                  navigateToOrderSucess({
                    promoCode: promoCode,
                    promocodediscount: paymentBreakDown.promoCodeDiscount,
                    partialPaymentMode: partialPaymentMode,
                    deliveryTime: deliveryTime,
                    paymentMethod:paymentMethod
                  })
                }
                title="__SLIDE_RIGHT_TO_CHECKOUT__"
                img="bag"
              />
            </View>:<View style={styles.switchBtn}>
                  <ActivityIndicator color={'green'} size={'large'} />
                </View>}
          
        </View>
        ) : null}
        {(partialPaymentMode == undefined &&  paymentMethod == 'uic' && paymentBreakDown.subtotal != paymentBreakDown?.uic_deduct_amount) && isSliderShow==true && isSliderShowRenewUic==true ? (
          <View
            style={{paddingHorizontal: 8, paddingBottom: 46, paddingTop: 16}}>
            <View
              style={[{flexDirection: 'row', marginBottom: 32}, styles.UIC]}>
              <Image
                source={require('../../../asset/img/updatedImg/info.png')}
                style={{width: 20, height: 20, marginRight: 8}}
              />
              <View style={{flex: 1}}>
                <TextTranslation
                  style={[FontStyle.fontMedium12]}
                  text={'__UIC_BALANCE_LOW__'}
                />
              </View>
            </View>
            <Button
              title="__PAYMENT_OPTION__"
              bgGreen
              fontSize={16}
              onPress={partialPaymentmodalClose}
            />
          </View>
        ) : null}




        {/* when uic not registered or expired */}
        {isSliderShow==false?
          <View style={[styles.fotter,{marginTop:0}]}>
          <View
            style={[
              CommonStyle.flex_dirRow_justifySpbtw,
              {paddingHorizontal: 16, alignItems: 'flex-end'},
            ]}>
            <View style={CommonStyle.flex_dirRow_alignCenter}>
              <TextTranslation
                style={[FontStyle.fontMedium14, {color: ColorVariable.white}]}
                text={'__TOTAL_SAVINGS__'}
              />
              <Text
                style={[FontStyle.fontMedium14, {color: ColorVariable.white}]}>
                {' '}
                ₹{paymentBreakDown.total_saving}
              </Text>
            </View>
            <View style={CommonStyle.flex_dirRow_alignCenter}>
              <TextTranslation
                style={[FontStyle.fontHeavy18, {color: ColorVariable.white}]}
                text={'__YOU_PAY__'}
              />
              <Text
                style={[FontStyle.fontHeavy18, {color: ColorVariable.white}]}>
                {' '}
                ₹{paymentBreakDown.total_price}
              </Text>
            </View>
          </View>
          <View style={{ paddingVertical: 24, paddingHorizontal: 16 }}>

         
          <Button
            title={translate('__REGISTER_UIC_FOR_FREE__')}
            fontSize={16}
            bgGreen
             onPress={navigationToUic}
          />
        </View>
          
        </View>

        :null}




{/* when uic not registered or expired */}
{isSliderShowRenewUic==false && isSliderShow==true?
          <View style={[styles.fotter,{marginTop:0}]}>
          <View
            style={[
              CommonStyle.flex_dirRow_justifySpbtw,
              {paddingHorizontal: 16, alignItems: 'flex-end'},
            ]}>
            <View style={CommonStyle.flex_dirRow_alignCenter}>
              <TextTranslation
                style={[FontStyle.fontMedium14, {color: ColorVariable.white}]}
                text={'__TOTAL_SAVINGS__'}
              />
              <Text
                style={[FontStyle.fontMedium14, {color: ColorVariable.white}]}>
                {' '}
                ₹{paymentBreakDown.total_saving}
              </Text>
            </View>
            <View style={CommonStyle.flex_dirRow_alignCenter}>
              <TextTranslation
                style={[FontStyle.fontHeavy18, {color: ColorVariable.white}]}
                text={'__YOU_PAY__'}
              />
              <Text
                style={[FontStyle.fontHeavy18, {color: ColorVariable.white}]}>
                {' '}
                ₹{paymentBreakDown.total_price}
              </Text>
            </View>
          </View>
          <View style={{ paddingVertical: 24, paddingHorizontal: 16 }}>

          <Button
          title={translate('__RENEW_UIC')}
          // title='Renew UIC'
          fontSize={16}
          bgGreen
           onPress={navigationToUICRenew}
        />
        </View>
          
        </View>

        :null}


        

        
      </ScrollView>
      <CustomModal
        visible={modalShow}
        onClose={modalClose}
        firstText={`${promoCode} Applied!`}
        secondText={`You saved ${uicPriceParams.promocodeDiscount} for this order`}
      />
    </View>
  );
};

export default CheckOutScreenRender;
