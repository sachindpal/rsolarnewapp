import {Modal, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {FontStyle} from '../../asset/style/FontsStyle';
import Button from '../commonResources/component/CommonButton/Button';
import TextTranslation from '../commonResources/component/CommonInput/TextTranslation';
import {useTranslation} from 'react-i18next';
import { CloseBlack } from '../../asset/img';

interface DataType {
  heading: string;
  content: string;
  buttonTittle: string;
  closeChatPoup:any;
  newChatVisible:boolean
}

const ChatEndSession = ({heading, content, buttonTittle,newChatPopupOpen,newChatVisible,newChatPopupOpenCancel}: any) => {
  const {t} = useTranslation();
  return (
    <Modal visible={newChatVisible} animationType="none" transparent>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
        }}>
        <View style={styles.content}>
          <Pressable
            onPress={newChatPopupOpenCancel}
            style={{
              alignSelf: 'flex-end',
              alignItems: 'center',
              width: 55,
            }}>
            <CloseBlack />
          </Pressable>
          <View style={{alignItems: 'center', marginBottom: 16}}>
            <TextTranslation style={FontStyle.fontHeavy24} text={heading} />
          </View>
          <View>
            <TextTranslation
              style={[FontStyle.fontMedium16, {textAlign: 'center'}]}
              text={content}
            />
          </View>
          <View style={{marginTop: 24}}>
            <Button title={t(buttonTittle)} fontSize={16} bgGreen  onPress={newChatPopupOpen}/>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default React.memo(ChatEndSession);

const styles = StyleSheet.create({
  content: {
    backgroundColor: 'white',
    borderRadius: 6,
    padding: 16,
    width: '95%',
  },
});
