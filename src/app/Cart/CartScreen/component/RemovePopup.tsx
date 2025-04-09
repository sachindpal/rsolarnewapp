import { Modal, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { CommonStyle } from '../../../../asset/style/commonStyle'
import { FontStyle } from '../../../../asset/style/FontsStyle'
import TextTranslation from '../../../commonResources/component/CommonInput/TextTranslation'

const RemovePopup = ({ visible, onClose, remove }: any) => {

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={[{ flex: 1, backgroundColor: "rgba(0,0,0,0.2)" }, CommonStyle.alignCenter_justifyCenter]}>
                <View style={styles.main}>
                    <TextTranslation style={[FontStyle.fontHeavy24]} text={"__DO_YOU_WANT_REMOVE_PRODUCT__"} />
                    <View style={[{ marginTop: 24, alignSelf: "flex-end" }, CommonStyle.flex_dirRow_alignCenter]}>
                        <TextTranslation style={[FontStyle.fontMedium16, { marginRight: 44 }]} onPress={()=>onClose()} text={"__NO__"}/>
                        <TextTranslation style={[FontStyle.fontMedium16]} text={"__YES__"} onPress={remove} />
                    </View>
                </View>

            </View>
        </Modal>
    )
}

export default RemovePopup

const styles = StyleSheet.create({
    main: {
        backgroundColor: "white",
        width: "90%",
        paddingVertical: 24,
        paddingHorizontal:32,
        borderRadius: 6
    }
})