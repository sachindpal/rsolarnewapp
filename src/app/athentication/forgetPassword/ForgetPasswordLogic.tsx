import { View, Text } from 'react-native'
import React from 'react'
import ForgetPasswordRender from './ForgetPasswordRender'
import { postUnAuthReq,errorFormate } from '../../Service/APIServices/axoisService'

const ForgetPasswordLogic = (props: any) => {


    const [phoneNumber, setphoneNumber] = React.useState("")
    // error state
    const [formError, setformError] = React.useState<any>({});
    const [isloading, setisloading] = React.useState(false);

    // -------------------form validation logic--------------------------------------------

    const validateValue = (key: string, val: string, name: string) => {
        if (val == '' || val == undefined || !val) {
            let error = formError;
            error = {
                ...error,
                [key]: '__PHONE_VALIDATION__',
            };
            setformError(error)
            return false;
        } else if (key == 'phoneNumber' && val.length <10) {

            let error = formError;
            error = {
                ...error,
                [key]: '__PHONE_DIGIT__',
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

    const handleChangeNumber = (key: string, val: string, name: string) => {
        setphoneNumber(val)
        validateValue(key, val, name);
    };


    // -------------------validation logic ends--------------------------------------------

    // -------------------form submit and Api logic-------------------------------------------

    const submitNumber = () => {
        if (phoneNumber == "") {
            setformError({ phoneNumber: '__PHONE_VALIDATION__' })
        } else {
            console.log("form", phoneNumber)

            apiCallOnSubmitNumber()
        }

    }

    const apiCallOnSubmitNumber = async () => {
        setisloading(true)
        let formData = {
            mobile: phoneNumber,
        }
        await postUnAuthReq('/auth/forget-password', formData).then((res: any) => {
            let result = res.data
            console.log("forgot API", result.status_code)
            
            props.navigation.navigate("VerifyOtp", { mobile: phoneNumber, screen: "ForgetPassword" })
        }).catch((error) => {
            if(error.response.data.error_type){
                errorFormate(error.response.data.error_type)
              }
              console.log("======response===",error.response)
              setisloading(false)
        })
    }

    return (
        <ForgetPasswordRender submitNumber={submitNumber} validateValue={validateValue} handleChangeNumber={handleChangeNumber} phoneNumber={phoneNumber} formError={formError} isloading={isloading}/>
    )
}

export default ForgetPasswordLogic