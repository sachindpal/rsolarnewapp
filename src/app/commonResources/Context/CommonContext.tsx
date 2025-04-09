import React, {createContext, FC, ReactNode, useState} from 'react';
import {
  getLocalStorageData,
  postAuthReq,
  removeItemLocalStorage,
  setLocalStorage,
} from '../../Service/APIServices/axoisService';
import { useNavigation } from '@react-navigation/native';

// Initiate context

const CommonContext = createContext<any>({});

const CommonProvider: FC<{children: ReactNode}> = ({children}) => {
  const [bagProduct, setbagProduct] = useState<any>([]);
  const [stateID, setstateID] = React.useState<any>('-1');
  const [filterContext, setfilterContext] = useState({
    currentValue:0,
    discount:false,
    brandSelect:[],
    categorySelect:[]
  })
  const [reloadOnRemove, setReloadOnRemove] = React.useState<any>(1);
  const navigation = useNavigation<any>()

  //   for welcome modal
  const [isWelcomeModalVisible, setIsWelcomeModalVisible] = useState(false);
  const hideWelcomeModal = () => {
    setIsWelcomeModalVisible(!isWelcomeModalVisible);
  };

  const navigationToAccount = () => {
    return navigation.navigate("AuthStack", { screen: "Login"})
}

 async function addItemToCart(
    id: number,
    name: string,
    price: number,
    uicPrice: number,
    img: any,
    uicdiscount:any,
    flag=""
  ) {
    let auth = await getLocalStorageData('auth_Token');
    if(!auth){
      
      navigation.navigate("AuthStack", { screen: "Login"})

    }else{
    let select = {
      id,
      name,
      totalPrice: price,
      uicPrice,
      img,
      uicdiscount
    };
    console.log('iddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd',id)

    setbagProduct((prevItems: any) => {
      const item = prevItems.find((item: any) => item.id == id);
      if (!item) {
        return [
          ...prevItems,
          {
            id,
            qty: 1,
            select,
            totalPrice: select.totalPrice,
          },
        ];
      } else {
        return prevItems.map((item: any) => {
          if (item.id == id) {
            if(flag==""){
              item.qty++;

            }else{
            item.qty;
            }
            item.totalPrice += select.totalPrice;
          }
          return item;
        });
      }
    });
    if(flag==""){
      cartUpdateInDb(id,2)

    }
  }
  }
  const removeCompleteProuduct = async (id: number) => {
    
    cartUpdateInDb(id,0)

    if (bagProduct.length > 0) {
      setLocalStorage(
        'bagProduct',
        JSON.stringify(
          bagProduct.filter((cartItem: any) => cartItem.id !== id),
        ),
      );
    } else {
      removeItemLocalStorage('bagProduct');
    }
    setReloadOnRemove(reloadOnRemove+1)

    var tempBag: any = await getLocalStorageData('bagProduct');
    if (tempBag) {
      console.log('tempBagtempBagtempBagtempBag', tempBag);

      setbagProduct(JSON.parse(tempBag));
    } else {
      setbagProduct([]);
    }
  };

  const removeFromCart = (id: number) => {

    const isItemInCart = bagProduct.find((cartItem: any) => cartItem.id === id);
    cartUpdateInDb(id,1)
    if (isItemInCart?.qty === 1) {
      setbagProduct(bagProduct.filter((cartItem: any) => cartItem.id !== id)); // if the quantity of the item is 1, remove the item from the cart
    } else {
      setbagProduct(
        bagProduct.map((cartItem: any) =>
          cartItem.id === id
            ? {...cartItem, qty: cartItem.qty - 1} // if the quantity of the item is greater than 1, decrease the quantity of the item
            : cartItem,
        ),
      );
    }
    console.log('bagProduct', bagProduct);
    if (bagProduct.length > 0) {
      setLocalStorage('bagProduct', JSON.stringify(bagProduct));
    } else {
      removeItemLocalStorage('bagProduct');
    }
  };
  function getItemsCount() {
    return bagProduct.reduce((sum: any, item: any) => sum + item.quantity, 0);
  }
  // function getItemsCount() {
  //   return getItemsCounts();
  // }

  function getTotalPrice() {
    return bagProduct.reduce((sum: any, item: any) => sum + item.totalPrice, 0);
  }
  // satet id as per location
  function getStateId(id:any) {
    setstateID(id);
  }

  const cartUpdateInDb = (id:any,qty:any)=>{
    console.log('productid',id)

    var quantity = 0;
    if(qty==1){
      let bag = bagProduct.filter((cartItem: any) =>
        cartItem.id === id
      )
      quantity = bag[0].qty-1
    }

    if(qty==2){
      let bag = bagProduct.filter((cartItem: any) =>
        cartItem.id === id
      )
      quantity = bag[0]?.qty
      if(quantity==undefined){
        quantity = 1
      }
    }
    postAuthReq('/cart/update-cartdata', {productId:id,qty:quantity}).then((data) => {
              console.log('data',data.data)
            })
    
    console.log('bag=============================================================',quantity)
  }

  const setfilterValue=(maxPrice:any,brand:any,cat:any,discount:any)=>{
    setfilterContext({
      currentValue:maxPrice,
      brandSelect:brand,
      categorySelect:cat,
      discount:discount,
    })
  }

  return (
    <CommonContext.Provider
      value={{
        removeCompleteProuduct,
        addItemToCart,
        bagProduct,
        getItemsCount,
        getTotalPrice,
        removeFromCart,
        hideWelcomeModal,
        isWelcomeModalVisible,
        getStateId,
        stateID,
        setfilterValue,
        filterContext,
        reloadOnRemove
      }}>
      {children}
    </CommonContext.Provider>
  );
};

export {CommonContext, CommonProvider};
