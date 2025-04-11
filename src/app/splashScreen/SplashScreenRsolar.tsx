import {Image, StatusBar, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import DeviceInfo from 'react-native-device-info';
import {getUnAuthReqest, isLoggedIn, isSolarLoggedIn} from '../Service/APIServices/axoisService';
import { FontStyle } from '../../asset/style/FontsStyle';
import { Rsolar, Rsolarsplash } from '../../asset/img';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SplashScreenRsolar = () => {
  const navigation = useNavigation<any>();
  const currentYear = new Date().getFullYear();
console.log(currentYear);


  useEffect(() => {
    

    let version = DeviceInfo.getVersion();
    // getUnAuthReqest('/app/settings')
    //   .then(async(res: any) => {
    //     if (version >= res.data.data.android_version) {
    //       console.log("res.data.data.android_version============>",res.data.data.android_version)
    //       const issolarlogged = await isSolarLoggedIn()
    //       if(issolarlogged){
    //         navigation.replace('RsolarHome');

    //       }else{
    //       console.log('jhdfsjkhf')
          
    //         navigation.navigate('AuthStack', {
    //             screen: 'RsolarLogin',
    //           })

    //           // navigation.navigate('RsolarHome')
    //       }
    //     } else {
    //       navigation.replace('updateScreen');
    //     }
    //   })
    //   .catch((res: any) => {
    //     console.log('=========version check api error=====', res);
    //     navigation.replace('home');
    //   });
    redirection()
  }, []);


  const redirection = async ()=>{
    const issolarlogged = await isSolarLoggedIn()
          if(issolarlogged){
            navigation.replace('RsolarHome');

          }else{
          console.log('jhdfsjkhf')
          
            navigation.navigate('AuthStack', {
                screen: 'RsolarLogin',
              })

              // navigation.navigate('RsolarHome')
          }
  }
  

  return (
    <View style={{flex: 1,backgroundColor:"white",alignItems:'center',justifyContent:'center'}}>
      <StatusBar backgroundColor={"white"}/>
      {/* <Image source={require('../../asset/img/logo_gif.gif')}  style={{width:60.3,height:60.3}}/> */}
      <View style={{}}>
      {/* <LottieView
        source={require('../../asset/img/Farmkart Logo.json')}
        autoPlay
        loop={false}
        style={{width:"100%", height:"93%"}}
      /> */}
      <Rsolarsplash />
      </View>
      <View style={{marginBottom:16,position:'absolute',bottom:10,alignItems:'center',justifyContent:'center',left:30}}>
      <Text style={[FontStyle.fontMedium16,{color:"rgba(116, 116, 116, 1)"}]}>©{currentYear} Farmkart Online Services Pvt. Ltd.</Text>
        <Text style={[FontStyle.fontMedium16,{color:"rgba(116, 116, 116, 1)"}]}>All rights reserved</Text>
      </View>
    </View>
  );
};

export default SplashScreenRsolar;

const styles = StyleSheet.create({});
