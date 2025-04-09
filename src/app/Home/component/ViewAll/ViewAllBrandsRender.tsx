import {Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useContext, useState} from 'react';
import {commanRadius, CommonStyle} from '../../../../asset/style/commonStyle';
import HeaderWithSearchBag from '../../../commonResources/component/Header/HeaderWithSearchBag';
import {FlatList} from 'react-native-gesture-handler';
import Cards from '../../../commonResources/component/Cards';
import {CommonContext} from '../../../commonResources/Context/CommonContext';
import {postUnAuthReq} from '../../../Service/APIServices/axoisService';
import SkeletonLoader from '../../../commonResources/component/SkeletonLoader';
import {useNavigation} from '@react-navigation/native';
import CardSkeletonLoader from '../../../commonResources/component/CardSkeletonLoader';
import TextTranslation from '../../../commonResources/component/CommonInput/TextTranslation';
import { FontStyle } from '../../../../asset/style/FontsStyle';
import { useIsFocused } from "@react-navigation/native";
import {useTranslation} from 'react-i18next';
const ViewAllBrandsRender = (props: any) => {
  const navigation = useNavigation<any>();
  const {t: translate} = useTranslation();

  const {getItemsCount} = useContext(CommonContext);
  const [brands, setBrands] = useState<any>([]);
  const [isLoading, setisLoading] = useState(true);
  const [sortedValue, setSortedValue] = useState<any>('popular');
  const [sortText, setSortText] = useState<any>('');
  
  const isFocused = useIsFocused();

  const [credential, setCredential] = useState({
    pageno: 1,
    limit: 21,
    langId: props.route.params.lang,
    sortBy: undefined,
  });
const openSortPopup = ()=>{
  console.log('sortedValuesortedValuesortedValuesortedValue',sortedValue)
  navigation.navigate('FilterForBrandPopup',{lang:props.route.params.lang,sortedValue:sortedValue});

}
  React.useEffect(() => {
    if(props.route.params?.sortValue=='popular'){
      setSortText(translate('Popular'))
    }

    if(props.route.params?.sortValue=='newest'){
      setSortText(translate('Newest'))
    }


    if(props.route.params?.sortValue=='asc'){
      setSortText(translate('Name_A_Z'))
    }

    if(props.route.params?.sortValue=='desc'){
      setSortText(translate('Name_Z_A'))
    }
    credential.sortBy = props.route.params?.sortValue
    // if(props.route.params?.sortValue==''){

    // }
    // if(isFocused){
      // console.log('sortedValuesortedValuesortedValuesortedValue',credential.sortBy)
    console.log('props.route.params?.sortValue',props.route.params?.sortValue)
    if(props.route.params?.sortValue!=undefined){
      setSortedValue(props.route.params?.sortValue)

    }
      getAllBrands();

  }, [isFocused]);

  const getPagintionData = () => {
    credential.pageno = credential.pageno + 1;
    getAllBrandsPagination();
  };
  const getAllBrands = () => {
    credential.pageno = 1;
    
    setCredential(credential);
    postUnAuthReq('/home/get-allbrands', credential)
      .then(data => {
        // console.log('data?.data?.data?.brands',data.data.data.allBrands)
        var res = data?.data?.data?.allBrands;
        // console.log('existing',brands)
          // brands.push(...res);
          setBrands(res);
        

        
        setisLoading(false);
      })
      .catch(err => {
        console.log('err', err);
      });
  };
  const getAllBrandsPagination = () => {
    
    setCredential(credential);
    postUnAuthReq('/home/get-allbrands', credential)
      .then(data => {
        // console.log('data?.data?.data?.brands',data.data.data.allBrands)
        var res = data?.data?.data?.allBrands;
        // console.log('existing',brands)
          brands.push(...res);
          setBrands(brands);
        

        
        setisLoading(false);
      })
      .catch(err => {
        console.log('err', err);
      });
  };


  return (
    <View style={CommonStyle.mainView}>
      <HeaderWithSearchBag title="__BRANDS__" itemInBag={getItemsCount} />
      <View style={{paddingHorizontal: 6.5, paddingBottom: 50, paddingTop: 24}}>
        {!isLoading ? (
          <FlatList
            scrollEnabled={true}
            data={brands}
            onEndReached={getPagintionData}
            onEndReachedThreshold={0.5}
            renderItem={({item}) => (
              <>
                <View style={{flex: 1 / 3}}>
                  <Cards
                    source={item.image}
                    productListPage={() =>
                      navigation.navigate('ProductList', {
                        heading: {brandid: item.brandid, name: item.name},
                      })
                    }
                  />
                </View>
              </>
            )}
            horizontal={false}
            numColumns={3}
            showsVerticalScrollIndicator={false}
          />
        ) : (  <View style={{alignItems: 'center'}}>
            {Array.from({length: 8}).map((_, index) => {
              return (
                <View key={index}>
                  <CardSkeletonLoader />
                </View>
              );
            })}
          </View>
        
        )}
      </View>
      <View style={styles.buttonView}>
          <Pressable
            style={styles.button}
            onPress={() => openSortPopup()}>
            
            <TextTranslation
              style={[FontStyle.fontHeavy16, {color: '#fff', marginLeft: 10,textTransform: 'uppercase'}]}
              text={`Sort_by`}
            />
            {props.route.params?.sortValue?
            <Text
              style={[FontStyle.fontHeavy16, {color: '#fff', marginLeft: 10,textTransform: 'uppercase'}]}
             
            >({sortText})</Text>:null}
          </Pressable>
        </View>
    </View>
  );
};

export default React.memo(ViewAllBrandsRender);

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#242734',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    height: 54,
    borderRadius: commanRadius.radi4,
    width: '100%',
  },
  buttonView: {
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    width: '100%',
    position: 'absolute',
    bottom: 0,

    paddingHorizontal: 24,
    paddingBottom: 24,
    paddingTop: 8,
  },
});
