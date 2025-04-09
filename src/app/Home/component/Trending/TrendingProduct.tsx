import {FlatList, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useContext, useState, useEffect} from 'react';
import ProductCard from './ProductCard/ProductCard';
import TextTranslation from '../../../commonResources/component/CommonInput/TextTranslation';
import {FontStyle} from '../../../../asset/style/FontsStyle';
import {useNavigation} from '@react-navigation/native';
import {CommonContext} from '../../../commonResources/Context/CommonContext';
import {getLocalStorageData, postAuthReq, postUnAuthReq} from '../../../Service/APIServices/axoisService';
import SkeletonLoader from '../../../commonResources/component/SkeletonLoader';

interface dataType {
  lang: any;
  stateId: any;
}
const TrendingProduct = (props: dataType) => {
  const [viewLess, setviewLess] = React.useState(true);
  const [hideView, sethideView] = React.useState(false);

  const navigation = useNavigation<any>();

  const [trendingProducts, settrendingProducts] = useState<any>([]);
  const [isLoading, setisLoading] = useState(true);

  useEffect(() => {
    console.log('ppppppppppppppppppppppp',props.stateId)
    postAuthReq('/home/get-trending-products-new', {
      langId: props.lang,
      stateId: props.stateId,
    })
      .then(data => {
        settrendingProducts(data?.data?.data?.trendingProducts);
        if (data?.data?.data?.trendingProducts.length < 4) {
          sethideView(true);
        }
        setisLoading(false);
      })
      .catch(err => {
        console.log('err', err);
      });
  }, [props.stateId, props.lang]);

  const navigativeToDetailPage = (id: any) => {
    navigation.navigate('ProductDetail', {id: id});
  };

  const getShortDetailProduct = async(obj:any,index:any)=>{
    var val = await getLocalStorageData('currentLangauge');
    let lang = 1;
    if (val == 'hi') {
      lang = 2;
    }
    await postAuthReq(`/product/get-product-short-detail`, {productId:obj.value,langId:lang})
        .then(productData => {
          const productLists = trendingProducts
          const element = productData.data.data.productDetails
              productLists[index].name = element.name
            productLists[index].price = element.price
            productLists[index].image = element.image
            productLists[index].productid = element.productid
            productLists[index].uicdiscount = element.uicdiscount
            productLists[index].uic_price = element.uic_price
            productLists[index].currentSize = {label:element.unit_type,value:element.productid}
            
            
            settrendingProducts([...productLists])
          
        console.log('productData',productLists[index])
        console.log('element',element)
        console.log('obj.value',obj.value)


        })



  }

  const {addItemToCart} = useContext(CommonContext);

  return (
    <View>
      {isLoading == false ? (
        <>
          <FlatList
            data={viewLess ? trendingProducts.slice(0, 4) : trendingProducts.slice(0, 8)}
            style={{paddingHorizontal: 4}}
            scrollEnabled={false}
            renderItem={({item,index}:any) => (
              <>
                <View style={{paddingHorizontal: 4, paddingBottom: 8}}>
                  <ProductCard
                    id={item.productid}
                    items={item.sizes}
                    currentSize={item.currentSize}
                    demoFunction={(value:any)=>getShortDetailProduct(value,index)}
                    name={item.name}
                    price={item.price}
                    uicPrice={item.uic_price}
                    img={item.image}
                    discount={item.uicdiscount}
                    detailPage={() =>
                      navigativeToDetailPage(item.productid)
                    }
                    addToBag={addItemToCart}
                  />
                </View>
              </>
            )}
            horizontal={false}
            numColumns={2}
          />
          {hideView == false ? (
            <View style={{alignItems: 'center', paddingTop: 8}}>
              <Pressable
                style={styles.viewBtn}
                onPress={() => {
                  setviewLess(!viewLess);
                }}>
                <TextTranslation
                  style={FontStyle.fontHeavy13White}
                  text={viewLess ? '__VIEW_MORE__' : '__VIEW_LESS__'}
                />
              </Pressable>
            </View>
          ) : null}
        </>
      ) : (
        <View style={{flex: 1, flexDirection: 'row'}}>
          {Array.from({length: 4}).map((value, index) => (
            <View
              style={{
                marginRight: 4,
                marginLeft: 4,
                marginTop: 16,
                marginBottom: 8,
              }}
              key={index}>
              <SkeletonLoader
                width={200}
                height={300}
                variant="box"
                variant2="dark"
              />
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

export default React.memo(TrendingProduct);

const styles = StyleSheet.create({
  viewBtn: {
    backgroundColor: '#242734',
    borderRadius: 4,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
});
