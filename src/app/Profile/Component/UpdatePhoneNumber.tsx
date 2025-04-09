import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {
  ColorVariable,
  CommonStyle,
  commanRadius,
} from '../../../asset/style/commonStyle';
import {CloseBlack} from '../../../asset/img';
import {FontStyle} from '../../../asset/style/FontsStyle';
import TextTranslation from '../../commonResources/component/CommonInput/TextTranslation';
import {useTranslation} from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Button from '../../commonResources/component/CommonButton/Button';
import CountDownTimer from '../../commonResources/component/CountDownTimer/CountDownTimer';
import TextInputField from '../../commonResources/component/CommonInput/TextInputField';
import {
  errorFormate,
  postAuthReq,
} from '../../Service/APIServices/axoisService';
import {errorMessages} from '../../Service/ErrorMessages';
// import {ColorSpace} from 'react-native-reanimated';

const UpdatePhoneNumber = ({
  handleModalUpdatePhone,
  updatePhoneNumberModal,
  setupdatePhoneNumberSuccessModal,
}: any) => {
  const {t: translate} = useTranslation();

  const [showPhoneNumber, setshowPhoneNumber] = useState(false);
  const [showOTP, setshowOTP] = useState(false);
  const [passwordField, setpasswordField] = useState('');
  const [errorpasswordField, seterrorpasswordField] = useState<any>('');
  const [phoneNoField, setphoneNoField] = useState('');
  const [errorphoneNoField, seterrorphoneNoField] = useState('');

  //   verify otp
  const [currentLang, setcurrentLang] = React.useState<any>('');
  const [resendOtp, setresendOtp] = React.useState(false);

  async function getCurrentLangauge() {
    let current = await AsyncStorage.getItem('currentLangauge');
    setcurrentLang(current);
  }

  React.useEffect(() => {
    getCurrentLangauge();
  }, []);

  const [otp, setotp] = React.useState<string[]>(['', '', '', '']);
  const inputs = React.useRef<TextInput[]>([]);
  // error state
  const [formError, setformError] = React.useState<any>({});

  const validateValue = (key: string, val: string, name: string) => {
    if (val == '' || val == undefined || !val) {
      let error = formError;
      error = {
        ...error,
        [key]: '__ENTER_OTP__',
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

  const handleChangeOTP = (
    key: string,
    val: string,
    name: string,
    index: number,
  ) => {
    validateValue(key, val, name);
    // setotp(val)
    const newOtp = [...otp];
    newOtp[index] = val;
    setotp(newOtp);

    // Move focus to the next box if the current one has a value
    if (val && index < newOtp.length - 1) {
      inputs.current[index + 1].focus();
    }
  };
  // const submitOTP = () => {
  //   if (otp.join('').length - 1 < 3) {
  //     setformError({otp: '__ENTER_OTP__'});
  //   } else {
  //     console.log('otp verified');
  //     handleModalUpdatePhone();
  //     setupdatePhoneNumberSuccessModal(true);
  //   }
  // };

  const passwordCheck = () => {
    let body = {
      password: passwordField,
    };
    if (passwordField === '') {
      seterrorpasswordField('__ENTER_YOUR_PASSWORD__');
    } else if (passwordField.length - 1 < 7) {
      seterrorpasswordField('__PASSWORD_ERROR__');
    } else {
      postAuthReq('/user/check-password', body)
        .then((res: any) => {
          console.log('response from password check', res.data);
          setshowPhoneNumber(true);
        })
        .catch((err: any) => {
          console.log(
            'error from password check',
            err.response.data.error_type,
          );
          if (err.response.data.error_type) {
            seterrorpasswordField(
              currentLang == 'hi'
                ? errorMessages[0].hi[err.response.data.error_type]
                : errorMessages[0].en[err.response.data.error_type],
            );
            
          }
        });
    }
  };

  const updateMobileNo = () => {
    let body = {
      mobile: phoneNoField,
    };

    if (phoneNoField === '') {
      seterrorphoneNoField('__PHONE_VALIDATION__');
    } else if (phoneNoField.length - 1 < 9) {
      seterrorphoneNoField('__PHONE_DIGIT__');
    } else {
      postAuthReq('/user/send-otp', body)
        .then((res: any) => {
          console.log('response from update number', res.data);
          setshowPhoneNumber(false);
          setshowOTP(true);
        })
        .catch(err => {
          console.log('error from mobile check', err.response);
          if (err.response.data.error_type) {
            seterrorphoneNoField(
              currentLang === 'hi'
                ? errorMessages[0].hi[err.response.data.error_type]
                : errorMessages[0].en[err.response.data.error_type],
            );
          }
        });
    }
  };
  const resendOtpFunction = () => {
    let body = {
      mobile: phoneNoField,
    };
    postAuthReq('/user/send-otp', body)
      .then((res: any) => {
        console.log('response from update number', res.data);
        setresendOtp(false);
      })
      .catch(err => {
        console.log('error from mobile check', err.response.data.error_type);
        if (err.response.data.error_type) {
          errorFormate(err.response.data.error_type);
        }
      });
  };

  const submitOtp = () => {
    let body = {
      mobile: phoneNoField,
      otp: otp.join(''),
    };

    if (otp.join('').length - 1 < 3) {
      setformError({otp: '__ENTER_OTP__'});
    } else {
      // console.log('otp verified');
      postAuthReq('/user/verify-otp', body)
        .then((res: any) => {
          console.log('response from otp verify', res.data);
          handleModalUpdatePhone();
          setupdatePhoneNumberSuccessModal(true);
        })
        .catch(err => {
          console.log('error from otp submit update', err.response.data);
          if (err.response.data.error_type) {
            errorFormate(err.response.data.error_type);
          }
        });
    }
  };

  const validatePhoneValue = (val: string) => {
    setphoneNoField(val);
    if (val == '' || val == null) {
      seterrorphoneNoField('__PHONE_VALIDATION__');
    } else if (val.length < 10) {
      seterrorphoneNoField('__PHONE_DIGIT__');
    } else {
      seterrorphoneNoField('');
    }
  };

  const validatepasswordValue = (val: string) => {
    setpasswordField(val);
    if (val.length < 8) {
      seterrorpasswordField('__PASSWORD_ERROR__');
    } else {
      seterrorpasswordField('');
    }
  };

  return (
    <Modal visible={updatePhoneNumberModal} transparent animationType="fade">
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
              onPress={handleModalUpdatePhone}>
              <CloseBlack />
            </Pressable>
          </View>
          <View>
            <TextTranslation
              style={[FontStyle.fontHeavy24, {textAlign: 'center'}]}
              text={'__UPDATE_PHONE_NUMBER__'}
            />
          </View>
          {/* password */}
          {!showPhoneNumber && !showOTP ? (
            <View>
              <View style={{marginTop: 16}}>
                <TextInputField
                  label={'__ENTER_YOUR_PASSWORD__'}
                  placeholder={translate('__PASSWORD__')}
                  passwordIcon
                  onChangeText={e => validatepasswordValue(e)}
                  error={errorpasswordField}
                />
              </View>

              <View style={{marginTop: 24}}>
                <Button
                  title={translate('__CONTINUE__')}
                  bgGreen
                  fontSize={16}
                  onPress={passwordCheck}
                />
              </View>
            </View>
          ) : null}

          {showPhoneNumber && !showOTP ? (
            <View>
              <View style={{marginTop: 16}}>
                <TextInputField
                  label={'__PASSWORD_TEXT__'}
                  placeholder={translate('__PHONE_PLACEHOLDER__')}
                  phoneNumberField
                  onChangeText={e => validatePhoneValue(e)}
                  error={errorphoneNoField}
                />
                <TextTranslation
                  style={[
                    FontStyle.fontMedium14,
                    {color: ColorVariable.gray, marginTop: 8},
                  ]}
                  text={'__PHONE_NO_OTP_CONFIRM__'}
                />
              </View>
              <View style={{marginTop: 24}}>
                <Button
                  title={translate('__CONTINUE__')}
                  bgGreen
                  fontSize={16}
                  onPress={updateMobileNo}
                />
              </View>
            </View>
          ) : null}

          {/* otp */}
          {!showPhoneNumber && showOTP ? (
            <View>
              <View
                style={{
                  paddingTop: 16,
                  paddingBottom: 24,
                  paddingHorizontal: 8,
                }}>
                { currentLang == 'hi' ? (
                  <>
                    <Text
                      style={[FontStyle.fontMedium15, {textAlign: 'center'}]}>
                      हमने पुष्टि करने के लिए इस नंबर {phoneNoField} पर एक ओटीपी
                      भेजा है
                    </Text>
                  </>
                ) : (
                  <>
                    <Text
                      style={[FontStyle.fontMedium15, {textAlign: 'center'}]}>
                      We have sent an OTP to this number {phoneNoField} to
                      confirm
                    </Text>
                  </>
                )}
              </View>
              {/* phone  */}
              <View style={styles.otpView}>
                {otp.map((digit: any, index: any) => (
                  <TextInput
                    key={index}
                    style={[
                      styles.box,
                      {
                        borderColor: formError.otp ? '#ff8181' : '#cacfe3',
                      },
                      FontStyle.fontMedium16,
                    ]}
                    maxLength={1}
                    keyboardType="numeric"
                    onChangeText={val => {
                      handleChangeOTP(
                        'otp',
                        (val ?? '').toLowerCase(),
                        'otp',
                        index,
                      );
                    }}
                    value={digit}
                    ref={(input: any) => {
                      inputs.current[index] = input;
                    }}
                  />
                ))}
              </View>
              <View style={{alignItems: 'center'}}>
                {formError.otp && (
                  <TextTranslation
                    style={[
                      FontStyle.fontMedium16,
                      {color: 'red', paddingTop: 4},
                    ]}
                    text={formError.otp}
                  />
                )}
              </View>
              <View style={{paddingTop: 24}}>
                <Button
                  title="__SUBMIT__"
                  loader={false}
                  bgGreen
                  fontSize={16}
                  onPress={submitOtp}
                />
              </View>
              <View style={styles.timer}>
                {resendOtp ? (
                  <Text style={FontStyle.fontMedium16}>0:00</Text>
                ) : (
                  <CountDownTimer
                    newStyle={FontStyle.fontHeavy15}
                    seconds={60}
                    timerStart={true}
                    trigger={() => setresendOtp(true)}
                  />
                )}
              </View>
              <View style={styles.timer}>
                {resendOtp ? (
                  <Text
                    style={[
                      FontStyle.fontMedium18,
                      {textDecorationLine: 'underline'},
                    ]}
                    onPress={resendOtpFunction}>
                    Resend OTP
                  </Text>
                ) : (
                  <Text
                    style={[
                      FontStyle.fontMedium18,
                      {color: '#afafaf', textDecorationLine: 'underline'},
                    ]}>
                    Resend OTP
                  </Text>
                )}
              </View>
            </View>
          ) : null}
        </View>
      </View>
    </Modal>
  );
};

export default React.memo(UpdatePhoneNumber);

const styles = StyleSheet.create({
  otpView: {
    flexDirection: 'row',

    alignSelf: 'center',
  },
  timer: {
    alignItems: 'center',
    height: 54,
    justifyContent: 'center',
    marginTop: 8,
  },
  box: {
    borderWidth: 1,
    borderColor: '#7E7E7E',
    width: 41,
    height: 54,
    marginRight: 8,
    textAlign: 'center',
    borderRadius: 6,
    borderStyle: 'solid',
    padding: 16,
  },
});
