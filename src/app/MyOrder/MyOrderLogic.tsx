import React, {useContext, useEffect, useState} from 'react';
import MyOrderRender from './MyOrderRender';
import {useNavigation, useRoute} from '@react-navigation/native';
import Invoice from './component/Invoice';
import Review from './component/Review';
import {CommonContext} from '../commonResources/Context/CommonContext';
import {
  getLocalStorageData,
  postAuthReq,
} from '../Service/APIServices/axoisService';
import {NativeScrollEvent} from 'react-native';

export default function MyOrderLogic() {
  const route = useRoute();
  console.log(`route.nameroute.nameroute.nameroute.nameroute.name`,route)

  const navigation = useNavigation<any>();
  const [InvoiceModel, setInvoiceModel] = React.useState(false);
  const [reviewProductID, setreviewProductID] = useState('');
  const [ReviewModel, setReviewModel] = React.useState(false);

  const [orderHistory, setorderHistory] = useState<any>([]);
  const [isLoadingorderHistory, setisLoadingorderHistory] = useState(true);
  const [currentOrder, setcurrentOrder] = useState([]);
  const [shippingData, setShippingData] = useState([]);
  const [isLoadingcurrentOrder, setisLoadingcurrentOrder] = useState(true);
  const [isLoadingInvoice, setisLoadingInvoice] = useState(true);
  const [orderInvoice, setorderInvoice] = useState([]);
  const [currentLang, setcurrentLang] = useState(1);
  const [pageNo, setpageNo] = useState(1)
  const [isloadingPage, setisloadingPage] = useState(false)
  const [orderStatus, setOrderStatus] = useState('')

  const {addItemToCart} = useContext(CommonContext);

  const navigateToHome = () => {
    navigation.navigate('BottomTabBar', {screen: 'Home'});
  };
  const openAndCloseInvoiceModal = (orderId: any,order_status:any) => {
    setOrderStatus(order_status)
    if (orderId != null) {
      setisLoadingInvoice(true);
      getorderInvoice(orderId);
      setInvoiceModel(!InvoiceModel);
    } else {
      setInvoiceModel(!InvoiceModel);
    }
  };
  const openAndCloseReviewModal = () => {
    setReviewModel(!ReviewModel);
  };

  const reorder = (
    id: any,
    name: any,
    price: any,
    uic_price: any,
    image: any,
    uicdiscount:any
  ) => {
    addItemToCart(id, name, price, uic_price, image,uicdiscount),
      navigation.navigate('Cart');
  };

  const getOrderHistory = (lang: any,page:number) => {
    if(pageNo!=1){
      setisloadingPage(true)
    }
    console.log("page number called",page)
    let body = {
      langId: lang,
      limit: 10,
      pageNo: page,
    };
    postAuthReq('/user/order-history-new', body)
      .then((response: any) => {
        console.log('order history', response.data.data);
        // orderHistory.push(...response.data.data.orderHistory);
        // setorderHistory(orderHistory);
        // setorderHistory((prevState:any)=>
        //   prevState,response.data.data.orderHistory
        // )
        setorderHistory((prev:any) => {
          return [...prev, ...response.data.data.orderHistory]
        })
        setisloadingPage(false)
        setisLoadingorderHistory(false);
      })
      .catch((err: any) => {
        console.log('order history error', err.response);
      });
  };

  const getCurrentOrder = (lang: any) => {
    let body = {
      langId: lang,
      limit: 10,
      pageNo: 1,
    };
    console.log('response.data.data--------------------------')

    postAuthReq('/user/my-orders-new', body)
      .then((response: any) => {
        console.log(
          'current ==== history=======',
          response.data.data.recentOrders,
        );
        console.log('response.data.data--------------------------',response.data.data)
        setcurrentOrder(response.data.data.recentOrders);
        setShippingData(response.data.data?.shippingData);
        setisLoadingcurrentOrder(false);
      })
      .catch((err: any) => {
        setisLoadingcurrentOrder(false);
        console.log('current order error', err.response);
      });
  };

  const getProductIDReview = (id: any) => {
    setreviewProductID(id);
    setReviewModel(!ReviewModel);
  };

  const getorderInvoice = (id: any) => {
    let body = {
      langId: currentLang,
      orderId: id,
    };

    postAuthReq('/user/get-invoice-new', body)
      .then((response: any) => {
        console.log(' ==== invoice=======', response.data.data);
        setorderInvoice(response.data.data);
        setisLoadingInvoice(false);
      })
      .catch((err: any) => {
        console.log('invoice order error', err.response);
      });
  };

  React.useEffect(() => {
    let lang: any;
    getLocalStorageData('currentLangauge')
      .then((res: any) => {
        lang = res === 'hi' ? 2 : 1;
        setcurrentLang(lang);
        getCurrentOrder(lang);
        getOrderHistory(lang,pageNo);
      })
      .catch(err => {});
  }, []);

  const paginationApiCall = (event: NativeScrollEvent) => {
    const layoutMeasurementHeight = +event.layoutMeasurement.height.toFixed(3);
    const contentHeight = +event.contentSize.height.toFixed(3);
    const contentOffset = +event.contentOffset.y.toFixed(3);
    const totalHeight = +(layoutMeasurementHeight + contentOffset).toFixed(3);

    if (totalHeight >= contentHeight) {
      console.log('Scroll to end');
      setpageNo(pageNo+1)
      getOrderHistory(currentLang,pageNo+1)
    }
  };

  const getorderHistoryAfterReview=(lang:any)=>{
    setpageNo(1)
    setorderHistory([])
    getOrderHistory(lang,1)
  }
  return (
    <>
      <MyOrderRender
        navigateToHome={navigateToHome}
        openAndCloseInvoiceModal={openAndCloseInvoiceModal}
        openAndCloseReviewModal={getProductIDReview}
        reorder={reorder}
        orderHistory={orderHistory}
        isLoadingorderHistory={isLoadingorderHistory}
        currentOrder={currentOrder}
        shippingData={shippingData}
        isLoadingcurrentOrder={isLoadingcurrentOrder}
        paginationApiCall={paginationApiCall}
        isloadingPage={isloadingPage}
      />
      <Invoice
        openAndCloseInvoiceModal={openAndCloseInvoiceModal}
        InvoiceModal={InvoiceModel}
        isLoadingInvoice={isLoadingInvoice}
        orderInvoice={orderInvoice}
        orderStatus={orderStatus}
      />
      <Review
        openAndCloseReviewModal={openAndCloseReviewModal}
        ReviewModal={ReviewModel}
        reviewProductID={reviewProductID}
        language={currentLang}
        getorderHistoryAfterReview={getorderHistoryAfterReview}
      />
    </>
  );
}
