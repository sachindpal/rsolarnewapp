import {Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {
  ColorVariable,
  CommonStyle,
  commanRadius,
} from '../../../asset/style/commonStyle';
import {FontStyle} from '../../../asset/style/FontsStyle';
import CropTrackerTab from './CropTrackerTab/CropTrackerTab';
import UICBalanceTab from './UICBalanceTab/UICBalanceTab';
import TextTranslation from '../../commonResources/component/CommonInput/TextTranslation';
import {useNavigation} from '@react-navigation/native';
import CustomModal from '../../commonResources/component/ModelPopUp/CustomModal';

interface DataTypes {
  UICRenewStatus: boolean;
  UICStatusSuccessPopUp: boolean;
  setUICStatusSuccessPopUp: any;
  userStatus: string;
  UICDetails: any;
  cropBanner: any;

}

const BalanceUICScreenRender = ({
  UICRenewStatus,
  UICStatusSuccessPopUp,
  setUICStatusSuccessPopUp,
  userStatus,
  UICDetails,
  cropBanner,

}: DataTypes) => {
  const [activeTab, setactiveTab] = useState('cropTracker');
  const navigation = useNavigation<any>();

  const tabSelection = (val: string) => {
    setactiveTab(val);
  };
  const navigationToCropTracker = (cropId: any, custcropId: any) => {
    navigation.navigate('signIn', {
      screen: 'CropTracker',
      params: {
        cropId: cropId,
        customerCropId: custcropId,
      },
    });
  };
  const navigationToAddCrop = () => {
    navigation.navigate('signIn', {
      screen: 'CropSelection',
      params: {
        screen: 'addCrop',
      },
    });
  };
  const navigationToUICRenew = () => {
    navigation.navigate('global', {screen: 'RenewUICQuestion'});
  };

  return (
    <View style={CommonStyle.mainViewWhite}>
      {userStatus != 'UIC_GOLD' && UICRenewStatus ? (
        <View style={styles.topView}>
          {UICDetails.transaction[0].uicamount < 1000 ? (
            <TextTranslation
              style={FontStyle.fontMedium12}
              text={'__EXPIRY_LESS_THAN_1000_INFO__'}
            />
          ) : (
            <TextTranslation
              style={FontStyle.fontMedium12}
              text={'__EXPIRY_MORE_THAN_1000_INFO__'}
            />
          )}

          <Pressable style={styles.btn} onPress={navigationToUICRenew}>
            <TextTranslation
              style={[FontStyle.fontHeavy12, {color: 'white'}]}
              text={'__ANSWER_NOW__'}
            />
          </Pressable>
        </View>
      ) : null}
      <View style={[CommonStyle.flex_dirRow_alignCenter, styles.tab]}>
        <Pressable
          style={
            activeTab === 'cropTracker' ? styles.activeTab : styles.unActiveTab
          }
          onPress={() => tabSelection('cropTracker')}>
          <TextTranslation
            style={[
              FontStyle.fontMedium14,
              {
                color:
                  activeTab === 'cropTracker'
                    ? ColorVariable.white
                    : ColorVariable.gray,
              },
            ]}
            text={'__CROPTRACKER__'}
          />
        </Pressable>
        <Pressable
          style={activeTab === 'UIC' ? styles.activeTab : styles.unActiveTab}
          onPress={() => tabSelection('UIC')}>
          <Text
            style={[
              FontStyle.fontMedium14,
              {
                color:
                  activeTab === 'UIC'
                    ? ColorVariable.white
                    : ColorVariable.gray,
              },
            ]}>
            UIC
          </Text>
        </Pressable>
      </View>
      <View style={[CommonStyle.mainPadding, {marginTop: 16, flex: 1}]}>
        {activeTab === 'cropTracker' ? (
          <CropTrackerTab
            navigationToCropTracker={navigationToCropTracker}
            navigationToAddCrop={navigationToAddCrop}
            cropBanner={cropBanner}
          />
        ) : activeTab === 'UIC' ? (
         <View style={{flex:1}}>
           <UICBalanceTab
            userStatus={userStatus}
            UICDetails={UICDetails}
          />
          </View>
        ) : null}
      </View>
      <CustomModal
        visible={UICStatusSuccessPopUp}
        onClose={() => setUICStatusSuccessPopUp(false)}
        firstText="Your UIC renewed"
        secondText="Now you can enjoy all your 
UIC benefits "
      />
    </View>
  );
};

export default React.memo(BalanceUICScreenRender);

const styles = StyleSheet.create({
  tab: {
    marginTop: 16,
    borderWidth: 1,
    borderColor: ColorVariable.stroke,
    borderRadius: 6,
    alignSelf: 'center',
  },
  activeTab: {
    borderRadius: commanRadius.radi6,
    backgroundColor: ColorVariable.blueBlack,
    minWidth: 106,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  unActiveTab: {
    borderRadius: commanRadius.radi6,
    backgroundColor: 'white',
    minWidth: 106,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  topView: {
    padding: 8,
    borderWidth: 1,
    borderColor: ColorVariable.stroke,
    borderRadius: 6,
    marginHorizontal: 8,
    marginTop: 16,
  },
  btn: {
    backgroundColor: ColorVariable.blueBlack,
    alignItems: 'center',
    justifyContent: 'center',
    height: 36,
    borderRadius: 6,
    marginTop: 16,
  },
});
