import { StyleSheet, Text, View, Image, Platform, Linking, Pressable } from 'react-native';
import React from 'react';
import {
  ColorVariable,
  CommonStyle,
  commanRadius,
} from '../../../asset/style/commonStyle';
import { FontStyle } from '../../../asset/style/FontsStyle';
import TextTranslation from '../../commonResources/component/CommonInput/TextTranslation';
import { useTranslation } from 'react-i18next';
import FastImage from 'react-native-fast-image';

const CurrentOrder = ({ currentOrder,openAndCloseReviewModal,shippingData }: any) => {
  const openCallPopup = () => {
    let phoneNumber = '';
    if (Platform.OS === 'android') {
      phoneNumber = `tel:${8823888238}`;
    } else {
      phoneNumber = `telprompt:${8823888238}`;
    }

    Linking.openURL(phoneNumber);
  };
  const { t } = useTranslation();
  const Tracker = (status: any,isPaymentLinkSent:any) => {
    return (
      <View style={[styles.bottomBorder]}>
        <View
          style={[
            CommonStyle.flex_dirRow_alignCenter,
            { justifyContent: 'center' },
          ]}>
          {status == 'order_placed' ||
            status == 'processed' ||
            status == 'intransit' ? (
            <>
              <Image
                source={require('../../../asset/img/updatedImg/check_circle_green.png')}
                style={{ width: 24, height: 24 }}
              />
              <View
                style={[
                  styles.line,
                  { backgroundColor: ColorVariable.farmkartGreen },
                ]}
              />
            </>
          ) : (
            <>
              <View style={styles.circle} />
              <View
                style={[styles.line, { backgroundColor: ColorVariable.stroke }]}
              />
            </>
          )}

          {status == 'processed' ||
            status == 'intransit' ||
            status == 'processed' ? (
            <>
              <Image
                source={require('../../../asset/img/updatedImg/check_circle_green.png')}
                style={{ width: 24, height: 24 }}
              />
              <View
                style={[
                  styles.line,
                  { backgroundColor: ColorVariable.farmkartGreen },
                ]}
              />
            </>
          ) : (
            <>
              <View style={styles.circle} />
              <View
                style={[styles.line, { backgroundColor: ColorVariable.stroke }]}
              />
            </>
          )}

          {status == 'intransit' ? (
            <>
              <Image
                source={require('../../../asset/img/updatedImg/check_circle_green.png')}
                style={{ width: 24, height: 24 }}
              />
              <View
                style={[
                  styles.line,
                  { backgroundColor: ColorVariable.farmkartGreen },
                ]}
              />
            </>
          ) : (
            <>
              <View style={styles.circle} />
              <View
                style={[styles.line, { backgroundColor: ColorVariable.stroke }]}
              />
            </>
          )}

          <View style={styles.circle} />
        </View>
        <View
          style={[
            CommonStyle.flex_dirRow_alignCenter,
            { justifyContent: 'center', marginTop: 6 },
          ]}>
          <View style={styles.prgressHeading}>
            <TextTranslation
              style={[{marginRight:-40},
                status == 'Pending'
                  ? FontStyle.fontHeavy12
                  : FontStyle.fontRegular12]
                  
              }
              text={'__ORDER_PLACED__'}
            />
          </View>
          <View style={styles.prgressHeading}>
            <TextTranslation
              style={[{marginRight:-30},
                status == 'Order Processing' || status == 'Order Confirmed'
                  ? FontStyle.fontHeavy12
                  : FontStyle.fontRegular12,
              ]}
              text={'__PROCESSED__'}
            />
          </View>
          <View style={styles.prgressHeading}>
            <TextTranslation
              style={[
                status == 'Out for delivery'
                  ? FontStyle.fontHeavy12
                  : FontStyle.fontRegular12,{marginLeft:16}
              ]}
              text={'__INTRANSIST__'}
            />
          </View>
          <View style={styles.prgressHeading}>
            <TextTranslation
              style={[FontStyle.fontRegular12,{marginRight:13}]}
              text={'__ARRIVING__'}
            />
          </View>
        </View>

        {(status == 'order_placed' ||
              status == 'processed') && isPaymentLinkSent=='N' ? (
              <View style={{marginTop:8}}>
                <TextTranslation style={{ color: '#242834', lineHeight: 18, fontFamily: 'Avenir Medium', fontStyle: 'normal', letterSpacing: 0.5,fontSize:12,fontWeight:'400' }} text={'Your_order_has_been_confirmed_We_will_soon_share_the_tracking_details_with_you'}>
                </TextTranslation>
              </View>


            ) :null}
      </View>
    );
  };
  console.log("========order current======", currentOrder)

  return (
    <>
      {currentOrder?.map((item: any, index: any) => {
        return (
          <View key={index} style={styles.view}>
            {Tracker(item?.process_status,item?.isPaymentLinkSent)}
            {/* {item?.process_status == 'order_placed' ||
              item?.process_status == 'processed' ? (
              <View>
                <TextTranslation style={{ color: '#242834', lineHeight: 18, fontFamily: 'Avenir Medium', fontStyle: 'normal', letterSpacing: 0.5,fontSize:12,fontWeight:'400' }} text={'Your_order_has_been_confirmed_We_will_soon_share_the_tracking_details_with_you'}>
                </TextTranslation>
              </View>


            ) :null} */}
            {(item?.process_status == 'intransit'|| item?.process_status == 'Intransit') && shippingData && item?.isPaymentLinkSent=='N' ? (
              <View style={{ flexDirection: 'column' }}>
                <View style={{ flexDirection: 'row', gap: 8 }}>
                  <TextTranslation style={{ fontFamily: 'Avenir', fontWeight: '400', lineHeight: 24, letterSpacing: 0.5, color: '#242834' }} text={'_Courier_'}></TextTranslation>
                  <Text style={{ fontFamily: 'Avenir', fontWeight: '800', lineHeight: 24, letterSpacing: 0.5, color: '#242834' }}>{shippingData?.courier_name}</Text>
                </View>
                <View style={{ flexDirection: 'row', gap: 8 }}>
                  <TextTranslation style={{ fontFamily: 'Avenir', fontWeight: '400', lineHeight: 24, letterSpacing: 0.5, color: '#242834' }} text={'_Tracking_number_'}></TextTranslation>
                  <Text style={{ fontFamily: 'Avenir', fontWeight: '800', lineHeight: 24, letterSpacing: 0.5, color: '#242834' }}>{shippingData?.tracking_number}</Text>
                </View>
                <View style={{alignItems:'center',marginTop:8}}>
                  <View style={{ height: 34, justifyContent: 'center', alignItems: 'center', gap: 4, alignSelf: 'stretch', borderRadius: 4, borderWidth: 1, borderStyle: 'solid', borderColor: '#242734',width:'98%',paddingLeft:8,paddingRight:8}}>
                  <Pressable onPress={() =>Linking.openURL(shippingData?.tracking_url)}>
                    <TextTranslation  style={{color:'#242734',fontFamily: 'Avenir Medium',fontWeight:'500',lineHeight:22,fontSize:12}} text={'TRACK_MY_SHIPMENT'}>
                      
                    </TextTranslation>
                    </Pressable>

                  </View>
                </View>
              </View>
              ):null}

{/* {1==1? (
              <View style={{ flexDirection: 'column' }}>
              <View>
                <TextTranslation style={{ color: '#242834', lineHeight: 18, fontFamily: 'Avenir Medium', fontStyle: 'normal', letterSpacing: 0.5 }} text={'Your_order_has_been_successfully_delivered'}>
                </TextTranslation>
              </View>
                <View style={{alignItems:'center',marginTop:8}}>
                  <View style={{ height: 34, justifyContent: 'center', alignItems: 'center', gap: 4, alignSelf: 'stretch', borderRadius: 4, borderWidth: 1, borderStyle: 'solid', borderColor: '#242734',width:'98%',paddingLeft:8,paddingRight:8}}>
                    <Pressable onPress={() => openAndCloseReviewModal(item.orderproductid)}>
                    <Text style={{color:'#242734',fontFamily: 'Avenir Medium',fontWeight:'500',lineHeight:22,fontSize:12}}>
                      RATE THIS PRODUCT
                    </Text>
                    </Pressable>
                  </View>
                </View>
              </View>
              ):null} */}



            <View>
              {item.products.map((ele: any, inde: any) => {
                return (
                  <View
                    style={[styles.bottomBorder, { flexDirection: 'row' }]}
                    key={inde}>
                    <View style={styles.imgView}>
                      <FastImage
                        resizeMode="contain"
                        source={{ uri: ele.image }}
                        style={{ width: 120, height: 120, borderRadius: 6 }}
                      />
                      <View
                        style={[
                          styles.badge,
                          CommonStyle.alignCenter_justifyCenter,
                        ]}>
                        <Text
                          style={[
                            FontStyle.fontMedium14,
                            { color: ColorVariable.white },
                          ]}>
                          x{ele.quantity}
                        </Text>
                      </View>
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={FontStyle.fontMedium14} numberOfLines={2}>
                        {ele.name}
                      </Text>
                      <Text style={[FontStyle.fontHeavy18, { marginTop: 12 }]}>
                        ₹{ele.total_product_price}
                      </Text>
                    </View>
                  </View>
                );
              })}
              <View
                style={[
                  styles.bottomBorder,
                  { flexDirection: "row" },
                ]}>
                <View style={{ alignItems: 'center', flex: 0.4 }}>
                  <TextTranslation
                    style={FontStyle.fontRegular12}
                    text={'__ORDER_PLACED_ON__'}
                  />
                  <Text style={FontStyle.fontHeavy16}>
                    {item.order_placed_date}
                  </Text>
                </View>
                <View style={{ alignItems: 'center', flex: 0.2 }}>
                  <TextTranslation
                    style={FontStyle.fontRegular12}
                    text={'__ORDER_NUMBER__'}
                  />
                  <Text style={FontStyle.fontHeavy16}>{item.orderid}</Text>
                </View>
                <View style={{ alignItems: 'center', flex: 0.4, paddingLeft: 4 }}>
                  <TextTranslation
                    style={FontStyle.fontRegular12}
                    text={'__ORDER_STATUS__'}
                  />
                  <Text style={[FontStyle.fontHeavy16, { textAlign: "center" }]} >{item.orderstatus}</Text>
                </View>
              </View>
              <View style={[CommonStyle.flex_dirRow_alignCenter, { padding: 8 }]}>
                <Image
                  source={require('../../../asset/img/updatedImg/info.png')}
                  style={{ width: 20, height: 20, marginRight: 18 }}
                />
                <View style={{ flex: 1 }}>
                  <Text style={FontStyle.fontRegular12}>
                    {t('__CANCEL_ORDER__')} {t('__PLEASE_CALL_US__')}
                    {'   '}
                    <Text style={{ fontWeight: '800' }} onPress={openCallPopup}>
                      88238 88238
                    </Text>
                  </Text>
                </View>
              </View>
            </View>
          </View>
        );
      })}
    </>
  );
};

export default React.memo(CurrentOrder);

const styles = StyleSheet.create({
  view: {
    borderRadius: 6,
    marginHorizontal: 8,
    marginTop: 8,
    backgroundColor: ColorVariable.white,
    elevation: 5,
    padding: 8,
  },
  line: {
    borderRadius: 4,

    width: 60,
    height: 4,
    marginHorizontal: 3,
  },
  circle: {
    width: 22,
    height: 22,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: ColorVariable.stroke,
  },
  bottomBorder: {
    paddingTop: 8,
    borderBottomColor: ColorVariable.stroke,
    borderBottomWidth: 1,
    // paddingHorizontal: 8,
    paddingBottom: 16,
    marginBottom: 8,
  },
  imgView: {
    borderRadius: commanRadius.radi6,
    borderWidth: 0.5,
    padding: 1,
    borderColor: ColorVariable.stroke,
    marginRight: 10,
  },
  badge: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: ColorVariable.blueBlack,
    position: 'absolute',
    right: -6,
    bottom: -6,
  },
  prgressHeading: {
    alignItems: 'center',
    width: '25%',
    marginRight: 15,
  },
});
