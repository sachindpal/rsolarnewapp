import {View, Text} from 'react-native';
import React from 'react';
import LoginRender from './LoginRender';
import {CommonStyle} from '../../../asset/style/commonStyle';
import {
  errorFormate,
  postUnAuthReq,
  setLocalStorage,
} from '../../Service/APIServices/axoisService';
import {useNavigation} from '@react-navigation/native';
import RsolarLoginRender from './RsolarLoginRender';

const RsolarLoginLogic = () => {
  const navigation = useNavigation<any>();

  const [loginForm, setloginForm] = React.useState({
    phoneNumber: '',
    password: '',
  });
  // error state
  const [formError, setformError] = React.useState<any>({});
  const [Error, setError] = React.useState(false);
  const [isloading, setisloading] = React.useState(false);

  // -------------------form validation logic--------------------------------------------

  const validateValue = (key: string, val: string, name: string) => {
    if ((key == 'phoneNumber' && val == '') || val == null) {
      let error = formError;
      error = {
        ...error,
        [key]: '__PHONE_VALIDATION__',
      };
      setformError(error);
      setError(true);
      return false;
    } else if (key == 'phoneNumber' && val.length < 10) {
      let error = formError;
      error = {
        ...error,
        [key]: '__PHONE_DIGIT__',
      };
      setformError(error);
      setError(true);
      return false;
    }  else {
      let error = formError;
      error = {
        ...error,
        [key]: '',
      };
      setformError(error);
      setError(false);

      return true;
    }
  };

  const validationOnSubmit = (key: any, value: any) => {
    setformError((prevState: any) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const handleChangeForm = (key: string, val: string, name: string) => {
    let form = loginForm;
    form = {
      ...form,
      [key]: val,
    };
    setloginForm(form);
    validateValue(key, val, name);
  };

  // -------------------validation logic ends--------------------------------------------

  // -------------------form submit and Api logic-------------------------------------------

  const submitForm = () => {
    console.log("pressed")
    let isValid = true;
    if (loginForm.phoneNumber.length == 0) {
      isValid = false;
      validationOnSubmit('phoneNumber', '__PHONE_VALIDATION__');
    }
    // if (loginForm.password.length == 0) {
    //   isValid = false;
    //   setformError((prevState: any) => ({
    //     ...prevState,
    //     password: '__PASSWORD_VALIDATION__',
    //   }));
    // }

    if (isValid) {
      console.log('form', loginForm);
      //    navigation.navigate("BottomTabBar")
      apiCallOnSubmitForm();
    }
  };

  // --------------Api for login-----------
  const apiCallOnSubmitForm = async () => {
    // navigation.navigate('BottomTabBar', {screen: 'HomeScreen'});
    setisloading(true);
    let formData = {
      mobile: loginForm.phoneNumber,
      password: loginForm.password,
    };

    await postUnAuthReq('/auth/login-otp-solar', formData)
      .then((res: any) => {
        let result = res.data;
        console.log('response data from login', result.data);
       
        navigation.navigate('VerifyOtpSolar', {
          mobile: loginForm.phoneNumber,
          screen: 'SignUp',
        });
        
          
        
      })
      .catch(error => {
        console.log(
          'error.response.data.error_type',
          error.response.data.error_type,
        );
        if (error.response.data.error_type) {
          errorFormate(error.response.data.error_type);
        }
        setisloading(false);
      });
  };

  return (
    <View style={CommonStyle.mainView}>
      <RsolarLoginRender
        submitForm={submitForm}
        validateValue={validateValue}
        handleChangeForm={handleChangeForm}
        loginForm={loginForm}
        formError={formError}
        Error={Error}
        isloading={isloading}
      />
    </View>
  );
};

export default RsolarLoginLogic;
