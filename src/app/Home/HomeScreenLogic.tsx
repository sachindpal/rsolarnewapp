import React, {useContext, useEffect, useState} from 'react';
import HomeScreenRender from './HomeScreenRender';
import {CommonContext} from '../commonResources/Context/CommonContext';
import {
  getLocalStorageData,
  postAuthReq,
  requestLocationPermission,
  setLocalStorage,
  getUnAuthReqest,
} from '../Service/APIServices/axoisService';
import Geolocation from '@react-native-community/geolocation';
import {obj} from '../Service/CommonConstant';
import WelcomeScreenRender from '../athentication/welcome/WelcomeScreenRender';

const HomeScreenLogic = (props: any) => {
  const [agriProductModel, setagriProductModel] = React.useState(false);
  const {isWelcomeModalVisible, hideWelcomeModal} = useContext(CommonContext);
  const [languageId, setlanguageId] = React.useState(1);
  const [stateId, setStateId] = React.useState<any>('-1');
  const [isGeoPermission, setGeoPermission] = React.useState<any>(false);
  const [weatherInfo, setWeatherInfo] = React.useState<any>([]);
  const [latLong, setSetLatLong] = React.useState<any>([]);
  const [token, settoken] = useState()

  const agriModalVisible = () => {
    setagriProductModel(!agriProductModel);
  };
  const openCallPopup = () => {
    props.navigation.navigate('CallPopUp');
  };
  const navigateToCartScreen = () => {
    props.navigation.navigate('Cart');
  };

  const {getItemsCount, getStateId} = useContext(CommonContext);

  React.useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      permissionGeoLocation();

      getLocalStorageData('currentLangauge').then(data => {
        setlanguageId(data == 'hi' ? 2 : 1);
      });

      getLocalStorageData('auth_Token').then((authToken:any) => {
        settoken(authToken)
        if (authToken) {
          postAuthReq('/user/user-info', {lang: languageId})
            .then(async data => {
              if (data?.data?.data[0]) {
                if (data?.data?.data[0].stateid == 1) {
                  if (
                    data?.data?.data[0].districtid == 1 ||
                    data?.data?.data[0].districtid == 2 ||
                    data?.data?.data[0].districtid == 3
                  ) {
                    setStateId(0);
                    setLocalStorage('current_state', "0");
                  } else {
                    setStateId(data?.data?.data[0].stateid);
                    setLocalStorage('current_state', data?.data?.data[0].stateid);
                  }
                } else {
                  setStateId(data?.data?.data[0].stateid);
                  setLocalStorage('current_state', JSON.stringify(data?.data?.data[0].stateid));
                }
                await setLocalStorage(
                  'userInfo',
                  JSON.stringify(data.data.data[0]),
                );
              } else if (isGeoPermission) {
                setStateFromLocation();
              }
            })
            .catch(err => {
              console.log('err', err);
            });
        } else {
          setStateFromLocation();
          setLocalStorage('current_state', "-1");
          //  props.navigation.navigate("LoginPopup")
        }
      });
    });
    // setLocalStorage('current_state', stateId);
    return unsubscribe;
  }, [props.navigation]);

  const permissionGeoLocation = async () => {
    requestLocationPermission().then(async (data: any) => {
      setGeoPermission(true);
      if (data == true) {
        await Geolocation.getCurrentPosition(async info => {
          setSetLatLong({
            lat: info?.coords?.latitude,
            long: info?.coords?.longitude,
          });

          setWeatherInfo(info);
          setLocalStorage('setWeatherInfo', JSON.stringify(info));
        });
      }
    });
  };

  useEffect(() => {
    getLocalStorageData('auth_Token').then(authToken => {
      if (authToken == null) {
        props.navigation.navigate('LoginPopup');
      }
    });
  }, []);

  const setStateFromLocation = () => {
    getUnAuthReqest(`/auth/state-list?lang=${languageId}`).then(
      async states => {
        var stateLists: any = states.data.data.statList;

        if (stateLists.length > 0) {
          var json: any = await getUnAuthReqest(
            `${obj.locationApiUrl}?latlng=${latLong.lat},${latLong.long}&key=${obj.locationKey}`,
          );
          var addressFromApi = json.data.results[0].formatted_address;
          if (json?.data?.results[0]?.formatted_address) {
            for (let index = 0; index < stateLists.length; index++) {
              if (addressFromApi.includes(stateLists[index].statename)) {
                if (stateLists[index].stateid == 1) {
                  if (
                    addressFromApi.includes('Dhar') ||
                    addressFromApi.includes('Khargoan') ||
                    addressFromApi.includes('Barwani')
                  ) {
                    setStateId(0);
                    getStateId(0);
                  } else {
                    setStateId(stateLists[index].stateid);
                    getStateId(stateLists[index].stateid);
                  }
                } else {
                  setStateId(stateLists[index].stateid);
                  getStateId(stateLists[index].stateid);
                }
              }
            }
          }
        }
      },
    );
  };

  return (
   <>
    <HomeScreenRender
      openCallPopup={openCallPopup}
      agriModalVisible={agriModalVisible}
      agriProductModel={agriProductModel}
      navigateToCartScreen={navigateToCartScreen}
      getItemsCount={getItemsCount}
      lang={languageId}
      stateId={stateId}
      weatherInfo={weatherInfo}
      isGeoPermission={isGeoPermission}
      token={token}
    />
    <WelcomeScreenRender
    welcomeModal={isWelcomeModalVisible}
    welcomeModalFuct={hideWelcomeModal}
  />
   </>
  );
};

export default HomeScreenLogic;
