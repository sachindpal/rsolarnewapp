import {
  Linking,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import {FontStyle} from '../../asset/style/FontsStyle';
import {CommonStyle} from '../../asset/style/commonStyle';
import {useNavigation} from '@react-navigation/native';
import TextTranslation from '../commonResources/component/CommonInput/TextTranslation';

const CallModel = (props:any) => {
  console.log('props',props.route.params)
  const navigation = useNavigation<any>();

  // handle go back
  const goBack = () => {
    navigation.goBack();
  };

  const onCallMobileNumber = (number: number) => {
    if(props.route.params){
      number = props.route.params.mobile
    }
    let phoneNumber = '';
    if (Platform.OS === 'android') {
      phoneNumber = `tel:${number}`;
    } else {
      phoneNumber = `telprompt:${number}`;
    }

    Linking.openURL(phoneNumber);
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.2)',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <View
        style={{
          backgroundColor: 'white',
          paddingLeft: 24,
          paddingRight: 24,
          width: '70%',
          borderRadius: 6,
        }}>
        <View style={{paddingBottom: 20, paddingTop: 20}}>
          <TextTranslation style={FontStyle.fontHeavy24} text={'CALL US'} />
        </View>
        <View
          style={{
            backgroundColor: '#ffff',
            marginTop: 1,
            alignItems: 'flex-end',
          }}>
          <View
            style={[
              CommonStyle.flex_dirRow_alignCenter,
              {paddingTop: 18, paddingBottom: 18},
            ]}>
            <TextTranslation
              style={[FontStyle.fontMedium16, {marginRight: 26}]}
              onPress={goBack}
              text={'NO'}
            />

            <Pressable onPress={() => onCallMobileNumber(8823888238)}>
              <TextTranslation
                style={[FontStyle.fontMedium16, {marginRight: 26}]}
                text={'YES'}
              />
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
};

export default CallModel;

const styles = StyleSheet.create({});
