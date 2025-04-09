import {ActivityIndicator, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {FontStyle} from '../../../../asset/style/FontsStyle';
import {ColorVariable} from '../../../../asset/style/commonStyle';
import {SvgUri} from 'react-native-svg';
import GlowingBorder from './NeonEffect';
import {hindiMonths} from './DateRange';


const StageCardRender = ({
  item,
  stage,
  onSelectStage,
  previousDiseaseDate,
  currentLang,
  sowingStages
}: any) => {
  const underSoil = [9, 16, 54, 11, 45];
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0'); // get day and pad with 0 if necessary
    const month =
      currentLang == 2
        ? hindiMonths[date.toLocaleString('default', {month: 'long'})]
        : date.toLocaleString('default', {month: 'long'}); // get full month name
    return `${day} ${month}`;
  };

  const [isLoading, setIsLoading] = React.useState(true);

  // Function to handle image loading
  const handleImageLoad = () => {
    setIsLoading(false);
  };

// console.log("=========sowingStages=",sowingStages)
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'flex-end',
        // backgroundColor:"yellow",
        // marginHorizontal:2,
        flex: 1,
      }}>
      <Pressable
        style={{alignItems: 'center', flexGrow: 1,flex:1}}
        onPress={() => onSelectStage(item.item.stageId, item.item.cropStageId)}
        disabled={item.item.isStageCompleted ? true : false}>
        {/* <Image source={img} style={style} /> */}
        <View
          style={{
            height: underSoil.includes(item.item.cropId) ? 290 : 220,
            justifyContent: 'flex-end',
          }}>
          <SvgUri uri={item.item.stageImage}  onLoad={handleImageLoad} style={{width:145,height:174}}/>
          {isLoading && <ActivityIndicator size={"small"} />}
        </View>
        <View
          style={{
            marginBottom: 24,
            marginTop: 24,
            width: '100%',
            borderRadius: 6,

            flexGrow: 1,
          }}>
          {item.item.isCurrentStage == true ? (
            <View style={{paddingLeft: 3}}>
              <GlowingBorder>
                <View
                  style={[
                    styles.stageCard,
                    {
                      backgroundColor:
                        item.item.isStageCompleted == true
                          ? 'rgba(191, 222, 180, 1)'
                          : stage === item.item.stageId
                          ? 'rgba(115, 190, 68, 1)'
                          : ColorVariable.white,
                      borderColor:
                        item.item.isStageCompleted == true
                          ? 'rgba(191, 222, 180, 1)'
                          : stage === item.item.stageId
                          ? 'rgba(115, 190, 68, 1)'
                          : item.item.isCurrentStage === true
                          ? ColorVariable.farmkartGreen
                          : ColorVariable.white,
                    },
                  ]}>
                  <View style={{flexDirection: 'row'}}>
                    <View
                      style={{
                        paddingBottom: 6,
                        paddingRight: 8,
                        justifyContent: 'flex-end',
                      }}>
                      {previousDiseaseDate?.map((item: any) => {
                        let day;
                        day = item.diseaseDate;
                        return day;
                      }).length != 0 ? (
                        <View
                          style={[
                            styles.dot,
                            {
                              marginBottom: 8,
                              backgroundColor: ColorVariable.errorRed,
                            },
                          ]}
                        />
                      ) : null}
                      {item.item.yellowDay != null ? (
                        <View
                          style={[
                            styles.dot,
                            {backgroundColor: 'rgba(252, 195, 50, 1)'},
                          ]}
                        />
                      ) : null}
                    </View>
                    <View>
                      <Text style={FontStyle.fontMedium10}>
                        {formatDate(item.item.fromDate)} - {formatDate(item.item.toDate)}
                      </Text>
                      <Text style={FontStyle.fontHeavy14}>
                        {item.item.stageName}
                      </Text>
                    </View>
                  </View>
                </View>
              </GlowingBorder>
            </View>
          ) : (
            <View
              style={[
                styles.stageCard,
                {
                  backgroundColor:
                    item.item.isStageCompleted == true
                      ? 'rgba(191, 222, 180, 1)'
                      : stage === item.item.stageId
                      ? 'rgba(115, 190, 68, 1)'
                      : ColorVariable.white,
                  borderColor:
                    item.item.isStageCompleted == true
                      ? 'rgba(191, 222, 180, 1)'
                      : stage === item.item.stageId
                      ? 'rgba(115, 190, 68, 1)'
                      : ColorVariable.white,
                },
              ]}>
              <View style={{flexDirection: 'row'}}>
                <View
                  style={{
                    paddingBottom: 6,
                    paddingRight: 8,
                    justifyContent: 'flex-end',
                  }}>
                  {new Date(item.item.fromDate).toISOString().split('T')[0] ===
                  previousDiseaseDate
                    ?.map((item: any) => {
                      let day;
                      day = item.diseaseDate;
                      return day;
                    })
                    .toString() ? (
                    <View
                      style={[
                        styles.dot,
                        {
                          marginBottom: 8,
                          backgroundColor: ColorVariable.errorRed,
                        },
                      ]}
                    />
                  ) : null}
                  {item.item.yellowDay != null ? (
                    <View
                      style={[
                        styles.dot,
                        {backgroundColor: 'rgba(252, 195, 50, 1)'},
                      ]}
                    />
                  ) : null}
                </View>
                <View>
                  <Text style={FontStyle.fontMedium10}>
                    {formatDate(item.item.fromDate)} - {formatDate(item.item.toDate)}
                  </Text>
                  <Text style={FontStyle.fontHeavy14}>{item.item.stageName}</Text>
                </View>
              </View>
            </View>
          )}
        </View>
      </Pressable>

      {item.index == sowingStages.length - 1 ? (
      <View style={{width: 24, marginRight: 26}} />
    ) : (
      <View style={styles.line} key={item.index} />
    )}
    </View>
  );
};

export default React.memo(StageCardRender);

const styles = StyleSheet.create({
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
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'blue',
  },
});
