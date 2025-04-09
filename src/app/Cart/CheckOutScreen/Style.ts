import { StyleSheet } from "react-native";
import { ColorVariable, commanRadius } from "../../../asset/style/commonStyle";

export const styles = StyleSheet.create({
    main: {
        backgroundColor: ColorVariable.white,

        paddingTop: 20,
        paddingBottom: 24,
        marginTop: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        flex: 1
    },
    content: {
        paddingVertical: 16,
        paddingHorizontal: 8,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: ColorVariable.stroke,
        marginTop: 8
    },
    address: {
        borderTopColor: ColorVariable.stroke,
        borderTopWidth: 1,
        paddingTop: 8,
        marginTop: 8
    },
    imgView: {
        borderRadius: commanRadius.radi6,
        borderWidth: 0.5,
        borderColor: ColorVariable.stroke,
        marginVertical: 8,
        marginRight: 10,
        marginLeft: 0.5
    },
    badge: {
        padding: 2,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: ColorVariable.blueBlack,
        position: "absolute",
        borderRadius: 15,
        height: 30,
        width: 30,
        bottom: -10,
        right: -10
    },
    promoBtn: {
        height: 54,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: commanRadius.radi6,
        backgroundColor: ColorVariable.farmkartGreen,
        marginLeft: 16,
        paddingHorizontal: 20
    },
    appliedCode: {
        borderRadius: commanRadius.radi6,
        flex: 1,
        borderWidth: 1,
        paddingRight: 16,
        paddingLeft: 16,
        borderColor: "#cacfe3",
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 54,
    },
    UIC: {
        padding: 8,
        backgroundColor: "rgba(242, 244, 255, 1)",
        borderRadius: commanRadius.radi6
    },
    fotter: {
        backgroundColor: ColorVariable.blueBlack,
        paddingVertical: 16,
        marginTop: 16,
        marginBottom: 20
    },
    switch: {
        backgroundColor: ColorVariable.white,
        padding: 8,
        borderRadius: 50
    },
    circle: {
        height: 24,
        width: 24,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: ColorVariable.blueBlack,
        alignItems: 'center',
        justifyContent: 'center',
    },

    checkedCircle: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: ColorVariable.blueBlack,
    },
    switchBtn: {
        backgroundColor: ColorVariable.white,
        padding: 8,
        borderRadius: 50,
        height:70,
        marginTop:16,
        justifyContent:"center",
        alignContent:"center",
        marginHorizontal:24
      },
})