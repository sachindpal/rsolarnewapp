import {
  ActivityIndicator,
  Dimensions,
  Image,
  Modal,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useCallback, useContext, useEffect, useState} from 'react';
import {
  ColorVariable,
  CommonStyle,
  commanRadius,
} from '../../../asset/style/commonStyle';
import HeaderWithBack from '../../commonResources/component/Header/HeaderWithBack';

import {FlatList, ScrollView} from 'react-native-gesture-handler';
import {FontStyle} from '../../../asset/style/FontsStyle';
import {RightArrow} from '../../../asset/img';
import TextInputField from '../../commonResources/component/CommonInput/TextInputField';
import TextTranslation from '../../commonResources/component/CommonInput/TextTranslation';
import SwipeButton from '../../Cart/CheckOutScreen/Component/SwipeButton';
import DateTimePicker from '@react-native-community/datetimepicker';
import {useTranslation} from 'react-i18next';
import Button from '../../commonResources/component/CommonButton/Button';
import FastImage from 'react-native-fast-image';

const {width, height} = Dimensions.get('screen');

const arr = ['Plant', 'Seed', 'Tuber'];

interface DataType {
  crop: any;
  sowingType: any;
  dateShow: any;
  sowingDate: any;
  error: any;
  handleCropData: any;
  dateHandle: any;
  cropSelection: any;
  navigateToUICNumbScreen: any;
  setdateShow: any;
  params: string;
  sowingData: any;
  isloading: boolean;
  SowingDataForSubmit: any;
  handleCropNameData: any;
  otherName: any;
}

const CropInfoRender = ({
  crop,
  sowingType,
  dateShow,
  sowingData,
  error,
  handleCropData,
  dateHandle,
  cropSelection,
  navigateToUICNumbScreen,
  setdateShow,
  params,
  isloading,
  SowingDataForSubmit,
  handleCropNameData,
  otherName,
  sowingDate,
}: DataType) => {
  const {t: translate} = useTranslation();
  const [current, setcurrent] = React.useState(0);
  const flatListRef = React.useRef<any>();
  const [duration, setduration] = useState<any>();

  const next = () => {
    if (current < 3) {
      setcurrent(current + 1);
      flatListRef.current.scrollToIndex({index: current + 1, animated: true});
    }
  };

  const onScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const index = event.nativeEvent.contentOffset.x / 80;
      const roundIndex = Math.round(index);
      setcurrent(roundIndex);
      return roundIndex;
    },
    [],
  );

  const minDate = new Date();

  useEffect(() => {
    sowingData.map((item: any) => {
      return item.cropId === crop
        ? setduration(
            new Date(
              minDate.setDate(minDate.getDate() - item.cropCycleDuration),
            ),
          )
        : minDate;
    });
  }, [crop]);

  const formatDateString = (dateString: any) => {
    if (!dateString) return 'Select Date';
    const [year, month, day] = dateString?.split('-');
    return `${day}-${month}-${year}`;
  };

  console.log('========params======', params);

  const heading =
    params === 'UICRegistration'
      ? '__UIC_REG__'
      : params === 'EditCrop'
      ? '__EDIT_CROP__'
      : '__ADDCROP__';
  return (
    <View style={CommonStyle.mainViewWhite}>
      <HeaderWithBack title={heading} />
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        {!isloading ? (
          <View style={{flex: 1}}>
            <View style={{paddingTop: 16, paddingHorizontal: 20}}>
              <TextTranslation
                style={FontStyle.fontHeavy18}
                text={'__CROPS__'}
              />
            </View>
            <View style={{marginLeft: 4}}>
              {params === 'addCrop' ? (
                <>
                  <FlatList
                    ref={flatListRef}
                    showsHorizontalScrollIndicator={false}
                    onScroll={onScroll}
                    data={sowingData}
                    keyExtractor={(_, index) => index.toString()}
                    horizontal
                    style={{paddingTop: 16}}
                    renderItem={({item}) => {
                      return (
                        <>
                          <Pressable
                            style={[
                              styles.card,
                              crop == item.cropId ? styles.selectedStyle : null,
                              item.previousSowingDate !== null
                                ? styles.selectedStyle
                                : null,
                              error && error.cropRemaining
                                ? styles.errorStyle
                                : null,
                            ]}
                            disabled={
                              item.previousSowingDate !== null ? true : false
                            }
                            onPress={() => cropSelection('crop', item.cropId)}>
                            {/* > */}
                            <View
                              style={{paddingHorizontal: 5, marginBottom: 8}}>
                              <Image
                                source={{uri: item.image}}
                                style={{width: 60, height: 60}}
                              />
                            </View>
                            <Text style={FontStyle.fontMedium12}>
                              {item.name}
                            </Text>
                            {item.previousSowingDate !== null ? (
                              <View
                                style={{
                                  width: 96,
                                  height: 110,
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
                  <Pressable style={styles.rightArrow} onPress={next}>
                    <RightArrow width={24} height={24} />
                  </Pressable>
                </>
              ) : (
                <>
                  <FlatList
                    ref={flatListRef}
                    showsHorizontalScrollIndicator={false}
                    onScroll={onScroll}
                    data={sowingData}
                    keyExtractor={(_, index) => index.toString()}
                    horizontal
                    style={{paddingTop: 16}}
                    renderItem={({item}) => {
                      return (
                        <>
                          <Pressable
                            style={[
                              styles.card,
                              crop == item.cropId ? styles.selectedStyle : null,
                              error &&
                              error.cropRemaining &&
                              error.cropId == item.cropId
                                ? styles.errorStyle
                                : null,
                            ]}
                            onPress={() => cropSelection('crop', item.cropId)}>
                            {/* > */}
                            <View
                              style={{paddingHorizontal: 5, marginBottom: 8}}>
                              <Image
                                source={{uri: item.image}}
                                style={{width: 60, height: 60}}
                              />
                            </View>
                            <Text style={FontStyle.fontMedium12}>
                              {item.name}
                            </Text>
                          </Pressable>
                        </>
                      );
                    }}
                  />
                  <Pressable style={styles.rightArrow} onPress={next}>
                    <RightArrow width={24} height={24} />
                  </Pressable>
                </>
              )}

              {error && error.cropRemaining ? (
                <TextTranslation
                  style={[FontStyle.fontMedium14, styles.textError]}
                  text={error.cropRemaining}
                />
              ) : null}
            </View>
            {sowingData.map((ite: any, index: any) => {
              return ite.name == 'Other' && crop == 56 ? (
                <View style={{paddingTop: 16}} key={index}>
                  <TextTranslation
                    style={[FontStyle.fontHeavy18, {marginHorizontal: 20}]}
                    text={'__CROP_NAME__'}
                  />
                  <View style={{paddingHorizontal: 8, paddingTop: 16}}>
                    <TextInputField
                      placeholder={translate('__PLACEHOLDER_CROP_NAME__')}
                      value={otherName}
                      onChangeText={e => handleCropNameData(e)}
                      error={error.cropName}
                    />
                  </View>
                </View>
              ) : null;
            })}

            <View style={{paddingTop: 16}}>
              <TextTranslation
                style={[FontStyle.fontHeavy18, {marginHorizontal: 20}]}
                text={'__SOWING_DATE__'}
              />
              {SowingDataForSubmit.map((item: any, index: any) => {
                return (
                  <View key={index}>
                    {item.cropId === crop ? (
                      <Pressable
                        style={[
                          styles.date,
                          {
                            borderColor:
                              error && error.sowingDate
                                ? ColorVariable.errorRed
                                : '#cacfe3',
                          },
                        ]}
                        onPress={() => setdateShow(!dateShow)}>
                        {item.sowingDate == null ? (
                          <TextTranslation
                            style={[
                              FontStyle.fontMedium16,
                              {color: ColorVariable.gray},
                            ]}
                            text={'__SOWING_DATE_PLACEHOLDER__'}
                          />
                        ) : (
                          <Text style={[FontStyle.fontMedium16]}>
                            {formatDateString(item.sowingDate)}
                          </Text>
                        )}
                      </Pressable>
                    ) : null}
                  </View>
                );
              })}

              {error && error.sowingDate ? (
                <TextTranslation
                  style={[FontStyle.fontMedium14, styles.textError]}
                  text={error.sowingDate}
                />
              ) : null}
            </View>
            <View style={{paddingTop: 16, marginBottom: 24}}>
              <TextTranslation
                style={[
                  FontStyle.fontHeavy18,
                  {marginHorizontal: 20, marginBottom: 16},
                ]}
                text={'__SOWING_TYPE__'}
              />
              {sowingData.map((ite: any, index: any) => {
                return (
                  <View
                    key={index}
                    style={[
                      CommonStyle.flex_dirRow_alignCenter,
                      {marginHorizontal: 8},
                    ]}>
                    {ite.cropId === crop
                      ? ite.allSowingTypes.map((item: any, index: any) => {
                          return (
                            <Pressable
                              key={index}
                              style={[
                                styles.card,
                                sowingType == item.sowingTypeid ||
                                ite.previousSowingTypeId == item.sowingTypeid
                                  ? styles.selectedStyle
                                  : null,
                                error && error.sowingType
                                  ? styles.errorStyle
                                  : null,
                              ]}
                              onPress={() => [
                                handleCropData(item.sowingTypeid),
                              ]}>
                              <View
                                style={{
                                  paddingHorizontal: 5,
                                  marginBottom: 8,
                                }}>
                                <FastImage
                                  source={{uri: item.image}}
                                  style={{
                                    width: 0.16 * width,
                                    height: 0.08 * height,
                                  }}
                                />
                              </View>
                              <Text style={FontStyle.fontMedium12}>
                                {item.sowingTypeName}
                              </Text>
                            </Pressable>
                          );
                        })
                      : null}
                  </View>
                );
              })}
              {error && error.sowingType ? (
                <TextTranslation
                  style={[FontStyle.fontMedium14, styles.textError]}
                  text={error.sowingType}
                />
              ) : null}
            </View>
          </View>
        ) : (
          <View style={[CommonStyle.alignCenter_justifyCenter, {flex: 1}]}>
            <ActivityIndicator size={'large'} />
          </View>
        )}
        {!isloading ? (
          params === 'UICRegistration' ? (
            <View style={styles.silderFooter}>
              <SwipeButton
                img="lock"
                navigateToOrderSucess={navigateToUICNumbScreen}
                // navigateToOrderSucess={() => {}}
                title="Unlock UIC Benifits"
              />
            </View>
          ) : params === 'EditCrop' || 'AddCrop' ? (
            <View style={CommonStyle.fotterButton}>
              <Button
                title={translate('__CROP_TRACKER__')}
                fontSize={16}
                bgGreen
                onPress={navigateToUICNumbScreen}
              />
            </View>
          ) : null
        ) : null}
      </ScrollView>

      {dateShow ? (
        <View>
          <DateTimePicker
            value={sowingDate == '' ? new Date() : new Date(sowingDate)}
            mode="date"
            display="spinner"
            // maximumDate={new Date()}
            minimumDate={duration}
            onChange={dateHandle}
          />
        </View>
      ) : null}
    </View>
  );
};

export default React.memo(CropInfoRender);

const styles = StyleSheet.create({
  card: {
    borderRadius: commanRadius.radi6,
    backgroundColor: ColorVariable.white,
    padding: 10,
    elevation: 5,
    alignItems: 'center',
    margin: 4,
    borderWidth: 2,
    borderColor: ColorVariable.white,
  },
  rightArrow: {
    elevation: 5,
    backgroundColor: 'white',
    paddingHorizontal: 4,
    paddingVertical: 12,
    justifyContent: 'center',
    borderTopLeftRadius: 6,
    borderBottomLeftRadius: 6,
    position: 'absolute',
    top: 50,
    right: 0,
  },
  date: {
    marginHorizontal: 8,
    height: 54,
    justifyContent: 'center',
    paddingLeft: 16,
    borderRadius: commanRadius.radi6,
    borderWidth: 1,
    marginTop: 16,
  },
  silderFooter: {
    // position: "absolute",
    // bottom: 0,
    // left: 0,
    // right: 0,
    backgroundColor: ColorVariable.blueBlack,
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  errorStyle: {
    borderWidth: 2,
    borderColor: ColorVariable.errorRed,
  },
  selectedStyle: {
    borderWidth: 2,
    borderColor: ColorVariable.farmkartGreen,
  },
  textError: {
    color: ColorVariable.errorRed,
    marginTop: 8,
    marginHorizontal: 8,
  },
});
