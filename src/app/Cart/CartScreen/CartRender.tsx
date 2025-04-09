import {
  ActivityIndicator,
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, { useState } from 'react';
import {
  ColorVariable,
  CommonStyle,
  commanRadius,
} from '../../../asset/style/commonStyle';
import {
  Add,
  BagHome,
  EmptyBag,
  HomeNew,
  RedRemove,
  Remove,
  ShopingBag,
} from '../../../asset/img';
import { FontStyle } from '../../../asset/style/FontsStyle';
import { ScrollView } from 'react-native-gesture-handler';
import TextTranslation from '../../commonResources/component/CommonInput/TextTranslation';
import RemovePopup from './component/RemovePopup';
import {
  getLocalStorageData,
  postAuthReq,
  postUnAuthReq,
  setLocalStorage,
} from '../../Service/APIServices/axoisService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FastImage from 'react-native-fast-image';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import { useIsFocused } from "@react-navigation/native";
interface dataType {
  goBack: any;
  bagProduct: any;
  getItemsCount: any;
  removeFromCart: any;
  addItemToCart: any;
  navigateToPayment: any;
  removeCompleteProuduct: (id: number) => void;
  navigateToHome: () => void;
  reduceQuantity: any;
  openClosePopup: any;
  removeProductFromPopup: any;
  visible: boolean;
  reloadOnRemove: any
}

const { width, height } = Dimensions.get('screen');

const CartRender = ({
  goBack,
  bagProduct,
  addItemToCart,
  navigateToPayment,
  removeCompleteProuduct,
  navigateToHome,
  reduceQuantity,
  openClosePopup,
  removeProductFromPopup,
  visible,
  getItemsCount,
  reloadOnRemove
}: dataType) => {
  const isFocused = useIsFocused();
  const [cartAddedProduct, setCartAddedProduct] = React.useState([]);
  const [totalPrice, setTotalPrice] = React.useState<any>({});
  const [inc, setOnClickInc] = useState(1)
  const [itemForCount, setCountForAddItem] = useState(1)

  const [idfordelete, setIdForDelete] = useState(0)
  const [isloading, setIsloading] = useState(true)

  const navigation = useNavigation<any>();

  React.useEffect(() => {
    if (isFocused) {
      const setAndGetBagProduct = async () => {

        var returnProduct = await getCartProducts();
        if (returnProduct && returnProduct.length > 0) {
          getTotalPrice(returnProduct)

        }

      };

      //including the uic discount
      // const getTotalPrice = async (cartLocal: any) => {
      //   var auth = await AsyncStorage.getItem('auth_Token');
      //   var userInfo: any = await AsyncStorage.getItem('userInfo');


      //   postAuthReq('/order/get-uic-details', {})
      //     .then(res => {
      //       // res.data.data.uicDetails.uicamount = 10
      //       console.log('result======================================cartLocal', cartLocal)
      //       if (cartLocal) {
      //         var sum = 0;
      //         var sum1 = 0;
      //         var obj = {};
      //         for (let index = 0; index < cartLocal.length; index++) {
      //           const item = cartLocal[index];
      //           console.log('returnProduct======================================================================', userInfo)
      //           var current = item.select.uicPrice * item.qty;
      //           sum += current;

      //           var currentTotal = item.select.totalPrice * item.qty;
      //           sum1 += currentTotal;

      //           var futureMonth = moment(JSON.parse(userInfo)?.uicappliedon).add(1, 'M').format('YYYY-MM-DD');

      //           if ((JSON.parse(userInfo)?.aplyforuic == 'Y' && futureMonth >= moment().format('YYYY-MM-DD'))
      //             || (res.data.data?.uicDetails && res.data.data?.uicDetails?.uicType == 'UIC_GOLD')
      //             || res.data.data?.uicDetails.uicamount >= 1000) {
      //             var save = sum1 - sum;
      //             if (item.select.uicdiscount > 0) {
      //               let alonePro = item.select.uicPrice * item.qty
      //               var multi = (item.select.uicdiscount * alonePro) / 100;

      //               save += multi
      //               sum -= multi
      //             }
      //             obj = { total: sum, saving: save };

      //           } else {
      //             var save = 0;
      //             if (item.select.uicdiscount > 0) {
      //               let alonePro = item.select.totalPrice * item.qty

      //               var multi = (item.select.uicdiscount * alonePro) / 100;
      //               save += multi
      //               sum1 -= multi
      //             }
      //             obj = { total: sum1.toFixed(2), saving: save.toFixed(2) };
      //           }
      //         }

      //         setTotalPrice(obj);
      //       }
      //     })


      // };

      //including the uic discount
      const getTotalPrice = async (cartLocal: any) => {
        var auth = await AsyncStorage.getItem('auth_Token');
        var userInfo: any = await AsyncStorage.getItem('userInfo');


        postAuthReq('/order/get-uic-details', {})
          .then(res => {
            // res.data.data.uicDetails.uicamount = 10
            console.log('result======================================cartLocal', cartLocal)
            if (cartLocal) {
              var sum = 0;
              var sum1 = 0;
              var obj = {};
              for (let index = 0; index < cartLocal.length; index++) {
                const item = cartLocal[index];
                console.log('returnProduct======================================================================', userInfo)
                var current = item.select.uicPrice * item.qty;
                sum += current;

                var currentTotal = item.select.totalPrice * item.qty;
                sum1 += currentTotal;

                var futureMonth = moment(JSON.parse(userInfo)?.uicappliedon).add(1, 'M').format('YYYY-MM-DD');

                
                  var save = sum1 - sum;
                  if (item.select.uicdiscount > 0) {
                    let aloneProUic = item.select.uicPrice * item.qty
                    let aloneProNonUic = item.select.totalPrice * item.qty
                    var multi = (item.select.uicdiscount * aloneProUic) / 100;

                    save += multi
                    sum -= multi
                  }
                  obj = { total: sum, saving: save };

                // } else {
                //   var save = 0;
                //   if (item.select.uicdiscount > 0) {
                //     let alonePro = item.select.totalPrice * item.qty

                //     var multi = (item.select.uicdiscount * alonePro) / 100;
                //     save += multi
                //     sum1 -= multi
                //   }
                //   obj = { total: sum1.toFixed(2), saving: save.toFixed(2) };
                // }
              }

              setTotalPrice(obj);
            }
          })


      };


      setAndGetBagProduct();
      // getTotalPrice();
    }
    // console.log('cartAddedProduct',cartAddedProduct.length)
  }, [inc, itemForCount, idfordelete, reloadOnRemove, navigation, isFocused]);

  const getCartProducts = async () => {
    var auth = await AsyncStorage.getItem('auth_Token');
    setIsloading(false)

    if (auth) {
      console.log('inside..............................................')

      setIsloading(true)
      return getLocalStorageData('currentLangauge').then(async val => {
        let lang = 1;
        if (val == 'hi') {
          lang = 2;
        }
        const stateId = await getLocalStorageData('current_state');
        const cartArray: any = []
        return postAuthReq('/cart/get-cartdata', { langId: lang, stateId: stateId }).then(
          async data => {
            setIsloading(false)

            if (data.data.data?.cartDetails?.length > 0) {
              for (let index = 0; index < data.data.data?.cartDetails.length; index++) {

                const element = data.data.data?.cartDetails[index];

                await addItemToCart(element.productid, element.name, element.price, element.uic_price, element.image,
                  element.uicdiscount, 'updatecontaxt')

                let select = {
                  id: element.productid,
                  name: element.name,
                  totalPrice: element.price,
                  uicPrice: element.uic_price,
                  img: element.image,
                  uicdiscount: element.uicdiscount
                };
                let cartPro = {
                  id: element.productid,
                  qty: element.quantity,
                  select,
                  totalPrice: select.totalPrice
                }
                cartArray.push(cartPro);

              }

              setLocalStorage('bagProduct', JSON.stringify(cartArray));
              setCartAddedProduct(cartArray)
              return cartArray;
            } else {
              setCartAddedProduct([])


            }
            return cartArray
            // setCartData(data.data.data.cartDetails);
          },
        );
      })
    }
  }

  const navigativeToDetailPage = (id: any) => {
    navigation.navigate('ProductDetail', { id: id });
  };
  const reduceQuantitys = async (quantitys: any) => {
    await reduceQuantity(quantitys)
    await setOnClickInc(inc + 1)

  }
  const openClosePopups = async (id: any) => {
    await openClosePopup(id)
    // await setIdForDelete(idfordelete + 1)

  }

  const addItemToCarts = async (id: any, name: any, price: any, uicPrice: any, uicdiscount: any) => {
    await addItemToCart(id, name, price, uicPrice, uicdiscount)
    await setCountForAddItem(itemForCount + 1)

  }
  return (
    <View style={[{ flex: 1, backgroundColor: '#fff' }]}>
      <View
        style={[
          CommonStyle.headerMainView,
          CommonStyle.flex_dirRow_alignCenter_justifySpbtw,
        ]}>
        <View style={CommonStyle.flex_dirRow_alignCenter}>
          <Pressable onPress={goBack}>
            <Image source={require('../../../asset/img/close.png')} />
          </Pressable>
          <TextTranslation
            style={[FontStyle.fontMedium18, { color: '#fff', marginLeft: 16 }]}
            text={'__BAG__'}
          />
        </View>
        <Pressable onPress={navigateToHome}>
          <HomeNew />
        </Pressable>
      </View>

      {!isloading ? cartAddedProduct && cartAddedProduct.length != 0 ? (
        <>
          <ScrollView style={{ marginBottom: 130 }}>
            {cartAddedProduct &&
              cartAddedProduct.map((item: any, index: any) => {
                return (
                  <View style={styles.contantView} key={index}>
                    <Pressable
                      style={[
                        CommonStyle.flex_dirRow_alignCenter,
                        styles.firstPart,
                      ]}
                      onPress={() => navigativeToDetailPage(item.select.id)}>
                      <View style={[styles.imgView]}>
                        {item.select.uicdiscount != 0 ? (
                          <View style={CommonStyle.discountBadge}>
                            <Text
                              style={[
                                FontStyle.fontMedium12,
                                { color: 'white' },
                              ]}>
                              -{item.select.uicdiscount}%
                            </Text>
                          </View>
                        ) : null}
                        <FastImage
                          source={{ uri: item.select.img }}
                          style={{ height: 100, width: 100 }}
                        />
                      </View>
                      <View style={{ paddingLeft: 12, flex: 1 }}>
                        <View>
                          <Text
                            style={[FontStyle.fontMedium16]}
                            numberOfLines={2}>
                            {item.select.name}
                            {/* Not a farmkart customer? Not a farmkart customer?
                            Not a farmkart customer? */}
                          </Text>
                        </View>
                        <View
                          style={[
                            CommonStyle.flex_dirRow_alignCenter,
                            { paddingTop: 6, flex: 1, gap: 8 },
                          ]}>
                          {/* <View
                            style={[
                              {
                                flex: 0.5,
                                borderRightWidth: 1,
                                borderRightColor: ColorVariable.stroke,
                              },
                            ]}>
                            <TextTranslation
                              style={[
                                FontStyle.fontMedium14,
                                { marginBottom: 6 },
                              ]}
                              text={'__PRICE__'}
                            />
                            <Text
                              style={[
                                FontStyle.fontMedium14,
                              ]}>{`Rs.${item.select.totalPrice}`}</Text>
                          </View>
                          <View style={{ flex: 1, paddingLeft: 16 }}>
                            <TextTranslation
                              style={[
                                FontStyle.fontHeavy14,
                                { color: '#73be44', marginBottom: 6 },
                              ]}
                              text={'__UIC_PRICE__'}
                            />
                            <Text
                              style={[
                                FontStyle.fontHeavy14,
                                { color: '#242737', lineHeight: 18 },
                              ]}>{`Rs.${item.select.uicPrice}`}</Text>
                          </View> */}


                          <View>
                            <Text style={{ fontFamily: 'Avenir', fontSize: 16, fontStyle: 'normal', fontWeight: '400', lineHeight: 16, letterSpacing: 0.5, color: '#7E7E7E', textDecorationLine: 'line-through' }}>₹{item.select.totalPrice}</Text>
                          </View>
                          <View>
                            <Text style={{ fontFamily: 'Avenir', fontSize: 16, fontStyle: 'normal', fontWeight: '800', lineHeight: 16, letterSpacing: 0.5, color: '#242834' }}>₹{item.select.uicPrice}</Text>
                          </View>
                        </View>
                      </View>
                    </Pressable>
                    <View
                      style={[
                        styles.secondPart,
                        CommonStyle.flex_dirRow_alignCenter,
                      ]}>
                      <View
                        style={[
                          CommonStyle.flex_dirRow_alignCenter,
                          { flex: 0.6 },
                        ]}>
                        <Pressable onPress={() => reduceQuantitys(item.id)}>
                          <Remove />
                        </Pressable>
                        <View style={{ paddingHorizontal: 8 }}>
                          <Text style={FontStyle.fontHeavy16}>{item.qty}</Text>
                        </View>
                        <Pressable
                          onPress={() =>
                            addItemToCarts(
                              item.id,
                              item.select.name,
                              item.select.price,
                              item.select.uicPrice,
                              item.select.uicdiscount,
                            )
                          }>
                          <Add />
                        </Pressable>
                        <View style={{ paddingLeft: 16 }}>
                          <TextTranslation
                            style={FontStyle.fontHeavy14}
                            text={'__QUANTITY__'}
                          />
                        </View>
                      </View>
                      <Pressable
                        style={[
                          CommonStyle.flex_dirRow_alignCenter,
                          { flex: 0.4, justifyContent: 'center' },
                        ]}
                        onPress={() => openClosePopups(item.id)}>
                        <RedRemove />
                        <TextTranslation
                          style={[
                            FontStyle.fontHeavy14,
                            { color: '#ff5252', marginLeft: 8 },
                          ]}
                          text={'__REMOVE__'}
                        />
                      </Pressable>
                    </View>
                  </View>
                );
              })}
          </ScrollView>

          <View
            style={{
              backgroundColor: 'rgba(245, 245, 245, 1)',
              position: 'absolute',
              right: 0,
              left: 0,
              bottom: 0,
            }}>
            <View
              style={[
                CommonStyle.flex_dirRow_alignCenter_justifySpbtw,
                styles.total,
              ]}>
              <View style={CommonStyle.flex_dirRow_alignCenter}>
                <TextTranslation
                  text={'__TOTAL_SAVINGS__'}
                  style={[
                    FontStyle.fontMedium14,
                    { color: 'rgba(126, 126, 126, 1)' },
                  ]}
                />
                <Text
                  style={[
                    FontStyle.fontMedium14,
                    { color: 'rgba(126, 126, 126, 1)' },
                  ]}>
                  {' '}
                  ₹{totalPrice.saving}
                </Text>
              </View>
              <View style={CommonStyle.flex_dirRow_alignCenter}>
                <TextTranslation
                  style={[FontStyle.fontHeavy16]}
                  text={'__ORDER_TOTAL__'}
                />
                <Text style={[FontStyle.fontHeavy16]}>
                  {' '}
                  ₹{totalPrice.total}
                </Text>
              </View>
            </View>
            <Pressable
              style={[
                CommonStyle.flex_dirRow_alignCenter,
                styles.footerBtn,
                { justifyContent: 'center' },
              ]}
              onPress={() => navigateToPayment(totalPrice.total)}>
              <TextTranslation
                style={[FontStyle.fontHeavy18, { color: '#fff' }]}
                text={'__PROCEED_TO_CHECKOUT__'}
              />
              <Image
                source={require('../../../asset/img/next_checkouticon.png')}
                width={9}
                height={16}
                style={{ marginLeft: 11 }}
              />
            </Pressable>
          </View>
        </>
      ) : (
        <View
          style={[
            CommonStyle.alignCenter_justifyCenter,
            { flex: 1, justifyContent: 'space-between' },
          ]}>
          <View style={{ top: '15%', alignItems: 'center' }}>
            <View style={{ marginBottom: 24 }}>
              <EmptyBag width={0.47 * width} height={0.22 * height} />
            </View>
            <TextTranslation
              style={FontStyle.fontMedium16}
              text={'__YOUR_BAG_IS_EMPTY__'}
            />
          </View>

          <View style={styles.buttonView}>
            <Pressable style={styles.button} onPress={navigateToHome}>
              <ShopingBag />
              <TextTranslation
                style={[
                  FontStyle.fontHeavy16,
                  { color: '#fff', marginLeft: 9.6 },
                ]}
                text={'__CONTINUE_SHOPPING__'}
              />
            </Pressable>
          </View>
        </View>
      ) : <View style={[CommonStyle.alignCenter_justifyCenter, { flex: 1 }]}>
        <ActivityIndicator size={'large'} />
      </View>}
      <RemovePopup
        onClose={openClosePopup}
        visible={visible}
        remove={removeProductFromPopup}
      />
    </View>
  );
};

export default CartRender;

const styles = StyleSheet.create({
  imgView: {
    borderWidth: 0.9,
    borderColor: ColorVariable.stroke,
    borderRadius: commanRadius.radi6,
    overflow: 'hidden',
  },
  button: {
    backgroundColor: '#73be44',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingVertical: 16,
    borderRadius: commanRadius.radi6,
    marginVertical: 24,
    width: '85%',
  },
  buttonView: {
    alignItems: 'center',
    width: '100%',
  },

  secondPart: {
    paddingTop: 24,
    paddingBottom: 10,
    paddingHorizontal: 10,
  },
  firstPart: {
    paddingTop: 10,
    marginHorizontal: 10,
  },

  contantView: {
    marginHorizontal: 8,
    marginTop: 2,
    borderRadius: 6,
    backgroundColor: 'white',
    elevation: 5,
    marginBottom: 9,
  },
  total: {
    paddingVertical: 16,
    paddingHorizontal: 18,
  },
  footerBtn: {
    backgroundColor: '#73be44',
    height: 70,
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
  },
});
