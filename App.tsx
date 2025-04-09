import {AppState, Linking, PermissionsAndroid, View} from 'react-native';
import React, {useEffect, useRef} from 'react';
import Routes from './src/app/navigation/stacks/Routes';
import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import i18next from './src/app/Service/i18next/i18next';
import {getUnAuthReqest, setLocalStorage} from './src/app/Service/APIServices/axoisService';
import uuid from 'react-native-uuid';
import Toast from 'react-native-toast-message';
import toastConfig from './src/app/commonResources/commanSnackbar/toastConfig';
import {
  getFcmToken,
  getFcmTokenFromLocalStorage,
  notificationListener,
  requestNotificationPermission,
  // requestUserPermission,
} from './src/app/Service/notification';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DeviceInfo from 'react-native-device-info';
import SplashScreen from 'react-native-splash-screen';

const initI18n = i18next;

const App = () => {
  const navigationRef = useNavigationContainerRef<any>();
  const routeNameRef = useRef<any>('');



  useEffect(() => {
    const appStateId = AppState.addEventListener(
      'change',
      handleAppStateChange,
    );
    return () => {
      appStateId.remove();
    };
  }, []);

  // session id creation by uuid package
  const createSessionId = () => {
    const id = uuid.v4();
    setLocalStorage('sessionId', id);
  };

  const handleAppStateChange = (nextAppState: any) => {
    if (nextAppState === 'active') {
      createSessionId();
      console.log('the app is active');
    }
  };

  useEffect(() => {
    getFcmTokenFromLocalStorage()
    requestNotificationPermission()
    notificationListener();
    let version = DeviceInfo.getVersion()
    console.log("+=======version=======",version)
    getUnAuthReqest("/app/settings").then((res:any)=>{
      console.log("=========version check api=====",res.data)
    }).catch((res:any)=>{
      console.log("=========version check api error=====",res)
    })
    SplashScreen.hide();
  }, []);

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      {/* <UICProvider> */}
       
        <View style={{flex:1}}>
            <Routes />
          </View>
   
      {/* </UICProvider> */}

      <Toast config={toastConfig} />
    </GestureHandlerRootView>
  );
};

export default App;
