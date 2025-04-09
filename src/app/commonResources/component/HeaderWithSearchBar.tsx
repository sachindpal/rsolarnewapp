import {
  Keyboard,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  ViewBase,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {CommonStyle} from '../../../asset/style/commonStyle';
import {HomeLogo, Search, ShopingBag} from '../../../asset/img';
import {FontStyle} from '../../../asset/style/FontsStyle';
import {useTranslation} from 'react-i18next';
import {
  getLocalStorageData,
  getUnAuthReqest,
  postAuthReq,
  setLocalStorage,
} from '../../Service/APIServices/axoisService';
import {ScrollView} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface dataType {
  navigateToCartScreen: () => void;
  itemInBag: any;
  lang: any;
  token:any
}

const HeaderWithSearchBar = (props: dataType) => {
  const navigation = useNavigation<any>();
  const {t: translate} = useTranslation();
  const [productListEnglish, setproductListEnglish] = useState([]);
  const [productListHindi, setproductListHindi] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [asperLanglist, setasperLanglist] = useState([]);
  const [changeState, setChangeState] = useState('-1');
  const [dynamicCartCount, setDynamicCartCount] = useState<any>(0);
  const [authToken, setAuthToken] = useState(null);
  

  const handleSearch = (text: any) => {
    setSearchQuery(text);
    if (text) {
      const newData = asperLanglist?.filter((item: any) => {
        const itemData = item.metatag.toLowerCase();
        const textData = text.toLowerCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredData(newData);
    } else {
      setFilteredData([]);
    }
  };

  const list = async () => {
    try {
      
      const storedDataEnglish = await AsyncStorage.getItem('searchListEnglish');
      const storedDataHindi = await AsyncStorage.getItem('searchListHindi');
      const current_state = await AsyncStorage.getItem('current_state');
      if (storedDataEnglish !== null && changeState==current_state) {
        // Data is found in local storage
        const parsedData = JSON.parse(storedDataEnglish);
        setproductListEnglish(parsedData);
      } else {
        // Fetch data from API
        var stateId = await getLocalStorageData('current_state');
console.log('header state',stateId)
        getUnAuthReqest(`/crops/product-list?state_id=${stateId}&lang=1`)
          .then(res => {
            setproductListEnglish(res.data.data.productList);
            setLocalStorage(
              'searchListEnglish',
              JSON.stringify(res.data.data.productList),
            );
          })
          .catch(err => {
            console.log('response from product list error', err);
          });
      }
      if (storedDataHindi !== null) {
        // Data is found in local storage
        const parsedData = JSON.parse(storedDataHindi);
        setproductListHindi(parsedData);
      } else {
        // Fetch data from API
        var stateId = await getLocalStorageData('current_state');
        getUnAuthReqest(`/crops/product-list?state_id=${stateId}&lang=2`)
          .then(res => {
            console.log(
              'res.data.data.productList=',
              res.data.data.productList.length,
            );
            setproductListHindi(res.data.data.productList);
            setLocalStorage(
              'searchListHindi',
              JSON.stringify(res.data.data.productList),
            );
          })
          .catch(err => {
            console.log('response from product list error', err);
          });
      }
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  };
  useEffect(() => {
    // props.lang == 2
    //   ? setasperLanglist(productListHindi)
    //   : setasperLanglist(productListEnglish);
    setasperLanglist(productListEnglish.concat(productListHindi))
  }, [props.lang, productListEnglish, productListHindi]);

  useEffect(() => {
    list();
    getLocalStorageData('auth_Token').then((value)=>{
      console.log('setAuthToken====================================================',value)
      if(value){
      tempFunction();

      }else{
        setDynamicCartCount(0)
      }
    })
  }, [props.itemInBag,props.token]);

  const navigativeToDetailPage = (productid: any) => {
    navigation.navigate('ProductDetail', {id: productid,search_text:searchQuery});
    setSearchQuery('');
    setFilteredData([]);
  };

  const navigationToProductList = (item: any) => {
    if (item != '') {
      navigation.navigate('ProductList', {
        heading: {search_text: item, name: item},
      });
    } else {
      Keyboard.dismiss();
    }
    setSearchQuery('');
    setFilteredData([])
  };
  const tempFunction = async()=>{
    var val = await getLocalStorageData('currentLangauge')
    let lang = 1;
    if (val == 'hi') {
      lang = 2;
    }
    // return lang

    const stateId = await getLocalStorageData('current_state');
    await postAuthReq('/cart/get-cartdata', { langId: lang, stateId: stateId }).then(async (data: any) => {
      // console.log('sachin', data.data.data?.cartDetails)
      var productCart = data.data.data?.cartDetails;
      var dynamic =  await productCart.reduce((sum: any, item: any) => sum + item.quantity, 0);
      console.log('dynamic',dynamic)
      setDynamicCartCount(dynamic)
      return dynamic
    }).catch((err) => {
      setDynamicCartCount(0)
      console.log('kkkkkkkkkkkkk', err);
    })
  // return value1
  }

  return (
    <View style={{flexGrow: 1, maxHeight: 130, overflow: 'visible'}}>
      <View style={[{backgroundColor: '#242734', padding: 16, maxHeight: 130}]}>
        <View style={[CommonStyle.flex_dirRow_alignCenter_justifySpbtw]}>
          <View style={{paddingTop: 5}}>
            <HomeLogo />
          </View>
          <Pressable
            style={{paddingRight: 7}}
            onPress={props.navigateToCartScreen}>
            {dynamicCartCount== 0 ? null : (
              <View style={styles.badge}>
                <Text style={[FontStyle.fontMedium16, {color: '#fff'}]}>
                  {dynamicCartCount}
                </Text>
              </View>
            )}
            <ShopingBag width={40} height={40} />
          </Pressable>
        </View>
        <View>
          <View
            style={{
              backgroundColor: 'white',
              borderRadius: 6,
              paddingLeft: 16,
              elevation: 5,
              overflow: 'hidden',
              marginTop: 16,
              height: filteredData?.length === 0 ? 42 : null,
            }}>
            <View style={[CommonStyle.flex_dirRow_alignCenter,{height:42}]}>
              <Search width={20} height={20} />
              <View style={{paddingLeft: 8, flex: 1}}>
                <TextInput
                  placeholder={translate('__SEARCH_PLACEHOLDER__')}
                  style={[FontStyle.fontMediumGray13]}
                  placeholderTextColor={'#7e7e7e'}
                  onSubmitEditing={() => navigationToProductList(searchQuery)}
                  onChangeText={txt => handleSearch(txt)}
                  value={searchQuery}
                />
              </View>
            </View>
            <View
              style={{
                paddingTop: 16,
                height: 206,
              }}>
              <ScrollView contentContainerStyle={{flexGrow: 1}}>
                {filteredData?.map((item: any, index: any) => {
                  return (
                    <View
                      style={{paddingHorizontal: 16, paddingBottom: 16}}
                      key={index}>
                      <Text
                        style={FontStyle.fontMedium14}
                        onPress={() => navigativeToDetailPage(item.productid)}>
                        {item.name}
                      </Text>
                    </View>
                  );
                })}
              </ScrollView>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default React.memo(HeaderWithSearchBar);

const styles = StyleSheet.create({
  badge: {
    width: 25,
    height: 25,
    borderRadius: 13,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ff0000',
    position: 'absolute',
    zIndex: 1,
    left: 10,
    top: -8,
  },
});
