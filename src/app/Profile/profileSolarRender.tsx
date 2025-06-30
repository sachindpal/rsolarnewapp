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
import { useData } from '../Service/DataContext';
import { BlackCloud, Call, ProfileIcon } from '../../asset/img';



const ProfileSolarRender = () => {
  const { isDark, setIsDark } = useData();
    
    const [userInfo,setUserInfo] = useState<any>({})
    useEffect(()=>{
        getUserInfo();
    },[])

    const colors = {
      background: isDark ? '#121212' : '#F7F6FB',
      text: isDark ? '#fff' : '#242734',
      subText: isDark ? '#bbb' : 'rgba(36, 39, 52, 0.50)',
      card: isDark ? '#1E1E1E' : '#F9F9F9',
      tabBg: isDark ? '#222' : 'rgba(231, 230, 236, 0.50)',
      activeTab: isDark ? '#333' : '#FFF',
      label: isDark ? '#ddd' : '#000',
      labelgrey: isDark ? '#ddd' : '#848484',
      backgroungBoxColor:isDark ? '#1A1A1A' : '#FFF'
  };

    const getUserInfo = async()=>{
        const getInfo:any = await AsyncStorage.getItem('solar_customer_data');
        console.log('sachin',getInfo)
        setUserInfo(JSON.parse(getInfo))
    }
  return (
    <View style={{backgroundColor:colors.background,gap:16,paddingHorizontal:16,marginTop:35,height:'100%'}}>
      
      {/* name */}
      <View style={[styles.contentView,{backgroundColor:colors.backgroungBoxColor}]}>
        <View style={{flexDirection:'row',alignItems:'center',gap:16}}>
        <ProfileIcon color={colors.text} width={24} height={24}  />

          {/* <Text style={[styles.textHeadingProp,{color:colors.text}]}>Name</Text> */}
          <Text style={[styles.textProp,{color:colors.text}]}>
            {userInfo.fullname}
          </Text>
        </View>
      </View>
      {/* phone Number */}
      <View
        style={[
          styles.contentView,
          CommonStyle.flex_dirRow_alignCenter_justifySpbtw,{backgroundColor:colors.backgroungBoxColor}
        ]}>
        <View style={{flexDirection:'row',alignItems:'center',gap:16}}>
        <Call color={colors.text} width={24} height={24}  />
          <Text style={[styles.textHeadingProp,{color:colors.text}]}>
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
          CommonStyle.flex_dirRow_alignCenter_justifySpbtw,{backgroundColor:colors.backgroungBoxColor}
        ]}>
        <View style={{flexDirection:'row',alignItems:'center',gap:16}}>
        <BlackCloud color={colors.text} width={24} height={24}  />
          <Text style={[styles.textHeadingProp,{color:colors.text,marginRight:10}]}>

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
    borderRadius: 8,
    // borderWidth: 1,
    // borderColor: ColorVariable.stroke,
    padding: 18,
  },
  textHeadingProp:{
    fontSize:16,
    fontFamily:'Avenir Medium',
    fontWeight:'400',
  },
  textProp:{
    fontSize:16,
    fontFamily:'Avenir Medium',
    fontWeight:'700',
    lineHeight:22
  }
});
