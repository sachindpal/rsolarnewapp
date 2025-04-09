import {
  Dimensions,
  Image,
  Modal,
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
import ImageComponent from '../../../commonResources/ImageComponent/ImageComponent';
import FastImage from 'react-native-fast-image';

export interface DataType {
  selectCrop: (crop: string) => void;
  error: string;
  validationNocropSelected: () => void;
  selectedCrop: string[];
  limitExceed: string;
  closeModel: () => void;
  modelVisible: boolean;
  param: string;
  addCrops: any;
  addCropFunction: any;
  cropData: any;
  isloadingCropData: boolean;
}
const {width, height} = Dimensions.get('screen');
const SelectionModel = ({
  limitExceed,
  selectCrop,
  error,
  validationNocropSelected,
  selectedCrop,
  modelVisible,
  closeModel,
  param,
  addCrops,
  addCropFunction,
  cropData,
  isloadingCropData,
}: DataType) => {
  const {t: translate} = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState(cropData);

  useEffect(() => {
    setFilteredData(cropData)
  }, [cropData])

  const handleSearch = (text: any) => { 
    setSearchQuery(text);
    if (text) {
      const newData = cropData.filter((item: any) => {
        const itemData = item.name.toLowerCase();
        const textData = text.toLowerCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredData(newData);
    } else {
      setFilteredData(cropData);
    }
  };
  return (
    <Modal animationType="fade" transparent={true} visible={modelVisible}>
      <View
        style={[
          CommonStyle.alignCenter_justifyCenter,
          {flex: 1, flexGrow: 1, backgroundColor: 'rgba(0, 0, 0, 0.6)'},
        ]}>
        <View style={styles.sheet}>
          <View style={{alignItems: 'flex-end', marginRight: 16}}>
            <Pressable onPress={closeModel}>
              <CloseBlack />
            </Pressable>
          </View>
          <View style={{alignItems: 'center', marginBottom: 16}}>
            <TextTranslation
              style={FontStyle.fontHeavy18}
              text={'__ADD_YOUR_CROP__'}
            />
          </View>
          <View style={{paddingHorizontal: 16}}>
            <View style={[CommonStyle.flex_dirRow_alignCenter, styles.search]}>
              <View>
                <GraySearch />
              </View>
              <View style={{flex: 1, marginLeft: 16}}>
                <TextInput
                  placeholder={translate('__CROPS_PLACEHOLDER__')}
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
              text={'__CROP_SELECT_ERROR__'}
            />
          ) : null}
          {limitExceed !== '' ? (
            <TextTranslation
              style={[
                FontStyle.fontRegular14,
                {color: ColorVariable.errorRed, marginTop: 8, marginLeft: 16},
              ]}
              text={'__MAX_LIMIT_CROP_SELECT__'}
            />
          ) : null}
          <ScrollView
            contentContainerStyle={{
              paddingHorizontal: 8,
            }}>
            {param === 'addCrop' ? (
              !isloadingCropData ? (
                <FlatList
                  data={filteredData}
                  keyExtractor={(_, index) => index.toString()}
                  numColumns={3}
                  scrollEnabled={false}
                  contentContainerStyle={{flex: 1}}
                  renderItem={item => {
                    return (
                      <>
                        <Pressable
                          style={[
                            styles.card,
                            error !== '' && item.index == 0
                              ? styles.errorStyle
                              : null,
                            addCrops?.includes(item.item.cropid) ||
                            selectedCrop?.includes(item.item.cropid)
                              ? styles.selectedStyle
                              : null,
                            addCrops.concat(selectedCrop)?.length >= 5 &&
                            !addCrops?.includes(item.item.cropid) &&
                            limitExceed == item.item.cropid
                              ? styles.errorStyle
                              : null,
                          ]}
                          disabled={
                            selectedCrop?.includes(item.item.cropid)
                              ? true
                              : false
                          }
                          onPress={() => addCropFunction(item.item.cropid)}>
                          <View
                            style={{paddingHorizontal: 6, paddingBottom: 4}}>
                            <FastImage
                              source={{uri: item.item.image}}
                              style={{width: 60, height: 60}}
                            />
                          </View>
                          <Text style={FontStyle.fontMedium12}>
                            {item.item.name}
                          </Text>
                          {selectedCrop.includes(item.item.cropid) ? (
                            <View
                              style={{
                                width: 96,
                                height: 106,
                                top: -2,
                                borderRadius: 6,
                                backgroundColor: 'rgba(255, 255, 255, 0.7)',
                                position: 'absolute',
                              }}
                            />
                          ) : null}
                        </Pressable>
                      </>
                    );
                  }}
                />
              ) : null
            ) : !isloadingCropData ? (
              <FlatList
                data={filteredData}
                keyExtractor={(_, index) => index.toString()}
                numColumns={3}
                scrollEnabled={false}
                contentContainerStyle={{flex: 1, flexGrow: 1}}
                renderItem={item => {
                  return (
                    <>
                      <Pressable
                        style={[
                          styles.card,
                          error !== '' && item.index == 0
                            ? styles.errorStyle
                            : null,
                          selectedCrop?.includes(item.item.cropid)
                            ? styles.selectedStyle
                            : null,
                          selectedCrop?.length >= 5 &&
                          !selectedCrop?.includes(item.item.cropid) &&
                          limitExceed == item.item.cropid
                            ? styles.errorStyle
                            : null,
                        ]}
                        onPress={() => selectCrop(item.item.cropid)}>
                        <View style={{paddingHorizontal: 6, paddingBottom: 4}}>
                          {/* <Image
                            source={{uri: item.item.image}}
                            style={{
                              width: 0.17 * width,
                              height: 0.081 * height,
                            }}
                            resizeMode="contain"
                          /> */}
                          {/* <ImageComponent  source={{uri:item.item.image}}
                            style={{
                              width: 0.17 * width, height: 0.081 * height
                            }}/> */}
                          <FastImage
                            style={{
                              width: 0.17 * width,
                              height: 0.081 * height,
                            }}
                            source={{
                              uri: item.item.image,
                              priority: FastImage.priority.normal,
                            }}
                            resizeMode={FastImage.resizeMode.contain}
                          />
                        </View>
                        <Text style={FontStyle.fontMedium12}>
                          {item.item.name}
                        </Text>
                      </Pressable>
                    </>
                  );
                }}
              />
            ) : null}
          </ScrollView>
          <View style={{marginTop: 24, marginHorizontal: 16}}>
            <Button
              title={translate('__CONTINUE__')}
              bgGreen
              fontSize={16}
              onPress={validationNocropSelected}
            />
          </View>
          <View style={{marginTop: 8, marginHorizontal: 16}}>
            <Button
              title={translate('__CANCEL_')}
              bgWhite
              fontSize={16}
              onPress={closeModel}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default SelectionModel;

const styles = StyleSheet.create({
  card: {
    borderRadius: commanRadius.radi6,
    backgroundColor: ColorVariable.white,
    padding: 10,
    elevation: 5,
    alignItems: 'center',
    margin: 8,
    borderWidth: 2,
    borderColor: ColorVariable.white,
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
    minWidth:"90%"
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
