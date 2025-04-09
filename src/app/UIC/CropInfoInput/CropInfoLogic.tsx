import React, {useContext, useState} from 'react';
import {UICContext} from '../Context/UICContext';
import CropInfoRender from './CropInfoRender';
import {useNavigation, useRoute} from '@react-navigation/native';
import {
  getLocalStorageData,
  postAuthReq,
} from '../../Service/APIServices/axoisService';

export default function CropInfoLogic() {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  const {selectedCrop, addedNewCrop} = useContext(UICContext);
  const [crop, setcrop] = useState('');
  const [sowingType, setsowingType] = useState('');
  const [dateShow, setdateShow] = useState(false);
  const [sowingDate, setsowingDate] = useState<any>('');
  const [error, seterror] = useState<any>({});
  const [sowingData, setsowingData] = useState([]);
  const [SowingDataForSubmit, setSowingDataForSubmit] = useState<any>();
  const [isloading, setisloading] = useState(true);
  const [otherName, setotherName] = useState('');



  React.useEffect(() => {
    let lang: any;
    getLocalStorageData('currentLangauge')
      .then((res: any) => {
        lang = res === 'hi' ? 2 : 1;
        getSowingType(lang);
      })
      .catch(err => {});
  }, []);

  const handleCropNameData = (txt: any) => {
    setotherName(txt);
    const newSowingtype = SowingDataForSubmit.map((item: any) => {
      if (item.cropId === crop) {
        return {...item, name: txt};
      }
      return item;
    });
    setSowingDataForSubmit(newSowingtype);
    seterror({});
  };

  const handleCropData = (id: any) => {
    setsowingType(id);
    const newSowingtype = SowingDataForSubmit.map((item: any) => {
      if (item.cropId === crop) {
        return {...item, sowingTypeId: id};
      }
      return item;
    });
    setSowingDataForSubmit(newSowingtype);
    seterror({});
  };

  const dateHandle = (_: any, date: any): any => {
    setdateShow(false);
    seterror({});
    let userDate = new Date(date);
    const year = userDate.getFullYear();
    const month = (userDate.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-indexed
    const day = userDate.getDate().toString().padStart(2, '0');

    const replace = `${year}-${month}-${day}`;
    const newDataList = SowingDataForSubmit.map((item: any) => {
      if (item.cropId === crop) {
        return {...item, sowingDate: replace};
      }
      return item;
    });
    setSowingDataForSubmit(newDataList);
    setsowingDate(replace);
  };

  const cropSelection = (key: any, val: any) => {
    setcrop(val);
    seterror({});
    let selectedCrop = SowingDataForSubmit.filter((item: any) => {
      return item.cropId === val;
    });
    selectedCrop.map((item: any) => {
      if (item.sowingDate == null) {
        seterror({sowingDate: '__SELECT_CROP_SOWING_DATE__'});
      } else if (item.sowingTypeId == null) {
        seterror({sowingType: '__SELECT_CROP_SOWING_TYPE__'});
      } else {
        setcrop(val);
        setsowingType('');
      }
    });
  };

  const navigateToUICNumbScreen = () => {
    let findMissingField = SowingDataForSubmit.find((item: any) => {
      return item.sowingDate == null || item.sowingTypeId == null;
    });

    if (findMissingField === undefined) {
      submitCropData();
    } else {
      setcrop(findMissingField.cropId);
      seterror({
        cropId: findMissingField.cropId,
        cropRemaining: '__OTHER_CROP_ERROR__',
      });
    }
  };

  const getSowingType = (lang: any) => {
    let editbody = {
      lang: lang,
      cropIds: selectedCrop.toString(),
    };
    let addBody = {
      lang: lang,
      cropIds: selectedCrop?.concat(addedNewCrop).join(','),
    };
    let body = route.params?.navigationFrom === 'addCrop' ? addBody : editbody;
    postAuthReq('/crops/sowing-crops-types', body)
      .then((res: any) => {
        if (route.params?.navigationFrom === 'addCrop') {
          let reverse: any = [
            res.data.data[res.data.data.length - 1],
            ...res.data.data.slice(0, -1),
          ];
          setsowingData(reverse);
          setcrop(reverse[0].cropId);
        } else {
          setsowingData(res.data.data);
          setcrop(res.data.data[0].cropId);
        }

        console.log('=====sowing data=====', res.data.data);

        let arr: any = [];
        console.log('response from data', res.data.data);
        let filteredObject = res.data.data.map((item: any) => {
          let obj: any;
          obj = {
            cropId: item.cropId,
            sowingDate: item.previousSowingDate,
            sowingTypeId: item.previousSowingTypeId,
            cropCycleDuration: item.cropCycleDuration,
          };
          if (item.name === 'Other' && item.cropId == 56) {
            obj.name = item.other_name;
            setotherName(item.other_name);
          }

          return obj;
        });
        arr.push(filteredObject);

        setSowingDataForSubmit(arr[0]);

        setisloading(false);
      })
      .catch(error => {
        console.log(
          'crop sowing data error type',
          error.response.data.error_type,
        );
        setisloading(true);
      });
  };

  const submitCropData = () => {
    let body = {cropsJson: JSON.stringify(SowingDataForSubmit)};

    postAuthReq('/crops/submit-crops-data', body)
      .then((res: any) => {

        if (route.params?.navigationFrom === 'UICRegistration') {
          navigation.navigate('signIn', {
            screen: 'UICNumberScreen',
            params: {uicNumber: res.data.data.uic_number},
          });
        } else if (route.params?.navigationFrom === 'EditCrop') {
          navigation.navigate('signIn', {screen: 'CropTracker'});
        } else if (route.params?.navigationFrom === 'addCrop') {
          navigation.navigate('signIn', {screen: 'CropTracker'});
        }
      })
      .catch(error => {
        console.log('crop sowing submit  data error type', error.response.data);
      });
  };
  return (
    <CropInfoRender
      crop={crop}
      sowingType={sowingType}
      dateShow={dateShow}
      setdateShow={setdateShow}
      sowingDate={sowingDate}
      error={error}
      handleCropData={handleCropData}
      dateHandle={dateHandle}
      cropSelection={cropSelection}
      navigateToUICNumbScreen={navigateToUICNumbScreen}
      params={route.params?.navigationFrom}
      sowingData={sowingData}
      isloading={isloading}
      SowingDataForSubmit={SowingDataForSubmit}
      handleCropNameData={handleCropNameData}
      otherName={otherName}
    />
  );
}
