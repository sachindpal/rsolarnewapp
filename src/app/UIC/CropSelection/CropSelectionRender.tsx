import {
  Dimensions,
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import HeaderWithBack from '../../commonResources/component/Header/HeaderWithBack';
import {
  ColorVariable,
  CommonStyle,
  commanRadius,
} from '../../../asset/style/commonStyle';
import {FontStyle} from '../../../asset/style/FontsStyle';
import {FlatList} from 'react-native-gesture-handler';
import Button from '../../commonResources/component/CommonButton/Button';
import {useTranslation} from 'react-i18next';
import SelectionModel from './component/SelectionModel';
import TextTranslation from '../../commonResources/component/CommonInput/TextTranslation';
import {useRoute} from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import CardSkeletonLoader from '../../commonResources/component/CardSkeletonLoader';

interface DataType {
  selectCrop: (crop: string) => void;
  error: string;
  validationNocropSelected: () => void;
  selectedCrop: string[];
  limitExceed: string;
  closeModel: () => void;
  modelVisible: boolean;
  addCropFunction: any;
  addCrops: any;
  stateCropsData: any;
  cropData: any;
  isloadingStateData: boolean;
  isloadingCropData: boolean;
}
const {width, height} = Dimensions.get('screen');

const CropSelectionRender = ({
  limitExceed,
  selectCrop,
  error,
  validationNocropSelected,
  selectedCrop,
  modelVisible,
  closeModel,
  addCropFunction,
  addCrops,
  stateCropsData,
  cropData,
  isloadingStateData,
  isloadingCropData,
}: DataType) => {
  const {t} = useTranslation();
  const route = useRoute<any>();
  const heading =
    route.params?.screen === 'UICRegistration'
      ? '__UIC_REG__'
      : route.params?.screen === 'EditCrop'
      ? '__EDIT_CROP__'
      : '__ADDCROP__';

  const subHeading =
    route.params?.screen === 'UICRegistration'
      ? '__ADD_YOUR_CROP__'
      : route.params?.screen === 'EditCrop'
      ? '__EDIT_YOUR_CROP__'
      : '__ADD_YOUR_CROP__';

  return (
    <View style={CommonStyle.mainViewWhite}>
      <HeaderWithBack title={heading} />
      <View style={{flex: 1}}>
        <View style={{paddingTop: 24, paddingLeft: 20, marginBottom: 8}}>
          <TextTranslation style={FontStyle.fontHeavy18} text={subHeading} />
          <TextTranslation
            style={[FontStyle.fontRegular14]}
            text={'__CROP_LIMIT_ERROR__'}
          />
          {error !== '' ? (
            <TextTranslation
              style={[
                FontStyle.fontRegular14,
                {color: ColorVariable.errorRed, marginTop: 8},
              ]}
              text={error}
            />
          ) : null}
          {limitExceed !== '' ? (
            <TextTranslation
              style={[
                FontStyle.fontRegular14,
                {color: ColorVariable.errorRed, marginTop: 8},
              ]}
              text={'__MAX_LIMIT_CROP_SELECT__'}
            />
          ) : null}
        </View>

        <View
          style={{
            paddingHorizontal: 12,
            alignItems: 'center',
            flex: 1,
            flexGrow: 1,
          }}>
          {route.params?.screen === 'addCrop' ? (
            <>
              {!isloadingStateData ? (
                <FlatList
                  data={stateCropsData}
                  keyExtractor={(_, index) => index.toString()}
                  numColumns={3}
                  showsVerticalScrollIndicator={false}
                  scrollEnabled={true}
                  contentContainerStyle={{ flexGrow: 1}}
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
                            <Image
                              source={
                                item.item.image! !== 'static'
                                  ? {uri: item.item.image}
                                  : require('../../../asset/img/staticImg/More.png')
                              }
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
              ) : (
                <>
                  <View style={{marginVertical: 24}}>
                    <CardSkeletonLoader />
                  </View>
                  <View>
                    <CardSkeletonLoader />
                  </View>
                  <View style={{marginVertical: 24}}>
                    <CardSkeletonLoader />
                  </View>
                </>
              )}
            </>
          ) : !isloadingStateData ? (
            <FlatList
              data={stateCropsData}
              keyExtractor={(_, index) => index.toString()}
              numColumns={3}
              showsVerticalScrollIndicator={false}
              scrollEnabled={true}
              contentContainerStyle={{ flexGrow: 1}}
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
                      // onPress={() => console.log(typeof item.item.cropid)}
                      onPress={() => selectCrop(item.item.cropid)}>
                      <View style={{paddingHorizontal: 6, paddingBottom: 4}}>
                        {/* <ImageComponent
                          source={
                            item.item.image! !== 'static'
                              ? {uri: item.item.image}
                              : require('../../../asset/img/staticImg/More.png')
                          }
                          style={{width: 0.17 * width, height: 0.081 * height}}
                        /> */}
                        <FastImage
                          style={{
                            width: 0.17 * width,
                            height: 0.081 * height,
                          }}
                          source={
                            item.item.image! !== 'static'
                              ? {
                                  uri: item.item.image,
                                  priority: FastImage.priority.normal,
                                }
                              : require('../../../asset/img/staticImg/More.png')
                          }
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
          ) : (
            <>
              <View style={{marginVertical: 24}}>
                <CardSkeletonLoader />
              </View>
              <View>
                <CardSkeletonLoader />
              </View>
              <View style={{marginVertical: 24}}>
                <CardSkeletonLoader />
              </View>
            </>
          )}
        </View>
        <View style={CommonStyle.fotterButton}>
          <Button
            title={t('__CONTINUE__')}
            bgGreen
            fontSize={16}
            onPress={validationNocropSelected}
          />
        </View>
      </View>
      <SelectionModel
        selectCrop={selectCrop}
        error={error}
        validationNocropSelected={validationNocropSelected}
        selectedCrop={selectedCrop}
        limitExceed={limitExceed}
        closeModel={closeModel}
        modelVisible={modelVisible}
        param={route.params?.screen}
        addCrops={addCrops}
        addCropFunction={addCropFunction}
        cropData={cropData}
        isloadingCropData={isloadingCropData}
      />
    </View>
  );
};

export default CropSelectionRender;

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
});
