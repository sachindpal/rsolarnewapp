import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CreateNewPasswordRender from './CreateNewPasswordRender'
import { errorFormate, postAuthReq } from '../../Service/APIServices/axoisService'
const CreateNewPasswordLogic = (props: any) => {
  const [createPasswordForm, setcreatePasswordForm] = React.useState({
    password: "",
    confirmPassword: ""
  })
  // error state
  const [formError, setformError] = React.useState<any>({});
  const [isloading, setisloading] = React.useState(false);

  // -------------------form validation logic--------------------------------------------

  const validateValue = (key: string, val: string, name: string) => {
    if (val == '' || val == undefined || !val) {
      let error = formError;
      error = {
        ...error,
        [key]: '__PASSWORD_ERROR__',
      };
      setformError(error)
      return false;
    } else if (key == 'password' && val.length < 8) {

      let error = formError;
      error = {
        ...error,
        [key]: '__PASSWORD_LENGTH__',
      };
      setformError(error)
      return false;
    } else if (key == 'confirmPassword' && createPasswordForm.password !== val) {
      let error = formError
      error = {
        ...error,
        [key]: "__COMFIRM_PASSWORD_VALIDATION__",
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

  const handleChangeForm = (key: string, val: string, name: string) => {
    let form = createPasswordForm;
    form = {
      ...form,
      [key]: val,
    };
    setcreatePasswordForm(form)
    validateValue(key, val, name);
  };

  const validationOnSubmit = (key: any, value: any) => {
    setformError((prevState: any) => ({
      ...prevState, [key]: value
    }))
  }

  // -------------------validation logic ends--------------------------------------------

  // -------------------form submit and Api logic-------------------------------------------

  const submitForm = () => {
    let isValid = true
    if (createPasswordForm.password.length == 0) {
      isValid = false
      validationOnSubmit("password", '__PASSWORD_VALIDATION__')
      // setformError({ password: '__PASSWORD_VALIDATION__', confirmPassword: "__RE_ENTER_PASSWORD_ERROR__" })
    }

    if (createPasswordForm.confirmPassword.length == 0) {
      isValid = false
      validationOnSubmit("confirmPassword", "__RE_ENTER_PASSWORD_ERROR__")
      // setformError({ password: '__PASSWORD_VALIDATION__', confirmPassword: "__RE_ENTER_PASSWORD_ERROR__" })
    }
    if (createPasswordForm.confirmPassword !=createPasswordForm.password) {
      isValid = false
      errorFormate('12')
      // setformError({ password: '__PASSWORD_VALIDATION__', confirmPassword: "__RE_ENTER_PASSWORD_ERROR__" })
    }

    if (isValid) {
      console.log("form", createPasswordForm)
      apiCallOnPasswordSubmit()
    }


  }

  const apiCallOnPasswordSubmit = async () => {
    setisloading(true)
    let formData = {
      password: createPasswordForm.password,
      confirm_password: createPasswordForm.confirmPassword
    }

    await postAuthReq("/auth/create-password", formData).then((res: any) => {
      let result = res.data
      console.log("create password", res.data)
      if (result && result.status_code) {
        props.navigation.navigate("BottomTabBar")
      }
    }).catch((error: any) => {
      console.log("create error", error.response.data.error_details)
      if(error.response.data.error_type){
        errorFormate(error.response.data.error_type)
      }
      setisloading(false)
    })


  }

  return (
    <CreateNewPasswordRender submitForm={submitForm} validateValue={validateValue} handleChangeForm={handleChangeForm} createPasswordForm={createPasswordForm} formError={formError} isloading={isloading}/>
  )
}

export default CreateNewPasswordLogic

