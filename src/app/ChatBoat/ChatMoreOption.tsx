import { Modal, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'

import { ScrollView, TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { CommonStyle } from '../../asset/style/commonStyle'
import { FontStyle } from '../../asset/style/FontsStyle'
import TextTranslation from '../commonResources/component/CommonInput/TextTranslation'
import LangaugeModel from '../commonResources/component/ModelPopUp/LangaugeModel'
import i18next from 'i18next'
import { setLocalStorage } from '../Service/APIServices/axoisService'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Add, DropdownFilled, PestAdd } from '../../asset/img'
import { useNavigation } from '@react-navigation/native'
import FeedBackForm from './FeedBackForm'

const langOptions = [
    {
        id: 'en',
        name: 'English',
    },
    {
        id: 'hi',
        name: 'Hindi',
    },
];

const ChatMoreOption = ({ modalVisible, newChatPopupOpen, modelClose }: any) => {
    const navigation = useNavigation<any>()

    const [modalVisibleLang, setModalVisibleLang] = useState(false);
    const [modalVisibleReview, setModalVisibleReview] = useState(false);
    const [selectedLang, setSelectedLang] = useState<any>();
    const [currentLang, setcurrentLang] = useState<any>('en');

    const demo = () => {
        console.log('sachin')
    }

    useEffect(() => {
        getCurrentLangauge();
    }, [])
    // model value select option
    const modelCloseLang = () => {
        setModalVisibleLang(!modalVisibleLang)
    }
    const openAndCloseReviewModal = () => {
        setModalVisibleReview(!modalVisibleReview)
    }



    const onSelect = (item: any) => {
        console.log('item', item)
        if (selectedLang && selectedLang === item.id) {
        } else {
            setSelectedLang(item);
        }
    };
    // langauge change handler
    const onSubmit = async () => {
        setModalVisibleLang(!modalVisibleLang);
        i18next.changeLanguage(selectedLang.id);
        setLocalStorage('currentLangauge', selectedLang.id);
        getCurrentLangauge();
    };


    // get current set language from local storage
    async function getCurrentLangauge() {
        let current = await AsyncStorage.getItem('currentLangauge');
        setcurrentLang(current);
        if (current == 'en') {
            onSelect({
                id: 'en',
                name: 'English',
            });
        } else if (current == 'hi') {
            onSelect({
                id: 'hi',
                name: 'Hindi',
            });
        } else {
            onSelect({
                id: 'en',
                name: 'English',
            });
        }
    }
    const CommanView = ({ text, Icon }: any) => {
        return (
            <View style={[CommonStyle.flex_dirRow_alignCenter, { paddingTop: 26 }]}>
                {/* <View style={styles.icon}>{Icon}</View> */}
                <View>
                    <TextTranslation style={FontStyle.fontMedium18} text={text} />
                </View>
            </View>
        );
    };

    const navigationToFeedbackForm = () => {
        console.log('sachin')
        navigation.navigate('signIn', {
            screen: 'ChatFeedback'
        })
    }
    const navigationToChatBotTerms = () => {
        navigation.navigate('signIn', {
            screen: 'ChatBotTerms'
        })
    }
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            // onRequestClose={() => {modelClose}}
            onRequestClose={() => demo}
        >
            <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.4)", alignItems: "center", justifyContent: "center" }}>
                <View style={{ backgroundColor: "white", width: "60%", height: '28%', position: 'absolute', top: 65, right: 8, zIndex: 3, borderRadius: 6, alignItems: 'center' }}>
                    <View style={styles.header}>
                        {/* <Text style={FontStyle.fontMedium22}>{""}</Text> */}
                    </View>
                    <ScrollView>
                    </ScrollView>
                    <View style={[CommonStyle.flex_dirRow_alignCenter, styles.footer]}>
                        <View>
                            <View style={{ bottom: 90, gap: 8 }}>
                                <Pressable
                                    onPress={() => newChatPopupOpen()}
                                    style={[
                                        {
                                            marginTop: 26, paddingRight: 16, flexDirection: 'row', borderBottomWidth: 1,
                                            paddingBottom: 16,
                                            borderColor: '#DCE0EF'
                                        },
                                    ]}>
                                    <PestAdd width={24} height={24} />
                                    <Text style={{ fontFamily: 'Avenir Medium', fontWeight: '500', fontSize: 18, color: '#242734' }}>
                                        New chat
                                    </Text>

                                </Pressable>
                            </View>

                            <View style={[CommonStyle.flex_dirRow_alignCenter_justifySpbtw, { bottom: 100, gap: 18 }]}>
                                <CommanView
                                    text={'__LANGUAGE__'}
                                />
                                <Pressable
                                    onPress={() => setModalVisibleLang(!modalVisibleLang)}
                                    style={[
                                        CommonStyle.flex_dirRow_alignCenter,
                                        { marginTop: 26, paddingRight: 16 },
                                    ]}>
                                    <Text style={FontStyle.fontMedium16}>
                                        {currentLang == 'en'
                                            ? 'English'
                                            : currentLang == 'hi'
                                                ? 'Hindi'
                                                : 'English'}
                                    </Text>
                                    <DropdownFilled />
                                </Pressable>
                            </View>

                            {/* <View style={{ bottom: 80, height: 25 }}>
                                <Pressable onPress={openAndCloseReviewModal}>
                                    <Text style={{ fontFamily: 'Avenir Medium', fontWeight: '500', fontSize: 18, color: '#242734' }}>
                                        Feedback
                                    </Text>
                                </Pressable>
                            </View> */}



                            <View style={{ bottom: 68, marginBottom: 16 }}>
                                <Pressable onPress={navigationToChatBotTerms}>
                                    <Text style={{ fontFamily: 'Avenir Medium', fontWeight: '500', fontSize: 18, color: '#242734' }}>
                                        T&C
                                    </Text>
                                </Pressable>
                            </View>

                        </View>
                        {/* <Text style={[FontStyle.fontBlack15, { marginRight: 18, fontSize: 14 }]} onPress={() => modelClose()}>CANCEL</Text>
                        <Text style={[FontStyle.fontBlack15, { marginRight: 26, fontSize: 14 }]} >OK</Text> */}
                    </View>
                </View>
                <Pressable style={{ width: '100%', height: '100%', zIndex: 2 }} onPress={modelClose}>

                </Pressable>
            </View>
            <LangaugeModel
                modalVisible={modalVisibleLang}
                selectedOption={selectedLang}
                onSelect={onSelect}
                onSubmit={onSubmit}
                modelClose={modelCloseLang}
                DataArray={langOptions}
                title={'Language'}
            />

            {/* <FeedBackForm
                openAndCloseReviewModal={openAndCloseReviewModal}
                ReviewModal={modalVisibleReview}
                language={currentLang}
            /> */}
        </Modal>


    )
}

export default React.memo(ChatMoreOption)

const styles = StyleSheet.create({

    header: {
        padding: 24, paddingBottom: 20, borderBottomWidth: 1, borderBottomColor: '#f8f8f8'
    },
    footer: {
        paddingTop: 20, paddingBottom: 20, justifyContent: "flex-end", borderTopWidth: 1, borderTopColor: '#f8f8f8'
    }
})