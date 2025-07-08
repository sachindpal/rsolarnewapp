import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, {AxiosInstance, AxiosResponse} from 'axios';
import {Linking, PermissionsAndroid, Platform} from 'react-native';
import {errorMessages} from '../ErrorMessages';
import {showToast} from '../../commonResources/commanSnackbar/toastMessage';
// import {err} from 'react-native-svg';

  // const baseUrl ='http://ec2-43-204-145-202.ap-south-1.compute.amazonaws.com:4000/api';
// const baseUrl = 'https://mobileapinew.farmkart.com/api';
const baseUrl = 'http://192.168.1.9:4000/api';
const defaultOptions = {
  baseURL: baseUrl,
  headers: {
    'Content-Type': 'application/json',
    // 'device-token':  getLocalStorageData("deviceToken").then((res)=>{
    //   return res
    // }),
    appSessionId: '889hdjfhkjdjk',
  }, 
};

// Create instance for auth
let instance = axios.create(defaultOptions);

// create instance for unAuth
let instanceUnauth = axios.create(defaultOptions);

// Set the AUTH token and session Id for any request
instance.interceptors.request.use(async function (config) {
  const token = await getLocalStorageData('auth_Token');
  const temp_token = await getLocalStorageData('temp_auth_Token');
  const pass_token = token ? token : temp_token;
  const sessionId = await getLocalStorageData('sessionId');
  const deviceToken = await getLocalStorageData('deviceToken');
  console.log('pass_token',pass_token)

  config.headers.Authorization = pass_token ? `Bearer ${pass_token}` : '';
  config.headers.Sessionid = sessionId;
  config.headers['device-token'] = deviceToken;
  return config;
});

// Set the AUTH token and session Id for any request
instanceUnauth.interceptors.request.use(async function (config) {
  const sessionId = await getLocalStorageData('sessionId');
  const deviceToken = await getLocalStorageData('deviceToken')
    .then(res => {
      return res;
    })
    .catch(err => {
      console.log('error during fcm token');
    });
  config.headers.SessionId = sessionId;
  config.headers['device-token'] = deviceToken;
  return config;
});

// fetch data with authtoken and passing param

export const getAuthReq = (url: any) => {
  let get = instance.get(url);
  return get;
};

// post data with authtoken

export const postAuthReq = (url: any, body: any) => {
  console.log('instance',instance);
  let post = instance.post(url, body);
  return post;
};

// post req for unauth

export const postUnAuthReq = (url: any, body: any) => {
  let post = instanceUnauth.post(url, body);
  return post;
};

export const getUnAuthReqest = (url: any) => {
  return instanceUnauth.get(url);
};

export function axiosGet<T>(url: string): Promise<T> {
  return instanceUnauth
    .get<T>(url)
    .then((response: AxiosResponse<T>) => response.data)
    .catch(error => {
      throw new Error(`Error during fetching  ${error}`);
    });
}

// getting data from local storage

export async function getLocalStorageData(params: any) {
  let item;
  try {
    item = await AsyncStorage.getItem(params);
  } catch (e) {
    throw e;
  }
  return item; // Could be any value, including null.
}

// set data to local storage

export const setLocalStorage = (key: string, value: any) => {
  AsyncStorage.setItem(key, value);
};

export const removeItemLocalStorage = (key: string) => {
  AsyncStorage.removeItem(key);
};



export const errorFormate = async (error: any) => {
  let lang: any = 'en';
  let langData = await getLocalStorageData('currentLangauge');
  if (langData) {
    lang = langData;
  }
  var errorObj: any = errorMessages[0];

  var errorObj: any = errorObj[lang];

  var errorObj: any = errorObj[error];
  showToast('success', errorObj);
};

export function isLoggedIn() {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem('auth_Token')

      .then(res => {
        console.log(res);
        if (res !== null) {
          resolve(true);
        } else {
          resolve(false);
        }
      })
      .catch(err => reject(err));
  });
}

export function isSolarLoggedIn() {
  
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem('solar_auth_Token')

      .then(res => {
        console.log(res);
        if (res !== null) {
          resolve(true);
        } else {
          resolve(false);
        }
      })
      .catch(err => reject(err));
  });
}

export const onCallMobileNumber = () => {
  let phoneNumber = '';
  if (Platform.OS === 'android') {
    phoneNumber = `tel:${8823888238}`;
  } else {
    phoneNumber = `telprompt:${8823888238}`;
  }

  Linking.openURL(phoneNumber);
};
