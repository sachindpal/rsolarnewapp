import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useContext} from 'react';
import {CommonStyle, commanRadius} from '../../../asset/style/commonStyle';
import {FontStyle} from '../../../asset/style/FontsStyle';
import CustomButton from '../../commonResources/component/CommonButton/CustomButton';
import {useNavigation, useRoute} from '@react-navigation/native';
import {CommonContext} from '../../commonResources/Context/CommonContext';
import {useTranslation} from 'react-i18next';
import {Add, Remove} from '../../../asset/img';
import TextTranslation from '../../commonResources/component/CommonInput/TextTranslation';

const AddCartPopUpRender = () => {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  const {t: translate} = useTranslation();

  const [productQty, setproductQty] = React.useState(0);
  const goback = () => {
    navigation.goBack();
  };

  const {addItemToCart, removeFromCart, bagProduct} = useContext(CommonContext);

  const item = route.params?.item;

  const navigateToCartScreen = () => {
    navigation.navigate('Cart');
  };

  const productQuntityInbag = () => {
    let qty = bagProduct.find((item: any) => {
      return item.id === route.params?.item.id;
    });
    if (qty == undefined) {
      setproductQty(0);
    } else {
      setproductQty(qty.qty);
    }
  };

  const quantiyIncreseDec = () => {
    addItemToCart(item.id, item.name, item.price, item.uicPrice, item.img,item.discount);
  };

  React.useEffect(() => {
    productQuntityInbag();
  }, [bagProduct]);

  return (
    <View style={[CommonStyle.mainView, {backgroundColor: 'rgba(0,0,0,0.3)'}]}>
      <Pressable
        style={{backgroundColor: 'rgba(0,0,0,0.5)', flex: 1}}
        onPress={goback}
      />
      <View style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
        <View style={styles.modelView}>
          <View style={[CommonStyle.flex_dirRow_alignCenter]}>
            <View
              style={[
                styles.imgView,
                {alignItems: 'center', justifyContent: 'center'},
              ]}>
              {item.discount != 0 ? (
                <View style={CommonStyle.discountBadge}>
                  <Text style={[FontStyle.fontMedium12, {color: 'white'}]}>
                    -{item?.discount}%
                  </Text>
                </View>
              ) : null}
              {/* <Image source={require("../../../asset/img/staticImg/Delegate.jpg")} style={{ width: 80, height: 80 }} /> */}
              <Image source={{uri: item.img}} style={{width: 80, height: 80}} />
            </View>
            <View style={{marginLeft: 16, flex: 1}}>
              <View style={{}}>
                <Text style={FontStyle.fontMedium16} numberOfLines={2}>
                  {item.name}
                </Text>
              </View>
              <View style={{flexDirection: 'row', marginTop: 16,gap:16}}>
                {/* <View
                  style={{
                    borderRightWidth: 1,
                    borderRightColor: '#bfbfbf',
                    flex: 0.5,
                  }}>
                  <Text style={[FontStyle.fontMedium14, {marginBottom: 6}]}>
                    Price
                  </Text>
                  <Text
                    style={[FontStyle.fontMedium14]}>{`Rs.${item.price}`}</Text>
                </View>
                <View style={{paddingLeft: 15, flex: 0.5}}>
                  <Text
                    style={[
                      FontStyle.fontHeavy14,
                      {color: '#73be44', marginBottom: 9},
                    ]}>
                    UIC Price
                  </Text>
                  <Text
                    style={[
                      FontStyle.fontHeavy14,
                    ]}>{`Rs.${item.uicPrice}`}</Text>
                </View> */}

<View>
        <Text style={{fontFamily:'Avenir',fontSize:24,fontStyle:'normal',fontWeight:'400',lineHeight:24,letterSpacing:0.5,color:'#7E7E7E',textDecorationLine:'line-through'}}>₹{item.price}</Text>
        </View>
        <View>
        <Text style={{fontFamily:'Avenir',fontSize:24,fontStyle:'normal',fontWeight:'800',lineHeight:24,letterSpacing:0.5,color:'#242834'}}>₹{item.uicPrice}</Text>
        </View>
              </View>
            </View>
          </View>
          <View style={[CommonStyle.flex_dirRow_alignCenter, {paddingTop: 24}]}>
            <Pressable onPress={() => removeFromCart(item.id)}>
              <Remove />
            </Pressable>
            <View style={{paddingHorizontal: 8}}>
              <Text style={FontStyle.fontHeavy16}>{productQty}</Text>
            </View>
            <Pressable onPress={quantiyIncreseDec}>
              <Add />
            </Pressable>
            <View style={{paddingHorizontal: 14}}>
              <TextTranslation
                style={FontStyle.fontHeavy14}
                text={'__QUANTITY__'}
              />
            </View>
          </View>
          <View style={[CommonStyle.flex_dirRow_alignCenter, styles.bottom]}>
            <View style={{flex: 0.5, marginRight: 5}}>
              <CustomButton
                title={translate('__CONTINUE_SHOPPING__')}
                borderBlack={true}
                fontSize={12}
                paddingVertical={16}
                paddingHorizontal={16}
                onPress={goback}
              />
            </View>
            <View style={{flex: 0.5, marginLeft: 5}}>
              <CustomButton
                title={translate('__CHECK_OUT__')}
                bgGreen
                fontSize={14}
                paddingVertical={16}
                paddingHorizontal={16}
                onPress={navigateToCartScreen}
              />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default AddCartPopUpRender;

const styles = StyleSheet.create({
  imgView: {
    borderWidth: 0.5,
    borderColor: 'rgba(220, 224, 239, 1)',
    borderRadius: commanRadius.radi6,
    overflow: 'hidden',
    width: 110,
    height: 110,
    marginBottom: 10,
    marginTop: 10,
  },
  icon: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginTop: -2,
  },
  bottom: {
    paddingTop: 24,
  },
  modelView: {
    backgroundColor: 'white',
    paddingRight: 16,
    paddingLeft: 16,
    paddingTop: 10,
    paddingBottom: 24,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
});
