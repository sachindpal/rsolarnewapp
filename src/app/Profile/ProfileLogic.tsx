import {View, Text, Pressable} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import ProfileRender from './ProfileRender';
import {CommonContext} from '../commonResources/Context/CommonContext';
import UpdatePhoneNumber from './Component/UpdatePhoneNumber';
import CustomModal from '../commonResources/component/ModelPopUp/CustomModal';
import ChangeAddress from './Component/ChangeAddress';
import ChangePassword from './Component/ChangePassword';
import {
  getLocalStorageData,
  postAuthReq,
} from '../Service/APIServices/axoisService';
import SkeletonLoader from '../commonResources/component/SkeletonLoader';
import {ColorVariable, CommonStyle} from '../../asset/style/commonStyle';
import {CloseWhite, ShopingBag} from '../../asset/img';
import TextTranslation from '../commonResources/component/CommonInput/TextTranslation';
import {FontStyle} from '../../asset/style/FontsStyle';
import HeaderWithSearchBag from '../commonResources/component/Header/HeaderWithSearchBag';

export default function ProfileLogic(props: any) {
  const [updatePhoneNumberModal, setupdatePhoneNumberModal] = useState(false);
  const [updatePhoneNumberSuccessModal, setupdatePhoneNumberSuccessModal] =
    useState(false);
  const [ChangeAddressModal, setChangeAddressModal] = useState(false);
  const [ChangeAddressSuccessModal, setChangeAddressSuccessModal] =
    useState(false);

  const [ChangePasswordModal, setChangePasswordModal] = useState(false);
  const [ChangePasswordSuccessModal, setChangePasswordSuccessModal] =
    useState(false);

  // APi result
  const [userInfo, setuserInfo] = useState<any>({});
  const [isloading, setisloading] = useState(true);

  const navigateToCartScreen = () => {
    props.navigation.navigate('Cart');
  };
  const goBack = () => {
    props.navigation.goBack();
  };

  const handleModalUpdatePhone = () => {
    setupdatePhoneNumberModal(!updatePhoneNumberModal);
  };

  const handleModalUpdatePhoneSuccess = () => {
    setupdatePhoneNumberSuccessModal(!updatePhoneNumberSuccessModal);
  };
  const handleModalChangeAddress = () => {
    setChangeAddressModal(!ChangeAddressModal);
  };

  const handleModalChangeAddressSuccess = () => {
    setChangeAddressSuccessModal(!ChangeAddressSuccessModal);
    // setChangeAddressModal(!ChangeAddressModal);
  };
  const handleModalChangePassword = () => {
    setChangePasswordModal(!ChangePasswordModal);
  };

  const handleModalChangePasswordSuccess = () => {
    setChangePasswordSuccessModal(!ChangePasswordSuccessModal);
    // setChangePasswordModal(!ChangePasswordModal);
  };
  const {getItemsCount} = useContext(CommonContext);

  const userInfoFromApi = (languageId: any) => {
    postAuthReq('/user/user-info', {lang: languageId})
      .then((res: any) => {
        console.log('my profile ', res);
        setuserInfo(res?.data?.data[0]);
        setisloading(false);
      })
      .catch(err => {
        console.log('user info from profile', err);
      });
  };

  const getUserInfo = () => {
    getLocalStorageData('currentLangauge')
      .then((res: any) => {
        let lang = res == 'hi' ? 2 : 1;
        userInfoFromApi(lang);
      })
      .catch(err => {
        console.log('user info from profile', err);
      });
  };
  useEffect(() => {
    getUserInfo();
  }, [
    ChangeAddressSuccessModal,
    ChangePasswordSuccessModal,
    updatePhoneNumberSuccessModal,
  ]);

  return (
    <>
      <View>
        <HeaderWithSearchBag title={'__MYPROFILE__'} icon={false}  />
      </View>
      {!isloading ? (
        <>
          <ProfileRender
            handleModalUpdatePhone={handleModalUpdatePhone}
            handleModalChangeAddress={handleModalChangeAddress}
            handleModalChangePassword={handleModalChangePassword}
            userInfo={userInfo}
          />
          <UpdatePhoneNumber
            handleModalUpdatePhone={handleModalUpdatePhone}
            updatePhoneNumberModal={updatePhoneNumberModal}
            setupdatePhoneNumberSuccessModal={setupdatePhoneNumberSuccessModal}
          />
          <ChangeAddress
            handleModalChangeAddress={handleModalChangeAddress}
            ChangeAddressModal={ChangeAddressModal}
            setChangeAddressSuccessModal={setChangeAddressSuccessModal}
          />
          <ChangePassword
            handleModalChangePassword={handleModalChangePassword}
            ChangePasswordModal={ChangePasswordModal}
            setChangePasswordSuccessModal={setChangePasswordSuccessModal}
          />
          <CustomModal
            visible={updatePhoneNumberSuccessModal}
            onClose={handleModalUpdatePhoneSuccess}
            firstText="__PHONE_NUMBER_UPDATED__"
          />
          <CustomModal
            visible={ChangeAddressSuccessModal}
            onClose={handleModalChangeAddressSuccess}
            firstText="__ADDRESS_UPDATED__"
          />
          <CustomModal
            visible={ChangePasswordSuccessModal}
            onClose={handleModalChangePasswordSuccess}
            firstText="__PASSWORD_UPDATED__"
          />
        </>
      ) : (
        <>
          {Array.from({length: 4}).map((ite, index) => {
            return (
              <View style={{alignItems: 'center', marginTop: 24}} key={index}>
                <SkeletonLoader
                  width={'90%'}
                  height={82}
                  variant="box"
                  variant2="dark"
                />
              </View>
            );
          })}
        </>
      )}
    </>
  );
}
