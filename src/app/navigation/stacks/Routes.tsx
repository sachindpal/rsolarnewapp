import React, {useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { NavigationContainer} from '@react-navigation/native';
import AuthenticationStack from './AuthStack';

// import UpdateScreen from '../../Home/component/UpdateScreen';
import SplashScreenRsolar from '../../splashScreen/SplashScreenRsolar';
import RsolarHome from '../../Rsolar/RsolarHome';
import MoreDrawerRsolar from '../../More/MoreDrawerRsolar';
import CallModel from '../../CallModel/CallModel';
import PrivacyPolicyRsolar from '../../PrivacyPolicy/PrivacyPolicyRsolar';
import ProfileSolar from '../../Profile/ProfileSolar';


const Routes = () => {
  

  const Stack = createNativeStackNavigator();


 

  // screens: {
  //   MyOrder: 'MyOrder',
  // }
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="splashRsolar"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="splashRsolar" component={SplashScreenRsolar} />
        
        {/* <Stack.Screen name="updateScreen" component={UpdateScreen} /> */}
        {/* {userStatus ? (
          <Stack.Group>
            <Stack.Screen name="home" component={HomeStack} />
          </Stack.Group>
        ) : ( */}
        <Stack.Group>
          <Stack.Screen name="AuthStack" component={AuthenticationStack} />
          <Stack.Screen name="RsolarHome" component={RsolarHome} />
          <Stack.Screen name="MoreContent" component={MoreDrawerRsolar} />
          <Stack.Screen name="CallPopUp" component={CallModel} />
          <Stack.Screen name="PrivacyPolicyRsolar" component={PrivacyPolicyRsolar} />
          <Stack.Screen name="RsolarProfile" component={ProfileSolar} />
        </Stack.Group>
        {/* )} */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
