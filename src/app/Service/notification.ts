import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
import {Alert, PermissionsAndroid, Platform} from 'react-native';
import {getLocalStorageData, setLocalStorage} from './APIServices/axoisService';

// const requestUserPermission = async () => {
//   const authStatus = await messaging().requestPermission();
//   const enabled =
//     authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
//     authStatus === messaging.AuthorizationStatus.PROVISIONAL;

//   if (enabled) {
//     console.log('Authorization status:', authStatus);
//   }
// };

const requestNotificationPermission = async () => {
  if(Platform.OS ==="android"){
    try {
      PermissionsAndroid.check('android.permission.POST_NOTIFICATIONS').then(
        response => {
          if(!response){
            PermissionsAndroid.request('android.permission.POST_NOTIFICATIONS',{
                title: 'Notification',
                message:
                  'App needs access to your notification ' +
                  'so you can get Updates',
                buttonNeutral: 'Ask Me Later',
                buttonNegative: 'Cancel',
                buttonPositive: 'OK',
            })
          }
        }
      ).catch(
        err => {
          console.log("Notification Error=====>",err);
        }
      )
    } catch (err){
      console.log(err);
    }
  }
};

const getFcmTokenFromLocalStorage = async() => {
  let fcmtoken = await AsyncStorage.getItem('deviceToken')
  if (!fcmtoken) {
    try {
      const newFcmToken = await messaging().getToken();
      setLocalStorage('deviceToken', newFcmToken);
      console.log('===deviceToken==== success==================/', newFcmToken);

    } catch (error) {
      console.log("error from fcm token",error);
    }
  } else {
    console.log('===deviceToken====/', fcmtoken);
  }
};
const getFcmToken = async () => {
  try {
    const newFcmToken = await messaging().getToken();
    return newFcmToken;
  } catch (error) {
    console.error(error);
    return null;
  }
};
const notificationListener = () => {
  // Assume a message-notification contains a "type" property in the data payload of the screen to open

  messaging().onNotificationOpenedApp(remoteMessage => {
    console.log(
      'Notification caused app to open from background state:',
      remoteMessage.notification,
    );
  });

  // Check whether an initial notification is available
  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        console.log(
          'Notification caused app to open from quit state:',
          remoteMessage.notification,
        );
      }
    })
    .catch(error => console.log('failed', error));

  messaging().onMessage(async remoteMessage => {
    let msg:any=JSON.stringify(remoteMessage)
    let parse=JSON.parse(msg)
    
    console.log("====JSON.stringify(remoteMessage)====",JSON.parse(msg))
    Alert.alert(parse.notification.title,parse.notification.body );
  });
};

export {
  getFcmToken,
  getFcmTokenFromLocalStorage,
 requestNotificationPermission,
  notificationListener,
};
