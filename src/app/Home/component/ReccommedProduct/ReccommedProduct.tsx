import {FlatList, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useContext} from 'react';
import {CommonStyle} from '../../../../asset/style/commonStyle';
import {TrendingIcon} from '../../../../asset/img/index.ts';

import TextTranslation from '../../../commonResources/component/CommonInput/TextTranslation';
import {FontStyle} from '../../../../asset/style/FontsStyle';
import {useNavigation} from '@react-navigation/native';
import {CommonContext} from '../../../commonResources/Context/CommonContext';
import ProductCard from '../Trending/ProductCard/ProductCard';
import {
  getLocalStorageData,
  postAuthReq,
  postUnAuthReq,
} from '../../../Service/APIServices/axoisService';
import SkeletonLoader from '../../../commonResources/component/SkeletonLoader.tsx';

interface dataType {
  lang: any;
  stateId: any;
  token: any;
}
const ReccommedProduct = (props: dataType) => {
  const [viewLess, setviewLess] = React.useState(true);
  const [hideView, sethideView] = React.useState(false);

  const navigation = useNavigation<any>();

  const [recomProducts, setrecomProducts] = React.useState<any>([]);
  const [isLoading, setisLoading] = React.useState(true);

  React.useEffect(() => {
    setrecomProducts([]);
    // getLocalStorageData('auth_Token').then((authToken) => {
    console.log('+=======value rendred======');
    if (props.token) {
      postAuthReq('/home/get-justforyou-products-new', {
        langId: props.lang,
        stateId: props.stateId,
      })
        .then((data: any) => {
          setrecomProducts(data?.data?.data?.justForYouProducts);
          // setrecomProducts(data)
          setisLoading(false);

          if (data?.data?.data?.justForYouProducts.length < 4) {
            sethideView(true);
          }
        })
        .catch(err => {
          console.log('err', err);
        });
    }
    // else{
    //   postUnAuthReq('/home/get-justforyou-products', { langId: props.lang, stateId: props.stateId }).then((data: any) => {

    //     setrecomProducts(data?.data?.data?.justForYouProducts)
    //     // setrecomProducts(data)
    //     setisLoading(false)

    //     if (data?.data?.data?.justForYouProducts.length < 4) {
    //       sethideView(true)
    //     }
    //   }).catch((err) => {
    //     console.log('err from recommended', err.response);
    //   })
    // }
    // })
  }, [props.lang, props.stateId, props.token]);

  const getShortDetailProduct = async(obj:any,index:any)=>{
    var val = await getLocalStorageData('currentLangauge');
    let lang = 1;
    if (val == 'hi') {
      lang = 2;
    }
    await postAuthReq(`/product/get-product-short-detail`, {productId:obj.value,langId:lang})
        .then(productData => {
          const productLists = recomProducts
          const element = productData.data.data.productDetails
              productLists[index].name = element.name
            productLists[index].price = element.price
            productLists[index].image = element.image
            productLists[index].productid = element.productid
            productLists[index].uicdiscount = element.uicdiscount
            productLists[index].uic_price = element.uic_price
            productLists[index].currentSize = {label:element.unit_type,value:element.productid}
            
            
            setrecomProducts([...productLists])
          
        console.log('productData',recomProducts)


        })



  }

  const navigativeToDetailPage = (id: any) => {
    navigation.navigate('ProductDetail', {id: id});
  };

  const {addItemToCart} = useContext(CommonContext);

  return (
    <View>
      {recomProducts && recomProducts.length != 0 ? (
        <>
          <View
            style={[
              CommonStyle.flex_dirRow_alignCenter,
              {marginBottom: 18, paddingLeft: 8},
            ]}>
            <TrendingIcon width={24} height={24} />
            <View style={{marginLeft: 8}}>
              <TextTranslation
                style={FontStyle.fontHeavy18}
                text={'__JUST__'}
              />
            </View>
          </View>
          <FlatList
            data={viewLess ? recomProducts.slice(0, 4) : recomProducts}
            style={{paddingHorizontal: 4}}
            scrollEnabled={false}
            renderItem={({item,index}: any) => (
              <>
                <View style={{paddingHorizontal: 4, paddingBottom: 8}}>
                  <ProductCard
                    items={item.sizes}
                    currentSize={{}}
                    demoFunction={(value:any)=>getShortDetailProduct(value,index)}
                    id={item.productid}
                    discount={item.uicdiscount}
                    name={item.name}
                    price={item.price}
                    uicPrice={item.uic_price}
                    img={item.image}
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
      ) : null}
    </View>
  );
};

{
  /* <SkeletonLoader width={200} height={100} variant="box" variant2='dark'/> */
}
export default React.memo(ReccommedProduct);

const styles = StyleSheet.create({
  viewBtn: {
    backgroundColor: '#242734',
    borderRadius: 4,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
});
