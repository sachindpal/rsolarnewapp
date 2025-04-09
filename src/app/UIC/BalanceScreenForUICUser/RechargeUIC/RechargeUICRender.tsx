import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import {
  ColorVariable,
  CommonStyle,
  commanRadius,
} from '../../../../asset/style/commonStyle';
import {Call, CallWhite, CloseBlack} from '../../../../asset/img';
import {FontStyle} from '../../../../asset/style/FontsStyle';
import Button from '../../../commonResources/component/CommonButton/Button';
import TextTranslation from '../../../commonResources/component/CommonInput/TextTranslation';
import { useTranslation } from 'react-i18next';

interface DataType {
  goBack: () => void;
  onCallMobileNumber: () => void;
  openrechargeAmtModal: () => void;
}

const RechargeUICRender = ({
  goBack,
  onCallMobileNumber,
  openrechargeAmtModal,
}: DataType) => {
  const {t:translation}=useTranslation()
  return (
    <View style={{flex: 1}}>
      <View style={[CommonStyle.sheet, {padding: 20}]}>
        <Pressable onPress={goBack} style={{width: 50}}>
          <CloseBlack />
        </Pressable>
        <View style={{justifyContent: 'space-between', flex: 1}}>
          <View>
            <TextTranslation
              style={[
                FontStyle.fontHeavy24,
                {marginTop: 16, textAlign: 'center'},
              ]} text={"__RECHARGE_UIC__"}/>
            <View style={{alignItems: 'center', marginTop: 24}}>
              <Image
                source={require('../../../../asset/img/updatedImg/RechargeUIC.png')}
                style={{width: '90%', height: 320}}
              />
            </View>
          </View>
          <View>
            <Button title={translation("__RECHARGE_ONLINE__")} bgGreen fontSize={16} onPress={openrechargeAmtModal}/>
            <Pressable
              style={CommonStyle.button_Icon}
              onPress={onCallMobileNumber}>
              <CallWhite />
              <TextTranslation
                style={[
                  FontStyle.fontHeavy16,
                  {color: 'white', marginLeft: 10},
                ]} text={"__CALL_TO_RECHARGE__"}/>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
};

export default RechargeUICRender;

const styles = StyleSheet.create({
});
