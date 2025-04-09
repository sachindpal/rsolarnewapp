import {
  ActivityIndicator,
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, { useMemo, useRef, useState, useTransition } from 'react';
import {
  ColorVariable,
  CommonStyle,
  commanRadius,
} from '../../../asset/style/commonStyle';
import { Add, CircleWithDotRadio, CircleWithRadio, Remove, RightArrow, ShopingBag, UnFilledStar } from '../../../asset/img';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import { FontStyle } from '../../../asset/style/FontsStyle';
import TextInputField from '../../commonResources/component/CommonInput/TextInputField';
import Button from '../../commonResources/component/CommonButton/Button';
import TextTranslation from '../../commonResources/component/CommonInput/TextTranslation';
import { useSSR, useTranslation } from 'react-i18next';
import CustomButton from '../../commonResources/component/CommonButton/CustomButton';
import { Dropdown } from 'react-native-element-dropdown';
import {
  getLocalStorageData,
  onCallMobileNumber,
  postAuthReq,
} from '../../Service/APIServices/axoisService';
import FastImage from 'react-native-fast-image';
import RatingStar from '../../commonResources/component/RatingStar/RatingStar';
import { showToast } from '../../commonResources/commanSnackbar/toastMessage';
import SkeletonLoader from '../../commonResources/component/SkeletonLoader';
import ProductCard from '../../Home/component/Trending/ProductCard/ProductCard';
import { useNavigation, useRoute } from '@react-navigation/native';
import RadioGroup from 'react-native-radio-buttons-group';
interface dataType {
  goBack: any;
  navigateToCartScreen: any;
  getItemsCount: any;
  addItemToCart: any;
  removeFromCart: any;
  buyNow: any;
  navigationToAccount: any;
  id: any;
  buttonName: any;
  isSearch: any;
}

const { width } = Dimensions.get('screen');

const ProductDetailRender = ({
  goBack,
  navigateToCartScreen,
  getItemsCount,
  addItemToCart,
  removeFromCart,
  buyNow,
  navigationToAccount,
  id,
  buttonName,
  isSearch,
}: dataType) => {
  const flatListRef = useRef<any>();
  const navigation = useNavigation<any>();
  const [activeIndex, setactiveIndex] = React.useState(0);
  const [activetab, setactivetab] = React.useState('review');
  const [producDetail, setProductDetail] = useState<any>({});
  const [productImages, setProductImages] = useState<any>({});
  const [productComment, setProductComment] = useState<any>([]);
  const [productQuestions, setProductQuestions] = useState<any>([]);
  const [authToken, setAuthToken] = useState<any>(false);
  const [inputQuestion, setInputQuestion] = useState<any>('');
  const [viewLessQuestion, setViewLessQuestion] = useState<any>();
  const [viewLessReview, setViewLessReview] = useState<any>();
  const [viewMoreFlag, setViewMoreFlag] = useState<any>(3);
  const [viewMoreFlagReview, setViewMoreFlagReview] = useState<any>(3);
  const [isLoading, setisLoading] = useState(true);
  // similar products
  const [similarProduct, setsimilarProduct] = useState<any>([]);
  const [viewLess, setviewLess] = React.useState(true);
  const [hideView, sethideView] = React.useState(false);
  const [isLoadingSimilar, setisLoadingSimilar] = useState(true);
  const [dynamicCartCount, setDynamicCartCount] = useState<any>(0);
  const [dynamicCartCountAll, setDynamicCartCountAll] = useState<any>(0);
  const [allProducts, setAllProducts] = useState<any>([]);
  const [localLang, setLocalLang] = useState<any>(1);
  const [chemicalComp, setChemicalComp] = useState<any>(false);
  const [cropSection, setCropSection] = useState<any>(false);
  const [pestsSection, setPestsSection] = useState<any>(false);
  const [productDesSec, setProductDesSec] = useState<any>(false);
  const [dropDownData, setDropDownData] = useState<any>([]);
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  const dataDrop = [
    { label: 'Item 1', value: '1' },
    { label: 'Item 2', value: '2' },
    { label: 'Item 3', value: '3' },
    { label: 'Item 4', value: '4' },
    { label: 'Item 5', value: '5' },
    { label: 'Item 6', value: '6' },
    { label: 'Item 7', value: '7' },
    { label: 'Item 8', value: '8' },
  ];

  const { t: translate } = useTranslation();

  React.useEffect(() => {
    getLocalStorageData('auth_Token').then(auth => {
      console.log('=========auth========', auth);
      if (auth != null) {
        setAuthToken(true);
      } else {
        setAuthToken(false);
      }
    });
    getProductAPI(id);
    tempFunction(id);
    // setDropDownData(dataDrop)
  }, []);


  const renderLabel = () => {
    if (value || isFocus) {
      return (
        <Text style={[styles.label, isFocus && { color: 'blue' }]}>
          Dropdown label
        </Text>
      );
    }
    return null;
  };

  async function moveToBeginning(array: any, id: any) {
    let index = await array.findIndex((value: any) => value.value == id)
    console.log('newValue------------------', index)
    // let index = newValue[0].value
    // Check if the index is valid
    if (index < 0 || index >= array.length) {
      return array; // Return the original array if the index is out of bounds
    }

    // Remove the element at the specified index
    const [element] = array.splice(index, 1);

    // Insert the element at the beginning of the array
    array.unshift(element);
    setDropDownData(array)
    // return array;
  }

  const getProductAPI = (productID: any) => {
    setisLoading(true)
    setProductImages([])
    setProductDetail([])
    getLocalStorageData('currentLangauge').then(lang => {
      var langauge: any = 1;
      if (lang) {
        if (lang == 'hi') {
          langauge = 2;
        } else {
          langauge = 1;
        }
      }
      setLocalLang(langauge);
      postAuthReq('/product/get-productDetails-new', {
        langId: langauge,
        productId: productID,
        isSearch: isSearch,
      })
        .then(data => {
          // console.log('pppppppppppppppppppppppppppppppppppppppppppppppppppp', data.data.data.productDetails)
          setProductDetail(data.data.data.productDetails);
          setDropDownData(data.data.data.productDetails.sizes)
          moveToBeginning(data.data.data.productDetails.sizes, data.data.data.productDetails.productid)
          setisLoading(false);
        })
        .catch(err => {
          console.log('detail erro', err.response.data.error_details);
        });
      getLocalStorageData('current_state').then(auth => {
        postAuthReq('/product/get-similar-products-new', {
          langId: langauge,
          productId: productID,
          stateId: auth,
        })
          .then(data => {
            setsimilarProduct(data.data.data.productDetails);
            if (data?.data?.data?.productDetails.length < 4) {
              sethideView(true);
            }
            setisLoadingSimilar(false);
          })
          .catch(err => {
            console.log(
              'detail erro similar products api',
              err.response.data.error_details,
            );
          });
      });

      postAuthReq('/product/get-productImages', { productId: productID }).then(
        data => {
          setProductImages(data.data.data.productImages);
        },
      );

      postAuthReq('/product/get-productComments', { productId: productID }).then(
        data => {
          console.log('data.data.data.productComments', data.data.data.productComments.length)
          setProductComment(data.data.data.productComments);
          if (data.data.data.productComments.length > 2) {
            setViewMoreFlagReview(1);
          }
          setViewLessReview(data.data.data.productComments.slice(0, 2));
        },
      );
      productQuestion(productID);
    });
  };

  const productQuestion = (productID: any) => {
    postAuthReq('/product/get-productQuestions', { productId: productID })
      .then(data => {
        setProductQuestions(data.data.data.productQuestions);
        if (data.data.data.productQuestions.length > 2) {
          setViewMoreFlag(1);
        }

        setViewLessQuestion(data.data.data.productQuestions.slice(0, 2));
      })
      .catch(err => {
        console.log('errr', err);
      });
  };

  const viewMore = (flag: any) => {
    if (flag == true) {
      setViewLessQuestion(productQuestions);
      setViewMoreFlag(2);
    } else {
      setViewLessQuestion(productQuestions.slice(0, 2));
      setViewMoreFlag(1);
    }
  };

  const viewMoreReviews = (flag: any) => {
    // if (flag == true) {
    //   setViewLessReview(productComment);
    //   setViewMoreFlag(2);
    // } else {
    //   setViewLessReview(productComment.slice(0, 2));
    //   setViewMoreFlag(1);
    // }

    navigation.navigate('ViewAllReviews', { product: productComment, producDetail: producDetail });
  };

  const scroll = (index: number) => {
    flatListRef.current.scrollToOffset({ offset: index * width });
    setactiveIndex(index);
  };

  const tabPressHandle = (item: string) => {
    setactivetab(item);
  };

  const ReviewContent = React.memo(() => {
    return (
      <>
        <View
          style={{ justifyContent: 'space-between', flex: 1, paddingBottom: 24, marginTop: 16, marginLeft: -8 }}>
          {viewLessReview?.map((value: any, ind: any) => (
            <View style={[styles.tabMainView, { padding: 8 }]}>
              <View>
                <Text style={FontStyle.fontHeavy18}>{value.fullname}</Text>
              </View>
              <View
                style={[
                  CommonStyle.flex_dirRow_alignCenter,
                  { paddingVertical: 6 },
                ]}>
                {/* {Array.from({ length: value.rating }, (_, index) => <View key={index}><UnFilledStar /></View>)} */}
                <RatingStar
                  totalStars={5}
                  initialRating={value.rating}
                  size={24}
                  readOnly={true}
                />
              </View>
              {value.title ? (
                <View style={{}}>
                  <Text style={FontStyle.fontRegular16}>{value.title}</Text>
                </View>
              ) : null}

              {value.comment ? (
                <View>
                  <Text
                    style={[
                      FontStyle.fontMedium16,
                      { color: 'rgba(99, 99, 99, 1)' },
                    ]}>
                    {value.comment}
                  </Text>
                </View>
              ) : null}
            </View>
          ))}

          {viewMoreFlagReview == 1 ? (
            // <View style={styles.btn}>
            //   <TextTranslation
            //     style={[FontStyle.fontMedium12, { color: ColorVariable.white }]}
            //     text={'__VIEW_MORE__'}
            //     onPress={() => viewMoreReviews(true)}
            //   />
            // </View>
            <View style={{ flexDirection: 'row', marginTop: 16, marginLeft: 16 }}>
              <View style={{ flex: 0.5 }}>
                <TextTranslation style={{ fontSize: 18, color: '#242734', lineHeight: 36, fontFamily: "Avenir Medium", fontWeight: '500', marginTop: 4, }} text={'See_all_reviews'} onPress={() => viewMoreReviews(true)}>

                </TextTranslation>
              </View>

              <View style={{ flex: 0.5, alignItems: 'flex-end', marginTop: 15 }}>

                <RightArrow width={24} height={24} onPress={() => viewMoreReviews(true)} />
              </View>

            </View>
          ) : null}
        </View>
      </>
    );
  });

  const QuestionContent = React.memo(() => {
    return (
      <>
        <View
          style={{ justifyContent: 'space-between', flex: 1, paddingBottom: 24 }}>
          {viewLessQuestion.map((question: any) => (
            <View style={{ paddingTop: 24 }}>
              <View style={{ paddingBottom: 12 }}>
                <Text style={[FontStyle.fontHeavy18, { marginBottom: 8 }]}>
                  {question.fullname}
                </Text>
                <Text style={FontStyle.fontMedium16}>{question.question}</Text>
              </View>
              <View>
                <View style={styles.quesContent}>
                  <TextTranslation
                    style={[FontStyle.fontHeavy16, { marginBottom: 8 }]}
                    text={'__FARMKART_REPLY__'}
                  />
                  <Text style={FontStyle.fontMedium16}>{question.answer}</Text>
                </View>
              </View>
            </View>
          ))}
          {viewMoreFlag == 1 ? (
            <View style={styles.btn}>
              <TextTranslation
                style={[FontStyle.fontMedium12, { color: ColorVariable.white }]}
                text={'__VIEW_MORE__'}
                onPress={() => viewMore(true)}
              />
            </View>
          ) : null}
          {viewMoreFlag == 2 ? (
            <View style={styles.btn}>
              <TextTranslation
                style={[FontStyle.fontMedium12, { color: ColorVariable.white }]}
                text={'__VIEW_LESS__'}
                onPress={() => viewMore(false)}
              />
            </View>
          ) : null}
        </View>
      </>
    );
  });

  const submitQuestion = () => {
    if (inputQuestion === '') {
      showToast('success', t('__QUESTION_PLACEHOLDER__'));
    } else {
      let body = {
        productId: id,
        question: inputQuestion,
      };
      postAuthReq('product/submit-productQuestion', body)
        .then(res => {
          console.log('submit question', res.data);

          showToast('success', res.data.data.message);
          setInputQuestion('');
          productQuestion(id);
        })
        .catch(err => {
          console.log('submit question error', err);
        });
    }
  };

  const AskContent = () => {
    return (
      <>
        <View style={[{ flex: 1, paddingVertical: 24 }]}>
          {!authToken ? (
            <View>
              <View>
                <TextTranslation
                  style={[FontStyle.fontMedium16, { textAlign: 'center' }]}
                  text={'__FARMKAER_QUESTION_MESSAGE__'}
                />
              </View>
              <View style={{ marginTop: 8 }}>
                <Button
                  title={t('__LOGIN__')}
                  bgGreen
                  fontSize={16}
                  onPress={() => navigationToAccount('Login')}
                />
              </View>
              <View style={{ marginTop: 24 }}>
                <TextTranslation
                  style={[FontStyle.fontMedium16, { textAlign: 'center' }]}
                  text={'__FARMKART_CUSTOMER__'}
                />
              </View>
              <View style={{ marginTop: 8 }}>
                <Button
                  title={t('__SIGNUP_CREATE_ACCOUNT__')}
                  bgBlack
                  fontSize={16}
                  onPress={() => navigationToAccount('SignUp')}
                />
              </View>
            </View>
          ) : (
            <View>
              <TextTranslation
                style={[FontStyle.fontMedium18, { marginBottom: 5.5 }]}
                text={'__ADD_A_QUESTION__'}
              />
              <TextInputField
                placeholder={t('__QUESTION_PLACEHOLDER__')}
                value={inputQuestion}
                onChangeText={val => setInputQuestion(val)}
              />
              <View style={{ marginTop: 20 }}>
                <Button
                  title={t('__SUBMIT__')}
                  bgGreen
                  fontSize={16}
                  onPress={submitQuestion}
                />
              </View>
            </View>
          )}
        </View>
      </>
    );
  };
  const getShortDetailProduct = async (obj: any, index: any) => {
    var val = await getLocalStorageData('currentLangauge');
    let lang = 1;
    if (val == 'hi') {
      lang = 2;
    }
    await postAuthReq(`/product/get-product-short-detail`, { productId: obj.value, langId: lang })
      .then(productData => {
        const similarProducts = similarProduct
        const element = productData.data.data.productDetails
        similarProducts[index].name = element.name
        similarProducts[index].price = element.price
        similarProducts[index].image = element.image
        similarProducts[index].productid = element.productid
        similarProducts[index].uicdiscount = element.uicdiscount
        similarProducts[index].uic_price = element.uic_price
        similarProducts[index].currentSize = { label: element.unit_type, value: element.productid }


        setsimilarProduct([...similarProducts])

        console.log('productData', similarProduct)


      })



  }

  const SimilarProducts = () => {
    return (
      <View>
        {isLoading == false ? (
          <>
            <FlatList
              data={viewLess ? similarProduct.slice(0, 4) : similarProduct}
              style={{ paddingHorizontal: 4 }}
              scrollEnabled={false}
              renderItem={({ item, index }: any) => (
                <>
                  <View style={{ paddingHorizontal: 4, paddingBottom: 8 }}>
                    <ProductCard
                      currentSize={item.currentSize}
                      items={item.sizes}
                      demoFunction={(value: any) => getShortDetailProduct(value, index)}
                      id={item.productid}
                      name={item.name}
                      price={item.price}
                      uicPrice={item.uic_price}
                      img={item.image}
                      discount={item.uicdiscount}
                      detailPage={() => {
                        getProductAPI(item.productid);
                      }}
                      addToBag={addItemToCart}
                    />
                  </View>
                </>
              )}
              horizontal={false}
              numColumns={2}
            />
            {hideView == false ? (
              <View style={{ alignItems: 'center', paddingTop: 8 }}>
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
          <View style={{ flex: 1, flexDirection: 'row' }}>
            {Array.from({ length: 4 }).map((value, index) => (
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
  console.log('==========producDetail==========', producDetail);

  const tempFunction = async (id: any) => {
    var val = await getLocalStorageData('currentLangauge');
    let lang = 1;
    if (val == 'hi') {
      lang = 2;
    }

    const stateId = await getLocalStorageData('current_state');
    await postAuthReq('/cart/get-cartdata', { langId: lang, stateId: stateId })
      .then(async (data: any) => {
        // console.log('sachin', data.data.data?.cartDetails)
        var productCart = data.data.data?.cartDetails;
        console.log(
          'producDetail==============================================================',
          id,
        );
        console.log(
          'item==============================================================',
          productCart,
        );
        var dynamic = await productCart.reduce(
          (sum: any, item: any) => sum + item.quantity,
          0,
        );
        var productCount = await productCart.filter(
          (item: any) => id == item.productid,
        );
        console.log('productCount', dynamic);
        if (productCount.length > 0) {
          setDynamicCartCount(productCount[0].quantity);
        } else {
          setDynamicCartCount(0);
        }
        setDynamicCartCountAll(dynamic);
      })
      .catch(err => {
        setDynamicCartCount(0);
        setDynamicCartCountAll(0);
        console.log('kkkkkkkkkkkkk', err);
      });
    // return value1
  };
  const removeFromCarts = (id: any) => {
    removeFromCart(id);
    tempFunction(id);
  };

  const addItemToCarts = (
    productid: any,
    name: any,
    price: any,
    uic_price: any,
    image: any,
    flag: any = '',
  ) => {
    if (flag) {
      if (localLang == 1) {
        console.log('Product added in Card Successfully');
        showToast('success', 'Product added in Cart Successfully');
      } else {
        showToast('success', 'उत्पाद कार्ट में सफलतापूर्वक जोड़ा गया');

        console.log('उत्पाद कार्ट में सफलतापूर्वक जोड़ा गया');
      }
    }
    addItemToCart(productid, name, price, uic_price, image);
    tempFunction(productid);
  };
  const scrollRef = useRef<any>();

  const onPressTouch = () => {
    scrollRef.current?.scrollTo({
      y: 0,
      animated: true,
    });
  };

  return (
    <>
      {!isLoading ? (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
          <View
            style={[
              styles.main,
              CommonStyle.flex_dirRow_alignCenter_justifySpbtw,
            ]}>
            <Pressable onPress={goBack}>
              <Image
                source={require('../../../asset/img/close.png')}
                width={17}
                height={17}
              />
            </Pressable>
            <Pressable onPress={navigateToCartScreen}>
              {dynamicCartCountAll == 0 ? null : (
                <View style={CommonStyle.badge}>
                  <Text style={[FontStyle.fontMedium16, { color: '#fff' }]}>
                    {dynamicCartCountAll}
                  </Text>
                </View>
              )}
              <ShopingBag />
            </Pressable>
          </View>
          <ScrollView ref={scrollRef}>
            <View>
              {producDetail?.uicdiscount != 0 ? (
                <View style={[CommonStyle.discountBadge, { left: 20, top: 20 }]}>
                  <Text style={[FontStyle.fontMedium12, { color: 'white' }]}>
                    -{producDetail?.uicdiscount}%
                  </Text>
                </View>
              ) : null}
              <FlatList
                ref={flatListRef}
                data={productImages}
                horizontal={true}
                scrollEnabled={false}
                pagingEnabled={true}
                showsHorizontalScrollIndicator={false}
                renderItem={item => {
                  return (
                    <>
                      <View
                        style={{
                          width: width,
                          alignItems: 'center',
                          paddingTop: 25,
                          backgroundColor: '#fff',
                        }}>
                        <FastImage
                          source={{ uri: item.item.image }}
                          style={{ width, height: 360 }}
                        />
                      </View>
                    </>
                  );
                }}
              />
              <View>
                <View style={styles.thumbnailView}>
                  <FlatList
                    data={productImages}
                    scrollEnabled={false}
                    horizontal
                    renderItem={(item: any) => {
                      return (
                        <>
                          <Pressable
                            style={[
                              styles.thumbnail,
                              {
                                borderColor:
                                  activeIndex == item.index
                                    ? 'rgba(126, 126, 126, 1)'
                                    : 'white',
                              },
                            ]}
                            onPress={() => scroll(item.index)}>
                            <FastImage
                              source={{ uri: item.item.image }}
                              style={{
                                width: 43,
                                height: activeIndex == item.index ? 41 : 43,
                                borderRadius: commanRadius.radi6,
                              }}
                            />
                          </Pressable>
                        </>
                      );
                    }}
                  />
                </View>
              </View>
            </View>
            {/* name */}
            <View>
              <Text
                style={
                  { paddingLeft: 16, paddingTop: 16, paddingRight: 16, fontWeight: '400', lineHeight: 34, fontFamily: 'Avenir', fontSize: 14 }}>
                {producDetail?.brandObj?.name}
              </Text>
            </View>

            <View>
              <Text
                style={[
                  FontStyle.fontMedium24,
                  { paddingLeft: 16, paddingRight: 16 },
                ]}>
                {producDetail.name}
              </Text>
            </View>
            {/* rating star */}
            <View
              style={[
                CommonStyle.flex_dirRow_alignCenter,
                { paddingHorizontal: 16, paddingTop: 8 },
              ]}>
              {/* {Array.from({length: 5}, (_, index) => (
              <View key={index}>
                
              </View>
            ))} */}
              <View style={{ borderRadius: 50, borderColor: 'rgba(239, 183, 56, 0.20)', borderWidth: 0.5, padding: 4, backgroundColor: 'rgba(239, 183, 56, 0.10)', flexDirection: 'row', gap: 8 }}>
                <RatingStar
                  totalStars={5}
                  initialRating={producDetail.productAvgRating}
                  size={24}
                  readOnly={true}
                />
                <Text style={{ textDecorationLine: 'underline', lineHeight: 21, fontWeight: '500', fontSize: 14 }}>{producDetail.numberOfRating}</Text><TextTranslation style={{ textDecorationLine: 'underline', lineHeight: 21, fontWeight: '500', fontSize: 14, paddingRight: 4 }} text={'__REVIEWS__'}></TextTranslation>
              </View>
            </View>
            {/* quantiy */}
            <View
              style={[CommonStyle.flex_dirRow_alignCenter, styles.quantiyView]}>
              <Pressable
                onPress={() => removeFromCarts(producDetail.productid)}>
                <Remove />
              </Pressable>
              <View style={{ paddingHorizontal: 8 }}>
                <Text style={FontStyle.fontHeavy16}>{dynamicCartCount}</Text>
              </View>
              <Pressable
                onPress={() =>
                  addItemToCarts(
                    producDetail.productid,
                    producDetail.name,
                    producDetail.price,
                    producDetail.uic_price,
                    producDetail.image,
                  )
                }>
                <Add />
              </Pressable>
              <View style={{ paddingHorizontal: 16 }}>
                <TextTranslation
                  style={FontStyle.fontHeavy14}
                  text={'__QUANTITY__'}
                />
              </View>
            </View>
            {/* price */}
            <View style={{ flexDirection: 'row', paddingLeft: 16, gap: 16 }}>
              {/* <View
                style={{
                  borderRightWidth: 1,
                  borderRightColor: '#bfbfbf',
                  paddingRight: 18.5,
                }}>
                <TextTranslation
                  style={[FontStyle.fontMedium14, { marginBottom: 6 }]}
                  text={'__PRICE__'}
                />
                <Text style={[FontStyle.fontMedium14]}>
                  Rs. {producDetail.price}
                </Text>
              </View>
              <View style={{ flex: 0.5, paddingLeft: 15.5 }}>
                <TextTranslation
                  style={[
                    FontStyle.fontBlack14,
                    { color: '#73be44', marginBottom: 6 },
                  ]}
                  text={'__UIC_PRICE__'}
                />
                <Text style={[FontStyle.fontHeavy14]}>
                  Rs. {producDetail.uic_price}
                </Text>
              </View> */}

              <View>
                <Text style={{ fontFamily: 'Avenir', fontSize: 24, fontStyle: 'normal', fontWeight: '400', lineHeight: 24, letterSpacing: 0.5, color: '#7E7E7E', textDecorationLine: 'line-through' }}>₹{producDetail.price}</Text>
              </View>
              <View>
                <Text style={{ fontFamily: 'Avenir', fontSize: 24, fontStyle: 'normal', fontWeight: '800', lineHeight: 24, letterSpacing: 0.5, color: '#242834' }}>₹{producDetail.uic_price}</Text>
              </View>
            </View>

            {/* unitDropDown */}
            <View style={styles.container}>
              {/* {renderLabel()} */}
              {/* <Dropdown
                style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                itemTextStyle={FontStyle.fontMedium16}
                placeholderStyle={[styles.placeholderStyle, FontStyle.fontMedium16]}
                selectedTextStyle={[styles.selectedTextStyle, FontStyle.fontMedium16]}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={dropDownData}
                // search
                maxHeight={300}
                labelField="label"
                valueField={{ label: producDetail.unit_type, value: producDetail.productid }}
                placeholder={!isFocus ? 'Select item' : '...'}
                // searchPlaceholder="Search..."
                value={value}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={item => {
                  getProductAPI(item.value);
                  // console.log(item)
                  setIsFocus(false);
                }}

              /> */}


<Dropdown
                style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                // itemTextStyle={FontStyle.fontMedium16}
                placeholderStyle={[styles.placeholderStyle, FontStyle.fontMedium16]}
                selectedTextStyle={[styles.selectedTextStyle, FontStyle.fontMedium16]}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={dropDownData}
                // search
                maxHeight={300}
                labelField="label"
                valueField={{ label: producDetail.unit_type, value: producDetail.productid }}
                placeholder={!isFocus ? 'Select item' : '...'}
                // searchPlaceholder="Search..."
                value={value}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={item => {
                  getProductAPI(item.value);
                  // console.log(item)
                  setIsFocus(false);
                }}

                renderItem={(item:any,index:any) => (
                  <View style={{backgroundColor:'#FFF'}}>
                    {item._index==0?
                    <View style={{flexDirection:'row',gap:8,paddingBottom:8,paddingTop:8,paddingLeft:4,borderColor:'grey',borderBottomWidth:1}}>
                    <CircleWithDotRadio />
                    <Text style={{color:'#242734',fontFamily:'Avenir Medium',fontSize:12,fontWeight:'500',lineHeight:18}}>{item.label}</Text></View>
                    :<View style={{flexDirection:'row',gap:8,paddingBottom:8,paddingTop:8,paddingLeft:4,borderColor:'grey',borderBottomWidth:1}}>
                    <CircleWithRadio />
                    <Text style={{color:'#242734',fontFamily:'Avenir Medium',fontSize:12,fontWeight:'500',lineHeight:18}}>{item.label}</Text></View>}

                    {/* <RadioGroup
                      radioButtons={dropDownData}
                      // onPress={handleRadioButtonPress}
                    /> */}
                  </View>
                )}

              />
              <Text style={[FontStyle.fontMedium16, { position: 'absolute', bottom: 8, marginLeft: 16 }]}>{translate('__SIZE__')} </Text>
            </View>
            <View style={{ marginRight: 16 }}>
              {/* crops */}
              {producDetail?.suitableCrops && producDetail?.suitableCrops.length > 0 ?
                <View style={{ flexDirection: 'row', marginTop: 32, marginLeft: 16 }}>
                  <View style={{ flex: 0.5 }}>
                    <TextTranslation style={{ fontSize: 18, color: '#242734', lineHeight: 27, fontFamily: "Avenir Medium", fontWeight: '500', marginTop: 4, flex: 0.5 }} text={'Suitable_crops'}>

                    </TextTranslation>
                  </View>

                  <View style={{ flex: 0.5, alignItems: 'flex-end', marginTop: 8 }}>
                    <Pressable onPress={() => setCropSection(!cropSection)}>
                      {cropSection == false ?
                        <Image
                          source={require('../../../asset/img/updatedImg/CheckoutDropDown.png')}
                          style={{ width: 24, height: 24 }}
                        /> : <Image
                          source={require('../../../asset/img/updatedImg/collapseDropdown.png')}
                          style={{ width: 24, height: 24 }}
                        />
                      }
                    </Pressable>
                  </View>

                </View> : null}
              {producDetail?.suitableCrops && producDetail?.suitableCrops.length > 0 ?
                <View>
                  {cropSection ?
                   <View style={{ flexDirection: 'row', alignItems: 'flex-start', }}>
                      <ScrollView horizontal={true} >
                        {producDetail?.suitableCrops?.map((value: any) => {
                          return (<View style={{ padding: 16 }}>


                            <Image
                              source={{ uri: value.cropImage }}
                              style={{ width: 40, height: 40, borderRadius: 50, borderWidth: 0.5, borderColor: '#DCE0EF' }}
                            />
                            <Text ellipsizeMode='tail' numberOfLines={2} style={{ color: '#6E6E6E', fontFamily: 'Avenir', fontSize: 12, fontStyle: 'normal', fontWeight: '400', width: 60 }}>
                              {value.name}
                            </Text>
                          </View>)
                        })}

                      </ScrollView>
                    </View> : null
                  }

                </View> : null
              }


              {/* Pests */}


              {producDetail?.targetPestsArr.length > 0 ?
                <>
                  <View style={{ flexDirection: 'row', marginTop: 16, marginLeft: 16 }}>
                    <View style={{ flex: 0.5 }}>
                      <TextTranslation style={{ fontSize: 18, color: '#242734', lineHeight: 27, fontFamily: "Avenir Medium", fontWeight: '500', marginTop: 4, flex: 0.5 }} text={'Target_pests'}>

                      </TextTranslation>
                    </View>
                    <View style={{ flex: 0.5, alignItems: 'flex-end', marginTop: 8 }}>
                      <Pressable onPress={() => setPestsSection(!pestsSection)}>
                        {pestsSection == false ?
                          <Image
                            source={require('../../../asset/img/updatedImg/CheckoutDropDown.png')}
                            style={{ width: 24, height: 24 }}
                          /> : <Image
                            source={require('../../../asset/img/updatedImg/collapseDropdown.png')}
                            style={{ width: 24, height: 24 }}
                          />
                        }
                      </Pressable>
                    </View>

                  </View>

                  <View>
                    {pestsSection ?
                      <View style={{ flexDirection: 'row', alignItems: 'flex-start', }}>
                        <ScrollView horizontal={true} >
                          {producDetail?.targetPestsArr?.map((value: any, ind: any) => {
                            return (<View style={{ padding: 16 }}>
                              <Image
                                source={{ uri: value.diseaseImage }}
                                style={{ width: 40, height: 40, borderRadius: 50 }}
                              />
                              <Text ellipsizeMode='tail' numberOfLines={2} style={{ width: 60, color: '#6E6E6E', fontFamily: 'Avenir', fontSize: 12, fontStyle: 'normal', fontWeight: '400' }}>
                                {value.diseaseName}
                              </Text>
                            </View>)
                          })}
                        </ScrollView>

                      </View> : null
                    }
                  </View>
                </> : null}


              {/* Description */}

              <View style={{ flexDirection: 'row', marginTop: 16, marginLeft: 16 }}>
                <View style={{ flex: 0.5 }}>
                  <TextTranslation style={{ fontSize: 18, color: '#242734', lineHeight: 27, fontFamily: "Avenir Medium", fontWeight: '500', marginTop: 4, flex: 0.5 }} text={'Product_description'}>

                  </TextTranslation>
                </View>
                <View style={{ flex: 0.5, alignItems: 'flex-end', marginTop: 8 }}>
                  <Pressable onPress={() => setProductDesSec(!productDesSec)}>
                    {productDesSec == false ?
                      <Image
                        source={require('../../../asset/img/updatedImg/CheckoutDropDown.png')}
                        style={{ width: 24, height: 24 }}
                      /> : <Image
                        source={require('../../../asset/img/updatedImg/collapseDropdown.png')}
                        style={{ width: 24, height: 24 }}
                      />
                    }
                  </Pressable>
                </View>

              </View>
              {productDesSec ?
                <View
                  style={{
                    paddingHorizontal: 16,
                    paddingTop: 16,
                    paddingBottom: 16,
                  }}>
                  <Text
                    style={[
                      FontStyle.fontMedium16,
                      { color: 'rgba(110, 110, 110, 1)', fontWeight: '400' },
                    ]}>
                    {producDetail.description}
                  </Text>

                  {/* Dosage */}
                  {producDetail?.dosage.length > 0 ?
                    <View style={{ flex: 1, alignSelf: 'stretch', flexDirection: 'row', marginTop: 16 }}>
                      <View style={{ flex: 1, alignSelf: 'stretch', alignItems: 'center', borderWidth: 1, borderStyle: 'solid', borderColor: '#DCE0EF', borderTopLeftRadius: 6 }}><TextTranslation style={{ fontSize: 18, color: '#242734', lineHeight: 36, fontFamily: "Avenir Medium", fontWeight: '500', padding: 10 }} text={'__CROP__'}></TextTranslation></View>
                      <View style={{ flex: 1, alignSelf: 'stretch', alignItems: 'center', borderWidth: 1, borderStyle: 'solid', borderColor: '#DCE0EF', borderTopRightRadius: 6 }} ><TextTranslation style={{ fontSize: 18, color: '#242734', lineHeight: 36, fontFamily: "Avenir Medium", fontWeight: '500', padding: 10 }} text={'Dosage'}></TextTranslation></View>
                    </View> : null}

                  {producDetail?.dosage?.map((value: any, indCorner: any) => {

                    return (<View style={[indCorner === producDetail?.dosage?.length - 1 && { borderBottomRightRadius: 6, borderBottomLeftRadius: 6 }, { flex: 1, alignSelf: 'stretch', flexDirection: 'row', borderWidth: 1, borderStyle: 'solid', borderColor: '#DCE0EF' }]}>

                      <View style={{ flex: 1, alignSelf: 'stretch', alignItems: 'center', padding: 10, borderRightWidth: 1, borderStyle: 'solid', borderColor: '#DCE0EF' }}><Text style={{ color: '#6E6E6E', textAlign: 'center', fontFamily: 'Avenir', fontSize: 16, fontWeight: '400', lineHeight: 24 }}>{value.name}</Text></View>

                      <View style={{ flex: 1, alignSelf: 'stretch', alignItems: 'center', padding: 10 }} ><Text style={{ color: '#6E6E6E', textAlign: 'center', fontFamily: 'Avenir', fontSize: 16, fontWeight: '400', lineHeight: 24 }}>{value.dose}</Text></View>
                    </View>)
                  })
                  }

                </View> : null
              }



              {producDetail?.chemicalComposition && producDetail?.chemicalComposition.length > 0 ?
                <View style={{ flexDirection: 'row', marginLeft: 16, paddingTop: 16 }}>
                  <View style={{ flex: 0.8 }}>
                    <TextTranslation style={{ fontSize: 18, color: '#242734', lineHeight: 27, fontFamily: "Avenir Medium", fontWeight: '500', marginTop: 4, flex: 0.5 }} text={'Chemical_composition'}>

                    </TextTranslation>
                  </View>
                  <View style={{ flex: 0.3, alignItems: 'flex-end', marginTop: 8 }}>
                    <Pressable onPress={() => setChemicalComp(!chemicalComp)}>
                      {chemicalComp == false ?
                        <Image
                          source={require('../../../asset/img/updatedImg/CheckoutDropDown.png')}
                          style={{ width: 24, height: 24 }}
                        /> : <Image
                          source={require('../../../asset/img/updatedImg/collapseDropdown.png')}
                          style={{ width: 24, height: 24 }}
                        />
                      }
                    </Pressable>

                  </View>


                </View> : null}

              {chemicalComp ?
                <View style={{ flex: 1, flexDirection: 'row', marginLeft: 16, marginTop: 16 }}>
                  <View style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'column', backgroundColor: '#FFF' }}>
                    <Text style={{ fontFamily: 'Avenir Medium', fontWeight: '400', lineHeight: 24, color: '#6E6E6E' }} numberOfLines={1}>
                      {producDetail.chemicalComposition[0].chemicalName}
                    </Text>
                  </View>
                  {/* <View style={{flex:0.7,paddingLeft:8,alignItems:'center',justifyContent:'center'}}> 
                <Text style={{fontWeight:'400',color:'#6E6E6E',fontFamily:'Avenir',fontSize:16,lineHeight:24}}>
                Ethion is an Acetylcholinesterase inhibitor
                </Text>
                </View> */}
                </View> : null
              }
            </View>
            {/* review */}
            {producDetail.productAvgRating ?
              <View style={{ marginLeft: 11, marginTop: 16 }}>
                <View style={[{ minHeight: 250, paddingHorizontal: 5 }]}>
                  <TextTranslation style={{ fontSize: 18, color: '#242734', lineHeight: 27, fontFamily: "Avenir Medium", fontWeight: '500', marginTop: 4, flex: 0.5 }} text={'_Customer_reviews_'}></TextTranslation>
                  <View style={{ flexDirection: 'row', gap: 8 }}>
                    <Text style={{ fontSize: 24, color: '#242734', lineHeight: 36, fontFamily: "Avenir Medium", fontWeight: '500', marginTop: 4 }}>
                      {producDetail.productAvgRating.toFixed(1)}
                    </Text>
                    <RatingStar
                      totalStars={5}
                      initialRating={producDetail.productAvgRating}
                      size={30}
                      readOnly={true}
                    />
                  </View>



                  <ReviewContent />

                </View>
                {/* <View style={{flexDirection: 'row'}}>
                  <Pressable
                    style={[
                      styles.tab,
                      {
                        borderTopLeftRadius: 5,
                        backgroundColor:
                          activetab == 'review' ? '#242734' : 'white',
                      },
                    ]}
                    onPress={() => {
                      tabPressHandle('review');
                    }}>
                    <TextTranslation
                      style={[
                        FontStyle.fontMedium16,
                        {color: activetab != 'review' ? '#242734' : 'white'},
                      ]}
                      text={'__REVIEWS__'}
                    />
                  </Pressable>
                  <Pressable
                    style={[
                      styles.tab,
                      {
                        backgroundColor:
                          activetab == 'question' ? '#242734' : 'white',
                      },
                    ]}
                    onPress={() => {
                      tabPressHandle('question');
                    }}>
                    <TextTranslation
                      style={[
                        FontStyle.fontMedium16,
                        {color: activetab != 'question' ? '#242734' : 'white'},
                      ]}
                      text={'__QUESTIONS__'}
                    />
                  </Pressable>
                  <Pressable
                    style={[
                      styles.tab,
                      {
                        borderTopRightRadius: 5,
                        backgroundColor: activetab == 'ask' ? '#242734' : 'white',
                        paddingHorizontal: 8,
                      },
                    ]}
                    onPress={() => {
                      tabPressHandle('ask');
                    }}>
                    <TextTranslation
                      style={[
                        FontStyle.fontMedium16,
                        {
                          color: activetab != 'ask' ? '#242734' : 'white',
                          textAlign: 'center',
                        },
                      ]}
                      text={'__ASK_A_QUESTION__'}
                      numberOfLines={2}
                    />
                  </Pressable>
                </View>
                <View style={[{minHeight: 250, paddingHorizontal: 16}]}>
                  {activetab == 'review' ? (
                    <ReviewContent />
                  ) : activetab == 'question' ? (
                    <QuestionContent />
                  ) : (
                    <>{AskContent()}</>
                  )}
                </View> */}
              </View> : null}


            {similarProduct.length == 0 ? null : (
              <View>
                <TextTranslation
                  style={[FontStyle.fontHeavy18, { margin: 16 }]}
                  text={'__SIMILAR_PRODUCTS__'}
                />
                <SimilarProducts />
              </View>
            )}
          </ScrollView>
          {/* <View style={CommonStyle.flex_dirRow_alignCenter}>
              <Pressable
                style={[
                  CommonStyle.alignCenter_justifyCenter,
                  {minHeight: 54, backgroundColor: '#242734', flex: 0.5},
                ]}
                onPress={() =>
                  addItemToCart(
                    producDetail.productid,
                    producDetail.name,
                    producDetail.price,
                    producDetail.uic_price,
                    producDetail.image,
                  )
                }>
                <TextTranslation
                  style={[FontStyle.fontHeavy14, {color: '#fff'}]}
                  text={'__ADD_TO_BAG__'}
                />
              </Pressable>
              <Pressable
                onPress={() =>
                  buyNow(
                    producDetail.productid,
                    producDetail.name,
                    producDetail.price,
                    producDetail.uic_price,
                    producDetail.image,
                  )
                }
                style={[
                  CommonStyle.alignCenter_justifyCenter,
                  {minHeight: 54, backgroundColor: '#73be44', flex: 0.5},
                ]}>
                <TextTranslation
                  style={[FontStyle.fontHeavy14, {color: '#fff'}]}
                  text={'__BUY_NOW__'}
                />
              </Pressable>
            </View> */}
          {buttonName == 'Call Now' ? (
            <Pressable
              onPress={onCallMobileNumber}
              style={[
                CommonStyle.alignCenter_justifyCenter,
                { minHeight: 54, backgroundColor: '#73be44', flex: 1 },
              ]}>
              <TextTranslation
                style={[FontStyle.fontHeavy14, { color: '#fff' }]}
                text={'__CALL_NOW__'}
              />
            </Pressable>
          ) : (
            <View style={CommonStyle.flex_dirRow_alignCenter}>
              <Pressable
                style={[
                  CommonStyle.alignCenter_justifyCenter,
                  { minHeight: 54, backgroundColor: '#242734', flex: 0.5 },
                ]}
                onPress={() =>
                  addItemToCarts(
                    producDetail.productid,
                    producDetail.name,
                    producDetail.price,
                    producDetail.uic_price,
                    producDetail.image,
                    true,
                  )
                }>
                <TextTranslation
                  style={[FontStyle.fontHeavy14, { color: '#fff' }]}
                  text={'__ADD_TO_BAG__'}
                />
              </Pressable>
              <Pressable
                onPress={() =>
                  buyNow(
                    producDetail.productid,
                    producDetail.name,
                    producDetail.price,
                    producDetail.uic_price,
                    producDetail.image,
                    producDetail.uicdiscount,
                  )
                }
                style={[
                  CommonStyle.alignCenter_justifyCenter,
                  { minHeight: 54, backgroundColor: '#73be44', flex: 0.5 },
                ]}>
                <TextTranslation
                  style={[FontStyle.fontHeavy14, { color: '#fff' }]}
                  text={'__BUY_NOW__'}
                />
              </Pressable>
            </View>
          )}
        </View>
      ) : (
        <View
          style={[
            CommonStyle.alignCenter_justifyCenter,
            CommonStyle.mainViewWhite,
          ]}>
          <ActivityIndicator size={'small'} color={'blue'} />
        </View>
      )}
    </>
  );
};

export default React.memo(ProductDetailRender);

const styles = StyleSheet.create({
  main: {
    backgroundColor: '#242734',
    paddingTop: 11,
    paddingBottom: 11,
    paddingLeft: 26,
    paddingRight: 18,
  },
  thumbnail: {
    borderRadius: commanRadius.radi6,
    marginRight: 8,
    borderWidth: 1,
  },
  thumbnailView: {
    backgroundColor: 'rgba(36, 39, 52, 0.2)',
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginTop: -40,
  },
  btn: {
    width: 92,
    height: 36,
    borderRadius: commanRadius.radi6,
    backgroundColor: '#242734',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
    alignSelf: 'center',
  },

  quantiyView: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(220, 224, 239, 1)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(220, 224, 239, 1)',
    paddingLeft: 16,
    marginVertical: 16,
    paddingVertical: 16,
  },
  tab: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRightWidth: 1,
    borderRightColor: '#e2e2e2',
    backgroundColor: '#ffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e2e2',
    flex: 1,
    paddingVertical: 12,
  },
  tabMainView: {
    borderWidth: 1,
    borderColor: '#e2e2e2',
    borderRadius: 5,
    marginHorizontal: 9,
    marginBottom: 8,
  },
  quesContent: {
    borderLeftColor: '#73be44',
    borderLeftWidth: 7,
    borderRadius: 5,
    paddingLeft: 8,
  },
  viewBtn: {
    backgroundColor: '#242734',
    borderRadius: 4,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginBottom: 24,
  },





  container: {
    backgroundColor: 'white',
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 16,
    paddingRight: 16,
    borderWidth: 1,
    borderColor: '#DCE0EF',
    borderRadius: 6,
    borderStyle: 'solid',
    marginTop: 20,

    // paddingHorizontal: 8,
    width: '90%',
    left: 20
  },
  dropdown: {
    // height: 50,

    borderColor: '#FFF',
    // borderWidth: 1,
    marginLeft: 42,


  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
    fontWeight: '500',
    color: '#242734'
  },
  placeholderStyle: {
    fontSize: 16,
    color: '#242734'

  },
  selectedTextStyle: {
    fontSize: 16,
    color: '#242734'

  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  radioButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dropdownList:{
    backgroundColor:"blue",
    width:10000
  }
});
