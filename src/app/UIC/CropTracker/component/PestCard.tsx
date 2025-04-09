import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import TextTranslation from '../../../commonResources/component/CommonInput/TextTranslation';
import {FontStyle} from '../../../../asset/style/FontsStyle';
import {PestAdd} from '../../../../asset/img';
import {CommonStyle, commanRadius} from '../../../../asset/style/commonStyle';
import FastImage from 'react-native-fast-image';

interface DataType {
  sowingStages: any;
  activeStage: string;
  // previousDisease: any;
  setpestmodalVisible: any;
  CurrentDisease: any;
  previousDiseaseDate:any
}

const PestCard = ({
  sowingStages,
  activeStage,
  // previousDisease,
  setpestmodalVisible,
  CurrentDisease,
  previousDiseaseDate
}: DataType) => {
  const [fliterArray, setfliterArray] = useState<any>({});
  const [Disease, setDisease] = useState([])

  useEffect(() => {
    const filterData = sowingStages?.filter((ele: any) => {
      return activeStage == ele.stageId;
    });
    setfliterArray(filterData[0]);
  }, [activeStage, sowingStages]);

  useEffect(() => {
    let filter =
    previousDiseaseDate[0]?.cropStageAndDiseaseIds?.map(
      (item: any) => {
        return CurrentDisease.filter((ele: any) => {
          return ele.cropStageAndDiseaseId == item;
        });
      },
    );
  setDisease(filter?.flat())
  }, [CurrentDisease,previousDiseaseDate])
  
  return (
    <>
      {CurrentDisease.length == 0 ? (
        <View>
          <View style={[CommonStyle.flex_dirRow_alignCenter, styles.info]}>
            <Image
              source={require('../../../../asset/img/updatedImg/info.png')}
              style={{width: 20, height: 20}}
            />
            <TextTranslation
              style={[FontStyle.fontMedium12, {marginLeft: 8}]}
              text={'__NO_PEST__'}
            />
          </View>
          <View style={[{paddingTop: 20, paddingHorizontal: 17}]}>
            <TextTranslation
              style={[FontStyle.fontHeavy18, {color: 'rgba(36, 39, 52, 0.3)'}]}
              text={'__PEST_DISEASE__'}
            />
          </View>
          <View style={styles.pestCard}>
            <PestAdd opacity={0.3} />
            <TextTranslation
              style={[
                FontStyle.fontMedium12,
                {marginTop: 16, color: 'rgba(36, 39, 52, 0.3)'},
              ]}
              text={'__ADD_DISEASE__'}
            />
          </View>
        </View>
      ) : fliterArray?.isCurrentStage === true &&
        Disease?.length != 0 && Disease!=undefined ? (
        <View>
          <View
            style={[
              {paddingTop: 20, paddingHorizontal: 16},
              CommonStyle.flex_dirRow_alignCenter_justifySpbtw,
            ]}>
            <TextTranslation
              style={FontStyle.fontHeavy18}
              text={'__PEST_DISEASE__'}
            />
            <TextTranslation
              style={[
                FontStyle.fontRegular14,
                {textDecorationLine: 'underline'},
              ]}
              text={'__EDIT__'}
              onPress={() => setpestmodalVisible(true)}
            />
          </View>
          <View
            style={[
              CommonStyle.flex_dirRow_alignCenter,
              {paddingVertical: 12, paddingHorizontal: 12, flexWrap: 'wrap'},
            ]}>
            {Disease?.map((item: any, index: any) => {
              return (
                <View style={styles.diseaseCard} key={index}>
                  <View>
                    <FastImage
                      source={{uri: item.diseaseImage}}
                      style={{
                        width: 80,
                        height: 68,
                        borderTopLeftRadius: 6,
                        borderTopRightRadius: 6,
                      }}
                    />
                  </View>
                  <View style={{marginTop: 8}}>
                    <Text style={FontStyle.fontMedium12}>
                      {item.diseaseName}
                    </Text>
                  </View>
                </View>
              );
            })}
          </View>
        </View>
      ) : fliterArray?.isCurrentStage === true ? (
        <View>
          <View style={[{paddingTop: 20, paddingHorizontal: 17}]}>
            <TextTranslation
              style={FontStyle.fontHeavy18}
              text={'__PEST_DISEASE__'}
            />
          </View>
          <Pressable
            style={styles.pestCard}
            onPress={() => setpestmodalVisible(true)}>
            <PestAdd />
            <TextTranslation
              style={[FontStyle.fontMedium12, {marginTop: 16}]}
              text={'__ADD_DISEASE__'}
            />
          </Pressable>
        </View>
      ) : (
        <View>
          <View style={[CommonStyle.flex_dirRow_alignCenter, styles.info]}>
            <Image
              source={require('../../../../asset/img/updatedImg/info.png')}
              style={{width: 20, height: 20}}
            />
            <TextTranslation
              style={[FontStyle.fontMedium12, {marginLeft: 8}]}
              text={'__PEST_ERROR__'}
            />
          </View>
          <View style={[{paddingTop: 20, paddingHorizontal: 17}]}>
            <TextTranslation
              style={[FontStyle.fontHeavy18, {color: 'rgba(36, 39, 52, 0.3)'}]}
              text={'__PEST_DISEASE__'}
            />
          </View>
          <View style={styles.pestCard}>
            <PestAdd opacity={0.3} />
            <TextTranslation
              style={[
                FontStyle.fontMedium12,
                {marginTop: 16, color: 'rgba(36, 39, 52, 0.3)'},
              ]}
              text={'__ADD_DISEASE__'}
            />
          </View>
        </View>
      )}
    </>
  );
};

export default React.memo(PestCard);

const styles = StyleSheet.create({
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
  info: {
    padding: 8,
    backgroundColor: 'rgba(242, 244, 255, 1)',
    borderRadius: commanRadius.radi6,
    marginTop: 16,
    marginHorizontal: 16,
  },
  diseaseCard: {
    borderRadius: commanRadius.radi6,
    paddingBottom: 10,
    backgroundColor: 'white',
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 4,
  },
});
