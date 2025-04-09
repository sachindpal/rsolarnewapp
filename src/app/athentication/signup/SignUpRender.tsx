import { Dimensions, Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import TextInputField from '../../commonResources/component/CommonInput/TextInputField';
import { CommonStyle } from '../../../asset/style/commonStyle';
import { CloseIcon } from '../../../asset/img';
import { FontStyle } from '../../../asset/style/FontsStyle';
import { ScrollView } from 'react-native-gesture-handler';
import Button from '../../commonResources/component/CommonButton/Button';
import ModelPopUp from '../../commonResources/component/ModelPopUp/ModelPopUp';
import { useNavigation } from '@react-navigation/native';
import { postUnAuthReq } from '../../Service/APIServices/axoisService';
import TextTranslation from '../../commonResources/component/CommonInput/TextTranslation';
import { useTranslation } from 'react-i18next';

const { width, height } = Dimensions.get("screen")

const SignUpRender = (props: any) => {

  const navigation = useNavigation<any>()

  const { t: translate } = useTranslation()

  return (
    <ScrollView style={CommonStyle.mainView}>
      <View style={{ backgroundColor: "white", elevation: 5 }}>
        <Image source={require("../../../asset/img/LoginImage.png")} style={{ width: width, height: 0.45 * height }} />
        <Pressable style={{ position: "absolute", left: 11, top: 20 }} onPress={() => navigation.goBack()}>
          {/* <Image source={require("../../../asset/img/close.png")} style={{ width: 24, height: 24 }} /> */}
          <CloseIcon/>
        </Pressable>
      </View>
      <View style={styles.mainFormView}>
        <View style={styles.formView}>
          <View style={{ alignItems: "center", justifyContent: "center", paddingTop: 16 }}>
            <TextTranslation style={[FontStyle.fontMedium22, { textAlign: "center" }]} text={'__CREATE_ACCOUNT__'} />
          </View>
          <View style={{ paddingTop: 24 }}>
            {/* full name */}
            <View>
              <TextInputField label={"__FULL_NAME__"} placeholder={translate("__NAME_PLACEHOLDER__")}
                error={props.formError.fullName}
                onSubmitEditingFunc={() => {
                  props.validateValue(
                    'fullName',
                    props.signupForm.fullName,
                    'fullName',
                  );
                }}
                onBlur={() => {
                  props.validateValue(
                    'fullName',
                    props.signupForm.fullName,
                    'fullName',
                  );
                }}
                onChangeText={val => {
                  props.handleChangeForm(
                    'fullName',
                    (val ?? '').toLowerCase(),
                    'fullName',
                  );
                }} />
            </View>
            {/* phone  */}
            <View>
              <TextInputField label={"__PHONE_NUMBER__"} placeholder={translate("__PHONE_PLACEHOLDER__")}
                error={props.formError.phoneNumber} keyboardType="numeric" phoneNumberField={true}
                maxLength={10}
                onSubmitEditingFunc={() => {
                  props.validateValue(
                    'phoneNumber',
                    props.signupForm.phoneNumber,
                    'phoneNumber',
                  );
                }}
                onBlur={() => {
                  props.validateValue(
                    'phoneNumber',
                    props.signupForm.phoneNumber,
                    'phoneNumber',
                  );
                }}
                onChangeText={val => {
                  props.handleChangeForm(
                    'phoneNumber',
                    (val ?? '').toLowerCase(),
                    'phoneNumber',
                  );
                }} />
              <TextTranslation style={[FontStyle.fontMedium14LightGray, { marginTop: 8 }]} text={'__PHONE_DIGIT__'} />
            </View>
            {/* Chose state */}
            <View>
              <TextInputField label={"__SELECT_STATE__"} isDropdownLable={translate("__SELECT_STATE__")} isDropdown={true} dropDownFunction={() => props.setstateModelVisible(true)} error={props.formError.selectState} selectedDropdownValue={props.selectedState} />
            </View>

            {/* Chose Distrct */}
            <View>
              <TextInputField label={"__SELECT_DISTRICT__"} isDropdownLable={translate("__SELECT_DISTRICT__")} isDropdown={true} dropDownFunction={() => props.setdistrictModelVisible(true)} error={props.formError.selectdist} selectedDropdownValue={props.selectedDist} />
            </View>

            {/* Chose Paswword */}
            <View>
              <TextInputField label={"__PASSWORD__"} placeholder={translate("__PASSWORD_PLACEHOLDER__")} passwordIcon={true} error={props.formError.password}
                onSubmitEditingFunc={() => {
                  props.validateValue(
                    'password',
                    props.signupForm.password,
                    'password',
                  );
                }}
                onBlur={() => {
                  props.validateValue(
                    'password',
                    props.signupForm.password,
                    'password',
                  );
                }}
                onChangeText={val => {
                  props.handleChangeForm(
                    'password',
                    (val ?? '').toLowerCase(),
                    'password',
                  );
                }} />
              <TextTranslation style={[FontStyle.fontMedium14LightGray, { marginTop: 4 }]} text={"__PASSWORD_ERROR__"} />
            </View>
            <View>
              <TextInputField label={"__RE_ENTER_PASSWORD__"} placeholder={translate('__SIGNUP_RE_ENTER_PASSWORD_PLACEHOLDER__')}
                passwordIcon={true}
                onSubmitEditingFunc={() => {
                  props.validateValue(
                    'confirmPassword',
                    props.signupForm.confirmPassword,
                    'confirmPassword',
                  );
                }}
                onBlur={() => {
                  props.validateValue(
                    'confirmPassword',
                    props.signupForm.confirmPassword,
                    'confirmPassword',
                  );
                }}
                onChangeText={val => {
                  props.handleChangeForm(
                    'confirmPassword',
                    (val ?? '').toLowerCase(),
                    'confirmPassword',
                  );
                }}
                error={props.formError.confirmPassword} />

            </View>
            {/* text */}
            <View style={{ marginTop: 24, marginBottom: 24 }}>
              <TextTranslation style={FontStyle.fontMedium16} text={"__TEXT_MESSAGE__"} />
            </View>
            <View>
              <Button title='__SIGNUP_CREATE_ACCOUNT__' loader={props.isloading} disableBtn={props.isloading} bgGreen onPress={props.submitForm} fontSize={16} />
            </View>
            {/* already account */}
            <View style={{ marginTop: 17, marginBottom: 17, alignItems: "center" }}>
              <TextTranslation text={"__ALREADY_ACCOUNT__"} style={[FontStyle.fontMedium16,]} />
            </View>
            {/* login button */}
            <View>
              <Button title='__LOGIN__' loader={false} bgBlack onPress={() => navigation.navigate("Login")} fontSize={16} />
            </View>
          </View>
        </View>
      </View>
      <ModelPopUp modalVisible={props.modalVisibleState} selectedOption={props.selectedState} onSelect={props.onSelectState} onSubmit={props.onSubmitState} modelClose={props.modelClose} DataArray={props.DataArrayState} title={translate("__SELECT_STATE__")} />

      <ModelPopUp modalVisible={props.modalVisibleDist} selectedOption={props.selectedDist} onSelect={props.onSelectDist} onSubmit={props.onSubmitDist} modelClose={props.modelClose} DataArray={props.DataArrayDist} title={translate("__SELECT_DISTRICT__")} />
    </ScrollView>
  )
}

export default React.memo(SignUpRender)

const styles = StyleSheet.create({
  mainFormView: {

    marginBottom: 24,
    marginTop: -200,
    paddingHorizontal: 8
  },
  formView: {
    backgroundColor: "white",
    elevation: 5,
    borderRadius: 9,
    padding: 16
  }
})