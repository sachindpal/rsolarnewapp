import {View, Text} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import CheckOutScreenRender from './CheckOutScreenRender';
import {useNavigation} from '@react-navigation/native';
import PartialPaymentScreen from './Component/PartialPaymentScreen';
import RazorpayCheckout from 'react-native-razorpay';
import {
  getLocalStorageData,
  postAuthReq,
  removeItemLocalStorage,
} from '../../Service/APIServices/axoisService';
import {CommonContext} from '../../commonResources/Context/CommonContext';

const CheckOutScreenLogic = (props: any) => {
  const {removeCompleteProuduct} = useContext(CommonContext);

  const navigation = useNavigation<any>();
  const [deliveryType, setdeliveryType] = React.useState('home');
  const [extraPaymentMode, setExtraPaymentMode] = React.useState(undefined);
  const [partialPaymentModal, setpartialPaymentModal] = React.useState(false);
  const [isloading, setisloading] = useState(false)

  const navigateToOrderSucess = (obj: any) => {
    setisloading(true)
    var customDelType = 'home_delivery';
    if (deliveryType == 'store') {
      customDelType = 'pickup_at_store';
    }

    let shipping_type = 'prepaid';
    if (obj.deliveryTime == '24') {
      shipping_type = 'paid';
    } else {
      shipping_type = 'free';
    }

    var toSend = {
      payment_method: obj.paymentMethod,
      delivery_method: customDelType,
      shipping_type: 'free',
      // uic_number:props?.route?.params?.uicDetails?.uicCode,
      uic_number: undefined,
      promocodeName: obj.promocode,
      promoCodeDiscount: obj.promocodediscount,
      latitude: 0,
      longitude: 0,
    };
    if (
      obj.partialPaymentMode != undefined ||
      props?.route?.params?.paymentType == 'uic'
    ) {
      var changePayMethod = 'uic';
      if (obj.partialPaymentMode == 'PayOnline') {
        changePayMethod = 'online';
      }

      if (obj.partialPaymentMode == 'cod') {
        changePayMethod = 'cod';
      }
      toSend.uic_number = props?.route?.params?.uicDetails?.uicCode;
      toSend.payment_method = changePayMethod;
    }
    console.log('toSend', toSend);
    postAuthReq('/order/place-order-new', toSend).then((data: any) => {
      let paymentDetails = data.data.data.payment_details;

      console.log('paymentDetails', data.data.data);
      // console.lo
      if (
        data.data.data?.payment_method == 'ONLINE' ||
        data.data.data?.payment_method == 'UIC With ONLINE'
      ) {
        razorCheckOut(
          paymentDetails.order_id,
          paymentDetails.currency,
          paymentDetails.key,
          paymentDetails.amount,
          paymentDetails.customer_name,
          paymentDetails.customer_mobileno,
          obj,
          customDelType,
        );
      } else {
        removeFromLocal();
        navigation.navigate('signIn', {
          screen: 'OrderSuccess',
          params: {delivery: customDelType, order_id: data.data.data.order_id},
        });
      }
    }).catch((err)=>{
      setisloading(false)
    })
  };

  const removeFromLocal = async () => {
    var bagProducts: any = await getLocalStorageData('bagProduct');
    if (bagProducts) {
      for (let index = 0; index < JSON.parse(bagProducts).length; index++) {
        const element = JSON.parse(bagProducts)[index];
        removeCompleteProuduct(element.id);
      }
    }
    removeItemLocalStorage('bagProduct');
  };

  const razorCheckOut = (
    order_id: any,
    currency: any,
    key: any,
    amount: any,
    customer_name: any,
    customer_mobileno: any,
    obj: any,
    customDelType: any,
  ) => {
    var options = {
      description: 'Online payment',
      image: 'https://www.farmkart.com/assets/images/Farmkart-Logo.svg',
      order_id: order_id,
      currency: currency,
      key: key,
      amount: amount,
      name: 'Farmkart',
      theme: {
        color: '#72BE44',
      },
      prefill: {
        name: customer_name,
        contact: customer_mobileno,
      },
    };
    RazorpayCheckout.open(options)
      .then((data: any) => {
        // handle success
        console.log('Success', data);

        var toSend = {
          razorpay_order_id: data.razorpay_order_id,
          razorpay_payment_id: data.razorpay_payment_id,
          razorpay_signature: data.razorpay_signature,
          // latitude: this.latitude,
          // longitude: this.longitude,
          promoCodeDiscount: obj.promocodediscount,
          promocodeName: obj.promocode
            ? obj.promocode.toUpperCase()
            : undefined,
        };

        checkoutPayment(toSend, customDelType, order_id);
      })
      .catch((error: any) => {
        // handle failure
        console.log('Error', error);
      });
  };

  const checkoutPayment = (
    dataTosend: any,
    customDelType: any,
    order_id: any,
  ) => {
    console.log('dataTosend', dataTosend);
    postAuthReq('/order/checkout', dataTosend).then((data: any) => {
      console.log('data checkout', data.data.data);
      removeFromLocal();
      navigation.navigate('signIn', {
        screen: 'OrderSuccess',
        params: {delivery: customDelType, order_id: data.data.data.order_id},
      });
    });
  };

  useEffect(() => {}, [extraPaymentMode]);

  const navigateToEditAddress = () => {
    navigation.navigate('signIn', {
      screen: 'EditAddress',
      params: {sendData: props?.route?.params},
    });
  };

  const goBack = () => {
    navigation.goBack();
  };

  const modalClose = () => {
    setpartialPaymentModal(!partialPaymentModal);
  };
  return (
    <>
      <CheckOutScreenRender
        navigateToOrderSucess={navigateToOrderSucess}
        deliveryType={deliveryType}
        setdeliveryType={setdeliveryType}
        navigateToEditAddress={navigateToEditAddress}
        goBack={goBack}
        paymentMethod={props?.route?.params?.paymentType}
        uicDetails={props?.route?.params?.uicDetails}
        partialPaymentmodalClose={modalClose}
        partialPaymentMode={extraPaymentMode}
        isloading={isloading}
      />
      <PartialPaymentScreen
        modalClose={modalClose}
        partialPaymentModal={partialPaymentModal}
        getValues={setExtraPaymentMode}
      />
    </>
  );
};

export default CheckOutScreenLogic;
