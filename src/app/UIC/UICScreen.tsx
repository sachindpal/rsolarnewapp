import {
  ActivityIndicator,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useCallback, useRef, useState} from 'react';
import {
  ColorVariable,
  CommonStyle,
  commanRadius,
} from '../../asset/style/commonStyle';
import HeaderWithSearchBar from '../commonResources/component/HeaderWithSearchBar';
import {FontStyle} from '../../asset/style/FontsStyle';
import WebView from 'react-native-webview';
import {FlatList, ScrollView} from 'react-native-gesture-handler';
import Button from '../commonResources/component/CommonButton/Button';
import TextTranslation from '../commonResources/component/CommonInput/TextTranslation';
import {useTranslation} from 'react-i18next';
import SkeletonLoader from '../commonResources/component/SkeletonLoader';
import FastImage from 'react-native-fast-image';

interface dataType {
  navigationToAddressScreen: () => void;
  bannerImage: any;
  bannerImageLoading: boolean;
}

const {width, height} = Dimensions.get('screen');



const UICScreen = (props: dataType) => {
  const {t: translate} = useTranslation();

  const [index, setIndex] = useState(0);
  const indexRef = useRef(index);
  indexRef.current = index;

  const onScroll = useCallback((event: any) => {
    const slideSize = 0.77 * width;
    const index = event.nativeEvent.contentOffset.x / slideSize;
    const roundIndex = Math.round(index);
    const distance = Math.abs(roundIndex - index);
    // Prevent one pixel triggering setIndex in the middle
    // of the transition. With this we have to scroll a bit
    // more to trigger the index change.
    const isNoMansLand = 0.4 < distance;
    if (roundIndex !== indexRef.current && !isNoMansLand) {
      setIndex(roundIndex);
    }
  }, []);
  return (
    <View style={CommonStyle.mainViewWhite}>
      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        showsVerticalScrollIndicator={false}>
        <View>
          <View style={{paddingVertical: 16, paddingHorizontal: 20}}>
            <TextTranslation
              style={FontStyle.fontHeavy18}
              text={'__UIC_CONTENTW__'}
            />
          </View>
          <View
            style={{
              height: height * 0.23,
              marginHorizontal: 8,
              borderRadius: commanRadius.radi6,
              overflow: 'hidden',
            }}>
            <WebView
              javaScriptEnabled={true}
              domStorageEnabled={true}
              scrollEnabled={false}
              // source={{
              //   uri: `${'https://www.youtube.com/embed/PD6OXLNIiNQ'}?controls=1&showinfo=0&iv_load_policy=3&modestbranding=1&playsinline=1&rel=0&disablekb=0&loop=1`,
              // }}

              source={{
                uri: `${'https://www.youtube.com/embed/DfKkmp82N1o'}?controls=1&showinfo=0&iv_load_policy=3&modestbranding=1&playsinline=1&rel=0&disablekb=0&loop=1`,
              }}
              
              style={{
                width: '100%',
                height: height * 0.23,
                borderRadius: commanRadius.radi6,
              }}
              onError={err => {
                console.log(err, 'this is errr');
              }}
            />
          </View>
          <View style={{paddingTop: 24, paddingHorizontal: 20}}>
            <TextTranslation
              style={FontStyle.fontHeavy18}
              text={'__UIC_BENEFITS__'}
            />
          </View>
          {!props.bannerImageLoading ? (
            <View style={{paddingTop: 16, paddingLeft: 8}}>
              <FlatList
                data={props.bannerImage}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item, index) => index.toString()}
                onScroll={onScroll}
                renderItem={({item, index}) => {
                  return (
                    <View style={{marginRight: 8}}>
                      <FastImage
                        source={{uri: item.images}}
                        style={{
                          width: 0.77 * width,
                          height: 0.14 * height,
                          borderRadius: 6,
                        }}
                      />
                    </View>
                  );
                }}
              />
              <View
                style={[
                  CommonStyle.flex_dirRow_alignCenter,
                  {justifyContent: 'center', marginTop: 16},
                ]}>
                {props.bannerImage?.map((item: any, el: any) => {
                  return (
                    <View
                      style={[
                        styles.dot,
                        {
                          backgroundColor:
                            el == index
                              ? ColorVariable.blueBlack
                              : 'rgba(175, 175, 175, 1)',
                        },
                      ]}
                      key={el}
                    />
                  );
                })}
              </View>
            </View>
          ) : (
            <View style={[CommonStyle.flex_dirRow_alignCenter]}>
              {new Array(0, props.bannerImage.length).map((_, index) => {
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
        </View>
        <View style={{paddingHorizontal: 24, paddingTop: 24}}>
          <Button
            title={translate('__REG_FREE__')}
            bgGreen
            fontSize={16}
            onPress={props.navigationToAddressScreen}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default React.memo(UICScreen);

const styles = StyleSheet.create({
  dot: {
    width: 6,
    height: 6,
    backgroundColor: 'pink',
    borderRadius: 3,
    marginRight: 6,
  },
});
