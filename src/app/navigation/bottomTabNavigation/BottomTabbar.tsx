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
  MyAccount,
  ProfileIcon
} from '../../../asset/img';
import {FontStyle} from '../../../asset/style/FontsStyle';
import {useTranslation} from 'react-i18next';
import RsolarHome from '../../Rsolar/RsolarHome';
import RsolarHomeOld from '../../Rsolar/RsolarHomeOld';
import Profile from '../../Profile/ProfileSolar';
import MoreDrawerRsolar from '../../More/MoreDrawerRsolar';
import { useData } from '../../Service/DataContext';
const Stack = createNativeStackNavigator();

const CommonTab = ({focused, IconActive, IconInActive, title, route}: any) => {
  const navigation = useNavigation<any>();
  const {t: translate} = useTranslation();
  const { isDark, setIsDark } = useData();

  const colors = {
    background: isDark ? '#272727' : '#fff',
    text: isDark ? '#fff' : '#242734',
    subText: isDark ? '#bbb' : 'rgba(36, 39, 52, 0.50)',
    card: isDark ? '#1E1E1E' : '#F9F9F9',
    tabBg: isDark ? '#222' : 'rgba(231, 230, 236, 0.50)',
    activeTab: isDark ? '#333' : '#FFF',
    label: isDark ? '#ddd' : '#000',
    labelgrey: isDark ? '#ddd' : '#848484',
    iconInactiveColor:isDark ? '#E0E0E0':'#232734' 
};
  
  return (
    <View style={{}}>
      <Pressable
        // android_ripple={{color: '#f8f8f8'}}
        onPress={() => {
          navigation.navigate(route);
        }}>
        <View>{focused ? IconActive : IconInActive}</View>
        <Text
          allowFontScaling={false}
          adjustsFontSizeToFit
          style={[
            focused ? FontStyle.fontHeavy12 : FontStyle.fontMedium12Gray,
            {color:colors.text},

          ]}>
          {translate(title)}
        </Text>
      </Pressable>
    </View>
  );
};

const BottomTabbar = () => {
  const Tab = createBottomTabNavigator();
  const { isDark, setIsDark } = useData();

  const colors = {
    background: isDark ? '#272727' : '#fff',
    text: isDark ? '#fff' : '#242734',
    subText: isDark ? '#bbb' : 'rgba(36, 39, 52, 0.50)',
    card: isDark ? '#1E1E1E' : '#F9F9F9',
    tabBg: isDark ? '#222' : 'rgba(231, 230, 236, 0.50)',
    activeTab: isDark ? '#333' : '#FFF',
    label: isDark ? '#ddd' : '#000',
    labelgrey: isDark ? '#ddd' : '#848484',
    inActiveIconColr:isDark?'#E0E0E0':'#232734',
    ActiveIconColr:isDark?'#FFF':'#1C1B1F'
};
  return (
    <Tab.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: colors.background,
          height: 70,
        },
      }}
      >
      <Tab.Screen
        name="Status"
        component={RsolarHomeOld}
        options={{
          lazy: false,
          tabBarIcon: ({focused}) => (
            <CommonTab
              focused={focused}
              IconActive={<MoreActive color={colors.ActiveIconColr} style={{marginLeft:5}} />}
              IconInActive={<MoreInactive color={colors.inActiveIconColr} width={20} height={20} style={{marginLeft:5}}/>}
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
              IconActive={<HomeActive color={colors.ActiveIconColr} style={{marginLeft:5}}/>}
              IconInActive={<HomeInactive color={colors.inActiveIconColr} style={{marginLeft:5}}/>}
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
              IconActive={<ProfileIcon  color={colors.ActiveIconColr} style={{marginLeft:5}}/>}
              IconInActive={<ProfileIcon color={colors.inActiveIconColr}  style={{marginLeft:5}}/>}
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
