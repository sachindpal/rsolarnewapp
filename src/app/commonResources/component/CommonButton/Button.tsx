import { View, Text, Pressable, ActivityIndicator, StyleSheet } from 'react-native'
import React from 'react'
import { FontStyle } from '../../../../asset/style/FontsStyle';
import TextTranslation from '../CommonInput/TextTranslation';
import { ColorVariable, commanRadius } from '../../../../asset/style/commonStyle';

interface Props {
    title: string;
    onPress?: () => void;
    loader?: boolean;
    borderBlue?: boolean;
    bgGreen?: boolean;
    bgWhite?: boolean;
    bgBlack?: boolean;
    disableBtn?: boolean;
    fontSize: number
}

const Button: React.FC<Props> = ({
    title,
    onPress,
    loader,
    borderBlue,
    bgGreen,
    bgBlack,
    bgWhite,
    disableBtn,
    fontSize
}) => {



    return (
        <View >
            <Pressable
                style={({ pressed }) => [styles.buttonWrap, {
                    backgroundColor: bgGreen ? "#73be44" : bgBlack ? "#242734" : bgWhite ? "white" : ""
                }]}
                onPress={onPress}

                disabled={disableBtn ? true : false}>
                {loader === true ? (
                    <View>
                        <ActivityIndicator
                            size="small"
                            color={"white"}
                        />
                    </View>
                ) : (
                    <TextTranslation style={[FontStyle.fontHeavy16, {
                        fontSize: fontSize,
                        color: bgGreen ? "white" : bgBlack ? "white" : bgWhite ? ColorVariable.blueBlack : "",
                    }]} text={title} />


                )}
            </Pressable>
        </View>
    )
}

export default Button

const styles = StyleSheet.create({

    buttonWrap: {
        alignItems: "center",
        justifyContent: "center",
        paddingTop: 11, paddingBottom: 11,
        paddingHorizontal: 16,
        height: 54,
        borderRadius: commanRadius.radi6
    },


});