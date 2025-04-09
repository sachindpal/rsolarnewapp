import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import {CommonStyle} from '../../../../asset/style/commonStyle';
import {FontStyle} from '../../../../asset/style/FontsStyle';
import ImageComponent from '../../../commonResources/ImageComponent/ImageComponent';
import TextTranslation from '../../../commonResources/component/CommonInput/TextTranslation';
import {FlatList} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import {Verified} from '../../../../asset/img';
import {postUnAuthReq} from '../../../Service/APIServices/axoisService';
import SkeletonLoader from '../../../commonResources/component/SkeletonLoader';

interface dataType {
  lang: any;
  stateId: any;
}
const {width, height} = Dimensions.get('screen');

const MostPurchasedPro = (props: dataType) => {
  const navigation = useNavigation<any>();

  const [mostPurchsedProducts, setmostPurchsedProducts] = React.useState([]);
  const [isLoading, setisLoading] = React.useState(true);

  React.useEffect(() => {
    postUnAuthReq('/home/get-mostpurchased-products', {
      langId: props.lang,
      stateId: props.stateId,
    })
      .then(data => {
        // setrecomProducts(data?.data?.data?.trendingProducts)
        setmostPurchsedProducts(data?.data?.data?.mostPurchsedProducts);
        setisLoading(false);
      })
      .catch(err => {
        console.log('err', err);
      });
  }, [props.lang]);

  const navigativeToDetailPage = (productid: any) => {
    navigation.navigate('ProductDetail', {id: productid});
  };
  return (
    <View style={{flex:1,}}>
      {isLoading == false ? (
        <View style={{paddingTop: 24, paddingLeft: 8, flexGrow: 1}}>
          <View style={[CommonStyle.flex_dirRow_alignCenter]}>
            <Verified />
            <View style={{marginLeft: 8}}>
              <TextTranslation
                style={FontStyle.fontHeavy18}
                text={'__MOST_FREQUENTLY_PURCHASED__'}
              />
            </View>
          </View>
          <View
            style={{
              marginTop: 16, 
              
            }}>
            <FlatList
              data={mostPurchsedProducts}
              scrollEnabled={false}
              contentContainerStyle={{flexGrow: 1,flex:1,paddingRight:8}}
              renderItem={(item: any) => (
                <>
                  <Pressable
                    style={[styles.cardView, {alignItems: 'center'}]}
                    onPress={() => navigativeToDetailPage(item.item.productid)}>
                    <Image
                      source={{uri: item.item.image}}
                      style={{width: 0.17 * width, height: 0.08 * height}}
                    />
                    <View style={{paddingTop: 8}}>
                      <Text
                        style={[FontStyle.fontMedium12, {textAlign: 'center',}]}
                        numberOfLines={2}>
                        {item.item.name}
                      </Text>
                    </View>
                  </Pressable>
                </>
              )}
              numColumns={4}
            />
          </View>
        </View>
      ) : (
        <View style={{flex: 1, flexDirection: 'row'}}>
          {new Array(0, 1, 2, 3, 4).map((value, index) => (
            <View
              key={index}
              style={{
                marginRight: 4,
                marginLeft: 4,
                marginTop: 16,
                marginBottom: 8,
              }}>
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
    </View>
  );
};

{
  /* <View style={{flex:1,flexDirection:'row'}}>{new Array(0,1,2,3,4).map((value,index)=>(<View style={{ marginRight: 4,marginLeft:4,marginTop: 16,  marginBottom: 8,}}><SkeletonLoader key={index} width={0.23 * width} height={120} variant="box" variant2='dark'/></View> */
}
export default React.memo(MostPurchasedPro);

const styles = StyleSheet.create({
  cardView: {
    backgroundColor: 'white',
    elevation: 5,
    borderRadius: 4,
    marginBottom: 12,
    marginHorizontal: 4,
    padding: 8,   
    width:"23%"
  },
});
