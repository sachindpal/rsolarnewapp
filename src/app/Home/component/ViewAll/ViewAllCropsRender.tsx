import {StyleSheet, Text, View} from 'react-native';
import React, {useContext, useState} from 'react';
import {CommonStyle} from '../../../../asset/style/commonStyle';
import HeaderWithSearchBag from '../../../commonResources/component/Header/HeaderWithSearchBag';
import {FlatList} from 'react-native-gesture-handler';
import Cards from '../../../commonResources/component/Cards';
import {CommonContext} from '../../../commonResources/Context/CommonContext';
import {postUnAuthReq} from '../../../Service/APIServices/axoisService';
import SkeletonLoader from '../../../commonResources/component/SkeletonLoader';
import {useNavigation} from '@react-navigation/native';
import CardSkeletonLoader from '../../../commonResources/component/CardSkeletonLoader';

const ViewAllCropsRender = (props: any) => {
  const navigation = useNavigation<any>();

  const {getItemsCount} = useContext(CommonContext);
  const [brands, setBrands] = useState<any>([]);
  const [isLoading, setisLoading] = useState(true);
  const [credential, setCredential] = useState({
    pageno: 1,
    limit: 21,
    langId: props.route.params.langId,
  });

  React.useEffect(() => {
    getAllBrands();
  }, [brands]);

  const getPagintionData = () => {
    credential.pageno = credential.pageno + 1;
    getAllBrands();
  };
  const getAllBrands = () => {
    console.log('credential', credential);
    setCredential(credential);
    postUnAuthReq('/home/get-allcrops', credential)
      .then(data => {
        var res = data?.data?.data?.allCrops;

        brands.push(...res);

        setBrands(brands);
        setisLoading(false);
      })
      .catch(err => {
        console.log('err', err.response);
      });
  };
  return (
    <View style={CommonStyle.mainView}>
      <HeaderWithSearchBag title="__CROPS__" itemInBag={getItemsCount} />
      <View style={{paddingHorizontal: 6.5, paddingBottom: 65, paddingTop: 24}}>
        {!isLoading ? (
          <FlatList
            scrollEnabled={true}
            data={brands}
            onEndReached={getPagintionData}
            onEndReachedThreshold={0.5}
            renderItem={({item}: any) => (
              <>
                <View style={{flex: 1 / 3}}>
                  <Cards
                    source={item.image}
                    tittle={item.name}
                    productListPage={() =>
                      navigation.navigate('ProductList', {
                        heading: {cropid: item.cropid, name: item.name},
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
        ) : (
          <View style={{alignItems: 'center'}}>
            {Array.from({length: 8}).map((_,index) => {
              return <View key={index}><CardSkeletonLoader /></View>;
            })}
          </View>
        )}
      </View>
    </View>
  );
};

export default React.memo(ViewAllCropsRender);
