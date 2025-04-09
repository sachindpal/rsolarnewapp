import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import {
  ColorVariable,
  CommonStyle,
  commanRadius,
} from '../../../asset/style/commonStyle';
import {CloseBlack, DarkLogo} from '../../../asset/img';
import {FontStyle} from '../../../asset/style/FontsStyle';
import {useNavigation} from '@react-navigation/native';
import TextTranslation from '../../commonResources/component/CommonInput/TextTranslation';
import {useTranslation} from 'react-i18next';

const Disclaimer = [
  '__DISCLA_ONE__',
  '__DISCLA_TWO__',
  '__DISCLA_THREE__',
  '__DISCLA_FOUR__',
];

const CropReportRender = ({cropReport, isloading}: any) => {
  const navigation = useNavigation();
  const {t} = useTranslation();
  const goBack = () => {
    navigation.goBack();
  };
  const UserInfo = ({title, value}: any) => {
    return (
      <>
        <View
          style={[
            {paddingHorizontal: 16, paddingBottom: 8},
            CommonStyle.flex_dirRow_alignCenter_justifySpbtw,
          ]}>
          <TextTranslation
            style={[FontStyle.fontRegular16, {color: ColorVariable.gray}]}
            text={title}
          />
          <Text style={[FontStyle.fontHeavy16]}>{value}</Text>
        </View>
      </>
    );
  };

  const StageInfo = () => {
    return (
      <View>
        {cropReport.stageData.map((item: any, index: any) => {
          return (
            <View style={styles.stage} key={index}>
              {item.header !== '' ? (
                <View style={styles.header}>
                  <Text style={FontStyle.fontHeavy14}>
                    {item.stageName}({item.fromDate} - {item.toDate})
                  </Text>
                </View>
              ) : null}
              <View
                style={[
                  {
                    borderBottomWidth: 1,
                    borderBottomColor: '#DCE0EF',
                    flexDirection: 'row',
                  },
                ]}>
                <View style={styles.title}>
                  <TextTranslation
                    style={FontStyle.fontMedium14}
                    text={'__DATE__'}
                  />
                </View>
                <View style={styles.value}>
                  <Text style={FontStyle.fontHeavy14}>{item.fromDate}</Text>
                </View>
              </View>
              <View
                style={[
                  {
                    borderBottomWidth: 1,
                    borderBottomColor: '#DCE0EF',
                    flexDirection: 'row',
                  },
                ]}>
                <View style={styles.title}>
                  <TextTranslation
                    style={FontStyle.fontMedium14}
                    text={'__PEST_DISEASE__'}
                  />
                </View>
                <View style={styles.value}>
                  <Text style={FontStyle.fontHeavy14}>
                    {item.redDay?.map((item: any) => {
                      return item?.diseaseDetail?.map((items: any,ind:any) => {
                        if(ind!=item?.diseaseDetail?.length-1){
                          return `${items.diseaseName}, `;
                        }else{
                          return items.diseaseName;
                        }
                      });
                    })}
                  </Text>
                </View>
              </View>
              <View
                style={[
                  {
                    borderBottomWidth: 1,
                    borderBottomColor: '#DCE0EF',
                    flexDirection: 'row',
                  },
                ]}>
                <View style={styles.title}>
                  <Text style={FontStyle.fontMedium14}>Grow tip</Text>
                </View>
                <View style={styles.value}>
                  <Text style={FontStyle.fontHeavy14}>
                    {item.redDay?.map((item: any) => {
                      return item?.suggestion;
                    })}{' '}
                    {item.yellowDay?.suggestion}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  paddingHorizontal: 12,
                  paddingVertical: 6,
                  backgroundColor: '#F8F9FF',
                  alignItems: 'center',
                }}>
                <TextTranslation
                  style={FontStyle.fontRegular14}
                  text={'__CHEMICAL_REC__'}
                />
              </View>
              <View style={{paddingHorizontal: 12, paddingVertical: 12}}>
                <Text style={FontStyle.fontHeavy14}>
                  {item.yellowDay?.chemicalNames?.map((item: any) => {
                    return item.chemicalName;
                  })}

                  {item.redDay?.map((item: any) => {
                    return item?.diseaseDetail?.map((item: any) => {
                      return item.chemicalNames?.map((item: any) => {
                        return item.chemicalName;
                      });
                    });
                  })}
                </Text>
              </View>
              <View
                style={{
                  paddingHorizontal: 12,
                  paddingVertical: 6,
                  backgroundColor: '#F8F9FF',
                  alignItems: 'center',
                }}>
                <TextTranslation
                  style={FontStyle.fontRegular14}
                  text={'__PRODUCT_REC__'}
                />
              </View>
              <View style={{paddingHorizontal: 12, paddingVertical: 12}}>
                <Text style={FontStyle.fontHeavy14}>
                  {item?.productNames?.map((item: any) => {
                    return item.name;
                  })}
                </Text>
              </View>
            </View>
          );
        })}
      </View>
    );
  };

  let date = new Date();

  return (
    <View style={{flex: 1}}>
      <ScrollView
        style={[CommonStyle.sheet]}
        contentContainerStyle={{flexGrow: 1}}>
        <View style={{paddingHorizontal: 20, paddingVertical: 20}}>
          <Pressable style={{width: 45}} onPress={goBack}>
            <CloseBlack />
          </Pressable>
          <View style={{alignItems: 'center', marginTop: 22}}>
            <DarkLogo />
            <TextTranslation
              style={[FontStyle.fontHeavy14, {marginTop: 12}]}
              text={'__CROP_REPORT__'}
            />
          </View>
        </View>
        <View style={styles.note}>
          <Text style={FontStyle.fontMedium14}>
            <Text style={FontStyle.fontHeavy14}>Notes:</Text>{' '}
            {t('__CROP_REPORT_NOTE__')}
          </Text>
        </View>
        {!isloading ? (
          <View>
            <View style={{marginTop: 16}}>
              <UserInfo
                title={'__CUSTOMER_NAME__'}
                value={cropReport.fullname}
              />
            </View>
            <UserInfo title={'__PHONE_NO__'} value={cropReport.mobileno} />
            <UserInfo title={'__REPORT_ON__'} value={cropReport.reportNo} />
            <UserInfo
              title={'__ISSUED_ON__'}
              value={date.toLocaleDateString()}
            />
            <UserInfo title={'__TIME__'} value={date.toLocaleTimeString()} />
            <View style={styles.divider} />
            <UserInfo title={'__CROP_NAME__'} value={cropReport.name} />
            <UserInfo title={'__CYCLE_START__'} value={cropReport.sowingDate} />
            <UserInfo title={'__CYCLE_END__'} value={cropReport.endDate} />
            <View style={styles.divider} />
            <View
              style={{
                paddingHorizontal: 16,
                paddingVertical: 16,
                marginTop: 16,
              }}>
              <TextTranslation
                style={[FontStyle.fontHeavy18]}
                text={'__CURRENT_STAGE'}
              />
            </View>
            <StageInfo />
            <View style={styles.Disclaimer}>
              <Text
                style={[
                  FontStyle.fontHeavy14,
                  {marginLeft: 16, marginBottom: 12},
                ]}>
                {t('__DISCLA__')}:
              </Text>
              {Disclaimer.map((item, index) => {
                return (
                  <View
                    key={index}
                    style={{
                      flexDirection: 'row',
                      marginTop: 1,
                      paddingHorizontal: 8,
                    }}>
                    <Text style={FontStyle.fontRegular12}>{`\u2022 `}</Text>
                    <TextTranslation
                      style={FontStyle.fontRegular12}
                      text={item}
                    />
                  </View>
                );
              })}
            </View>
            <View style={styles.footer}>
              <DarkLogo />
              <View style={{marginTop: 8, alignItems: 'center'}}>
                <TextTranslation
                  style={FontStyle.fontRegular14}
                  text={'__BADWANI_ADDRESS__'}
                />
                <Text style={FontStyle.fontRegular14}>+91 88238 88238</Text>
                <Text style={FontStyle.fontRegular14}>
                  contact@farmkart.com
                </Text>
                <Text style={FontStyle.fontRegular14}>
                  GSTIN:23AADCF1197R1Z7
                </Text>
                <Text style={[FontStyle.fontRegular14, {marginTop: 8}]}>
                  {t('__STATE__')}: {t('__MADHYA_PRADESH__')} {t('__CODE__')}:
                  23
                </Text>
              </View>
            </View>
          </View>
        ) : (
          <View style={[CommonStyle.alignCenter_justifyCenter, {flexGrow: 1}]}>
            <ActivityIndicator size={'large'} color={'blue'} />
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default CropReportRender;

const styles = StyleSheet.create({
  note: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: ColorVariable.stroke,
    borderRadius: commanRadius.radi6,
    marginHorizontal: 8,
  },
  divider: {
    height: 1,
    backgroundColor: ColorVariable.stroke,
    marginHorizontal: 16,
    marginTop: 3,
    marginBottom: 8,
  },
  stage: {
    borderRadius: commanRadius.radi6,
    borderWidth: 1,
    borderColor: '#DCE0EF',
    marginHorizontal: 8,
    marginBottom: 16,
  },
  header: {
    backgroundColor: '#DCE0EF',
    paddingHorizontal: 10,
    paddingVertical: 12,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
  },
  title: {
    paddingHorizontal: 12,
    paddingVertical: 6,

    flex: 0.3,
  },
  value: {
    paddingHorizontal: 12,
    paddingVertical: 6,

    borderLeftWidth: 1,
    borderLeftColor: '#DCE0EF',
    flex: 0.7,
  },
  Disclaimer: {
    paddingTop: 22,
    marginHorizontal: 16,
  },
  footer: {
    paddingVertical: 24,
    backgroundColor: ' rgba(244, 244, 244, 1)',
    alignItems: 'center',
    marginTop: 45,
  },
});
