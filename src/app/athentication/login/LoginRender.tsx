import { Dimensions, Image, KeyboardAvoidingView, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { CommonStyle, commanRadius } from '../../../asset/style/commonStyle'
import { CloseIcon } from '../../../asset/img'
import { FontStyle } from '../../../asset/style/FontsStyle'
import TextInputField from '../../commonResources/component/CommonInput/TextInputField'
import Button from '../../commonResources/component/CommonButton/Button'
import { ScrollView } from 'react-native-gesture-handler'
import TextTranslation from '../../commonResources/component/CommonInput/TextTranslation'
import { useTranslation } from 'react-i18next'


const { width, height } = Dimensions.get("screen")

interface dataType {
  submitForm: any
  validateValue: any
  handleChangeForm: any
  loginForm: any
  formError: any
  Error: any
  isloading:any
}

const LoginRender = (props: dataType) => {

  const { t: translate } = useTranslation()

  const navigation = useNavigation<any>()
 
  return (

    <ScrollView style={[CommonStyle.mainView]}>

      <View style={{ backgroundColor: "white", elevation: 5, }}>
        <Image
          source={require("../../../asset/img/staticImg/demoLogin.webp")} style={{ width: width, height: 0.45 * height }} />
        <Pressable style={{ position: "absolute", left: 11, top: 20}} onPress={() => navigation.goBack()}>
          {/* <Image source={require("../../../asset/img/close.png")} style={{width:24,height:24}}/> */}
          <CloseIcon/>
        </Pressable>
      </View>
      <View style={[styles.mainFormView,]}>
        <View style={styles.formView}>
          <View style={{paddingTop:16}}>
            <TextTranslation style={[FontStyle.fontMedium22, { textAlign: "center",fontSize:24 }]} text={"__LOGIN_ACCOUNT__"} />
          </View>

          <View style={{ paddingTop: 24, paddingBottom: 16,alignItems:'center' ,justifyContent:'center'}}>
                        <TextTranslation style={{
                            "color": "#242734",
                            "fontFamily": "Avenir",
                            "fontSize": 16,
                            "fontStyle": "normal",
                            "fontWeight": "500",
                            "lineHeight": 24,
                            "textAlign":'center'
                        }} text={"Enter_your_phone_number_Well_send_you_a_OTP_or_use_your_password"} />
                            

                    </View>
          <View style={{paddingTop:16}}>

            {/* phone  */}
            <View>
              <TextInputField  placeholder={translate('__PHONE_PLACEHOLDER__')} keyboardType="number-pad" phoneNumberField={true}
                maxLength={10}
                onSubmitEditingFunc={() => {
                  props.validateValue(
                    'phoneNumber',
                    props.loginForm.phoneNumber,
                    'phoneNumber',
                  );
                }}
                onBlur={() => {
                  props.validateValue(
                    'phoneNumber',
                    props.loginForm.phoneNumber,
                    'phoneNumber',
                  );
                }}
                onChangeText={val => {
                  props.handleChangeForm(
                    'phoneNumber',
                    (val ?? '').toLowerCase(),
                    'phoneNumber',
                  );
                }}
                error={props.formError.phoneNumber}
              />

            </View>
            {/* Chose Paswword */}

            <View style={{ marginTop: 24 }}>
              <Button title='__CONTINUE__' loader={props.isloading} disableBtn={props.isloading} bgGreen onPress={props.submitForm} fontSize={16} />
            </View>
            {/* already account */}
            <View style={{ marginTop: 8, marginBottom: 8, alignItems: "center" }} >
              <TextTranslation  style={[FontStyle.fontMedium16]} text={'__FARMKART_CUSTOMER__'} />
            </View>

<View>
<View >
            <Pressable
                style={({ pressed }) => [styles.buttonWrap, {
                    backgroundColor: '#242734'
                }]}
                onPress={() => navigation.navigate("AuthStack", {
                  screen: "SignUp"
                })}
                >
               <TextTranslation style={[FontStyle.fontHeavy16, {
                        fontSize: 16,
                        color: '#FFF',
                    }]} text={"__CREATE_FARMKART_ACCOUNT__"} />
            </Pressable>
        </View>
            </View>
            {/* login button */}
            {/* <View>
              <Button title='__SIGNUP_CREATE_ACCOUNT__'  bgBlack onPress={() => navigation.navigate("AuthStack", {
                screen: "SignUp"
              })} fontSize={16}  />
            </View> */}
          </View>
        </View>
      </View>

    </ScrollView>

  )
}

export default LoginRender

const styles = StyleSheet.create({
  mainFormView: {
    paddingLeft: 8,
    paddingRight: 8,
    marginTop:-(0.15* height),
    paddingBottom: 24,
    
  },
  formView: {
    padding: 16,
    backgroundColor: "white",
    elevation: 5,
    borderRadius: commanRadius.radi6,
  },
  buttonWrap: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 11, paddingBottom: 11,
    paddingHorizontal: 16,
    height: 54,
    borderRadius: commanRadius.radi6
},
})