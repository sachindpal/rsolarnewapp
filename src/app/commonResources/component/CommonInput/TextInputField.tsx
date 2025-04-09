import {
  Image,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from 'react-native';
import React, {ReactNode, memo, useContext} from 'react';
import {FontStyle} from '../../../../asset/style/FontsStyle';
import {
  ColorVariable,
  CommonStyle,
  commanRadius,
} from '../../../../asset/style/commonStyle';
import TextTranslation from './TextTranslation';
import {DropdownUpArrow} from '../../../../asset/img';

export interface Label extends TextInputProps {
  label?: ReactNode;
  error?: string | null | undefined;
  passwordIcon?: boolean;
  onFocus?: () => void;
  onBlur?: () => void;
  phoneNumberField?: boolean;
  ref1?: any;
  onSubmitEditingFunc?: () => void;
  returnKeyTypeVal?: any;
  isDropdown?: boolean;
  isDropdownLable?: string;
  selectedDropdownValue?: any;
  dropDownFunction?: any;
  otpfield?: boolean;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters' | undefined;
  pressEnable?: boolean;
}

const TextInputField: React.FC<Label> = ({
  label,
  error,
  passwordIcon,
  onFocus,
  onBlur,
  isDropdownLable,
  ref1,
  onSubmitEditingFunc,
  returnKeyTypeVal,
  isDropdown = false,
  autoCapitalize,
  dropDownFunction,
  selectedDropdownValue,
  phoneNumberField,
  otpfield,
  pressEnable,
  ...props
}) => {
  const [passwordShow, setpasswordShow] = React.useState(passwordIcon);
  const [focus, setFocus] = React.useState(false);

  return (
    <View>
      {label && (
        <TextTranslation
          style={[FontStyle.fontMedium16, {marginBottom: 8, marginTop: 8}]}
          text={label}
        />
      )}

      <View
        style={[
          styles.fieldView,
          {
            borderColor: error ? '#ff8181' : focus ? '#cacfe3' : '#cacfe3',
          },
        ]}>
        {phoneNumberField ? (
          <View style={styles.borderRight}>
            <Text style={FontStyle.fontMedium16}>+91</Text>
          </View>
        ) : null}

        {isDropdown ? (
          <>
            <Pressable
              onPress={dropDownFunction}
              style={[
                {flex: 1},
                CommonStyle.flex_dirRow_alignCenter,
              ]}
              disabled={pressEnable}>
              <View style={{flex: 1}}>
                {selectedDropdownValue != null ? (
                  <>
                    <Text
                      style={[styles.dropDownfield, FontStyle.fontMedium16]}>
                      {selectedDropdownValue.name}
                    </Text>
                  </>
                ) : (
                  <>
                    <Text
                      style={[
                        styles.dropDownfield,
                        FontStyle.fontMedium16,
                        {color: '#6f7283'},
                      ]}>
                      {isDropdownLable}
                    </Text>
                  </>
                )}
              </View>

              <View style={styles.rightButton}>
                <DropdownUpArrow />
              </View>
            </Pressable>
          </>
        ) : (
          <TextInput
            ref={ref1}
            allowFontScaling={false}
            autoCapitalize={autoCapitalize}
            onSubmitEditing={onSubmitEditingFunc}
            returnKeyType={returnKeyTypeVal}
            style={[
              !otpfield ? styles.field : styles.otpField,
              FontStyle.fontMedium16,
            ]}
            {...props}
            placeholderTextColor={'#7E7E7E'}
            secureTextEntry={passwordShow ? true : false}
            onFocus={() => {
              onFocus && onFocus();
              setFocus(true);
            }}
            onBlur={() => {
              onBlur && onBlur();
              setFocus(false);
            }}
          />
        )}

        {!passwordIcon ? (
          ''
        ) : !passwordShow ? (
          <Pressable
            style={styles.rightButton}
            onPress={() => setpasswordShow(!passwordShow)}>
            <Image
              source={require('../../../../asset/img/visibility.png')}
              style={[styles.customIcon]}
            />
          </Pressable>
        ) : (
          <Pressable
            style={styles.rightButton}
            onPress={() => setpasswordShow(!passwordShow)}>
            <Image
              source={require('../../../../asset/img/visibility_off.png')}
              style={[styles.customIcon]}
            />
          </Pressable>
        )}
        {/* 
        {isDropdown && (
          <Pressable style={styles.rightButton} onPress={dropDownFunction}>
            <View>
              <DropdownUpArrow />
            </View>
          </Pressable>
        )} */}
      </View>

      {error && (
        <TextTranslation
          style={[
            FontStyle.fontMedium14,
            {color: ColorVariable.errorRed, paddingTop: 8},
          ]}
          text={error}
        />
      )}
    </View>
  );
};

export default memo(TextInputField);

const styles = StyleSheet.create({
  fieldView: {
    borderRadius: commanRadius.radi6,
    borderWidth: 1,
    paddingRight: 16,
    paddingLeft: 16,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 54,
  },
  field: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    // paddingTop: Platform.OS.toUpperCase() === 'ios'.toUpperCase() ? 16 : 16,
    // paddingBottom: Platform.OS.toUpperCase() === 'ios'.toUpperCase() ? 16 : 16
  },
  dropDownfield: {
    justifyContent: 'center',

    // paddingTop: Platform.OS.toUpperCase() === 'ios'.toUpperCase() ? 16 : 16,
    // paddingBottom: Platform.OS.toUpperCase() === 'ios'.toUpperCase() ? 16 : 16
  },
  otpField: {
    flex: 1,
    display: 'flex',
    paddingLeft: 16,
    textAlign: 'center',

    paddingTop: Platform.OS.toUpperCase() === 'ios'.toUpperCase() ? 13 : 13,
    paddingBottom: Platform.OS.toUpperCase() === 'ios'.toUpperCase() ? 13 : 13,
  },
  rightButton: {
    paddingLeft: 8,
  },
  customIcon: {
    width: 24,
    height: 24,
  },
  borderRight: {
    borderRightColor: '#999',
    borderRightWidth: 1,
    paddingRight: 10,
    marginRight: 10,
  },
});
