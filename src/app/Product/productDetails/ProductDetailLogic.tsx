import { View, Text } from 'react-native'
import React, { useContext } from 'react'
import ProductDetailRender from './ProductDetailRender'
import { CommonContext } from '../../commonResources/Context/CommonContext'

const ProductDetailLogic = ({ navigation,route }: any) => {
    console.log('navigationssss',route)
    const goBack = () => {
        navigation.goBack()
    }
    const navigateToCartScreen = () => {
        navigation.navigate("Cart")
    }
    const navigationToAccount = (screen: string) => {
        navigation.navigate("AuthStack",{screen:screen})
    }

    const { addItemToCart, removeFromCart, bagProduct, getItemsCount } = useContext(CommonContext)

    const buyNow = (id:any,name:any,price:any,uic_price:any,image:any,uicdiscount:any) => {
        console.log(id,
            name,
            price,
            uic_price,image,uicdiscount)
        addItemToCart(
            id,
            name,
            price,
            uic_price,image,uicdiscount),
            navigateToCartScreen()
    }
    return (
        <ProductDetailRender
            goBack={goBack}
            navigateToCartScreen={navigateToCartScreen}
            getItemsCount={getItemsCount}
            buyNow={buyNow}
            addItemToCart={addItemToCart}
            removeFromCart={removeFromCart}
            id={route.params.id}
            buttonName={route.params?.buttonName}
            isSearch={route?.params?.search_text}
            // id={316}
            navigationToAccount={navigationToAccount} />
    )
}

export default ProductDetailLogic