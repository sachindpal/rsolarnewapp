import {Linking, StyleSheet, Text, View,} from 'react-native';
import React, {useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {getStateFromPath, NavigationContainer, useNavigation} from '@react-navigation/native';
import HomeStack from './HomeStack';
import SplashScreen from '../../splashScreen/SplashScreen';
import {getLocalStorageData} from '../../Service/APIServices/axoisService';
import AuthenticationStack from './AuthStack';

import UpdateScreen from '../../Home/component/UpdateScreen';
import messaging ,{ FirebaseMessagingTypes} from '@react-native-firebase/messaging';
import { CommonProvider } from '../../commonResources/Context/CommonContext';
import MyOrderLogic from '../../MyOrder/MyOrderLogic';
import SplashScreenRsolar from '../../splashScreen/SplashScreenRsolar';
import AppSelctionScreen from '../../splashScreen/AppSelectionScreen';
import RsolarHome from '../../Rsolar/RsolarHome';
import MoreDrawerRender from '../../More/MoreDrawerRender';
import MoreDrawerRsolar from '../../More/MoreDrawerRsolar';
import CallModel from '../../CallModel/CallModel';
import PrivacyPolicyRsolar from '../../PrivacyPolicy/PrivacyPolicyRsolar';
import ProfileSolar from '../../Profile/ProfileSolar';


const Routes = () => {
  

  const Stack = createNativeStackNavigator();

  const [userStatus, setuserStatus] = React.useState(false);

  const userStatusFunct = async () => {
    let token = await getLocalStorageData('auth_Token');
    console.log('tokentoken', token);

    if (token != null) {
      setuserStatus(true);
    } else {
      setuserStatus(false);
    }
  };

  useEffect(() => {
    console.log('userStatus', userStatus);
    userStatusFunct();

    const handleDeepLink = async(event:any) => {
      let token = await getLocalStorageData('auth_Token');
    console.log('tokentoken home', token);
      const url = event.url;
      // Parse the URL and manually navigate
      const route = url.replace('https://mobileapinew.farmkart.com/', '');
      console.log('hfhfhffhfhfh',route)
      if (route === 'myorder' && token!=null) {
        // navigation.navigate('signIn', {
        //   screen: 'MyOrder',
        // })
      } else {
        // navigation.navigate('AuthStack', {
        //   screen: 'Login',
        // })
      }
    };
  
    // Add event listener for deep links
    Linking.addEventListener('url', handleDeepLink);

  }, []);
  console.log('userStatus', 'sachin');
  const linking = {
    // enabled: 'auto' /* Automatically generate paths for all screens */,
    // prefixes: ['https://farmkart.com','https://mobileapinew.farmkart.com', 'farmkart://'],
    prefixes: ['https://farmkart.com','https://*.farmkart.com', 'farmkart://'],
    
  };

  // screens: {
  //   MyOrder: 'MyOrder',
  // }
  return (
    <NavigationContainer linking={linking}>
       <CommonProvider>
      <Stack.Navigator
        initialRouteName="appSelectionScreen"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="appSelectionScreen" component={AppSelctionScreen} />
        <Stack.Screen name="splash" component={SplashScreen} />
        <Stack.Screen name="splashRsolar" component={SplashScreenRsolar} />
        
        <Stack.Screen name="updateScreen" component={UpdateScreen} />
        {/* {userStatus ? (
          <Stack.Group>
            <Stack.Screen name="home" component={HomeStack} />
          </Stack.Group>
        ) : ( */}
        <Stack.Group>
          <Stack.Screen name="AuthStack" component={AuthenticationStack} />
          <Stack.Screen name="home" component={HomeStack} />
          <Stack.Screen name="RsolarHome" component={RsolarHome} />
          <Stack.Screen name="MoreContent" component={MoreDrawerRsolar} />
          <Stack.Screen name="CallPopUp" component={CallModel} />
          <Stack.Screen name="PrivacyPolicyRsolar" component={PrivacyPolicyRsolar} />
          <Stack.Screen name="RsolarProfile" component={ProfileSolar} />
          <Stack.Screen name="MyOrder" component={MyOrderLogic} />
        </Stack.Group>
        {/* )} */}
      </Stack.Navigator>
      </CommonProvider>
    </NavigationContainer>
  );
};

export default Routes;
