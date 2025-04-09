import {View, Text, Platform, Linking} from 'react-native';
import React, {useState} from 'react';
import RechargeUICRender from './RechargeUICRender';
import {useNavigation} from '@react-navigation/native';
import RechargeSuccessModal from './RechargeAmount/RechargeSuccessModal';

const RechargeUICLogic = () => {
  const navigation = useNavigation<any>();
  const goBack = () => {
    navigation.goBack();
  };
  // use state
  const [rechargeAmtModal, setrechargeAmtModal] = useState(false);

  const onCallMobileNumber = () => {
    navigation.navigate("CallPopUp")
  };

  const openrechargeAmtModal = () => {
    setrechargeAmtModal(!rechargeAmtModal);
    navigation.navigate('global', {screen: 'RechargeUICAmt'});
  };

  return (
    <>
      <RechargeUICRender
        goBack={goBack}
        onCallMobileNumber={onCallMobileNumber}
        openrechargeAmtModal={openrechargeAmtModal}
      />
    </>
  );
};

export default RechargeUICLogic;
