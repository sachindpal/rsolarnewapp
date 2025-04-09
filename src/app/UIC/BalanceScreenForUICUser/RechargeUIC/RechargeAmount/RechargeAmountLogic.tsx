import {View, Text} from 'react-native';
import React, {useState} from 'react';
import RechargeAmountRender from './RechargeAmountRender';
import {showToast} from '../../../../commonResources/commanSnackbar/toastMessage';
import RechargeSuccessModal from './RechargeSuccessModal';
import {useTranslation} from 'react-i18next';
import RazorpayCheckout from 'react-native-razorpay';
import {postAuthReq} from '../../../../Service/APIServices/axoisService';

const RechargeAmountLogic = ({navigation}: any) => {
  const {t: translate} = useTranslation();
  const [amount, setamount] = useState(0);
  const [other, setother] = useState(false);
  const [rechargeSuccessFullModal, setrechargeSuccessFullModal] =
    useState(false);
  const [isLoading, setisLoading] = useState(true);
  const [btnloading, setbtnloading] = useState(false)

  const selectOther = () => {
    setother(true);
  };

  const selectAmount = (item: any) => {
    setbtnloading(false)
    let number = parseFloat(item.replace(/,/g, ''));
    if (!Number.isNaN(number)) {
      setamount(number), setother(false);
    } else {
      setamount(0);
      setother(true);
    }
  };

  const razorCheckOut = (
    order_id: any,
    currency: any,
    key: any,
    amount: any,
    customer_name: any,
    customer_mobileno: any,
  ) => {
    var options = {
      description: 'UIC Recharge',
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

        rechargeCheckout(
          data.razorpay_order_id,
          data.razorpay_payment_id,
          data.razorpay_signature,
        );
        setrechargeSuccessFullModal(true);
      })
      .catch((error: any) => {
        // handle failure
        console.log('Error', error.code, error.description);
      });
  };

  const rechargeCheckout = (order: any, payment: any, sign: any) => {
    let body = {
      razorpay_order_id: order,
      razorpay_payment_id: payment,
      razorpay_signature: sign,
    };

    console.log('checkout screen boddy========.', body);
    postAuthReq('/uic/uic-recharge-checkout', body)
      .then((data: any) => {
        // handle success
        setisLoading(false);
        console.log('Success=============> checkout', data);
      })
      .catch((error: any) => {
        // handle failure
        console.log('Error checkout========>', error.response);
      });
  };

  const rechargeApi = () => {
    setbtnloading(true)
    let body = {
      amount: amount,
    };
    console.log('amount from front', body);
    postAuthReq('uic/uic-recharge', body)
      .then(res => {
        console.log('recharge amount', res.data.data.payment_details);
        let data = res.data.data.payment_details;
        razorCheckOut(
          data.order_id,
          data.currency,
          data.key,
          data.amount,
          data.customer_name,
          data.customer_mobileno,
        );
      })
      .catch(err => {
        console.log('error recharge amount', err);
        setbtnloading(false)
      });
  };

  const navigateToSuccessScreen = () => {
    if (amount === 0) {
      showToast('success', translate('__RECHARGE_ERROR__'));
    } else if (amount < 1000) {
      showToast(
        'success',
        `${translate('__MINIMUM_RECHARGE_AMOUNT__')} ₹1,000`,
      );
    } else {
      // razorCheckOut()
      rechargeApi();
    }
  };

  const navigationToHome = (name: string) => {
    navigation.navigate('BottomTabBar', {screen: name});
  };

  const goBack = () => {
    navigation.goBack();
  };
  return (
    <>
      <RechargeAmountRender
        navigateToSuccessScreen={navigateToSuccessScreen}
        selectAmount={selectAmount}
        selectOther={selectOther}
        amount={amount}
        other={other}
        goBack={goBack}
        setamount={setamount}
        btnloading={btnloading}
      />
      <RechargeSuccessModal
        navigationToHome={navigationToHome}
        rechargeSuccessFullModal={rechargeSuccessFullModal}
        amount={amount}
        isLoading={isLoading}
      />
    </>
  );
};

export default RechargeAmountLogic;
