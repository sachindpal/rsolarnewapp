import { FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ColorVariable, CommonStyle, commanRadius } from '../../../../asset/style/commonStyle'
import { FontStyle } from '../../../../asset/style/FontsStyle'
import TextTranslation from '../../../commonResources/component/CommonInput/TextTranslation'
import { getLocalStorageData, postAuthReq } from '../../../Service/APIServices/axoisService'


const PromoCarosel = ({ selectCodeFromBanner,addChngeFlag }: any) => {
    console.log('fffffffffffffffffffffffffff',addChngeFlag)
const [currentLang,setCurrentLang] = useState(1)
const [promocodes,setPromocodes] = useState([])
    useEffect(()=>{
        getLocalStorageData('currentLangauge').then((val)=>{
            if (val == 'hi') {
                setCurrentLang(2);
              }
              getPromocodes()
        })
        
    },[currentLang,addChngeFlag])

    const  getPromocodes = ()=>{
        console.log('currentLang currentLang',currentLang)
        postAuthReq('/order/get-promocodes', {langId:currentLang,platform:'app'}).then((data) => {
            console.log('data.data.data ================================',data.data.data)
            data.data.data.map((val:any)=>{
                val.termsAndCondition = JSON.parse(val.termsAndCondition)
            })
            setPromocodes(data.data.data)
          })
    }
    
    const [show, setshow] = React.useState(-1)


    const press = (index: any) => {
        if (index === show) {
            setshow(-1)
        } else {
            setshow(index)

        }
    }


    return (

        <>
            <FlatList
                horizontal
                data={promocodes}
                renderItem={(item:any) => (
                    <View style={{ minWidth: 251, marginRight: 8 }}>
                        <View style={styles.main}>
                            <Text style={FontStyle.fontMedium16}>{item.item.description}</Text>
                            <View style={[{ paddingTop: 16, flexDirection: "row" }]}>
                                <View style={[styles.appliedCode, CommonStyle.alignCenter_justifyCenter]}>
                                    <Text style={FontStyle.fontMedium16}>{item.item.promoName}</Text>

                                </View>
                                <Pressable onPress={()=>selectCodeFromBanner(item.item.promoName)} style={[styles.promoBtn, { backgroundColor: ColorVariable.farmkartGreen }, CommonStyle.alignCenter_justifyCenter]}>
                                    <TextTranslation style={[FontStyle.fontHeavy16, { color: ColorVariable.white }]} text={"__APPLY__"}></TextTranslation>
                                </Pressable>
                            </View>
                        </View>
                        <View style={styles.secondView}>
                            <View style={CommonStyle.flex_dirRow_alignCenter_justifySpbtw}>
                                <TextTranslation style={[FontStyle.fontMedium12, { color: "rgb(40,85,172)" }]} text={"__TERMS_AND_CONDITION__"} />
                                <Pressable onPress={() => press(item.index)}>
                                    {show == item.index ?
                                        <Image source={require("../../../../asset/img/updatedImg/termsCollapseArrow.png")} style={{ width: 20, height: 20 }} />
                                        :
                                        <Image source={require("../../../../asset/img/updatedImg/termsArrow.png")} style={{ width: 20, height: 20 }} />}
                                </Pressable>
                            </View>
                            {show == item.index ? <>
                            {item.item.termsAndCondition.map((val:any)=>{
                               return <View style={{ marginTop: 9 }}>
                               <Text style={FontStyle.fontRegular12}>- {val}</Text>
                           </View>
                            })}
                            </> : null}
                        </View>
                    </View>
                )} />
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                {promocodes.map((_, index) => {
                    return <View style={styles.indicator} key={index} />
                })}
            </View>
        </>

    )
}

export default PromoCarosel

const styles = StyleSheet.create({
    main: {
        padding: 8,
        borderTopLeftRadius: commanRadius.radi6,
        borderTopRightRadius: commanRadius.radi6,
        backgroundColor: "rgba(115, 190, 68, 0.2)",
        marginTop: 16
    },
    promoBtn: {
        height: 34,
        width: 80,
        borderRadius: commanRadius.radi6,
    },
    appliedCode: {
        borderRadius: commanRadius.radi6,
        borderWidth: 1,
        borderColor: ColorVariable.farmkartGreen,
        borderStyle: "dashed",
        height: 34,
        paddingHorizontal: 24,
        marginRight: 10,
        backgroundColor: "white"
    },
    secondView: {
        padding: 16,
        borderBottomLeftRadius: commanRadius.radi6,
        borderBottomRightRadius: commanRadius.radi6,
        backgroundColor: "rgba(242, 244, 255, 1)",
        marginBottom: 16
    },
    indicator: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: "#242734",
        marginRight: 6
    }
})