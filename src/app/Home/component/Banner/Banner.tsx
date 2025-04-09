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
// const width = 237
const {width, height} = Dimensions.get('window');
const Banner = (props: dataType) => {
  const [banners, setBanners] = useState([]);
  const [heading, setheading] = useState('');
  const navigation = useNavigation<any>();
  const [contentWidths, setContentWidths] = useState(
    new Array(banners.length).fill(0),
  );

  const [loadingState, setloadingState] = useState(true);

  useEffect(() => {
    postUnAuthReq('/home/get-sliders', {langId: props.lang})
      .then(data => {
        setBanners(data?.data?.data?.sliders);
        setloadingState(false);
      })
      .catch(err => {
        console.log('err', err);
        setloadingState(true);
      });

  }, [props.lang]);

  const popUpOpenOnBannerclick = (
    item: string,
    brand?: any,
    slider_id?: number,
  ) => {
    console.log('pressed');
    if (item === 'popup' && slider_id === 13||slider_id ===14) {
      navigation.navigate('TopBanner', {display: 'AgriProduct'});
    } else if (item === 'call') {
      navigation.navigate('CallPopUp');
    } else if (item === 'popup' && slider_id === 19||slider_id ===20) {
      navigation.navigate('TopBanner', {display: 'UIC'});
    } else if (item === 'brand') {
      navigation.navigate('ProductList', {
        heading: brand,
      });
    }
  };

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

  // console.log("-------banners--------",banners)
  return (
    <>
      {!loadingState ? (
        <View>
          <Pressable onPress={goToNextItem} style={styles.rightArrow}>
            <RightArrow width={24} height={24} />
          </Pressable>

          <FlatList
            ref={flatListRef}
            data={banners}
            renderItem={({item, index}: any) => (
              <View key={index} style={{paddingLeft: 8, borderRadius: 6}}>
                <Pressable
                  onLayout={event => {
                    const {width} = event.nativeEvent.layout;
                    setContentWidths(prevWidths => {
                      const newWidths = [...prevWidths];
                      newWidths[index] = width;
                      return newWidths;
                    });
                  }}
                  onPress={() =>
                    popUpOpenOnBannerclick(
                      item.sliderType,
                      {
                        brandid: item.url,
                        name: item.title,
                      },
                      item.slider_id,
                    )
                  }
                  style={{
                    backgroundColor: 'white',
                    marginBottom: 16,
                    // elevation: 6,
                    borderRadius: 6,
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
                  width={0.77 * width}
                  height={0.15 * height}
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
    backgroundColor: '#AFAFAF',
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

  rightArrow: {
    elevation: 5,
    backgroundColor: 'white',
    paddingHorizontal: 4,
    paddingVertical: 12,
    justifyContent: 'center',
    borderTopLeftRadius: 6,
    borderBottomLeftRadius: 6,
    position: 'absolute',
    zIndex: 1,
    top: 70,
    right: 0,
  },
});

export default React.memo(Banner);
