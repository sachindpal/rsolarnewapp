import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useContext, useEffect, useMemo, useState } from 'react';


import HeaderWithSearchBag from '../../../commonResources/component/Header/HeaderWithSearchBag';

import SkeletonLoader from '../../../commonResources/component/SkeletonLoader';
import { getLocalStorageData, getUnAuthReqest, postAuthReq, postUnAuthReq } from '../../../Service/APIServices/axoisService';
import TextTranslation from '../../../commonResources/component/CommonInput/TextTranslation';
import { CommonContext } from '../../../commonResources/Context/CommonContext';
import { CommonStyle, commanRadius } from '../../../../asset/style/commonStyle';
import { FontStyle } from '../../../../asset/style/FontsStyle';
import { BlackCloud, FullFilledStar, } from '../../../../asset/img/';
import { ScrollView } from 'react-native-gesture-handler';
import HeaderWithOnlyBag from '../../../commonResources/component/Header/HeaderWithOnlyBag';
import { obj } from '../../../Service/CommonConstant';
import moment from 'moment';

const WeartherForcast = (props: any) => {

    const { getItemsCount } = useContext(CommonContext);
    const [TodayHours, setTodayHours] = useState<any>([]);

    useEffect(() => {
        console.log('props',props.route.params.objForDays)
        // getDaysForcast();

    }, [])


    const HourlyView: any = () => {

        return props.route.params.TodayHours.map((value: any, ind: any) => {

            var image = `https://openweathermap.org/img/wn/${value.weather[0].icon}@4x.png`
            console.log('--------------=====================----------------------', image)

            return (
                ind < 6 ?
                    <View key={ind} style={{ flexDirection: 'column' }}>
                        <Text style={{ color: '#7E7E7E', fontSize: 12, fontFamily: 'Avenir', fontStyle: 'normal', fontWeight: '400', lineHeight: 18 }}>{value.timeOnly}</Text>

                        <Image source={{ uri: image }} style={{ width: 32, height: 32, flexDirection: 'column' }} />
                        <Text style={[FontStyle.fontHeavy14, { marginLeft: 5 }]}>{fahrenheitToCelsius(value.main.temp).toFixed(0)}°</Text>
                    </View> : null


            )
        })

    }

    function fahrenheitToCelsius(fahrenheit:any) {
        // Subtract 32 from the Fahrenheit value
        
        // const celsius = (fahrenheit - 32) * 5 / 9;
        const celsius = fahrenheit - 273.15;
        return celsius;
    }

    return (
        <>
            <ScrollView style={{ flex: 1, backgroundColor: '#f8f8f8' }}>
                <HeaderWithOnlyBag title={'Weather'} itemInBag={getItemsCount} />
                <View style={{ flex: 1 }}>
                    <View style={{ flex: 1 }}>
                        <View style={{ paddingBottom: 32 }}>

                            <Text
                                style={[FontStyle.fontHeavy18, { color: '#242734', alignItems: 'center', paddingTop: 24, paddingBottom: 16, paddingLeft: 16 }]}
                            >
                                Today {moment().format('DD MMMM YYYY')}
                            </Text>
                        </View>
                        <View style={{backgroundColor:'#fff',padding:16,marginLeft:16,marginRight:16,borderRadius:6}}>
                            <View style={{ paddingBottom: 32 }}>
                                <Text style={{ color: '#7E7E7E', fontFamily: 'Avenir', fontSize: 16, fontStyle: 'normal', fontWeight: '500'}}>
                                    {props.route.params.weatherdetails.currentCity}
                                </Text>
                            </View>

                            <View style={{ paddingBottom: 16, alignItems: 'center', justifyContent: 'center' }}>
                                <View>
                                    <Image source={{ uri: props.route.params.weatherdetails.cloudImage }} style={{ width: 211, height: 160 }} />
                                    <Text style={{marginLeft:80,marginTop:-20,color:'#242734',fontFamily:'Avenir',fontSize:14,fontWeight:'500'}}>{props.route.params.weatherdetails.weather}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', width: 300, alignItems: 'center', justifyContent: 'center', paddingLeft: 100 }}>
                                    <Text style={{ fontSize: 40, fontWeight: '500', fontFamily: 'Avenir Medium', color: '#242734', flexDirection: 'row' }}>
                                        {props.route.params.weatherdetails.currentTemperature}°
                                    </Text>
                                    <View style={{ flex: 1, paddingLeft: 10, gap: 0 }}>
                                        <Text style={FontStyle.fontMedium14}>
                                        
                                            H:{Number(fahrenheitToCelsius(props.route.params.weatherdetails.temp_max)).toFixed(0)}°
                                        </Text>
                                        <Text style={FontStyle.fontMedium14}>
                                            L:{Number(fahrenheitToCelsius(props.route.params.weatherdetails.temp_min)).toFixed(0)}°

                                        </Text>
                                    </View>

                                    {/* <View style={{ flex: 1, paddingTop: 10, gap: 0 }}>

                                    <Image source={require('../../../../asset/img/cloudy.png')} style={{ flexDirection: 'column' }} />

                                    <Text style={{ flexDirection: 'column', fontSize: 14, fontWeight: '500', fontFamily: 'Avenir Medium', color: '#7E7E7E' }}>
                                        L:25°
                                    </Text>
                                </View> */}
                                    {/* <View style={{ width: 65 }}>
                                    <Text numberOfLines={2} style={{ flexDirection: 'row', fontSize: 14, fontWeight: '500', fontFamily: 'Avenir Medium', color: '#7E7E7E' }}>
                                        Chance of rain today
                                    </Text>
                                </View> */}

                                </View>

                            </View>


                            <View style={{ flex: 1, marginRight: 16, flexDirection: 'row', gap: 20, paddingBottom: 16, alignSelf: 'stretch' }}>
                                {/* <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}> */}
                                <HourlyView />
                                {/* </ScrollView> */}
                            </View>
                        </View>

                        <View style={{ flex: 1, flexDirection: 'row', padding: 24, gap: 8 }}>

                            <BlackCloud style={{ flexDirection: 'column' }} />
                            <TextTranslation style={[ { fontFamily: 'Avenir Medium', color: '#242734', fontWeight: '800',fontSize:18 }]} text={"__5_day_forecast__"} />

                        </View>
                        <View style={{ flexDirection: 'column', gap: 8, }}>
                            <View style={[{ flex: 1, flexDirection: 'row', gap: 50, paddingTop: 8,paddingBottom:8,paddingLeft:16,paddingRight:16, marginLeft: 16, alignSelf: 'stretch',backgroundColor:'#fff',marginRight:16,borderRadius:6,alignItems:'center' }]}>


                                <Text style={styles.cloudBtween1}>{moment(props.route.params.objForDays.firstDay.dt_txt).format('DD MMM')}</Text>



                                <View style={{ flexDirection: 'row', gap: 5 }}>
                                    <Image source={{ uri: props.route.params.objForDays.firstDay.iconCustom }} style={{ width: 32, height: 32 }} />
                                    <Text style={styles.cloudBtween}>{props.route.params.objForDays.firstDay.weather[0].main}</Text>
                                </View>



                                <View style={{ flexDirection: 'row', gap: 5 }}>
                                    <Text style={styles.cloudBtween3}>H:{Number(fahrenheitToCelsius(props.route.params.objForDays.firstDay.main.temp_max)).toFixed(0)}°</Text>
                                    <Text style={styles.cloudBtween4}>L:{Number(fahrenheitToCelsius(props.route.params.objForDays.firstDay.main.temp_min)).toFixed(0)}°</Text>
                                </View>


                            </View>

                            <View style={[{ flex: 1, flexDirection: 'row', gap: 50, paddingTop: 8,paddingBottom:8,paddingLeft:16,paddingRight:16, marginLeft: 16, alignSelf: 'stretch',backgroundColor:'#fff',marginRight:16,borderRadius:6,alignItems:'center' }]}>


                                <Text style={styles.cloudBtween1}>{moment(props.route.params.objForDays.secondDay.dt_txt).format('DD MMM')}</Text>


                                <View style={{ flexDirection: 'row',gap: 5 }}>
                                    <Image source={{ uri: props.route.params.objForDays.secondDay.iconCustom }} style={{ width: 32, height: 32 }} />
                                    <Text style={styles.cloudBtween}>{props.route.params.objForDays.secondDay.weather[0].main}</Text>
                                </View>


                                <View style={{ flexDirection: 'row', gap: 5 }}>
                                    <Text style={styles.cloudBtween3}>H:{Number(fahrenheitToCelsius(props.route.params.objForDays.secondDay.main.temp_max)).toFixed(0)}°</Text>
                                    <Text style={styles.cloudBtween4}>L:{Number(fahrenheitToCelsius(props.route.params.objForDays.secondDay.main.temp_min)).toFixed(0)}°</Text>
                                </View>


                            </View>

                            <View style={[{ flex: 1, flexDirection: 'row', gap: 50, paddingTop: 8,paddingBottom:8,paddingLeft:16,paddingRight:16, marginLeft: 16, alignSelf: 'stretch',backgroundColor:'#fff',marginRight:16,borderRadius:6,alignItems:'center' }]}>


                                <Text style={styles.cloudBtween1}>{moment(props.route.params.objForDays.thirdDay.dt_txt).format('DD MMM')}</Text>
                                <View style={{ flexDirection: 'row',gap: 5 }}>
                                    <Image source={{ uri: props.route.params.objForDays.thirdDay.iconCustom }} style={{ width: 32, height: 32 }} />
                                    <Text style={styles.cloudBtween}>{props.route.params.objForDays.thirdDay.weather[0].main}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', gap: 5 }}>
                                    <Text style={styles.cloudBtween3}>H:{Number(fahrenheitToCelsius(props.route.params.objForDays.thirdDay.main.temp_max)).toFixed(0)}°</Text>
                                    <Text style={styles.cloudBtween4}>L:{Number(fahrenheitToCelsius(props.route.params.objForDays.thirdDay.main.temp_min)).toFixed(0)}°</Text>
                                </View>
                            </View>

                            <View style={[{ flex: 1, flexDirection: 'row', gap: 50, paddingTop: 8,paddingBottom:8,paddingLeft:16,paddingRight:16, marginLeft: 16, alignSelf: 'stretch',backgroundColor:'#fff',marginRight:16,borderRadius:6,alignItems:'center' }]}>


                                <Text style={styles.cloudBtween1}>{moment(props.route.params.objForDays.fourthDay.dt_txt).format('DD MMM')}</Text>
                                <View style={{ flexDirection: 'row',gap: 5 }}>
                                    <Image source={{ uri: props.route.params.objForDays.fourthDay.iconCustom }} style={{ width: 32, height: 32 }} />
                                    <Text style={styles.cloudBtween}>{props.route.params.objForDays.fourthDay.weather[0].main}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', gap: 5 }}>
                                    <Text style={styles.cloudBtween3}>H:{Number(fahrenheitToCelsius(props.route.params.objForDays.fourthDay.main.temp_max)).toFixed(0)}°</Text>
                                    <Text style={styles.cloudBtween4}>L:{Number(fahrenheitToCelsius(props.route.params.objForDays.fourthDay.main.temp_min)).toFixed(0)}°</Text>
                                </View>
                            </View>

                            <View style={[{ flex: 1, flexDirection: 'row', gap: 50, paddingTop: 8,paddingBottom:8,paddingLeft:16,paddingRight:16, marginLeft: 16, alignSelf: 'stretch',backgroundColor:'#fff',marginRight:16,borderRadius:6,alignItems:'center' }]}>


                                <Text style={styles.cloudBtween1}>{moment(props.route.params.objForDays.fifthDay.dt_txt).format('DD MMM')}</Text>
                                <View style={{ flexDirection: 'row',gap: 5 }}>

                                    <Image source={{ uri: props.route.params.objForDays.fifthDay.iconCustom }} style={{ width: 32, height: 32 }} />
                                    <Text style={styles.cloudBtween}>{props.route.params.objForDays.fifthDay.weather[0].main}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', gap: 5 }}>
                                    <Text style={styles.cloudBtween3}>H:{Number(fahrenheitToCelsius(props.route.params.objForDays.fifthDay.main.temp_max)).toFixed(0)}°</Text>
                                    <Text style={styles.cloudBtween4}>L:{Number(fahrenheitToCelsius(props.route.params.objForDays.fifthDay.main.temp_min)).toFixed(0)}°</Text>
                                </View>
                            </View>
                        </View>

                    </View>
                </View>
            </ScrollView>
        </>

    );
};

export default WeartherForcast;

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#242734',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        height: 54,
        borderRadius: commanRadius.radi4,
        width: '100%',
    },
    buttonView: {
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.6)',
        width: '100%',
        position: 'absolute',
        bottom: 0,

        paddingHorizontal: 24,
        paddingBottom: 24,
        paddingTop: 8,
    },
    cloudBtween: { color: '#242734', textAlign: 'center', fontFamily: 'Avenir', fontSize: 14, fontStyle: 'normal', fontWeight: '800', lineHeight: 21,marginTop:5 },
    cloudBtween1: { color: '#242734', textAlign: 'center', fontFamily: 'Avenir', fontSize: 14, fontStyle: 'normal', fontWeight: '500', lineHeight: 21 },
    cloudBtween3: { color: '#242734', fontFamily: 'Avenir', fontSize: 14, fontStyle: 'normal', fontWeight: '500', lineHeight: 21 },
    cloudBtween4: { color: '#7E7E7E', fontFamily: 'Avenir', fontSize: 14, fontStyle: 'normal', fontWeight: '500', lineHeight: 21 }
});
