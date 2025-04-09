import {StyleSheet, Text, View} from 'react-native';
import React, { useEffect, useState } from 'react';
import {
  ColorVariable,
  CommonStyle,
  commanRadius,
} from '../../asset/style/commonStyle';
import TextTranslation from '../commonResources/component/CommonInput/TextTranslation';
import {FontStyle} from '../../asset/style/FontsStyle';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';



const ProfileSolarRender = () => {
    
    const [userInfo,setUserInfo] = useState<any>({})
    useEffect(()=>{
        getUserInfo();
    },[])

    const getUserInfo = async()=>{
        const getInfo:any = await AsyncStorage.getItem('solar_customer_data');
        console.log('sachin',getInfo)
        setUserInfo(JSON.parse(getInfo))
    }
  return (
    <View>
      {/* name */}
      <View style={styles.contentView}>
        <View>
          <TextTranslation style={FontStyle.fontMedium12} text={'Name'} />
          <Text style={[FontStyle.fontHeavy16, {marginTop: 16}]}>
            {userInfo.fullname}
          </Text>
        </View>
      </View>
      {/* phone Number */}
      <View
        style={[
          styles.contentView,
          CommonStyle.flex_dirRow_alignCenter_justifySpbtw,
        ]}>
        <View>
          <TextTranslation
            style={FontStyle.fontMedium12}
            text={'Phone Number'}
          />
          <Text style={[FontStyle.fontHeavy16, {marginTop: 16}]}>
            {userInfo.mobileno}
          </Text>
        </View>
        {/* <TextTranslation
          style={[FontStyle.fontMedium15, {textDecorationLine: 'underline'}]}
          text={'__EDIT__'}
          onPress={()=>console.log('sachin')}
        /> */}
      </View>
      {/* address */}
      <View
        style={[
          styles.contentView,
          CommonStyle.flex_dirRow_alignCenter_justifySpbtw,
        ]}>
        <View >
          <TextTranslation
            style={FontStyle.fontMedium12}
            text={'Site Address'}
          />
          <Text style={[FontStyle.fontHeavy16, {marginTop: 16}]}>
          {userInfo.address}, {userInfo.village_name}, {userInfo.district_name}, {userInfo.tehsil_name}, {userInfo.state_name}, {userInfo.pincode}
          </Text>
          {/* <Text style={[FontStyle.fontHeavy16]}>
            Badgaon, Thikari, Badwani, Madhya Pradesh, 451447
          </Text> */}
        </View>
        {/* <TextTranslation
          style={[FontStyle.fontMedium15, {textDecorationLine: 'underline'}]}
          text={'__EDIT__'}
          onPress={()=>console.log('sachin')}
        /> */}
      </View>
      {/* change password */}
      
    </View>
  );
};

export default ProfileSolarRender;

const styles = StyleSheet.create({
  contentView: {
    borderRadius: commanRadius.radi6,
    borderWidth: 1,
    borderColor: ColorVariable.stroke,
    padding: 18,
    marginTop: 8,
    marginHorizontal: 8,
  },
});
