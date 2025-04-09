import { View, Text, Pressable, ActivityIndicator, StyleSheet } from 'react-native'
import React, { useContext } from 'react'


interface Props {
    title: string;
    onPress?: () => void;
    fontSize: number;
    loader?: boolean;
    borderBlack?: boolean;
    bgGreen?: boolean;
    bgGray?: boolean;
    disableBtn?: boolean;
    paddingVertical:number
    paddingHorizontal:number;
}

const CustomButton: React.FC<Props> = ({
    title,
    onPress,
    loader,
    borderBlack,
    bgGreen,
    bgGray,
    disableBtn,
    fontSize,
    paddingHorizontal,
    paddingVertical
}) => {

    return (
        <View style={styles.buttonContainer}>
            <Pressable
                style={({ pressed }) => [styles.buttonWrap, {
                    paddingHorizontal,
                    paddingVertical,
                    borderWidth:  1,
                    borderColor: borderBlack ? "#242734" : bgGreen ? "#73be44" : "#242734",
                    backgroundColor: bgGreen ? "#73be44" : ''
                }]}
                onPress={onPress}
                disabled={disableBtn ? true : false}>
                {loader === true ? (
                    <View>
                        <ActivityIndicator
                            size="small"
                            color="#242734"
                        />
                    </View>
                ) : (
                    <Text style={[styles.buttonText, {
                        color: bgGreen ? "white" : borderBlack ? "#242734" : '',
                        fontSize: fontSize
                    }]}>
                        {title}
                    </Text>
                )}
            </Pressable>
        </View>
    )
}

export default CustomButton

const styles = StyleSheet.create({
    buttonContainer: {
        paddingTop: 4,

        paddingBottom: 4
    },
    buttonWrap: {
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 6
    },
    buttonText: {
        fontFamily: "Avenir Heavy ",
        fontWeight: "900"
    }

});