import {
  Linking,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import { FontStyle } from '../../asset/style/FontsStyle';
import { CommonStyle } from '../../asset/style/commonStyle';
import { useNavigation } from '@react-navigation/native';
import TextTranslation from '../commonResources/component/CommonInput/TextTranslation';
import { useData } from '../Service/DataContext';

const CallModel = (props: any) => {
  console.log('props', props.route.params)
  const navigation = useNavigation<any>();
  const { isDark, setIsDark } = useData();

  const colors = {
    background: isDark ? '#121212' : '#F7F6FB',
    text: isDark ? '#fff' : '#242734',
    subText: isDark ? '#bbb' : 'rgba(36, 39, 52, 0.50)',
    card: isDark ? '#1E1E1E' : '#F9F9F9',
    tabBg: isDark ? '#222' : 'rgba(231, 230, 236, 0.50)',
    activeTab: isDark ? '#333' : '#FFF',
    label: isDark ? '#ddd' : '#000',
    labelgrey: isDark ? '#ddd' : '#848484',
    labelgreyMobile: isDark ? 'rgba(255, 255, 255, 0.50)' : 'rgba(35, 39, 52, 0.50)',
    boxBackground: isDark ? '#1A1A1A' : '#FFF',
  };

  // handle go back
  const goBack = () => {
    navigation.goBack();
  };

  const onCallMobileNumber = (number: number) => {
    if (props.route.params) {
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
        // backgroundColor: 'red',
        backgroundColor: 'rgba(0,0,0,0.5)',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <View
        style={{
          backgroundColor: 'white',
          paddingLeft: 24,
          paddingRight: 24,
          width: '90%',
          borderRadius: 28,
        }}>
        <View style={{ paddingBottom: 16, paddingTop: 20 }}>
          <TextTranslation style={FontStyle.fontHeavy24} text={'Need Help?'} />
        </View>
        <View
          style={{
            backgroundColor: '#ffff',
            marginTop: 1,
           
          }}>
          <View
            style={[
              // CommonStyle.flex_dirRow_alignCenter,
              { paddingBottom: 18, flexDirection: 'column', gap: 20 },
            ]}>
            <View style={{ width: '95%', justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ color: colors.text, fontFamily: 'Avenir Medium', fontSize: 14, fontWeight: '400', gap: 16 }}>
                Our support team is here for you — real humans, real solutions. Call us anytime
              </Text>
              <Text style={{ color: colors.text, fontFamily: 'Avenir Medium', fontSize: 14, fontWeight: '700', gap: 16 }}>
                Monday to Saturday, 9:00 AM – 6:00 PM.
              </Text>
            </View>


            <View style={{ flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'flex-end', gap: 8 }}>
              <Text style={{ color: colors.text, fontFamily: 'Avenir Medium', fontSize: 14, fontWeight: '500', marginHorizontal: 16, marginVertical: 10 }} onPress={() => goBack()}>Cancel</Text>

              <Pressable onPress={() => onCallMobileNumber(8823888238)}>
                <Text style={{ color: colors.text, fontFamily: 'Avenir Heavy', fontSize: 14, fontWeight: '500', marginHorizontal: 16, marginVertical: 10 }}>
                  Call Support Now
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default CallModel;

const styles = StyleSheet.create({});
