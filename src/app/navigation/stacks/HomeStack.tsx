import React, { useEffect } from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BottomTabbar from '../bottomTabNavigation/BottomTabbar';
import MoreDrawerRender from '../../More/MoreDrawerRender';
import CallModel from '../../CallModel/CallModel';
import TopBannerModel from '../../Home/component/Banner/BannerModel/TopBannerModel';
import MiddleBannerModel from '../../Home/component/Banner/BannerModel/MiddleBannerModel';
import ViewAllBrandsRender from '../../Home/component/ViewAll/ViewAllBrandsRender';
import ViewAllCropsRender from '../../Home/component/ViewAll/ViewAllCropsRender';
import AddCartPopUpRender from '../../Cart/AddToCartPopUp/AddCartPopUpRender';
import ProductListLogic from '../../Product/productList/ProductListLogic';
import FilterLogic from '../../Product/Filter/FilterLogic';
import ProductDetailLogic from '../../Product/productDetails/ProductDetailLogic';
import CartLogic from '../../Cart/CartScreen/CartLogic';
import PaymentLogic from '../../Cart/PaymentScreen/PaymentLogic';
import CheckOutScreenLogic from '../../Cart/CheckOutScreen/CheckOutScreenLogic';
import OrderPlacedRender from '../../Cart/OrderPlacedScreen/OrderPlacedRender';
import EditAddressLogic from '../../Cart/EditAddress/EditAddressLogic';
import AddressScreenLogic from '../../AddressScreen/AddressScreenLogic';
import CropSelectionLogic from '../../UIC/CropSelection/CropSelectionLogic';
import CropInfoLogic from '../../UIC/CropInfoInput/CropInfoLogic';
import LoginPopup from '../../Home/component/LoginPopup/LoginPopup';
import UICNumberScreen from '../../UIC/UICNumberScreen/UICNumberScreen';
import CropTrackerLogic from '../../UIC/CropTracker/CropTrackerLogic';
import CropReportLogic from '../../UIC/CropReport/CropReportLogic';
import UICTermsAndCondition from '../../UIC/BalanceScreenForUICUser/UICTerms&Condition/UICTermsAndCondition';
import RechargeUICLogic from '../../UIC/BalanceScreenForUICUser/RechargeUIC/RechargeUICLogic';
import RechargeAmountLogic from '../../UIC/BalanceScreenForUICUser/RechargeUIC/RechargeAmount/RechargeAmountLogic';
import ProfileLogic from '../../Profile/ProfileLogic';
import MyOrderLogic from '../../MyOrder/MyOrderLogic';
import PrivacyPolicy from '../../PrivacyPolicy/PrivacyPolicy';
import Help from '../../Help/Help';
import RenewUICQuestion from '../../UIC/RenewUICQuestion/RenewUICQuestion';
import WeartherForcast from '../../Home/component/Weather/WeatherForcast';
import ViewAllReviews from '../../Product/productDetails/ViewAllReviews';
import FilterForBrandPopup from '../../Home/component/ViewAll/FilterForBrandPopup';
import ChatBoat from '../../ChatBoat/ChatBoat';
import ChatScreen from '../../ChatBoat/ChatScreen';
import LearnMoreUicLogic from '../../Cart/CheckOutScreen/Component/LearnMoreUicLogic';
import FeedBackForm from '../../ChatBoat/FeedBackForm';
import SubmitFeedbackForm from '../../ChatBoat/SubmitFeedback';
import ChatBotTerms from '../../ChatBoat/ChatBotTerms';
import { Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getLocalStorageData } from '../../Service/APIServices/axoisService';
import AudioConv from '../../ChatBoat/AudioConv';
import RsolarHome from '../../Rsolar/RsolarHome';

const StackScreens = createNativeStackNavigator();
const SigninStack = createNativeStackNavigator();
const GlobalStack = createNativeStackNavigator();


const HomeStack = () => {
  const navigation = useNavigation<any>();

  useEffect(() => {

    Linking.getInitialURL().then(async(url) => {
      if (url) {
        let token = await getLocalStorageData('auth_Token');
    console.log('tokentoken home', token);
        console.log('App launched with URL:', url);
        // Implement your navigation logic
        // Parse the URL and manually navigate
      const route = url.replace('https://mobileapinew.farmkart.com/', '');
      console.log('hfhfhffhfhfh',route)
      if (route === 'myorder' && token!=null) {
        navigation.navigate('signIn', {
          screen: 'MyOrder',
        })
      } else {
        navigation.navigate('AuthStack', {
          screen: 'Login',
        })
      }
      }
    });
  
    const handleDeepLink = async(event:any) => {
      let token = await getLocalStorageData('auth_Token');
    console.log('tokentoken home', token);
      const url = event.url;
      // Parse the URL and manually navigate
      const route = url.replace('https://mobileapinew.farmkart.com/', '');
      console.log('hfhfhffhfhfh',route)
      if (route === 'myorder' && token!=null) {
        navigation.navigate('signIn', {
          screen: 'MyOrder',
        })
      } else {
        navigation.navigate('AuthStack', {
          screen: 'Login',
        })
      }
    };
  
    // Add event listener for deep links
    Linking.addEventListener('url', handleDeepLink);
  
    // return () => {
    //   Linking.removeEventListener('url', handleDeepLink);
    // };
  
  }, []);
  return (
    <StackScreens.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="global">
      <StackScreens.Screen name="signIn" component={SignInScreen} />
      <StackScreens.Screen name="global" component={GlobalScreen} />
    </StackScreens.Navigator>
  );
};

export default HomeStack;

const GlobalScreen = () => {
  return (
    <GlobalStack.Navigator
      initialRouteName="BottomTabBar"
      screenOptions={{headerShown: false}}>
      <GlobalStack.Screen name="BottomTabBar" component={BottomTabbar} />
      <GlobalStack.Screen
        name="ViewAllBrands"
        component={ViewAllBrandsRender}
      />
      <GlobalStack.Screen name="ViewAllCrops" component={ViewAllCropsRender} />
      <GlobalStack.Screen name="ProductList" component={ProductListLogic} />
      <GlobalStack.Screen name="ProductDetail" component={ProductDetailLogic} />
      <GlobalStack.Screen name="ViewAllReviews" component={ViewAllReviews} />
      <GlobalStack.Screen name="Cart" component={CartLogic} />
      <GlobalStack.Screen name="WetherForcast" component={WeartherForcast} />
      <GlobalStack.Screen name="Help" component={Help} />
      <GlobalStack.Group
        screenOptions={{
          gestureEnabled: false,
          gestureDirection: 'horizontal',
          headerShown: false,
          presentation: 'transparentModal',
          animation: 'slide_from_right',
          fullScreenGestureEnabled: false,
        }}>
        <GlobalStack.Screen name="MoreContent" component={MoreDrawerRender} />
      </GlobalStack.Group>
      {/* banner model */}
      <GlobalStack.Group
        screenOptions={{
          gestureEnabled: false,
          gestureDirection: 'horizontal',
          headerShown: false,
          presentation: 'transparentModal',
          animation: 'slide_from_bottom',
          fullScreenGestureEnabled: false,
        }}>
        <GlobalStack.Screen name="TopBanner" component={TopBannerModel} />
        <GlobalStack.Screen
          name="RenewUICQuestion"
          component={RenewUICQuestion}
        />
        {/* <GlobalStack.Screen name="RechargeUIC" component={RechargeUICLogic} /> */}
        <GlobalStack.Screen name="MiddleBanner" component={MiddleBannerModel} />
        <GlobalStack.Screen name="Filter" component={FilterLogic} />
      </GlobalStack.Group>
      <GlobalStack.Group
        screenOptions={{
          gestureEnabled: false,
          gestureDirection: 'vertical',
          presentation: 'transparentModal',
          animation: 'fade',
          fullScreenGestureEnabled: false,
        }}>
        <GlobalStack.Screen
          name="AddToCartPopUp"
          component={AddCartPopUpRender}
        />
      <GlobalStack.Screen name="SubmitFeedbackForm" component={SubmitFeedbackForm} />

        <GlobalStack.Screen
          name="FilterForBrandPopup"
          component={FilterForBrandPopup}
        />
        <GlobalStack.Screen name="LoginPopup" component={LoginPopup} />

        <GlobalStack.Screen name="CallPopUp" component={CallModel} />
        <GlobalStack.Screen name="FarmGpt" component={ChatBoat} />
      <GlobalStack.Screen name="ChatScreen" component={ChatScreen} />
      <GlobalStack.Screen name="AudioConv" component={AudioConv} />
      

      </GlobalStack.Group>
      {/* modal group for signIn modal */}
      <GlobalStack.Group
        screenOptions={{
          gestureEnabled: false,
          gestureDirection: 'horizontal',
          headerShown: false,
          presentation: 'transparentModal',
          animation: 'slide_from_bottom',
          fullScreenGestureEnabled: false,
        }}>
        <GlobalStack.Screen
          name="UICTermsAndCondition"
          component={UICTermsAndCondition}
        />
        <GlobalStack.Screen name="RechargeUIC" component={RechargeUICLogic} />
        <GlobalStack.Screen
          name="RechargeUICAmt"
          component={RechargeAmountLogic}
        />
        <GlobalStack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
      </GlobalStack.Group>
    </GlobalStack.Navigator>
  );
};

const SignInScreen = () => {
  return (
    <SigninStack.Navigator screenOptions={{headerShown: false}}>
      {/* cart screen */}
      <SigninStack.Screen name="Payment" component={PaymentLogic} />
      <SigninStack.Screen name="AddressScreen" component={AddressScreenLogic} />
      <SigninStack.Screen
        name="CheckOutScreen"
        component={CheckOutScreenLogic}
      />
      <SigninStack.Screen name="OrderSuccess" component={OrderPlacedRender} />
      <SigninStack.Screen name="CropSelection" component={CropSelectionLogic} />
      <SigninStack.Screen name="CropInfo" component={CropInfoLogic} />
      <SigninStack.Screen name="UICNumberScreen" component={UICNumberScreen} />
      <SigninStack.Screen name="LearnMoreUic" component={LearnMoreUicLogic} />
      <SigninStack.Screen name="CropTracker" component={CropTrackerLogic} />
      <SigninStack.Screen name="Profile" component={ProfileLogic} />
      <SigninStack.Screen name="MyOrder" component={MyOrderLogic} />
      {/* <SigninStack.Screen name="ChatScreen" component={ChatScreen} /> */}
      <GlobalStack.Screen name="ChatFeedback" component={FeedBackForm} />
      <SigninStack.Screen name="SubmitFeedbackForm" component={SubmitFeedbackForm} />
      <GlobalStack.Screen name="ChatBotTerms" component={ChatBotTerms} />


      <SigninStack.Group
        screenOptions={{
          gestureEnabled: false,
          gestureDirection: 'vertical',
          headerShown: false,
          presentation: 'transparentModal',
          animation: 'slide_from_bottom',
          fullScreenGestureEnabled: false,
        }}>
        {/* <SigninStack.Screen name="RechargeUIC" component={RechargeUICLogic} /> */}
        <SigninStack.Screen name="EditAddress" component={EditAddressLogic} />
        <SigninStack.Screen name="CropReport" component={CropReportLogic} />
      </SigninStack.Group>
      <SigninStack.Group
        screenOptions={{
          gestureEnabled: false,
          gestureDirection: 'vertical',
          presentation: 'transparentModal',
          animation: 'fade',
          fullScreenGestureEnabled: true,
        }}>
        <SigninStack.Screen
          name="SuggestedProduct"
          component={AddCartPopUpRender}
        />
      </SigninStack.Group>
    </SigninStack.Navigator>
  );
};
