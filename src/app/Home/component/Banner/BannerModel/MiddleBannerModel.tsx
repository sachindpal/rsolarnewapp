import { View, Text, StyleSheet, Pressable } from 'react-native'
import React from 'react'
import Button from '../../../../commonResources/component/CommonButton/Button'
import { FontStyle } from '../../../../../asset/style/FontsStyle'
import { CloseBlack, LeftBackIcon } from '../../../../../asset/img'
import { ScrollView } from 'react-native-gesture-handler'
import { CommonStyle } from '../../../../../asset/style/commonStyle'

const MiddleBannerModel = (props: any) => {

    return (
        <View style={{ flex: 1 }} >
            <View style={styles.sheet}>
                <View>
                    <Pressable style={styles.arrow} onPress={() => props.navigation.goBack()} >
                        <CloseBlack/>
                    </Pressable>

                    <View style={styles.content}>
                        <View>
                            <Text style={FontStyle.fontMedium18}>{props.route.params.title}</Text>
                        </View>
                        <View>
                            <Text style={[FontStyle.fontMedium16, { marginTop: 10, textAlign: "justify" }]}>{props.route.params.description}</Text>
                        </View>
                    </View>
                </View>

                <View style={{
                    paddingLeft: 26,
                    paddingRight: 26,
                    paddingBottom: 16, paddingTop: 5,
                    borderTopWidth: 2,
                    borderColor: "#f8f8f8"
                }}>
                    <Button
                        title={props.route.params.button_title} bgGreen fontSize={16}/>
                </View>
            </View>
        </View>
    )
}

export default MiddleBannerModel

const styles = StyleSheet.create({
    arrow: {
        marginTop:20,
        marginLeft: 16
    },
    content: {
        paddingTop: 14,
        paddingLeft: 18,
        paddingRight: 18,
        paddingBottom: 18
    },
    sheet: {
        marginTop: 12,
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        backgroundColor: "white",
        flex: 1,
        justifyContent: "space-between"
    }
})