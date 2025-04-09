import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {
  ColorVariable,
  CommonStyle,
  commanRadius,
} from '../../asset/style/commonStyle';
import TextTranslation from '../commonResources/component/CommonInput/TextTranslation';
import {FontStyle} from '../../asset/style/FontsStyle';

interface dataType {
  handleModalUpdatePhone: any;
  handleModalChangeAddress: any;
  handleModalChangePassword: any;
  userInfo: any;
}

const ProfileRender = ({
  handleModalUpdatePhone,
  handleModalChangeAddress,
  handleModalChangePassword,
  userInfo,
}: dataType) => {
  return (
    <View>
      {/* name */}
      <View style={styles.contentView}>
        <View>
          <TextTranslation style={FontStyle.fontMedium12} text={'__Name__'} />
          <Text style={[FontStyle.fontHeavy16, {marginTop: 16}]}>
            {userInfo.fullname}
          </Text>
        </View>
      </View>
      {/* phone Number */}
      <View
        style={[
          styles.contentView,
          CommonStyle.flex_dirRow_alignCenter_justifySpbtw,
        ]}>
        <View>
          <TextTranslation
            style={FontStyle.fontMedium12}
            text={'__PHONE_NUMBER__'}
          />
          <Text style={[FontStyle.fontHeavy16, {marginTop: 16}]}>
            {userInfo.mobileno}
          </Text>
        </View>
        <TextTranslation
          style={[FontStyle.fontMedium15, {textDecorationLine: 'underline'}]}
          text={'__EDIT__'}
          onPress={handleModalUpdatePhone}
        />
      </View>
      {/* address */}
      <View
        style={[
          styles.contentView,
          CommonStyle.flex_dirRow_alignCenter_justifySpbtw,
        ]}>
        <View style={{width: '60%'}}>
          <TextTranslation
            style={FontStyle.fontMedium12}
            text={'__DELIVERY_ADDRESS__'}
          />
          <Text style={[FontStyle.fontHeavy16, {marginTop: 16}]}>
            {userInfo.address}
          </Text>
          {/* <Text style={[FontStyle.fontHeavy16]}>
            Badgaon, Thikari, Badwani, Madhya Pradesh, 451447
          </Text> */}
        </View>
        <TextTranslation
          style={[FontStyle.fontMedium15, {textDecorationLine: 'underline'}]}
          text={'__EDIT__'}
          onPress={handleModalChangeAddress}
        />
      </View>
      {/* change password */}
      <View
        style={[
          styles.contentView,
          CommonStyle.flex_dirRow_alignCenter_justifySpbtw,
        ]}>
        <View>
          <TextTranslation
            style={FontStyle.fontHeavy16}
            text={'__CHANGE_PASSWORD__'}
          />
        </View>
        <TextTranslation
          style={[FontStyle.fontMedium15, {textDecorationLine: 'underline'}]}
          text={'__EDIT__'}
          onPress={handleModalChangePassword}
        />
      </View>
    </View>
  );
};

export default ProfileRender;

const styles = StyleSheet.create({
  contentView: {
    borderRadius: commanRadius.radi6,
    borderWidth: 1,
    borderColor: ColorVariable.stroke,
    padding: 18,
    marginTop: 8,
    marginHorizontal: 8,
  },
});
