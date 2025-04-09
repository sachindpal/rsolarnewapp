import {View, Text, Pressable, StyleSheet, Modal} from 'react-native';
import React from 'react';
import {commanRadius, CommonStyle} from '../../../../asset/style/commonStyle';
import CustomButton from '../../../commonResources/component/CommonButton/CustomButton';
import {useTranslation} from 'react-i18next';
import {FontStyle} from '../../../../asset/style/FontsStyle';
import FastImage from 'react-native-fast-image';
import TextTranslation from '../../../commonResources/component/CommonInput/TextTranslation';
import {Add, Remove} from '../../../../asset/img';
import {useNavigation} from '@react-navigation/native';

const SuggestedProduct = (props: any) => {
  const {t: translate} = useTranslation();
  const navigation = useNavigation<any>();
  const [productQty, setproductQty] = React.useState(0);
  const navigateToCartScreen = () => {
    navigation.navigate('Cart');
  };
  const productQuntityInbag = () => {
    let qty = props.bagProduct.find((item: any) => {
      return item.id === props.item.id;
    });
    if (qty == undefined) {
      setproductQty(0);
    } else {
      setproductQty(qty.qty);
    }
  };

  const quantiyIncreseDec = () => {
    props.addToBagReccomProduct(
      props.item.id,
      props.item.name,
      props.item.price,
      props.item.uicPrice,
      props.item.img,
      props.item.discount
    );
  };

  React.useEffect(() => {
    productQuntityInbag();
  }, [props.bagProduct]);
  return (
    <Modal animationType="fade" transparent={true} visible={props.productModel}>
      <View
        style={[
          CommonStyle.mainView,
          {backgroundColor: 'rgba(0,0,0,0.3)', zIndex: 1},
        ]}>
        <Pressable
          style={{backgroundColor: 'rgba(0,0,0,0.5)', flex: 1}}
          onPress={() => props.setproductModel(false)}
        />
        <View style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
          <View style={styles.modelView}>
            <View style={[CommonStyle.flex_dirRow_alignCenter]}>
              <View
                style={[
                  styles.imgView,
                  {alignItems: 'center', justifyContent: 'center'},
                ]}>
                {props.item.discount != 0 ? (
                  <View style={CommonStyle.discountBadge}>
                    <Text style={[FontStyle.fontMedium12, {color: 'white'}]}>
                      -{props.item?.discount}%
                    </Text>
                  </View>
                ) : null}
                {/* <Image source={require("../../../asset/img/staticImg/Delegate.jpg")} style={{ width: 80, height: 80 }} /> */}
                <FastImage
                  source={{uri: props.item.img}}
                  style={{width: 80, height: 80}}
                />
              </View>
              <View style={{marginLeft: 16, flex: 1}}>
                <View style={{}}>
                  <Text style={FontStyle.fontMedium16} numberOfLines={2}>
                    {props.item.name}
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
                      style={[
                        FontStyle.fontMedium14,
                      ]}>{`Rs.${props.item.price}`}</Text>
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
                      ]}>{`Rs.${props.item.uicPrice}`}</Text>
                  </View> */}

<View>
        <Text style={{fontFamily:'Avenir',fontSize:24,fontStyle:'normal',fontWeight:'400',lineHeight:24,letterSpacing:0.5,color:'#7E7E7E',textDecorationLine:'line-through'}}>₹{props.item.price}</Text>
        </View>
        <View>
        <Text style={{fontFamily:'Avenir',fontSize:24,fontStyle:'normal',fontWeight:'800',lineHeight:24,letterSpacing:0.5,color:'#242834'}}>₹{props.item.uicPrice}</Text>
        </View>
                </View>
              </View>
            </View>
            <View
              style={[CommonStyle.flex_dirRow_alignCenter, {paddingTop: 24}]}>
              <Pressable onPress={() => props.removeFromCart(props.item.id)}>
                <Remove />
              </Pressable>
              <View style={{paddingHorizontal: 8}}>
                <Text style={FontStyle.fontHeavy16}>{productQty}</Text>
                {/* <Text style={FontStyle.fontHeavy16}>2</Text> */}
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
                  onPress={() => props.setproductModel(false)}
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
    </Modal>
  );
};

export default React.memo(SuggestedProduct);
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
