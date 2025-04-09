import React, {useContext, useEffect, useState} from 'react';
import CropSelectionRender from './CropSelectionRender';
import {UICContext} from '../Context/UICContext';
import {useNavigation, useRoute} from '@react-navigation/native';
import {
  getAuthReq,
  getLocalStorageData,
  postAuthReq,
  setLocalStorage,
} from '../../Service/APIServices/axoisService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import EditModal from '../CropTracker/component/EditModal';

const CropSelectionLogic = () => {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  const [selectedCrop, setselectedCrop] = useState<any>([]);
  const [error, seterror] = useState('');
  const [limitExceed, setlimitExceed] = useState('');
  const [modelVisible, setmodelVisible] = useState(false);
  const [deselectmodelVisible, setdeselectmodelVisible] = useState(false);
  const {selectCropFunct, selectAddCropFunct} = useContext(UICContext);
  const [currentSelectCrop, setcurrentSelectCrop] = useState('');
  const [stateCropsData, setstateCropsData] = useState([]);
  const [cropData, setcropData] = useState([]);
  const [isloadingStateData, setisloadingStateData] = useState(true);
  const [isloadingCropData, setisloadingCropData] = useState(true);
  // ADD CROP STATE AND LOGIC
  const [addCrops, setaddCrops] = useState<string[]>([]);
  const [selectedIDStateCrop, setselectedIDStateCrop] = useState<any>();
  const [selectedIDAllCrop, setselectedIDAllCrop] = useState<any>();

  useEffect(() => {
    // setactiveCrop(selectedIDStateCrop?.concat(selectedIDAllCrop));
    setselectedCrop(selectedIDStateCrop?.concat(selectedIDAllCrop));
  }, [selectedIDStateCrop, selectedIDAllCrop]);

  const addCropFunction = (crop: any) => {
    seterror('');
    if (crop === -1 && !modelVisible) {
      setmodelVisible(true);
    } else {
      if (
        addCrops.concat(selectedCrop).length >= 5 &&
        !addCrops.includes(crop)
      ) {
        setlimitExceed(crop);
        return;
      }
      if (addCrops?.includes(crop)) {
        setaddCrops(addCrops?.filter((cropname: any) => cropname !== crop));
        setlimitExceed('');
      } else {
        setaddCrops([...addCrops, crop]);
        setlimitExceed('');
      }
    }
  };

  // this function call during uic registration
  const selectCrop = (crop: any) => {
    seterror('');
    if (crop === -1 && !modelVisible) {
      setmodelVisible(true);
    } else {
      if (
        selectedCrop != null &&
        selectedCrop.length >= 5 &&
        !selectedCrop.includes(crop)
      ) {
        setlimitExceed(crop);
        return;
      }
      if (selectedCrop != null && selectedCrop.includes(crop)) {
        if (route.params?.screen === 'EditCrop') {
          setcurrentSelectCrop(crop);
          setdeselectmodelVisible(true);
        } else {
          setselectedCrop(
            selectedCrop.filter((cropname: any) => cropname !== crop),
          );
          setlimitExceed('');
        }
      } else {
        setselectedCrop([...selectedCrop, crop]);
        setlimitExceed('');
      }
    }
  };
  // this validation function call during uic registration
  const validationNocropSelected = () => {
    if (route.params?.screen === 'addCrop') {
      if (addCrops && addCrops.length === 0) {
        seterror('Please Add your new crop');
      } else {
        selectAddCropFunct(addCrops);
        selectCropFunct(selectedCrop);
        navigation.navigate('signIn', {
          screen: 'CropInfo',
          params: {
            navigationFrom: route.params?.screen,
          },
        });
      }
    } else {
      if (selectedCrop && selectedCrop?.length == 0) {
        seterror('__CROP_SELECT_ERROR__');
      } else {
        selectCropFunct(selectedCrop);
        AsyncStorage.setItem('userSelectedCrop', JSON.stringify(selectedCrop));
        navigation.navigate('signIn', {
          screen: 'CropInfo',
          params: {
            navigationFrom: route.params?.screen,
          },
        });
      }
    }
  };

  const closeModel = () => {
    setmodelVisible(false);
  };

  // call during edit crop and add crop to get user selected crop from local storage
  // async function getUserSelectedCrop() {
  //   if (
  //     route.params?.screen == 'EditCrop' ||
  //     route.params?.screen == 'addCrop'
  //   ) {
  //     let cropSelected: any = await AsyncStorage.getItem('userSelectedCrop');
  //     selectCropFunct(JSON.parse(cropSelected));
  //     setselectedCrop(JSON.parse(cropSelected));
  //   }
  // }
  useEffect(() => {
    getUserInfo();
    // getUserSelectedCrop();
  }, []);

  const editModalFunction = (option: any) => {
    if (option === 'close') {
      setdeselectmodelVisible(false);
    } else {
      setdeselectmodelVisible(false);

      setselectedCrop(
        selectedCrop?.filter((cropname: any) => cropname !== currentSelectCrop),
      );
      setlimitExceed('');
    }
  };

  // get userInfo fromLocal storage

  const getUserInfo = () => {
    let lang: any;
    getLocalStorageData('currentLangauge')
      .then((res: any) => {
        lang = res;
      })
      .catch(err => {
        console.log('current lang form crop selection=====>', err);
      });
    getLocalStorageData('userInfo')
      .then((res: any) => {
        let userData = JSON.parse(res);

        getCropsAsPerState(userData.stateid, lang);
      })
      .catch(err => {
        console.log('user info form crop selection=====>', err);
      });
  };

  // API call for get 10 crops as per state

  const getCropsAsPerState = (stateid: any, lang: any) => {
    let langauge = lang == 'hi' ? 2 : 1;
    getAuthReq(`/crops/top10-crops?state_id=${stateid}&lang=${langauge}`)
      .then(res => {
        let cropList = res.data.data.cropData;
        cropList.push({
          image: 'static',
          name: 'More',
          cropid: -1,
        });
        setstateCropsData(cropList);
        getAllCrops(stateid, lang);
console.log("crop list form state====",res.data.data.cropData)
        const userSelectedCrops: any = res.data.data.cropData
          .filter((crop: any) => crop.isSelected === 'true')
          .map((item: any) => {
            return item.cropid;
          });
        setselectedIDStateCrop(userSelectedCrops);
        setisloadingStateData(false);
      })
      .catch(err => {
        console.log('getCropsAsPerState error', err.response);
      });
  };
  // API call for get all crops

  const getAllCrops = (stateid: any, lang: any) => {
    let body = {
      stateId: stateid,
      lang: lang == 'hi' ? 2 : 1,
    };
    postAuthReq(`/crops/crops-data`, body)
      .then(res => {
        setcropData(res.data.data.crops);
        console.log("crop list form all crops====",res.data.data.crops)
        const userSelectedCrops: any = res.data.data.crops
          .filter((crop: any) => crop.isSelected == 'true')
          .map((item: any) => {
            return item.cropid;
          });

        setselectedIDAllCrop(userSelectedCrops);
        setisloadingCropData(false);
      })
      .catch(err => {
        console.log('get_____ALL_______Crops error', err);
      });
  };

  return (
    <>
      <CropSelectionRender
        selectCrop={selectCrop}
        error={error}
        validationNocropSelected={validationNocropSelected}
        selectedCrop={selectedCrop}
        limitExceed={limitExceed}
        closeModel={closeModel}
        modelVisible={modelVisible}
        addCropFunction={addCropFunction}
        addCrops={addCrops}
        stateCropsData={stateCropsData}
        cropData={cropData}
        isloadingStateData={isloadingStateData}
        isloadingCropData={isloadingCropData}
      />
      <EditModal
        heading="__DESELECT_CROP__"
        content="__EDIT_WARNING_TEXT__"
        buttonTittle="__DESELECT_CROP__"
        funct={editModalFunction}
        editModalVisible={deselectmodelVisible}
      />
    </>
  );
};

export default CropSelectionLogic;
