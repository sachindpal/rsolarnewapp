import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { FontStyle } from '../../../../asset/style/FontsStyle';
import Cards from '../../../commonResources/component/Cards';
import TextTranslation from '../../../commonResources/component/CommonInput/TextTranslation';
import { FlatList } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { ShopByCrop } from '../../../../asset/img';
import { CommonStyle } from '../../../../asset/style/commonStyle';
import { postUnAuthReq } from '../../../Service/APIServices/axoisService';
import SkeletonLoader from '../../../commonResources/component/SkeletonLoader';
// import Cards from '../../../common-resources/component/Cards';


interface dataType {
    lang: any;
  }
const CropCardRender = (props:dataType) => {

    const [crops, setCrops] = React.useState([]);
    const [isLoading, setisLoading] = React.useState(true);

    React.useEffect(() => {
        postUnAuthReq('/home/get-crops', { langId: props.lang}).then((data) => {

            // setrecomProducts(data?.data?.data?.trendingProducts)
            setCrops(data?.data?.data?.crops)
            setisLoading(false)
        }).catch((err) => {
            console.log('err', err);
        })
    }, [props.lang])


    


    const navigation = useNavigation<any>()

    const handleViewAll = () => {
        console.log('props.lang',props)
        navigation.navigate("ViewAllCrops",{langId: props.lang})
    }



    const navigationToProductList = (item: any) => {

        navigation.navigate('ProductList', {
            heading: item,
            category: true
        })
    }
    return (
        <>
        {isLoading==false?
        <View style={{ paddingTop: 26 }}>
            <View style={[, CommonStyle.flex_dirRow_alignCenter, { paddingLeft: 8 }]}>
                <ShopByCrop />
                <TextTranslation style={[FontStyle.fontHeavy18, { paddingLeft: 8 }]} text={'__SHOP_BY_CROP__'} />
            </View>
            <View style={{
                paddingHorizontal: 4,
                marginTop:16
            }}>
                <FlatList
                    data={crops}
                    scrollEnabled={false}
                    renderItem={( item:any ) =>
                        <>
                            <View style={{ flex: 1 / 3 }}>
                                <Cards source={item.item.image} tittle={item.item.name} productListPage={() => navigationToProductList({cropid:item.item.cropid,name:item.item.name})} />
                            </View>
                        </>
                    }
                    horizontal={false}
                    numColumns={3}
                />
            </View>
            <View style={{ alignItems: "center", paddingTop: 16 }}>
                <Pressable style={styles.viewBtn} onPress={handleViewAll}>
                    <TextTranslation style={[FontStyle.fontHeavy12, { color: "#fff" }]} text={"__VIEW_ALL_CROP__"} />
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

export default React.memo(CropCardRender)

const styles = StyleSheet.create({
    viewBtn: {
        backgroundColor: "#242734",
        borderRadius: 6,
        paddingLeft: 16, paddingRight: 16,
        paddingVertical: 8,
    }
})