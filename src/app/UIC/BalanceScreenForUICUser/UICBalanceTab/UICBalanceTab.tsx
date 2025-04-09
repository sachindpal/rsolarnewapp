import {
  FlatList,
  Image,
  NativeScrollEvent,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, { useState } from 'react';
import { FontStyle } from '../../../../asset/style/FontsStyle';
import {
  ColorVariable,
  CommonStyle,
  commanRadius,
} from '../../../../asset/style/commonStyle';
import GradientBackgroundRect from '../../../commonResources/component/GradientBackground/GradientBackgroundRect';
import TextTranslation from '../../../commonResources/component/CommonInput/TextTranslation';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import FastImage from 'react-native-fast-image';
import { getAuthReq, postAuthReq } from '../../../Service/APIServices/axoisService';
import { Percentile } from '../../../../asset/img';


interface DataTypes {
  userStatus: string;
  UICDetails: any;
}

const UICBalanceTab = ({
  userStatus,
  UICDetails,
}: DataTypes) => {
  const navigation = useNavigation<any>();
  const { t: translate } = useTranslation();
  const [activeTab, setactiveTab] = useState('transcation');
  const [History, setHistory] = useState<any>([]);
  const [offset, setoffset] = useState(1);
  const [totalUicSaving, setTotalUicSaving] = useState(0);

  const [transcationHistory, settranscationHistory] = useState<any>([]);
  const [transcationoffset, settranscationoffset] = useState(1);

  React.useEffect(() => {
    gettransactionHistory(transcationoffset);
    getrechargeHistory(offset);
    getTotalUicDiscount()
  }, []);

  const getrechargeHistory = (offsetValue: any) => {
    getAuthReq(`/uic/get-recharge?offset=${offsetValue}`)
      .then(res => {
        setHistory((prev: any) => {
          return [...prev, ...res.data.data.transaction_history]
        })
      })
      .catch(error => {
        console.log('get-recharge error=============>', error);
      });
  };

  // get trancastation

  const gettransactionHistory = (offsetValue: any) => {
    console.log('===========transcation= offset===', offsetValue);
    getAuthReq(`/uic/get-transactions?offset=${offsetValue}&limit=6`)
      .then(res => {
        settranscationHistory((prev: any) => {
          return [...prev, ...res.data.data.transaction_history]
        })
        console.log('===========transcation====', res.data.data.transaction_history);
      })
      .catch(error => {
        console.log('get-transactions error=============>', error);
      });
  };


  const getTotalUicDiscount = () => {
    postAuthReq(`/order/get-total-uic-discount`,{})
      .then(res => {
        
        console.log('===========totalUicDiscount====', res.data.data?.orderTotalSavingData);
        if(res.data.data?.orderTotalSavingData.length > 0 && res.data.data?.orderTotalSavingData[0].uicSavingTotal){
          
          setTotalUicSaving(res.data.data?.orderTotalSavingData[0].uicSavingTotal)
        }else{
          setTotalUicSaving(0)
        }
      })
      .catch(error => {
        console.log('get-transactions error=============>', error);
      });
  };
  const tabSelection = (val: string) => {
    setactiveTab(val);
  };
  const navigationToTerms = () => {
    navigation.navigate('UICTermsAndCondition');
  };

  const navigationToRechargeUIC = () => {
    navigation.navigate('global', { screen: 'RechargeUIC' });
  };

  const UicCard = () => {
    return (
      <GradientBackgroundRect
        from={'rgba(115, 190, 68, 1)'}
        to={'rgba(62, 142, 33, 1)'}>
        <View
          style={{
            padding: 18,
            marginBottom: 16,
          }}>
          <View style={CommonStyle.flex_dirRow_justifySpbtw}>
            <View>
              <TextTranslation
                style={[FontStyle.fontMedium14, { color: ColorVariable.white }]}
                text={'__URUIC_BALANCE__'}
              />

              <Text
                style={[
                  FontStyle.fontMedium14,
                  { color: ColorVariable.white, fontSize: 38, lineHeight: 60 },
                ]}>
                ₹ {UICDetails?.transaction[0]?.uicamount}
              </Text>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              <FastImage
                source={require('../../../../asset/img/updatedImg/UICcard.png')}
                style={{ width: 80, height: 50, marginBottom: 6 }}
              />
              <Text
                style={[FontStyle.fontMedium14, { color: ColorVariable.white }]}>
                *** *** {UICDetails?.transaction[0]?.uiccode.slice(9, 13)}
              </Text>
            </View>
          </View>
          <View
            style={[
              CommonStyle.flex_dirRow_alignCenter_justifySpbtw,
              styles.cardFooter,
            ]}>
            <Text
              style={[
                FontStyle.fontHeavy15,
                { color: ColorVariable.white, textDecorationLine: 'underline' },
              ]}
              onPress={navigationToTerms}>
              UIC T&C
            </Text>
            <Pressable style={styles.btn} onPress={navigationToRechargeUIC}>
              <TextTranslation
                style={[FontStyle.fontHeavy15, { color: ColorVariable.white }]}
                text={'__RECHARGE_UIC__'}
              />
            </Pressable>
          </View>
        </View>
      </GradientBackgroundRect>
    );
  };
  const UicGoldCard = () => {
    return (
      <GradientBackgroundRect
        from={'rgba(69, 67, 67, 1)'}
        to={'rgba(20, 19, 19, 1)'}>
        <View
          style={{
            padding: 18,
            marginBottom: 16,
          }}>
          <View style={CommonStyle.flex_dirRow_justifySpbtw}>
            <View>
              <TextTranslation
                style={[FontStyle.fontMedium14, { color: ColorVariable.white }]}
                text={'__URUIC_BALANCE__'}
              />
              <Text
                style={[
                  FontStyle.fontMedium14,
                  { color: ColorVariable.white, fontSize: 38, lineHeight: 60 },
                ]}>
                ₹ {UICDetails?.transaction[0]?.uicamount}
              </Text>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              <FastImage
                source={require('../../../../asset/img/updatedImg/UICGoldCard.png')}
                style={{ width: 80, height: 50, marginBottom: 6 }}
              />
              <Text
                style={[FontStyle.fontMedium14, { color: ColorVariable.white }]}>
                *** *** {UICDetails?.transaction[0]?.uiccode.slice(9, 13)}
              </Text>
            </View>
          </View>
          <View
            style={[
              CommonStyle.flex_dirRow_alignCenter_justifySpbtw,
              styles.cardFooter,
            ]}>
            <Text
              style={[
                FontStyle.fontHeavy15,
                { color: ColorVariable.white, textDecorationLine: 'underline' },
              ]}
              onPress={navigationToTerms}>
              UIC T&C
            </Text>
            <Pressable style={styles.btn} onPress={navigationToRechargeUIC}>
              <TextTranslation
                style={[FontStyle.fontHeavy15, { color: ColorVariable.white }]}
                text={'__RECHARGE_UIC__'}
              />
            </Pressable>
          </View>
        </View>
      </GradientBackgroundRect>
    );
  };

  const TransactionsHistory = () => {
    return (
      <>
        {transcationHistory?.map(
          (item: any, index: any) => {
            return (
              <View
                style={[
                  CommonStyle.flex_dirRow_alignCenter,
                  {
                    borderBottomColor: ColorVariable.stroke,
                    borderBottomWidth: 1,
                    paddingBottom: 16,
                    paddingTop: 16,
                  },
                ]}
                key={index}>
                <View
                  style={{
                    paddingRight: 12,
                    borderRightColor: ColorVariable.stroke,
                    borderRightWidth: 1,
                    flex: 0.6,
                  }}>
                  <Text style={[FontStyle.fontMedium14, { marginBottom: 8 }]}>
                    {translate('Order number')}
                    <Text style={{ fontWeight: '800' }}> {item.orderid}</Text>
                  </Text>
                  <Text style={FontStyle.fontMedium14}>
                    {translate('__ORDERON_PLACED__')}
                    <Text style={{ fontWeight: '800' }}> {item.order_date}</Text>
                  </Text>
                </View>
                <View style={{ paddingLeft: 12, flex: 0.4 }}>
                  <Text style={[FontStyle.fontMedium14, { marginBottom: 6 }]}>
                    {translate('__TOTAL_AMOUNT__')}
                  </Text>
                  <Text style={[FontStyle.fontMedium14, { fontWeight: '800' }]}>
                    ₹{item.deduct_uic_amount}
                  </Text>
                </View>
              </View>
            );
          },
        )}
        {/* <FlatList
          data={transactionHistory.transaction_history}
          scrollEnabled={false}
          renderItem={({item, index}: any) => {
            return (
              <View
                style={[
                  CommonStyle.flex_dirRow_alignCenter,
                  {
                    borderBottomColor: ColorVariable.stroke,
                    borderBottomWidth: 1,
                    paddingBottom: 16,
                    paddingTop: 16,
                  },
                ]}
                key={index}>
                <View
                  style={{
                    paddingRight: 12,
                    borderRightColor: ColorVariable.stroke,
                    borderRightWidth: 1,
                    flex: 0.6,
                  }}>
                  <Text style={[FontStyle.fontMedium14, {marginBottom: 8}]}>
                    {translate('Order number')}
                    <Text style={{fontWeight: '800'}}> {item.orderid}</Text>
                  </Text>
                  <Text style={FontStyle.fontMedium14}>
                    {translate('__ORDERON_PLACED__')}
                    <Text style={{fontWeight: '800'}}> {item.order_date}</Text>
                  </Text>
                </View>
                <View style={{paddingLeft: 12, flex: 0.4}}>
                  <Text style={[FontStyle.fontMedium14, {marginBottom: 6}]}>
                    {translate('__TOTAL_AMOUNT__')}
                  </Text>
                  <Text style={[FontStyle.fontMedium14, {fontWeight: '800'}]}>
                    ₹{item.deduct_uic_amount}
                  </Text>
                </View>
              </View>
            );
          }}
        /> */}
      </>
    );
  };
  const RechargeHistory = () => {
    return (
      <>
        {History.map((item: any, index: any) => {
          return (
            <View
              style={[
                CommonStyle.flex_dirRow_alignCenter,
                {
                  borderBottomColor: ColorVariable.stroke,
                  borderBottomWidth: 1,
                  paddingBottom: 16,
                  paddingTop: 16,
                },
              ]}
              key={index}>
              <View
                style={{
                  paddingRight: 12,
                  borderRightColor: ColorVariable.stroke,
                  borderRightWidth: 1,
                  flex: 0.6,
                }}>
                <Text style={[FontStyle.fontMedium14, { marginBottom: 8 }]}>
                  {translate('__RECHARGE_ON__')}:{' '}
                  <Text style={{ fontWeight: '800' }}>{item.rechargedate}</Text>
                </Text>
                <Text style={FontStyle.fontMedium14}>
                  {translate('__METHOD__')}{' '}
                  <Text style={{ fontWeight: '800' }}>{item.type}</Text>
                </Text>
              </View>
              <View style={{ paddingLeft: 12, flex: 0.4 }}>
                <Text style={[FontStyle.fontMedium14, { marginBottom: 6 }]}>
                  {translate('__RECHARGE_AMOUNT__')}
                </Text>
                <Text style={[FontStyle.fontMedium14, { fontWeight: '800' }]}>
                  ₹{item.amount}
                </Text>
              </View>
            </View>
          );
        })}
      </>
    );
  };

  const paginationApiCall = (event: NativeScrollEvent) => {
    const layoutMeasurementHeight = +event.layoutMeasurement.height.toFixed();
    const contentHeight = +event.contentSize.height.toFixed();
    const contentOffset = +event.contentOffset.y.toFixed();
    const totalHeight = +(layoutMeasurementHeight + contentOffset).toFixed();
    if (totalHeight > contentHeight - 2) {
      console.log('Scroll to end');
      // rechargePAgination()
      if (activeTab === 'transcation') {
        settranscationoffset(transcationoffset + 1);
        gettransactionHistory(transcationoffset + 1)
      } else {
        setoffset(offset + 1);
        getrechargeHistory(offset + 1);
      }
    }
  };

  return (
    <ScrollView
      contentContainerStyle={{ backgroundColor: 'white', flexGrow: 1 }}
      onScroll={event => paginationApiCall(event.nativeEvent)}>
      {userStatus === 'UIC_GOLD' ? (
        <UicGoldCard />
      ) : userStatus === 'UIC' ? (
        <UicCard />
      ) : null}
      <View style={{ paddingTop: 8, paddingRight: 16,paddingLeft:16,paddingBottom:8, borderRadius: 6, backgroundColor: '#F2F4FF', gap: 8, marginBottom: 16, width: '100%', flexDirection: 'row' }}>
        <View style={{ flexDirection: 'row' }}>
          <Percentile style={{ width: 24, height: 24 }} />
        </View>
        <Text style={{ fontWeight: '500', fontFamily: 'Avenir Medium', flexDirection: 'row', color: '#242734',width:'65%' }}>
        {translate('Total_UIC_discount_savings')}
        </Text>

        <Text style={{ fontWeight: '800', fontFamily: 'Avenir Medium', flexDirection: 'row', color: '#242734',width:'30%',textAlign:'center'}}>
        ₹{totalUicSaving}
        {/* ₹98498598454 */}
        </Text>
      </View>
      <View
        style={[CommonStyle.border6_width1_colorStroke, { overflow: 'hidden' }]}>
        <View
          style={[
            CommonStyle.flex_dirRow_alignCenter,
            { borderBottomColor: ColorVariable.stroke, borderBottomWidth: 1 },
          ]}>
          <Pressable
            onPress={() => tabSelection('transcation')}
            style={[
              CommonStyle.alignCenter_justifyCenter,
              {
                backgroundColor:
                  activeTab === 'transcation'
                    ? ColorVariable.blueBlack
                    : ColorVariable.white,
                padding: 10,
                flex: 0.5,
              },
            ]}>
            <TextTranslation
              style={[
                FontStyle.fontMedium16,
                {
                  color:
                    activeTab === 'recharge'
                      ? ColorVariable.blueBlack
                      : ColorVariable.white,
                },
              ]}
              text={'__TRANSACTION__'}
            />
          </Pressable>
          <Pressable
            onPress={() => tabSelection('recharge')}
            style={[
              CommonStyle.alignCenter_justifyCenter,
              {
                backgroundColor:
                  activeTab === 'recharge'
                    ? ColorVariable.blueBlack
                    : ColorVariable.white,
                padding: 10,
                flex: 0.5,
              },
            ]}>
            <TextTranslation
              style={[
                FontStyle.fontMedium16,
                {
                  color:
                    activeTab !== 'recharge'
                      ? ColorVariable.blueBlack
                      : ColorVariable.white,
                },
              ]}
              text={'__RECHARGE__'}
            />
          </Pressable>
        </View>
        <View style={{ paddingHorizontal: 16, paddingTop: 8 }}>
          {activeTab === 'recharge' && History?.length !== 0 ? (
            <RechargeHistory />
          ) : activeTab === 'recharge' && History?.length === 0 ? (
            <View
              style={[
                CommonStyle.alignCenter_justifyCenter,
                { flexGrow: 1, minHeight: 180 },
              ]}>
              <Text style={FontStyle.fontHeavy18}>No transactions</Text>
            </View>
          ) : null}

          {activeTab === 'transcation' &&
            transcationHistory?.length !== 0 ? (
            <TransactionsHistory />
          ) : activeTab === 'transcation' &&
            transcationHistory?.length === 0 ? (
            <View
              style={[
                CommonStyle.alignCenter_justifyCenter,
                { flexGrow: 1, minHeight: 180 },
              ]}>
              <Text style={FontStyle.fontHeavy18}>No transactions</Text>
            </View>
          ) : null}
        </View>
      </View>
      <View style={{ height: 25 }} />
    </ScrollView>
  );
};

export default React.memo(UICBalanceTab);

const styles = StyleSheet.create({
  btn: {
    borderRadius: commanRadius.radi4,
    borderColor: 'rgba(255, 255, 255, 0.8)',
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  cardFooter: {
    paddingTop: 16,
    marginTop: 16,
    borderTopColor: 'rgba(255, 255, 255, 0.4)',
    borderTopWidth: 0.5,
  },
});
