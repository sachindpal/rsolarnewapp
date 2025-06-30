import { View, Text, Pressable, StyleSheet } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';

import {
  getLocalStorageData,
  postAuthReq,
} from '../Service/APIServices/axoisService';
import { ColorVariable, CommonStyle, commanRadius } from '../../asset/style/commonStyle';
import { CloseWhite, LeftBackIcon, ShopingBag } from '../../asset/img';
import TextTranslation from '../commonResources/component/CommonInput/TextTranslation';
import { FontStyle } from '../../asset/style/FontsStyle';
import ProfileSolarRender from './profileSolarRender';
import { useData } from '../Service/DataContext';

export default function ProfileSolar(props: any) {

  const goBack = () => {
    props.navigation.goBack();
  };


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
    backgroungBoxColor: isDark ? '#1A1A1A' : '#FFF'
  };

  return (
    <>
      <View style={[
            { backgroundColor: colors.background }
          ]}>
        <View
          style={[
            { backgroundColor: colors.background }
          ]}>
          <View style={{ backgroundColor: colors.background, flexDirection: 'row',marginTop: 24,marginLeft:16,gap:16,alignItems:'center' }}>
            <Pressable onPress={() => goBack()}>
              <LeftBackIcon color={colors.text} width={24} height={24}/>
            </Pressable>
            <Text
              style={[

                { color: colors.text, fontSize: 24, fontWeight: '800', fontFamily: 'Avenir Medium',  },

              ]}
            >My Profile</Text>
          </View>

        </View>


        <ProfileSolarRender />

      </View>

    </>
  );
}
