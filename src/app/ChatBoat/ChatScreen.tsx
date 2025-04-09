import { Pressable, StyleSheet, Text, View, Image, TextInput, BackHandler, Alert } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';
import { ColorVariable, commanRadius, CommonStyle } from '../../asset/style/commonStyle';
import { FarmkartGPT, LeftBackIcon, Robot, CloseBlack, WhiteBack, ChatSend, RobotIcon, ShopingBag, ThreeDot, RightArrow, AudioButtonModal } from '../../asset/img';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import WebView from 'react-native-webview';
import Button from '../commonResources/component/CommonButton/Button';
import { FontStyle } from '../../asset/style/FontsStyle';
import TextTranslation from '../commonResources/component/CommonInput/TextTranslation';
import SkeletonLoader from '../commonResources/component/SkeletonLoader';
import TextInputField from '../commonResources/component/CommonInput/TextInputField';
import ChatMoreOption from './ChatMoreOption';
import ChatSessionEnd from './ChatSessionEnd';
import { postAuthReq } from '../Service/APIServices/axoisService';
import { ScrollView } from 'react-native-gesture-handler';
import FeedBackForm from './FeedBackForm';
import LottieView from 'lottie-react-native';
import SubmitFeedbackForm from './SubmitFeedback';

const ChatScreen = () => {

  const navigation = useNavigation<any>()
  const { t: translate } = useTranslation();
  const [modalStatus, setModalStatus] = useState<any>(false)
  const [newChatVisible, setNewChatVisible] = useState<any>(false)
  const [inputMsg, setInputMsg] = useState<any>('')
  const [inputMsgForLoading, setinputMsgForLoading] = useState<any>(false)
  const [conversation, setConversation] = useState<any>([])
  const [targetQuestions, setTargetQuestions] = useState<any>(0)
  const [targetTokens, setTargetTokens] = useState<any>(0)
  const scrollViewRef = useRef<any>();
  const [offset, setOffset] = useState(0);
  const [goBack, setGoback] = useState(false);
  const [chatData, setChatData] = useState<any>({});
  const [chatDataForValidation, setChatDataForValidation] = useState<any>({});
  const isFocused = useIsFocused();
  const [modalVisibleReview, setModalVisibleReview] = useState(false);
  const [isShowSubmitFeed, setIsShowSubmitFeed] = useState(false);
  const [currentLang, setcurrentLang] = useState<any>('en');
  const [globalChatMsg, setGlobalChatMsg] = useState<any>({
    question: '',
    answer: '“Wow, you’ve kept Dr. Raichand on his toes today! 🌾 He’s taking a quick breather but will be back tomorrow to help you out'
  });


  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        newChatPopupOpen(true)
        return true
      }
    );
    // sendMessage()
    getMessages()
  }, [isFocused])


  const modelClose = () => {
    setModalStatus(!modalStatus)
  }


  const scrollDown = () => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }

  const newChatPopupOpen = (goBack = false) => {
    setGoback(goBack)
    setNewChatVisible(!newChatVisible)

    if (goBack == false) {
      modelClose()

    }
  }

  const navigationToChatScreen = () => {
    navigation.navigate('signIn', {
      screen: 'ChatScreen'
    })
  }

  const newChatPopupOpenForNew = () => {

    postAuthReq(
      `/chatbot/update-flag`, {}
    )
      .then((res: any) => {
        if (res?.data?.data?.customerid) {
          if (goBack == true) {
            console.log('back status')
            setNewChatVisible(!newChatVisible)
            navigation.goBack()
            // getMessages()
          } else {
            setNewChatVisible(!newChatVisible)
            getMessages()
          }
          setGoback(false)

        } else {
          openAndCloseReviewModal()

        }


      })
      .catch(error => {
        console.log('chat error', error);
      });
  }
  const sendMessage = async (staticMessage = "") => {
    console.log('staticMessage', staticMessage)
    setInputMsg('')

    let messageToBePassed = inputMsg
    if (typeof staticMessage == 'string' && staticMessage != "") {
      messageToBePassed = staticMessage
    }
    await setValidationMessage()
    if (inputMsg.trim().length == 0) {
      if (staticMessage.trim().length == 0) {
        return false
      }
    }
    var chatObj = {
      question: messageToBePassed,
      answer: ''
    }
    await conversation.push(chatObj)
    setConversation(conversation)
    setinputMsgForLoading(true)
    scrollDown()
    let current = await AsyncStorage.getItem('currentLangauge');
    var lang = 1;
    if (current == 'hi') {
      lang = 2
    }
    console.log('messageToBePassed', messageToBePassed)
    postAuthReq(
      `/chatbot/send-message-new`, { message: messageToBePassed, lang: lang, state_id: 1 }
    )
      .then(async (res: any) => {
        // getMessages()
        if (res?.data?.data) {
          var chatObj2 = {
            question: res?.data?.data?.last_conv.question,
            answer: res?.data?.data?.last_conv.answer,
            productDataJson: res?.data?.data?.last_conv.productDataJson
          }
          console.log('chatObj2', chatObj2)
          conversation[conversation.length - 1] = chatObj2
          //  await conversation.push(chatObj2)
          setChatDataForValidation(res?.data?.data.conversationsData)

          if (res?.data?.data?.conversationsData?.answer_token >= targetTokens) {
            await conversation.push(globalChatMsg)
            // setConversation([globalChatMsg])
            setConversation(conversation)
          } else {
            setConversation(conversation)
          }

          setinputMsgForLoading(false)
          setInputMsg('')
          // scrollDown()
        }
      })
      .catch(error => {
        console.log('previous disease error', error);
      });
  }

  const setValidationMessage = async () => {
    let current = await AsyncStorage.getItem('currentLangauge');
    var lang = 1;
    if (current == 'hi') {
      lang = 2
      setGlobalChatMsg({
        question: '',
        answer: '“वाह, आज आपने Dr. Raichand को खूब व्यस्त रखा! 🌾 अब उन्हें थोड़ा आराम चाहिए, लेकिन कल फिर मिलेंगे आपकी मदद के लिए।'
      })
    }
  }
  const getMessages = async () => {
    await setValidationMessage()
    postAuthReq(
      `/chatbot/get-messages`, {}
    )
      .then(async (res: any) => {
        console.log('res?.data?.data?.target_tokens?.value',res?.data?.data)
        setTargetQuestions(res?.data?.data?.target_questions?.value)
        setTargetTokens(res?.data?.data?.target_tokens?.value)
        setChatData(res?.data?.data.conversationDataRes)
        setChatDataForValidation(res?.data?.data.conversationsData)

        if (res?.data?.data?.conversationDataRes?.conversations) {


          if (res?.data?.data.conversationsData?.answer_token && res?.data?.data.conversationsData.answer_token >= res?.data?.data?.target_tokens?.value) {
            await conversation.push(globalChatMsg)
            setConversation(conversation)
          } else {
            // console.log('JSON.parse(res.data.data.conversationDataRes.conversations)', JSON.parse(res.data.data.conversationDataRes.conversations)[2].productDataJson[0].image)
            setConversation(JSON.parse(res.data.data.conversationDataRes.conversations))

          }

          scrollDown()
        } else {

          if (res?.data?.data.conversationsData?.answer_token && res?.data?.data.conversationsData.answer_token >= res?.data?.data?.target_tokens?.value) {
            setConversation([globalChatMsg])
          } else {
            setConversation([])
          }

        }
      })
      .catch(error => {
        console.log('previous disease error', error);
      });
  }

  const openAndCloseReviewModal = () => {
    if (modalVisibleReview == true) {
      if (goBack == true) {
        setNewChatVisible(!newChatVisible)
        // navigation.goBack()
        // getMessages()
      } else {
        setNewChatVisible(!newChatVisible)
        getMessages()
      }
      setGoback(false)
    }else{
      openAndCloseSubmitReviewModal()
    }
    setModalVisibleReview(!modalVisibleReview)

  }
  const sendStaticMessage = (message: any) => {
    console.log("message", message)
    if (chatDataForValidation?.answer_token < targetTokens) {
      sendMessage(message)

    }

  }

  const parseFormattedText = (text: any) => {
    const parts = text.split(/(###\s.*?$|\*\*.*?\*\*|\*.*?\*)/gm);

    return parts.map((part: any, index: any) => {
      if (part.startsWith("### ")) {
        return (
          <Text key={index} style={{ fontSize: 20, fontWeight: "bold", marginVertical: 6 }}>
            {part.replace("### ", "")}
          </Text>
        );
      } else if (part.startsWith("**") && part.endsWith("**")) {
        return (
          <Text key={index} style={{ fontWeight: "bold" }}>
            {part.replace(/\*\*/g, "")}
          </Text>
        );
      } else if (part.startsWith("*") && part.endsWith("*")) {
        return (
          <Text key={index} style={{ fontStyle: "italic" }}>
            {part.replace(/\*/g, "")}
          </Text>
        );
      }
      return <Text key={index}>{part}</Text>;
    });
  };

  const parseBoldText = (text: any) => {
    const parts = text.split(/\*\*(.*?)\*\*/g);
    return parts.map((part: any, index: any) =>
      index % 2 === 1 ? <Text key={index} style={{ fontWeight: "bold" }}>{part}</Text> : part
    );
  };


  const openAndCloseSubmitReviewModal = ()=>{
    console.log('not drigger')
    if(isShowSubmitFeed==true){
      navigation.goBack()
    }
    setIsShowSubmitFeed(!isShowSubmitFeed)

  }

  const navigateToAudioScreen = ()=>{
    navigation.navigate('AudioConv',{"targetTokens":targetTokens})
  }

  return (
    <View style={[{ flex: 1, backgroundColor: '#f8f8f8' }]}>
      { chatDataForValidation?.answer_token >= targetTokens ?
      null
     :<Pressable onPress={()=>navigateToAudioScreen()} style={{width:50,height:50,borderRadius:50,backgroundColor:'#73BE44',justifyContent:'center',alignItems:'center',position:'absolute',zIndex:1,bottom:90,right:10}}>
     <AudioButtonModal />

     </Pressable>} 
      
    {/* // <View style={[{ flex: 1,marginTop:-20 }]}> */}
      {/* <View style={[{ flex: 1 }]}> */}
      <View
        style={[
          CommonStyle.headerMainView,
          CommonStyle.flex_dirRow_alignCenter_justifySpbtw
        ]}>
        <View style={CommonStyle.flex_dirRow_alignCenter}>
          <Pressable onPress={() => newChatPopupOpen(true)}>
            <WhiteBack />
          </Pressable>
          <TextTranslation
            style={[FontStyle.fontMedium18, { color: '#fff', marginLeft: 16 }]}
            text={'Dr. Raichand'}
          />
        </View>
        <Pressable onPress={() => newChatPopupOpen()}>
          <ThreeDot color={"white"} />
        </Pressable>
      </View>

      <View style={{ marginBottom: 100 }}>
        <ScrollView ref={scrollViewRef} showsVerticalScrollIndicator={false}>
          <View style={{ marginLeft: 8, marginTop: 0, marginRight: 8, backgroundColor: "#FFEABC", borderWidth: 1, borderColor: "#FBCC67", borderStyle: 'solid', paddingLeft: 16, paddingRight: 16, paddingTop: 8, paddingBottom: 8, gap: 16, width: 344, borderRadius: 6 }}>
            <Text style={{ fontSize: 14, color: '#242734', fontWeight: '400' }}>{translate('__ALERT_MESSAGE_RACHAND__')}</Text>

          </View>
          <View style={{ flex: 1, paddingTop: 20, paddingLeft: 40, paddingBottom: 80, display: 'flex', gap: 10, backgroundColor: '#f8f8f8' }}>
            <View style={{ maxWidth: 240, borderRadius: 6 }}>
              <Text style={{ padding: 10, backgroundColor: '#fff', fontFamily: 'Avenir', fontSize: 16, fontWeight: '400', lineHeight: 24, fontStyle: 'normal', color: '#242734', borderRadius: 6 }}>
                {translate("__Welcome_to_FarmGPT__")}
              </Text>
            </View>
            <View style={{ flexDirection: 'row' }}>

              <Pressable style={{ flexDirection: 'row' }} onPress={() => { sendStaticMessage(translate("__CHAT_SCREEN_STATIC__")) }}>
                <View style={{ maxWidth: 240, borderRadius: 6 }}>
                  <Text style={{ backgroundColor: '#fff', padding: 10, fontFamily: 'Avenir', fontSize: 16, fontWeight: '400', lineHeight: 24, fontStyle: 'normal', color: '#242734', borderRadius: 6 }}>
                    {translate("__CHAT_SCREEN_STATIC__")}
                  </Text>
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff', padding: 16, borderRadius: 6 }}>
                  <RightArrow width={24} height={24} color={"#AFAFAF"} />
                </View>
              </Pressable>
            </View>

            <View style={{ flexDirection: 'row' }}>
              <Pressable style={{ flexDirection: 'row' }} onPress={() => { sendStaticMessage(translate("__CHAT_SCREEN_STATIC_TWO__")) }}>

                <View style={{ maxWidth: 240, borderRadius: 6 }}>
                  <Text style={{ backgroundColor: '#fff', padding: 10, fontFamily: 'Avenir', fontSize: 16, fontWeight: '400', lineHeight: 24, fontStyle: 'normal', color: '#242734', borderRadius: 6 }}>
                    {translate("__CHAT_SCREEN_STATIC_TWO__")}
                  </Text>

                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff', padding: 16, borderRadius: 6 }}>
                  <RightArrow width={24} height={24} color={"#AFAFAF"} />
                </View>
              </Pressable>
            </View>

            <View style={{ flexDirection: 'row' }}>
              <Pressable style={{ flexDirection: 'row' }} onPress={() => { sendStaticMessage('इस बार बारिश देर से हो रही है, क्या मुझे बुवाई में देरी करनी चाहिए?') }}>

                <View style={{ maxWidth: 240, borderRadius: 6 }}>
                  <Text style={{ backgroundColor: '#fff', padding: 10, fontFamily: 'Avenir', fontSize: 16, fontWeight: '400', lineHeight: 24, fontStyle: 'normal', color: '#242734', borderRadius: 6 }}>
                    इस बार बारिश देर से हो रही है, क्या मुझे बुवाई में देरी करनी चाहिए?
                  </Text>
                  {/* <RobotIcon style={{ position: 'absolute', bottom: -3, left: -35 }} /> */}
                  <Image source={require("../../asset/img/Profile.png")} height={61} width={43} style={{ position: 'absolute', bottom: 5, left: -35, borderRadius: 50 }} />

                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff', padding: 16, borderRadius: 6 }}>
                  <RightArrow width={24} height={24} color={"#AFAFAF"} />
                </View>
              </Pressable>
            </View>




            {/* this is conversations from db and runtime */}

            {conversation ? conversation.map((value: any, index: any) => {
              return <View key={index}>
                {value?.question.length > 0 ?
                  <View style={{ marginTop: 10 }}>

                    {/* <View style={{ borderRadius: 6,alignItems:'flex-end',maxWidth:240,right:-75}}> */}
                    <View style={{ borderRadius: 6, alignItems: 'flex-end', right: -60, maxWidth: 250, }}>
                      <Text style={{ backgroundColor: '#EBF3E7', padding: 10, fontFamily: 'Avenir', fontSize: 16, fontWeight: '400', lineHeight: 24, fontStyle: 'normal', color: '#242734', textAlign: 'left' }}>
                        {value.question}
                      </Text>
                    </View>
                  </View> : null}

                {value?.answer.length == 0 ?
                  <View style={{ flexDirection: 'row', marginTop: 10 }}>

                    <View style={{ width: 50, height: 30, backgroundColor: '#fff', borderRadius: 6, marginBottom: 10, paddingBottom: 30 }}>
                      <LottieView
                        source={require('../../../src/asset/img/Loader.json')}
                        autoPlay
                        loop
                        style={{ width: 100, height: 50, marginLeft: -20, paddingBottom: 30 }}
                      />
                      {/* <RobotIcon style={{ position: 'absolute', bottom: -3, left: -35 }} /> */}
                      <Image source={require("../../asset/img/Profile.png")} height={61} width={43} style={{ position: 'absolute', bottom: 5, left: -35, borderRadius: 50 }} />
                    </View>
                  </View> : <><View style={{ flexDirection: 'row', marginTop: 10 }}>

                    <View style={{ maxWidth: 240, borderTopRightRadius: 6, borderBottomRightRadius: 6, borderTopLeftRadius: 6, padding: 10, backgroundColor: '#fff' }}>
                      <Text style={{ fontFamily: 'Avenir', fontSize: 16, fontWeight: '400', lineHeight: 24, fontStyle: 'normal', color: '#242734', backgroundColor: '#fff', textAlign: 'left' }}>
                        {parseFormattedText(value?.answer)}
                      </Text>
                      {/* __SUGGESTED_ANSWER__ */}
                      {/* {!value.productDataJson || value.productDataJson.length == 0 ?
                        <Image source={require("../../asset/img/Profile.png")} height={61} width={43} style={{ position: 'absolute', bottom: 5, left: -35, borderRadius: 50 }} /> : <Text style={{ fontStyle: 'italic', color: 'grey', backgroundColor: '#fff', fontSize: 16, marginTop: 10 }}>- {translate("__SUGGESTED_ANSWER__")}</Text>
                      } */}

{!value.productDataJson || value.productDataJson.length == 0 ?
                        <Image source={require("../../asset/img/Profile.png")} height={61} width={43} style={{ position: 'absolute', bottom: 5, left: -35, borderRadius: 50 }} /> : null
                      }
                    </View>


                  </View>
                    {value.productDataJson && value.productDataJson.length > 0 ? value.productDataJson.map((val: any, ind: any) => {

                      return val.status == "Y" ? <View key={ind} style={{ maxWidth: 240, backgroundColor: '#fff', marginTop: 8, flexDirection: 'column', borderTopRightRadius: 6, borderBottomRightRadius: 6, borderTopLeftRadius: 6, borderBottomLeftRadius: ind == value.productDataJson.length ? 6 : 0 }}>
                        <Pressable onPress={() => navigation.navigate('ProductDetail', { id: val.productId })}>
                          <View style={{ flexDirection: 'row' }}>
                            <View style={{ maxWidth: 240, borderRadius: 6, backgroundColor: '#fff', padding: 8 }}>
                              <Image source={{ uri: val.image }} style={{ width: 80, height: 80 }} />
                            </View>

                            <View style={{ maxWidth: 150, borderRadius: 6, backgroundColor: '#fff', padding: 8 }}>
                              <Text numberOfLines={3} style={{ overflow: 'hidden', color: '#242734', fontFamily: 'Avenir Medium', fontSize: 16, fontWeight: '500', lineHeight: 24 }}>
                                {val.name}
                              </Text>
                              <View style={{ flexDirection: 'row', gap: 8, marginTop: 16 }}>
                                <Text style={{ fontFamily: 'Avenir', fontSize: 16, fontStyle: 'normal', fontWeight: '400', lineHeight: 16, letterSpacing: 0.5, color: '#7E7E7E', textDecorationLine: 'line-through' }}>
                                  ₹{val.price}
                                </Text>

                                <Text style={{ fontFamily: 'Avenir Medium', fontSize: 16, fontStyle: 'normal', fontWeight: '800', lineHeight: 16, letterSpacing: 0.5, color: '#242834' }}>
                                  ₹{val.uic_price}
                                </Text>
                              </View>

                            </View>
                          </View>

                          <View>
                            <View

                              style={[
                                CommonStyle.flex_dirRow_alignCenter,
                                styles.repeat, { margin: 8 }
                              ]}>
                              <TextTranslation
                                style={[
                                  FontStyle.fontMedium12,
                                  { lineHeight: 22, color: 'white' },
                                ]}
                                text={'__ORDER_NOW__'}
                              />
                            </View>
                          </View>
                        </Pressable>
                      </View> : null
                    }) : null
                    }
                    {/* <RobotIcon style={{ position: 'absolute', bottom: -3, left: -35 }} /> */}
                    <Image source={require("../../asset/img/Profile.png")} height={61} width={43} style={{ position: 'absolute', bottom: 5, left: -35, borderRadius: 50 }} />
                  </>
                }
              </View>


            }) : null}
          </View>
        </ScrollView>
      </View>
      {chatDataForValidation?.answer_token >= targetTokens ? <View style={styles.buttonView}>

        <TextInput
          style={styles.button}
          onChangeText={(val) => setInputMsg(val)}
          placeholderTextColor={'#7E7E7E'}
          // placeholder={translate('__ENTER_PINCODE__')}
          placeholder={translate("__ASK_TO_AI_PLACEHOLDER")}
          editable={false} selectTextOnFocus={false}
        />
        <Pressable>
          <ChatSend style={{ marginBottom: 10, marginTop: 10 }} />
        </Pressable>
      </View> :
        <View style={styles.buttonView}>

          <TextInput
            style={[styles.button, { color: '#7E7E7E' }]}
            onChangeText={(val) => setInputMsg(val)}
            value={inputMsg}
            placeholderTextColor={'#7E7E7E'}
            //   placeholder={translate('__ENTER_PINCODE__')}
            placeholder={translate("__ASK_TO_AI_PLACEHOLDER")}
          />
          <Pressable onPress={() => sendMessage()}>
            <ChatSend style={{ marginBottom: 10, marginTop: 10 }} />
          </Pressable>
        </View>




      }

      {/* <ChatMoreOption
        modalVisible={modalStatus}
        newChatPopupOpen={newChatPopupOpen}
        // onSelect={onSelect}
        // onSubmit={onSubmit}
        modelClose={modelClose}
      // DataArray={langOptions}
      // title={'Language'}
      /> */}

      <ChatSessionEnd
        heading={translate("__End_chat_session__")}
        content={translate("__END_CHAT_CONTENT__")}
        buttonTittle={translate("__END_CHAT__")}
        newChatPopupOpen={newChatPopupOpenForNew}
        newChatVisible={newChatVisible}
        newChatPopupOpenCancel={newChatPopupOpen}
      />

      <FeedBackForm
        openAndCloseReviewModal={openAndCloseReviewModal}
        ReviewModal={modalVisibleReview}
        language={currentLang}
        goBack={goBack}
      />

<SubmitFeedbackForm 
        openAndCloseSubmitReviewModal={openAndCloseSubmitReviewModal}
        isShowSubmitFeed={isShowSubmitFeed}
        goBack={goBack}
        />

    </View>
  );
}

export default ChatScreen

const styles = StyleSheet.create({
  button: {
    padding: 8,
    borderRadius: 6,
    backgroundColor: '#f8f8f8',
    width: '80%',
    marginLeft: 12,
    fontFamily: 'Avenir Medium',
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '400',
    fontStyle: 'normal',
    color: '#7E7E7E'
  },
  buttonView: {
    paddingTop: 16,
    paddingBottom: 12,
    alignSelf: 'stretch',
    backgroundColor: '#fff',
    gap: 12,
    flexDirection: 'row',
    width: '100%',
    position: 'absolute',
    bottom: 0,
  },
  repeat: {
    borderRadius: commanRadius.radi4,
    backgroundColor: ColorVariable.farmkartGreen,
    overflow: 'hidden',
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
    marginLeft: 12,
  },
})