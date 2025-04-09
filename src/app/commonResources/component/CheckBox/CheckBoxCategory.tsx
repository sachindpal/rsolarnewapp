import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Image, Pressable } from 'react-native';
import { useTranslation } from "react-i18next";
import { ScrollView } from 'react-native-gesture-handler';
import TextTranslation from '../CommonInput/TextTranslation';
import { FontStyle } from '../../../../asset/style/FontsStyle';

function CheckBoxButtonCategory({ options, selectedOption, onSelectCategories }: any) {
    const { t } = useTranslation()
   
    return (
        <View>
            {options && options.map((item: any,index:any) => {
                return (
                    <Pressable key={index} style={styles.buttonContainer} onPress={() => {
                        onSelectCategories(item.categoryid);
                    }}>
                        <View
                            style={styles.circle}
                        >
                            {selectedOption.includes(item.categoryid) && (
                                // <View style={styles.checkedCircle} />
                                <Image source={require("../../../../asset/img/checkboxIcon.png")} width={16} height={16} />
                            )}
                        </View>
                        <View style={styles.text}>
                            <TextTranslation style={[FontStyle.fontMedium17]} text={item.name} />
                        </View>
                    </Pressable>
                );
            })}
        </View>
    );
}

export default React.memo(CheckBoxButtonCategory)
const styles = StyleSheet.create({
    buttonContainer: {
        flexDirection: 'row',
    
        alignItems: 'center',

        marginBottom:8,
        marginTop: 8

    },

    circle: {
        height: 16,
        width: 16,
        borderWidth: 1,
        borderColor: '#787878',
        alignItems: 'center',
        justifyContent: 'center',
    },

    checkedCircle: {
        height: 16,
        width: 16,
        backgroundColor: '#242734',
    },
    text: {
        paddingLeft:8,
    }
});