import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useContext, useState} from 'react';
import {
  CallWhite,
  CloseWhite,
  DropdownDownArrow,
  DropdownUpArrow,
  ShopingBag,
} from '../../asset/img';
import {
  ColorVariable,
  CommonStyle,
  commanRadius,
} from '../../asset/style/commonStyle';
import {FontStyle} from '../../asset/style/FontsStyle';
import TextTranslation from '../commonResources/component/CommonInput/TextTranslation';
import {CommonContext} from '../commonResources/Context/CommonContext';
import {ScrollView} from 'react-native-gesture-handler';
import {getLocalStorageData, postAuthReq} from '../Service/APIServices/axoisService';
import { useIsFocused } from "@react-navigation/native";

const question = [
  {
    question: 'How to place an order online?',
    answer: `Our digital market has a curation of world class products and to be purchased at the comfort of your home.${'\n'}Let’s get started !!${'\n'}1. Access our website using following link${'\n'}2. Browse through relevant product categories${'\n'}3. Add required items to you're bag${'\n'}4. Once you have all the item in you bag proceed to check out${'\n'}5. Select the delivery option${'\n'}6. Review you order and place the order${'\n'}7. Order confirmation page will display the order number for future reference`,
  },
  {
    question:
      'What are all payment options available? Do you allow pay on delivery?',
    answer: `Payment has never been this simple!!!${'\n'}${'\n'}We provide following options for payment:${'\n'}${'\n'}Online payment with credit card, debit card, online banking, e-wallet or UPI${'\n'}UIC payment for online and In Store${'\n'}Cash on delivery is also available for customers who choose to pay in cash`,
  },
  {
    question: 'What is UIC card? How do I get it?',
    answer: `The UIC card is a pioneering digital identity system, which simplifies the online ordering and payment process. After signing up for the UIC, you will get personalized list of agri solutions on the website and will be able to checkout with the click of a button without the hassle of inputting the email ID or phone number or address or delivery preference or payment details.${'\n'}${'\n'}Farmkart UIC cards can be obtained in two ways:${'\n'}${'\n'}The customers can register online for the UIC card, prior to their first purchase, and get the card delivered to their doorstep.${'\n'}Sign-up for the card with a Farmkart representative at the retail store and get the card immediately.`,
  },
  {
    question: 'What other services do you provide?',
    answer: `Farmkart believes in integrated approach where we go hand in hand with farming journey and aim to be the one stop solution provider for all your farming needs:${'\n'}${'\n'}Lets see how we do that !!${'\n'}${'\n'}We offer agriculture consultancy services.${'\n'}We have in-house expert agronomists to help you make the right product.${'\n'}We are equipped with the latest tools and cutting-edge software who will help our customers make efficient, data-driven decisions.${'\n'}We also provide affordable machines and tools repair services with quick turnaround times.`,
  },
  {
    question:
      'How much time will it take to deliver? Are there any delivery charges?',
    answer: `Farmkart aims to complete all deliveries in 24-36 hours after the order has been placed.${'\n'}We are currently fulfilling orders only in the State of Madhya Pradesh. There are no shipping charges for deliveries within the Barwani District.`,
  },
  {
    question: 'How can I track my order?',
    answer: `You will be notified through SMS as soon as you placed the order and when the product has been dispatched. You can follow up anytime by calling us on +91 88238 88238.$${'\n'}Live tracking of order is coming soon.`,
  },
  {
    question: 'What if I am not at home and miss my delivery?',
    answer: `If you miss your delivery the first time, we will try delivering it again the next day. However, if the delivery is unsuccessful the second time too, then it will be available for pickup at our store for a maximum of 2 weeks. You can also contact our nearest store or call us on +91 88238 88238 for further assistance.`,
  },
  {
    question:
      'How can I make changes to order or contact customer support for any assistance?',
    answer: `At Farmkart we you love to interact with our farmers and to assist you . Get in touch with us @+91 88238 88238 for order related queries or to book appointment for instore services.${'\n'}We are happy to assist you for any order related query. Please visit our nearest Farmkart store during our operational hours or call us +91 88238 88238 for any additional assistance.`,
  },
];

const hindiQuestion = [
  {
    question: 'फार्मकार्ट पर आनलाइन ऑर्डर कैसे किया जाता है?',
    answer: `हमारा आनलाइन स्‍टोर विश्‍व स्तरीय उत्पाद और सेवाओ का एक संग्रह है और आप अपने घर बैठे इन सारी सुविधाओं का लाभ उठा सकते है।${'\n'}1. हमारी वेबसाइट पर जाने के लिए www.farmkart.com का उपयोग करे।${'\n'}2. आपकी आवश्यकताओं के अनुसार प्रासंगिक प्रोडक्ट्स केटेगरी के माध्यम से ब्राउज़ करें।${'\n'}3.अपने बैग में आवश्यक प्रोडक्ट्स जोड़ें।${'\n'}4.सारे प्रोडक्ट्स बैग में ऐड करने के बाद चेक आउट करने के लिए आगे बढ़े।${'\n'}5.अपनी सुविधा के अनुसार डिलीवरी विकल्प को चुने।${'\n'}6.आर्डर की समीक्षा/निरीक्षण करने के बाद आर्डर प्लेस करें।${'\n'}7.भविष्य में आर्डर करने के लिए, आर्डर पुष्टिकरण पेज पर अपना आर्डर नंबर देखे।`,
  },
  {
    question: 'फार्मकार्ट में आप कैसे भुगतान कर सकते है?',
    answer: `फार्मकार्ट में आपकी सुविधा के लिए कई आसान भुगतान के विकल्प उपलब्ध है।${'\n'}क्रेडिट कार्ड, डेबिट कार्ड, ऑनलाइन बैंकिंग, ई-वॉलेट या यूपीआई${'\n'}ऑनलाइन और स्टोर में UIC पेमेंट${'\n'}नकद भुगतान करने वालो के लिए स्टोर और कैश आन डिलीवरी का विकल्प`,
  },
  {
    question: 'UIC कार्ड क्या है? और आप इसे कैसे प्राप्त कर सकते है?',
    answer: `आनलाइन ऑर्डर और भुगतान प्रक्रिया को सरल बनाने के लिए UIC एक आधुनिक सुविधा है। UIC के लिए साइन अप करने से एक बटन के क्लिक के साथ चैक आउट किया जा सकता है और आपका पहचान पत्र तैयार हो जायेगा। फार्मकार्ट इस पहचान पत्र की सहायता के साथ आपकी खेती की हर एक जरूरत को पूरा कर सकता है।${'\n'}${'\n'}फार्मकार्ट का UIC कार्ड दो तरीकों से प्राप्त किया जा सकता हैं:${'\n'}${'\n'}ग्राहक अपनी पहली खरीदी से पहले, UIC कार्ड के लिए ऑनलाइन पंजीकरण कर सकते हैं, और कार्ड को होम डिलीवरी करवा सकते है।${'\n'}आप फार्मकार्ट स्टोर प्रतिनिधि के साथ कार्ड के लिए साइन-अप करके तुरंत कार्ड भी प्राप्त कर सकते है।`,
  },
  {
    question: 'फार्मकार्ट की अतिरिक्त सेवाओं के बारे में जानकारी दीजिये?',
    answer: `फार्मकार्ट एकीकृत दृष्टिकोण में विश्वास करता है जहां हम खेती की पूरी आवश्यकताओं के लिए वन स्टॉप सोलुशन प्रदान करने का लक्ष्य रखते हैं।${'\n'}${'\n'}हम कृषि परामर्श सेवाएं प्रदान करते हैं।${'\n'}सही प्रोडक्ट/उत्पाद चयन करने में आपकी सहायता के लिए हमारे एग्रोनॉमिस्ट/कृषि विशेषज्ञ हमेशा उपलब्ध हैं।${'\n'}हम नवीनतम टूल्स और अत्याधुनिक सॉफ्टवेयर से हमारे ग्राहकों को कुशल तर्क आधारित निर्णय लेने में मदद करेंगे।${'\n'}हम अत्याधुनिक मशीनों और औजारों की मरम्मत/सुधारने की सेवाएं प्रदान करते हैं।`,
  },
  {
    question:
      'प्रोडक्ट डिलीवरी के लिए कितना समय लगेगा? और क्या कोई डिलीवरी चार्ज है?',
    answer:
      'फार्मकार्ट ऑर्डर रिसीव करने के 24-36 घंटों में सभी ऑर्डर को डिलीवर करने का प्रयास करता है। वर्तमान में हम केवल मध्य प्रदेश राज्य में ऑर्डर पूरा कर रहे हैं। बड़वानी जिले में डिलीवरी के लिए कोई चार्ज नहीं है।',
  },
  {
    question: 'फार्मकार्ट में ऑर्डर कैसे ट्रेक किया जाता है?',
    answer: `आपके ऑर्डर के बाद जैसे ही प्रोडक्ट शिप किया जाता है, आपको SMS के माध्यम से सूचित किया जाएगा। आप हमें 88238 88238 पर कॉल करके किसी भी समय फॉलो-अप कर सकते हैं।${'\n'}${'\n'}ऑर्डर की लाइव ट्रैकिंग हमारी वेब साइट पर जल्द ही आ रही है।`,
  },
  {
    question:
      'अगर मैं डिलीवरी लेने के लिए घर पर नहीं हूँ, तो आगे डिलीवरी के क्या विकल्प है?',
    answer: `यदि आप पहली बार अपनी डिलीवरी मिस करते हैं, तो हम इसे अगले दिन फिर से डिलीवरी करने का प्रयास करेंगे। हालांकि, अगर डिलीवरी दूसरी बार भी असफल होती है, तो यह अधिकतम 2 सप्ताह तक हमारे स्टोर में भी पिक-अप लिए उपलब्ध होगा। आप हमारी निकटतम स्टोर मैं भी संपर्क कर सकते हैं या सहायता के लिए हमें +91 88238 88238 पर कॉल कर सकते हैं।`,
  },
  {
    question:
      'किसी भी ऑर्डर में परिवर्तन या ग्राहक सेवा केन्द्र से संपर्क कैसे किया जा सकता है?',
    answer: `फार्मकार्ट में हम अपने किसानों से बातचीत करने और उनकी सहायता करने के लिए हमेशा तैयार रहते हैं। ऑर्डर संबंधी प्रश्नों के लिए या स्टोर सेवाओं को बुक करने के लिए + 91 88238 88238 पर संपर्क करें।`,
  },
];

const Help = (props: any) => {
  const isFocused = useIsFocused();

  const [showAnswer, setshowAnswer] = useState(-1);
  const [currentLang, setcurrentLang] = useState([]);
  const [dynamicCartCount, setDynamicCartCount] = useState<any>(0);

  const navigateToCartScreen = () => {
    props.navigation.navigate('Cart');
  };
  const goBack = () => {
    props.navigation.goBack();
  };
  const {getItemsCount} = useContext(CommonContext);

  const hideAndShowAnswer = (index: number) => {
    if (showAnswer === index) {
      setshowAnswer(-1);
    } else {
      setshowAnswer(index);
    }
  };
  const openCallPopup = () => {
    props.navigation.navigate('CallPopUp');
  };

  React.useEffect(() => {
    let lang: any;
    getLocalStorageData('currentLangauge')
      .then((res: any) => {
        lang = res === 'hi' ? hindiQuestion : question;
        setcurrentLang(lang);
      })
      .catch(err => {});

      if(isFocused){ 
      getLocalStorageData('auth_Token').then((value)=>{
        console.log('setAuthToken====================================================',value)
        if(value){
        tempFunction();
  
        }else{
          setDynamicCartCount(0)
        }
      })
    }
  }, [isFocused]);

  const tempFunction = async()=>{
    var val = await getLocalStorageData('currentLangauge')
    let lang = 1;
    if (val == 'hi') {
      lang = 2;
    }
    // return lang

    const stateId = await getLocalStorageData('current_state');
    await postAuthReq('/cart/get-cartdata', { langId: lang, stateId: stateId }).then(async (data: any) => {
      // console.log('sachin', data.data.data?.cartDetails)
      var productCart = data.data.data?.cartDetails;
      var dynamic =  await productCart.reduce((sum: any, item: any) => sum + item.quantity, 0);
      console.log('dynamic',dynamic)
      setDynamicCartCount(dynamic)
      return dynamic
    }).catch((err) => {
      setDynamicCartCount(0)
      console.log('kkkkkkkkkkkkk', err);
    })
  // return value1
  }
  return (
    <View style={CommonStyle.mainViewWhite}>
      <View
        style={[
          CommonStyle.flex_dirRow_justifySpbtw,
          {
            marginBottom: 16,
            padding: 16,
            backgroundColor: ColorVariable.blueBlack,
          },
        ]}>
        <View style={CommonStyle.flex_dirRow_alignCenter}>
          <Pressable onPress={goBack}>
            <CloseWhite />
          </Pressable>
          <TextTranslation
            style={[
              FontStyle.fontMedium18,
              {marginLeft: 16, color: 'rgba(255, 255, 255, 1)'},
            ]}
            text={'__HELP__'}
          />
        </View>
        <View style={CommonStyle.flex_dirRow_alignCenter}>
          <Pressable style={{marginLeft: 16}} onPress={navigateToCartScreen}>
            {dynamicCartCount == 0 ? null : (
              <View style={CommonStyle.badge}>
                <Text style={[FontStyle.fontMedium16, {color: '#fff'}]}>
                  {dynamicCartCount}
                </Text>
              </View>
            )}
            <ShopingBag width={27} height={33} />
          </Pressable>
        </View>
      </View>
      <ScrollView style={{flexGrow: 1}} showsVerticalScrollIndicator={false}>
        <View style={styles.img}>
          <Image
            source={require('../../asset/img/updatedImg/Help.png')}
            style={{width: 321, height: 204, marginBottom: 24}}
          />
          <View style={{paddingHorizontal: 24}}>
            <TextTranslation
              style={[FontStyle.fontHeavy24, {textAlign: 'center'}]}
              text={'__CAN_WE_HELP__'}
            />
          </View>
          <Pressable style={styles.btn} onPress={openCallPopup}>
            <CallWhite />
            <TextTranslation
              style={[FontStyle.fontHeavy16, {color: 'white', marginLeft: 8}]}
              text={'__CALL_US__'}
            />
          </Pressable>
        </View>
        <View style={styles.questionView}>
          <TextTranslation
            style={[
              FontStyle.fontMedium18,
              {textAlign: 'center', marginBottom: 16},
            ]}
            text={'__ASKED_FREQUENTLY__'}
          />
          {currentLang.map((item: any, index: any) => {
            return (
              <View style={styles.helpQuestion} key={index}>
                <Pressable
                  onPress={() => hideAndShowAnswer(index)}
                  style={[
                    CommonStyle.flex_dirRow_alignCenter_justifySpbtw,
                    {flexGrow: 1},
                  ]}>
                  <View style={{flex: 1}}>
                    <Text style={[FontStyle.fontMedium16]}>
                      {item.question}
                    </Text>
                  </View>
                  <View style={{marginLeft: 10}}>
                    {showAnswer === index ? (
                      <DropdownDownArrow />
                    ) : (
                      <DropdownUpArrow />
                    )}
                  </View>
                </Pressable>
                {showAnswer === index ? (
                  <View style={{marginTop: 16}}>
                    <Text style={FontStyle.fontRegular16}>{item.answer}</Text>
                  </View>
                ) : null}
              </View>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};

export default Help;

const styles = StyleSheet.create({
  img: {
    marginTop: 54,
    alignItems: 'center',
  },
  btn: {
    backgroundColor: ColorVariable.farmkartGreen,
    borderRadius: commanRadius.radi6,
    width: 160,
    height: 54,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 16,
  },
  questionView: {
    paddingTop: 24,
    paddingBottom: 40,
    paddingHorizontal: 8,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: 'rgba(248, 248, 248, 1)',
    marginTop: 42,
    flexGrow: 1,
  },
  helpQuestion: {
    borderRadius: commanRadius.radi6,
    borderWidth: 1,
    borderColor: ColorVariable.stroke,
    padding: 16,
    marginBottom: 8,
    flexGrow: 1,
    backgroundColor:ColorVariable.white
  },
});
