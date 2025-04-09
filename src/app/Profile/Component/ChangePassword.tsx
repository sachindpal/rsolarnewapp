import {Modal, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {CommonStyle} from '../../../asset/style/commonStyle';
import {CloseBlack} from '../../../asset/img';
import TextTranslation from '../../commonResources/component/CommonInput/TextTranslation';
import {FontStyle} from '../../../asset/style/FontsStyle';
import TextInputField from '../../commonResources/component/CommonInput/TextInputField';
import {useTranslation} from 'react-i18next';
import Button from '../../commonResources/component/CommonButton/Button';
import {
  errorFormate,
  postAuthReq,
} from '../../Service/APIServices/axoisService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {errorMessages} from '../../Service/ErrorMessages';

const ChangePassword = ({
  handleModalChangePassword,
  ChangePasswordModal,
  setChangePasswordSuccessModal,
}: any) => {
  const {t: translate} = useTranslation();
  const [changePassword, setchangePassword] = React.useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [formError, setformError] = React.useState<any>({});
  const [currentLang, setcurrentLang] = React.useState<any>('');

  React.useEffect(() => {
    async function getCurrentLangauge() {
      let current = await AsyncStorage.getItem('currentLangauge');
      setcurrentLang(current);
    }
    getCurrentLangauge();
  }, []);

  const validateValue = (key: string, val: string) => {
    if ((key == 'currentPassword' && val == '') || val == null) {
      let error = formError;
      error = {
        ...error,
        [key]: '__ERROR_CURRENT_PASSWORD__',
      };
      setformError(error);
      return false;
    } else if (key == 'currentPassword' && val.length < 8) {
      let error = formError;
      error = {
        ...error,
        [key]: '__PASSWORD_ERROR__',
      };
      setformError(error);
      return false;
    } else if ((key == 'newPassword' && val == '') || val == null) {
      let error = formError;
      error = {
        ...error,
        [key]: '__NEW_PASSWORD_ERROR__',
      };
      setformError(error);
      return false;
    } else if (key == 'newPassword' && val.length < 8) {
      let error = formError;
      error = {
        ...error,
        [key]: '__PASSWORD_ERROR__',
      };
      setformError(error);
      return false;
    } else if ((key == 'confirmPassword' && val == '') || val == null) {
      let error = formError;
      error = {
        ...error,
        [key]: '__RE_ENTER_PASSWORD_ERROR__',
      };
      setformError(error);
      return false;
    } else if (key == 'confirmPassword' && changePassword.newPassword !== val) {
      let error = formError;
      error = {
        ...error,
        [key]: '__COMFIRM_PASSWORD_VALIDATION__',
      };
      setformError(error);
      return false;
    } else {
      let error = formError;
      error = {
        ...error,
        [key]: '',
      };
      setformError(error);
      return true;
    }
  };

  const handleChangeForm = (key: string, val: string, name: string) => {
    let form = changePassword;
    form = {
      ...form,
      [key]: val,
    };
    setchangePassword(form);
    validateValue(key, val);
  };

  // -------------------validation logic ends--------------------------------------------

  // -------------------form submit and Api logic-------------------------------------------

  const validationOnSubmit = (ke: any, value: any) => {
    setformError((prevState: any) => ({
      ...prevState,
      [ke]: value,
    }));
  };

  const submitForm = () => {
    let isValid = true;
    if (
      changePassword.currentPassword == '' ||
      changePassword.currentPassword.length < 8
    ) {
      isValid = false;
      validationOnSubmit('currentPassword', '__ERROR_CURRENT_PASSWORD__');
    }

    if (
      changePassword.newPassword == '' ||
      changePassword.newPassword.length < 8
    ) {
      isValid = false;
      validationOnSubmit('newPassword', '__NEW_PASSWORD_ERROR__');
    }
    if (changePassword.confirmPassword != changePassword.newPassword) {
      isValid = false;
      validationOnSubmit(
        'confirmPassword',
        '__SIGNUP_RE_ENTER_PASSWORD_ERROR__',
      );
    }
    if (isValid) {
      console.log('form', changePassword);
      submitOtp();
    }
  };

  const submitOtp = () => {
    let body = {
      newPassword: changePassword.newPassword,
      currentPassword: changePassword.currentPassword,
    };
    postAuthReq('/user/change-password', body)
      .then((res: any) => {
        console.log('response from change password', res.data);
        handleModalChangePassword();
        setChangePasswordSuccessModal(true);
      })
      .catch(err => {
        console.log('error from change password', err.response.data);
        // setformError({currentPassword: err.response.data.message});
        if (err.response.data.error_type) {
          setformError({
            currentPassword:
              currentLang === 'hi'
                ? errorMessages[0].hi[err.response.data.error_type]
                : errorMessages[0].en[err.response.data.error_type],
          });
        }
      });
  };

  return (
    <Modal visible={ChangePasswordModal} transparent animationType="fade">
      <View
        style={[
          {
            flex: 1,
            justifyContent: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
          },
        ]}>
        <View style={CommonStyle.center_modal_view}>
          <View style={{alignItems: 'flex-end', paddingHorizontal: 8}}>
            <Pressable
              style={{alignItems: 'flex-end'}}
              onPress={handleModalChangePassword}>
              <CloseBlack />
            </Pressable>
          </View>
          <View>
            <TextTranslation
              style={[FontStyle.fontHeavy24, {textAlign: 'center'}]}
              text={'__CHANGE_PASSWORD__'}
            />
          </View>
          <View>
            <View>
              <TextInputField
                label={'__CURRENT_PASSWORD__'}
                placeholder={translate('__ENTER_CURRENT_PASSWORD__')}
                passwordIcon={true}
                error={formError.currentPassword}
                onSubmitEditingFunc={() => {
                  validateValue(
                    'currentPassword',
                    changePassword.currentPassword,
                  );
                }}
                onBlur={() => {
                  validateValue(
                    'currentPassword',
                    changePassword.currentPassword,
                  );
                }}
                onChangeText={val => {
                  handleChangeForm(
                    'currentPassword',
                    (val ?? '').toLowerCase(),
                    'currentPassword',
                  );
                }}
              />
            </View>
            <View>
              <TextInputField
                label={'__NEW_PASSWORD__'}
                placeholder={translate('__ENTER_PASSWORD_PLACEHOLDER__')}
                passwordIcon={true}
                error={formError.newPassword}
                onSubmitEditingFunc={() => {
                  validateValue('newPassword', changePassword.newPassword);
                }}
                onBlur={() => {
                  validateValue('newPassword', changePassword.newPassword);
                }}
                onChangeText={val => {
                  handleChangeForm(
                    'newPassword',
                    (val ?? '').toLowerCase(),
                    'newPassword',
                  );
                }}
              />
              <TextTranslation
                style={[FontStyle.fontMedium14LightGray, {marginTop: 4}]}
                text={'__PASSWORD_ERROR__'}
              />
            </View>
            <View>
              <TextInputField
                label={'__REENTER_PASSWORD__'}
                placeholder={translate('__RE_ENTER_PASSWORD_HERE__')}
                passwordIcon={true}
                onSubmitEditingFunc={() => {
                  validateValue(
                    'confirmPassword',
                    changePassword.confirmPassword,
                  );
                }}
                onBlur={() => {
                  validateValue(
                    'confirmPassword',
                    changePassword.confirmPassword,
                  );
                }}
                onChangeText={val => {
                  handleChangeForm(
                    'confirmPassword',
                    (val ?? '').toLowerCase(),
                    'confirmPassword',
                  );
                }}
                error={formError.confirmPassword}
              />
            </View>
            <View style={{marginTop: 24}}>
              <Button
                title="__UPDATE_PASSWORD__"
                fontSize={16}
                bgGreen
                onPress={submitForm}
              />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default React.memo(ChangePassword);

const styles = StyleSheet.create({});
