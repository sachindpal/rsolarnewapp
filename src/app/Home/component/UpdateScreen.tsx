import {
  Alert,
  Image,
  Linking,
  Share,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import {CommonStyle} from '../../../asset/style/commonStyle';
import {FontStyle} from '../../../asset/style/FontsStyle';
import Button from '../../commonResources/component/CommonButton/Button';

const UpdateScreen = () => {
  const rateApp = () => {
    Linking.openURL(
      `https://play.google.com/store/apps/details?id=com.farmkart.mobileapp&hl=en_IN`,
    );
  };

  return (
    <>
      <StatusBar backgroundColor={'white'} translucent />
      <View
        style={[
          CommonStyle.mainViewWhite,
          {padding: 20, justifyContent: 'space-between'},
        ]}>
        <View style={{alignItems: 'center'}}>
          <Image
            source={require('../../../asset/img/updatedImg/Update.png')}
            style={{width: 350, height: 350, marginTop: 100}}
          />
          <View style={{alignItems: 'center', width: '80%',justifyContent:'center'}}>
            <Text style={[FontStyle.fontHeavy24, {marginTop: 24}]}>
              New update available!
            </Text>
            <Text
              style={[
                FontStyle.fontRegular14,
                {marginTop: 16, textAlign: 'center'},
              ]}>
              Update now for a smoother, faster app experience with new features
              and enhancements!
            </Text>
          </View>
        </View>
        <View style={{marginBottom: 4}}>
          <Button title="UPDATE" fontSize={16} bgGreen onPress={rateApp} />
        </View>
      </View>
    </>
  );
};

export default UpdateScreen;

const styles = StyleSheet.create({});
