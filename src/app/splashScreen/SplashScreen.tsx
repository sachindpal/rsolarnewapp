import {Image, StatusBar, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import DeviceInfo from 'react-native-device-info';
import {getUnAuthReqest} from '../Service/APIServices/axoisService';
import { FontStyle } from '../../asset/style/FontsStyle';

const SplashScreen = () => {
  const navigation = useNavigation<any>();
  const currentYear = new Date().getFullYear();
console.log(currentYear);


  useEffect(() => {
    let version = DeviceInfo.getVersion();
    getUnAuthReqest('/app/settings')
      .then((res: any) => {
        if (version >= res.data.data.android_version) {
          console.log("res.data.data.android_version============>",res.data.data.android_version)
          navigation.replace('home');
        } else {
          navigation.replace('updateScreen');
        }
      })
      .catch((res: any) => {
        console.log('=========version check api error=====', res);
        navigation.replace('home');
      });
  }, []);

  return (
    <View style={{flex: 1,backgroundColor:"white"}}>
      <StatusBar backgroundColor={"white"}/>
      {/* <Image source={require('../../asset/img/logo_gif.gif')}  style={{width:60.3,height:60.3}}/> */}
      <View style={{}}>
      <LottieView
        source={require('../../asset/img/Farmkart Logo.json')}
        autoPlay
        loop={false}
        style={{width:"100%", height:"93%"}}
      />
      </View>
      <View style={{flex:1,alignItems:"center",marginBottom:16}}>
        <Text style={[FontStyle.fontMedium16,{color:"rgba(116, 116, 116, 1)"}]}>©{currentYear} Farmkart Online Services Pvt. Ltd.</Text>
        <Text style={[FontStyle.fontMedium16,{color:"rgba(116, 116, 116, 1)"}]}>All rights reserved</Text>
      </View>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({});
