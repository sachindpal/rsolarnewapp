import { Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
// import {
//   ColorVariable,
//   CommonStyle,
// } from '../../../../../asset/style/commonStyle';
ColorVariable
import { CloseBlack, LeftBackIcon } from '../../../asset/img';
import { FontStyle } from '../../../asset/style/FontsStyle';
import { ScrollView } from 'react-native-gesture-handler';
import Button from '../../commonResources/component/CommonButton/Button';
import { getLocalStorageData } from '../../Service/APIServices/axoisService';
import { ColorVariable, CommonStyle } from '../../../asset/style/commonStyle';
import RatingStar from '../../commonResources/component/RatingStar/RatingStar';
import TextTranslation from '../../commonResources/component/CommonInput/TextTranslation';


const ViewAllReviews = (props: any) => {
    const [lang, setlang] = useState('en');

    useEffect(() => {
        // console.log('proppppppppppppppppppppppp',props.route.params)
        getLocalStorageData('currentLangauge')
            .then((res: any) => {
                if (res != null) {
                    setlang(res);
                }
            })
            .catch((res: any) => { });
    }, []);

    return (
        <View
            style={[
                CommonStyle.mainView,
                { backgroundColor: ColorVariable.blueBlack },
            ]}>

            <View style={[{ flex: 1 }, CommonStyle.sheet]}>
                <ScrollView>
                    <Pressable
                        style={styles.arrow}
                        onPress={() => props.navigation.goBack()}>
                        <CloseBlack />
                    </Pressable>

                    
                    <TextTranslation style={[FontStyle.fontHeavy18, { marginLeft:16, marginTop: 36 }]} text={'_Customer_reviews_'}></TextTranslation>
                    <View style={{padding:8}}>
                    <View style={{ flexDirection: 'row', gap: 8,left:-6 }}>
                        <Text style={{ fontSize: 24, color: '#242734', lineHeight: 36, fontFamily: "Avenir Medium", fontWeight: '500', marginTop: 4, marginLeft: 16 }}>
                            {props.route.params.producDetail.productAvgRating.toFixed(1)}
                        </Text>
                        <RatingStar
                            totalStars={5}
                            initialRating={props.route.params.producDetail.productAvgRating}
                            size={30}
                            readOnly={true}
                        />
                    </View>
                    <View
                        style={{ justifyContent: 'space-between', flex: 1, paddingBottom: 24 }}>
                        {props.route.params.product?.map((value: any, ind: any) => (
                            <View key={ind} style={[styles.tabMainView, { paddingTop: 16, padding: 8 }]}>
                                <View>
                                    <Text style={FontStyle.fontHeavy18}>{value.fullname}</Text>
                                </View>
                                <View
                                    style={[
                                        CommonStyle.flex_dirRow_alignCenter,
                                        { paddingVertical: 6 },
                                    ]}>
                                    {/* {Array.from({ length: value.rating }, (_, index) => <View key={index}><UnFilledStar /></View>)} */}
                                    <RatingStar
                                        totalStars={5}
                                        initialRating={value.rating}
                                        size={24}
                                        readOnly={true}
                                    />
                                </View>
                                {value.title ? (
                                    <View style={{}}>
                                        <Text style={FontStyle.fontRegular16}>{value.title}</Text>
                                    </View>
                                ) : null}

                                {value.comment ? (
                                    <View>
                                        <Text
                                            style={[
                                                FontStyle.fontMedium16,
                                                { color: 'rgba(99, 99, 99, 1)' },
                                            ]}>
                                            {value.comment}
                                        </Text>
                                    </View>
                                ) : null}
                            </View>
                        ))}


                    </View>


                    </View>


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

export default React.memo(ViewAllReviews);

const styles = StyleSheet.create({
    arrow: {
        marginTop: 20,
        marginHorizontal: 16,
    },
    tabMainView: {
        borderWidth: 1,
        borderColor: '#e2e2e2',
        borderRadius: 5,
        marginHorizontal: 9,
        marginBottom: 8,
    },
    content: {
        paddingTop: 16,
        paddingHorizontal: 16,
        paddingBottom: 80,
    },
});
