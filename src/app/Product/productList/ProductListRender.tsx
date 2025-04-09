import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useContext, useMemo, useRef, useState } from 'react';
import { CommonStyle, commanRadius } from '../../../asset/style/commonStyle';
import HeaderWithSearchBag from '../../commonResources/component/Header/HeaderWithSearchBag';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import ProductCard from '../../Home/component/Trending/ProductCard/ProductCard';
import Button from '../../commonResources/component/CommonButton/Button';
import { BlackRight, FilterButton } from '../../../asset/img';
import { FontStyle } from '../../../asset/style/FontsStyle';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { CommonContext } from '../../commonResources/Context/CommonContext';
import TextTranslation from '../../commonResources/component/CommonInput/TextTranslation';
import {
  getLocalStorageData,
  postAuthReq,
  postUnAuthReq,
} from '../../Service/APIServices/axoisService';
import SkeletonLoader from '../../commonResources/component/SkeletonLoader';

const ProductListRender = ({
  route,
  navigativeToFiter,
  navigativeToDetailPage,
  addItemToCart,
  setfilterValue,
}: any) => {
  const [productList, setProductList] = useState<any>([]);
  const [priceRange, setPriceRange] = useState({
    maxPrice: 0,
    minPrice: 0,
  });
  const [selectedSubCat, setSelectedSubCat] = useState(0);
  const [subcateData, setSubcateData] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  const [searchlist, setsearchlist] = useState({
    brandList: [],
    categoryList: [],
  });

  const [filters, setFilters] = useState<any>({
    categoryId: undefined,
    subCategoryId: [],
    brandId: undefined,
    limit: 8,
    pageno: 1,
    search_text: undefined,
    stateId: 1,
    langId: 1,
    cropId: undefined,
    minPrice: priceRange.minPrice,
    maxPrice: priceRange.maxPrice,
  });
  const isFocuse = useIsFocused();

  React.useEffect(() => {
    if (route.params.heading.search_text) {
      getLocalStorageData('current_state').then(res => {
        filters['state_id'] = res;
      });
      getLocalStorageData('userInfo').then((res: any) => {
        let result = JSON.parse(res);
        filters['customerid'] = result.customerid;
      });

      setFilters(filters);
    }
  }, [isFocuse]);

  React.useEffect(() => {
    // if(route.params==undefined){
    //   setFilters(route.params)
    // }
    getProductList();

    if (route.params.heading.categoryid) {
      getSubcategoryList(route.params.heading.categoryid.toString())
    }
    // return setProductList([]);
  }, [route, isFocuse]);

  const getSubcategoryList = async (categoryID: any) => {

    var val = await getLocalStorageData('currentLangauge');
    let lang = 1;
    if (val == 'hi') {
      lang = 2;
    }
    await postAuthReq(`/product/get-sub-categories`, { categoryID: categoryID, langID: lang })
      .then(subcategoryData => {
        console.log('subcategoryData', subcategoryData?.data?.data?.subCatData)
        if (subcategoryData?.data?.data?.subCatData && subcategoryData?.data?.data?.subCatData.length > 0) {
          setSubcateData(subcategoryData?.data?.data?.subCatData)
        }
      }).catch((err) => {
        console.log('errr', err)
      })
  }

  const getShortDetailProduct = async (obj: any, index: any) => {
    var val = await getLocalStorageData('currentLangauge');
    let lang = 1;
    if (val == 'hi') {
      lang = 2;
    }
    await postAuthReq(`/product/get-product-short-detail`, { productId: obj.value, langId: lang })
      .then(productData => {
        const productLists = productList
        const element = productData.data.data.productDetails
        productLists[index].name = element.name
        productLists[index].price = element.price
        productLists[index].image = element.image
        productLists[index].productid = element.productid
        productLists[index].uicdiscount = element.uicdiscount
        productLists[index].uic_price = element.uic_price
        productLists[index].currentSize = { label: element.unit_type, value: element.productid }


        setProductList([...productLists])

        console.log('productData', productList)


      })



  }

  const filter = (priceRange: any, filters: any, searchlist: any) => {
    setfilterValue(
      route.params.maxValue,
      route.params.selectedBrand === undefined
        ? []
        : route.params.selectedBrand,
      route.params.selectedCat === undefined ? [] : route.params.selectedCat,
      route.params.discount === undefined ? false : route.params.discount,
    );
    setProductList([]);
    filters.pageno = 1;
    setFilters(filters);
    navigativeToFiter(priceRange, filters, searchlist);
  };

  // React.useEffect(() => {
  //   if (!isFocuse) {
  //     setProductList([]);
  //   }
  // }, [isFocuse]);
  const getProductList = (productListRefresh = false) => {

    var apiUrlConditionally = `/product/get-category-products-new-new`;
    if (route.params.heading.categoryid) {
      filters.categoryId = route.params.heading.categoryid.toString();
      filters.brandId = route.params.selectedBrand;
      filters.maxPrice = route.params.maxValue;
      filters.discount = route.params.discount;
      // filters.brandId = [1]
      setFilters(filters);
    }

    if (route.params.heading.brandid) {
      apiUrlConditionally = `/product/get-brand-products-new`;
      filters.brandId = route.params.heading.brandid.toString();
      filters.categoryId = route.params.selectedCat;
      filters.discount = route.params.discount;
      filters.maxPrice = route.params.maxValue;
      setFilters(filters);
    }

    if (route.params.heading.cropid) {
      apiUrlConditionally = `/product/get-crop-products-new`;
      filters.cropId = route.params.heading.cropid.toString();
      (filters.categoryId = route.params.selectedCat),
        (filters.brandId = route.params.selectedBrand);
      filters.discount = route.params.discount;
      filters.maxPrice = route.params.maxValue;

      setFilters(filters);
    }

    if (route.params.heading.search_text) {
      apiUrlConditionally = `/crops/search-product-new`;
      filters.search_text = route.params?.heading?.search_text;
      (filters.categoryId = route.params.selectedCat),
        (filters.brandId = route.params.selectedBrand);
      filters.maxPrice = route.params.maxValue;
      filters.discount = route.params.discount;

      setFilters(filters);
    }
    // console.log("======list from state=====",productList)
    getLocalStorageData('currentLangauge').then(async (data: any) => {
      let languageId = 1;
      if (data == 'hi') {
        languageId = 2;
      }

      var current_state: any = await getLocalStorageData('current_state');
      filters.langId = languageId;
      filters.stateId = current_state;

      console.log('filter==========body========= when api call>', filters);
      // getLocalStorageData('auth_Token').then(auth_Token => {
      postAuthReq(apiUrlConditionally, filters)
        .then(productData => {
          if (productData?.data?.data?.minPrice > priceRange.maxPrice) {
            setPriceRange({
              minPrice: productData?.data?.data?.minPrice,
              maxPrice: productData?.data?.data?.maxPrice,
            });
          }
          // console.log('productData.data.data.productDetails', productData.data.data.productDetails)
          if (productListRefresh == false) {
            // console.log('productListRefresh', productListRefresh)
            setProductList([...productData.data.data.productDetails]);
          } else {
            productList.push(...productData.data.data.productDetails);
            setProductList([...productList]);
          }

          // console.log('productData.data.data.productDetails     ---------next', productList)

          setisLoading(false);
          scrollToPosition()
          searchlist.brandList = productData.data.data.brandList;
          searchlist.categoryList = productData.data.data.categoryList;
          setsearchlist(searchlist);
          // setProductList(productData.data.data.productDetails)

        })
        .catch(err => {
          console.log('err from product list', err.response?.data);
        });

      // }else{

      //   postUnAuthReq(`/crops/search-product`,filters).then( (productList) => {
      //     // var stateLists: any = states.data.data.statList;
      //     setProductList(productList.data.data.productList)

      //   }).catch((err)=>{
      //     console.log('err',err)
      //   })

      // }
    });
    // });
  };
  const demoFunction = (item: any) => {

  }

  const setFilerForSubCat = async (subCategoryId: any) => {
    console.log('filters====================================================================================', filters)
    setProductList([]);
    filters.pageno = 1;
    if (filters.subCategoryId.includes(subCategoryId)) {
      filters.subCategoryId = await filters.subCategoryId.filter((item: any) => item !== subCategoryId);

    } else {
      filters.subCategoryId.push(subCategoryId);

    }
    console.log('filters====================================================================================', filters)
    setFilters(filters);
    getProductList();
  }
  const scrollViewRef = useRef<any>(null); // Reference to the ScrollView
  const [scrollPosition, setScrollPosition] = useState(0);

  const handleScroll = (event:any) => {
    const { contentOffset } = event.nativeEvent;
    setScrollPosition(contentOffset.x); // Capture the current scroll position
    // console.log('contentOffset.x',contentOffset.x)
  };

  const getPagintionData = () => {
    filters.pageno = filters.pageno + 1;
    setFilters(filters);
    getProductList(true);
  };

  const scrollToPosition = () => {
    if (scrollViewRef.current) {
      console.log('scrollPosition',scrollPosition)
      scrollViewRef.current.scrollTo({ x: scrollPosition, animated: false }); // Scroll to captured position
    }
  };
  const heading = route.params.heading;

  const { getItemsCount } = useContext(CommonContext);

  const listProduct = () => {
    return (
      <View style={{ flex: 1 }}>

        {productList.length != 0 ? (
          <>

            <View
              style={{
                paddingTop: 24,
                flex: 1,
                marginBottom: 85,
                paddingHorizontal: 4,
              }}>
              <ScrollView ref={scrollViewRef} onScroll={handleScroll} horizontal={true} showsHorizontalScrollIndicator={false}>
                <View style={{ flexDirection: 'row', gap: 8,  }}>
                  {subcateData.length > 0 ? subcateData.map((value: any, ind) => {
                    return <Pressable key={ind} onPress={() => setFilerForSubCat(value.sub_cat_id)} style={{ paddingRight: 12, paddingLeft: 12, paddingTop: 12, paddingBottom: 12, alignItems: 'center', justifyContent: 'center', borderRadius: 6, borderWidth: 1, borderStyle: 'solid', borderColor: 'rgba(36, 40, 52, 0.20)', flexDirection: 'row' }}>
                      {filters.subCategoryId.includes(value.sub_cat_id)?
                      <BlackRight />:null
                  }
                      <Text style={{color:'#242834',textAlign:'center',fontFamily:'Avenir Medium',fontSize:14,fontWeight:'800',lineHeight:20}}>{value.sub_cat_name}</Text>
                    </Pressable>
                  }) : null}
                </View>

              </ScrollView>

              <FlatList
                data={productList}
                scrollEnabled={true}
                onEndReached={getPagintionData}
                onEndReachedThreshold={0.5}
                style={{ paddingBottom: 100 }}
                keyExtractor={(item) => item.productid}
                renderItem={({ item, index }) => (
                  <>
                    <View
                      style={{
                        paddingLeft: 4,
                        paddingRight: 4,
                        paddingBottom: 4,
                        paddingTop: 4,
                      }}>
                      <ProductCard
                        id={item.productid}
                        items={item.sizes}
                        currentSize={item.currentSize}
                        name={item.name}
                        price={item.price}
                        uicPrice={item.uic_price}
                        img={item.image}
                        demoFunction={(value: any) => getShortDetailProduct(value, index)}
                        detailPage={() =>
                          navigativeToDetailPage(
                            item.productid,
                            route.params?.buttonTittle,
                          )
                        }
                        discount={item.uicdiscount}
                        addToBag={addItemToCart}
                        buttonTittle={route.params?.buttonTittle}
                      />
                    </View>
                  </>
                )}
                horizontal={false}
                numColumns={2}
              />
            </View>
          </>
        ) : (
          <View style={[{paddingTop: 24}, CommonStyle.alignCenter_justifyCenter]}>
            <ScrollView ref={scrollViewRef} onScroll={handleScroll} horizontal={true} showsHorizontalScrollIndicator={false}>
                <View style={{ flexDirection: 'row', gap: 8, marginBottom: 16,  }}>
                  {subcateData.length > 0 ? subcateData.map((value: any, ind) => {
                    return <Pressable key={ind} onPress={() => setFilerForSubCat(value.sub_cat_id)} style={{ paddingRight: 12, paddingLeft: 12, paddingTop: 8, paddingBottom: 8, alignItems: 'center', justifyContent: 'center', borderRadius: 6, borderWidth: 1, borderStyle: 'solid', borderColor: 'rgba(36, 40, 52, 0.20)', flexDirection: 'row' }}>
                      {filters.subCategoryId.includes(value.sub_cat_id)?
                      <BlackRight />:null
                  }
                      <Text style={{color:'#242834',textAlign:'center',fontFamily:'Avenir Medium',fontSize:14,fontWeight:'800'}}>{value.sub_cat_name}</Text>
                    </Pressable>
                  }) : null}
                </View>

              </ScrollView>
            <Image
              source={require('../../../asset/img/updatedImg/NoResultFound.png')}
              style={{ width: 220, height: 190, marginBottom: 16,marginTop:40 }}
            />
            <View>
              <TextTranslation
                style={FontStyle.fontHeavy24}
                text={'__NO_RESULTS_FOUND__'}
              />
              <TextTranslation
                style={FontStyle.fontRegular16}
                text={'__NO_RESULT__'}
              />
            </View>
          </View>
        )}
        <View style={styles.buttonView}>
          <Pressable
            style={styles.button}
            onPress={() => filter(priceRange, filters, searchlist)}>
            <FilterButton />
            <TextTranslation
              style={[FontStyle.fontHeavy16, { color: '#fff', marginLeft: 10 }]}
              text={'__FILTER__'}
            />
          </Pressable>
        </View>
      </View>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <HeaderWithSearchBag title={heading.name} itemInBag={getItemsCount} />
      {isLoading == false ? (
        listProduct()
      ) : (
        <>
          <View style={{ flexDirection: 'row' }}>
            <View
              style={{
                marginRight: 4,
                marginLeft: 4,
                marginTop: 16,
                marginBottom: 8,
              }}>
              <SkeletonLoader
                width={200}
                height={300}
                variant="box"
                variant2="dark"
              />
            </View>

            <View
              style={{
                marginRight: 4,
                marginLeft: 4,
                marginTop: 16,
                marginBottom: 8,
              }}>
              <SkeletonLoader
                width={200}
                height={300}
                variant="box"
                variant2="dark"
              />
            </View>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <View
              style={{
                marginRight: 4,
                marginLeft: 4,
                marginTop: 16,
                marginBottom: 8,
              }}>
              <SkeletonLoader
                width={200}
                height={300}
                variant="box"
                variant2="dark"
              />
            </View>

            <View
              style={{
                marginRight: 4,
                marginLeft: 4,
                marginTop: 16,
                marginBottom: 8,
              }}>
              <SkeletonLoader
                width={200}
                height={300}
                variant="box"
                variant2="dark"
              />
            </View>
          </View>
        </>
      )}
    </View>
  );
};

export default ProductListRender;

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#242734',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    height: 54,
    borderRadius: commanRadius.radi4,
    width: '100%',
  },
  buttonView: {
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    width: '100%',
    position: 'absolute',
    bottom: 0,

    paddingHorizontal: 24,
    paddingBottom: 24,
    paddingTop: 8,
  },
});
