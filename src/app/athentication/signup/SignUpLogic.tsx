import React from 'react'
import { axiosGet, getLocalStorageData, getUnAuthReqest, postUnAuthReq, setLocalStorage,errorFormate } from '../../Service/APIServices/axoisService';
import SignUpRender from './SignUpRender';
import { useNavigation } from '@react-navigation/native';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { stateListtypes } from '../../commonResources/dataTypes/DataTypes';
import { showToast } from '../../commonResources/commanSnackbar/toastMessage';
// import axios, {AxiosInstance, AxiosResponse} from 'axios';
import { useTranslation } from 'react-i18next';


const SignUpLogic = () => {

  const {t: translate} = useTranslation()

  const navigation = useNavigation<any>()

  // form value
  const [signupForm, setsignupForm] = React.useState({
    fullName: "",
    phoneNumber: "",
    password: "",
    confirmPassword: ""
  })
  const [isloading, setisloading] = React.useState(false);
  // stateList
  const [stateList, setstateList] = React.useState<any>([]);
  const [selectedState, setSelectedState] = React.useState<any>(null);


  // district list
  const [districtList, setdistrictList] = React.useState<any>([]);
  const [selectedDist, setSelectedDist] = React.useState<any>(null);

  // error state
  const [formError, setformError] = React.useState<any>({});
  //----------------------------- model for state and distrct-------------------------------------

  const [stateModelVisible, setstateModelVisible] = React.useState<any>(false);
  const [districtModelVisible, setdistrictModelVisible] = React.useState<any>(false);

  const onSelect = (item: any) => {
    if (selectedState && selectedState.id === item.id) {
      setSelectedState(null);
    } else {
      setSelectedState(item);
    }
  };

  const onSelectDist = (item: any) => {
    if (selectedDist && selectedDist.id === item.id) {
      setSelectedDist(null);
    } else {
      setSelectedDist(item);
    }
  };

  const onSubmitState = () => {

    setstateModelVisible(!stateModelVisible)
    getDistrictList()
  }

  const onSubmitDist = () => {
    setformError({ selectdist: null })

    setdistrictModelVisible(!districtModelVisible)
  }

  const modelClose = () => {
    if (stateModelVisible) {
      setstateModelVisible(false)
    } else {
      setdistrictModelVisible(false)
    }
  }
  // -------------------model logic ends--------------------------------------------


  // -------------------form validation logic--------------------------------------------

  const validateValue = (key: string, val: string) => {

    if (key == 'fullName' && val == "" || val == null) {
      let error = formError;
      error = {
        ...error,
        [key]: '__SIGNUP_NAME_ERROR__',
      };
      setformError(error)
      return false;
    } else if (key == 'phoneNumber' && val == "" || val == null) {

      let error = formError;
      error = {
        ...error,
        [key]: '__PHONE_VALIDATION__',
      };
      setformError(error)
      return false;
    } else if (key == 'phoneNumber' && signupForm.phoneNumber.length <= 8) {

      let error = formError;
      error = {
        ...error,
        [key]: '__PHONE_DIGIT__',
      };
      setformError(error)
      return false;
    } else if (key == 'password' && val == "" || val == null) {
      let error = formError
      error = {
        ...error,
        [key]: '__PASSWORD_VALIDATION__',
      };
      setformError(error)
      return false;
    } else if (key == 'password' && signupForm.password.length < 7) {
      let error = formError
      error = {
        ...error,
        [key]: '__PASSWORD_ERROR__',
      };
      setformError(error)
      return false;
    } else if (key == 'confirmPassword' && signupForm.password !== val) {
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
    let form = signupForm;
    form = {
      ...form,
      [key]: val,
    };
    setsignupForm(form)
    validateValue(key, val);

  };


  // -------------------validation logic ends--------------------------------------------

  // -------------------form submit and Api logic-------------------------------------------

  const validationOnSubmit = (ke: any, value: any) => {
    setformError((prevState: any) => ({
      ...prevState
      , [ke]: value
    }))
  }


  const submitForm = () => {

    let isValid = true
    if (signupForm.fullName.length == 0) {
      isValid = false
      validationOnSubmit("fullName", "__SIGNUP_NAME_ERROR__")
    }
    if (signupForm.phoneNumber.length == 0) {
      isValid = false
      validationOnSubmit("phoneNumber", "__PHONE_VALIDATION__")
    }
    if (signupForm.password.length == 0) {
      isValid = false
      validationOnSubmit("password", '__PASSWORD_VALIDATION__')
    }
    if (signupForm.password.length == 0) {
      isValid = false
      validationOnSubmit("confirmPassword", "__SIGNUP_RE_ENTER_PASSWORD_ERROR__")
    }
    if (selectedState == null) {
      isValid = false
      validationOnSubmit("selectState", '__STATE_ERROR__')
    }
    if (selectedDist == null) {
      isValid = false
      validationOnSubmit("selectdist", '__DISTRICT_ERROR__')
    }

    if (isValid) {
      console.log("form", signupForm)
      console.log("state", selectedState)
      console.log("dist", selectedDist)
      // navigation.navigate("VerifyOtp", { mobile: signupForm.phoneNumber, screen: "SignUp" })
      //   apiCallOnSubmitForm()
    }

    if (signupForm.fullName.length === 0 || signupForm.phoneNumber === "" || signupForm.password === "" || selectedState === null || selectedDist === null || signupForm.confirmPassword === "") {
      // setformError({ fullName: '__SIGNUP_NAME_ERROR__', phoneNumber: '__PHONE_VALIDATION__', password: '__PASSWORD_VALIDATION__', selectState: '__STATE_ERROR__', selectdist: '__DISTRICT_ERROR__', confirmPassword: "__SIGNUP_RE_ENTER_PASSWORD_ERROR__" })
    } else {
      console.log("form", signupForm)
      console.log("state", selectedState)
      console.log("dist", selectedDist)

      apiCallOnSubmitForm()
    }
  }

  // Api Call 

  const apiCallOnSubmitForm = async () => {
    setisloading(true)
    let formData = {
      full_name: signupForm.fullName,
      mobile: signupForm.phoneNumber,
      state: selectedState.stateid,
      district: selectedDist.districtid,
      password: signupForm.password
    }

    await postUnAuthReq('/auth/signup', formData).then((res: any) => {
      let result = res.data
      if (result.data.token) {
        setLocalStorage("temp_auth_Token", result.data.token)
        console.log("response data", result.data.token)
        // setLocalStorage("user_info", {
        //   full_name: signupForm.fullName,
        //   mobile: signupForm.phoneNumber
        // })
      }
      console.log('res',result.data)
      if (result.status == "success") {
        navigation.navigate("VerifyOtp", { mobile: signupForm.phoneNumber, screen: "SignUp" })
      }

    }).catch(async(error) => {
      if(error.response.data.error_type){
        errorFormate(error.response.data.error_type)
      }
      console.log("signError=========>", error.response.data)
      setisloading(false)
    })
  }

  // API Call for state list

  const getStateList = async () => {
    let langauge = await getLocalStorageData("currentLangauge")
    let lang = langauge == "hi" ? 2 : 1
    getUnAuthReqest(`/auth/state-list?lang=${lang}`).then((res: any) => {
      let result = res.data
      setstateList(result.data.statList)
    }).catch((error) => {
      console.log("stateList api Error=========>", error.response.data)
    })
  }
  function isAxiosError<ResponseType>(error: unknown): error is AxiosError<ResponseType> {
    return axios.isAxiosError(error);
  }
  const typesRequest = async () => {
    let langauge = await getLocalStorageData("currentLangauge")
    let lang = langauge == "en" ? 1 : 2
    axiosGet<stateListtypes>(`/auth/state-list?lang=${lang}`).then((response) => {
      console.log(response.data.statList)
      console.log("type of===============>", typeof response.data)
    }).catch((error) => {
      console.log("error from type list", error)
    })
  }




  // const typeStatic = async () => {
  //   try {
  //     // Make the axios fetch.
  //     const response: AxiosResponse<types> = await axios.get('http://192.168.1.13:4000/api/auth/state-list?lang=1', {
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'device-token': 'anandtest',
  //       }
  //     })
  //     const responseData: types = response.data;
  //     console.log("responde========>", responseData)
  //   } catch (error) {
  //     console.log(isAxiosError(error))
  //     if (axios.isAxiosError(error)) {
  //       // Handle Axios-specific errors

  //       console.error("Axios error:", error.message);
  //     } else {
  //       // Handle general errors

  //       console.error("General error:", error);
  //     }
  //   }

  // }

  const getDistrictList = async () => {
    let langauge = await getLocalStorageData("currentLangauge")

    let lang = langauge == "hi" ? 2 : 1
    getUnAuthReqest(`/auth/district-list?stateId=${selectedState.stateid}&lang=${lang}`).then((res) => {
      let result = res.data
      setdistrictList(result.data.districtList)
    }).catch((error) => {
      console.log("districtList api Error=========>", error.response.data)
    })
  }

  React.useEffect(() => {
    getStateList()
    typesRequest()
    // typeStatic()
  }, [])



  return (
    <SignUpRender signupForm={signupForm} formError={formError} validateValue={validateValue} handleChangeForm={handleChangeForm} modalVisibleState={stateModelVisible} selectedState={selectedState} onSelectState={onSelect} onSubmitState={onSubmitState} modelClose={modelClose}
      DataArrayState={stateList} modalVisibleDist={districtModelVisible} selectedDist={selectedDist} onSelectDist={onSelectDist} onSubmitDist={onSubmitDist}
      DataArrayDist={districtList} setstateModelVisible={setstateModelVisible} setdistrictModelVisible={setdistrictModelVisible} submitForm={submitForm} isloading={isloading} />
  )
}

export default SignUpLogic