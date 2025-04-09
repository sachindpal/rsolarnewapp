import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import {
  ColorVariable,
  CommonStyle,
  commanRadius,
} from '../../../asset/style/commonStyle';
import {FontStyle} from '../../../asset/style/FontsStyle';
import {Invoice, OrderHistory, Repeat, StarBlack} from '../../../asset/img';
import TextTranslation from '../../commonResources/component/CommonInput/TextTranslation';
import FastImage from 'react-native-fast-image';

const OrderHistoryView = ({
  openAndCloseInvoiceModal,
  openAndCloseReviewModal,
  reorder,
  orderHistory,
  isloadingPage,
}: any) => {
  console.log("=======================orderHistory==============",orderHistory)
  return (
    <>
      <View
        style={[
          CommonStyle.flex_dirRow_alignCenter,
          {marginLeft: 8, marginTop: 24, marginBottom: 8},
        ]}>
        <OrderHistory />
        <TextTranslation
          style={[FontStyle.fontHeavy18, {marginLeft: 8}]}
          text={'__ORDER_HISTORY__'}
        />
      </View>
      {orderHistory?.map((item: any, index: any) => {
        return (
          <View key={index} style={styles.view}>
            {item.products.map((ele: any, inde: any) => {
              return (
                <View
                  style={[styles.bottomBorder, {flexDirection: 'row'}]}
                  key={inde}>
                  <View style={styles.imgView}>
                    <FastImage
                    resizeMode="contain"
                      source={{uri: ele.image}}
                      style={{width: 120, height: 120, borderRadius: 6}}
                    />
                    <View
                      style={[
                        styles.badge,
                        CommonStyle.alignCenter_justifyCenter,
                      ]}>
                      <Text
                        style={[
                          FontStyle.fontMedium14,
                          {color: ColorVariable.white},
                        ]}>
                        x{ele.quantity}
                      </Text>
                    </View>
                  </View>
                  <View style={{flex: 1}}>
                    <Text style={FontStyle.fontMedium14} numberOfLines={2}>
                      {ele.name}
                    </Text>
                    <Text style={[FontStyle.fontHeavy18, {marginTop: 12}]}>
                      ₹{ele.total_product_price}
                    </Text>
                    <View
                      style={[
                        {paddingTop: 12},
                        CommonStyle.flex_dirRow_alignCenter,
                      ]}>
                        {ele.review_status===true?
                      <Pressable
                        onPress={() => openAndCloseReviewModal(ele.productid)}
                        style={[
                          CommonStyle.flex_dirRow_alignCenter,
                          styles.rate,
                        ]}>
                        <StarBlack />
                        <TextTranslation
                          style={[FontStyle.fontMedium12, {lineHeight: 22}]}
                          text={'__RATE__'}
                        />
                      </Pressable>:null}
                      <Pressable
                        onPress={() =>
                          reorder(
                            ele.productid,
                            ele.name,
                            ele.price,
                            ele.uic_price,
                            ele.image,
                            ele.uicdiscount
                          )
                        }
                        style={[
                          CommonStyle.flex_dirRow_alignCenter,
                          styles.repeat,
                        ]}>
                        <Repeat />
                        <TextTranslation
                          style={[
                            FontStyle.fontMedium12,
                            {lineHeight: 22, color: 'white'},
                          ]}
                          text={'__BUY_IT_AGAIN__'}
                        />
                      </Pressable>
                    </View>
                  </View>
                </View>
              );
            })}
            <View
              style={[
                styles.bottomBorder,
                CommonStyle.flex_dirRow_alignCenter_justifySpbtw,
              ]}>
              <View style={{alignItems: 'center'}}>
                <TextTranslation
                  style={FontStyle.fontRegular12}
                  text={'__ORDER_PLACED_ON__'}
                />
                <Text style={FontStyle.fontHeavy16}>
                  {item.order_placed_date}
                </Text>
              </View>
              <View style={{alignItems: 'center'}}>
                <TextTranslation
                  style={FontStyle.fontRegular12}
                  text={'__ORDER_NUMBER__'}
                />
                <Text style={FontStyle.fontHeavy16}>{item.orderid}</Text>
              </View>
              <View style={{alignItems: 'center'}}>
                <TextTranslation
                  style={FontStyle.fontRegular12}
                  text={'__ORDER_STATUS__'}
                />
                <Text style={FontStyle.fontHeavy16}>{item.orderstatus}</Text>
              </View>
            </View>
            <View style={{alignItems: 'center'}}>
              <Pressable
                onPress={() => openAndCloseInvoiceModal(item.orderid,item.orderstatus)}
                style={[
                  CommonStyle.flex_dirRow_alignCenter,
                  {
                    paddingVertical: 8,
                  },
                ]}>
                <Invoice />
                <TextTranslation
                  style={[FontStyle.fontHeavy16, {marginLeft: 8}]}
                  text={'__VIEW_INVOICE__'}
                />
              </Pressable>
            </View>
          </View>
        );
      })}
      {isloadingPage ? (
        <View
          style={[
            {width: '100%'},
            CommonStyle.alignCenter_justifyCenter,
          ]}>
          <ActivityIndicator
            size={'small'}
            color={ColorVariable.farmkartGreen}
          />
        </View>
      ) : null}
    </>
  );
};

export default React.memo(OrderHistoryView);

const styles = StyleSheet.create({
  view: {
    borderRadius: 6,
    marginHorizontal: 8,
    marginBottom: 0,
    marginTop: 8,
    backgroundColor: ColorVariable.white,
    elevation: 5,
    padding: 8,
  },
  rate: {
    borderRadius: commanRadius.radi4,
    borderColor: ColorVariable.blueBlack,
    borderWidth: 1,
    overflow: 'hidden',
    height: 30,
    alignItems: 'center',
    paddingHorizontal: 8,
    justifyContent: 'center',
  },
  repeat: {
    borderRadius: commanRadius.radi4,
    backgroundColor: ColorVariable.farmkartGreen,
    overflow: 'hidden',
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
    marginLeft: 12,
  },
  imgView: {
    borderRadius: commanRadius.radi6,
    borderWidth: 0.5,
    borderColor: ColorVariable.stroke,
    marginRight: 10,
    padding: 1,
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
  bottomBorder: {
    borderBottomColor: ColorVariable.stroke,
    borderBottomWidth: 1,
    paddingHorizontal: 8,
    paddingTop: 8,
    paddingBottom: 16,
    marginBottom: 8,
  },
});
