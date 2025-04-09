import {View, Text} from 'react-native';
import React from 'react';
// import LoginRender from './LoginRender';

import {CommonStyle} from '../../../asset/style/commonStyle';
import {
  errorFormate,
  postUnAuthReq,
  setLocalStorage,
} from '../../Service/APIServices/axoisService';
import {useNavigation} from '@react-navigation/native';
import LoginPasswordRender from './LoginPassword';

const LoginPasswordLogic = (props:any) => {
  const navigation = useNavigation<any>();

  const [loginForm, setloginForm] = React.useState({
    password: '',
  });
  // error state
  const [formError, setformError] = React.useState<any>({});
  const [Error, setError] = React.useState(false);
  const [isloading, setisloading] = React.useState(false);

  // -------------------form validation logic--------------------------------------------

  const validateValue = (key: string, val: string, name: string) => {
    if (key == 'password' && val=='') {
      let error = formError;
      error = {
        ...error,
        [key]: '__PLEASE_PASSWORD_OR_OTP_PLACEHOLDER__',
      };
      setformError(error);
      setError(true);
      return false;
    } else {
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
  const submitOtp = ()=>{
    if(!Error){
      submitOtps()
    }
  }

  const submitOtps = ()=>{
    postUnAuthReq('/auth/verify-otp-login', {mobile: props.route.params.mobile,otp:loginForm.password}).then((res: any) => {
        let result = res.data
        console.log('this is response',result)

        if (result.data.token) {
            setLocalStorage('auth_Token', result.data.token);
            console.log('response data from login', result.data);
          }
          if (result?.data?.token) {
            navigation.navigate('BottomTabBar', {screen: 'HomeScreen'});
          }

    }).catch((error) => {
        if(error.response.data.error_type){
            errorFormate(error.response.data.error_type)
          }
    })
}

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

    if(loginForm.password.length == 4 ){
        submitOtp();
    }else{
    let isValid = true;
    
    if (loginForm.password.length == 0) {
      isValid = false;
      setformError((prevState: any) => ({
        ...prevState,
        password: '__PLEASE_PASSWORD_OR_OTP_PLACEHOLDER__',
      }));
      return false
    }

    if (isValid) {
      console.log('form', loginForm);
      //    navigation.navigate("BottomTabBar")
      apiCallOnSubmitForm();
    }
    }
    
  };

  // --------------Api for login-----------
  const apiCallOnSubmitForm = async () => {
    setisloading(true);
    let formData = {
      mobile: props.route.params.mobile,
      password: loginForm.password,
    };

    await postUnAuthReq('/auth/login', formData)
      .then((res: any) => {
        let result = res.data;
        console.log('response data from login', result.data);
        if (result.data?.isOtpVerified == false) {
          navigation.navigate('VerifyOtp', {
            mobile: props.route.params.mobile,
            screen: 'SignUp',
          });
        }
        if (result.data.token) {
          setLocalStorage('auth_Token', result.data.token);
          console.log('response data from login', result.data);
        }
        if (result?.data?.token) {
          navigation.navigate('BottomTabBar', {screen: 'HomeScreen'});
        }
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
      <LoginPasswordRender
        submitForm={submitForm}
        validateValue={validateValue}
        handleChangeForm={handleChangeForm}
        loginForm={loginForm}
        formError={formError}
        Error={Error}
        isloading={isloading}
        mobile={props.route.params.mobile}
      />
    </View>
  );
};

export default LoginPasswordLogic;
