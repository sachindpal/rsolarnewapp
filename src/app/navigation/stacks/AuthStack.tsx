import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RsolarLoginPasswordLogic from '../../athentication/login/RsolarLoginPasswordLogic';
import RsolarLoginLogic from '../../athentication/login/RsolarLoginLogic';
import VerifyOtpSolar from '../../athentication/verifyOtp/verifyOtpSolar';


const Stack = createNativeStackNavigator();

const
    AuthenticationStack = () => {
        return (
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="RsolarLogin" component={RsolarLoginLogic} />
                <Stack.Screen name="RsolarLoginPassword" component={RsolarLoginPasswordLogic} />
                <Stack.Screen name="VerifyOtpSolar" component={VerifyOtpSolar} />
            </Stack.Navigator>
        );
    };

export default AuthenticationStack;