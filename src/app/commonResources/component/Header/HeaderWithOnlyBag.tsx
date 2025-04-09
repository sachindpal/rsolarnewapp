import {Pressable, StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {CommonStyle} from '../../../../asset/style/commonStyle';
import {
  CloseWhite,
  Search,
  ShopingBag,
  WhiteBack,
  WhiteSearch,
} from '../../../../asset/img';
import {FontStyle} from '../../../../asset/style/FontsStyle';
import {useTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/native';
import TextTranslation from '../CommonInput/TextTranslation';
import {ScrollView} from 'react-native-gesture-handler';
import {getLocalStorageData, postAuthReq} from '../../../Service/APIServices/axoisService';

interface dataType {
  title: string;
  icon?:boolean;
  itemInBag?: any;
}

const HeaderWithOnlyBag = ({title,icon=true,itemInBag}: dataType) => {
  const {t: translate} = useTranslation();
  const navigation = useNavigation<any>();
  const [showSearch, setshowSearch] = React.useState(false);

  const [productListEnglish, setproductListEnglish] = useState([]);
  const [productListHindi, setproductListHindi] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [asperLanglist, setasperLanglist] = useState<any>([]);
  const [dynamicCartCount, setDynamicCartCount] = useState<any>(0);

  const handleSearch = (text: any) => {
    setSearchQuery(text);
    if (text) {
      const newData = asperLanglist?.filter((item: any) => {
        const itemData = item.name.toLowerCase();
        const textData = text.toLowerCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredData(newData);
    } else {
      setFilteredData([]);
    }
  };

  const handleSearchIcon = () => {
    setshowSearch(!showSearch);
  };

  const handleBack = () => {
    navigation.goBack();
  };
  const navigateToCartScreen = () => {
    navigation.navigate('Cart');
  };

  const navigativeToDetailPage = (productid: any) => {
    navigation.navigate('ProductDetail', {id: productid});
    setSearchQuery('');
    setFilteredData([]);
  };

  const navigationToProductList = (item: any) => {
    navigation.navigate('ProductList', {
      heading: {search_text: item, name: item},
    });
    setSearchQuery('');
    setFilteredData([]);
  };

  const getValue = () => {
    getLocalStorageData('currentLangauge').then(data => {
      if (data == 'hi') {
        getLocalStorageData('searchListHindi').then((data: any) => {
          setasperLanglist(JSON.parse(data));
        });
      } else {
        getLocalStorageData('searchListEnglish').then((data: any) => {
          setasperLanglist(JSON.parse(data));
        });
      }
    });
  };

  const tempFunction = async()=>{
    var val = await getLocalStorageData('currentLangauge')
    let lang = 1;
    if (val == 'hi') {
      lang = 2;
    }

    const stateId = await getLocalStorageData('current_state');
    await postAuthReq('/cart/get-cartdata', { langId: lang, stateId: stateId }).then(async (data: any) => {
      // console.log('sachin', data.data.data?.cartDetails)
      var productCart = data.data.data?.cartDetails;
      var dynamic =  await productCart.reduce((sum: any, item: any) => sum + item.quantity, 0);
      console.log
      setDynamicCartCount(dynamic)
      return dynamic
    }).catch((err) => {
      setDynamicCartCount(0)
      console.log('kkkkkkkkkkkkk', err);
    })
  // return value1
  }

  useEffect(() => {
    console.log('success run function')
    tempFunction();

    getValue()
  }, [itemInBag])
  

  return (
    <View style={styles.main}>
      <View
        style={[
          CommonStyle.flex_dirRow_justifySpbtw,
          {
            paddingLeft: 16,
            paddingRight: 16,
          },
        ]}>
        <View style={[CommonStyle.flex_dirRow_alignCenter,{width:200}]}>
          <Pressable onPress={handleBack}>
            {icon?<WhiteBack/>:<CloseWhite />}
          </Pressable>
          <TextTranslation
            style={[
              FontStyle.fontMedium18,
              {marginLeft: 16, color: 'rgba(255, 255, 255, 1)'},
              
            ]}
            text={title}
            title={'elipse'}
          />
        </View>
        <View style={CommonStyle.flex_dirRow_alignCenter}>
          {icon?<Pressable onPress={handleSearchIcon}>
            {/* <WhiteSearch /> */}
          </Pressable>:null}
          <Pressable style={{marginLeft: 16}} onPress={navigateToCartScreen}>
            {dynamicCartCount == 0 ? null : (
              <View style={styles.badge}>
                <Text style={[FontStyle.fontMedium16, {color: '#fff'}]}>
                  {dynamicCartCount}
                </Text>
              </View>
            )}
            <ShopingBag width={27} height={33} />
          </Pressable>
        </View>
      </View>
      {showSearch ? (
        <View>
          <View
            style={{
              backgroundColor: 'white',
              borderRadius: 6,
              paddingLeft: 16,
              marginHorizontal: 16,
              elevation: 5,
              overflow: 'hidden',
              marginTop: 16,
              height: filteredData?.length === 0 ? 42 : null,
            }}>
            <View style={[CommonStyle.flex_dirRow_alignCenter]}>
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
      ) : null}
    </View>
  );
};

export default HeaderWithOnlyBag;

const styles = StyleSheet.create({
  main: {
    backgroundColor: '#242734',
    paddingVertical: 16,
    justifyContent: 'center',
  },
  searchView: {
    backgroundColor: 'white',
    height: 42,
    borderRadius: 2,
    paddingLeft: 16,
    marginHorizontal: 16,
    marginTop: 16,
  },
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
