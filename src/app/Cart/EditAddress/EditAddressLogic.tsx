import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import EditAddressRender from './EditAddressRender'
// import { distArray, stateName } from '../../AddressScreen/AddressScreenLogic'
import { useNavigation } from '@react-navigation/native'
import { getLocalStorageData, getUnAuthReqest, postAuthReq, setLocalStorage } from '../../Service/APIServices/axoisService'

export default function EditAddressLogic(props:any) {
  // console.log('jsdkfjkdsjfkj',props.route.params.sendData)
    const navigation = useNavigation<any>()

    const navigationToCheckOutScreen = () => {
        navigation.navigate("signIn", { screen: "CheckOutScreen", params:{paymentType:props.route.params.sendData.paymentType,uicDetails:props.route.params.sendData.uicDetails}})
    }

    const [districtList, setdistrictList] = React.useState<any>([]);
    //   state List
    const [stateList, setstateList] = React.useState<any>([]);
    //  tehsil list
    const [tehsilList, settehsilList] = React.useState<any>([]);
    //   village List
    const [villageList, setvillageList] = React.useState<any>([]);
  
    const [selectedState, setSelectedState] = React.useState<any>(null);
    const [selectedDist, setSelectedDist] = React.useState<any>(null);
    const [selectedTehsil, setSelectedTehsil] = React.useState<any>(null);
    const [selectedVillage, setSelectedVillage] = React.useState<any>(null);
    const [formData, setformData] = React.useState({
      address: '',
      pincode: '',
    });
  
    const [stateModelVisible, setstateModelVisible] = React.useState<any>(false);
    const [districtModelVisible, setdistrictModelVisible] =
      React.useState<any>(false);
    const [tehsilModelVisible, settehsilModelVisible] =
      React.useState<any>(false);
    const [villageModelVisible, setvillageModelVisible] =
      React.useState<any>(false);
  
    // error state
    const [formError, setformError] = React.useState<any>({});
  
    // loading state
    const [isLoadingstate, setisLoadingstate] = useState(true);
    const [isLoadingdistrict, setisLoadingdistrict] = useState(true);
    const [isLoadingtehsil, setisLoadingtehsil] = useState(true);
    const [isLoadingvillage, setisLoadingvillage] = useState(true);
    const [localUserData,setLocalUserData] = useState<any>({})
  
    const validationOnSubmit = (ke: any, value: any) => {
      setformError((prevState: any) => ({
        ...prevState,
        [ke]: value,
      }));
    };
  
    // model selection
    const onSelectState = (item: any) => {
      if (selectedState && selectedState.id === item.id) {
        setSelectedState(null);
        setSelectedDist(null);
        setSelectedTehsil(null);
        setSelectedVillage(null);
      } else {
        setSelectedState(item);
        getDistrictList(item.stateid, null);
        setSelectedDist(null);
        setSelectedTehsil(null);
        setSelectedVillage(null);
      }
    };
  
    const onSelectDist = (item: any) => {
      if (selectedDist && selectedDist.id === item.id) {
        setSelectedDist(null);
      } else {
        setSelectedDist(item);
        gettehsilList(item.stateid, item.districtid, null);
        setSelectedTehsil(null);
        setSelectedVillage(null);
      }
    };
    const onSelectVillage = (item: any) => {
      if (selectedDist && selectedDist.id === item.id) {
        setSelectedVillage(null);
      } else {
        setSelectedVillage(item);
      }
    };
    const onSelectTehsil = (item: any) => {
      if (selectedDist && selectedDist.id === item.id) {
        setSelectedTehsil(null);
      } else {
        setSelectedTehsil(item);
        getvillageList(item.stateid, item.districtid, item.tehsilid, null);
        setSelectedVillage(null);
      }
    };
  
    // handlemOdal
  
    const handleModal = (option: string) => {
      if (option === 'state') {
        setstateModelVisible(!stateModelVisible);
      } else if (option == 'dist') {
        setdistrictModelVisible(!districtModelVisible);
      } else if (option == 'tehsil') {
        settehsilModelVisible(!tehsilModelVisible);
      } else if (option == 'village') {
        setvillageModelVisible(!villageModelVisible);
      }
    };
    const modalClose = () => {
      if (stateModelVisible) {
        setstateModelVisible(!stateModelVisible);
      } else if (districtModelVisible) {
        setstateModelVisible(!districtModelVisible);
      } else if (tehsilModelVisible) {
        settehsilModelVisible(!tehsilModelVisible);
      } else if (villageModelVisible) {
        setvillageModelVisible(!villageModelVisible);
      }
    };
  
    const validateValue = (key: string, val: string) => {
      if ((key == 'address' && val == '') || val == null) {
        let error = formError;
        error = {
          ...error,
          [key]: '__ADDRESS_ERROR__',
        };
        setformError(error);
        return false;
      } else if ((key == 'pincode' && val == '') || val == null) {
        let error = formError;
        error = {
          ...error,
          [key]: '__PINCODE_ERROR__',
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
  
    const handleChangeForm = (key: string, val: string) => {
      let form = formData;
      form = {
        ...form,
        [key]: val,
      };
      setformData(form);
      validateValue(key, val);
    };
  
    const onSubmit = () => {
      if (stateModelVisible) {
        setformError({selectState: null});
        setstateModelVisible(!stateModelVisible);
      } else if (districtModelVisible) {
        setformError({selectdist: null});
        setdistrictModelVisible(!districtModelVisible);
      } else if (tehsilModelVisible) {
        setformError({selectTehsil: null});
        settehsilModelVisible(!tehsilModelVisible);
      } else if (villageModelVisible) {
        setformError({selectVillage: null});
        setvillageModelVisible(!villageModelVisible);
      }
    };
  
    const goBack = () => {
      navigation.goBack();
    };
  
    const getUserAddress = async () => {
      getLocalStorageData('userInfo')
        .then((res: any) => {
          let userData = JSON.parse(res);

          console.log('user ifo===========>', userData);
          if (userData) {
            setLocalUserData(userData)
            setformData({
              address: userData.address,
              pincode: userData.user_pincode,
            });
          }
  
          getStateList(userData.stateid),
            getDistrictList(userData.stateid, userData.districtid);
          gettehsilList(userData.stateid, userData.districtid, userData.tehsilid);
          getvillageList(
            userData.stateid,
            userData.districtid,
            userData.tehsilid,
            userData.villageid,
          );
        })
        .catch(err => {
          console.log('user ifo===========>', err);
        });
    };
  
    const getStateList = async (id: any) => {
      let langauge = await getLocalStorageData('currentLangauge');
      let lang = langauge == 'hi' ? 2 : 1;
      getUnAuthReqest(`/auth/state-list?lang=${lang}`)
        .then((res: any) => {
          let result = res.data;
          setstateList(result.data.statList);
  
          let filtered = result.data.statList.filter((item: any) => {
            return item.stateid == id;
          });
          setSelectedState(filtered[0]);
          setisLoadingstate(false);
        })
        .catch(error => {
          console.log('stateList api Error=========>', error.response.data);
        });
    };
  
    const getDistrictList = async (stateId: number, id: any) => {
      setisLoadingdistrict(true);
      let langauge = await getLocalStorageData('currentLangauge');
      let lang = langauge == 'hi' ? 2 : 1;
      getUnAuthReqest(`/auth/district-list?stateId=${stateId}&lang=${lang}`)
        .then(res => {
          let result = res.data;
          setdistrictList(result.data.districtList);
          if (id !== null) {
            let filtered = result.data.districtList.filter((item: any) => {
              return item.districtid == id;
            });
            setSelectedDist(filtered[0]);
          }
          setisLoadingdistrict(false);
        })
        .catch(error => {
          console.log('districtList api Error=========>', error.response.data);
        });
    };
  
    const gettehsilList = async (
      stateId: string,
      districtId: string,
      id: any,
    ) => {
      setisLoadingtehsil(true);
      let langauge = await getLocalStorageData('currentLangauge');
      let lang = langauge == 'hi' ? 2 : 1;
  
      getUnAuthReqest(
        `/auth/tehsil-list?stateId=${stateId}&lang=${lang}&districtId=${districtId}`,
      )
        .then(res => {
          let result = res.data;
          settehsilList(result.data.tehsilList);
          if (id !== null) {
            let filtered = result.data.tehsilList.filter((item: any) => {
              return item.tehsilid == id;
            });
            setSelectedTehsil(filtered[0]);
          }
          setisLoadingtehsil(false);
        })
        .catch(error => {
          console.log('districtList api Error=========>', error.response.data);
        });
    };
    const getvillageList = async (
      stateId: string,
      districtId: string,
      tehsilId: string,
      id: any,
    ) => {
      setisLoadingvillage(true);
      let langauge = await getLocalStorageData('currentLangauge');
      let lang = langauge == 'hi' ? 2 : 1;
      getUnAuthReqest(
        `/auth/village-list?stateId=${stateId}&lang=${lang}&districtId=${districtId}&tehsilId=${tehsilId}`,
      )
        .then(res => {
          let result = res.data;
          setvillageList(result.data.villageList);
          if (id !== null) {
            let filtered = result.data.villageList.filter((item: any) => {
              return item.villageid == id;
            });
            setSelectedVillage(filtered[0]);
          }
          setisLoadingvillage(false);
        })
  
        .catch(error => {
          console.log('districtList api Error=========>', error.response.data);
        });
    };
  
    useEffect(() => {
      getUserAddress();
      // getStateList();
    }, []);
  
    const validationOnButtonClick = () => {
      let isValid = true;
      if (selectedTehsil == null) {
        isValid = false;
        validationOnSubmit('selectTehsil', '__TEHSIL_ERROR__');
      }
      if (formData.address.length == 0) {
        isValid = false;
        validationOnSubmit('address', '__ADDRESS_ERROR__');
      }
      if (formData.pincode.length == 0) {
        isValid = false;
        validationOnSubmit('pincode', '__PINCODE_ERROR__');
      }
      if (selectedVillage == null) {
        isValid = false;
        validationOnSubmit('selectVillage', '__VILLAGE_ERROR__');
      }
      if (selectedState == null) {
        isValid = false;
        validationOnSubmit('selectState', '__STATE_ERROR__');
      }
      if (selectedDist == null) {
        isValid = false;
        validationOnSubmit('selectdist', '__DISTRICT_ERROR__');
      }
      return isValid;
    };

    const submitForm = () => {

       

        if (validationOnButtonClick()) {
          let body = {
            address: formData.address,
            stateid: selectedState.stateid.toString(),
            districtid: selectedDist.districtid.toString(),
            pincode: formData.pincode,
            tehsilid: selectedTehsil.tehsilid.toString(),
            villageid: selectedVillage.villageid.toString(),
            isCheckout: true,
          };
          postAuthReq('/user/update-uic-address', body)
            .then(res => {
              console.log('APi response==from address=====> ', res.data);
              if (res.data.status === 'success') {
                localUserData.address= formData.address,
                localUserData.stateid= selectedState.stateid.toString(),
                localUserData.districtid= selectedDist.districtid.toString(),
                localUserData.user_pincod= formData.pincode,
                localUserData.tehsilid= selectedTehsil.tehsilid.toString(),
                localUserData.villageid= selectedVillage.villageid.toString(),
                setLocalStorage('userInfo',JSON.stringify(localUserData));
                // setLocalStorage('current_state',selectedState.stateid.toString());
                if (selectedState.stateid == 1) {
                  if (
                    selectedDist.districtid == 1 ||
                    selectedDist.districtid == 2 ||
                    selectedDist.districtid == 3
                  ) {
                    setLocalStorage('current_state', "0");
                  } else {
                    setLocalStorage('current_state', selectedState.stateid.toString());
                  }
                } else {
                  setLocalStorage('current_state', selectedState.stateid.toString());
                }
                
                navigationToCheckOutScreen();
              }
            })
            .catch(err => {
              console.log('error.response.data.error_type', err.response.data);
            });
        }

    }

    return (
        <EditAddressRender
            formError={formError}
            submitForm={submitForm}
            selectedDist={selectedDist}
            selectedTehsil={selectedTehsil}
            selectedState={selectedState}
            selectedVillage={selectedVillage}
            formData={formData}
            stateList={stateList}
            districtList={districtList}
            tehsilList={tehsilList}
            villageList={villageList}
            onSelectState={onSelectState}
            onSelectDist={onSelectDist}
            onSelectTehsil={onSelectTehsil}
            onSelectVillage={onSelectVillage}
            handleModal={handleModal}
            modalClose={modalClose}
            onSubmit={onSubmit}
            stateModelVisible={stateModelVisible}
            districtModelVisible={districtModelVisible}
            tehsilModelVisible={tehsilModelVisible}
            villageModelVisible={villageModelVisible}
            validateValue={validateValue}
            handleChangeForm={handleChangeForm}
            goBack={goBack}
            sendParams={props?.route?.params?.sendData}
        />
    )
}