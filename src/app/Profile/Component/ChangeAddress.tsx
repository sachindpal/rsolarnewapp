import {Modal, Pressable, StyleSheet, Text, View,Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import {CommonStyle} from '../../../asset/style/commonStyle';
import {CloseBlack} from '../../../asset/img';
import TextTranslation from '../../commonResources/component/CommonInput/TextTranslation';
import {FontStyle} from '../../../asset/style/FontsStyle';
import {ScrollView} from 'react-native-gesture-handler';
import TextInputField from '../../commonResources/component/CommonInput/TextInputField';
import {useTranslation} from 'react-i18next';
import Button from '../../commonResources/component/CommonButton/Button';
import ModelPopUp from '../../commonResources/component/ModelPopUp/ModelPopUp';
import {
  getLocalStorageData,
  getUnAuthReqest,
  postAuthReq,
  setLocalStorage,
} from '../../Service/APIServices/axoisService';
import SkeletonLoader from '../../commonResources/component/SkeletonLoader';
// import {distArray, stateName} from '../../AddressScreen/AddressScreenLogic';

const ChangeAddress = ({
  handleModalChangeAddress,
  ChangeAddressModal,
  setChangeAddressSuccessModal,
}: any) => {
  const {t: translate} = useTranslation();

  //  district list
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

  const validateValue = (key: string, val: string, name?: string) => {
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

  const handleChangeForm = (key: string, val: string, name: string) => {
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

  const validationOnButtonClick = () => {
    let isValid = true;
    if (selectedTehsil == null) {
      isValid = false;
      validationOnSubmit('selectTehsil', '__TEHSIL_ERROR__');
    }
    if (formData.address == '' || formData.address == null) {
      isValid = false;
      validationOnSubmit('address', '__ADDRESS_ERROR__');
    }
    if (formData.pincode == '' || formData.pincode == null) {
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
      console.log('body of address=>', body);
      postAuthReq('/user/update-uic-address', body)
        .then(res => {
          console.log('APi response==from address=====> ', res.data);
          if (res.data.status === 'success') {
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

            handleModalChangeAddress();
            setChangeAddressSuccessModal(true);
          }
        })
        .catch(err => {
          console.log('error.response.data.error_type', err.response.data);
        });
    }
  };

  const getUserAddress = async () => {
    getLocalStorageData('userInfo')
      .then((res: any) => {
        let userData = JSON.parse(res);
        console.log('user ifo===========>', userData);
        if (userData) {
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

  const Skeleton = () => {
    return (
      <View style={{paddingVertical: 16}}>
        <SkeletonLoader
          variant="box"
          variant2="dark"
          width={'90%'}
          height={54}
        />
      </View>
    );
  };

  return (
    <Modal visible={ChangeAddressModal} transparent animationType="fade">
      <View
        style={[
          {
            flex: 1,
            justifyContent: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
          },
        ]}>
        <View style={CommonStyle.center_modal_view}>
          <ScrollView
            style={{paddingLeft: 16, paddingRight: 16}}
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{flexGrow: 1}}>
            <View style={{alignItems: 'flex-end', paddingHorizontal: 8}}>
              <Pressable
                style={{alignItems: 'flex-end'}}
                onPress={handleModalChangeAddress}>
                <CloseBlack />
              </Pressable>
            </View>
            <View>
              <TextTranslation
                style={[FontStyle.fontHeavy24, {textAlign: 'center'}]}
                text={'__CHANGE_ADDRESS__'}
              />
            </View>

            {/* Chose state */}
            <View style={{paddingTop: 16}}>
              {/* <TextInputField
                label={'__SELECT_STATE__'}
                isDropdownLable={translate('__SELECT_STATE__')}
                isDropdown={true}
                selectedDropdownValue={selectedState}
                error={formError.selectState}
                dropDownFunction={() => handleModal('state')}
              /> */}
              <View style={{ flexDirection:'row',padding:8,marginBottom:16,borderRadius:6,borderWidth:1,borderStyle:'solid',borderColor:'#DCE0EF',gap:8,alignItems:'center' }}>
                
                                <Image
                                    source={require('../../../asset/img/updatedImg/info.png')}
                                    style={{ width: 20, height: 20,marginTop:5 }}
                                />
                                <Text style={{color:'#242734',fontSize:12,fontFamily:'Avenir',lineHeight:20,fontWeight:'400',letterSpacing:0.5,marginRight:8,width:250}} numberOfLines={3} >
                                {translate('Changing_State_or_District_it_may_affect_the_items_currently_in_your_shopping_bag')}
                                    </Text>
                        </View>
              {!isLoadingstate ? (
                <TextInputField
                  label={'__SELECT_STATE__'}
                  isDropdownLable={translate('__SELECT_STATE__')}
                  isDropdown={true}
                  selectedDropdownValue={selectedState}
                  error={formError.selectState}
                  dropDownFunction={() => handleModal('state')}
                />
              ) : (
                <Skeleton />
              )}
            </View>

            {/* Chose Distrct */}
            <View>
              {!isLoadingdistrict ? (
                <TextInputField
                  pressEnable={selectedState === null ? true : false}
                  label={'__SELECT_DISTRICT__'}
                  isDropdownLable={translate('__SELECT_DISTRICT__')}
                  isDropdown={true}
                  selectedDropdownValue={selectedDist}
                  error={formError.selectdist}
                  dropDownFunction={() => handleModal('dist')}
                />
              ) : (
                <Skeleton />
              )}
            </View>

            {/* Chose tehsil */}
            <View>
              {!isLoadingtehsil ? (
                <TextInputField
                  pressEnable={selectedDist === null ? true : false}
                  label={'__SELECT_TEHSIL__'}
                  isDropdownLable={translate('__SELECT_TEHSIL__')}
                  isDropdown={true}
                  selectedDropdownValue={selectedTehsil}
                  error={formError.selectTehsil}
                  dropDownFunction={() => handleModal('tehsil')}
                />
              ) : (
                <Skeleton />
              )}
            </View>

            {/* Chose Village */}
            <View>
              {!isLoadingvillage ? (
                <TextInputField
                  pressEnable={selectedTehsil === null ? true : false}
                  label={'__SELECT_VILLAGE__'}
                  isDropdownLable={translate('__SELECT_VILLAGE__')}
                  isDropdown={true}
                  selectedDropdownValue={selectedVillage}
                  error={formError.selectVillage}
                  dropDownFunction={() => handleModal('village')}
                />
              ) : (
                <Skeleton />
              )}
            </View>
            <View style={{marginTop: 8}}>
              <TextInputField
                placeholder={translate('__ENTER_ADDRESS__')}
                error={formError.address}
                value={formData.address}
                onSubmitEditingFunc={() => {
                  validateValue('address', formData.address, 'address');
                }}
                onBlur={() => {
                  validateValue('address', formData.address, 'address');
                }}
                onChangeText={val => {
                  handleChangeForm(
                    'address',
                    (val ?? '').toLowerCase(),
                    'address',
                  );
                }}
              />
            </View>
            <View style={{marginTop: 8, marginBottom: 16}}>
              <TextInputField
                placeholder={translate('__ENTER_PINCODE__')}
                error={formError.pincode}
                keyboardType="numeric"
                value={formData.pincode}
                onSubmitEditingFunc={() => {
                  validateValue('pincode', formData.pincode, 'pincode');
                }}
                onBlur={() => {
                  validateValue('pincode', formData.pincode, 'pincode');
                }}
                onChangeText={val => {
                  handleChangeForm(
                    'pincode',
                    (val ?? '').toLowerCase(),
                    'pincode',
                  );
                }}
              />
            </View>
            <View>
              <Button
                title={translate('__UPDATE_ADDRESS__')}
                fontSize={16}
                bgGreen
                onPress={submitForm}
              />
            </View>
          </ScrollView>
        </View>
      </View>
      <ModelPopUp
        modalVisible={stateModelVisible}
        selectedOption={selectedState}
        onSelect={onSelectState}
        onSubmit={onSubmit}
        modelClose={modalClose}
        DataArray={stateList}
        title={translate('__SELECT_STATE__')}
      />
      <ModelPopUp
        modalVisible={districtModelVisible}
        selectedOption={selectedDist}
        onSelect={onSelectDist}
        onSubmit={onSubmit}
        modelClose={modalClose}
        DataArray={districtList}
        title={translate('__SELECT_DISTRICT__')}
      />
      <ModelPopUp
        modalVisible={tehsilModelVisible}
        selectedOption={selectedTehsil}
        onSelect={onSelectTehsil}
        onSubmit={onSubmit}
        modelClose={modalClose}
        DataArray={tehsilList}
        title={translate('__SELECT_TEHSIL__')}
      />
      <ModelPopUp
        modalVisible={villageModelVisible}
        selectedOption={selectedVillage}
        onSelect={onSelectVillage}
        onSubmit={onSubmit}
        modelClose={modalClose}
        DataArray={villageList}
        title={translate('__SELECT_VILLAGE__')}
      />
    </Modal>
  );
};

export default React.memo(ChangeAddress);

const styles = StyleSheet.create({});
