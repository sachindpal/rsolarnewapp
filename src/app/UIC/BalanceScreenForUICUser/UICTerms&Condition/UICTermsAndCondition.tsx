import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import {CommonStyle} from '../../../../asset/style/commonStyle';
import {CloseBlack} from '../../../../asset/img';
import {FontStyle} from '../../../../asset/style/FontsStyle';
import {useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Button from '../../../commonResources/component/CommonButton/Button';

const UICTermsAndCondition = () => {
  const navigation = useNavigation();
  const goBack = () => {
    navigation.goBack();
  };
  const {t: translate} = useTranslation();
  const [currentLang, setcurrentLang] = React.useState<any>('en');

  // get current set language from local storage
  async function getCurrentLangauge() {
    let current = await AsyncStorage.getItem('currentLangauge');
    setcurrentLang(current);
  }

  React.useEffect(() => {
    getCurrentLangauge();
  }, []);

  const TermsInEng = () => {
    return (
      <View style={{paddingHorizontal: 16}}>
        <Text style={[FontStyle.fontHeavy20, {marginBottom: 8}]}>
          UIC Terms and Conditions
        </Text>
        <Text style={FontStyle.fontRegular16}>
          IMPORTANT - PLEASE READ: The following agreement describes the terms
          and conditions that apply to the pre-paid account of your UIC in India
          between you and Farmkart Online Services Private Limited.
        </Text>
        <Text style={FontStyle.fontRegular16}>
          By using the UIC, you agree to the terms and conditions of this
          agreement. Please keep a copy of this agreement for your records. The
          terms and conditions of this agreement will govern the use of the UIC
          by you or anyone else who holds or uses the UIC.
        </Text>
        <Text style={[FontStyle.fontRegular16, styles.heading]}>
          About Your UIC Account
        </Text>
        <Text style={[FontStyle.fontRegular16, styles.heading]}>
          Farmkart Purchases Only
        </Text>
        <Text style={[FontStyle.fontRegular16]}>
          The UIC allows you to load an INR value on to your UIC for future
          purchases either www.farmkart.com or at our Superstores. No deposit
          account, credit line or overdraft protection is associated with UIC.
          Unless otherwise required by law or permitted by this agreement, any
          amount on your UIC is non-refundable and may not be redeemed for cash
          at any Farmkart Superstores. No interest, dividends, or any other
          earnings on funds deposited into your UIC will accrue or be paid or
          credited to you by Farmkart. The value associated with UIC is not
          insured by any Insurance Company. Use of a UIC is limited to Farmkart
          Superstores and online stores at www.farmkart.com. We reserve the
          right not to accept, load, reload or re-issue any UIC or otherwise
          limit the use of a UIC if we reasonably believe that the use is
          unauthorized, fraudulent, or otherwise unlawful.
        </Text>
        <Text style={[FontStyle.fontRegular16, styles.heading]}>
          Loading and Reloading Value on Your Card
        </Text>
        <Text style={[FontStyle.fontRegular16]}>
          You can load (or reload) an INR value on the UIC at a Farmkart store
          using cash, an approved credit card or debit card (where available).
          You may also reload an INR value on the UIC by going online at
          www.farmkart.com using an approved credit card or debit card. The
          loaded amount will appear on your UIC immediately. Currently, you may
          load any amount up to INR 50,000 in multiples of INR 100.00 from our
          Superstore. For online recharge, the minimum amount is INR 1,000.
          Farmkart may change these maximum or minimum amounts at any time in
          its sole discretion, and we will post such changes online. All amounts
          loaded on your UIC are held and denominated in INR (the "Base
          Currency").{' '}
        </Text>
        <Text style={[FontStyle.fontRegular16, styles.heading]}>
          Fees and Expiration of Card Balances
        </Text>
        <Text style={[FontStyle.fontRegular16]}>
          Farmkart does not charge any fees for the issuance, activation, or use
          of your UIC and your UIC has an expiry date clearly stated on the
          card.
        </Text>
        <Text style={[FontStyle.fontRegular16, styles.heading]}>
          Subscription and Minimum Balance
        </Text>
        <Text style={[FontStyle.fontRegular16]}>
          To subscribe for UIC, users need to answer 3 questions while
          onboarding. They will have to answer one question per month to keep
          the subscription active. For UIC account holders with a minimum
          balance (Rs. 1000/-) * the monthly question is optional, meaning they
          can choose to answer or skip (but will have to answer the initial 3
          questions while getting onboarded).
        </Text>
        <Text style={[FontStyle.fontRegular16, styles.heading]}>
          Receipts and Statements
        </Text>
        <Text style={[FontStyle.fontRegular16]}>
          Cardholders are not sent statements of itemized transactions from your
          Farmkart account. You can check the balance of your UIC in-store and
          online at our website. You can review the up to six months of your
          most recent transactions on your UIC online at www.farmkart.com. When
          you use your UIC, you will be offered a receipt but will not be asked
          to sign the receipt. The receipt will indicate that the purchase was
          made using a UIC and will provide the remaining balance of your card.
          You should retain your receipts from each transaction in order to
          ensure that your account balance is correct. You will need to produce
          your receipt in the event of a balance dispute.
        </Text>
        <Text style={[FontStyle.fontRegular16, styles.heading]}>
          Billing Errors, Corrections
        </Text>
        <Text style={[FontStyle.fontRegular16]}>
          We reserve the right to correct the balance of your UIC account if we
          believe that a clerical, billing or accounting error occurred. We
          shall have no liability for any billing error unless you provide us
          notice within sixty (60) days of the date of the transaction in
          question. You should monitor your transactions and account balances
          closely.
        </Text>
        <Text style={[FontStyle.fontRegular16, styles.heading]}>
          Liability for Unauthorized Transactions
        </Text>
        <Text style={[FontStyle.fontRegular16]}>
          Because your UIC is used like cash for purchases from Farmkart, you
          are responsible for all transactions associated with your UIC,
          including unauthorized transactions. However, if your UIC is lost,
          stolen, or destroyed, it can be replaced with the balance remaining on
          it, but only if you have registered with us. If your UIC becomes lost,
          stolen or damaged, you should contact us immediately by calling +91 88
          238 88238. You must provide your card number and you will be asked
          certain questions to verify your identity and questions concerning
          recent activity on your account. Your UIC balance is only protected
          from the point in time you notify us that your UIC is missing and we
          are able to verify ownership of the card. We will freeze the remaining
          balance on your UIC at the time you notify us and will load that
          remaining balance on a replacement UIC. Replacement cards should be
          collected from a Farmkart store.
        </Text>
        <Text style={[FontStyle.fontRegular16, styles.heading]}>
          General Terms and Conditions for the UIC
        </Text>
        <Text style={[FontStyle.fontRegular16, styles.heading]}>
          Privacy Policy
        </Text>
        <Text style={[FontStyle.fontRegular16]}>
          UIC collects the following information in connection with the
          registration of the UIC: your name, mailing address, phone number,
          e-mail and date of birth. Farmkart may use this information from time
          to time for the purposes of (a) establishing, administering and
          safeguarding your UIC account; (b) offering you rewards, offers or
          other products and services Farmkart feels you may enjoy; and (c) such
          other purposes as set out in Farmkart’s privacy policy which can be
          found at www.Farmkart.com.
        </Text>
        <Text style={[FontStyle.fontRegular16, styles.heading]}>
          Amendments to this Agreement
        </Text>
        <Text style={[FontStyle.fontRegular16]}>
          We may amend the terms or conditions of this agreement at any time,
          including any rights or obligations you or we may have. We will post
          the terms and conditions of the amended agreement on our website. As
          permitted by applicable law, any amendment will become effective at
          the time we post the amended agreement on our web site or as otherwise
          stated in our notice to you. Unless we state otherwise, the amendment
          will apply to your future and existing UIC account. You are deemed to
          accept the amendments if (1) you do not notify us to the contrary in
          writing within twenty (20) days of the date of our notice or such
          other time specified in the notice, or (2) you use your UIC after such
          notice period. If you do not accept the amendments, upon written
          request, your UIC will be canceled and any amounts remaining on a UIC
          will be refunded to you.
        </Text>
        <Text style={[FontStyle.fontRegular16, styles.heading]}>
          Suspension or Termination of this Agreement
        </Text>
        <Text style={[FontStyle.fontRegular16]}>
          We may suspend or terminate this agreement in whole or in part at any
          time and for any reason or no reason without notice or liability to
          you, including in connection with the termination of the UIC account.
          If we terminate this agreement without cause, we will refund or issue
          restaurant credits equal to the balance held in your UIC account.
        </Text>
        <Text style={[FontStyle.fontRegular16, styles.heading]}>
          Governing Law
        </Text>
        <Text style={[FontStyle.fontRegular16]}>
          This agreement shall be governed by and construed in accordance with
          the Federal law of India applicable therein, notwithstanding any
          conflict of law rules.
        </Text>
        <Text style={[FontStyle.fontRegular16, styles.heading]}>
          Arbitration
        </Text>
        <Text style={[FontStyle.fontRegular16]}>
          PLEASE READ THIS SECTION CAREFULLY. IT AFFECTS RIGHTS THAT YOU MAY
          OTHERWISE HAVE. IT PROVIDES FOR RESOLUTION OF MOST DISPUTES THROUGH
          ARBITRATION INSTEAD OF COURT TRIALS AND CLASS ACTIONS. ARBITRATION IS
          FINAL AND BINDING AND SUBJECT TO ONLY VERY LIMITED REVIEW BY A COURT.
          THIS ARBITRATION CLAUSE SHALL SURVIVE TERMINATION OF THIS AGREEMENT.
        </Text>
        <Text style={[FontStyle.fontRegular16, styles.heading]}>
          Binding Arbitration
        </Text>
        <Text style={[FontStyle.fontRegular16]}>
          This provision is intended to be interpreted broadly to encompass all
          disputes or claims arising out of our relationship. Any dispute or
          claim made by you against us arising out of or relating to this
          agreement or your use of the UIC (whether based in contract, tort,
          statute, fraud, misrepresentation or any other legal theory) will be
          resolved by binding arbitration except that (a) you may take claims to
          small claims court if they qualify for hearing by such a court, or (b)
          you or we may choose to pursue claims in court if the claims relate
          solely to the collection of any debts you owe to us. However, even for
          those claims that may be taken to court, you and we both waive any
          claims for punitive damages and any right to pursue claims on a class
          or representative basis.
        </Text>
        <Text style={[FontStyle.fontRegular16, styles.heading]}>
          Arbitration Procedures
        </Text>
        <Text style={[FontStyle.fontRegular16]}>
          You must first present any claim or dispute to us by contacting our
          Customer Service Department to allow us an opportunity to resolve the
          dispute. You may request arbitration if your claim or dispute cannot
          be resolved within sixty (60) days. Unless you and we agree otherwise,
          any arbitration will take place in Indore, Madhya Pradesh, and will be
          conducted in the Hindi language. An arbitrator may not award relief in
          excess of or contrary to what this agreement provides, order
          consolidation or arbitration on a class-wide or representative basis,
          or award punitive damages or any other damages aside from the
          prevailing party's actual damages, except that the arbitrator may
          award on individual basis damages required by statute and may order
          injunctive or declaratory relief pursuant to an applicable consumer
          protection statute. Any arbitration shall be confidential, and neither
          you nor we may disclose the existence, content or results of any
          arbitration, except as may be required by law or for purposes of
          enforcement of the arbitration award. Judgment on any arbitration
          award may be entered in any court having proper jurisdiction. If any
          portion of this arbitration clause is determined by a court to be
          inapplicable or invalid, then the remainder shall still be given full
          force and effect.
        </Text>
        <Text style={[FontStyle.fontRegular16, styles.heading]}>
          Costs of Arbitration
        </Text>
        <Text style={[FontStyle.fontRegular16]}>
          All administrative fees and expenses of an arbitration will be divided
          equally between you and us. In all arbitrations, each party will bear
          the expense of its own counsel, experts, witnesses and preparation and
          presentation of evidence at the arbitration.
        </Text>
        <Text style={[FontStyle.fontRegular16, styles.heading]}>
          Waiver of Punitive Damage Claims and Class Actions
        </Text>
        <Text style={[FontStyle.fontRegular16]}>
          By entering into this agreement, both you and we are waiving certain
          rights to litigate disputes in court. If for any reason this
          arbitration clause is deemed inapplicable or invalid, you and we both
          waive, to the fullest extent allowed by law, any claims to recover
          punitive or exemplary damages and any right to pursue any claims on a
          class or consolidated basis or in a representative capacity.
        </Text>
        <Text style={[FontStyle.fontRegular16, styles.heading]}>
          Disclaimers and Limits of Liability
        </Text>
        <Text style={[FontStyle.fontRegular16]}>
          IN THE EVENT THAT FARMKART IS FOUND LIABLE TO YOU, YOU SHALL ONLY BE
          ENTITLED TO RECOVER ACTUAL AND DIRECT DAMAGES AND SUCH DAMAGES SHALL
          NOT EXCEED THE LAST BALANCE HELD ON YOUR UIC PRIOR TO THE TIME AT
          WHICH SUCH DAMAGES AROSE. FARMKART HAS NO LIABILITY FOR ANY
          INCIDENTAL, INDIRECT, CONSEQUENTIAL, SPECIAL OR PUNITIVE DAMAGES
          (INCLUDING WITHOUT LIMITATION LOSS OF PROFIT, REVENUE, USE OR DATA)
          ARISING OUT OF OR IN ANY WAY CONNECTED WITH THIS AGREEMENT, WHETHER IN
          CONTRACT (INCLUDING FUNDAMENTAL BREACH), WARRANTY, TORT (INCLUDING
          NEGLIGENCE, WHETHER ACTIVE, PASSIVE OR IMPUTED), PRODUCT LIABILITY,
          STRICT LIABILITY OR OTHER THEORY, EVEN IF WE OR OUR AUTHORIZED
          REPRESENTATIVES HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
          IN NO EVENT SHALL FARMKART HAVE ANY LIABILITY FOR UNAUTHORIZED ACCESS
          TO, OR ALTERATION, THEFT OR DESTRUCTION OF UIC THROUGH ACCIDENT,
          MISUSE, OR FRAUDULENT MEANS OR DEVICES BY YOU OR ANY THIRD PARTY, OR
          AS A RESULT OF ANY DELAY OR MISTAKE RESULTING FROM ANY CIRCUMSTANCES
          BEYOND OUR CONTROL. SOME STATES/JURISDICTIONS DO NOT ALLOW THE
          EXCLUSION OR LIMITATION OF INCIDENTAL OR CONSEQUENTIAL DAMAGES, SO THE
          ABOVE LIMITATION OR EXCLUSION MAY NOT APPLY TO YOU.
        </Text>
        <Text style={[FontStyle.fontRegular16, styles.heading]}>
          Assignment
        </Text>
        <Text style={[FontStyle.fontRegular16]}>
          We may assign all or part of this agreement without notice to you. We
          are then released from all liability. The assignee shall have the same
          rights and obligations as the assignor and shall agree in writing to
          be bound by the terms and conditions of this agreement.
        </Text>
        <Text style={[FontStyle.fontRegular16, styles.heading]}>
          Entire Agreement
        </Text>
        <Text style={[FontStyle.fontRegular16]}>
          This agreement is the complete and exclusive statement of the
          agreement between you and Farmkart and supersedes and merges all prior
          proposals and all other agreements. In the event that any provision of
          this agreement shall be determined to be illegal or unenforceable,
          that provision will be eliminated to the minimum extent necessary so
          that this agreement shall otherwise remain in full force and effect
          and enforceable. Headings herein are for convenience of reference only
          and shall in no way affect the interpretation of this agreement.
        </Text>
        <Text style={[FontStyle.fontRegular16, styles.heading]}>
          Questions or Notices
        </Text>
        <Text style={[FontStyle.fontRegular16]}>
          If you have any questions or wish to send us any notice regarding this
          agreement or your UIC, please visit our website at
          http://www.farmkart.com or call us at +91 88238 88238.
        </Text>
      </View>
    );
  };

  const TermsInHindi = () => {
    return (
      <View style={{paddingHorizontal: 16}}>
        <Text style={[FontStyle.fontHeavy20, {marginBottom: 8}]}>
          UIC की नियम और शर्तें
        </Text>
        <Text style={FontStyle.fontRegular16}>
          महत्वपूर्ण - कृपया पढ़ें: निम्नलिखित एग्रीमेंट में आपके UIC प्री-पेड
          अकाउंट पर लागू होने वाले नियमों और शर्तों का वर्णन किया गया है, जो
          आपके और फार्मकार्ट ऑनलाइन सर्विसेज प्राइवेट लिमिटेड के बीच है।
        </Text>
        <Text style={FontStyle.fontRegular16}>
          UIC का उपयोग करके, आप इस एग्रीमेंट के नियमों और शर्तों से सहमत है।
          कृपया अपने रिकॉर्ड के लिए इस एग्रीमेंट की एक कॉपी रखें। इस एग्रीमेंट
          की नियम और शर्तें आपके या किसी अन्य व्यक्ति द्वारा UIC के उपयोग को
          नियंत्रित करेंगी जिनके पास UIC है या वे इसका उपयोग करते है|
        </Text>
        <Text style={[FontStyle.fontRegular16, styles.heading]}>
          आपके UIC अकाउंट के बारे में
        </Text>
        <Text style={[FontStyle.fontRegular16, styles.heading]}>
          केवल फार्मकार्ट से ख़रीददारी के लिए
        </Text>
        <Text style={[FontStyle.fontRegular16]}>
          UIC आपको www.farmkart.com या हमारे सुपरस्टोर से ख़रीददारी के लिए अपने
          UIC में रुपये लोड करने की अनुमति देता है। UIC के साथ कोई भी जमा खाता,
          क्रेडिट लाइन या ओवरड्राफ्ट सुविधा उपलब्ध नहीं है। जब तक कानून द्वारा
          आवश्यक या इस एग्रीमेंट द्वारा अनुमति नहीं दी जाती है, तो आपके UIC में
          उपलब्ध कोई भी राशि वापस नहीं की जा सकती और किसी भी फार्मकार्ट स्टोर पर
          नकद के लिए रिडीम नहीं की जा सकती है। आपके UIC में जमा धनराशि पर
          फार्मकार्ट द्वारा आपको कोई भी ब्याज, लाभांश, कोई अन्य कमाई या भुगतान
          जमा नहीं किया जायेगा। UIC से जुड़े मूल्य का किसी भी बीमा कंपनी द्वारा
          बीमा नहीं किया जाता है। UIC का उपयोग फार्मकार्ट सुपरस्टोर और
          www.farmkart.com पर मौजूद ऑनलाइन स्टोर तक ही सीमित है। यदि हम उचित रूप
          से मानते हैं कि यह उपयोग अनाधिकृत, धोखाधड़ी संबंधित या ग़ैरक़ानूनी है,
          तो हम किसी भी UIC को स्वीकार करने, लोड करने, पुनः लोड करने या फिर से
          जारी करने या UIC के उपयोग को सीमित करने का अधिकार सुरक्षित रखते हैं ।
        </Text>
        <Text style={[FontStyle.fontRegular16, styles.heading]}>
          अपने कार्ड में रुपये लोड और री-लोड करने हेतु
        </Text>
        <Text style={[FontStyle.fontRegular16]}>
          आप UIC में फार्मकार्ट स्टोर पर नकदी देकर, एक मान्य क्रेडिट कार्ड या
          डेबिट कार्ड (जहां उपलब्ध हो) का उपयोग कर रुपये लोड (या री-लोड) कर सकते
          हैं। आप ऑनलाइन भी www.farmkart.com और फार्मकार्ट एप पर एक मान्य
          क्रेडिट कार्ड या डेबिट कार्ड का उपयोग कर UIC में रुपये री-लोड कर सकते
          हैं| लोड की गई राशि तुरंत आपके UIC पर दिखाई देगी। वर्तमान में, आप अपने
          UIC में न्यूनतम 100 रुपये से लेकर अधिकतम 50,000 रुपये लोड कर सकते हैं।
          ऑनलाइन रिचार्ज के लिए यह राशि 1000 रुपये निर्धारित की गई है।
          फार्मकार्ट किसी भी समय अपने विवेकाधिकार के अनुसार इस अधिकतम या न्यूनतम
          राशि को बदल सकता है, और हम ऐसे हर परिवर्तन को ऑनलाइन पोस्ट करेंगे।
          आपके UIC पर लोड की गई राशि INR ("बेस मुद्रा") में रखी जाती है और अंकित
          होती है।
        </Text>
        <Text style={[FontStyle.fontRegular16, styles.heading]}>
          कार्ड बैलेंस के लिए शुल्क और समाप्ति(एक्सपायरी)
        </Text>
        <Text style={[FontStyle.fontRegular16]}>
          फार्मकार्ट आपको UIC जारी करने, एक्टिवेट या उसके उपयोग के लिए कोई शुल्क
          नहीं लेता है और आपके UIC कार्ड पर स्पष्ट रूप से एक समाप्ति तिथि
          (एक्सपायरी डेट) है।
        </Text>
        <Text style={[FontStyle.fontRegular16, styles.heading]}>
          सब्स्क्रिप्शन और न्यूनतम राशि
        </Text>
        <Text style={[FontStyle.fontRegular16]}>
          UIC सब्स्क्रिप्शन के लिए, उपभोक्ताओं को ऑनबोर्डिंग के समय 3 सवालों के
          जवाब देने होंगे। इसके अलावा अपने खाते को जारी रखने के लिए, उन्हें हर
          महीने एक सवाल का जवाब देना होगा। जिन UIC उपयोगकर्ताओं के खाते में
          न्यूनतम 1000 रुपये की राशि जमा है, उनके लिए हर महीने पूछा जाने वाला
          सवाल वैकल्पिक होगा। यानी वे उस सवाल को स्किप भी कर सकते हैं (पर उन्हें
          ऑनबोर्डिंग के समय 3 सवालों के जवाब देने होंगे)।
        </Text>
        <Text style={[FontStyle.fontRegular16, styles.heading]}>
          रसीदें और स्टेटमेंट
        </Text>
        <Text style={[FontStyle.fontRegular16]}>
          कार्डधारकों को उनके फार्मकार्ट अकाउंट से लिस्टेड लेनदेन के स्टेटमेंट
          नहीं भेजे जाते हैं। आप हमारी वेबसाइट पर अपने UIC इन-स्टोर और ऑनलाइन की
          शेष राशि की जांच कर सकते हैं। आप www.farmkart.com पर अपने UIC ऑनलाइन
          के पिछले छह महीने तक के लेनदेन रिव्यु कर सकते हैं। जब आप अपने UIC का
          उपयोग करते हैं, तो आपको रसीद दी जाएगी लेकिन रसीद पर हस्ताक्षर करने के
          लिए नहीं कहा जाएगा। रसीद इंगित करेगी कि खरीदी UIC का उपयोग करके की गई
          थी और आपके कार्ड की शेष राशि बताएगी। यह सुनिश्चित करने के लिए कि आपका
          अकाउंट बैलेंस सही है, आपको प्रत्येक लेनदेन से प्राप्त रसीदें रखनी
          होंगी। अकाउंट बैलेंस के मतभेद की स्थिति में आपको अपनी रसीद प्रस्तुत
          करनी होंगी|
        </Text>
        <Text style={[FontStyle.fontRegular16, styles.heading]}>
          बिलिंग त्रुटियां, सुधार
        </Text>
        <Text style={[FontStyle.fontRegular16]}>
          हम आपके UIC अकाउंट के बैलेंस को सही करने का अधिकार सुरक्षित रखते हैं,
          यदि हम मानते हैं कि एक लिपिक, बिलिंग या लेखांकन त्रुटि हुई है। जब तक
          आप हमें लेनदेन की तारीख के साठ (60) दिनों के भीतर नोटिस प्रदान नहीं
          करते हैं, तब तक हमारा किसी भी बिलिंग त्रुटि के लिए कोई उत्तरदायित्व
          नहीं होगा। आपको अपने लेनदेन और अकाउंट बैलेंस की बारीकी से निगरानी करनी
          होंगी।
        </Text>
        <Text style={[FontStyle.fontRegular16, styles.heading]}>
          अनाधिकृत लेनदेन के लिए उत्तरदायित्व
        </Text>
        <Text style={[FontStyle.fontRegular16]}>
          क्योंकि आपके UIC को फार्मकार्ट से खरीद के लिए नकद की तरह उपयोग किया
          जाता है, आप अनाधिकृत लेनदेन सहित अपने UIC से जुड़े सभी लेनदेन के लिए
          ज़िम्मेदार हैं। हालांकि, अगर आपका UIC गुम हो गया है, चोरी हो गया है,
          या क्षतिग्रस्त हो गया है, तो इसे शेष राशि के साथ रिप्लेस किया जा सकता
          है, लेकिन केवल तभी जब आप हमारे साथ रजिस्टर करते हैं। यदि आपका UIC गुम
          हो जाता है, चोरी हो जाता है या क्षतिग्रस्त हो जाता है, तो आपको तुरंत
          +91 88 238 88238 पर कॉल करके हमसे संपर्क करना चाहिए। आपको अपना कार्ड
          नंबर देना होगा और आपको अपनी पहचान को वेरीफाई करने और अपने अकाउंट पर
          हालिया गतिविधि से संबंधित कुछ प्रश्न पूछे जाएंगे। आपका UIC बैलेंस केवल
          उस समय से सुरक्षित है जब आप हमें सूचित करते हैं कि आपका UIC गुम हो गया
          है और हम कार्ड के स्वामित्व को वेरीफाई करने में सक्षम हैं। जब आप हमें
          सूचित करेंगे तो हम आपके UIC में उपलब्ध शेष राशि को फ्रीज कर देंगे और
          यूआईसी के रिप्लेसमेन्ट पर शेष राशि लोड करेंगे। रिप्लेसमेन्ट कार्ड को
          फार्मकार्ट स्टोर से प्राप्त करना होगा।
        </Text>
        <Text style={[FontStyle.fontRegular16, styles.heading]}>
          UIC के लिए सामान्य नियम और शर्तें
        </Text>
        <Text style={[FontStyle.fontRegular16, styles.heading]}>
          प्राइवेसी पॉलिसी
        </Text>
        <Text style={[FontStyle.fontRegular16]}>
          UIC रजिस्ट्रेशन के लिए निम्नलिखित जानकारी एकत्र करती है: आपका नाम, डाक
          पता, फोन नंबर, ई-मेल और जन्म तिथि। फार्मकार्ट समय-समय पर इस जानकारी का
          उपयोग इन उद्देश्यों से कर सकता है (a) आपके UIC अकाउंट की स्थापना,
          प्रबंधन और सुरक्षा के लिए; (b) आपको पुरस्कार, ऑफ़र या अन्य उत्पादों और
          सेवाओं की पेशकश के लिए; और (c) फार्मकार्ट की प्राइवेसी पॉलिसी में
          निर्धारित अन्य उद्देश्यों के लिए को जो www.farmkart.com पर उपलब्ध है।
        </Text>
        <Text style={[FontStyle.fontRegular16, styles.heading]}>
          इस एग्रीमेंट में संशोधन
        </Text>
        <Text style={[FontStyle.fontRegular16]}>
          हम किसी भी समय इस एग्रीमेंट की नियम या शर्तें, आपके या हमारे किसी भी
          अधिकार या दायित्व को संशोधित कर सकते हैं। हम अपनी वेबसाइट पर संशोधित
          एग्रीमेंट की नियम और शर्तों को पोस्ट करेंगे। लागू कानून द्वारा अनुमति
          होने पर, कोई संशोधन तब ही प्रभावी हो जाएगा जब हम हमारी वेबसाइट पर
          संशोधित एग्रीमेंट को पोस्ट करते हैं या आपको हमारे द्वारा भेजे गए नोटिस
          में सूचित करते है। जब तक हम नहीं बताएंगे, संशोधन आपके भविष्य और मौजूदा
          UIC अकाउंट पर लागू होगा। आपके द्वारा संशोधनों को स्वीकृत समझा जाएगा
          यदि (1) आप हमें हमारे नोटिस की तारीख के बीस (20) दिनों या नोटिस में
          निर्दिष्ट अन्य समय के भीतर लिखने के विपरीत हमें सूचित नहीं करते हैं,
          या (2) आप ऐसी सूचना अवधि के बाद भी अपने UIC का उपयोग करते हैं । यदि आप
          संशोधन स्वीकार नहीं करते हैं, लिखित अनुरोध पर, आपका UIC रद्द कर दिया
          जाएगा और UIC की शेष राशि आपको वापस कर दी जाएगी।
        </Text>
        <Text style={[FontStyle.fontRegular16, styles.heading]}>
          इस एग्रीमेंट का निलंबन या समाप्ति
        </Text>
        <Text style={[FontStyle.fontRegular16]}>
          हम UIC अकाउंट को समाप्त करने के संबंध में, इस एग्रीमेंट को पूरी तरह से
          या भाग में किसी भी समय किसी भी कारण से या बिना किसी कारण या
          उत्तरदायित्व के निलंबित या समाप्त कर सकते हैं। यदि हम बिना किसी कारण
          के इस एग्रीमेंट को समाप्त करते हैं, तो हम आपके UIC अकाउंट में बची हुई
          राशि वापस कर देंगे या उसके बराबर रेस्टोरेंट क्रेडिट जारी कर देंगे।
        </Text>
        <Text style={[FontStyle.fontRegular16, styles.heading]}>
          शासकीय कानून
        </Text>
        <Text style={[FontStyle.fontRegular16]}>
          इस एग्रीमेंट को, कानून नियमों के किसी भी टकराव के बावजूद, भारत के
          संघीय कानून के अनुसार लागू और नियंत्रित किया जाएगा।
        </Text>
        <Text style={[FontStyle.fontRegular16, styles.heading]}>मध्यस्थता</Text>
        <Text style={[FontStyle.fontRegular16]}>
          कृपया इस अनुभाग को सावधानी से पढ़ें। यह उन अधिकारों को प्रभावित करता
          है जो आपके पास हो सकते हैं। इसमें अधिक से अधिक मतभेद के समाधान
          मध्यस्थता द्वारा, न की न्यायालय परीक्षण और वर्ग अधिनियमों से, करने का
          प्रावधान है। मध्यस्थता अंतिम और बाध्यकारी है और केवल न्यायालय द्वारा
          बहुत सीमित समीक्षा के अधीन है। यह मध्यस्थता खंड/ क्लॉज़ एग्रीमेंट के
          समाप्ति के बाद भी बना रहेगा।
        </Text>
        <Text style={[FontStyle.fontRegular16, styles.heading]}>
          बाध्यकारी मध्यस्थता
        </Text>
        <Text style={[FontStyle.fontRegular16]}>
          इस प्रावधान का उद्देश्य हमारे संबंधों से उत्पन्न होने वाले सभी विवादों
          या दावों को शामिल करने के लिए व्यापक रूप से व्याख्या करना है। हमारे
          खिलाफ आपके द्वारा किए गए किसी भी विवाद या दावे जो इस एग्रीमेंट से
          संबंधित या आपके द्वारा UIC के उपयोग से संबंधित हो (चाहे अनुबंध, टोर्ट,
          क़ानून, धोखाधड़ी, ग़लतफहमी या किसी अन्य कानूनी सिद्धांत में आधारित) का
          हल बाध्यकारी मध्यस्थता के माध्यम से किया जाएगा निम्नलिखित के सिवाय (a)
          यदि आप ऐसी अदालत द्वारा सुनवाई के लिए अर्हता प्राप्त करते हैं, तो आप
          छोटे दावों के न्यायालय के दावों का दावा कर सकते हैं, या (b) आप या हम
          अदालत में दावा कर सकते हैं यदि दावे पूरी तरह से हमारे द्वारा आपको दिए
          गए ऋण से संबंधित हैं। हालांकि, उन दावों के लिए भी जिन्हें अदालत में ले
          जाया जा सकता है, आप और हम दोनों दंडनीय क्षति के लिए किसी भी दावे को
          किसी वर्ग या प्रतिनिधि आधार पर आगे बढ़ाने का कोई भी अधिकार छोड़ देते
          हैं।.
        </Text>
        <Text style={[FontStyle.fontRegular16, styles.heading]}>
          मध्यस्थता प्रक्रियाएं
        </Text>
        <Text style={[FontStyle.fontRegular16]}>
          हमें सबसे पहले विवाद को हल करने का मौका देने के लिए हमारे ग्राहक सेवा
          विभाग से संपर्क करके हमें कोई दावा या विवाद प्रस्तुत करना होगा। यदि
          आपका दावा या विवाद साठ (60) दिनों के भीतर हल नहीं किया जा सकता है तो
          आप मध्यस्थता का अनुरोध कर सकते हैं। जब तक आप और हम अन्यथा सहमत नहीं
          हैं, कोई भी मध्यस्थता इंदौर, मध्य प्रदेश में होगी और हिंदी भाषा में
          आयोजित की जाएगी। एक मध्यस्थ इस एग्रीमेंट के मुकाबले या उससे अधिक के
          विपरीत राहत प्रदान नहीं कर सकता है, वर्ग के व्यापक या प्रतिनिधि आधार
          पर आदेश समेकन या मध्यस्थता, या वर्तमान पार्टी के वास्तविक नुकसान से
          अलग दंडनीय क्षति या किसी अन्य नुकसान का पुरस्कार, सिवाय इसके कि
          मध्यस्थ कानून द्वारा आवश्यक व्यक्तिगत आधार के नुकसान पर पुरस्कार और
          लागू उपभोक्ता संरक्षण कानून के अनुसार निषेधात्मक या घोषणात्मक राहत का
          आदेश दे सकता है। कोई भी मध्यस्थ गोपनीय होगा, न तो आप और न ही हम किसी
          भी मध्यस्थता के अस्तित्व, सामग्री या परिणामों का खुलासा कर सकते हैं,
          सिवाय इसके कि कानून द्वारा या मध्यस्थता पुरस्कार के प्रवर्तन के
          प्रयोजनों के लिए आवश्यक हो। किसी भी मध्यस्थता पुरस्कार पर किसी भी
          न्यायालय में निर्णय दर्ज किया जा सकता है। यदि इस मध्यस्थता खंड का कोई
          भी हिस्सा अदालत द्वारा अपरिहार्य या अमान्य होने के लिए निर्धारित किया
          जाता है, तो शेष को अभी भी पूर्ण प्रभाव दिया जाएगा।
        </Text>
        <Text style={[FontStyle.fontRegular16, styles.heading]}>
          मध्यस्थता की लागत
        </Text>
        <Text style={[FontStyle.fontRegular16]}>
          सभी प्रशासनिक शुल्क और मध्यस्थता के खर्च आपके और हमारे बीच समान रूप से
          विभाजित किए जाएंगे। सभी मध्यस्थता में, प्रत्येक पक्ष मध्यस्थता पर अपने
          स्वयं के वकील, विशेषज्ञों, गवाहों और तैयारी और सबूत की प्रस्तुति का
          खर्च उठाएगा।
        </Text>
        <Text style={[FontStyle.fontRegular16, styles.heading]}>
          दंडनीय क्षति दावों और वर्ग क्रियाओं का छूट
        </Text>
        <Text style={[FontStyle.fontRegular16]}>
          इस एग्रीमेंट में प्रवेश करके, आप दोनों और हम अदालत में विवादों को
          मुकदमा चलाने के कुछ अधिकार छोड़ रहे हैं। यदि किसी भी कारण से यह
          मध्यस्थता खंड अयोग्य या अमान्य समझा जाता है, तो आप और हम दोनों कानून
          द्वारा अनुमत पूर्ण सीमा तक, दंडनीय या अनुकरणीय क्षतिपूर्ति के किसी भी
          दावों और किसी वर्ग या समेकित आधार या प्रतिनिधि क्षमता पर किसी भी दावे
          को आगे बढ़ाने का अधिकार छोड़ देते हैं।
        </Text>
        <Text style={[FontStyle.fontRegular16, styles.heading]}>
          अस्वीकरण और दायित्वों की सीमाएं
        </Text>
        <Text style={[FontStyle.fontRegular16]}>
          किसी घटना के कारण यदि फार्मकार्ट आपको उत्तरदायी है तो आप केवल वास्तविक
          और प्रत्यक्ष क्षतिपूर्ति प्राप्त करेंगे और इस तरह के नुकसान उस समय तक
          आपके UIC में उपलब्ध अंतिम शेष राशि से अधिक नहीं होना चाहिए| फार्मकार्ट
          का कोई भी उत्तरदायित्व नहीं होगा इस अनुबंध के साथ जुड़े किसी भी तरह की
          आकस्मिक, अप्रत्यक्ष, परिणामी, विशेष या हानिकारक क्षति (जिसमें लाभ,
          रिव्यू, उपयोग या डेटा की सीमा हानि शामिल है) द्वारा किसी भी तरीके से
          उत्पन्न होने वाली चाहे अनुबंध में (मौलिक उल्लंघन सहित), वारंटी,
          अपकृत्य (निजता चाहे सक्रिय निष्क्रिय), उत्पाद उत्तरदायित्व, कठोर
          उत्तरदायित्व या अन्य सिद्धांत, भले ही हम या हमारे अधिकृत प्रतिनिधियों
          को इस तरह की क्षति की संभावना की सलाह दी गई हो| फार्मकार्ट का कोई भी
          उत्तरदायित्व नहीं होगा यदि आपके द्वारा या किसी थर्ड पार्टी द्वारा किसी
          भी समय देरी या गलती के परिणामस्वरूप, या आपके द्वारा निष्पादित साधनों
          या उपकरणों के माध्यम से UIC के उल्लंघन, चोरी, या निष्कासन होता है किसी
          भी घटना में जो हमारे नियंत्रण से परे है । कुछ राज्य/अधिकार - क्षेत्र
          आकस्मिक या परिणामी क्षतियों के बहिष्करण या सीमा को अनुमति नहीं देते
          हैं, इसलिए उपरोक्त सीमा या बहिष्करण आपके लिए लागू नहीं होंगी।
        </Text>
        <Text style={[FontStyle.fontRegular16, styles.heading]}>असाइनमेंट</Text>
        <Text style={[FontStyle.fontRegular16]}>
          हम आपको बिना किसी सूचना के इस एग्रीमेंट के सभी या हिस्से को असाइन कर
          सकते हैं। तब हम सारे दायित्वों से मुक्त हो जायेगें। असाइनर के पास
          असाइनी के समान अधिकार और दायित्व होंगे और इस एग्रीमेंट के नियमों और
          शर्तों से बाध्य होने के लिए लिखित में सहमत होंगे।
        </Text>
        <Text style={[FontStyle.fontRegular16, styles.heading]}>
          संपूर्ण एग्रीमेंट
        </Text>
        <Text style={[FontStyle.fontRegular16]}>
          यह एग्रीमेंट आपके और फार्मकार्ट के बीच एग्रीमेंट का पूर्ण और एकमात्र
          विवरण है और सभी पूर्व प्रस्तावों और अन्य सभी एग्रीमेंट को हटाकर उन्हें
          विलय करता है। यदि इस एग्रीमेंट के किसी भी प्रावधान को अवैध या लागू
          करने के लिए अमान्य माना जाएगा, तो वह प्रावधान न्यूनतम सीमा तक समाप्त
          हो जाएगा ताकि यह समझौता अन्यथा पूरे प्रभाव से लागू हो सके। यहां शीर्षक
          केवल संदर्भ की सुविधा के लिए हैं और इस एग्रीमेंट की व्याख्या को
          प्रभावित नहीं करेंगे।
        </Text>
        <Text style={[FontStyle.fontRegular16, styles.heading]}>
          प्रश्न या नोटिस
        </Text>
        <Text style={[FontStyle.fontRegular16]}>
          यदि आपके कोई प्रश्न हैं या हमें इस एग्रीमेंट या आपके UIC के बारे में
          कोई सूचना भेजना चाहते है, तो कृपया हमारी वेबसाइट
          http://www.farmkart.com पर जाएं या हमें +91 88238 88238 पर कॉल करें।
        </Text>
      </View>
    );
  };

  return (
    <View style={{flex: 1}}>
      <ScrollView style={[CommonStyle.sheet]}>
        <Pressable onPress={goBack} style={{padding: 20, width: 50}}>
          <CloseBlack />
        </Pressable>
        {currentLang == 'en' ? (
          <TermsInEng />
        ) : currentLang == 'hi' ? (
          <TermsInHindi />
        ) : (
          <TermsInEng />
        )}
      </ScrollView>
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
          title={translate('__CLOSE__')}
          bgBlack
          fontSize={16}
          onPress={() => navigation.goBack()}
        />
      </View>
    </View>
  );
};

export default UICTermsAndCondition;

const styles = StyleSheet.create({
  heading: {
    marginVertical: 8,
    fontWeight: '700',
  },
});
