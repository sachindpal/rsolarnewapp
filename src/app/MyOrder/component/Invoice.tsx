import {
  ActivityIndicator,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import { ColorVariable, CommonStyle } from '../../../asset/style/commonStyle';
import { CloseBlack, DarkLogo } from '../../../asset/img';
import { FontStyle } from '../../../asset/style/FontsStyle';
import TextTranslation from '../../commonResources/component/CommonInput/TextTranslation';
import { ScrollView } from 'react-native-gesture-handler';
import { t } from 'i18next';

interface DataType {
  openAndCloseInvoiceModal: any;
  InvoiceModal: boolean;
  isLoadingInvoice: boolean;
  orderInvoice: any;
  orderStatus: any
}

const Invoice = ({
  openAndCloseInvoiceModal,
  InvoiceModal,
  orderInvoice,
  isLoadingInvoice,
  orderStatus
}: DataType) => {
  console.log('props======== ', orderInvoice);
  const terms = [
    'हम विक्रेता है,निर्माता नहीं |',
    ' कृषि आदानो के उपयोग पर हमारा कोई नियंत्रण नहीं है ,इसलिए बिल में लिखित माल के परिणामो की जवाबदारी हमारी नहीं है |',
    'कृपया खरीदी के समय सील, वजन, कीमत, अवसान तिथि व लिकेज की जाँच कर ही माल ख़रीदे |',
    'किसी भी परिस्थिति में बीज की उत्पादन क्षमता या अंकुरण क्षमता की जवाबदारी हमारी नहीं रहेगी |',
    'न्याय क्षेत्र बड़वानी रहेगा |',
  ];
  console.log("==========orderInvoice===========", orderInvoice)
  const OrderInfo = ({ title, value }: any) => {
    return (
      <>
        <View
          style={[
            { paddingHorizontal: 16, paddingBottom: 8 },
            CommonStyle.flex_dirRow_alignCenter_justifySpbtw,
          ]}>
          <TextTranslation
            style={[FontStyle.fontRegular16, { color: ColorVariable.gray }]}
            text={title}
          />

          <View style={{ flex: 1, alignItems: 'flex-end', marginLeft: 50 }}>
            <Text style={[FontStyle.fontHeavy16]}>{value}</Text>
          </View>
        </View>
      </>
    );
  };
  const OrderInfoBenifit = ({ title, value }: any) => {
    return (
      <>
        <View
          style={[
            { paddingHorizontal: 16, paddingBottom: 8 },
            CommonStyle.flex_dirRow_alignCenter_justifySpbtw,
          ]}>
          <TextTranslation
            style={[
              FontStyle.fontMedium16,
              { color: ColorVariable.farmkartGreen },
            ]}
            text={title}
          />

          <View style={{ flex: 1, alignItems: 'flex-end', marginLeft: 50 }}>
            <Text
              style={[
                FontStyle.fontMedium16,
                { color: ColorVariable.farmkartGreen },
              ]}>
              {value}
            </Text>
          </View>
        </View>
      </>
    );
  };
  const OrderInfoGray = ({ title, value }: any) => {
    return (
      <>
        <View
          style={[
            { paddingHorizontal: 16, paddingBottom: 8 },
            CommonStyle.flex_dirRow_alignCenter_justifySpbtw,
          ]}>
          <TextTranslation
            style={[FontStyle.fontMedium16, { color: ColorVariable.gray }]}
            text={title}
          />

          <View style={{ flex: 1, alignItems: 'flex-end', marginLeft: 50 }}>
            <Text style={[FontStyle.fontMedium16]}>{value}</Text>
          </View>
        </View>
      </>
    );
  };

  const TermAndCondition = () => {
    return (
      <View style={{ marginBottom: 24 }}>
        <Text style={[FontStyle.fontHeavy14, { marginLeft: 8, marginBottom: 8 }]}>
          नियम एवं शर्ते*
        </Text>
        {terms.map((item, index) => {
          return (
            <View key={index} style={{ flexDirection: 'row', marginRight: 8 }}>
              <Text style={FontStyle.fontMedium12}>{index + 1}. </Text>
              <Text style={FontStyle.fontMedium12}>{item}</Text>
            </View>
          );
        })}
        {orderInvoice.retailerDetails.map((item: any, index: any) => {
          return (
            <View key={index} style={{ flexDirection: 'row', marginRight: 8 }}>
              <Text style={FontStyle.fontMedium12}>{index + 6}. </Text>
              <Text style={FontStyle.fontMedium12}>
                {item.shop_name} लायसेन्स: Seeds-{item.seed_licence_number},
                Pesticides-{item.pesticide_licence_number}, Fertilizers-
                {item.fertilizer_licence_number} & Horticulture-
                {item.horticulture_licence_number}
                {item.shop_name != 'Farmkart' ? `, GSTIN:${item.gst}` : null}
              </Text>
            </View>
          );
        })}
      </View>
    );
  };

  return (
    <Modal visible={InvoiceModal} animationType="slide" transparent>
      <ScrollView style={CommonStyle.sheet}>
        <Pressable
          onPress={() => openAndCloseInvoiceModal(null)}
          style={{ paddingHorizontal: 20, paddingVertical: 20, width: 55 }}>
          <CloseBlack />
        </Pressable>
        <View style={{ alignItems: 'center', marginTop: 2 }}>
          <DarkLogo />
          <TextTranslation
            style={[FontStyle.fontHeavy14, { marginTop: 8 }]}
            text={'__TAX_INVOICE__'}
          />
        </View>
        {!isLoadingInvoice ? (

          <View style={{ marginTop: 36 }}>
            <View style={{ alignItems: 'center' }}>
              <View style={{ alignItems: 'center', paddingTop: 12, marginBottom: 28, borderRadius: 6, borderColor: '#DCE0EF', borderStyle: 'solid', borderWidth: 1, width: '98%' }}>
                <View
                  style={[
                    { paddingHorizontal: 16, paddingBottom: 8 },
                    CommonStyle.flex_dirRow_alignCenter_justifySpbtw,
                  ]}>
                  <TextTranslation
                    style={[FontStyle.fontRegular16, { color: ColorVariable.gray }]}
                    text={'Status'}
                  />

                  <View style={{ flex: 1, alignItems: 'flex-end', marginLeft: 50 }}>
                    <Text style={[FontStyle.fontHeavy16]}>{orderStatus}</Text>
                  </View>
                </View>
              </View>
            </View>


            <OrderInfo
              title={'__CUSTOMER_NAME__'}
              value={orderInvoice.invoice_details.fullname}
            />
            <OrderInfo
              title={'__PHONE_NO__'}
              value={orderInvoice.invoice_details.mobileno}
            />
            <OrderInfo
              title={'__DISTRICT__'}
              value={orderInvoice.invoice_details.districtname}
            />
            <OrderInfo
              title={'__TEHSIL__'}
              value={orderInvoice.invoice_details.tehsilname}
            />
            <OrderInfo
              title={'__ADDRESS_LANDMARK__'}
              value={orderInvoice.invoice_details.address}
            />
            <OrderInfo
              title={'__STATE__'}
              value={orderInvoice.invoice_details.statename}
            />
            <OrderInfo
              title={'__PINCODE__'}
              value={orderInvoice.invoice_details.pincode}
            />

            <View style={styles.line} />
            <OrderInfo
              title={'__ORDER_NO__'}
              value={orderInvoice.invoice_details.orderid}
            />
            <OrderInfo
              title={'__ORDER_DATE__'}
              value={orderInvoice.invoice_details.orderdatetime}
            />
            <OrderInfo
              title={'__INVOICE_NO__'}
              value={orderInvoice.invoice_details.invoice_id}
            />
            <OrderInfo
              title={'__INVOICE_DATE__'}
              value={orderInvoice.invoice_details.orderdatetime}
            />
            <View style={styles.line} />
            <OrderInfo title={''} value={'Amount'} />
            <Text
              style={[
                FontStyle.fontMedium14,
                {
                  color: ColorVariable.gray,
                  textAlign: 'right',
                  paddingHorizontal: 16,
                },
              ]}>
              (Incl. of GST)
            </Text>
            {orderInvoice.order_details.map((item: any, index: any) => {
              return (
                <>
                  <View
                    style={[
                      {
                        paddingHorizontal: 16,
                        paddingVertical: 8,
                        flex: 1,
                      },
                      CommonStyle.flex_dirRow_justifySpbtw,
                    ]}
                    key={index}>
                    <View style={{ flexDirection: 'row', flex: 1 }}>
                      <Text style={[FontStyle.fontHeavy16]}>{index + 1}.</Text>
                      <View style={{ flex: 1 }}>
                        <Text style={[FontStyle.fontHeavy16]}>{item.name}</Text>
                        <Text
                          style={[
                            FontStyle.fontMedium14,
                            { color: ColorVariable.gray },
                          ]}>
                          {t('__QUANTITY_SMALL__')}: {item.quantity}
                        </Text>
                      </View>
                    </View>

                    <View style={{ alignItems: 'flex-end', marginLeft: 50 }}>
                      <Text style={[FontStyle.fontHeavy16]}>
                        {item.price}
                      </Text>
                    </View>
                  </View>
                </>
              );
            })}
            <View style={styles.line} />
            <OrderInfoGray
              title={`${t('__PRICE__')} (incl. taxes)`}
              value={`₹${orderInvoice.invoice_details.standard_sum}`}
            />
            <OrderInfoBenifit
              title={'__UIC_DISCOUNTS__'}
              value={`-₹${orderInvoice.invoice_details.standard_sum - orderInvoice.invoice_details.order_total}`}
            />
            <OrderInfoBenifit
              title={'__EXTRA_CHECKOUT_DISCOUNT__'}
              value={`-₹${orderInvoice.invoice_details.uic_advance_saving
                  ? orderInvoice.invoice_details?.uic_advance_saving
                  : 0
                }`}
            />
            <OrderInfoBenifit
              title={'_PROMOCODE_DISCOUNT_'}
              value={`-₹${orderInvoice.invoice_details.promoDiscount}`}
            />
            <OrderInfoGray
              title={'__SHIPPING__'}
              value={`₹${orderInvoice.invoice_details.shipping}`}
            />
            <View
              style={[
                styles.totalView,
                CommonStyle.flex_dirRow_alignCenter_justifySpbtw,
              ]}>
              <TextTranslation
                style={[FontStyle.fontHeavy16]}
                text={'__SUB_TOTAL__'}
              />
              <View style={{ flex: 1, alignItems: 'flex-end', marginLeft: 50 }}>
                <Text
                  style={[
                    FontStyle.fontHeavy16,
                  ]}>{`₹${orderInvoice.invoice_details.subtotal}`}</Text>
              </View>
            </View>
            <OrderInfoGray
              title={'__PAID_THROUGH_UIC__'}
              value={`-₹${orderInvoice.invoice_details.paid_using_uic}`}
            />

            <OrderInfoGray
              title={'__PARTIAL_PAYMENT__'}
              value={`-₹${orderInvoice.invoice_details.partialPayment}`}
            />
            <OrderInfoGray
              title={'__PAID_ONLINE__'}
              value={`₹${orderInvoice.invoice_details.paid_online}`}
            />
            <OrderInfoGray
              title={'__CASH_ON_DELIVERY__'}
              value={`₹${orderInvoice.invoice_details.cod}`}
            />
            <View style={styles.productInfo}>
              {orderInvoice.order_details.map((item: any, index: any) => {
                return (
                  <View style={styles.productView} key={index}>
                    <View style={{ flexDirection: 'row', width: '70%' }}>
                      <Text style={FontStyle.fontMedium14}>{index + 1} </Text>
                      <Text style={[FontStyle.fontHeavy14]}>{item.name}</Text>
                    </View>
                    <View
                      style={[
                        CommonStyle.flex_dirRow_alignCenter_justifySpbtw,
                      ]}>
                      <TextTranslation
                        style={[
                          FontStyle.fontMedium14,
                          { color: ColorVariable.gray },
                        ]}
                        text={'__SUPPLIER_NAME__'}
                      />

                      <View
                        style={{
                          flex: 1,
                          alignItems: 'flex-end',
                          marginLeft: 50,
                        }}>
                        <Text style={[FontStyle.fontHeavy14]}>
                          {item?.shop_name}
                        </Text>
                      </View>
                    </View>
                    <View
                      style={[
                        CommonStyle.flex_dirRow_alignCenter_justifySpbtw,
                      ]}>
                      <TextTranslation
                        style={[
                          FontStyle.fontMedium14,
                          { color: ColorVariable.gray },
                        ]}
                        text={'__BATCH_NUMBER__'}
                      />

                      <View
                        style={{
                          flex: 1,
                          alignItems: 'flex-end',
                          marginLeft: 50,
                        }}>
                        <Text style={[FontStyle.fontHeavy14]}>
                          {item.batchno}
                        </Text>
                      </View>
                    </View>
                    <View
                      style={[
                        CommonStyle.flex_dirRow_alignCenter_justifySpbtw,
                      ]}>
                      <TextTranslation
                        style={[
                          FontStyle.fontMedium14,
                          { color: ColorVariable.gray },
                        ]}
                        text={'__DATE_OF_EXP__'}
                      />

                      <View
                        style={{
                          flex: 1,
                          alignItems: 'flex-end',
                          marginLeft: 50,
                        }}>
                        <Text style={[FontStyle.fontHeavy14]}>
                          {item.expiry}
                        </Text>
                      </View>
                    </View>
                  </View>
                );
              })}
            </View>
            <View
              style={[
                styles.productInfo,
                { marginVertical: 16, paddingVertical: 12, minHeight: 96 },
              ]}>
              <Text style={[FontStyle.fontHeavy14]}>
                {t('__NOTES__')} :{' '}
                <Text>{orderInvoice.invoice_details.note}</Text>{' '}
              </Text>
            </View>
          </View>
        ) : (
          <View
            style={[
              CommonStyle.alignCenter_justifyCenter,
              { flex: 1, height: 350 },
            ]}>
            <ActivityIndicator size={'small'} color={'blue'} />
          </View>
        )}
        <View style={styles.footer}>
          <View style={CommonStyle.mainPadding}>
            {!isLoadingInvoice ? <TermAndCondition /> : null}
          </View>
          <View style={{ alignItems: 'center' }}>
            <DarkLogo />
            <View style={{ marginTop: 8, alignItems: 'center' }}>
              <Text style={FontStyle.fontRegular14}>
                Anjad Road, Badwani (MP) 451551
              </Text>
              <Text style={FontStyle.fontRegular14}>+91 88238 88238</Text>
              <Text style={FontStyle.fontRegular14}>contact@farmkart.com</Text>
              <Text style={FontStyle.fontRegular14}>GSTIN:23AADCF1197R1Z7</Text>
              <Text style={[FontStyle.fontRegular14, { marginTop: 8 }]}>
                State: Madhya Pradesh Code: 23
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </Modal>
  );
};

export default React.memo(Invoice);

const styles = StyleSheet.create({
  line: {
    height: 1,
    width: '93%',
    marginHorizontal: 16,
    backgroundColor: ColorVariable.stroke,
    marginBottom: 8,
  },
  footer: {
    paddingVertical: 24,
    backgroundColor: ' rgba(244, 244, 244, 1)',

    marginTop: 16,
  },
  totalView: {
    paddingHorizontal: 10,
    paddingVertical: 12,
    backgroundColor: ColorVariable.stroke,
    borderRadius: 6,
    marginHorizontal: 8,
    marginBottom: 8,
  },
  productInfo: {
    borderRadius: 6,
    borderWidth: 1,
    borderColor: ColorVariable.stroke,
    paddingHorizontal: 10,
    marginHorizontal: 8,
  },
  productView: {
    borderBottomColor: ColorVariable.stroke,
    paddingTop: 12,
    borderBottomWidth: 1,
    paddingBottom: 8,
  },
});
