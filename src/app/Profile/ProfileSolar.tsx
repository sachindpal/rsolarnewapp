import {View, Text, Pressable,StyleSheet} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import ProfileRender from './ProfileRender';
import {CommonContext} from '../commonResources/Context/CommonContext';
import UpdatePhoneNumber from './Component/UpdatePhoneNumber';
import CustomModal from '../commonResources/component/ModelPopUp/CustomModal';
import ChangeAddress from './Component/ChangeAddress';
import ChangePassword from './Component/ChangePassword';
import {
  getLocalStorageData,
  postAuthReq,
} from '../Service/APIServices/axoisService';
import SkeletonLoader from '../commonResources/component/SkeletonLoader';
import {ColorVariable, CommonStyle,commanRadius} from '../../asset/style/commonStyle';
import {CloseWhite, ShopingBag} from '../../asset/img';
import TextTranslation from '../commonResources/component/CommonInput/TextTranslation';
import {FontStyle} from '../../asset/style/FontsStyle';
import HeaderWithSearchBag from '../commonResources/component/Header/HeaderWithSearchBag';
import ProfileSolarRender from './profileSolarRender';

export default function ProfileSolar(props: any) {
  
  const goBack = () => {
    props.navigation.goBack();
  };


  return (
    <>
    <View style={styles.main}>
      <View
        style={[
          CommonStyle.flex_dirRow_justifySpbtw,
          {
            paddingLeft: 16,
            paddingRight: 16,
          },
        ]}>
        <View style={[CommonStyle.flex_dirRow_alignCenter,{width:200}]}>
          <Pressable onPress={()=>goBack()}>
            <CloseWhite />
          </Pressable>
          <TextTranslation
            style={[
              FontStyle.fontMedium18,
              {marginLeft: 16, color: 'rgba(255, 255, 255, 1)'},
              
            ]}
            text={"My Profile"}
            title={'elipse'}
          />
        </View>
        
      </View>
      
            
            
          </View>
        
    <ProfileSolarRender />
    </>
  );
}
const styles = StyleSheet.create({
    main: {
        backgroundColor: '#242734',
        paddingVertical: 16,
        justifyContent: 'center',
      },
    contentView: {
      borderRadius: commanRadius.radi6,
      borderWidth: 1,
      borderColor: ColorVariable.stroke,
      padding: 18,
      marginTop: 8,
      marginHorizontal: 8,
    },
  });