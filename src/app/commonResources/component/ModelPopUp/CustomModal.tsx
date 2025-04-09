import React from 'react';
import { Modal, View, Text, TouchableOpacity, TouchableWithoutFeedback, StyleSheet, Pressable, Image } from 'react-native';
import { CloseBlack } from '../../../../asset/img';
import { FontStyle } from '../../../../asset/style/FontsStyle';
import Button from '../CommonButton/Button';
import TextTranslation from '../CommonInput/TextTranslation';
import { useTranslation } from 'react-i18next';
import FastImage from 'react-native-fast-image';

interface dataType{
    visible:boolean, onClose:any, firstText?:string, secondText?:string
}

const CustomModal = ({ visible, onClose, firstText, secondText }: dataType) => {
    const {t}=useTranslation()
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <Pressable style={styles.overlay} onPress={onClose} />
            <View style={styles.modalContainer}>
                <View style={styles.contentContainer}>
                    <View style={{ alignItems: "flex-end" }}>
                        <Pressable onPress={onClose}>
                            <CloseBlack />
                        </Pressable>
                    </View>
                    <View style={{ alignItems: "center" }}>
                        <FastImage source={require("../../../../asset/img/updatedImg/successTick.png")} style={{ width: 100, height: 100 }} />
                    </View>
                    <TextTranslation style={[FontStyle.fontHeavy24, { marginTop: 16, textAlign: "center", marginBottom: 8 }]} text={firstText} />
                    <TextTranslation style={[FontStyle.fontMedium16, { textAlign: "center" }]} text={secondText} />
                    <View style={{ marginTop: 24 }}>
                        <Button title={t('__OK__')} fontSize={16} bgGreen onPress={onClose} />
                    </View>
                </View>
            </View>


        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1
    },
    modalContainer: {
        backgroundColor: 'white',
        borderRadius: 6,
        padding: 16,
        position: "absolute",
        left: 8,
        right: 8,
        top: "30%",
        zIndex: 2,
        marginHorizontal:8
    },
    closeButton: {
        alignSelf: 'flex-end',
        marginBottom: 10,
    },
    closeButtonText: {
        color: 'blue',
        fontSize: 16,
    },
    contentContainer: {
        marginTop: 10,
    },
});

export default React.memo(CustomModal);
