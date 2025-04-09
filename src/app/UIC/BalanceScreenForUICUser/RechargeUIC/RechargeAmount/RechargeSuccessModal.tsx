import {
  View,
  Text,
  Modal,
  Pressable,
  Image,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import {CloseBlack} from '../../../../../asset/img';
import {
  ColorVariable,
  CommonStyle,
} from '../../../../../asset/style/commonStyle';
import {FontStyle} from '../../../../../asset/style/FontsStyle';
import TextTranslation from '../../../../commonResources/component/CommonInput/TextTranslation';
import Button from '../../../../commonResources/component/CommonButton/Button';
import {useTranslation} from 'react-i18next';

const RechargeSuccessModal = ({
  navigationToHome,
  rechargeSuccessFullModal,
  amount,
  isLoading,
}: any) => {
  const {t} = useTranslation();
  return (
    <Modal
      visible={rechargeSuccessFullModal}
      animationType="slide"
      presentationStyle="fullScreen">
      <View style={{flex: 1, backgroundColor: ColorVariable.blueBlack}}>
        <View style={[CommonStyle.sheet]}>
          <Pressable
            style={{width: 50, paddingHorizontal: 20, paddingTop: 20}}
            onPress={() => navigationToHome('UIC')}>
            <CloseBlack />
          </Pressable>
          {isLoading ? (
            <View style={[CommonStyle.alignCenter_justifyCenter, {flex: 1}]}>
              <ActivityIndicator size={'small'} color={'green'} />
            </View>
          ) : (
            <ScrollView
              contentContainerStyle={{
                justifyContent: 'space-between',
                flexGrow: 1,
              }}>
              <View>
                <View
                  style={{
                    alignItems: 'center',
                    marginTop: 16,
                    marginBottom: 40,
                  }}>
                  <Image
                    source={require('../../../../../asset/img/updatedImg/successTick.png')}
                    style={{width: 110, height: 110}}
                  />
                </View>
                <View style={{alignItems: 'center', paddingHorizontal: 50}}>
                  <Text style={FontStyle.fontHeavy40}>₹ {amount}</Text>
                  <TextTranslation
                    style={[
                      FontStyle.fontHeavy24,
                      {marginTop: 16, textAlign: 'center'},
                    ]}
                    text={'__RECHARGE_SUCCESSFULL__'}
                  />

                  <Text
                    style={[
                      FontStyle.fontMedium16,
                      {marginTop: 16, textAlign: 'center'},
                    ]}>
                    {t('__UIC_RECHARGE_SUCCESS_NOTE__')}
                    <Text style={FontStyle.fontHeavy16}>88238 88238</Text>
                  </Text>
                </View>
              </View>
              <View style={{paddingHorizontal: 20, marginBottom: 40}}>
                <Pressable
                  onPress={() => navigationToHome('HomeScreen')}
                  style={[
                    CommonStyle.button_Icon,
                    {backgroundColor: ColorVariable.farmkartGreen},
                  ]}>
                  <Image
                    source={require('../../../../../asset/img/updatedImg/ShoppingbagWhite.png')}
                    style={{width: 24, height: 24, marginRight: 8}}
                  />
                  <TextTranslation
                    style={[FontStyle.fontHeavy16, {color: 'white'}]}
                    text={'__CONTINUE_SHOPPING__'}
                  />
                </Pressable>
                <View>
                  <Button
                    title={t('__GO_TO_UIC__')}
                    bgBlack
                    fontSize={16}
                    onPress={() => navigationToHome('UIC')}
                  />
                </View>
              </View>
            </ScrollView>
          )}
        </View>
      </View>
    </Modal>
  );
};

export default RechargeSuccessModal;
