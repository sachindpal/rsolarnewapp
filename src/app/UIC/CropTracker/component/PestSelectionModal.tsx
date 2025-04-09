import {
  ActivityIndicator,
  Dimensions,
  Image,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  ColorVariable,
  CommonStyle,
  commanRadius,
} from '../../../../asset/style/commonStyle';
import {CloseBlack, GraySearch} from '../../../../asset/img';
import {FontStyle} from '../../../../asset/style/FontsStyle';
import {FlatList, ScrollView} from 'react-native-gesture-handler';
import Button from '../../../commonResources/component/CommonButton/Button';
import {useTranslation} from 'react-i18next';
import TextTranslation from '../../../commonResources/component/CommonInput/TextTranslation';
import FastImage from 'react-native-fast-image';
import {postAuthReq} from '../../../Service/APIServices/axoisService';
import { useIsFocused } from "@react-navigation/native";


interface DataType {
  pestmodalVisible: boolean;
  setpestmodalVisible: any;
  CurrentDisease: any;
  isloadingCurrentDisease: any;
  sowingStages: any;
  currentLang: any;
  selectedCrop: any;
  ApiCallAfterdiseaseSelection: any;
  activeCropId: any;
  previousDiseaseDate: any;
}

const {width, height} = Dimensions.get('screen');

const PestSelectionModal = ({
  pestmodalVisible,
  setpestmodalVisible,
  CurrentDisease,
  isloadingCurrentDisease,
  sowingStages,
  currentLang,
  selectedCrop,
  ApiCallAfterdiseaseSelection,
  activeCropId,
  previousDiseaseDate,
}: DataType) => {
  const {t: translate} = useTranslation();
  const isFocused = useIsFocused();
  const [selectedPestAndDisease, setselectedPestAndDisease] = useState<
    string[]
  >([]);
  const [error, seterror] = useState('');

  const closeModal = () => {
    setpestmodalVisible(!pestmodalVisible);
  };

  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState(CurrentDisease);
  useEffect(() => {
    setFilteredData(CurrentDisease);
  }, [CurrentDisease,isFocused]);

  const pestAndDiseaseSelection = (pest: string) => {
    console.log('selectedPestAndDisease,selectedPestAndDisease,selectedPestAndDisease',selectedPestAndDisease)
    if (
      selectedPestAndDisease.length < 3 &&
      !selectedPestAndDisease.includes(pest)
    ) {
      console.log('sachin 1')
      setselectedPestAndDisease([...selectedPestAndDisease, pest]);
      seterror('');
    } else if (selectedPestAndDisease.includes(pest)) {
      console.log('sachin 2')

      setselectedPestAndDisease(
        selectedPestAndDisease.filter((pestname: any) => pestname !== pest),
      );
      seterror('');
    } else {
      console.log('sachin 3')

      seterror(pest);
    }
  };

  const handleSearch = (text: any) => {
    setSearchQuery(text);
    if (text) {
      const newData = CurrentDisease.filter((item: any) => {
        const itemData = item.diseaseName.toLowerCase();
        const textData = text.toLowerCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredData(newData);
    } else {
      setFilteredData(CurrentDisease);
    }
  };

  const submitCropDisease = () => {
    let filter = sowingStages.filter((item: any) => {
      return item.isCurrentStage == true;
    });
    let filterCustID = selectedCrop.filter((item: any) => {
      return item.cropId == activeCropId;
    });
    let body = {
      lang: currentLang,
      cropStageId: filter[0].cropStageId,
      cropStageAndDiseaseId: selectedPestAndDisease,
      customerCropDataId: filterCustID[0].customerCropDataId,
    };

    postAuthReq('/crops/add-disease-data', body)
      .then((res: any) => {
        console.log('data submit from add disease', res.data);
        setpestmodalVisible(!pestmodalVisible);
        ApiCallAfterdiseaseSelection();
        setselectedPestAndDisease([]);
      })
      .catch((error: any) => {
        console.log('data submit from add disease error', error);
      });
  };

  const disease = async() => {
    seterror('')
    setselectedPestAndDisease([])
    console.log('previousDiseaseDatepreviousDiseaseDatepreviousDiseaseDatepreviousDiseaseDate',previousDiseaseDate)
    await previousDiseaseDate?.map((item: any) => {
      return setselectedPestAndDisease(
        item.cropStageAndDiseaseIds.flat().map((id: any) => parseInt(id, 10)),
      );
    });
  };
  useEffect(() => {
    disease();
  }, [previousDiseaseDate,isFocused]);


  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <Modal animationType="fade" transparent={true} visible={pestmodalVisible}>
        <View
          style={[
            CommonStyle.alignCenter_justifyCenter,
            {flex: 1, flexGrow: 1, backgroundColor: 'rgba(0, 0, 0, 0.6)'},
          ]}>
          <View style={styles.sheet}>
            <View style={{alignItems: 'flex-end', marginRight: 16}}>
              <Pressable onPress={closeModal}>
                <CloseBlack />
              </Pressable>
            </View>
            <View style={{alignItems: 'center', marginBottom: 16}}>
              <TextTranslation
                style={FontStyle.fontHeavy18}
                text={'__ADD_DISEASES__'}
              />
            </View>
            <View style={{paddingHorizontal: 16}}>
              <View
                style={[CommonStyle.flex_dirRow_alignCenter, styles.search]}>
                <View>
                  <GraySearch />
                </View>
                <View style={{flex: 1, marginLeft: 16}}>
                  <TextInput
                    placeholder={translate('__PEST_SEARCH__')}
                    placeholderTextColor={'rgba(126, 126, 126, 1)'}
                    style={FontStyle.fontMedium14}
                    onChangeText={text => handleSearch(text)}
                    value={searchQuery}
                  />
                </View>
              </View>
            </View>
            {error !== '' ? (
              <TextTranslation
                style={[
                  FontStyle.fontRegular14,
                  {color: ColorVariable.errorRed, marginTop: 8, marginLeft: 16},
                ]}
                text={'__PEST_SELECTION__'}
              />
            ) : null}
            {!isloadingCurrentDisease ? (
              <ScrollView
                contentContainerStyle={{
                  
                  paddingHorizontal: 8,
                }}>
                <FlatList
                  data={filteredData}
                  keyExtractor={(_, index) => index.toString()}
                  numColumns={3}
                  scrollEnabled={false}
                  renderItem={({item}) => {
                    return (
                      <>
                        <Pressable
                          style={[
                            styles.card,
                            selectedPestAndDisease.includes(
                              item.cropStageAndDiseaseId,
                            )
                              ? styles.selectedStyle
                              : null,
                            selectedPestAndDisease.length >= 3 &&
                            !selectedPestAndDisease.includes(
                              item.cropStageAndDiseaseId,
                            ) &&
                            error == item.cropStageAndDiseaseId
                              ? styles.errorStyle
                              : null,{maxWidth:0.26 * width}
                          ]}
                          onPress={() =>
                            pestAndDiseaseSelection(item.cropStageAndDiseaseId)
                          }>
                          <View
                            style={{
                              marginBottom: 8,
                              borderTopLeftRadius: 6,
                              borderTopRightRadius: 6,
                              overflow: 'hidden',
                            }}>
                            <FastImage
                              source={{uri: item.diseaseImage}}
                              style={{
                                width: 0.26 * width,
                                height: 0.1 * height,
                              }}
                            />
                          </View>
                          <View style={{flex:1}}>
                          <Text style={FontStyle.fontMedium12}>
                            {item.diseaseName}
                          </Text>
                          </View>
                        </Pressable>
                      </>
                    );
                  }}
                />
              </ScrollView>
            ) : (
              <View style={[CommonStyle.alignCenter_justifyCenter,{flex:1}]}><ActivityIndicator size={"small"}/></View>
            )}
            <View style={{marginTop: 24, marginHorizontal: 16}}>
              <Button
                title={translate('__CONTINUE__')}
                bgGreen
                fontSize={16}
                onPress={submitCropDisease}
              />
            </View>
            <View style={{marginTop: 8, marginHorizontal: 16}}>
              <Button
                title={translate('__CANCEL_')}
                bgWhite
                fontSize={16}
                onPress={closeModal}
              />
            </View>
          </View>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
};

export default React.memo(PestSelectionModal);

const styles = StyleSheet.create({
  card: {
    borderRadius: commanRadius.radi6,
    backgroundColor: ColorVariable.white,
    elevation: 5,
    alignItems: 'center',
    margin: 8,
    borderWidth: 0,
    borderColor: ColorVariable.white,
    paddingBottom: 10,
    
  },
  errorStyle: {
    borderWidth: 2,
    borderColor: ColorVariable.errorRed,
  },
  selectedStyle: {
    borderWidth: 2,
    borderColor: ColorVariable.farmkartGreen,
  },
  sheet: {
    backgroundColor: 'white',
    marginHorizontal: 4,
    flex: 1,
    marginVertical: 41,
    borderRadius: commanRadius.radi6,
    paddingVertical: 16,
    width: '95%',
  },
  search: {
    borderRadius: commanRadius.radi6,
    borderWidth: 1,
    borderColor: 'rgba(126, 126, 126, 1)',
    backgroundColor: 'white',
    paddingHorizontal: 16,
    height: 54,
    marginBottom: 16,
  },
});
