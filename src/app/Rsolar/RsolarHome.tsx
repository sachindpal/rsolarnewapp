import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
    View,
    Text,
    ScrollView,
    Dimensions,
    TouchableOpacity,
    StyleSheet,
    Switch,
    Pressable,
    Animated,
    Image
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Rive, { RiveRef } from 'rive-react-native';
import {
    CellTower,
    CellTowerDark,
    Cottage,
    CottageDark,
    CurrencyRupee,
    CurrencyRupeeDark,
    DropdownUpArrow,
    Thunder,
    ThunderDark,
    TotalSaving,
    TotalSavingDark,
    UpDown,
    UpDownDark,
    Watch,
    WatchDark,
} from '../../asset/img';
import EnergyGeneration from './EnergyGeneration';
import Financial from './FInancial';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useData } from '../Service/DataContext';
import moment from 'moment';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { RefreshControl } from 'react-native-gesture-handler';
import { getUnAuthReqest, postUnAuthReq } from '../Service/APIServices/axoisService';
import EnergyGenerationDisabled from './EnergyGenerationDisabled';
import FinancialDisabled from './FInancialDisabled';
import Snackbar from 'react-native-snackbar';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const fullYear = new Date().getFullYear();

const monthsArray = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'July',
    'Aug',
    'Sept',
    'Oct',
    'Nov',
    'Dec',
]
const getYearsDropdown = () => {
    const yearDropDowns = []
    let initialYear = 2021;
    let tempFullYear = fullYear
    let difference = fullYear - initialYear
    for (let index = 0; index <= difference; index++) {
        yearDropDowns.push(tempFullYear.toString())
        tempFullYear--;

    }

    return yearDropDowns
}

const HomeScreen = (props: any) => {
    // console.log('props',props)

    const navigation = useNavigation<any>();

    const [yearDropDown, setYearDropDown] = useState<any>(getYearsDropdown());

    const [activeTab, setActiveTab] = useState('Today');
    const [selectedValue, setSelectedValue] = useState(fullYear);
    const [radioValue, setRadioValue] = useState('kilowatts');
    const { isDark, setIsDark } = useData();
    const [totalPower, setTotalPower] = useState<any>(0);
    const [totalPowerSavings, setTotalPowerSavings] = useState<any>(0);
    const riveRef = React.useRef<RiveRef>(null);
    const [startTime, setstartTime] = useState(new Date()); // capture time when screen is loaded
    const [diffMinutes, setDiffMinutes] = useState(0);
    const [refreshing, setRefreshing] = useState(false);
    const [customerData, setcustomerData] = useState<any>({});
    const [deviceData, setdeviceData] = useState<any>(null);
    const [statusLogs, setstatusLogs] = useState<any>(null);

    const isFocused = useIsFocused()
    const [pvPower, sePvPower] = useState<any>(0.0)
    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date();
            const diff = Math.floor((now.getTime() - startTime.getTime()) / 60000); // minutes
            setDiffMinutes(diff);
        }, 30000); // update every 30s

        return () => clearInterval(interval);
    }, [startTime]);
    const colors = {
        background: isDark ? '#121212' : '#FBFBFB',
        text: isDark ? '#fff' : '#242734',
        subText: isDark ? '#bbb' : 'rgba(36, 39, 52, 0.50)',
        card: isDark ? '#1E1E1E' : '#F9F9F9',
        tabBg: isDark ? '#222' : 'rgba(231, 230, 236, 0.50)',
        activeTab: isDark ? '#333' : '#FFF',
        label: isDark ? '#ddd' : '#000',
        labelgrey: isDark ? '#ddd' : '#848484',
        boxBackground: isDark ? '#1A1A1A' : '#FFF',
        grphHorizontalLine: isDark ? '#848484' : '#B1B1B1',

    };
    const setActiveTabFunction = (tab: any) => {

        setActiveTab(tab)
    }

    // const ShowSnackBar:any = () => {
    //     return Snackbar.show({
    //       text: 'This is a Snackbar!',
    //       duration: Snackbar.LENGTH_LONG, // or Snackbar.LENGTH_LONG
    //       marginBottom:screenHeight-100,
    //       action: {
    //         text: 'UNDO',
    //         textColor: 'yellow',
    //         onPress: () => {
    //           console.log('Undo pressed');
    //         },
    //       },
    //     });
    //   };



    const onRefresh = useCallback(() => {
        getUserInfo()
        // showSnackBar()

        setRefreshing(true);
        setstartTime(new Date())
        const now = new Date();
        const diff = Math.floor((now.getTime() - now.getTime()) / 60000); // minutes
        setDiffMinutes(diff);
        setTimeout(() => {
            setRefreshing(false);
            //   getUserInfo();
            // setstartTime(new Date())
        }, 1500); // Simulate API call or data fetch
    }, []);



    const getTotalEnergy = (energy: any, pvPower: any) => {
        sePvPower(pvPower)
        console.log('pvPower', pvPower)
        if (energy.length > 0) {
            let totalPowers: any = 0
            for (let index = 0; index < energy.length; index++) {
                const element = energy[index];
                totalPowers += element.grid

            }
            totalPowers = parseFloat(totalPowers)
            setTotalPower(totalPowers.toFixed(2))
            let totalSaving = (totalPowers * 10).toFixed(2)
            setTotalPowerSavings(totalSaving)
            // console.log('energy', totalPowers)

        }

    }

    useEffect(() => {
        getUserInfo()
    }, [])

    const getUserInfo = async () => {
        const getInfo: any = await AsyncStorage.getItem('solar_customer_data');


        getLiveUserData(JSON.parse(getInfo))
    }

    const getLiveUserData = (customerData: any) => {

        getUnAuthReqest(`/rsolar/customer-data?customerid=${customerData.customerid}`)
            .then((res: any) => {

                console.log('res home page:------------', res.data.data)
                // if (res?.data?.data?.customerData) {
                setcustomerData(res?.data?.data?.customerData)

                // }

                // if (res?.data?.data?.deviceData) {
                setdeviceData(res?.data?.data?.deviceData)

                // }

                // if (res?.data?.data?.statusLogsData) {
                setstatusLogs(res?.data?.data?.statusLogsData)

                // }


            })
            .catch(err => {
                console.log('err api of customer data', err);
            });
    }
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const [visible, setVisible] = useState(true);
    const [unitValues, setUnitValues] = useState('kWh');

    useEffect(() => {
        console.log('snack bar', props?.route?.params?.animation,)
        // Step 1: Fade In
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
        }).start(() => {
            // Step 2: Wait 3 seconds, then fade out
            //   setTimeout(() => {
            //     Animated.timing(fadeAnim, {
            //       toValue: 0,
            //       duration: 1000,
            //       useNativeDriver: true,
            //     }).start(() => {
            //       setVisible(false); // Hide from DOM after fade out
            //     });
            //   }, 3000);
        });
    }, [isFocused]);


const setRadioValues = (value:any)=>{
    if(value=='kilowatts'){
        setUnitValues('kWh')
    }else{
        setUnitValues('units')
    }
    setRadioValue(value)
}





    return (
        <ScrollView style={{ flex: 1, backgroundColor: colors.background, padding: 16 }} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
            {/* Dark Mode Switch */}
            {props?.route?.params?.animation && isFocused == true && !customerData?.solar_device_id && (statusLogs == null || statusLogs == undefined) ?
                <Animated.View style={[{ opacity: fadeAnim, zIndex: 1 }]}>
                    <View style={{ flexDirection: 'row', position: 'absolute', backgroundColor: '#262626', borderRadius: 4, width: '100%', justifyContent: 'center', alignContent: 'center', paddingVertical: 14, zIndex: 1, gap: 4 }}>
                        <Text style={{ color: '#FFF', width: '70%', fontFamily: 'Avenir Medium', fontSize: 14, fontWeight: '400' }}>
                            Your system hasn’t been installed yet.
                        </Text>
                        <Pressable style={{ marginTop: '2%' }} onPress={() => navigation.navigate('CallPopUp', { mobile: 9407059000 })}>
                            <Text style={{ color: '#73BE44', fontFamily: 'Avenir Medium', fontSize: 14, fontWeight: '400' }}>
                                Get Support
                            </Text>
                        </Pressable>
                    </View>
                </Animated.View> : null
            }


            {props?.route?.params?.animation && isFocused == true && !customerData?.solar_device_id && (statusLogs != undefined || statusLogs != null) ?
                <Animated.View style={[{ opacity: fadeAnim, zIndex: 1 }]}>
                    <View style={{ flexDirection: 'row', position: 'absolute', backgroundColor: '#262626', borderRadius: 4, width: '100%', justifyContent: 'center', alignContent: 'center', paddingVertical: 14, zIndex: 1, gap: 4 }}>
                        <Text style={{ color: '#FFF', width: '70%', fontFamily: 'Avenir Medium', fontSize: 14, fontWeight: '400' }}>
                            Your system is offline. Connect to Wi-Fi to get live energy data
                        </Text>
                        <Pressable style={{ marginTop: '2%' }} onPress={() => navigation.navigate('CallPopUp', { mobile: 9407059000 })}>
                            <Text style={{ color: '#73BE44', fontFamily: 'Avenir Medium', fontSize: 14, fontWeight: '400' }}>
                                Get Support
                            </Text>
                        </Pressable>
                    </View>
                </Animated.View> : null
            }


            {/* Header */}
            <View>
                <Text style={{ fontSize: 24, fontFamily: 'Avenir Heavy', color: colors.text }}>Home</Text>

                {customerData?.solar_device_id ? <View style={{ flexDirection: 'row', gap: 4 }}>{deviceData?.status == 2 ?
                    <>
                        <Text style={{ color: '#DC2626' }}>●</Text>
                        <Text style={{ fontSize: 12, color: '#DC2626', fontFamily: 'Avenir Medium' }}> Electricity or Device failure</Text>
                    </>
                    : deviceData?.status == 3 ?
                        <>
                            <Text style={{ color: '#F8BE1A' }}>●</Text>
                            <Text style={{ fontSize: 12, color: colors.subText, fontFamily: 'Avenir Medium' }}>Your system is offline.</Text>
                        </>
                        : <><Text style={{ color: '#74C043' }}>●</Text>

                            <Text style={{ fontSize: 12, color: colors.subText, fontFamily: 'Avenir Medium' }}>Your system is up and running.</Text>
                        </>
                }</View> :
                    <View style={{ flexDirection: 'row', gap: 4 }}>
                        <Text style={{ color: colors.subText }}>●</Text>

                        <Text style={{ fontSize: 12, color: colors.subText, fontFamily: 'Avenir Medium' }}>Your system is offline</Text>
                        {/* <Pressable onPress={() => navigation.navigate('CallPopUp', { mobile: 9407059000 })}>
                            <Text style={{ fontSize: 12, color: '#73BE44', fontFamily: 'Avenir Medium', textDecorationLine: 'underline', fontWeight: '500', textDecorationStyle: 'solid' }}> Get support</Text></Pressable> */}
                    </View>}

            </View>

            {/* Rive Animation */}
            <View >
                <View style={{ position: 'relative' }}>

                    {customerData?.solar_device_id ?
                        <View style={{ position: 'absolute', backgroundColor: 'linear-gradient(0deg, rgba(115, 190, 68, 0.10) 0%, rgba(115, 190, 68, 0.10) 100%), rgba(255, 255, 255, 0.80)', borderRadius: 8, borderWidth: 0.5, borderColor: 'rgba(115, 190, 68, 0.60)', padding: 8, alignItems: 'flex-start', marginLeft: '12%', marginTop: '15%', zIndex: 1,height: '4%', width: '12%' }}>

                            <Text style={{ color: '#74C043' }}>● Panel</Text>
                            <View style={{ flexDirection: 'row', gap: 5 }}>
                                <Text style={{ color: colors.text, fontWeight: '500', fontSize: 12, fontFamily: 'Avenir Medium' }}>{parseFloat(pvPower).toFixed(2)}</Text>
                                <Text style={{ color: colors.labelgrey, fontWeight: '500', fontSize: 8, fontFamily: 'Avenir Medium', marginTop: 5 }}>{unitValues}</Text>
                            </View>
                        </View>
                        :
                        <View style={{ position: 'absolute', backgroundColor: 'linear-gradient(0deg, rgba(36, 36, 36, 0.10) 0%, rgba(36, 36, 36, 0.10) 100%), rgba(255, 255, 255, 0.80)', borderRadius: 8, borderWidth: 0.5, borderColor: '0.5px solid rgba(86, 86, 86, 0.60)', padding: 8, alignItems: 'flex-start', marginLeft: '12%', marginTop: '15%', zIndex: 1, height: '4%', width: '15%' }}>

                            <Text style={{ color: '#696969' }}>● Panel</Text>
                            <View style={{ flexDirection: 'row', gap: 5 }}>
                                <Text style={{ color: colors.text, fontWeight: '500', fontSize: 12, fontFamily: 'Avenir Medium' }}>0</Text>
                                <Text style={{ color: colors.labelgrey, fontWeight: '500', fontSize: 8, fontFamily: 'Avenir Medium', marginTop: 5 }}>{unitValues}</Text>
                            </View>
                        </View>
                    }


                    {customerData?.solar_device_id ? <View>
                        {deviceData?.status == 2 ? <View style={{ padding: '2%', paddingTop: '5%' }}>
                            {isDark ? <Image
                                source={require('../../asset/img/home_alert_dark.png')}
                                style={{ width: '100%', height: 350 }}
                            /> :
                                <Image
                                    source={require('../../asset/img/home_alert_light.png')}
                                    style={{ width: '100%', height: 350 }}
                                />
                            }

                        </View> :

                            <View>
                                {isDark ? <Rive ref={riveRef} resourceName="housedark" animationName='Intro' stateMachineName='Slate Machine 1' autoplay={true} onPlay={() => console.log("Intro started")}
                                    onStop={() => {
                                        console.log("Intro finished");
                                        riveRef.current?.play('Loop'); // Play the loop animation after intro ends
                                    }} style={{ width: screenWidth - 10, marginLeft: -10, height: 400 }} />
                                    : <Rive ref={riveRef} resourceName="houselight" animationName='Intro' stateMachineName='Slate Machine 1' autoplay={true} onPlay={() => console.log("Intro started")}
                                        onStop={() => {
                                            console.log("Intro finished");
                                            riveRef.current?.play('Loop'); // Play the loop animation after intro ends
                                        }} style={{ width: screenWidth - 10, marginLeft: -10, height: 400 }} />
                                }
                            </View>
                        }
                    </View> : <View>{statusLogs != undefined || statusLogs != null ?
                        <View>
                            {isDark ? <Rive ref={riveRef} resourceName="offlinedark" animationName='State Machine 1' stateMachineName='State Machine 1' autoplay={true} style={{ width: screenWidth - 10, marginLeft: -10, height: 400 }} />
                                : <Rive ref={riveRef} resourceName="offlinelight" animationName='State Machine 1' stateMachineName='State Machine 1' autoplay={true} style={{ width: screenWidth - 10, marginLeft: -10, height: 400 }} />
                            }
                        </View>
                        :
                        <View style={{ padding: '2%', paddingTop: '5%' }}>
                            {isDark ? <Image
                                source={require('../../asset/img/homeinactivedark.png')}
                                style={{ width: '100%',height: 350 }}
                            />
                                : <Image
                                    source={require('../../asset/img/homeinactivelight.png')}
                                    style={{ width: '100%', height: 350 }}
                                />
                            }
                        </View>
                    }
                    </View>
                    }


                </View>
                <View style={{ flexDirection: 'row', gap: -15 }}>
                    {isDark ? <UpDownDark style={{ marginTop: 18 }} /> : <UpDown style={{ marginTop: 18 }} />}
                    <Picker
                        selectedValue={radioValue}
                        onValueChange={(itemValue) => setRadioValues(itemValue)}
                        style={{ color: colors.text, width: 150,fontFamily:'Avenir Medium' }}
                    >
                        <Picker.Item style={{fontFamily:'Avenir Medium'}} label="kilowatts" value="kilowatts" />
                        <Picker.Item style={{fontFamily:'Avenir Medium'}} label="units" value="units" />
                    </Picker>
                    <View style={{ flexDirection: 'row', marginLeft: '20%' }}>
                        {isDark ? <WatchDark style={{ marginTop: 18, marginRight: 4 }} /> : <Watch style={{ marginTop: 18, marginRight: 4 }} />}
                        <Text style={{ fontSize: 12, color: colors.label, fontWeight: '400', marginTop: 18 }}>Update: {diffMinutes} min ago</Text>
                    </View>
                </View>
            </View>

            {/* Energy Generation Section */}
            <View style={{ borderWidth: 1, borderColor: 'rgba(177, 177, 177, 0.20)', borderStyle: 'solid', borderRadius: 8, paddingTop: 24, alignItems: 'center', paddingRight: '2%', paddingLeft: '2%', backgroundColor: colors.boxBackground }}>
                <Text style={{ fontSize: 12, color: colors.labelgrey, fontWeight: '400', left: '30%' }}>Today: {new Date().getDate() + ' ' + monthsArray[new Date().getMonth()]}</Text>
                {customerData?.solar_device_id ?
                    <EnergyGeneration color={colors} activeTab={activeTab} getTotalEnergy={getTotalEnergy} refreshing={refreshing} customerData={customerData} /> : <EnergyGenerationDisabled color={colors} activeTab={activeTab} getTotalEnergy={getTotalEnergy} refreshing={refreshing} customerData={customerData} />
                }
                {/* <EnergyGeneration color={colors} activeTab={activeTab} getTotalEnergy={getTotalEnergy} refreshing={refreshing} customerData={customerData} /> */}


                {/* Tabs */}
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    marginBottom: 16,
                    marginTop: 24,
                    backgroundColor: colors.tabBg,
                    borderRadius: 20,
                }}>
                    {['Today', '1W', '1M', '6M', '1Y'].map((tab) => (
                        <TouchableOpacity
                            key={tab}
                            onPress={() => setActiveTabFunction(tab)}
                            style={{
                                paddingVertical: 6,
                                marginVertical: 2,
                                paddingHorizontal: 15,
                                backgroundColor: activeTab === tab ? colors.activeTab : 'rgba(230, 230, 230, 0.0)',
                                borderRadius: 20,
                                marginHorizontal: 5,
                            }}
                        >
                            <Text style={{ fontFamily: 'Avenir Medium', color: colors.text, fontSize: 14 }}>
                                {tab}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Stats Section */}
                <View style={{ paddingBottom: 16, paddingTop: 16, width: '90%' }}>
                    {[
                        { icon: isDark ? <ThunderDark style={{ marginRight: 12 }} /> : <Thunder color={colors.text} style={{ marginRight: 12 }} />, label: 'Total Energy', value: customerData.solar_device_id ? `${totalPower} ${unitValues}` : `0 ${unitValues}` },
                        // { icon: isDark ? <CottageDark style={{ marginRight: 12 }} /> : <Cottage color={colors.text} style={{ marginRight: 12 }} />, label: 'Home consumption', value: '0 kWh' },
                        // { icon: isDark ? <CellTowerDark style={{ marginRight: 12 }} /> : <CellTower color={colors.text} style={{ marginRight: 12 }} />, label: 'Grid export', value: '0 kWh' },
                        { icon: isDark ? <CurrencyRupeeDark style={{ marginRight: 12 }} /> : <CurrencyRupee color={colors.text} style={{ marginRight: 12 }} />, label: 'Savings', value: customerData.solar_device_id ? `₹${parseInt(totalPowerSavings)}` : '₹0' },
                    ].map((item, index, array) => (
                        <View key={index}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 12 }}>
                                {item.icon}
                                <Text style={{ flex: 1, fontFamily: 'Avenir Medium', color: colors.text }}>{item.label}</Text>
                                <Text style={{ fontFamily: 'Avenir Medium', color: colors.text }}>{item.value}</Text>
                            </View>
                            {index !== array.length - 1 ?
                                <View style={{ height: 0, alignSelf: 'stretch', borderWidth: 0.5, borderColor: 'rgba(177, 177, 177, 0.30)', opacity: 0.5 }}></View> : null
                            }
                        </View>
                    ))}
                </View>
            </View>
            {/* Saving Report */}
            <View style={{ borderWidth: 1, borderStyle: 'solid', borderColor: 'rgba(177, 177, 177, 0.20)', borderRadius: 8, marginTop: 16, marginBottom: '7%', backgroundColor: colors.boxBackground }}>
                <View style={{ marginTop: 24, flexDirection: 'row', gap: 70 }}>
                    <View style={{ flexDirection: 'row' }}>
                        {isDark ? <TotalSavingDark style={{ marginRight: 10, marginTop: 4, marginLeft: 10 }} /> : <TotalSaving style={{ marginRight: 10, marginTop: 4, marginLeft: 10 }} />}
                        <Text style={{ fontSize: 16, marginBottom: 8, color: colors.label, fontWeight: '400',fontFamily:'Avenir Medium' }}>Saving report</Text>
                    </View>
                    <View style={{
                        position: 'relative',
                        borderColor: 'rgba(177, 177, 177, 0.20)',
                        backgroundColor: colors.activeTab,
                        borderWidth: 1,
                        borderRadius: 50,
                    }}>
                        <Picker
                            selectedValue={selectedValue}
                            onValueChange={(itemValue) => setSelectedValue(itemValue)}
                            style={{ color: colors.text, width: 120 }}
                        >
                            {yearDropDown.map((value: any, ind: any) => {
                                return <Picker.Item key={ind} label={value} value={value} />
                            })}
                            {/* <Picker.Item label="2025" value="2025" />
                            <Picker.Item label="2024" value="2024" /> */}

                        </Picker>
                        {/* <DropdownUpArrow style={{ position: 'absolute', top: 18 }} /> */}
                    </View>
                </View>
                {customerData?.solar_device_id ?
                    <Financial color={colors} selectedValue={selectedValue} refreshing={refreshing} customerData={customerData} />
                    : <FinancialDisabled color={colors} selectedValue={selectedValue} refreshing={refreshing} customerData={customerData} />
                }

            </View>
        </ScrollView>
    );
};

export default HomeScreen;
