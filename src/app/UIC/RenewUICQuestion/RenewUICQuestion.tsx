import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {ColorVariable, CommonStyle} from '../../../asset/style/commonStyle';
import {CloseBlack} from '../../../asset/img';
import {FontStyle} from '../../../asset/style/FontsStyle';
import {ScrollView} from 'react-native-gesture-handler';
import Button from '../../commonResources/component/CommonButton/Button';
import {useNavigation} from '@react-navigation/native';
import {
  getAuthReq,
  getLocalStorageData,
  postAuthReq,
} from '../../Service/APIServices/axoisService';
import SkeletonLoader from '../../commonResources/component/SkeletonLoader';
import FastImage from 'react-native-fast-image';

const RenewUICQuestion = () => {
  const navigation = useNavigation<any>();
  const [landSizeArea, setlandSizeArea] = useState('');
  const [selectedValue, setselectedValue] = useState<any>([]);
  const [soilSelected, setsoilSelected] = useState<string[]>([]);
  const [totalArea, settotalArea] = useState('');
  const [error, seterror] = useState<any>();
  const [question, setquestion] = useState(1);
  const [questionList, setquestionList] = useState<any>([]);
  const [questionsArr, setQuestionArr] = useState<any>([]);
  const [isLoading, setisLoading] = useState(true);
  const [countQuestions, setCountQuestions] = useState(1);
  const [questionIds, setQuestionIds] = useState([34]);
  const [langaugeForApi, setLangaugeForApi] = useState<any>(1);

  const selectLandSize = (item: any) => {
    setselectedValue([item]);
    seterror('');
  };
  console.log('seleted value', selectedValue);

  const selectSoilType = (item: string) => {
    console.log('item',item)
    if (selectedValue.includes(item)) {
      let arr = selectedValue.filter((val: any) => val !== item);
      setselectedValue(arr);
    } else {
      let data = selectedValue;
      data = [...data, item];
      setselectedValue(data);
      seterror('');
    }
    console.log('======value selected===', item);
  };
  const dateHandle = (): any => {
    let userDate = new Date();
    const year = userDate.getFullYear();
    const month = (userDate.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-indexed
    const day = userDate.getDate().toString().padStart(2, '0');
    const replace = `${year}-${month}-${day}`;
    return replace;
  };

  const submit = () => {
    if (selectedValue.length == 0) {
      seterror('Please select your answer');
    } else {
      let ans=[
        {
          questionid: questionList[0].questionid,
          date: dateHandle(),
          answer: {
            [`question_type_${questionList[0]?.question_type_id}`]:
              selectedValue,
          },
        },
      ]

      console.log("===========ans========",ans)
      questionsArr.push(JSON.stringify(ans))
      setQuestionArr(questionsArr)
      let body = {
        answers: JSON.stringify(questionsArr) ,
      };
      postAuthReq('/crops/submit-answer-new', body)
        .then(res => {
          console.log('submit answer', res.data);
          console.log('countQuestions', countQuestions);
          if(countQuestions==3){
            
            navigation.navigate('BottomTabBar', {
              screen: 'UIC',
              params: {
                UICRenew: true,
              },
            });
          }else{
            navigation.navigate('global', {screen: 'RenewUICQuestion'});
            getRenewQuestion(langaugeForApi)
            setquestionList([])
          }
          
          
        })
        .catch(error => {
          console.log('submit answer error', error.response);
        });
    }
  };

  const submitInArray = () => {
    if (selectedValue.length == 0) {
      seterror('Please select your answer');
    } else {
      let ans=[
        {
          questionid: questionList[0].questionid,
          date: dateHandle(),
          answer: {
            [`question_type_${questionList[0]?.question_type_id}`]:
              selectedValue,
          },
        },
      ]

      console.log("===========ans========",ans)
      // let body = {
      //   answers: JSON.stringify(ans) ,
      // };
      questionsArr.push(JSON.stringify(ans))
      setQuestionArr(questionsArr)
      getRenewQuestion(langaugeForApi)
      console.log('questionsArr',questionsArr)
      let newcountQuestions = countQuestions+1
          setCountQuestions(newcountQuestions)
    }
  };
  useEffect(() => {
    let lang: any;
    getLocalStorageData('currentLangauge')
      .then((res: any) => {
        lang = res === 'hi' ? 2 : 1;
        setLangaugeForApi(lang)
        getRenewQuestion(lang);
      })
      .catch(err => {});
  }, []);

  const getRenewQuestion = (lang: any) => {
    // let queId = questionList[0]?.questionid?setQuestionIds():34;
   
    if(questionList[0]?.questionid){
      questionIds.push(questionList[0]?.questionid)
      setQuestionIds(questionIds)
    }
    getAuthReq(`/crops/get-uic-question-new?lang=${lang}&questionid=${questionIds}`)
      .then((res: any) => {
        console.log('response from renew screen', res.data.data.questions);
        setquestionList(res.data.data.questions);
        setisLoading(false);
      })
      .catch(error => {
        console.log('Error from renew screen', error);
      });
  };

  return (
    <View style={{flex: 1}}>
      <View style={CommonStyle.sheet}>
        {countQuestions==1 ? 
        <Pressable
          onPress={() => navigation.goBack()}
          style={{paddingHorizontal: 20, paddingVertical: 20, width: 55}}>
          <CloseBlack />
        </Pressable>:<Pressable
          
          style={{paddingHorizontal: 20, paddingVertical: 20, width: 55}}>
          
        </Pressable>
}

        {isLoading ? (
          <View style={{flex: 1, flexGrow: 1}}>
            <View style={{marginVertical: 24, alignItems: 'center'}}>
              <SkeletonLoader
                width={'60%'}
                height={40}
                variant="box"
                variant2="dark"
              />
            </View>

            <View style={{marginLeft: 12}}>
              <SkeletonLoader
                width={'90%'}
                height={70}
                variant="box"
                variant2="dark"
              />
            </View>

            <View style={{marginVertical: 24, alignItems: 'center'}}>
              <SkeletonLoader
                width={'95%'}
                height={350}
                variant="box"
                variant2="dark"
              />
            </View>
          </View>
        ) : (
          <ScrollView
            contentContainerStyle={{
              justifyContent: 'space-between',
              flexGrow: 1,
            }}>
            <View>
              <Text style={[FontStyle.fontHeavy24, {textAlign: 'center'}]}>
                Renew UIC question
              </Text>

              {questionList[0]?.question_type_id === 2 ? (
                <View>
                  <Text
                    style={[
                      FontStyle.fontMedium18,
                      {marginTop: 24, paddingHorizontal: 16},
                    ]}>
                    {questionList[0]?.question}
                  </Text>
                  {error && error !== '' ? (
                    <Text
                      style={[
                        FontStyle.fontMedium14,
                        {
                          color: ColorVariable.errorRed,
                          marginTop: 8,
                          marginHorizontal: 16,
                        },
                      ]}>
                      {error}
                    </Text>
                  ) : null}
                  <View style={{paddingHorizontal: 16, marginTop: 24}}>
                    {questionList[0]?.options.map((item: any, index: any) => {
                      return (
                        <Pressable
                          style={[
                            styles.view,
                            CommonStyle.flex_dirRow_alignCenter_justifySpbtw,
                            {
                              borderColor: selectedValue==item.optionid
                                ? ColorVariable.farmkartGreen
                                : error && index == 0
                                ? ColorVariable.errorRed
                                : ColorVariable.stroke,
                            },
                          ]}
                          onPress={() => selectLandSize(item.optionid)}
                          key={index}>
                          <Text style={FontStyle.fontMedium16}>
                            {item.options}
                          </Text>
                          {selectedValue==item.optionid ? (
                            <Image
                              source={require('../../../asset/img/updatedImg/tick.png')}
                              style={{width: 40, height: 40}}
                            />
                          ) : null}
                        </Pressable>
                      );
                    })}
                  </View>
                </View>
              ) : questionList[0]?.question_type_id === 1 ? (
                <View>
                  <Text
                    style={[
                      FontStyle.fontMedium18,
                      {marginTop: 24, paddingHorizontal: 16},
                    ]}>
                    {questionList[0]?.question}
                  </Text>
                  {error && error !== '' ? (
                    <Text
                      style={[
                        FontStyle.fontMedium14,
                        {
                          color: ColorVariable.errorRed,
                          marginTop: 8,
                          marginHorizontal: 16,
                        },
                      ]}>
                      {error}
                    </Text>
                  ) : null}
                  <View style={{paddingHorizontal: 16, marginTop: 24}}>
                    {questionList[0]?.options.map((item: any, index: any) => {
                      return (
                        <Pressable
                          style={[
                            styles.view,
                            CommonStyle.flex_dirRow_alignCenter_justifySpbtw,
                            {
                              borderColor: selectedValue?.includes(
                                item.optionid,
                              )
                                ? ColorVariable.farmkartGreen
                                : error && index == 0
                                ? ColorVariable.errorRed
                                : ColorVariable.stroke,
                            },
                          ]}
                          onPress={() => selectSoilType(item.optionid)}
                          key={index}>
                          <View style={CommonStyle.flex_dirRow_alignCenter}>
                            <FastImage
                              source={{uri: item.option_image}}
                              style={{width: 60, height: 60, marginRight: 16}}
                            />
                            <Text style={FontStyle.fontMedium16}>
                              {item.options}
                            </Text>
                          </View>
                          {selectedValue?.includes(item.optionid) ? (
                            <Image
                              source={require('../../../asset/img/updatedImg/tick.png')}
                              style={{width: 40, height: 40}}
                            />
                          ) : null}
                        </Pressable>
                      );
                    })}
                  </View>
                </View>
              ) : questionList[0]?.question_type_id === 3 ? (
                <View>
                  <Text
                    style={[
                      FontStyle.fontMedium18,
                      {marginTop: 24, paddingHorizontal: 16},
                    ]}>
                    {questionList[0]?.question}
                  </Text>
                  {error && error !== '' ? (
                    <Text
                      style={[
                        FontStyle.fontMedium14,
                        {
                          color: ColorVariable.errorRed,
                          marginTop: 8,
                          marginHorizontal: 16,
                        },
                      ]}>
                      {error}
                    </Text>
                  ) : null}
                  <View
                    style={{
                      alignItems: 'center',
                      marginTop: 16,
                      marginBottom: 24,
                      borderRadius: 6,
                      overflow: 'hidden',
                    }}>
                    <Image
                      source={require('../../../asset/img/staticImg/field.png')}
                      style={{width: '92%', height: 160, borderRadius: 6}}
                    />
                  </View>
                  <View
                    style={[
                      styles.view,
                      CommonStyle.flex_dirRow_alignCenter_justifySpbtw,
                      {
                        borderColor: error
                          ? ColorVariable.errorRed
                          : ColorVariable.stroke,
                        marginHorizontal: 16,
                      },
                    ]}>
                    <TextInput
                      placeholder="Enter your answer here"
                      style={[FontStyle.fontMedium16, {flex: 1}]}
                      placeholderTextColor="rgba(126, 126, 126, 1)"
                      onChangeText={txt => setselectedValue([txt])}
                    />
                  </View>
                </View>
              ) : null}
            </View>
            {countQuestions==3?
            <View style={[CommonStyle.fotterButton, {marginTop: 15}]}>
              <Button title="SUBMIT" fontSize={16} bgGreen onPress={submit} />
            </View>:<View style={[CommonStyle.fotterButton, {marginTop: 15}]}>
              <Button title="NEXT" fontSize={16} bgGreen onPress={submitInArray} />
            </View>}
          </ScrollView>
        )}
      </View>
    </View>
  );
};

export default RenewUICQuestion;

const styles = StyleSheet.create({
  view: {
    borderRadius: 6,
    borderWidth: 1,
    paddingHorizontal: 16,
    marginBottom: 8,
    height: 72,
  },
});
