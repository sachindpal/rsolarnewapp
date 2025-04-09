import React, {useState, useRef, useEffect, useCallback} from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  ScrollView,
  Dimensions,
  Image,
  Pressable,
  Text,
} from 'react-native';
import {RightArrow} from '../../../../asset/img';
import {useNavigation} from '@react-navigation/native';
import {postUnAuthReq} from '../../../Service/APIServices/axoisService';
import {CommonStyle} from '../../../../asset/style/commonStyle';
import SkeletonLoader from '../../../commonResources/component/SkeletonLoader';

interface dataType {
  lang: any;
}
const width = 237;
const MiddleBanner = (props: dataType) => {
  const navigation = useNavigation<any>();

  const [banners, setbannerst] = React.useState([]);
  const [isLoading, setisLoading] = React.useState(true);
  const [contentWidths, setContentWidths] = useState(
    new Array(banners.length).fill(0),
  );

  React.useEffect(() => {
    postUnAuthReq('/home/get-advertisements', {langId: props.lang})
      .then(data => {
        // setrecomProducts(data?.data?.data?.trendingProducts)
        setbannerst(data?.data?.data?.advertisements);
        setisLoading(false);
      })
      .catch(err => {
        console.log('err', err);
      });
  }, [props.lang]);

  const flatListRef = useRef<any>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      goToNextItem();
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval);
  }, [currentIndex, contentWidths]);

  const goToNextItem = () => {
    let nextIndex = currentIndex + 1;
    if (nextIndex >= banners.length) {
      nextIndex = 0;
    }
    scrollToIndex(nextIndex);
  };

  const scrollToIndex = (index: any) => {
    const offset = contentWidths.slice(0, index).reduce((acc, w) => acc + w, 0);
    flatListRef?.current?.scrollToOffset({offset, animated: true});
    setCurrentIndex(index);
  };

  const navigatetoPopup = (item: any) => {
    navigation.navigate('MiddleBanner', item);
  };

  return (
    <>
      {!isLoading ? (
        <View>
          <FlatList
            ref={flatListRef}
            data={banners}
            renderItem={({item, index}:any) => (
              <View style={{paddingLeft: 8}} key={index}>
                <Pressable
                  onLayout={event => {
                    const {width} = event.nativeEvent.layout;
                    setContentWidths(prevWidths => {
                      const newWidths = [...prevWidths];
                      newWidths[index] = width;
                      return newWidths;
                    });
                  }}
                  onPress={() => navigatetoPopup(item)}
                  style={{
                    backgroundColor: 'white',
                    borderRadius: 6,
                    marginBottom: 16,
                    // elevation: 5,
                    alignItems: 'center',
                  }}>
                  <Image
                    source={{uri: item.image}}
                    style={{width: 210, height: 165, borderRadius: 6}}
                  />
                </Pressable>
              </View>
            )}
            horizontal
            showsHorizontalScrollIndicator={false}
            // keyExtractor={(item: any) => item.key}
            onMomentumScrollEnd={event => {
              const offset = event.nativeEvent.contentOffset.x;
              const index = contentWidths.reduce(
                (acc, w, i) => {
                  const nextOffset = acc.offset + w;
                  if (offset >= acc.offset && offset < nextOffset) {
                    acc.index = i;
                  }
                  acc.offset = nextOffset;
                  return acc;
                },
                {offset: 0, index: 0},
              ).index;
              setCurrentIndex(index);
            }}
          />
          <View style={styles.sliderContainer}>
            {banners.map((item, index) => (
              <View key={index} style={styles.sliderBtnContainer}>
                <View style={styles.sliderBtn}>
                  {currentIndex === index && (
                    <View style={styles.sliderBtnSelected} />
                  )}
                </View>
              </View>
            ))}
          </View>
        </View>
      ) : (
        <View style={[CommonStyle.flex_dirRow_alignCenter]}>
          {new Array(0, 2).map((_, index) => {
            return (
              <View key={index} style={[{margin: 4}]}>
                <SkeletonLoader
                  width={220}
                  height={160}
                  variant="box"
                  variant2="dark"
                />
              </View>
            );
          })}
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  sliderContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    // backgroundColor:'red',
  },
  sliderBtn: {
    height: 6,
    width: 6,
    borderRadius: 3,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 6,
    backgroundColor: 'grey',
  },
  sliderBtnSelected: {
    height: 6,
    width: 6,
    borderRadius: 3,
    backgroundColor: '#242734',
  },
  sliderBtnContainer: {
    flexDirection: 'row',
  },
});

export default React.memo(MiddleBanner);
