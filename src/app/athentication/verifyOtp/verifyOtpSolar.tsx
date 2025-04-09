import { View, Text, TextInput } from 'react-native'
import React from 'react'
import VerifyOtpRender from './VerifyOtpRender'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { errorFormate, postAuthReq, postUnAuthReq, setLocalStorage } from '../../Service/APIServices/axoisService';
import { useRoute } from '@react-navigation/native';
import { CommonContext } from '../../commonResources/Context/CommonContext';
import ForgetPasswordLogic from '../forgetPassword/ForgetPasswordLogic';
import VerifyOtpRenderSolar from './verifyOtpRenderSolar';

const VerifyOtpSolar = (props: any) => {
    const {hideWelcomeModal} = React.useContext(CommonContext);
    const route = useRoute()

    const [currentLang, setcurrentLang] = React.useState<any>("");
    const [resendOtp, setresendOtp] = React.useState(false)
    const [isloading, setisloading] = React.useState(false);

    async function getCurrentLangauge() {
        let current = await AsyncStorage.getItem("currentLangauge")
        setcurrentLang(current)
    }

    React.useEffect(() => {
        getCurrentLangauge()
    }, [
    ])
    // const [otp, setotp] = React.useState("")
    const [otp, setotp] = React.useState<string[]>(['', '', '', '']);
    const inputs = React.useRef<TextInput[]>([]);
    // error state
    const [formError, setformError] = React.useState<any>({});

    // -------------------form validation logic--------------------------------------------

    const validateValue = (key: string, val: string, name: string) => {
        if (val == '' || val == undefined || !val) {
            let error = formError;
            error = {
                ...error,
                [key]: '__ENTER_OTP__',
            };
            setformError(error)
            return false;
        } else {
            let error = formError;
            error = {
                ...error,
                [key]: '',
            };
            setformError(error)
            return true;
        }
    };

    const handleChangeOTP = (key: string, val: string, name: string, index: number) => {
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


    // -------------------validation logic ends--------------------------------------------

    // -------------------form submit and Api logic-------------------------------------------

    const submitOTP = () => {
        if (otp.join('').length-1<3) {
            setformError({ otp: '__ENTER_OTP__' })
        } else {
            if (props.route.params.screen == "ForgetPassword") {
                apiCallForForgotPasswardSubmitOTP()
                // props.navigation.navigate("CreateNewPassword")
            } else if (props.route.params.screen == "SignUp") {
                apiCallForSignUpSubmitOTP()
                // props.navigation.navigate("BottomTabBar",{screen:"HomeScreen",params:{
                //     screen:"welcome"
                // }})
            }
            // props.navigation.navigate('CreateNewPassword')
        }
    }

    const apiCallForSignUpSubmitOTP = async () => {
        setisloading(true)
        console.log("monile param ", props.route.params.mobile)
        let formData = {
            mobile: props.route.params.mobile,
            otp: otp.join(''),
        }
        console.log("otp from data", formData)

        await postAuthReq('/auth/verify-otp-login-solar', formData).then((res: any) => {
            let result = res.data
            console.log("OTP API", result)
            if (result.data.token) {
            setLocalStorage('solar_auth_Token', result.data.token);
            setLocalStorage('solar_customer_data', JSON.stringify(result.data.customerData));
            // navigation.replace('RsolarHome');
            props.navigation.navigate('RsolarHome')
            }

        }).catch((error) => {
            if(error.response.data.error_type){
                errorFormate(error.response.data.error_type)
              }
              setisloading(false)
            console.log("error otp =========>", error.response.data)
        })
    }


    const apiCallForForgotPasswardSubmitOTP = async () => {
        setisloading(true)
        let formData = {
            mobile: props.route.params.mobile,
            otp: otp.join(''),
        }
        console.log("otp from data", formData)

        await postUnAuthReq('/auth/password-otp-verify', formData).then((res: any) => {
            let result = res.data
            console.log("OTP API", result)
            if (result.data.token) {
                setLocalStorage("auth_Token", result.data.token)
            }
                props.navigation.navigate("CreateNewPassword")

        }).catch((error) => {
            if(error.response.data.error_type){
                errorFormate(error.response.data.error_type)
              }
            console.log("error otp =========>", error.response.data)
            setisloading(false)
        })
    }

    const apiCallResendOtp = async () => {
        let formData = {
            mobile: props.route.params.mobile,
        }
        if(props.route.params.screen == 'ForgetPassword'){
            await postUnAuthReq('/auth/forget-password', formData).then((res: any) => {
                let result = res.data
               
                
            }).catch((error) => {
                if(error.response.data.error_type){
                    errorFormate(error.response.data.error_type)
                  }
            })
        }else{
            
            await postAuthReq('/auth/send-otp', formData).then((res: any) => {
                let result = res.data
                console.log("resend otp", result)
            }).catch((error) => {
                if(error.response.data.error_type){
                    errorFormate(error.response.data.error_type)
                  }
            })
        }
        
    }

    const resendHandler = () => {
        setresendOtp(false)
        apiCallResendOtp()
    }

    return (
        <VerifyOtpRenderSolar submitOTP={submitOTP} validateValue={validateValue} handleChangeOTP={handleChangeOTP} otp={otp} formError={formError} currentLang={currentLang} resendOtp={resendOtp} setresendOtp={setresendOtp} resendHandler={resendHandler} inputs={inputs} mobileNum={props.route.params.mobile} isloading={isloading}/>
    )
}

export default VerifyOtpSolar