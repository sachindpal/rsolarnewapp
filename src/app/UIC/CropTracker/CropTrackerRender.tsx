import {
  ImageBackground,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {
  ColorVariable,
  CommonStyle,
  commanRadius,
} from '../../../asset/style/commonStyle';
import {RightArrow, WhiteBack} from '../../../asset/img';
import {FontStyle} from '../../../asset/style/FontsStyle';
import {FlatList, ScrollView} from 'react-native-gesture-handler';
import TextTranslation from '../../commonResources/component/CommonInput/TextTranslation';
import {useTranslation} from 'react-i18next';
import DateRange, {hindiMonths} from './component/DateRange';
import GlowingBorder from './component/NeonEffect';
import Button from '../../commonResources/component/CommonButton/Button';
import PestCard from './component/PestCard';
import CardSkeletonLoader from '../../commonResources/component/CardSkeletonLoader';
import FastImage from 'react-native-fast-image';
import SkeletonLoader from '../../commonResources/component/SkeletonLoader';
import {SvgUri} from 'react-native-svg';
import {useNavigation} from '@react-navigation/native';
import StageCardRender from './component/StageCardRender';

interface DataType {
  // previousDisease: any;
  isloadingpreviousDisease: any;
  handleYellowAndRedDayModal: any;
  setpestmodalVisible: any;
  navigateToCropReport: () => void;
  editCropFunction: () => void;
  selectedCrop: any;
  activeCropId: any;
  isloadingselectedCrop: any;
  sowingStages: any;
  isloadingsowingStages: any;
  getCropDataOnchangeCrop: any;
  CurrentDisease: any;
  previousDiseaseDate: any;
  getCropStageId: any;
  currentLang: any;
}

const CropTrackerRender = ({
  // previousDisease,
  isloadingpreviousDisease,
  handleYellowAndRedDayModal,
  setpestmodalVisible,
  navigateToCropReport,
  editCropFunction,
  selectedCrop,
  isloadingselectedCrop,
  activeCropId,
  sowingStages,
  isloadingsowingStages,
  getCropDataOnchangeCrop,
  CurrentDisease,
  previousDiseaseDate,
  getCropStageId,
  currentLang,
}: DataType) => {
  const navigation = useNavigation<any>();
  const {t: translate} = useTranslation();
  const [current, setcurrent] = React.useState(0);

  const flatListRef = React.useRef<any>();

  const next = () => {
    if (current < 3) {
      console.log('next', current + 1);
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
  const [stage, setstage] = useState('');

  useEffect(() => {
    // let filter = sowingStages.filter((item: any) => {
    //   return item.isCurrentStage === true;
    // });
    const filter:any = [];
    for (let index = 0; index < sowingStages.length; index++) {
      const item = sowingStages[index];
       if(item.isCurrentStage === true){
        filter.push(item)
       }
    }
    console.log('sowingStages----------------------------------',filter)

    if (filter.length != 0) {
      setstage(filter[0]?.stageId);
    getCropStageId(filter[0]?.cropStageId);

    } else {
      setstage(sowingStages[0]?.stageId);
    getCropStageId(sowingStages[0]?.cropStageId);

    }

  }, [sowingStages]);



  const onSelectStage = (id: any, cropStageId: any) => {
    setstage(id);
    getCropStageId(cropStageId);
  };



  const CropList = useMemo(() => {
    return (
      <FlatList
        ref={flatListRef}
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
        data={selectedCrop}
        keyExtractor={(_, index) => index.toString()}
        horizontal
        style={{paddingTop: 12}}
        renderItem={({item, index}) => {
          return (
            <Pressable
              key={index}
              onPress={() =>
                getCropDataOnchangeCrop(item.customerCropDataId, item.cropId)
              }
              style={[
                styles.card,
                activeCropId == item.cropId ? styles.selectedStyle : null,
              ]}>
              <View style={{paddingHorizontal: 5, marginBottom: 8}}>
                <FastImage
                  source={{uri: item.image}}
                  // style={{width: 0.17 * width, height: 0.081 * height}}
                  style={{width: 60, height: 60}}
                />
              </View>
              <Text style={FontStyle.fontMedium12}>{item.name}</Text>
            </Pressable>
          );
        }}
      />
    );
  }, [selectedCrop, activeCropId]);

  const navigationToUIC = () => {
    navigation.navigate('BottomTabBar', {screen: 'UIC'});
  };

  return (
    <View style={CommonStyle.mainViewWhite}>
      <View style={[styles.main, CommonStyle.flex_dirRow_alignCenter]}>
        <Pressable onPress={navigationToUIC}>
          <WhiteBack />
        </Pressable>
        <View style={{flex: 1, marginLeft: 16}}>
          <TextTranslation
            style={[FontStyle.fontMedium18, {color: ColorVariable.white}]}
            text={'__CROPTRACKER__'}
          />
        </View>
      </View>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <View
          style={[
            {paddingTop: 24, paddingHorizontal: 20},
            CommonStyle.flex_dirRow_alignCenter_justifySpbtw,
          ]}>
          <TextTranslation style={FontStyle.fontHeavy18} text={'__CROPS__'} />
          <TextTranslation
            style={[FontStyle.fontRegular14, {textDecorationLine: 'underline'}]}
            text={'__EDIT__'}
            onPress={editCropFunction}
          />
        </View>
        <View style={{marginLeft: 4}}>
          {!isloadingselectedCrop ? CropList : <CardSkeletonLoader />}
          {selectedCrop.length > 3 ? (
            <Pressable style={styles.rightArrow} onPress={next}>
              <RightArrow width={24} height={24} />
            </Pressable>
          ) : null}
        </View>
        <View
          style={[{paddingTop: 20, paddingBottom: 24, paddingHorizontal: 20}]}>
          <TextTranslation
            style={FontStyle.fontHeavy18}
            text={'__CROP_STAGE__'}
          />
        </View>
        <View>
          <ImageBackground
            source={require('../../../asset/img/updatedImg/Background.png')}
            resizeMode="cover"
            style={{flexGrow: 1}}>
            <View>
              {!isloadingpreviousDisease ? (
                <FlatList
                  data={sowingStages}
                  horizontal
                  contentContainerStyle={{flexGrow: 1}}
                  style={{paddingHorizontal: 24}}
                  keyExtractor={item => item.cropStageId.toString()}
                  removeClippedSubviews={true}
                  initialNumToRender={6}
                  maxToRenderPerBatch={5}
                  windowSize={10}
                  renderItem={(item) => {
                    return (
                      <StageCardRender
                        item={item}
                        stage={stage}
                        previousDiseaseDate={previousDiseaseDate}
                        currentLang={currentLang}
                        onSelectStage={onSelectStage}
                        sowingStages={sowingStages}
                      />
                    );
                  }}
                />
              ) : (
                <>
                  <View style={{alignItems: 'center', marginTop: 50}}>
                    <SkeletonLoader
                      width={'95%'}
                      height={246}
                      variant="box"
                      variant2="dark"
                    />
                  </View>
                </>
              )}
            </View>
            <View>
              {!isloadingpreviousDisease ? (
                <View style={{paddingRight: 12}}>
                  {sowingStages.map((item: any, index: any) => {
                    return (
                      <View key={index}>
                        {item.stageId == stage ? (
                          <View>
                            <DateRange
                              handleModal={handleYellowAndRedDayModal}
                              fromDate={item.fromDate}
                              toDate={item.toDate}
                              yellowDate={item.yellowDay}
                              previousDiseaseDate={previousDiseaseDate}
                              currentLang={currentLang}
                            />
                          </View>
                        ) : null}
                      </View>
                    );
                  })}
                </View>
              ) : (
                <View style={{alignItems: 'center', marginTop: 24}}>
                  <SkeletonLoader
                    width={'95%'}
                    height={125}
                    variant="box"
                    variant2="dark"
                  />
                </View>
              )}
            </View>
          </ImageBackground>
        </View>
        {!isloadingpreviousDisease ? (
          <>
            <PestCard
              sowingStages={sowingStages}
              activeStage={stage}
              // previousDisease={previousDisease}
              setpestmodalVisible={setpestmodalVisible}
              previousDiseaseDate={previousDiseaseDate}
              CurrentDisease={CurrentDisease}
            />
            <View style={{paddingHorizontal: 24, paddingVertical: 40}}>
              <Button
                title={translate('__CROP_REPORT__')}
                fontSize={16}
                bgGreen
                onPress={navigateToCropReport}
              />
            </View>
          </>
        ) : (
          <View style={{alignItems: 'center', marginVertical: 24}}>
            <SkeletonLoader
              width={'95%'}
              height={70}
              variant="box"
              variant2="dark"
            />
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default React.memo(CropTrackerRender);

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
  stageCard: {
    borderRadius: 6,
    borderWidth: 2,
    borderColor: ColorVariable.white,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  line: {
    marginBottom: 48,
    borderTopWidth: 3,
    borderTopColor: 'rgba(191, 222, 180, 1)',
    borderStyle: 'dotted',

    width: 48,
  },
  pestCard: {
    marginTop: 16,
    marginLeft: 16,
    width: 80,
    height: 99,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 6,
    elevation: 5,
  },
  main: {
    backgroundColor: ColorVariable.blueBlack,
    justifyContent: 'center',
    paddingHorizontal: 16,
    height: 64,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'blue',
  },
});
