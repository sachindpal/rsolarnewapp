import React, { Component, memo } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Pressable } from 'react-native';
import { FontStyle } from '../../../asset/style/FontsStyle';
import { ScrollView } from 'react-native-gesture-handler';
import TextTranslation from './CommonInput/TextTranslation';
import { useTranslation } from 'react-i18next';

function RadioButtons({ options, selectedOption, onSelect }: any) {
    const { t } = useTranslation()
    return (
        <View>
            {options.map((item: any) => {
                return (
                    <ScrollView key={item.id} >
                        <Pressable onPress={() => {
                            onSelect(item);
                        }} style={styles.buttonContainer}>
                            <View
                                style={styles.circle}>
                                {selectedOption && selectedOption.id === item.id && (
                                    <View style={styles.checkedCircle} />
                                )}
                            </View>
                            <View style={styles.text}>
                                <TextTranslation style={[FontStyle.fontMedium14, { color: selectedOption && selectedOption.id === item.id ? '#73be44' : "#242734" }]} text={item.name} />
                            </View>
                        </Pressable>
                    </ScrollView>
                );
            })}
        </View>
    );
}


export default memo(RadioButtons)

const styles = StyleSheet.create({
    buttonContainer: {
        flexDirection: 'row',
        paddingLeft: 16,
        alignItems: 'center',
        marginBottom: 13,
        marginTop: 13,
    },

    circle: {
        height: 16,
        width: 16,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#787878',
        alignItems: 'center',
        justifyContent: 'center',
    },

    checkedCircle: {
        width: 8,
        height: 8,
        borderRadius: 7,
        backgroundColor: '#73be44',
    },
    text: {
        paddingLeft: 16,
    }
});