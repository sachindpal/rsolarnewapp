import {View, Text} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
// import UICScreen from './UICScreen';

import {CommonContext} from '../../../commonResources/Context/CommonContext';
// import BalanceUICScreenRender from '../../../BalanceScreenForUICUser/BalanceUICScreenRender';
BalanceUICScreenRender
import HeaderWithSearchBar from '../../../commonResources/component/HeaderWithSearchBar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  getAuthReq,
  getLocalStorageData,
  getUnAuthReqest,
  isLoggedIn,
  postAuthReq,
} from '../../../Service/APIServices/axoisService';

import {of} from 'rxjs';
import { useIsFocused } from '@react-navigation/native';
import BalanceUICScreenRender from '../../../UIC/BalanceScreenForUICUser/BalanceUICScreenRender';
import UICScreen from '../../../UIC/UICScreen';
import UICSkeletonLoader from '../../../UIC/component/UICSkeletonLoader';
import UICNumberScreen from '../../../UIC/UICNumberScreen/UICNumberScreen';
import LearnMoreUicRender from './LearnMoreUicRender';

const LearnMoreUicLogic = (props: any) => {
  const {getItemsCount} = useContext(CommonContext);
  const [UICRenewStatus, setUICRenewStatus] = useState(false);
  const [UICStatusSuccessPopUp, setUICStatusSuccessPopUp] = useState(false);
  const [isLoggedInStatus, setisLoggedInStatus] = useState<any>(false);
  const [bannerImage, setbannerImage] = useState([]);
  const [bannerImageLoading, setbannerImageLoading] = useState(true);
  const [userStatus, setuserStatus] = useState('');
  const [isloadingUserStatus, setisloadingUserStatus] = useState(true);
  const [UICDetails, setUICDetails] = useState({});
  // const [transactionHistory, settransactionHistory] = useState([]);
  // const [rechargeHistory, setrechargeHistory] = useState<any>([]);
  const [currentLang, setcurrentLang] = useState('en');
  const [cropBanner, setcropBanner] = useState([]);
  // const [offset, setoffset] = useState(1);
  // console.log('==============ofsset value state=====', offset);
  const navigateToCartScreen = () => {
    props.navigation.navigate('Cart');
  };

  const focused=useIsFocused()


  

  const navigationToAddressScreen = () => {
   
      props.navigation.navigate('signIn', {
        screen: 'AddressScreen',
        params: {
          screen: 'UICRegistration',
        },
      });
    
  };

  useEffect(() => {
    if (props.route.params?.UICRenew) {
      setUICStatusSuccessPopUp(true);
    }
  }, [props.route.params?.UICRenew]);

  React.useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      let lang: any;
      getLocalStorageData('currentLangauge')
        .then((res: any) => {
          lang = res === 'hi' ? 2 : 1;
          setcurrentLang(res);
          getBannerImage(lang);
        })
        .catch(err => {});
      const checkLoginStatus = async () => {
        const isLogged = await isLoggedIn();
        setisLoggedInStatus(isLogged);
        if (isLogged) {
          getUICUserStatus(lang);
        }
      };
    //   checkLoginStatus();

      // getUICDetails();
    });

    return unsubscribe;
  }, [props.navigation]);

  // get Api for UIC Banner Images

  const getBannerImage = (lang: any) => {
    getUnAuthReqest(`/crops/get-uic-banner-images?lang=${lang}`)
      .then(res => {
        if (res.data.data) {
          console.log(
            'res.data.data.images=====================',
            res.data.data.images,
          );
          setbannerImage(res.data.data.images);
          setbannerImageLoading(false);
        }
      })
      .catch(err => {
        console.log('banner image respo', err.response);
        setbannerImageLoading(true);
      });
  };

  // get UIC status of user

  const getUICUserStatus = (lang: any) => {
    setisloadingUserStatus(true);
    let body = {};
    postAuthReq('/order/get-uic-details', body)
      .then(res => {
        setuserStatus(res.data.data.uicDetails.uicType);
        if (
          res.data.data.uicDetails.uicType === 'UIC_GOLD' ||
          res.data.data.uicDetails.uicType === 'UIC'
        ) {
          getUICDetails();
          getCropAnalysisBanner(lang);
        }
        setisloadingUserStatus(false);
      })
      .catch(err => {
        console.log('error from uic get status', err.response.data);
      });
  };

  // get uic customer details

  const getUICDetails = () => {
    getAuthReq('/uic/uic-details')
      .then(res => {
        // console.log('details respnse=============>', res.data.data);
        setUICDetails(res.data.data);
        setUICRenewStatus(res.data.data.showpopup);
      })
      .catch(error => {
        console.log('details respnse error=============>', error);
      });
  };



  const getCropAnalysisBanner = (lang: any) => {
    // let lang = currentLang == 'hi' ? 2 : 1;

    getAuthReq(`/crops/get-crop-analysis-banner?lang=${lang}`)
      .then(res => {
        let removeOther = res.data.data.notCompleted
          .concat(res.data.data.completed)
          .filter((item: any) => {
            return item.name != 'Other';
          });
        setcropBanner(removeOther);

        console.log('+++++++++++++++++response banner', res.data.data);
      })
      .catch(err => {
        console.log('res from banner error', err.response);
      });
  };


  return (
    <>
      <View style={{zIndex: 1, overflow: 'visible'}}>
        {/* <HeaderWithSearchBar
          navigateToCartScreen={navigateToCartScreen}
          itemInBag={getItemsCount}
          lang={currentLang=="hi"?2:1}
          token={isLoggedInStatus}

        /> */}
      </View>
      {isLoggedInStatus ? (
        <>
          {isloadingUserStatus ? (
            <UICSkeletonLoader />
          ) : (
            <>
              {userStatus === 'NON_UIC' ? (
                <LearnMoreUicRender
                  navigationToAddressScreen={navigationToAddressScreen}
                  bannerImage={bannerImage}
                  bannerImageLoading={bannerImageLoading}
                />
              ) : userStatus === 'UIC_GOLD' || userStatus === 'UIC' ? (
                <BalanceUICScreenRender
                  userStatus={userStatus}
                  UICRenewStatus={UICRenewStatus}
                  UICStatusSuccessPopUp={UICStatusSuccessPopUp}
                  setUICStatusSuccessPopUp={setUICStatusSuccessPopUp}
                  UICDetails={UICDetails}
                  cropBanner={cropBanner}
                />
              ) : null}
            </>
          )}
        </>
      ) : (
        <LearnMoreUicRender
          navigationToAddressScreen={navigationToAddressScreen}
          bannerImage={bannerImage}
          bannerImageLoading={bannerImageLoading}
        />
      )}
    </>
  );
};

export default LearnMoreUicLogic;
