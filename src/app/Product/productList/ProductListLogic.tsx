import {View, Text} from 'react-native';
import React, { useContext } from 'react';
import ProductListRender from './ProductListRender';
import {CommonContext} from '../../commonResources/Context/CommonContext';
import { useIsFocused } from '@react-navigation/native';

const ProductListLogic = ({route, navigation}: any) => {
  const isFocused=useIsFocused()
  const {setfilterValue} = useContext(CommonContext);
  const navigativeToFiter = (values: any, filter: any,productList:any) => {
    navigation.navigate('Filter', {
      filterData: route.params,
      priceRange: values,
      filter: filter,
      searchList:productList
    });
  };
  // console.log('hgfd', route.params);
  const navigativeToDetailPage = (id: any,buttonName:any) => {
    navigation.navigate('ProductDetail', {id: id,buttonName:buttonName});
  };
  const {addItemToCart} = React.useContext(CommonContext);

  return (
    <ProductListRender
      route={route}
      navigativeToFiter={navigativeToFiter}
      navigativeToDetailPage={navigativeToDetailPage}
      addItemToCart={addItemToCart}
      navigation={navigation}
      setfilterValue={setfilterValue}
    />

  );
};

export default ProductListLogic;
