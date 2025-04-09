import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {CloseBlack, UnFilledStar} from '../../../asset/img';
import {ColorVariable, CommonStyle} from '../../../asset/style/commonStyle';
import {FontStyle} from '../../../asset/style/FontsStyle';
import {AirbnbRating, Rating} from 'react-native-ratings';
import RatingStar from '../../commonResources/component/RatingStar/RatingStar';
import Button from '../../commonResources/component/CommonButton/Button';
import TextTranslation from '../../commonResources/component/CommonInput/TextTranslation';
import {useTranslation} from 'react-i18next';
import {postAuthReq} from '../../Service/APIServices/axoisService';

interface DataType {
  openAndCloseReviewModal: any;
  ReviewModal: boolean;
  reviewProductID: any;
  language: any;
  getorderHistoryAfterReview:any
}

const Review = ({
  openAndCloseReviewModal,
  ReviewModal,
  reviewProductID,
  language,
  getorderHistoryAfterReview
}: DataType) => {
  const {t: translate} = useTranslation();
  const [review, setreview] = useState('');
  const [rating, setrating] = useState(0);
  const [error, seterror] = useState<any>('');

  const ratingValue = (rate: any) => {
    setrating(rate);
    console.log('=============star', rate);
    seterror('');
  };
  const clearState = () => {
    setrating(0), setreview(''), seterror('');
    openAndCloseReviewModal();
  };
  const validationOnSubmit = (ke: any, value: any) => {
    seterror((prevState: any) => ({
      ...prevState,
      [ke]: value,
    }));
  };
  console.log('rating========', error);
  const submitReview = () => {
    let body = {
      langId: language,
      productId: reviewProductID,
      rating: rating,
      title: review,
    };
    console.log('=data body======', body);
    let isValid = true;
    if (rating === 0) {
      console.log('=data body=====kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk=');
      isValid = false;
      validationOnSubmit('rating', '__ERROR_HEADLINE_MESSAGE__');
    }
    if (review == '') {
      isValid = false;
      validationOnSubmit('review', '__ERROR_REVIEW_MESSAGE__');
    }

    if (isValid) {
      postAuthReq('/user/write-review', body)
        .then((res: any) => {
          setreview('');
          setrating(0);
          getorderHistoryAfterReview(language)
          clearState();
        })
        .catch(err => {
          console.log('====submit review err   ===', err.response);
        });
    }
  };

  return (
    <Modal visible={ReviewModal} animationType="slide" transparent>
      <View style={CommonStyle.sheet}>
        <Pressable
          onPress={clearState}
          style={{paddingHorizontal: 20, paddingVertical: 20, width: 55}}>
          <CloseBlack />
        </Pressable>
        <View style={{justifyContent: 'space-between', flex: 1}}>
          <View>
            <View style={{marginTop: 20, alignItems: 'center'}}>
              <TextTranslation
                style={FontStyle.fontHeavy24}
                text={'__OVERALL_RATING__'}
              />
            </View>
            <View
              style={{
                marginTop: 24,
                alignSelf: 'center',
                width: '60%',
              }}>
              <RatingStar
                totalStars={5}
                initialRating={0}
                size={48}
                readOnly={false}
                ratingValue={ratingValue}
              />
              <View style={[CommonStyle.flex_dirRow_alignCenter_justifySpbtw]}>
                <TextTranslation
                  style={[FontStyle.fontRegular14, {color: ColorVariable.gray}]}
                  text={'__VERY_BAD__'}
                />
                <TextTranslation
                  style={[FontStyle.fontRegular14, {color: ColorVariable.gray}]}
                  text={'__VERY_GOOD__'}
                />
              </View>
              {error && (
                <TextTranslation
                  style={[
                    FontStyle.fontMedium14,
                    {color: ColorVariable.errorRed, paddingTop: 8},
                  ]}
                  text={error.rating}
                />
              )}
            </View>

            <View style={{paddingHorizontal: 16, paddingTop: 40}}>
              <TextTranslation
                style={FontStyle.fontHeavy18}
                text={'__WRITE_YOUR_REVIEW__'}
              />
              <View style={styles.review}>
                <TextInput
                  placeholder={translate('__REVIEW_PLACEHOLDER__')}
                  multiline={true}
                  onChangeText={e => setreview(e)}
                />
              </View>
              {error && (
                <TextTranslation
                  style={[
                    FontStyle.fontMedium14,
                    {color: ColorVariable.errorRed, paddingTop: 8},
                  ]}
                  text={error.review}
                />
              )}
            </View>
          </View>
          <View style={CommonStyle.fotterButton}>
            <View style={{marginBottom: 10}}>
              <Button
                title={translate('__SUBMIT__')}
                fontSize={16}
                bgGreen
                onPress={submitReview}
              />
            </View>
            <Button
              title={translate('__CANCEL__')}
              fontSize={16}
              bgWhite
              onPress={clearState}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default React.memo(Review);

const styles = StyleSheet.create({
  starStyle: {
    marginHorizontal: 5, // Add margin between stars
  },
  review: {
    borderWidth: 1,
    borderColor: ColorVariable.stroke,
    borderRadius: 6,
    padding: 16,
    height: 200,
    marginTop: 16,
  },
});
