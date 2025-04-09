import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import Button from '../../../../commonResources/component/CommonButton/Button';
import {FontStyle} from '../../../../../asset/style/FontsStyle';
import {useNavigation} from '@react-navigation/native';
import {
  ColorVariable,
  commanRadius,
  CommonStyle,
} from '../../../../../asset/style/commonStyle';
import { Dropdown } from 'react-native-element-dropdown';
import TextTranslation from '../../../../commonResources/component/CommonInput/TextTranslation';
import FastImage from 'react-native-fast-image';
import {getLocalStorageData, onCallMobileNumber} from '../../../../Service/APIServices/axoisService';
import { CircleWithDotRadio, CircleWithRadio } from '../../../../../asset/img';



const {width, height} = Dimensions.get('screen');

interface dataType {
  id: number;
  items: any;
  name: string;
  price: number;
  uicPrice: number;
  img: string;
  detailPage: any;
  addToBag: any;
  buttonTittle?: any;
  discount: any;
  demoFunction:any;
  currentSize:any
}

const ProductCard = ({
  id,
  items,
  name,
  price,
  uicPrice,
  img,
  detailPage,
  addToBag,
  buttonTittle,
  discount,
  demoFunction,
  currentSize
}: dataType) => {
  const [dropDownData, setDropDownData] = useState<any>([]);
  const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);

  useEffect(()=>{
    if(items && items.length > 0){
    // setDropDownData(items)
    moveToBeginning(items,id)
    }else{
      setDropDownData([])
    }
  },[isFocus])

  async function moveToBeginning(array:any, id:any) {
    let index = await array.findIndex((value:any)=>value.value==id)
    console.log('newValue------------------',index)
    // let index = newValue[0].value
    // Check if the index is valid
    if (index < 0 || index >= array.length) {
        return array; // Return the original array if the index is out of bounds
    }

    // Remove the element at the specified index
    const [element] = array.splice(index, 1);

    // Insert the element at the beginning of the array
    array.unshift(element);
    setDropDownData(array)
    // return array;
}

  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     setDropDownData(items?.sizes) // Use functional update
  //   }, 1000);

  //   return () => clearInterval(timer); // Cleanup on unmount
  // }, []); // Run once when component mounts

  const navigation = useNavigation<any>();
  const navigateToAddToCartPopUp = async() => {
    console.log('passing value from ', id, name, price, uicPrice);

    addToBag(id, name, price, uicPrice, img,discount);
    let auth = await getLocalStorageData('auth_Token');
    if(auth){
      navigation.navigate('AddToCartPopUp', {
      item: {
        id,
        name,
        price,
        uicPrice,
        img,
        discount
      },
    });
    }
    
  };

  return (
    <Pressable
      style={{
        borderRadius: commanRadius.radi6,
        width: 0.47 * width,
        backgroundColor: 'white',
        elevation: 3,
        padding: 8,
        overflow: 'hidden',
      }}
      onPress={detailPage}>
      {discount != 0 ? (
        <View
          style={CommonStyle.discountBadge}>
          <Text style={[FontStyle.fontMedium12, {color: 'white'}]}>-{discount}%</Text>
        </View>
      ) : null}
      <View style={{alignItems: 'center'}}>
        <FastImage source={{uri: img}} style={{width: 152, height: 152}} resizeMode="contain" />
      </View>
      <View style={{width: '95%'}}>
        <Text style={[FontStyle.fontMedium14, {height: 48}]} numberOfLines={2}>
          {name}
        </Text>
      </View>
       {/* {renderLabel()} */}
       <Dropdown
          style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
          itemTextStyle={FontStyle.fontMedium16}
placeholderStyle={[styles.placeholderStyle,FontStyle.fontMedium16]}
selectedTextStyle={[styles.selectedTextStyle,FontStyle.fontMedium16]}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={dropDownData}
          // search
          maxHeight={300}
          labelField="label"
          // valueField={{ label: currentSize.unit_type, value: currentSize.productid }}
          // valueField={currentSize}
          placeholder={!isFocus ? 'Select item' : '...'}
          // searchPlaceholder="Search..."
          value={value}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            demoFunction(item)
            setIsFocus(true);
          }}
          renderItem={(item:any,index:any) => (
            <View style={{backgroundColor:'#FFF'}}>
              {item._index==0?
              <View style={{flexDirection:'row',gap:8,paddingBottom:8,paddingTop:8,paddingLeft:4,borderColor:'grey',borderBottomWidth:1}}>
              <CircleWithDotRadio />
              <Text style={{color:'#242734',fontFamily:'Avenir Medium',fontSize:12,fontWeight:'500',lineHeight:18}}>{item.label}</Text></View>
              :<View style={{flexDirection:'row',gap:8,paddingBottom:8,paddingTop:8,paddingLeft:4,borderColor:'grey',borderBottomWidth:1}}>
              <CircleWithRadio />
              <Text style={{color:'#242734',fontFamily:'Avenir Medium',fontSize:12,fontWeight:'500',lineHeight:18}}>{item.label}</Text></View>}

              {/* <RadioGroup
                radioButtons={dropDownData}
                // onPress={handleRadioButtonPress}
              /> */}
            </View>
          )}
          
        />



      <View style={{paddingTop: 12, flexDirection: 'row',gap:8,paddingBottom:4}}>
        {/* <View
          style={{borderRightWidth: 1, borderRightColor: '#bfbfbf', flex: 0.5}}>
          <Text style={[FontStyle.fontMedium14]}>Price</Text>
          <Text
            style={[
              FontStyle.fontMedium18,
              {fontSize: 14},
            ]}>{`Rs. ${price}`}</Text>
        </View>
        <View style={{flex: 0.5, paddingLeft: 15.5}}>
          <Text style={[FontStyle.fontMedium14, {color: '#73be44'}]}>
            UIC Price
          </Text>
          <Text
            style={[
              FontStyle.fontHeavy18,
              {color: '#242737', fontSize: 14},
            ]}>{`Rs. ${uicPrice}`}</Text>
        </View> */}
        <View>
        <Text style={{fontFamily:'Avenir',fontSize:16,fontStyle:'normal',fontWeight:'400',lineHeight:16,letterSpacing:0.5,color:'#7E7E7E',textDecorationLine:'line-through'}}>₹{price}</Text>
        </View>
        <View>
        <Text style={{fontFamily:'Avenir',fontSize:16,fontStyle:'normal',fontWeight:'800',lineHeight:16,letterSpacing:0.5,color:'#242834'}}>₹{uicPrice}</Text>
        </View>
      </View>
      <View style={{marginTop: 16}}>
        {/* <Button title='ADD TO BAG' bgGreen /> */}
        {buttonTittle == 'Call Now' ? (
          <Pressable style={styles.button} onPress={onCallMobileNumber}>
            <TextTranslation
              style={[FontStyle.fontHeavy12, {color: 'white'}]}
              text={'__CALL_NOW__'}
            />
          </Pressable>
        ) : (
          <Pressable style={styles.button} onPress={navigateToAddToCartPopUp}>
            <TextTranslation
              style={[FontStyle.fontHeavy12, {color: 'white'}]}
              text={'__ADD_TO_BAG__'}
            />
          </Pressable>
        )}
      </View>
    </Pressable>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#73be44',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 5,
    paddingTop: 5,
    borderRadius: 6,
    height: 34,
  },

  
  container: {
    backgroundColor: 'white',
    padding: 16,
  },
  dropdown: {
    height: 50,
    borderColor: '#DCE0EF',
    borderWidth: 1,
    borderRadius: 6,
    borderStyle:'solid',
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
    fontWeight:'500',
    color:'#242734'
  },
  placeholderStyle: {
    fontSize: 16,
    color:'#242734'

  },
  selectedTextStyle: {
    fontSize: 16,
    },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
