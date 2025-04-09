import {
  Dimensions,
  Image,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';

import {LeftArrow, RightArrow} from '../../../../asset/img/index.ts';
import {
  getUnAuthReqest,
  requestLocationPermission,
  postUnAuthReq,
} from '../../../Service/APIServices/axoisService';
import {FlatList} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import {commanRadius} from '../../../../asset/style/commonStyle.tsx';
import {FontStyle} from '../../../../asset/style/FontsStyle.ts';
import SkeletonLoader from '../../../commonResources/component/SkeletonLoader.tsx';
import FastImage from 'react-native-fast-image';
// import ImageComponent from '../../../common-resources/ImageComponent/ImageComponent';

const {width, height} = Dimensions.get('screen');
interface dataType {
  lang: any;
}
const CategoryCards = (props: dataType) => {
  const navigation = useNavigation<any>();
  const [categories, setCategories] = useState([]);
  const [isLoading, setisLoading] = React.useState(true);

  useEffect(() => {
    postUnAuthReq('/home/get-categories', {langId: props.lang})
      .then(data => {
        console.log('data?.data?.data?.categories',data?.data?.data?.categories)
        setCategories(data?.data?.data?.categories);
        setisLoading(false);
      })
      .catch(err => {
        console.log('err', err);
      });
  }, [props.lang]);

  const navigationToProductList = (item: any) => {
    navigation.navigate('ProductList', {
      heading: item,
      buttonTittle: item.categoryid == 15 ? 'Call Now' : undefined,
    });
  };

  const [current, setcurrent] = React.useState(0);
  const flatListRef = React.useRef<any>();
  const next = () => {
    if (current < 5) {
      setcurrent(current + 1);
      flatListRef.current.scrollToIndex({index: current + 1, animated: true});
    }
  };

  const prev = () => {
    if (current > 0) {
      setcurrent(current - 1);
      flatListRef.current.scrollToIndex({index: current - 1, animated: true});
    }
  };

  const onScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const index = event.nativeEvent.contentOffset.x / 90;
      const roundIndex = Math.round(index);
      setcurrent(roundIndex);
      return roundIndex;
    },
    [],
  );

  return (
    <>
      {isLoading == false ? (
        <View style={{}}>
          <FlatList
            data={categories}
            horizontal
            contentContainerStyle={{flexGrow:1}}
            renderItem={(item: any) => (
              <>
                <Pressable
                  onPress={() =>
                    navigationToProductList({
                      categoryid: item.item.categoryid,
                      name: item.item.name,
                    })
                  }
                  style={{
                    marginRight: 4,
                    marginLeft: 4,
                    // backgroundColor: '#c9e5b5',
                    backgroundColor:'white',
                  
                    // opacity:0.6,
                    padding: 10,
                    borderRadius: commanRadius.radi6,
                    marginTop: 16,
                    marginBottom: 8,
                    elevation: 5,
                    width: 0.23 * width,
                  }}>
                  {/* <ImageComponent source={item.img} imgWidth={0.19*width} imgHeight={0.16*height} styleProvided={false}/> */}
                 <View style={{alignItems:"center"}}>
                 <FastImage
                    source={{uri: item.item.image}}
                    style={{width: 0.16 * width, height: 0.08 * height}}
                  />
                 </View>
                  {/* <ImageComponent source={item.img} style={{width:80,height:66}}/> */}
                  <View style={{paddingTop: 8,paddingLeft:3}}>
                    <Text
                      style={[FontStyle.fontMedium12,{textAlign:"center"}]}
                      numberOfLines={1}>
                      {item.item.name}
                    </Text>
                  </View>
                </Pressable>
              </>
            )}
            // keyExtractor={item => item.id}
            ref={flatListRef}
            showsHorizontalScrollIndicator={false}
            onScroll={onScroll}
            pagingEnabled
            snapToInterval={50}
            decelerationRate="fast"
          />

          {current < 3 ? (
            <Pressable style={styles.rightArrow} onPress={next}>
              <RightArrow width={24} height={24} />
            </Pressable>
          ) : null}

          {current > 0 ? (
            <Pressable style={styles.leftarrow} onPress={prev}>
              <LeftArrow width={24} height={24} />
            </Pressable>
          ) : null}
        </View>
      ) : (
        <View style={{flex: 1, flexDirection: 'row'}}>
          {new Array(0, 1, 2, 3, 4).map((value, index) => (
            <View
              style={{
                marginRight: 4,
                marginLeft: 4,
                marginTop: 16,
                marginBottom: 8,
              }}
              key={index}>
              <SkeletonLoader
                width={0.23 * width}
                height={120}
                variant="box"
                variant2="dark"
              />
            </View>
          ))}
        </View>
      )}
    </>
  );
};

export default React.memo(CategoryCards);

const styles = StyleSheet.create({
  leftarrow: {
    backgroundColor: 'white',
    paddingHorizontal: 4,
    elevation: 5,
    paddingVertical: 12,
    justifyContent: 'center',
    borderTopRightRadius: 6,
    borderBottomRightRadius: 6,
    position: 'absolute',
    top: 34,
    left: 0,
  },
  rightArrow: {
    elevation: 5,
    backgroundColor: 'white',
    paddingHorizontal: 4,
    paddingVertical: 12,
    justifyContent: 'center',
    borderTopLeftRadius: 6,
    borderBottomLeftRadius: 6,
    position: 'absolute',
    top: 35,
    right: 0,
  },
});
