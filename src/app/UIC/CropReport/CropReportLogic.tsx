import React, {useContext, useState} from 'react';
import CropReportRender from './CropReportRender';
import {
  getAuthReq,
  getLocalStorageData,
  getUnAuthReqest,
} from '../../Service/APIServices/axoisService';
import {CommonContext} from '../../commonResources/Context/CommonContext';
import {useRoute} from '@react-navigation/native';
import {rotationHandlerName} from 'react-native-gesture-handler/lib/typescript/handlers/RotationGestureHandler';

export default function CropReportLogic() {
  const route = useRoute<any>();

  const [cropReport, setcropReport] = useState([]);
  const [isloading, setisloading] = useState(true);

  // console.log('params reoprt', route.params?.customerCropDataId);
  const {stateID} = useContext(CommonContext);

  console.log('state id', stateID);

  React.useEffect(() => {
    let lang: any;
    getLocalStorageData('currentLangauge')
      .then((res: any) => {
        lang = res === 'hi' ? 2 : 1;
        getCropReport(lang, stateID);
      })
      .catch(err => {});
  }, []);

  const getCropReport = (lang: any, stateID: any) => {
    getAuthReq(
      `/crops/get-crop-report?customerCropDataId=${route.params?.customerCropDataId}&state=${stateID}&lang=${lang}`,
    )
      .then(res => {
        console.log('res from report', res.data.data.cropdata);
        setcropReport(res.data.data.cropdata);
        setisloading(false);
      })
      .catch(error => {
        console.log('res from report error', error);
      });
  };

  return <CropReportRender cropReport={cropReport} isloading={isloading} />;
}
