import {View, Text, BackHandler} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import CropTrackerRender from './CropTrackerRender';
import {useNavigation, useRoute} from '@react-navigation/native';
import EditModal from './component/EditModal';
import {CommonContext} from '../../commonResources/Context/CommonContext';
import CropTrakerSkeleton from './component/CropTrakerSkeleton';
import {
  getAuthReq,
  getLocalStorageData,
  postAuthReq,
} from '../../Service/APIServices/axoisService';
import YellowDay from './component/YellowDay';
import PestSelectionModal from './component/PestSelectionModal';

export default function CropTrackerLogic() {
  const { removeFromCart, bagProduct, addItemToCart} = useContext(CommonContext);
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const [editModalVisible, seteditModalVisible] = useState(false);
  // const [activeStage, setactiveStage] = useState('Seedling');

  // const [selectedStage, setselectedStage] = useState('');
  const [modalVisible, setmodalVisible] = useState(false);
  const [selectedDay, setselectedDay] = useState({});

  const [pestmodalVisible, setpestmodalVisible] = useState(false);
  const [activeCropId, setactiveCropId] = useState('');
  const [selectedCrop, setselectedCrop] = useState([]);
  const [isloadingselectedCrop, setisloadingselectedCrop] = useState(true);
  const [sowingStages, setsowingStages] = useState([]);
  const [isloadingsowingStages, setisloadingsowingStages] = useState(true);
  const [currentLang, setcurrentLang] = useState(1);
  const [CurrentDisease, setCurrentDisease] = useState([]);
  const [isloadingCurrentDisease, setisloadingCurrentDisease] = useState(true);
  // const [previousDisease, setpreviousDisease] = useState([]);
  const [previousDiseaseDate, setpreviousDiseaseDate] = useState<any>([]);
  const [isloadingpreviousDisease, setisloadingpreviousDisease] =
    useState(true);
  const [cropStageID, setcropStageID] = useState(0);
  const [yellowAndRedDay, setyellowAndRedDay] = useState<any>([]);
  const [isloadingyellowAndRedDay, setisloadingyellowAndRedDay] =
    useState(true);

  const getCropStageId = (id: any) => {
    setcropStageID(id);
  };

  const handleYellowAndRedDayModal = (
    day: string,
    date: any,
    month: any,
    year: any,
  ) => {
    if (day !== '') {
      setmodalVisible(!modalVisible);
      setselectedDay({
        day: day,
        date: date,
        month: month,
        year: year,
      });
      let yellowDay = day === 'yellow' ? 1 : 0;
      calenderSuggestionAPI(yellowDay);
    }
  };

  const calenderSuggestionAPI = (day: any) => {
    setisloadingyellowAndRedDay(true);
    let body = {
      stateId: 1,
      cropStageId: cropStageID,
      isYellowDay: day,
      cropStageAndDiseaseIds:
        previousDiseaseDate[0]?.cropStageAndDiseaseIds.join(','),
      lang: currentLang,
    };
    console.log('body------------------------------------------------',body.stateId)

    postAuthReq('/crops/get-calender-suggestion-new', body)
      .then(async res => {
        console.log('----------------================',res.data.data)
        for (let index = 0; index < res.data.data.productDetail.length; index++) {
          res.data.data.productDetail[index].sizes = await moveToBeginnings(res.data.data.productDetail[index].sizes,res.data.data.productDetail[index].productid)
          
        }
        setyellowAndRedDay(res.data.data);
        setisloadingyellowAndRedDay(false);
      })
      .catch(error => {
        setisloadingyellowAndRedDay(true);
        console.log('calender response error', error);
      });
  };


  const moveToBeginning = async(obj:any,index:any)=>{
    
    var val = await getLocalStorageData('currentLangauge');
    let lang = 1;
    if (val == 'hi') {
    lang = 2;
    }
    await postAuthReq(`/product/get-product-short-detail`, {productId:obj.value,langId:lang})
        .then( async productData => {
          console.log('000000000000--------------------yellowAndRedDay',yellowAndRedDay.productDetail[index])
          

          const productLists = yellowAndRedDay.productDetail
          const element = productData.data.data.productDetails

              yellowAndRedDay.productDetail[index].name = element.name
            yellowAndRedDay.productDetail[index].price = element.price
            yellowAndRedDay.productDetail[index].image = element.image
            yellowAndRedDay.productDetail[index].productid = element.productid
            yellowAndRedDay.productDetail[index].uicdiscount = element.uicdiscount
            yellowAndRedDay.productDetail[index].uic_price = element.uic_price
            // yellowAndRedDay.productDetail[index].currentSize = {label:element.unit_type,value:element.productid}
            
        yellowAndRedDay.productDetail[index].sizes = await moveToBeginnings(yellowAndRedDay.productDetail[index].sizes,yellowAndRedDay.productDetail[index].productid)

        console.log('000000000000--------------------yellowAndRedDay--------------',yellowAndRedDay.productDetail[index])
            setyellowAndRedDay({...yellowAndRedDay})
        }).catch((err)=>{
          console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%',err)
        })



  }

  const moveToBeginnings = async(array:any, id:any)=> {
    console.log('sachinnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn',array)
    if(array && array?.length >0){
      let index = await array.findIndex((value:any)=>value.value==id)
      console.log('newValue------------------',index)
      // let index = newValue[0].value
      // Check if the index is valid
      if (index < 0 || index >= array.length) {
          return array; // Return the original array if the index is out of bounds
      }
  
      // Remove the element at the specified index
      const [element] = array.splice(index, 1);
  
      // Insert the element at the beginning of the array
      array.unshift(element);
      // setDropDownData(array)
      return array;
    }else{
      return []
    }
   
}

  const navigateToCropReport = () => {
    let filter: any = selectedCrop?.filter((ele: any) => {
      return ele.cropId === activeCropId;
    });
    console.log('crop list  ===========>', filter[0].customerCropDataId);
    navigation.navigate('signIn', {
      screen: 'CropReport',
      params: {
        customerCropDataId: filter[0].customerCropDataId,
      },
    });
  };

  const editCropFunction = () => {
    seteditModalVisible(true);
  };

  const editModalFunction = (option: any) => {
    if (option === 'close') {
      seteditModalVisible(false);
    } else {
      seteditModalVisible(false);
      navigation.navigate('signIn', {
        screen: 'CropSelection',
        params: {
          screen: 'EditCrop',
        },
      });
    }
  };

  const addToBagReccomProduct = (
    id: any,
    name: any,
    price: any,
    uic_price: any,
    image: any,
    uicdiscount:any
  ) => {
    addItemToCart(id, name, price, uic_price, image,uicdiscount);
    // navigation.navigate('Cart');
  };

  const getSelectedCrop = (language: any) => {
    getAuthReq(`/crops/select-crop-data?lang=${language}`)
      .then((res: any) => {
        let removeOther = res.data.data.selectedCropData.filter((item: any) => {
          return item.name != 'Other' && item.other_name === undefined;
        });
        setselectedCrop(removeOther);

        if (route.params?.cropId && route.params?.customerCropId) {
          setactiveCropId(route.params?.cropId);
          getCropStageData(language, route.params?.customerCropId);
        } else if (route.params === undefined) {
          setactiveCropId(removeOther[0]?.cropId);
          getCropStageData(language, removeOther[0]?.customerCropDataId);
        }

        setisloadingselectedCrop(false);
      })
      .catch(error => {
        setisloadingselectedCrop(true);
        console.log('selected crop data from crop tracker error', error);
      });
  };

  const getCropStageData = (language: any, id: any) => {
    setisloadingsowingStages(true);
    getAuthReq(
      `/crops/get-crop-stage-data?custumerCropDataId=${id}&lang=${language}`,
    )
      .then((res: any) => {
        setsowingStages(res.data.data.stageData);

        let filter = res.data.data.stageData.filter((item: any) => {
          return item.isCurrentStage == true;
        });
        getCurrentStageDisease(language, filter[0]?.cropStageId, id);
        setisloadingsowingStages(false);
      })
      .catch(error => {
        console.log('stage crop data from crop tracker error', error);
        setisloadingsowingStages(true);
      });
  };

  const getCurrentStageDisease = (
    language: any,
    id: any,
    customerCropDataId: any,
  ) => {
    setisloadingCurrentDisease(true);
    getAuthReq(
      `/crops/current-stage-disease?cropStageId=${id}&lang=${language}`,
    )
      .then((res: any) => {
        setCurrentDisease(res.data.data.currentStageDisease);
        // setsowingStages(res.data.data.stageData);
        setisloadingCurrentDisease(false);
        getpreviousdisease(customerCropDataId);
      })
      .catch(error => {
        console.log('stage crop current disease error', error);
        // setisloadingCurrentDisease(true);
      });
  };

  const getpreviousdisease = (custumerCropDataId: any) => {
    setisloadingpreviousDisease(true);
    setpreviousDiseaseDate([]);
    getAuthReq(
      `/crops/previous-selected-disease?custumerCropDataId=${custumerCropDataId}`,
    )
      .then((res: any) => {
        setpreviousDiseaseDate(res.data.data?.previousSelectedDisease);
        console.log('disease========>', res.data.data?.previousSelectedDisease);
        setisloadingpreviousDisease(false);
      })
      .catch(error => {
        console.log('previous disease error', error);
      });
  };

  const getCropDataOnchangeCrop = (customerCropId: any, cropId: any) => {
    // setisloadingsowingStages(true);
    setisloadingpreviousDisease(true)
    setsowingStages([])
    getCropStageData(currentLang, customerCropId);
    setactiveCropId(cropId);
  };
  const ApiCallAfterdiseaseSelection = () => {
    setsowingStages([])
    setCurrentDisease([])
    setisloadingpreviousDisease(true);
    setisloadingCurrentDisease(true);
    setisloadingsowingStages(true);
    let filter: any = selectedCrop.filter((ele: any) => {
      return ele.cropId == activeCropId;
    });
    getCropStageData(currentLang, filter[0].customerCropDataId);
  };

  function handleBackButtonClick() {
    navigation.navigate('BottomTabBar', {screen: 'UIC'});
    return true;
  }

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener(
        'hardwareBackPress',
        handleBackButtonClick,
      );
    };
  }, []);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getLocalStorageData('currentLangauge')
        .then((res: any) => {
          let lang: number = res === 'hi' ? 2 : 1;
          setcurrentLang(lang);
          getSelectedCrop(lang);
        })
        .catch(error => {
          console.log('error in language', error);
        });
    });

    return unsubscribe;
  }, [navigation, route.params]);

  // const userSelectedStage = (id: any) => {
  //   setselectedStage(id);
  // };

  return (
    <>
      <CropTrackerRender
        handleYellowAndRedDayModal={handleYellowAndRedDayModal}
        setpestmodalVisible={setpestmodalVisible}
        navigateToCropReport={navigateToCropReport}
        editCropFunction={editCropFunction}
        selectedCrop={selectedCrop}
        isloadingselectedCrop={isloadingselectedCrop}
        activeCropId={activeCropId}
        sowingStages={sowingStages}
        isloadingsowingStages={isloadingsowingStages}
        getCropDataOnchangeCrop={getCropDataOnchangeCrop}
        // previousDisease={previousDisease}
        isloadingpreviousDisease={isloadingpreviousDisease}
        CurrentDisease={CurrentDisease}
        previousDiseaseDate={previousDiseaseDate}
        getCropStageId={getCropStageId}
        currentLang={currentLang}
      />
      <EditModal
        heading="__EDIT_CROP__"
        content="__EDIT_WARNING_TEXT__"
        buttonTittle="__CONTINUE__"
        funct={editModalFunction}
        editModalVisible={editModalVisible}
      />
      <YellowDay
        modalVisible={modalVisible}
        setmodalVisible={setmodalVisible}
        selectedDay={selectedDay}
        addToBagReccomProduct={addToBagReccomProduct}
        yellowAndRedDay={yellowAndRedDay}
        isloadingyellowAndRedDay={isloadingyellowAndRedDay}
        removeFromCart={removeFromCart}
        bagProduct={bagProduct}
        moveToBeginning={moveToBeginning}
      />
      <PestSelectionModal
        sowingStages={sowingStages}
        CurrentDisease={CurrentDisease}
        previousDiseaseDate={previousDiseaseDate}
        isloadingCurrentDisease={isloadingCurrentDisease}
        pestmodalVisible={pestmodalVisible}
        setpestmodalVisible={setpestmodalVisible}
        currentLang={currentLang}
        selectedCrop={selectedCrop}
        ApiCallAfterdiseaseSelection={ApiCallAfterdiseaseSelection}
        activeCropId={activeCropId}
      />
    </>
  );
}
