import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import UICScreen from '../../UIC/UICScreen';
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
import HomeScreenRender from '../../Home/HomeScreenRender';
import MoreDrawerRender from '../../More/MoreDrawerRender';
import {useTranslation} from 'react-i18next';
import HomeScreenLogic from '../../Home/HomeScreenLogic';
import UICLogic from '../../UIC/UICLogic';
import LottieView from 'lottie-react-native';

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
        name="HomeScreen"
        component={HomeScreenLogic}
        options={{
          lazy: false,
          tabBarIcon: ({focused}) => (
            <CommonTab
              focused={focused}
              IconActive={<MyShopActive />}
              IconInActive={<MyShop />}
              title={'__SHOP__'}
              route={'HomeScreen'}
            />
          ),
        }}
      />
      {/* <Tab.Screen name="HomeScreen" component={HomeScreen} /> */}
      <Tab.Screen
        name="UIC"
        component={UICLogic}
        options={{
          lazy: false,
          tabBarIcon: ({focused}) => (
            <CommonTab
              focused={focused}
              IconActive={<MyFarmActive />}
              IconInActive={<MyFarm />}
              title={'__MY_FARM__'}
              route={'UIC'}
            />
          ),
        }}
      />
      {/* <Tab.Screen name="UICScreen" component={UICScreen} /> */}
      {/* <Tab.Screen
        name="CallModel"
        component={HomeScreenLogic}
        listeners={({navigation}) => ({
          tabPress: event => {
            event.preventDefault();
            navigation.navigate('CallPopUp');
          },
        })}
        options={{
          lazy: false,
          tabBarIcon: ({focused}) => (
            <CommonTab
              focused={focused}
              IconActive={<CallActive />}
              IconInActive={<CallInactive />}
              title={'__CALL__'}
              route={'CallPopUp'}
            />
          ),
        }}
      /> */}

<Tab.Screen
        name="ChatBoat"
        component={HomeScreenLogic}
        listeners={({navigation}) => ({
          tabPress: event => {
            event.preventDefault();
            navigation.navigate('FarmGpt');
          },
        })}
        options={{
          lazy: false,
          tabBarIcon: ({focused}) => (
            <CommonTab
              focused={focused}
              IconActive={<ChatBoatActive  />}
              IconInActive={<LottieView
                source={require('../../../asset/img/raichandjson.json')}
                autoPlay
                loop
                style={{ width: 100, height: 40 }}
              />}
              title={'__DR_RAICHANDRA__'}
              route={'FarmGpt'}
            />
          ),
        }}
      />
      <Tab.Screen
        name="MoreDrawer"
        component={HomeScreenLogic}
        listeners={({navigation}) => ({
          tabPress: event => {
            event.preventDefault();
            console.log('hello');
            navigation.navigate('MoreContent');
          },
        })}
        options={{
          lazy: false,
          tabBarIcon: ({focused}) => (
            <CommonTab
              focused={focused}
              IconActive={<MyAccountActive />}
              IconInActive={<MyAccount />}
              title={'__MY_ACCOUNT__'}
              route={'MoreContent'}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabbar;

const styles = StyleSheet.create({});
