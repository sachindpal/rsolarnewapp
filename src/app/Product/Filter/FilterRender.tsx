import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useContext, useEffect} from 'react';
import {CloseBlack, FilterButton} from '../../../asset/img';

import {useNavigation} from '@react-navigation/native';
import {CommonStyle, commanRadius} from '../../../asset/style/commonStyle';
import {FontStyle} from '../../../asset/style/FontsStyle';
import Slider from '@react-native-community/slider';
import CheckBoxButton from '../../commonResources/component/CheckBox/CheckBoxButton';
import CheckBoxButtonCategory from '../../commonResources/component/CheckBox/CheckBoxCategory';
import {ScrollView} from 'react-native-gesture-handler';
import TextTranslation from '../../commonResources/component/CommonInput/TextTranslation';
import {postUnAuthReq} from '../../Service/APIServices/axoisService';
import {CommonContext} from '../../commonResources/Context/CommonContext';

interface dataType {
  navigativeToList?: () => void;
  route: any;
}

const FilterRender = (props: dataType) => {
  const {filterContext} = useContext(CommonContext);

  // console.log("-=====filter=========",props.route.params)
  let min = props.route.params.priceRange.minPrice;
  let max = props.route.params.priceRange.maxPrice;

  const navigation = useNavigation<any>();
  const [currentValue, setcurrentValue] = React.useState<any>([min]);
  const [selectedBrand, setSelectedBrand] = React.useState<any>([]);
  const [selectedCat, setSelectedCat] = React.useState<any>([]);
  // const [selectedBrandName, setSelectedBrandName] = React.useState<any>([]);
  const [discount, setdiscount] = React.useState<boolean>(false);
  const [brandsList, setBrandsList] = React.useState<any>([]);
  const [categoryList, setcategoryList] = React.useState<any>([]);
  const [filter, setfilter] = React.useState<any>({
    brandFilter: 0,
    priceFilter: 0,
    categoryFilter: 0,
    discountFilter: 0,
  });

  useEffect(() => {
    let price =
      filterContext.currentValue != 0 ? filterContext.currentValue : min;
    let dis =
      filterContext.discount === 'N' || filterContext.discount === false
        ? false
        : true;
    setcurrentValue([price]);
    setSelectedBrand(filterContext.brandSelect);
    setSelectedCat(filterContext.categorySelect);
    setdiscount(dis);

    let countdis=dis===true?1:0
    let priceCount= price = 40  ? 1 : 0
  }, []);

  useEffect(() => {
    setfilter({
      categoryFilter: selectedCat.length,
      brandFilter: selectedBrand.length,
      priceFilter: currentValue[0]>min?1:0,
      discountFilter: discount==true?1:0,
      
    })
  }, [currentValue,selectedBrand,selectedCat,discount])
  

  console.log("======filter count===",filter)
  console.log("-=====filter== context value=======",filterContext.categorySelect.length)
  React.useEffect(() => {
    setfilter({...filter, brandFilter: selectedBrand.length});
    // console.log("========route in filter====",props.route.params.searchList.brandList)
    var passObj: any = {
      categoryId: props.route.params.categoryid,
      stateId: props.route.params.filter.stateId,
      langId: props.route.params.filter.langId,
    };
    var URL = `/product/get-brand-names`;
    if (props.route.params?.filterData.heading?.categoryid) {
      passObj.categoryId = props.route.params?.filterData.heading?.categoryid;
    }

    if (props.route.params?.filterData.heading?.brandid) {
      passObj.brandId = props.route.params?.filterData.heading?.brandid;
      URL = `/product/get-category-names`;
    }

    if (props.route.params?.filterData.heading?.search_text) {
      setBrandsList(props.route.params?.searchList?.brandList);
      setcategoryList(props.route.params?.searchList?.categoryList);
    }

    if (props.route.params?.filterData.heading?.cropid) {
      passObj.cropId = props.route.params?.filterData.heading?.cropid;
      var URL1 = `/product/get-category-names`;
      var URL2 = `/product/get-brand-names`;
      getBrandsName(URL1, passObj);
      getBrandsName(URL2, passObj);
    } else {
      if (!props.route.params?.filterData.heading?.search_text) {
        getBrandsName(URL, passObj);
      }
    }
  }, [selectedBrand]);

  const getBrandsName = (URL: any, passObj: any) => {
    postUnAuthReq(URL, passObj)
      .then(data => {
        if (props.route.params?.filterData.heading?.categoryid) {
          setBrandsList(data?.data?.data.brands);
        }
        if (props.route.params?.filterData.heading?.brandid) {
          setcategoryList(data?.data?.data.categories);
        }

        if (props.route.params?.filterData.heading?.cropid) {
          if (data?.data?.data.categories != undefined) {
            setcategoryList(data?.data?.data.categories);
          }
          if (data?.data?.data.brands != undefined) {
            setBrandsList(data?.data?.data.brands);
          }
        }
      })
      .catch(err => {
        console.log('err', err);
      });
  };

  const onSelect = (option: any) => {
    console.log('eeeeeeeeeeeeee',selectedBrand.includes(option))

    if (selectedBrand.includes(option)) {
      for (let index = 0; index < selectedBrand.length; index++) {
        const element = selectedBrand[index];
        if (element == option) {
          selectedBrand.splice(index, 1);
        }
      }

      setSelectedBrand(selectedBrand);

      // setSelectedBrand(selectedBrand.filter((item: any) => item != option));
    } else {
      selectedBrand.push(option)
      setSelectedBrand(selectedBrand);
      // setSelectedBrand([...selectedBrand, option]);
    }
    setfilter({
      categoryFilter: selectedCat.length,
      brandFilter: selectedBrand.length,
      priceFilter: currentValue[0]>min?1:0,
      discountFilter: discount==true?1:0,
      
    })
    
    console.log('fffffffffff',selectedBrand)

  };

  const onSelectCategories = async (option: any) => {
    if (selectedCat.includes(option)) {
      for (let index = 0; index < selectedCat.length; index++) {
        const element = selectedCat[index];
        if (element == option) {
          selectedCat.splice(index, 1);
        }
      }

      setSelectedCat(selectedCat);
    } else {
      selectedCat.push(option);
      setSelectedCat(selectedCat);
    }

    setfilter({...filter, categoryFilter: selectedCat.length});
    // var name = brandsList.filter((val:any)=>val.brandid==option)
    // selectedBrandName?.push(name[0].name)
    // setSelectedBrandName(selectedBrandName)
  };
  const onSelectDiscount = () => {
    setdiscount(!discount);
    if (!discount) {
      setfilter({...filter, discountFilter: 1});
    } else {
      setfilter({...filter, discountFilter: 0});
    }
  };
  const removeSelectedBrand = (option: string) => {
    var newArr = selectedBrand.filter((item: any) => item != option);
    setSelectedBrand(newArr);
  };

  const removeSelectedCat = (option: string) => {
    var newArr = selectedCat.filter((item: any) => item != option);
    setSelectedCat(newArr);
    setfilter({...filter, categoryFilter: newArr.length});
  };

  const onChangePrice = (value: number) => {
    let val = Math.floor(value);
    setcurrentValue([val]);
    // console.log('vals',val)
    if (val > min) {
      setfilter({...filter, priceFilter: 1});
    } else {
      setfilter({...filter, priceFilter: 0});
    }
  };
  // console.log("=====selectedBrand List=========",brandsList)
  const navigationToProductList = () => {
    var discountValue = 'Y';
    if (!discount) {
      discountValue = 'N';
    }
    navigation.navigate('ProductList', {
      heading: props.route.params.filterData.heading,
      selectedBrand: selectedBrand,
      maxValue: currentValue[0] == min ? undefined : currentValue[0],
      selectedCat: selectedCat,
      discount: discountValue,
      fromFilterScreen: true,
    });
  };

  const Nofliter = () => {
    navigation.navigate('ProductList', {
      heading: props.route.params.filterData.heading,
      selectedBrand: undefined,
      maxValue: undefined,
      selectedCat: undefined,
      discount: 'N',
    });
  };

  const clearFilter = () => {
    setSelectedBrand([]), setcurrentValue([]);
    setSelectedCat([]), setdiscount(false);
    setfilter({
      brandFilter: 0,
      priceFilter: 0,
      discountFilter: 0,
      categoryFilter: 0,
    });
  };

  return (
    <View style={{flex: 1}}>
      <ScrollView style={[CommonStyle.sheet, CommonStyle.mainPadding]}>
        <View
          style={[
            CommonStyle.flex_dirRow_alignCenter_justifySpbtw,
            styles.arrow,
          ]}>
          <Pressable onPress={Nofliter}>
            <CloseBlack />
          </Pressable>
          <View style={{flex: 1, alignItems: 'center'}}>
            <TextTranslation
              style={FontStyle.fontHeavy18}
              text={'__FILTER_BY__'}
            />
          </View>
          <TextTranslation
            style={[FontStyle.fontMedium14, {textDecorationLine: 'underline'}]}
            text={'__CLEAR_ALL__'}
            onPress={clearFilter}
          />
        </View>
        <View style={[styles.contentView]}>
          <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
            {selectedBrand?.length == 0 && selectedCat?.length == 0 ? (
              <>
                <Text style={FontStyle.fontMedium16}>0 </Text>
                <TextTranslation
                  style={FontStyle.fontMedium16}
                  text={'__ADDED_FILTER__'}
                />
              </>
            ) : (
              <>
                {categoryList
                  .filter((item: any) => selectedCat.includes(item.categoryid))
                  ?.map((item: any, index: any) => {
                    return (
                      <View
                        style={[
                          CommonStyle.flex_dirRow_alignCenter,
                          {
                            paddingLeft: 8,
                            height: 32,
                            backgroundColor: '#e3e3e3',
                            marginRight: 5,
                            marginBottom: 5,
                            borderRadius: 6,
                          },
                        ]}
                        key={index}>
                        <Text style={[FontStyle.fontMedium16]}>
                          {item.name.length < 6
                            ? `${item.name}`
                            : `${item.name.substring(0, 6)}...`}
                        </Text>
                        <Pressable
                          style={styles.close}
                          onPress={() => removeSelectedCat(item.categoryid)}>
                          <Image
                            source={require('../../../asset/img/close.png')}
                            style={{width: 16, height: 16}}
                          />
                        </Pressable>
                      </View>
                    );
                  })}
                {brandsList
                  .filter((item: any) => selectedBrand.includes(item.brandid))
                  ?.map((item: any, index: any) => {
                    return (
                      <View
                        style={[
                          CommonStyle.flex_dirRow_alignCenter,
                          {
                            paddingLeft: 8,
                            height: 32,
                            backgroundColor: '#e3e3e3',
                            marginRight: 5,
                            marginBottom: 5,
                            borderRadius: 6,
                          },
                        ]}
                        key={index}>
                        <Text style={[FontStyle.fontMedium16]}>
                          {item.name.length < 6
                            ? `${item.name}`
                            : `${item.name.substring(0, 6)}...`}
                        </Text>
                        <Pressable
                          style={styles.close}
                          onPress={() => removeSelectedBrand(item.brandid)}>
                          <Image
                            source={require('../../../asset/img/close.png')}
                            style={{width: 16, height: 16}}
                          />
                        </Pressable>
                      </View>
                    );
                  })}
              </>
            )}
          </View>
        </View>
        <View style={styles.contentView}>
          <TextTranslation style={FontStyle.fontMedium16} text={'__PRICE__'} />
          <View>
            <Text
              style={[
                FontStyle.fontHeavy16,
                {
                  position: 'absolute',
                  top: 0.5,
                  minWidth: 30,
                  left: `${((currentValue[0] - min) / (max - min)) * 90}%`,
                },
              ]}>{`₹ ${currentValue}`}</Text>
          </View>
          <View style={{marginTop: 24, marginBottom: 8}}>
            <Slider
              style={{width: '100%', height: 10}}
              minimumValue={min}
              maximumValue={max}
              minimumTrackTintColor="#242734"
              maximumTrackTintColor="#bdbdbd"
              onValueChange={value => onChangePrice(value)}
              thumbTintColor={currentValue[0] == min ? 'gray' : '#242734'}
              value={currentValue[0]}
            />
          </View>
          <View style={CommonStyle.flex_dirRow_alignCenter_justifySpbtw}>
            <Text style={styles.fontRange}>₹ {min}</Text>
            <Text style={styles.fontRange}>₹ {max}</Text>
          </View>
        </View>
        <View style={[styles.contentView]}>
          <TextTranslation
            style={[FontStyle.fontMedium18]}
            text={'__CATEGORY__'}
          />
          {/* <Pressable style={styles.buttonContainer} onPress={onSelectDiscount}>
                        <View
                            style={styles.circle}
                        >
                            {discount && (
                                <Image source={require("../../../asset/img/checkboxIcon.png")} width={16} height={16} />
                            )}
                        </View>
                        <View style={styles.text}>
                            <TextTranslation style={[FontStyle.fontMedium17]} text={"Category"} />
                            
                        </View>
                    </Pressable> */}
          <CheckBoxButtonCategory
            options={categoryList}
            selectedOption={selectedCat}
            onSelectCategories={onSelectCategories}
          />
        </View>
        <View style={styles.contentView}>
          <TextTranslation
            style={[FontStyle.fontMedium16]}
            text={'__BRANDS__'}
          />
          <View>
            <CheckBoxButton
              options={brandsList}
              selectedOption={selectedBrand}
              onSelect={onSelect}
            />
          </View>
        </View>
        <View style={[styles.contentView]}>
          <Pressable style={styles.buttonContainer} onPress={onSelectDiscount}>
            <View style={styles.circle}>
              {discount && (
                <Image
                  source={require('../../../asset/img/checkboxIcon.png')}
                  width={16}
                  height={16}
                />
              )}
            </View>
            <View style={styles.text}>
              <TextTranslation
                style={[FontStyle.fontMedium17]}
                text={'__DISCOUNT__'}
              />
            </View>
          </Pressable>
        </View>
        <View style={{height: 50}} />
      </ScrollView>
      {selectedBrand.length == 0 &&
      selectedCat.length == 0 &&
      filter.priceFilter ==  0 &&
      filter.discountFilter == 0 ? (
        <View style={styles.buttonView}>
          <Pressable style={[styles.button]} onPress={Nofliter}>
            <FilterButton />
            <TextTranslation
              style={[FontStyle.fontHeavy16, {color: '#fff', marginLeft: 9.6}]}
              text={'__APPLY_FILTER__'}
            />
          </Pressable>
        </View>
      ) : (
        <View style={styles.buttonView}>
          <Pressable
            style={styles.button}
            onPress={() => navigationToProductList()}>
            <FilterButton />
            <Text
              style={[FontStyle.fontHeavy16, {color: '#fff', marginLeft: 9.6}]}>
              {' '}
              (
              {`${
                selectedBrand.length +
                selectedCat.length +
                filter.priceFilter +
                filter.discountFilter
              }`}
              ) APPLY FILTER
            </Text>
          </Pressable>
        </View>
      )}
    </View>
  );
};

export default React.memo(FilterRender);

const styles = StyleSheet.create({
  arrow: {
    padding: 20,
  },

  contentView: {
    padding: 16,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: 'rgba(220, 224, 239, 1)',
    marginHorizontal: 8,
    marginBottom: 8,
  },
  fontRange: {
    fontFamily: 'Avenir Medium',
    fontSize: 16,
    fontWeight: '500',
    color: '#242734',
  },
  close: {
    backgroundColor: 'black',
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 4,
    borderRadius: 4,
    marginLeft: 8,
  },
  buttonContainer: {
    flexDirection: 'row',

    alignItems: 'center',
    marginTop: 16,
  },

  circle: {
    height: 16,
    width: 16,
    borderWidth: 1,
    borderColor: '#787878',
    alignItems: 'center',
    justifyContent: 'center',
  },

  text: {
    paddingLeft: 8,
  },
  button: {
    backgroundColor: '#242734',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingVertical: 16,
    borderRadius: commanRadius.radi4,
    width: '80%',
    marginVertical: 4,
  },
  buttonView: {
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    width: '100%',
    position: 'absolute',
    bottom: 0,
  },
});
