import {View, Text} from 'react-native';
import React, {useContext, useState} from 'react';
import CartRender from './CartRender';
import {CommonContext} from '../../commonResources/Context/CommonContext';
import {useRoute} from '@react-navigation/native';
import RemovePopup from './component/RemovePopup';
import {isLoggedIn} from '../../Service/APIServices/axoisService';

const CartLogic = ({navigation}: any) => {
  const [visible, setvisible] = React.useState(false);
  const [isLoggedInStatus, setisLoggedInStatus] = useState(false);
  const [removeProductId, setremoveProductId] = React.useState('');
  const {
    bagProduct,
    getItemsCount,
    removeFromCart,
    addItemToCart,
    removeCompleteProuduct,
    reloadOnRemove
  } = useContext(CommonContext);

  const goBack = () => {
    navigation.goBack();
  };

  const navigateToPayment = (total:any) => {
    if (isLoggedInStatus) {
      navigation.navigate('signIn', {screen: 'Payment',params:{total:total}});
    } else {
      navigation.navigate('AuthStack', {screen: 'Login'});
    }
  };
  const navigateToHome = () => {
    navigation.navigate('BottomTabBar');
  };

  const reduceQuantity = (id: any) => {
    if (getItemsCount() === 1) {
      setvisible(true);
      setremoveProductId(id);
    } else {
      removeFromCart(id);
    }
  };

  const openClosePopup = (id?: any) => {
    setremoveProductId(id);
    setvisible(!visible);
  };

  const removeProductFromPopup = () => {
    removeCompleteProuduct(removeProductId);
    setvisible(!visible);
  };

  React.useEffect(() => {
    const checkLoginStatus = async () => {
      const isLogged: any = await isLoggedIn();
      setisLoggedInStatus(isLogged);
    };
    checkLoginStatus();
  }, [navigation]);
  return (
    <CartRender
      goBack={goBack}
      bagProduct={bagProduct}
      getItemsCount={getItemsCount}
      removeFromCart={removeFromCart}
      addItemToCart={addItemToCart}
      navigateToPayment={navigateToPayment}
      removeCompleteProuduct={removeCompleteProuduct}
      navigateToHome={navigateToHome}
      reduceQuantity={reduceQuantity}
      openClosePopup={openClosePopup}
      removeProductFromPopup={removeProductFromPopup}
      visible={visible}
      reloadOnRemove={reloadOnRemove}
    />
  );
};

export default CartLogic;
