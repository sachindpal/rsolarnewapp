import {Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  ColorVariable,
  CommonStyle,
} from '../../../../../asset/style/commonStyle';
import {CloseBlack, LeftBackIcon} from '../../../../../asset/img';
import {FontStyle} from '../../../../../asset/style/FontsStyle';
import {ScrollView} from 'react-native-gesture-handler';
import Button from '../../../../commonResources/component/CommonButton/Button';
import {getLocalStorageData} from '../../../../Service/APIServices/axoisService';

const TopBannerModel = (props: any) => {
  const [lang, setlang] = useState('en');

  useEffect(() => {
    getLocalStorageData('currentLangauge')
      .then((res: any) => {
        if (res != null) {
          setlang(res);
        }
      })
      .catch((res: any) => {});
  }, []);

  return (
    <View
      style={[
        CommonStyle.mainView,
        {backgroundColor: ColorVariable.blueBlack},
      ]}>
      <View style={[{flex: 1}, CommonStyle.sheet]}>
        <ScrollView>
          <Pressable
            style={styles.arrow}
            onPress={() => props.navigation.goBack()}>
            <CloseBlack />
          </Pressable>
          {props.route.params.display === 'AgriProduct' ? (
            lang == 'en' ? (
              <View style={styles.content}>
                <View>
                  <Text style={FontStyle.fontHeavy20}>
                    Farmkart e-commerce App: A personalized shopping experience
                  </Text>
                </View>
                <View>
                  <Text
                    style={[
                      FontStyle.fontMedium15,
                      {marginBottom: 15, marginTop: 15},
                    ]}>
                    Our objective is to help farmers grow by providing them
                    access to the best quality inputs for their farming needs
                    including seeds, fertilizers, pesticides, and tools &
                    equipment. We at Farmkart are trying to ease the
                    availability and accessibility of the best quality brand
                    products at affordable prices at our e-commerce Application
                  </Text>

                  <Text style={[FontStyle.fontMedium15, {marginBottom: 15}]}>
                    Follow these steps to purchase your agricultural inputs
                    specially curated for you
                  </Text>
                  {/* step 1 */}
                  <Text style={[FontStyle.fontMedium15]}>
                    <Text style={{fontFamily: 'Avenir Heavy'}}>Step 1:</Text>{' '}
                    Choose the category from which you want to buy- Seeds,
                    Fertilizers, Pesticides or Farm Machinery, UIC Recharge,
                    Special Offers, rent4farm, Tissue Culture. Select the
                    product under the desired category and mark the quantity.
                    Add it to your shopping bag
                  </Text>

                  {/* step 2 */}
                  <Text style={[FontStyle.fontMedium15]}>
                    <Text style={{fontFamily: 'Avenir Heavy'}}>Step 2:</Text> If
                    you are a new customer, then create a new account on the
                    Farmkart App Or if you already have an account on Farmkart,
                    then log in to your account.
                  </Text>
                  {/* step 3 */}

                  <Text style={[FontStyle.fontMedium15]}>
                    <Text style={{fontFamily: 'Avenir Heavy'}}>Step 3:</Text> Go
                    to your shopping bag and select the option 'Proceed to Check
                    Out'. On the checkout page, you can review your order once
                    again and either register for UIC or enter your UIC number
                    then select the option 'Continue Shopping'.
                  </Text>

                  {/* step 4 */}

                  <Text style={[FontStyle.fontMedium15]}>
                    <Text style={{fontFamily: 'Avenir Heavy'}}>Step 4:</Text>{' '}
                    Choose the delivery option in the next step and Continue to
                    Checkout. If your UIC balance is low at any point in time,
                    you will be given an option to change the payment method or
                    recharge your UIC.
                  </Text>
                  {/* step 5 */}
                  <Text style={[FontStyle.fontMedium15]}>
                    <Text style={{fontFamily: 'Avenir Heavy'}}>Step 5:</Text>{' '}
                    Guaranteed delivery within 24 hours or 36 -72 hours (chosen
                    by you) at your doorstep (check the locations where we
                    currently deliver)
                  </Text>
                </View>
              </View>
            ) : (
              <View style={styles.content}>
                <View>
                  <Text style={FontStyle.fontHeavy20}>
                    फ़ार्मकार्ट ई-कॉमर्स एप्लिकेशन: व्यक्तिगत कृषि ख़रीददारी का
                    एक बेहतर अनुभव
                  </Text>
                </View>
                <View>
                  <Text
                    style={[
                      FontStyle.fontMedium15,
                      {marginBottom: 15, marginTop: 15},
                    ]}>
                    हमारा उद्देश्य किसानों को उनकी खेती की जरूरतों के लिए
                    सर्वोत्तम गुणवत्ता के आदानों तक पहुंच प्रदान करने में मदद
                    करना है, जिसमें बीज, उर्वरक, कीटनाशक, और उपकरण और उपकरण
                    शामिल हैं। फार्मकार्ट ई-कॉमर्स एप्लिकेशन पर सबसे अच्छी
                    गुणवत्ता वाले ब्रांड के उत्पादों की उपलब्धता और पहुंच को
                    आसान बनाने की कोशिश कर रहे हैं।
                  </Text>

                  <Text style={[FontStyle.fontMedium15, {marginBottom: 15}]}>
                    विशेष रूप से तैयार किये गए अपने कृषि आदानों को ख़रीदने के लिए
                    इन स्टेप्स का पालन करें
                  </Text>
                  {/* step 1 */}
                  <Text style={[FontStyle.fontMedium15]}>
                    <Text style={{fontFamily: 'Avenir Heavy'}}>Step 1:</Text> वह
                    केटेगरी चुनें जिसमें से आप खरीदना चाहते हैं- बीज, उर्वरक,
                    कीटनाशक या फार्म मशीनरी, UIC रिचार्ज, विशेष ऑफर, rent4farm,
                    टिश्यू कल्चर। चुनी गयी केटेगरी में उत्पाद का चयन करें और
                    मात्रा को चिह्नित करें। इसे अपने ऑर्डर लिस्ट/शॉपिंग बैग में
                    डालें
                  </Text>

                  {/* step 2 */}
                  <Text style={[FontStyle.fontMedium15]}>
                    <Text style={{fontFamily: 'Avenir Heavy'}}>Step 2:</Text>{' '}
                    यदि आप एक नए ग्राहक हैं, तो फार्मकार्ट ऐप पर एक नया खाता
                    बनाएं या अगर आपका पहले से ही फार्मकार्ट पर खाता है, तो अपने
                    खाते में लॉग इन करें।
                  </Text>
                  {/* step 3 */}

                  <Text style={[FontStyle.fontMedium15]}>
                    <Text style={{fontFamily: 'Avenir Heavy'}}>Step 3:</Text>{' '}
                    अपने शॉपिंग बैग पर जाएं और 'ऑर्डर करने के लिए आगे बढ़ें'
                    विकल्प चुनें। चेक आउट पृष्ठ पर, आप एक बार फिर से अपने ऑर्डर
                    को चेक कर सकते हैं और या तो UIC के लिए पंजीकरण कर सकते हैं
                  </Text>

                  {/* step 4 */}

                  <Text style={[FontStyle.fontMedium15]}>
                    <Text style={{fontFamily: 'Avenir Heavy'}}>Step 4:</Text>{' '}
                    अगले चरण में डिलीवरी विकल्प चुनें और चेक आउट जारी रखें। यदि
                    आपका UIC शेष किसी भी समय कम है, तो आपको भुगतान विधि बदलने या
                    अपने UIC को रिचार्ज करने का विकल्प दिया जाएगा।
                  </Text>
                  {/* step 5 */}
                  <Text style={[FontStyle.fontMedium15]}>
                    <Text style={{fontFamily: 'Avenir Heavy'}}>Step 5:</Text>{' '}
                    ऑर्डर करने के बाद अपने घर पर 24 या 36 - 72 घंटे के भीतर
                    डिलीवरी पाएं (देखें उन स्थानों को जहाँ हम वर्तमान में डिलीवर
                    कर रहे हैं)
                  </Text>
                </View>
              </View>
            )
          ) : props.route.params.display === 'UIC' ? (
            lang == 'en' ? (
              <View style={styles.content}>
                <View>
                  <Text style={FontStyle.fontHeavy20}>UIC</Text>
                </View>
                <View>
                  <Text
                    style={[
                      FontStyle.fontMedium15,
                      {marginBottom: 15, marginTop: 15},
                    ]}>
                    Introducing digital identity for rural farmers. This also
                    acts as a digital agronomist and provides personal guidance
                    to farmers throughout the process of farming
                  </Text>

                  <Text style={[FontStyle.fontMedium15, {marginBottom: 15}]}>
                    By registering with Farmkart UIC, you can buy all products
                    at UIC prices, which is much lower than MRP. Also, you get
                    additional discounts, personalized suggestions, free
                    delivery, volume discount, and attractive offers
                  </Text>

                  <Text style={[FontStyle.fontMedium15, {marginBottom: 15}]}>
                    To subscribe for UIC, users just need to answer 3 questions
                    while on boarding. They will have to answer one question per
                    month to keep the subscription active
                  </Text>

                  <Text style={[FontStyle.fontMedium15, {marginBottom: 15}]}>
                    UIC Specific Conditions:
                  </Text>
                  {/* step 1 */}
                  <Text style={[FontStyle.fontMedium15]}>
                    UIC balance {'<'} 1000 : UIC price is applied
                  </Text>

                  {/* step 2 */}
                  <Text style={[FontStyle.fontMedium15]}>
                    UIC balance {'>'} 1000 : Regular price is applied (If UIC
                    subscription is inactive).
                  </Text>
                  {/* step 3 */}

                  <Text style={[FontStyle.fontMedium15]}>
                    UIC balance {'<'} 1000 : UIC price is applied (If UIC
                    subscription is active)
                  </Text>

                  {/* step 4 */}

                  <Text style={[FontStyle.fontMedium15]}>
                    For UIC Gold customers : UIC prices applied.
                  </Text>
                </View>
              </View>
            ) : (
              <View style={styles.content}>
                <View>
                  <Text style={FontStyle.fontHeavy20}>UIC</Text>
                </View>
                <View>
                  <Text
                    style={[
                      FontStyle.fontMedium15,
                      {marginBottom: 15, marginTop: 15},
                    ]}>
                    यह ग्रामीण किसानों की डिजिटल पहचान है, जो उन्हें एक कृषि
                    विशेषज्ञ की तरह खेती की पूरी प्रक्रिया में व्यक्तिगत
                    मार्गदर्शन प्रदान करता हैं।
                  </Text>

                  <Text style={[FontStyle.fontMedium15, {marginBottom: 15}]}>
                    फार्मकार्ट UIC के साथ रजिस्टर करके आप हर उत्पाद UIC मूल्य पर
                    प्राप्त कर सकते हैं, जो एम आर पी से कम है। साथ ही, UIC के
                    माध्यम से भुगतान करने पर आप अतिरिक्त छुट, व्यक्तिगत उत्पाद
                    सुझाव, मुफ्त डिलीवरी, वॉल्यूम डिस्काउंट और ऑफर्स का भी लाभ
                    प्राप्त कर सकते हैं |
                  </Text>

                  <Text style={[FontStyle.fontMedium15, {marginBottom: 15}]}>
                    UIC सब्स्क्रिप्शन के लिए, उपभोक्ताओं को अपने खेत और फसलों के
                    बारे में बस 3 सवालों का जवाब देने हैं। इसके बाद
                    सब्स्क्रिप्शन जारी रखने के लिए, हर माह बस एक सवाल का जवाब
                    देना है।
                  </Text>

                  <Text style={[FontStyle.fontMedium15, {marginBottom: 15}]}>
                    UIC से जुड़ी विशिष्ट शर्तें :
                  </Text>
                  {/* step 1 */}
                  <Text style={[FontStyle.fontMedium15]}>
                    UIC जमा राशि {'>'} 1000 : UIC किमत ही देय होगी
                  </Text>

                  {/* step 2 */}
                  <Text style={[FontStyle.fontMedium15]}>
                    UIC जमा राशि {'<'} 1000 : उत्पाद की सामान्य किमत देय होगी
                    (अगर UIC सब्स्क्रिप्शन निष्क्रिय हो गया है)
                  </Text>
                  {/* step 3 */}

                  <Text style={[FontStyle.fontMedium15]}>
                    UIC जमा राशि {'<'} 1000 : UIC किमत देय होगी (अगर UIC
                    सब्स्क्रिप्शन सक्रिय है)
                  </Text>

                  {/* step 4 */}

                  <Text style={[FontStyle.fontMedium15]}>
                    UIC गोल्ड ग्राहकों के लिए : UIC किमत देय होगी
                  </Text>
                </View>
              </View>
            )
          ) : null}
        </ScrollView>
      </View>
      <View
        style={{
          paddingHorizontal: 24,
          paddingBottom: 24,
          paddingTop: 8,
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: 'rgba(255, 255, 255, 0.6)',
        }}>
        <Button
          title="__CLOSE__"
          bgBlack
          fontSize={16}
          onPress={() => props.navigation.goBack()}
        />
      </View>
    </View>
  );
};

export default React.memo(TopBannerModel);

const styles = StyleSheet.create({
  arrow: {
    marginTop: 20,
    marginHorizontal: 16,
  },
  content: {
    paddingTop: 16,
    paddingHorizontal: 16,
    paddingBottom: 80,
  },
});
