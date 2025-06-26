import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import CallModel from '../../CallModel/CallModel';

import {DrawerActions, useNavigation} from '@react-navigation/native';
import {
  CallActive,
  CallInactive,
  ChatBoatActive,
  FarmGPTInactive,
  HomeActive,
  HomeInactive,
  MoreActive,
  MoreInactive,
  UICActive,
  UICInactive,
  MyFarm,
  MyFarmActive,
  MyShop,
  MyShopActive,
  MyAccountActive,
  MyAccount
} from '../../../asset/img';
import {FontStyle} from '../../../asset/style/FontsStyle';
import {useTranslation} from 'react-i18next';
import RsolarHome from '../../Rsolar/RsolarHome';
import RsolarHomeOld from '../../Rsolar/RsolarHomeOld';
import Profile from '../../Profile/ProfileSolar';
import MoreDrawerRsolar from '../../More/MoreDrawerRsolar';
const Stack = createNativeStackNavigator();

const CommonTab = ({focused, IconActive, IconInActive, title, route}: any) => {
  const navigation = useNavigation<any>();
  const {t: translate} = useTranslation();
  return (
    <View style={{}}>
      <Pressable
        android_ripple={{color: '#f8f8f8'}}
        onPress={() => {
          navigation.navigate(route);
        }}>
        <View>{focused ? IconActive : IconInActive}</View>
        <Text
          allowFontScaling={false}
          adjustsFontSizeToFit
          style={[
            focused ? FontStyle.fontHeavy12 : FontStyle.fontMedium12Gray,
            {textAlign: 'center'},
          ]}>
          {translate(title)}
        </Text>
      </Pressable>
    </View>
  );
};

const BottomTabbar = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: '#f8f8f8',
          height: 70,
        },
      }}>
      <Tab.Screen
        name="Status"
        component={RsolarHomeOld}
        options={{
          lazy: false,
          tabBarIcon: ({focused}) => (
            <CommonTab
              focused={focused}
              IconActive={<MoreActive />}
              IconInActive={<MoreInactive />}
              title={'Status'}
              route={'Status'}

            />
          ),
        }}
      />
      {/* <Tab.Screen name="HomeScreen" component={HomeScreen} /> */}
      <Tab.Screen
        name="Home"
        component={RsolarHome}
        options={{
          lazy: false,
          tabBarIcon: ({focused}) => (
            <CommonTab
              focused={focused}
              IconActive={<HomeActive />}
              IconInActive={<HomeInactive />}
              title={'Home'}
              route={'Home'}
            />
          ),
        }}
      />
     

     <Tab.Screen
        name="Account"
        component={MoreDrawerRsolar}
        
        options={{
          lazy: false,
          tabBarIcon: ({focused}) => (
            <CommonTab
              focused={focused}
              IconActive={<MyAccountActive />}
              IconInActive={<MyAccount />}
              title={'Account'}
              route={'Account'}
            />
            
          ),
        }}
      />
          
      
    </Tab.Navigator>
  );
};

export default BottomTabbar;

const styles = StyleSheet.create({});
