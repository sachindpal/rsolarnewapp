import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
// import Cards from '../../../common-resources/component/Cards'
import { FontStyle } from '../../../../asset/style/FontsStyle';
import Cards from '../../../commonResources/component/Cards';
import TextTranslation from '../../../commonResources/component/CommonInput/TextTranslation';
import { use } from 'i18next';
import { useNavigation } from '@react-navigation/native';
import { Sell } from '../../../../asset/img';
import { CommonStyle } from '../../../../asset/style/commonStyle';
import { postUnAuthReq } from '../../../Service/APIServices/axoisService';
import SkeletonLoader from '../../../commonResources/component/SkeletonLoader';

interface dataType {
    lang: any;
  }
const BrandsCardRender = (props:dataType) => {

    const navigation = useNavigation<any>()

    const [brands, brandsBannerst] = React.useState([]);
    const [isLoading, setisLoading] = React.useState(true);

    React.useEffect(() => {
        postUnAuthReq('/home/get-brands', { langId: props.lang}).then((data) => {

            
            brandsBannerst(data?.data?.data?.brands)
            console.log('data?.data?.data?.brands',data?.data?.data?.brands)
            setisLoading(false)
        }).catch((err) => {
            console.log('err', err);
        })
    }, [props.lang])

    const navigationToProductList = (item: any) => {

        navigation.navigate('ProductList', {
            heading: item,
        })
    }



    return (

        <>
        {isLoading==false?
        <View style={{ paddingTop:26}}>
            <View style={[,CommonStyle.flex_dirRow_alignCenter,{paddingLeft:8}]}>
                <Sell/>
                <TextTranslation style={[FontStyle.fontHeavy18,{ paddingLeft:8 }]} text={'__SHOP_BY_BRAND__'} />
            </View>
            <View style={{marginTop:16}}>
                <FlatList
                    data={brands}
                    scrollEnabled={false}
                    style={{paddingHorizontal:4}}
                    renderItem={( item:any ) =>
                        <>
                            <View style={{ flex: 1 / 3}}>
                                <Cards source={item.item.image} productListPage={() => navigationToProductList({brandid:item.item.brandid,name:item.item.name})} />
                            </View>
                        </>}
                    horizontal={false}
                    numColumns={3}
                />
            </View>
            <View style={{ alignItems: "center", paddingTop: 16 }}>
                <Pressable style={styles.viewBtn} onPress={() => navigation.navigate("ViewAllBrands",{'lang':props.lang})}>
                    <TextTranslation style={[FontStyle.fontHeavy12,{color:"#fff"}]} text={"__VIEW_ALL_BRANDS__"} />
                </Pressable>
            </View>

        </View>:<><View style={{flex:1,flexDirection:'row',paddingTop:26}}>{new Array(0,1,2,).map((value,index)=>(<View key={index} style={{ marginRight: 4,marginLeft:4,marginTop: 16,  marginBottom: 8,}}><SkeletonLoader  width={125} height={120} variant="box" variant2='dark'/></View>
))}</View>

<View style={{flex:1,flexDirection:'row'}}>{new Array(0,1,2,).map((value,index)=>(<View key={index} style={{ marginRight: 4,marginLeft:4,marginTop: 16,  marginBottom: 8,}}><SkeletonLoader  width={125} height={120} variant="box" variant2='dark'/></View>
))}</View></>
}
        </>
    )
}

export default React.memo(BrandsCardRender)

const styles = StyleSheet.create({
    viewBtn: {
        backgroundColor: "#242734",
        borderRadius: 6,
        paddingLeft: 16, paddingRight: 16,
       paddingVertical:8,
      
    }
})