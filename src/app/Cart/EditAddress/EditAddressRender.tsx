import { Pressable, StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { CommonStyle } from '../../../asset/style/commonStyle'
import { CloseBlack } from '../../../asset/img'
import TextTranslation from '../../commonResources/component/CommonInput/TextTranslation'
import { FontStyle } from '../../../asset/style/FontsStyle'
import { ScrollView } from 'react-native-gesture-handler'
import TextInputField from '../../commonResources/component/CommonInput/TextInputField'
import { useTranslation } from 'react-i18next'
import Button from '../../commonResources/component/CommonButton/Button'
import ModelPopUp from '../../commonResources/component/ModelPopUp/ModelPopUp'

interface DataType {
    submitForm: any
    formError: any
    selectedDist: any
    selectedTehsil: any
    selectedState: any
    selectedVillage: any
    formData: any,
    stateList: any
    districtList: any
    onSelectState: any
    onSelectDist: any
    onSelectTehsil: any
    onSelectVillage: any
    handleModal: any
    modalClose: any
    onSubmit: any
    stateModelVisible: boolean
    districtModelVisible: boolean
    tehsilModelVisible: boolean
    villageModelVisible: boolean
    validateValue: any
    handleChangeForm: any
    goBack: any
    tehsilList: any
    villageList: any
    sendParams: any

}

const EditAddressRender = (props: DataType) => {

    const { t: translate } = useTranslation()
    return (
        <View style={{ flex: 1, backgroundColor: "rgba(0, 0, 0, 0.6)" }}>
            <View style={[CommonStyle.sheet,]}>
                <View style={{ alignItems: "flex-end", paddingHorizontal: 24, paddingTop: 24 }}>
                    <Pressable onPress={props.goBack} >
                        <CloseBlack />
                    </Pressable>
                </View>
                <View>
                    <TextTranslation text={"__CHANGE_ADDRESS__"} style={[FontStyle.fontHeavy24, { textAlign: "center" }]} />
                </View>
                <View style={{ flex: 1, paddingTop: 8 }}>
                    <ScrollView style={{ paddingHorizontal: 16 }} keyboardShouldPersistTaps="handled" contentContainerStyle={{ flexGrow: 1 }}>
                    <View style={{ flexDirection:'row',padding:8,marginBottom:16,borderRadius:6,borderWidth:1,borderStyle:'solid',borderColor:'#DCE0EF',gap:8,alignItems:'center' }}>
                
                                <Image
                                    source={require('../../../asset/img/updatedImg/info.png')}
                                    style={{ width: 20, height: 20,marginTop:5 }}
                                />
                                <Text style={{color:'#242734',fontSize:12,fontFamily:'Avenir',lineHeight:20,fontWeight:'400',letterSpacing:0.5,marginRight:8,width:260}} numberOfLines={3}>
                                {translate('Changing_State_or_District_it_may_affect_the_items_currently_in_your_shopping_bag')}
                                    </Text>
                        </View>
                        {/* Chose state */}
                        <View>
                            <TextInputField label={"__SELECT_STATE__"} isDropdownLable={translate("__SELECT_STATE__")} isDropdown={true} selectedDropdownValue={props.selectedState} error={props.formError.selectState} dropDownFunction={() => props.handleModal("state")} />
                        </View>

                        {/* Chose Distrct */}
                        <View>
                            <TextInputField label={"__SELECT_DISTRICT__"} isDropdownLable={translate("__SELECT_DISTRICT__")} isDropdown={true} selectedDropdownValue={props.selectedDist} error={props.formError.selectdist} dropDownFunction={() => props.handleModal("dist")} />
                        </View>

                        {/* Chose tehsil */}
                        <View>
                            <TextInputField label={"__SELECT_TEHSIL__"} isDropdownLable={translate("__SELECT_TEHSIL__")} isDropdown={true} selectedDropdownValue={props.selectedTehsil} error={props.formError.selectTehsil} dropDownFunction={() => props.handleModal("tehsil")} />
                        </View>

                        {/* Chose Village */}
                        <View>
                            <TextInputField label={"__SELECT_VILLAGE__"} isDropdownLable={translate("__SELECT_VILLAGE__")} isDropdown={true} selectedDropdownValue={props.selectedVillage} error={props.formError.selectVillage} dropDownFunction={() => props.handleModal("village")} />
                        </View>
                        <View style={{ marginTop: 8 }}>
                            <TextInputField placeholder={translate('__ENTER_ADDRESS__')} error={props.formError.address}
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
                                    props.handleChangeForm(
                                        'address',
                                        (val ?? '').toLowerCase(),
                                        'address',
                                    );
                                }}
                                value={props.formData.address}
                            />
                        </View>
                        <View style={{ marginTop: 8 }}>
                            <TextInputField placeholder={translate("__ENTER_PINCODE__")} error={props.formError.pincode} keyboardType="numeric"
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
                                    props.handleChangeForm(
                                        'pincode',
                                        (val ?? '').toLowerCase(),
                                        'pincode',
                                    );
                                }}
                                value={props.formData.pincode}
                            />
                        </View>

                    </ScrollView>
                    <View style={styles.fotter}>
                        <Button title={translate("__UPDATE_ADDRESS__")} fontSize={16} bgGreen onPress={props.submitForm} />
                    </View>
                </View>

            </View>
            <ModelPopUp modalVisible={props.stateModelVisible} selectedOption={props.selectedState} onSelect={props.onSelectState} onSubmit={props.onSubmit} modelClose={props.modalClose} DataArray={props.stateList} title={translate("__SELECT_STATE__")} />
            <ModelPopUp modalVisible={props.districtModelVisible} selectedOption={props.selectedDist} onSelect={props.onSelectDist} onSubmit={props.onSubmit} modelClose={props.modalClose} DataArray={props.districtList} title={translate("__SELECT_DISTRICT__")} />
            <ModelPopUp modalVisible={props.tehsilModelVisible} selectedOption={props.selectedTehsil} onSelect={props.onSelectTehsil} onSubmit={props.onSubmit} modelClose={props.modalClose} DataArray={props.tehsilList} title={translate("__SELECT_TEHSIL__")} />
            <ModelPopUp modalVisible={props.villageModelVisible} selectedOption={props.selectedVillage} onSelect={props.onSelectVillage} onSubmit={props.onSubmit} modelClose={props.modalClose} DataArray={props.villageList} title={translate("__SELECT_VILLAGE__")} />

        </View>
    )
}

export default EditAddressRender

const styles = StyleSheet.create({
    fotter: {
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
        paddingHorizontal: 16,
        paddingBottom: 24,
        paddingTop: 8,
        backgroundColor: "rgba(255, 255, 255, 0.6)",

    }
})