import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {memo} from 'react';
import {FontStyle} from '../../../asset/style/FontsStyle';
import FastImage from 'react-native-fast-image';

const {width, height} = Dimensions.get('screen');

interface dataType {
  source: any;
  tittle?: string;
  productListPage?: any;
}

const Cards = ({source, tittle, productListPage}: dataType) => {
  return (
    <Pressable style={[styles.main,]} onPress={productListPage}>
      <View
        style={{
          backgroundColor: 'white',
          borderRadius: 6,
          elevation: 5,
          alignItems:"center",
          padding:4
        }}>
        <FastImage
          source={{uri: source}}
          style={{width: 100, height: 100}}
          resizeMode="contain"
        />
      </View>
      {tittle ? (
        <View style={{marginTop: 8, alignItems: 'center'}}>
          <Text style={FontStyle.fontMedium14}>{tittle}</Text>
        </View>
      ) : null}
    </Pressable>
  );
};

export default memo(Cards);

const styles = StyleSheet.create({
  main: {
    marginRight: 4,
    marginBottom: 8,
    marginLeft: 4,
  },
});
