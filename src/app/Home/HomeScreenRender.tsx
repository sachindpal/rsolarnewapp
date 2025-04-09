import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  Image,
  Dimensions,
  FlatList,
  Pressable,
} from 'react-native';
import React from 'react';
import {CommonStyle, commanRadius} from '../../asset/style/commonStyle';
import {Call, CallActive, TrendingIcon} from '../../asset/img/index.ts';
import {FontStyle} from '../../asset/style/FontsStyle';
import CategoryCards from './component/CategoryCard/CategoryCards';
import Banner from './component/Banner/Banner';
import {ScrollView} from 'react-native-gesture-handler';
import BrandsCardRender from './component/BrandsCard/BrandsCardRender';
import CropCardRender from './component/CropCard/CropCardRender';
import HeaderWithSearchBar from '../commonResources/component/HeaderWithSearchBar';
import MostPurchasedPro from './component/MostPurchased/MostPurchasedPro';
import TextTranslation from '../commonResources/component/CommonInput/TextTranslation.tsx';
import MiddleBanner from './component/Banner/MiddleBanner.tsx';
import TrendingProduct from './component/Trending/TrendingProduct.tsx';
import WeatherRender from './component/Weather/WeatherRender.tsx';
import ReccommedProduct from './component/ReccommedProduct/ReccommedProduct.tsx';

const {width, height} = Dimensions.get('screen');

interface dataType {
  agriModalVisible: () => void;
  agriProductModel: boolean;
  openCallPopup: () => void;
  navigateToCartScreen: () => void;
  getItemsCount: any;
  lang: any;
  stateId: any;
  weatherInfo: any;
  isGeoPermission: any;
  token: any;
}
// console.log('token===========================================',token)
const HomeScreenRender = (props: dataType) => {
  const arr = [1];
  return (
    <>
      <StatusBar backgroundColor={'#242734'} barStyle={'light-content'} />
      <View style={[{flex: 1, backgroundColor: '#f8f8f8'}]}>
        <View style={{zIndex: 1, overflow: 'visible'}}>
          <HeaderWithSearchBar
            navigateToCartScreen={props.navigateToCartScreen}
            itemInBag={props.getItemsCount}
            lang={props.lang}
            token={props.token}
          />
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* weather */}
          <WeatherRender
            weatherInfo={props.weatherInfo}
            isGeoPermission={props.isGeoPermission}
          />
          {/* category card */}
          <View>
            <CategoryCards lang={props.lang} />
          </View>
          {/* banners */}
          <View style={{marginTop: 8}}>
            <Banner lang={props.lang} />
          </View>

          {/* trending */}
          <View style={styles.trendingBlock}>
            <View
              style={[
                CommonStyle.flex_dirRow_alignCenter,
                {marginBottom: 18, paddingLeft: 8},
              ]}>
              <TrendingIcon width={24} height={24} />
              <View style={{marginLeft: 8}}>
                <TextTranslation
                  style={FontStyle.fontHeavy18}
                  text={'__TRENDING__'}
                />
              </View>
            </View>
            <TrendingProduct lang={props.lang} stateId={props.stateId} />
          </View>
          {/* most recommed*/}
          <View style={styles.trendingBlock}>
            <ReccommedProduct
              lang={props.lang}
              stateId={props.stateId}
              token={props.token}
            />
          </View>
          {/* most purchased product */}
          <View style={{flex: 1}}>
            <MostPurchasedPro lang={props.lang} stateId={props.stateId} />
          </View>

          {/*banner  */}
          <View style={{marginTop: 24}}>
            <MiddleBanner lang={props.lang} />
          </View>
          {/* Bards shop */}
          <View>
            <BrandsCardRender lang={props.lang} />
          </View>
          {/* Shop by  Crop */}
          <View>
            <CropCardRender lang={props.lang} />
          </View>
          {/* <View style={{ paddingLeft: 6, paddingRight: 6, marginTop: 26.7, marginBottom: 16, borderRadius: 12 }}>
              <Image source={require("../../asset/img/call-us.png")} style={{ width: 0.97 * width, height: 0.23 * height, borderRadius: 12 }} />
              <View style={{ position: "absolute", top: 25, left: 24 }}>
                <TextTranslation style={FontStyle.fontHeavy15White} text={'__HAVE_QUESTIONS__'} />
                <TextTranslation style={FontStyle.fontHeavy15White} text={'__WE_ARE_HERE_TO_HELP__'} />

                <Pressable style={styles.callView} onPress={props.openCallPopup} >
                  <View style={{ marginTop: 5, marginRight: 5 }}>
                    <CallActive width={17.2} height={17.2} />
                  </View>
                  <TextTranslation style={FontStyle.fontBlack15} text={'__CALL_US__'} />
                </Pressable>

              </View> 
              </View>*/}
          {/* </>}

        /> */}

          <View
            style={[
              styles.footer,
              CommonStyle.flex_dirRow_alignCenter_justifySpbtw,
            ]}>
            <View style={{marginRight: 8}}>
              <TextTranslation
                style={[FontStyle.fontMedium14, {color: '#fff'}]}
                text={'__HAVE_QUESTIONS__'}
              />
              <TextTranslation
                style={[FontStyle.fontMedium14, {color: '#fff'}]}
                text={'__WE_ARE_HERE_TO_HELP__'}
              />
              <Pressable style={styles.callView} onPress={props.openCallPopup}>
                <View>
                  <Image
                    source={require('../../asset/img/call.png')}
                    style={{width: 20, height: 20, marginRight: 8}}
                  />
                </View>
                <TextTranslation
                  style={FontStyle.fontHeavy12}
                  text={'__CALL_US__'}
                />
              </Pressable>
            </View>
            <View style={{width: 0.31 * width}}>
              <Image
                source={require('../../asset/img/User.png')}
                style={{width: 0.31 * width, height: 0.21 * height}}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    </>
  );
};

export default React.memo(HomeScreenRender);

const styles = StyleSheet.create({
  trendingBlock: {
    marginTop: 24,
  },
  callView: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffff',
    borderRadius: 4,
    justifyContent: 'center',
    marginTop: 24,
    paddingTop: 8,
    paddingBottom: 8,
    width: 110,
  },
  footer: {
    paddingLeft: 16,
    backgroundColor: '#73BE44',
    marginBottom: 24,
    borderRadius: commanRadius.radi6,
    marginHorizontal: 8,
    marginTop: 24,
    flex: 1,
    overflow: 'hidden',
  },
});
