import { Dimensions, Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Button from '../../commonResources/component/CommonButton/Button'
import TextInputField from '../../commonResources/component/CommonInput/TextInputField'
import { FontStyle } from '../../../asset/style/FontsStyle'
import { CommonStyle } from '../../../asset/style/commonStyle'
import { useNavigation } from '@react-navigation/native'
import { CloseIcon } from '../../../asset/img'
import { useTranslation } from 'react-i18next'
import TextTranslation from '../../commonResources/component/CommonInput/TextTranslation'
import { ScrollView } from 'react-native-gesture-handler'


const { width, height } = Dimensions.get("screen")

interface dataType {
  submitForm: any
  validateValue: any
  handleChangeForm: any
  createPasswordForm: any
  formError: any
  isloading:boolean
}

const CreateNewPasswordRender = (props: dataType) => {
  const navigation = useNavigation<any>()
  const { t: translate } = useTranslation()
  return (
    <ScrollView style={CommonStyle.mainView}>
      <View style={{ backgroundColor: "white", elevation: 5, zIndex: 1 }}>
        <Image
          source={require("../../../asset/img/signup.jpg")} style={{ width: width, height: 0.45 * height }} />
        <Pressable style={{ position: "absolute", left: 25, top: 25}} onPress={() => navigation.goBack()}>
        <Image source={require("../../../asset/img/close.png")} style={{width:24,height:24}}/>
        </Pressable>
      </View>
      <View style={styles.mainFormView}>
        <View style={styles.formView}>
          <View style={{ alignItems: "center", paddingTop: 16 }}>
            <TextTranslation style={FontStyle.fontMedium22} text={'__CREATE_NEW_PASSWORD__'} />
          </View>
          <View style={{ paddingTop: 24 }}>
            <View style={{ alignItems: "center" }}>
              <TextTranslation text={'__PASSWORD_ERROR__'} style={[FontStyle.fontMedium16, { paddingHorizontal: 45, textAlign: "center",marginBottom:16 }]} />
            </View>
            {/* phone  */}
            <View>
              <TextInputField label={"__ENTER_NEW_PASSWORD__"} placeholder={translate('__ENTER_NEW_PASSWORD_HERE__')}
                onSubmitEditingFunc={() => {
                  props.validateValue(
                    'password',
                    props.createPasswordForm.password,
                    'password',
                  );
                }}
                onBlur={() => {
                  props.validateValue(
                    'password',
                    props.createPasswordForm.password,
                    'password',
                  );
                }}
                onChangeText={val => {
                  props.handleChangeForm(
                    'password',
                    (val ?? '').toLowerCase(),
                    'password',
                  );
                }}
                error={props.formError.password} />
            </View>
            <View>
              <TextInputField label={"__RE_ENTER_PASSWORD__"} placeholder={translate('__RE_ENTER_PASSWORD_PLACEHOLDER__')}

                onSubmitEditingFunc={() => {
                  props.validateValue(
                    'confirmPassword',
                    props.createPasswordForm.confirmPassword,
                    'confirmPassword',
                  );
                }}
                onBlur={() => {
                  props.validateValue(
                    'confirmPassword',
                    props.createPasswordForm.confirmPassword,
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
            <View style={{ marginTop:24 }}>
              <Button title='__SUBMIT__'  bgGreen onPress={props.submitForm} fontSize={16} loader={props.isloading} disableBtn={props.isloading} />
            </View>
          </View>
        </View>
      </View>

    </ScrollView>
  )
}

export default CreateNewPasswordRender

const styles = StyleSheet.create({
  mainFormView: {
    paddingLeft: 8,
    paddingRight: 8,
    marginBottom: 24,
    zIndex: 2,
    marginTop: -100
  },
  formView: {
    padding: 16,
    backgroundColor: "white",
    elevation: 5,
    borderRadius: 6,
  }
})