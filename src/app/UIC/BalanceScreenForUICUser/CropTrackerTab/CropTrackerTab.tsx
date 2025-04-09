import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {
  ColorVariable,
  CommonStyle,
  commanRadius,
} from '../../../../asset/style/commonStyle';
import {Add, AddWhite} from '../../../../asset/img';
import {FontStyle} from '../../../../asset/style/FontsStyle';
import {ScrollView} from 'react-native-gesture-handler';
import TextTranslation from '../../../commonResources/component/CommonInput/TextTranslation';
import FastImage from 'react-native-fast-image';
import {useNavigation} from '@react-navigation/native';

const CropTrackerTab = ({
  navigationToCropTracker,
  navigationToAddCrop,
  cropBanner,
}: any) => {
  const navigation = useNavigation<any>();
  const getTotalDaysBetweenDates = (startDate: any, endDate: any) => {
    // Create Date objects
    const start = new Date(startDate);
    const end = new Date(endDate);

    // Calculate the difference in time
    const differenceInTime = end.getTime() - start.getTime();

    // Convert the difference in time to days
    const differenceInDays = Math.floor(differenceInTime / (1000 * 3600 * 24));

    return differenceInDays;
  };

  function getCurrentDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }

  const navigationToScreen = (
    cropId: any,
    custId: any,
    sowingDate: any,
    endDate: any,
    sowingDates: any,
  ) => {
    if (
      getTotalDaysBetweenDates(sowingDates, sowingDate) >
      getTotalDaysBetweenDates(sowingDates, endDate)
    ) {
      navigation.navigate('signIn', {
        screen: 'CropReport',
        params: {
          customerCropDataId: custId,
        },
      });
    } else {
      navigationToCropTracker(cropId, custId);
    }
  };

  return (
    <ScrollView
      style={{flex: 1, backgroundColor: 'white'}}
      showsVerticalScrollIndicator={false}>
      {cropBanner.length === 0 ? (
        <View style={[styles.note]}>
          <Image
            source={require('../../../../asset/img/updatedImg/info.png')}
            style={{width: 20, height: 20, marginRight: 8}}
          />
          <Text style={FontStyle.fontMedium12}>
            Currently no crops added for crop tracker, manage your farm
            effortlessly with our crop tracker
          </Text>
        </View>
      ) : null}
      {cropBanner.length != 5 ? (
        <Pressable
          style={[CommonStyle.alignCenter_justifyCenter, styles.btn]}
          onPress={navigationToAddCrop}>
          <AddWhite />
          <TextTranslation
            style={[FontStyle.fontHeavy16, {color: 'white', marginLeft: 10}]}
            text={'__ADD_CROP__'}
          />
        </Pressable>
      ) : null}
      {cropBanner.map((item: any, index: any) => {
        return (
          <Pressable
            onPress={() =>
              navigationToScreen(
                item.cropId,
                item.customerCropDataId,
                item.sowingDate,
                item.endDate,
                item.sowingDates,
              )
            }
            style={[styles.info, CommonStyle.flex_dirRow_alignCenter]}
            key={index}>
            <View style={[styles.img]}>
              <FastImage
                source={{
                  uri: item.image,
                  priority: FastImage.priority.normal,
                }}
                resizeMode={FastImage.resizeMode.contain}
                style={{width: 60, height: 60}}
              />
              <Text style={[FontStyle.fontMedium12, {marginTop: 4}]}>
                {item.name}
              </Text>
            </View>
            <View style={{flex: 1}}>
              <View
                style={[CommonStyle.flex_dirRow_alignCenter, {flexGrow: 1}]}>
                <TextTranslation
                  style={FontStyle.fontMedium14}
                  text={'__DAY__'}
                />
                <View
                  style={{
                    flex: 1,
                    backgroundColor: ColorVariable.stroke,
                    borderRadius: 6,
                    height: 8,
                    marginHorizontal: 8,
                  }}>
                  <View
                    style={{
                      backgroundColor: ColorVariable.farmkartGreen,
                      borderRadius: 6,
                      height: 8,
                      width: `${
                        (getTotalDaysBetweenDates(
                          item.sowingDates,
                          item.sowingDate,
                        ) < 0
                          ? 0
                          : getTotalDaysBetweenDates(
                              item.sowingDates,
                              item.sowingDate,
                            ) /
                            getTotalDaysBetweenDates(
                              item.sowingDates,
                              item.endDate,
                            )) * 100
                      }%`,
                    }}
                  />
                </View>
                <Text style={FontStyle.fontRegular14}>{`${
                  getTotalDaysBetweenDates(item.sowingDates, item.sowingDate) <
                  0
                    ? 0
                    : getTotalDaysBetweenDates(
                        item.sowingDates,
                        item.sowingDate,
                      ) >
                      getTotalDaysBetweenDates(item.sowingDates, item.endDate)
                    ? getTotalDaysBetweenDates(item.sowingDates, item.endDate)
                    : getTotalDaysBetweenDates(
                        item.sowingDates,
                        getCurrentDate(),
                      )
                }/${getTotalDaysBetweenDates(
                  item.sowingDates,
                  item.endDate,
                )}`}</Text>
              </View>
              <View
                style={[
                  CommonStyle.flex_dirRow_alignCenter,
                  {
                    borderColor: 'rgba(242, 244, 255, 1)',
                    borderWidth: 1,
                    borderRadius: 6,
                    overflow: 'hidden',
                  },
                ]}>
                <View
                  style={{
                    backgroundColor: ColorVariable.stroke,
                    paddingHorizontal: 8,
                    paddingVertical: 5,
                  }}>
                  <TextTranslation
                    style={FontStyle.fontMedium14}
                    text={'__CROP_STAGE__'}
                  />
                </View>
                <View style={{paddingHorizontal: 8}}>
                  <Text style={FontStyle.fontRegular14}>
                    {getTotalDaysBetweenDates(
                      item.sowingDates,
                      item.sowingDate,
                    ) > getTotalDaysBetweenDates(item.sowingDates, item.endDate)
                      ? 'Completed'
                      : item.stageName}
                  </Text>
                </View>
              </View>
            </View>
          </Pressable>
        );
      })}
    </ScrollView>
  );
};

export default React.memo(CropTrackerTab);

const styles = StyleSheet.create({
  btn: {
    backgroundColor: ColorVariable.farmkartGreen,
    height: 54,
    borderRadius: 6,
    flexDirection: 'row',
    marginBottom: 8,
  },
  img: {
    paddingHorizontal: 20,
    borderWidth: 0.5,
    alignItems: 'center',
    borderColor: ColorVariable.stroke,
    borderRadius: commanRadius.radi6,
    marginRight: 8,
    paddingVertical: 10,
    overflow: 'hidden',
  },
  info: {
    padding: 8,
    borderWidth: 1,
    borderColor: ColorVariable.stroke,
    borderRadius: commanRadius.radi6,
    marginBottom: 8,
    marginTop: 8,
    backgroundColor: 'white',
  },
  note: {
    backgroundColor: 'rgba(242, 244, 255, 1)',
    borderRadius: 6,
    padding: 8,
    marginBottom: 16,
    flexDirection: 'row',
  },
});
