import {Modal, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {CommonStyle} from '../../../../asset/style/commonStyle';
import {CloseBlack} from '../../../../asset/img';
import UICScreen from '../../../UIC/UICScreen';
import {useNavigation} from '@react-navigation/native';
import {
  getLocalStorageData,
  getUnAuthReqest,
} from '../../../Service/APIServices/axoisService';

const LearnMoreModal = ({learnMoreModalVisible, openlearnMoreModal}: any) => {
  const navigation = useNavigation<any>();
  const [bannerImage, setbannerImage] = useState([]);
  const [bannerImageLoading, setbannerImageLoading] = useState(true);

  React.useEffect(() => {
    let lang: any;
    getLocalStorageData('currentLangauge')
      .then((res: any) => {
        lang = res === 'hi' ? 2 : 1;
        getBannerImage(lang);
      })
      .catch(err => {});
  }, []);

  const getBannerImage = (lang: any) => {
    getUnAuthReqest(`/crops/get-uic-banner-images?lang=${lang}`)
      .then(res => {
        if (res.data.data) {
          console.log(
            'res.data.data.images=====================',
            res.data.data.images,
          );
          setbannerImage(res.data.data.images);
          setbannerImageLoading(false);
        }
      })
      .catch(err => {
        console.log('banner image respo', err.response);
        setbannerImageLoading(true);
      });
  };

  const navigateToAddress = () => {
    navigation.navigate('signIn', {
      screen: 'AddressScreen',
      params: {
        screen: 'UICRegistration',
      },
    });
  };
  return (
    <Modal visible={learnMoreModalVisible} animationType="slide" transparent>
      <View style={CommonStyle.sheet}>
        <Pressable
          style={{padding: 20, width: 55}}
          onPress={openlearnMoreModal}>
          <CloseBlack />
        </Pressable>
        <View style={{flex: 1}}>
          <UICScreen
            navigationToAddressScreen={navigateToAddress}
            bannerImage={bannerImage}
            bannerImageLoading={bannerImageLoading}
          />
        </View>
      </View>
    </Modal>
  );
};

export default LearnMoreModal;

const styles = StyleSheet.create({});
