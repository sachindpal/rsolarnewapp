import {
  Image,
  Linking,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { CircleWithDotRadio, CircleWithRadio, CloseBlack, DropdownUpArrow, Grass } from '../../../../asset/img';
import {
  ColorVariable,
  CommonStyle,
  commanRadius,
} from '../../../../asset/style/commonStyle';
import { FontStyle } from '../../../../asset/style/FontsStyle';
import TextTranslation from '../../../commonResources/component/CommonInput/TextTranslation';
import { ScrollView } from 'react-native-gesture-handler';
import Button from '../../../commonResources/component/CommonButton/Button';
import CustomButton from '../../../commonResources/component/CommonButton/CustomButton';
import { useTranslation } from 'react-i18next';
import FastImage from 'react-native-fast-image';
import SkeletonLoader from '../../../commonResources/component/SkeletonLoader';
import { Dropdown } from 'react-native-element-dropdown';
import { useNavigation } from '@react-navigation/native';
import SuggestedProduct from './SuggestedProduct';

interface dataType {
  modalVisible: any;
  setmodalVisible: any;
  selectedDay: any;
  addToBagReccomProduct: any;
  yellowAndRedDay: any;
  isloadingyellowAndRedDay: boolean;
  removeFromCart: any;
  bagProduct: any;
  moveToBeginning:any
}

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

const YellowDay = ({
  modalVisible,
  setmodalVisible,
  selectedDay,
  addToBagReccomProduct,
  removeFromCart,
  bagProduct,
  yellowAndRedDay,
  isloadingyellowAndRedDay,
  moveToBeginning
}: dataType) => {
  const navigation = useNavigation<any>();
  const { t: translate } = useTranslation();
  const [info, setinfo] = useState(false);
  const [useContent, setuseContent] = useState('');
  const [productInfo, setproductInfo] = useState({});
  const [productModel, setproductModel] = useState(false);
  const [dropDownData, setDropDownData] = useState<any>([]);
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  useEffect(() => {
    // if(yellowAndRedDay.)
    setDropDownData(dataDrop)

  }, [])
  const press = (index: any) => {
    if (index === useContent) {
      setuseContent('');
    } else {
      setuseContent(index);
    }
  };

  const closeModal = () => {
    setmodalVisible(!modalVisible);
  };

  const openCallPopup = () => {
    let phoneNumber = '';
    if (Platform.OS === 'android') {
      phoneNumber = `tel:${8823888238}`;
    } else {
      phoneNumber = `telprompt:${8823888238}`;
    }

    Linking.openURL(phoneNumber);
  };

  // const HowToUse = () => {
  //   console.log('=============', yellowAndRedDay?.productDetail);
  //   return yellowAndRedDay?.productDetail?.map((item: any, index: any) => {
  //     return (
  //       <View style={{ marginTop: 24 }} key={index}>
  //         <View style={CommonStyle.flex_dirRow_alignCenter}>
  //           <View style={styles.porductImg}>
  //             <FastImage
  //               source={{ uri: item.image }}
  //               style={{ width: 80, height: 80 }}
  //             />
  //           </View>
  //           <View style={{ paddingHorizontal: 20, flex: 1 }}>
  //             <View style={{ flex: 1 }}>
  //               <Text style={[FontStyle.fontMedium16]} numberOfLines={2}>
  //                 {item.name}
  //               </Text>
  //             </View>

  //             <View style={{ flexDirection: 'row', marginTop: 4, gap: 8 }}>
  //               {/* <View
  //                 style={{
  //                   borderRightWidth: 1,
  //                   borderRightColor: '#bfbfbf',
  //                   paddingRight: 20,
  //                 }}>
  //                 <Text style={[FontStyle.fontMedium14, {marginBottom: 6}]}>
  //                   Price
  //                 </Text>
  //                 <Text style={[FontStyle.fontMedium14]}>
  //                   ₹ {item.price}
  //                 </Text>
  //               </View>
  //               <View style={{paddingLeft: 20}}>
  //                 <Text
  //                   style={[
  //                     FontStyle.fontHeavy14,
  //                     {color: '#73be44', marginBottom: 6},
  //                   ]}>
  //                   UIC Price
  //                 </Text>
  //                 <Text style={[FontStyle.fontHeavy14]}>
  //                   ₹ {item.uic_price}
  //                 </Text>
  //               </View> */}

  //               <View>
  //                 <Text style={{ fontFamily: 'Avenir', fontSize: 16, fontStyle: 'normal', fontWeight: '400', lineHeight: 16, letterSpacing: 0.5, color: '#7E7E7E', textDecorationLine: 'line-through' }}>₹{item.price}</Text>
  //               </View>
  //               <View>
  //                 <Text style={{ fontFamily: 'Avenir', fontSize: 16, fontStyle: 'normal', fontWeight: '800', lineHeight: 16, letterSpacing: 0.5, color: '#242834' }}>₹{item.uic_price}</Text>
  //               </View>
  //             </View>
  //           </View>
  //         </View>
  //         {/* {renderLabel()} */}
  //         <Dropdown
  //           style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
  //           placeholderStyle={styles.placeholderStyle}
  //           selectedTextStyle={styles.selectedTextStyle}
  //           inputSearchStyle={styles.inputSearchStyle}
  //           iconStyle={styles.iconStyle}
  //           data={dropDownData}
  //           // search
  //           maxHeight={300}
  //           labelField="label"
  //           // valueField={{ label: producDetail.unit_type, value: producDetail.productid }}
  //           valueField={{ label: 'Item 1', value: '1' }}
  //           placeholder={!isFocus ? 'Select item' : '...'}
  //           // searchPlaceholder="Search..."
  //           value={value}
  //           onFocus={() => setIsFocus(true)}
  //           onBlur={() => setIsFocus(false)}
  //           onChange={item => {
  //             // getProductAPI(item.value);
  //             // console.log(item)
  //             setIsFocus(false);
  //           }}

  //         />
  //         <Pressable
  //           style={styles.btn}
  //           onPress={() =>
  //             navigateToAddToCartPopUp(
  //               item.productid,
  //               item.name,
  //               item.price,
  //               item.uic_price,
  //               item.image,
  //               item.uicdiscount,
  //             )
  //           }>
  //           <TextTranslation
  //             style={[FontStyle.fontHeavy12, { color: ColorVariable.white }]}
  //             text={'__ADD_TO_BAG__'}
  //           />
  //         </Pressable>
  //         {/* how to use */}
  //         <View style={styles.howToUseView}>
  //           <Pressable
  //             onPress={() => press(index)}
  //             style={[
  //               CommonStyle.flex_dirRow_alignCenter_justifySpbtw,
  //               styles.useView,
  //             ]}>
  //             <TextTranslation
  //               style={FontStyle.fontHeavy14}
  //               text={'__HOW_TO_USE__'}
  //             />
  //             <DropdownUpArrow width={20} height={20} />
  //           </Pressable>
  //           {useContent === index ? (
  //             <View style={CommonStyle.flex_dirRow_alignCenter}>
  //               <View style={{ alignItems: 'center', flex: 0.4 }}>
  //                 <View style={[styles.headerTable]}>
  //                   <TextTranslation
  //                     style={FontStyle.fontMedium12}
  //                     text={'__METHD__'}
  //                   />
  //                 </View>
  //                 <View style={styles.rowContent}>
  //                   <Text style={FontStyle.fontRegular12}>
  //                     {item?.howToUse?.map((item: any) => {
  //                       return item.applyingMethod;
  //                     })}
  //                   </Text>
  //                 </View>
  //               </View>
  //               <View style={{ alignItems: 'center', flex: 0.3 }}>
  //                 <View style={[styles.headerTable]}>
  //                   <TextTranslation
  //                     style={FontStyle.fontMedium12}
  //                     text={'__Dose__'}
  //                   />
  //                 </View>
  //                 <View style={styles.rowContent}>
  //                   <Text style={FontStyle.fontRegular12}>
  //                     {' '}
  //                     {item?.howToUse?.map((item: any) => {
  //                       return item.dose;
  //                     })}
  //                   </Text>
  //                 </View>
  //               </View>
  //               <View
  //                 style={{
  //                   alignItems: 'center',
  //                   flex: 0.5,
  //                   justifyContent: 'flex-start',
  //                   height: '100%',
  //                 }}>
  //                 <View style={styles.headerTable}>
  //                   <TextTranslation
  //                     style={FontStyle.fontMedium12}
  //                     text={'__TREATMENT__'}
  //                   />
  //                 </View>
  //                 <View>
  //                   <Text
  //                     style={[FontStyle.fontRegular12, { textAlign: 'center' }]}>
  //                     Early morning or evening (Clear weather)
  //                   </Text>
  //                 </View>
  //               </View>
  //             </View>
  //           ) : null}
  //         </View>
  //       </View>
  //     );
  //   });
  // };

  const navigateToAddToCartPopUp = (
    id: any,
    name: any,
    price: any,
    uicPrice: any,
    img: any,
    discount: any,
  ) => {
    setproductInfo({
      id,
      name,
      price,
      uicPrice,
      img,
      discount,
    });
    setproductModel(true);
    addToBagReccomProduct(id, name, price, uicPrice, img, discount);
  };

  const TopTable = ({ title, disc }: any) => {
    return (
      <View
        style={[
          {
            flexDirection: 'row',
            borderBottomColor: 'rgba(242, 244, 255, 1)',
            borderBottomWidth: 1,
          },
        ]}>
        <View
          style={[
            styles.textView,
            { backgroundColor: 'rgba(248, 249, 255, 1)', flex: 0.4 },
          ]}>
          <TextTranslation style={FontStyle.fontMedium14} text={title} />
        </View>
        <View style={[styles.textView, { flex: 1 }]}>
          <Text style={FontStyle.fontRegular14}>{disc}</Text>
        </View>
      </View>
    );
  };
  console.log('yellowAndRedDay', yellowAndRedDay);
  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        style={{ zIndex: 2 }}>
        <View
          style={[
            CommonStyle.sheet,
            { paddingVertical: 20, paddingHorizontal: 16 },
          ]}>
          <Pressable onPress={closeModal} style={{ paddingLeft: 4, width: 50 }}>
            <CloseBlack />
          </Pressable>

          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{ marginTop: 24 }}>
              
              <View style={CommonStyle.flex_dirRow_alignCenter}>
                <Grass />
                <Text style={[FontStyle.fontHeavy18, { marginHorizontal: 8 }]}>
                  {translate('__GROW_TIPS__')} : {selectedDay.date}-
                  {selectedDay.month + 1}-{selectedDay.year}
                </Text>
                <Pressable onPress={() => setinfo(!info)}>
                  <Image
                    source={require('../../../../asset/img/updatedImg/info.png')}
                    style={{ width: 20, height: 20 }}
                  />
                </Pressable>
              </View>
              {/* info */}
              {info === true ? (
                <View style={styles.infoView}>
                  <View style={styles.polygon}>
                    <Image
                      source={require('../../../../asset/img/updatedImg/Polygon.png')}
                      style={{ width: 11, height: 6 }}
                    />
                  </View>
                  <TextTranslation
                    style={FontStyle.fontRegular14}
                    text={'__GROW_TIP_INFO__'}
                  />
                </View>
              ) : null}
              {!isloadingyellowAndRedDay ? (
                <View>
                  {selectedDay.day === 'yellow' ? (
                    <View style={styles.content}>
                      <TopTable
                        title={'__CROP__'}
                        disc={yellowAndRedDay?.cropName}
                      />
                      <TopTable
                        title={'__CROP_STAGE__'}
                        disc={yellowAndRedDay?.stageName}
                      />
                      <TopTable
                        title={'__GROW_TIPS__'}
                        disc={yellowAndRedDay?.suggestion}
                      />
                    </View>
                  ) : (
                    <View style={styles.content}>
                      <TopTable
                        title={'__CROP__'}
                        disc={yellowAndRedDay?.cropName}
                      />
                      <TopTable
                        title={'__CROP_STAGE__'}
                        disc={yellowAndRedDay?.stageName}
                      />
                      <TopTable
                        title={'__PEST__DISEASE'}
                        disc={yellowAndRedDay?.diseasesNames?.map(
                          (items: any,ind:any) => {
                            // return item.diseaseName;
                            if(ind!=yellowAndRedDay?.diseasesNames?.length-1){
                              return `${items.diseaseName}, `;
                            }else{
                              return items.diseaseName;
                            }
                          },

                          
                        )}
                      />
                      <TopTable
                        title={'__GROW_TIPS__'}
                        disc={yellowAndRedDay?.suggestion}
                      />
                    </View>
                  )}
                  {yellowAndRedDay?.productDetail?.length !== 0 ? (
                    // <HowToUse />


                     yellowAndRedDay?.productDetail?.map((item: any, index: any) => {
                      return (
                        <View style={{ marginTop: 24 }} key={index}>
                          <View style={CommonStyle.flex_dirRow_alignCenter}>
                            <View style={styles.porductImg}>
                              <FastImage
                                source={{ uri: item.image }}
                                style={{ width: 80, height: 80 }}
                              />
                            </View>
                            <View style={{ paddingHorizontal: 20, flex: 1 }}>
                              <View style={{ flex: 1 }}>
                                <Text style={[FontStyle.fontMedium16]} numberOfLines={2}>
                                  {item.name}
                                </Text>
                              </View>
                
                              <View style={{ flexDirection: 'row', marginTop: 4, gap: 8 }}>
                                {/* <View
                                  style={{
                                    borderRightWidth: 1,
                                    borderRightColor: '#bfbfbf',
                                    paddingRight: 20,
                                  }}>
                                  <Text style={[FontStyle.fontMedium14, {marginBottom: 6}]}>
                                    Price
                                  </Text>
                                  <Text style={[FontStyle.fontMedium14]}>
                                    ₹ {item.price}
                                  </Text>
                                </View>
                                <View style={{paddingLeft: 20}}>
                                  <Text
                                    style={[
                                      FontStyle.fontHeavy14,
                                      {color: '#73be44', marginBottom: 6},
                                    ]}>
                                    UIC Price
                                  </Text>
                                  <Text style={[FontStyle.fontHeavy14]}>
                                    ₹ {item.uic_price}
                                  </Text>
                                </View> */}
                
                                <View style={{marginBottom:20}}>
                                  <Text style={{ fontFamily: 'Avenir', fontSize: 16, fontStyle: 'normal', fontWeight: '400', lineHeight: 16, letterSpacing: 0.5, color: '#7E7E7E', textDecorationLine: 'line-through' }}>₹{item.price}</Text>
                                </View>
                                <View>
                                  <Text style={{ fontFamily: 'Avenir', fontSize: 16, fontStyle: 'normal', fontWeight: '800', lineHeight: 16, letterSpacing: 0.5, color: '#242834' }}>₹{item.uic_price}</Text>
                                </View>
                              </View>
                            </View>
                          </View>
                          {/* {renderLabel()} */}
                          <Dropdown
                            style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                            itemTextStyle={FontStyle.fontMedium16}
          placeholderStyle={[styles.placeholderStyle,FontStyle.fontMedium16]}
          selectedTextStyle={[styles.selectedTextStyle,FontStyle.fontMedium16]}
                            inputSearchStyle={styles.inputSearchStyle}
                            iconStyle={styles.iconStyle}
                            data={item.sizes}
                            // search
                            maxHeight={300}
                            labelField="label"
                            // valueField={{ label: producDetail.unit_type, value: producDetail.productid }}
                            valueField={{ label: 'Item 1', value: '1' }}
                            placeholder={!isFocus ? 'Select item' : '...'}
                            // searchPlaceholder="Search..."
                            value={value}
                            onFocus={() => setIsFocus(true)}
                            onBlur={() => setIsFocus(false)}
                            onChange={value => {
                              // getProductAPI(item.value);
                              moveToBeginning(value,index)
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
                          <Pressable
                            style={styles.btn}
                            onPress={() =>
                              navigateToAddToCartPopUp(
                                item.productid,
                                item.name,
                                item.price,
                                item.uic_price,
                                item.image,
                                item.uicdiscount,
                              )
                            }>
                            <TextTranslation
                              style={[FontStyle.fontHeavy12, { color: ColorVariable.white }]}
                              text={'__ADD_TO_BAG__'}
                            />
                          </Pressable>
                          {/* how to use */}
                          <View style={styles.howToUseView}>
                            <Pressable
                              onPress={() => press(index)}
                              style={[
                                CommonStyle.flex_dirRow_alignCenter_justifySpbtw,
                                styles.useView,
                              ]}>
                              <TextTranslation
                                style={FontStyle.fontHeavy14}
                                text={'__HOW_TO_USE__'}
                              />
                              <DropdownUpArrow width={20} height={20} />
                            </Pressable>
                            {useContent === index ? (
                              <View style={CommonStyle.flex_dirRow_alignCenter}>
                                <View style={{ alignItems: 'center', flex: 0.4 }}>
                                  <View style={[styles.headerTable]}>
                                    <TextTranslation
                                      style={FontStyle.fontMedium12}
                                      text={'__METHD__'}
                                    />
                                  </View>
                                  <View style={styles.rowContent}>
                                    <Text style={FontStyle.fontRegular12}>
                                      {item?.howToUse?.map((item: any) => {
                                        return item.applyingMethod;
                                      })}
                                    </Text>
                                  </View>
                                </View>
                                <View style={{ alignItems: 'center', flex: 0.3 }}>
                                  <View style={[styles.headerTable]}>
                                    <TextTranslation
                                      style={FontStyle.fontMedium12}
                                      text={'__Dose__'}
                                    />
                                  </View>
                                  <View style={styles.rowContent}>
                                    <Text style={FontStyle.fontRegular12}>
                                      {' '}
                                      {item?.howToUse?.map((item: any) => {
                                        return item.dose;
                                      })}
                                    </Text>
                                  </View>
                                </View>
                                <View
                                  style={{
                                    alignItems: 'center',
                                    flex: 0.5,
                                    justifyContent: 'flex-start',
                                    height: '100%',
                                  }}>
                                  <View style={styles.headerTable}>
                                    <TextTranslation
                                      style={FontStyle.fontMedium12}
                                      text={'__TREATMENT__'}
                                    />
                                  </View>
                                  <View>
                                    <Text
                                      style={[FontStyle.fontRegular12, { textAlign: 'center' }]}>
                                      Early morning or evening (Clear weather)
                                    </Text>
                                  </View>
                                </View>
                              </View>
                            ) : null}
                          </View>
                        </View>
                      );
                    })


// end of how to use

                  ) : (
                    <>
                      <View
                        style={[
                          { height: 311 },
                          CommonStyle.alignCenter_justifyCenter,
                        ]}>
                        <TextTranslation
                          style={FontStyle.fontHeavy18}
                          text={'__NO_PRODUCT__'}
                        />
                        <TextTranslation
                          style={[
                            FontStyle.fontMedium14,
                            { textAlign: 'center', marginTop: 16 },
                          ]}
                          text={'__NO_PRO_DESC__'}
                        />
                        <View style={{ marginTop: 24 }}>
                          <CustomButton
                            onPress={openCallPopup}
                            title={translate('__CALL_NOW__')}
                            paddingHorizontal={16}
                            paddingVertical={10}
                            fontSize={12}
                            bgGreen
                          />
                        </View>
                      </View>
                    </>
                  )}
                </View>
              ) : (
                <View>
                  {Array.from({ length: 3 }).map((_, index) => {
                    return (
                      <View key={index} style={{ marginVertical: 16 }}>
                        <SkeletonLoader
                          width={'98%'}
                          height={150}
                          variant="box"
                          variant2="dark"
                        />
                      </View>
                    );
                  })}
                </View>
              )}
            </View>
            <View style={{ marginTop: 30 }}>
              <TextTranslation
                style={[FontStyle.fontHeavy14, { marginLeft: 16 }]}
                text={'__SAFETY_INFORMATION__'}
              />
            </View>
            <View style={{ marginLeft: 8, marginTop: 12 }}>
              <View style={{ flexDirection: 'row' }}>
                <Text style={FontStyle.fontRegular12}>{`\u2022 `}</Text>
                <TextTranslation
                  style={FontStyle.fontRegular12}
                  text={'__SAFETY_INFO_TXT_ONE__'}
                />
              </View>

              <View style={{ flexDirection: 'row', marginTop: 4 }}>
                <Text style={FontStyle.fontRegular12}>{`\u2022 `}</Text>
                <TextTranslation
                  style={FontStyle.fontRegular12}
                  text={'__SAFETY_INFO_TXT_TWO__'}
                />
              </View>
              <View
                style={{ flexDirection: 'row', marginTop: 4, marginBottom: 70 }}>
                <Text style={FontStyle.fontRegular12}>{`\u2022 `}</Text>
                <TextTranslation
                  style={FontStyle.fontRegular12}
                  text={'__SAFETY_INFO_TXT_THREE__'}
                />
              </View>
            </View>
          </ScrollView>
          <View
            style={{
              paddingHorizontal: 24,
              paddingBottom: 24,
              paddingTop: 8,
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              backgroundColor: 'rgba(255, 255, 255, 0.6)',
            }}>
            <Button
              title={translate('__CLOSE__')}
              bgBlack
              fontSize={16}
              onPress={closeModal}
            />
          </View>
        </View>
      </Modal>
      <SuggestedProduct
        item={productInfo}
        productModel={productModel}
        setproductModel={setproductModel}
        addToBagReccomProduct={addToBagReccomProduct}
        removeFromCart={removeFromCart}
        bagProduct={bagProduct}
      />
    </>
  );
};

export default React.memo(YellowDay);

const styles = StyleSheet.create({
  content: {
    borderRadius: 6,
    borderWidth: 1,
    borderColor: ColorVariable.stroke,
    marginTop: 16,
  },
  textView: {
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  porductImg: {
    borderRadius: commanRadius.radi4,
    borderWidth: 0.5,
    borderColor: ColorVariable.stroke,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  btn: {
    backgroundColor: ColorVariable.farmkartGreen,
    borderRadius: commanRadius.radi6,
    height: 34,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
  },
  useView: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#F8F9FF',
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
  },
  infoView: {
    padding: 12,
    backgroundColor: '#DCE0EF',
    borderRadius: commanRadius.radi6,
    marginTop: 6,
  },
  polygon: {
    position: 'absolute',
    top: -6,
    right: '37%',
  },
  headerTable: {
    paddingVertical: 6,
    backgroundColor: '#F8F9FF',
    width: '100%',
    alignItems: 'center',
  },
  rowContent: {
    borderBottomColor: '#F2F4FF',
    borderBottomWidth: 1,
    borderRightColor: '#F2F4FF',
    borderRightWidth: 1,
    paddingVertical: 8,
    width: '100%',
    alignItems: 'center',
  },
  howToUseView: {
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#F2F4FF',
    marginTop: 8,
  },


  container: {
    backgroundColor: 'white',
    padding: 16,
  },
  dropdown: {
    height: 50,
    borderColor: '#DCE0EF',
    borderWidth: 1,
    borderRadius: 6,
    borderStyle: 'solid',
    paddingHorizontal: 8,
    marginTop: 10
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
});
