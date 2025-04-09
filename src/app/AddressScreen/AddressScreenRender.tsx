import {
  Dimensions,
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import {ColorVariable, CommonStyle} from '../../asset/style/commonStyle';
import TextTranslation from '../commonResources/component/CommonInput/TextTranslation';
import {FontStyle} from '../../asset/style/FontsStyle';
import TextInputField from '../commonResources/component/CommonInput/TextInputField';
import {useTranslation} from 'react-i18next';
import Button from '../commonResources/component/CommonButton/Button';
import {ScrollView} from 'react-native-gesture-handler';
import ModelPopUp from '../commonResources/component/ModelPopUp/ModelPopUp';
import {WhiteBack} from '../../asset/img';
import {useRoute} from '@react-navigation/native';
import TermsAndCondition from '../UIC/component/TermsAndCondition';
import SkeletonLoader from '../commonResources/component/SkeletonLoader';

interface DataType {
  submitForm: any;
  formError: any;
  selectedDist: any;
  selectedTehsil: any;
  selectedState: any;
  selectedVillage: any;
  formData: any;
  handleModal: any;
  modalClose: any;
  validateValue: any;
  handleChangeForm: any;
  goBack: any;
  onSubmitUICRegistration: any;
  isLoadingstate: boolean;
  isLoadingdistrict: boolean;
  isLoadingtehsil: boolean;
  isLoadingvillage: boolean;
  currentLang: any;
  userData:any
  total:any
  isLoadingForm:any
}

const {width} = Dimensions.get('window');

const AddressScreenRender = (props: DataType) => {
  // console.log('userData',props.userData)
  const route = useRoute<any>();
  const [termAndConditionModelVisible, settermAndConditionVisible] =
    React.useState<any>(false);

  const {t: translate} = useTranslation();
  const Skeleton = () => {
    return (
      <View style={{paddingVertical: 16}}>
        <SkeletonLoader
          variant="box"
          variant2="dark"
          width={width * 0.9}
          height={54}
        />
      </View>
    );
  };
  return (
    <View style={CommonStyle.mainViewWhite}>
      <View style={[styles.header, CommonStyle.flex_dirRow_alignCenter]}>
        <Pressable onPress={props.goBack}>
          <WhiteBack />
        </Pressable>
        {route.params?.screen === 'UICRegistration' ? (
          <TextTranslation
            style={[
              FontStyle.fontMedium18,
              {color: ColorVariable.white, marginLeft: 16},
            ]}
            text={'__ADDRESS__'}
          />
        ) : route.params?.screen === 'payment' ? (
          <View style={CommonStyle.flex_dirRow_alignCenter}>
            <TextTranslation
              style={[
                FontStyle.fontMedium18,
                {color: ColorVariable.white, marginLeft: 16},
              ]}
              text={'__ORDER_TOTAL__'}
            />
            <Text
              style={[FontStyle.fontMedium18, {color: ColorVariable.white}]}>
              {' '}
              ₹{props.total}
            </Text>
          </View>
        ) : null}
      </View>
      <View style={{flex: 1}}>
        <ScrollView
          style={{paddingLeft: 16, paddingRight: 16}}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{flexGrow: 1}}>
          {route.params?.screen === 'payment' ? (
            <View
              style={[
                CommonStyle.flex_dirRow_alignCenter,
                {paddingTop: 24, flexWrap: 'wrap'},
              ]}>
              <Text style={FontStyle.fontHeavy18}>Hi {props.userData.fullname}, </Text>
              <TextTranslation
                style={FontStyle.fontHeavy18}
                text={'__ADDREDD_YOU_WANT_DELIVERED__'}
              />
            </View>
          ) : null}
          {/* Chose state */}
          <View style={{paddingTop: 16}}>
            {!props.isLoadingstate ? (
              <TextInputField
                label={'__SELECT_STATE__'}
                isDropdownLable={translate('__SELECT_STATE__')}
                isDropdown={true}
                selectedDropdownValue={props.selectedState}
                error={props.formError.selectState}
                dropDownFunction={() => props.handleModal('state')}
              />
            ) : (
              <Skeleton />
            )}
          </View>

          {/* Chose Distrct */}
          <View>
            {!props.isLoadingdistrict ? (
              <TextInputField
                pressEnable={props.selectedState === null ? true : false}
                label={'__SELECT_DISTRICT__'}
                isDropdownLable={translate('__SELECT_DISTRICT__')}
                isDropdown={true}
                selectedDropdownValue={props.selectedDist}
                error={props.formError.selectdist}
                dropDownFunction={() => props.handleModal('dist')}
              />
            ) : (
              <Skeleton />
            )}
          </View>

          {/* Chose tehsil */}
          <View>
            {!props.isLoadingtehsil ? (
              <TextInputField
                pressEnable={props.selectedDist === null ? true : false}
                label={'__SELECT_TEHSIL__'}
                isDropdownLable={translate('__SELECT_TEHSIL__')}
                isDropdown={true}
                selectedDropdownValue={props.selectedTehsil}
                error={props.formError.selectTehsil}
                dropDownFunction={() => props.handleModal('tehsil')}
              />
            ) : (
              <Skeleton />
            )}
          </View>

          {/* Chose Village */}
          <View>
            {!props.isLoadingvillage ? (
              <TextInputField
                pressEnable={props.selectedTehsil === null ? true : false}
                label={'__SELECT_VILLAGE__'}
                isDropdownLable={translate('__SELECT_VILLAGE__')}
                isDropdown={true}
                selectedDropdownValue={props.selectedVillage}
                error={props.formError.selectVillage}
                dropDownFunction={() => props.handleModal('village')}
              />
            ) : (
              <Skeleton />
            )}
          </View>
          <View style={{marginTop: 8}}>
            <TextInputField
              placeholder={translate('__ENTER_ADDRESS__')}
              error={props.formError.address}
              defaultValue={props.formData.address}
              onSubmitEditingFunc={() => {
                props.validateValue(
                  'address',
                  props.formData.address,
                  'address',
                );
              }}
              onBlur={() => {
                props.validateValue(
                  'address',
                  props.formData.address,
                  'address',
                );
              }}
              onChangeText={val => {
                props.handleChangeForm('address', (val ?? '').toLowerCase());
              }}
            />
          </View>
          <View style={{marginTop: 8}}>
            <TextInputField
              placeholder={translate('__ENTER_PINCODE__')}
              error={props.formError.pincode}
              keyboardType="numeric"
              defaultValue={props.formData.pincode}
              onSubmitEditingFunc={() => {
                props.validateValue(
                  'pincode',
                  props.formData.pincode,
                  'pincode',
                );
              }}
              onBlur={() => {
                props.validateValue(
                  'pincode',
                  props.formData.pincode,
                  'pincode',
                );
              }}
              onChangeText={val => {
                props.handleChangeForm('pincode', (val ?? '').toLowerCase());
              }}
            />
          </View>
          {route.params?.screen === 'UICRegistration' ? (
            <View style={{paddingTop: 16}}>
              {props.currentLang == 1 ? (
                <Text style={FontStyle.fontRegular14}>
                  By clicking continue, you agree to our{' '}
                  <Text
                    style={[
                      FontStyle.fontHeavy14,
                      {
                        color: 'rgba(13, 50, 208, 1)',
                        textDecorationLine: 'underline',
                        textDecorationStyle: 'solid',
                        textDecorationColor: 'rgba(13, 50, 208, 1)',
                      },
                    ]}
                    onPress={() =>
                      settermAndConditionVisible(!termAndConditionModelVisible)
                    }>
                    terms & conditions
                  </Text>
                </Text>
              ) : (
                <Text style={FontStyle.fontRegular14}>
                  जारी रखें पर क्लिक करके, आप हमारे{' '}
                  <Text
                    style={[
                      FontStyle.fontHeavy14,
                      {
                        color: 'rgba(13, 50, 208, 1)',
                        textDecorationLine: 'underline',
                        textDecorationStyle: 'solid',
                        textDecorationColor: 'rgba(13, 50, 208, 1)',
                      },
                    ]}
                    onPress={() =>
                      settermAndConditionVisible(!termAndConditionModelVisible)
                    }>
                    नियमों और शर्तों{' '}
                  </Text>
                  से सहमत हैं
                </Text>
              )}
            </View>
          ) : null}
        </ScrollView>
        <View style={styles.fotter}>
          {route.params?.screen === 'payment' ? (
            <Button
              title={translate('__CONTINUE_TO_CHECK_OUT__')}
              fontSize={16}
              bgGreen
              onPress={props.submitForm}
              loader={props.isLoadingForm}
              disableBtn={props.isLoadingForm}
            />
          ) : route.params?.screen === 'UICRegistration' ? (
            <Button
              title={translate('__CONTINUE__')}
              fontSize={16}
              bgGreen
              onPress={props.onSubmitUICRegistration}
              loader={props.isLoadingForm}
              disableBtn={props.isLoadingForm}
            />
          ) : null}
        </View>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={termAndConditionModelVisible}>
        <TermsAndCondition
          close={() =>
            settermAndConditionVisible(!termAndConditionModelVisible)
          }
        />
      </Modal>
    </View>
  );
};

export default React.memo(AddressScreenRender);

const styles = StyleSheet.create({
  header: {
    backgroundColor: ColorVariable.blueBlack,
    padding: 16,
    height: 64,
  },
  fotter: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    paddingHorizontal: 24,
    paddingBottom: 24,
    paddingTop: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
  },
});
