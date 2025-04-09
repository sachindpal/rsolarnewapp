import {Image, NativeScrollEvent, StyleSheet, Text, View} from 'react-native';
import React, {useContext} from 'react';
import {CommonContext} from '../commonResources/Context/CommonContext';
import HeaderWithSearchBag from '../commonResources/component/Header/HeaderWithSearchBag';
import {
  ColorVariable,
  CommonStyle,
  commanRadius,
} from '../../asset/style/commonStyle';
import Button from '../commonResources/component/CommonButton/Button';
import {FontStyle} from '../../asset/style/FontsStyle';
import CurrentOrder from './component/CurrentOrder';
import {Invoice, OrderHistory, Repeat, StarBlack} from '../../asset/img';
import CustomButton from '../commonResources/component/CommonButton/CustomButton';
import {ScrollView} from 'react-native-gesture-handler';
import OrderHistoryView from './component/OrderHistory';
import TextTranslation from '../commonResources/component/CommonInput/TextTranslation';
import SkeletonLoader from '../commonResources/component/SkeletonLoader';

const MyOrderRender = ({
  navigateToHome,
  openAndCloseInvoiceModal,
  openAndCloseReviewModal,
  reorder,
  orderHistory,
  isLoadingorderHistory,
  currentOrder,
  isLoadingcurrentOrder,
  paginationApiCall,
  isloadingPage,
  shippingData
}: any) => {
  const {getItemsCount} = useContext(CommonContext);

  const NoOrder = () => {
    return (
      <View style={{flex: 1}}>
        <View style={[{flex: 1}, CommonStyle.alignCenter_justifyCenter]}>
          <Image
            source={require('../../asset/img/updatedImg/NoOrder.png')}
            style={{width: 193, height: 333}}
          />
        </View>
        <View style={{paddingVertical: 24, paddingHorizontal: 24}}>
          <Button
            title="__CONTINUE_SHOPPING__"
            fontSize={16}
            bgGreen
            onPress={navigateToHome}
          />
        </View>
      </View>
    );
  };
 
  return (
    <View style={CommonStyle.mainView}>
      <HeaderWithSearchBag title="__MYORDERS__" itemInBag={getItemsCount} />

      {!isLoadingcurrentOrder || !isLoadingorderHistory ? (
        currentOrder.length == 0 && orderHistory.length == 0 ? (
          <NoOrder />
        ) : (
          <ScrollView
            contentContainerStyle={{flexGrow: 1}}
            onScroll={event => paginationApiCall(event.nativeEvent)}>
            {/* <View style={{flex:1}}> */}
            <View>
              {isLoadingcurrentOrder ? (
                <View style={{alignItems: 'center', margin: 8}}>
                  <SkeletonLoader
                    width={'90%'}
                    height={250}
                    variant="box"
                    variant2="dark"
                  />
                </View>
              ) : (
                <CurrentOrder currentOrder={currentOrder} openAndCloseReviewModal={openAndCloseReviewModal} shippingData={shippingData} />
              )}
            </View>

            <View style={{marginBottom: 32}}>
              {isLoadingorderHistory ? (
                <View style={{alignItems: 'center', margin: 8}}>
                  <SkeletonLoader
                    width={'90%'}
                    height={250}
                    variant="box"
                    variant2="dark"
                  />
                </View>
              ) : (
                <OrderHistoryView
                  openAndCloseInvoiceModal={openAndCloseInvoiceModal}
                  openAndCloseReviewModal={openAndCloseReviewModal}
                  reorder={reorder}
                  orderHistory={orderHistory}
                  isloadingPage={isloadingPage}
                />
              )}
            </View>
          </ScrollView>
        )
      ) : (
        <View
          style={[CommonStyle.alignCenter_justifyCenter, {margin: 8, flex: 1}]}>
          <SkeletonLoader
            width={'90%'}
            height={250}
            variant="box"
            variant2="dark"
          />
          <View style={{height: 16}} />
          <SkeletonLoader
            width={'90%'}
            height={250}
            variant="box"
            variant2="dark"
          />
        </View>
      )}
    </View>
  );
};

export default MyOrderRender;

const styles = StyleSheet.create({
  view: {
    borderRadius: 6,
    marginHorizontal: 8,
    marginBottom: 24,
    marginTop: 16,
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
