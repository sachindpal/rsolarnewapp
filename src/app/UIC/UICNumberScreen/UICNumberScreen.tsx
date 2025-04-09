import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useContext} from 'react';
import {
  ColorVariable,
  CommonStyle,
  commanRadius,
} from '../../../asset/style/commonStyle';
import HeaderWithSearchBar from '../../commonResources/component/HeaderWithSearchBar';
import {CommonContext} from '../../commonResources/Context/CommonContext';
import {FontStyle} from '../../../asset/style/FontsStyle';
import CustomButton from '../../commonResources/component/CommonButton/CustomButton';
import {useTranslation} from 'react-i18next';
import TextTranslation from '../../commonResources/component/CommonInput/TextTranslation';
import {ScrollView} from 'react-native-gesture-handler';

const UICNumberScreen = (props: any) => {
  const {getItemsCount} = useContext(CommonContext);
  const navigateToCartScreen = () => {
    props.navigation.navigate('Cart');
  };

  const navigationToHome = () => {
    props.navigation.navigate('BottomTabBar', {screen: 'HomeScreen'});
  };

  const navigationToCropTracker = () => {
    props.navigation.navigate('signIn', {screen: 'CropTracker'});
  };

  let uicNumber=props.route.params?.uicNumber


  const {t: translate} = useTranslation();
  return (
    <View style={CommonStyle.mainViewWhite}>
      <HeaderWithSearchBar
        navigateToCartScreen={navigateToCartScreen}
        itemInBag={getItemsCount}
        lang={1}
        token={uicNumber}

      />
      <View style={{flex: 1, flexGrow: 1}}>
        <ScrollView
          contentContainerStyle={{flexGrow: 1}}
          showsVerticalScrollIndicator={false}>
          <View style={{alignItems: 'center', paddingTop: 24}}>
            <TextTranslation
              style={FontStyle.fontHeavy24}
              text={'__CONGRATULATIONS__'}
            />
          </View>
          <View
            style={{
              alignItems: 'center',
              paddingTop: 8,
              paddingHorizontal: 16,
            }}>
            <TextTranslation
              style={[FontStyle.fontMedium14, {textAlign: 'center'}]}
              text={'__UIC_MEMBER_NOW__'}
            />
          </View>
          <View style={{alignItems: 'center', marginVertical: 24}}>
            <Image
              source={require('../../../asset/img/updatedImg/UICNumber.png')}
              style={{width: '90%', height: 164}}
            />
          </View>
          <View style={{alignItems: 'center'}}>
            <TextTranslation
              style={[FontStyle.fontMedium14, {textAlign: 'center'}]}
              text={'__YOUR_UIC_NUMBERIS__'}
            />
            <View style={styles.number}>
              <Text style={[FontStyle.fontMedium24]}>
                {uicNumber.slice(4,uicNumber.length)} 
              </Text>
            </View>
          </View>
          <View
            style={[
              CommonStyle.flex_dirRow_alignCenter,
              {paddingHorizontal: 16, marginTop: 40},
            ]}>
            <View style={{flex: 0.5, marginRight: 4}}>
              <CustomButton
                title={translate('__START_SHOPPING__')}
                borderBlack={true}
                fontSize={14}
                paddingVertical={16}
                paddingHorizontal={16}
                onPress={navigationToHome}
              />
            </View>
            <View style={{flex: 0.5, marginLeft: 4}}>
              <CustomButton
                title={translate('__CROP_TRACKER__')}
                bgGreen
                fontSize={14}
                paddingVertical={16}
                paddingHorizontal={16}
                onPress={navigationToCropTracker}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default UICNumberScreen;

const styles = StyleSheet.create({
  number: {
    padding: 16,
    borderRadius: commanRadius.radi6,
    borderWidth: 1,
    borderColor: ColorVariable.stroke,
    marginTop: 8,
  },
});
