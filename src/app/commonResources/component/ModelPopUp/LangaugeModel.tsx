import { Modal, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { FontStyle } from '../../../../asset/style/FontsStyle'
import RadioButtons from '../RadioButton'
import { CommonStyle } from '../../../../asset/style/commonStyle'
import { ScrollView } from 'react-native-gesture-handler'

const LangaugeModel = ({ modalVisible, selectedOption, onSelect, onSubmit, modelClose,DataArray,title }: any) => {
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}

        >
            <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.4)", alignItems: "center", justifyContent: "center" }}>
                <View style={{ backgroundColor: "white", width: "70%"}}>
                    <View style={styles.header}>
                        <Text style={FontStyle.fontMedium22}>{title}</Text>
                    </View>
                    <ScrollView>
                        <RadioButtons options={DataArray} selectedOption={selectedOption} onSelect={onSelect} />
                    </ScrollView>
                    <View style={[CommonStyle.flex_dirRow_alignCenter, styles.footer]}>
                        <Text style={[FontStyle.fontBlack15, { marginRight: 18, fontSize: 14 }]} onPress={modelClose}>CANCEL</Text>
                        <Text style={[FontStyle.fontBlack15, { marginRight: 26, fontSize: 14 }]} onPress={onSubmit}>OK</Text>
                    </View>
                </View>


            </View>
        </Modal>
    )
}

export default React.memo(LangaugeModel)

const styles = StyleSheet.create({

    header: {
        padding: 24, paddingBottom: 20, borderBottomWidth: 1, borderBottomColor: '#f8f8f8'
    },
    footer: {
        paddingTop: 20, paddingBottom: 20, justifyContent: "flex-end", borderTopWidth: 1, borderTopColor: '#f8f8f8'
    }
})