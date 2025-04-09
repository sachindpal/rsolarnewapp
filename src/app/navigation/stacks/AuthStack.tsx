import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignUpLogic from '../../athentication/signup/SignUpLogic';
import LoginLogic from '../../athentication/login/LoginLogic';
import ForgetPasswordLogic from '../../athentication/forgetPassword/ForgetPasswordLogic';
import VerifyOtpLogic from '../../athentication/verifyOtp/VerifyOtpLogic';
import CreateNewPasswordLogic from '../../athentication/createNewPassword/CreateNewPasswordLogic';
import WelcomeScreenRender from '../../athentication/welcome/WelcomeScreenRender';
import LoginPasswordLogic from '../../athentication/login/LoginPasswordLogic';
import RsolarLogicLogic from '../../athentication/login/RsolarLoginLogic';
import RsolarLoginPasswordLogic from '../../athentication/login/RsolarLoginPasswordLogic';
import RsolarLoginLogic from '../../athentication/login/RsolarLoginLogic';
import VerifyOtpSolar from '../../athentication/verifyOtp/verifyOtpSolar';


const Stack = createNativeStackNavigator();

const
    AuthenticationStack = () => {
        return (
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="SignUp" component={SignUpLogic} />
                <Stack.Screen name="Login" component={LoginLogic} />
                <Stack.Screen name="RsolarLogin" component={RsolarLoginLogic} />
                <Stack.Screen name="LoginPassword" component={LoginPasswordLogic} />
                <Stack.Screen name="RsolarLoginPassword" component={RsolarLoginPasswordLogic} />
                <Stack.Screen name="ForgetPassword" component={ForgetPasswordLogic} />
                <Stack.Screen name="VerifyOtp" component={VerifyOtpLogic} />
                <Stack.Screen name="VerifyOtpSolar" component={VerifyOtpSolar} />
                <Stack.Screen name="CreateNewPassword" component={CreateNewPasswordLogic} />
            </Stack.Navigator>
        );
    };

export default AuthenticationStack;