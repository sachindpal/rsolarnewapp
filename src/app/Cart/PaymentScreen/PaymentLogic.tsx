import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import PaymentRender from './PaymentRender';
import {use} from 'i18next';
import {useNavigation} from '@react-navigation/native';
import LearnMoreModal from './component/LearnMoreModal';
import {isLoggedIn, postAuthReq} from '../../Service/APIServices/axoisService';

export default function PaymentLogic(props:any) {
  const navigation = useNavigation<any>();
  const [learnMoreModalVisible, setlearnMoreModalVisible] = useState(false);
  const [isloadingUserStatus, setisloadingUserStatus] = useState(true);
  const [userStatus, setuserStatus] = useState('');
  const [uicDetails, setUicDetails] = useState({});
  const [isLoggedInStatus, setisLoggedInStatus] = useState<any>(false);
  const openlearnMoreModal = () => {
    setlearnMoreModalVisible(!learnMoreModalVisible);
  };
  const goBack = () => {
    navigation.goBack();
  };
  const navigationToAddressScreen = (item:any) => {
    console.log('itmemmememememeememmmmmmmmm', item)
    var paymentType = 'uic';
    if(item=='UIC'){
      paymentType = 'uic'
    }else if(item=='COD'){
      paymentType = 'cod'

    }else{
      paymentType = 'online'

    }
    navigation.navigate('signIn', {
      screen: 'AddressScreen',
      params: {
        screen: 'payment',
        total:props.route.params.total,
        params:{paymentType:paymentType,uicDetails:uicDetails}
      },
    });
  };
  const navigationToCheckOutScreen = (item:any) => {
    var paymentType = 'uic';
    if(item=='UIC'){
      paymentType = 'uic'
    }else if(item=='COD'){
      paymentType = 'cod'

    }else{
      paymentType = 'online'

    }
    console.log('kkkkkkkkk',item)
    navigation.navigate('signIn', {screen: 'CheckOutScreen',params:{paymentType:paymentType,uicDetails:uicDetails}});
  };

  const navigationToAccount = () => {
    navigation.navigate('signIn', {
      screen: 'AddressScreen',
      params: {
        screen: 'UICRegistration',
      },
    });
  };

  const getUICUserStatus = () => {
    setisloadingUserStatus(true);
    let body = {};
    postAuthReq('/order/get-uic-details', body)
      .then(res => {
        setuserStatus(res.data.data.uicDetails.uicType);
        console.log('response', res.data);
        setUicDetails(res.data.data.uicDetails)
        setisloadingUserStatus(false);
      })
      .catch(err => {
        console.log('error from uic get status', err.response.data);
      });
  };

  React.useEffect(() => {
    
    const checkLoginStatus = async () => {
      const isLogged = await isLoggedIn();
      setisLoggedInStatus(isLogged);
      if (isLogged) {
        getUICUserStatus();
      }
    };
    checkLoginStatus();
  }, []);

  return (
    <>
      <PaymentRender
        navigationToAddressScreen={navigationToAddressScreen}
        navigationToCheckOutScreen={navigationToCheckOutScreen}
        goBack={goBack}
        navigationToAccount={navigationToAccount}
        openlearnMoreModal={openlearnMoreModal}
        userStatus={userStatus}
        isloadingUserStatus={isloadingUserStatus}
        isLoggedInStatus={isLoggedInStatus}
        total={props.route.params.total}
      />
      <LearnMoreModal
        learnMoreModalVisible={learnMoreModalVisible}
        openlearnMoreModal={openlearnMoreModal}
      />
    </>
  );
}
