import React, { useCallback, useEffect, useState } from 'react';
import {
    View,
    Text,
    ScrollView,
    Dimensions,
    TouchableOpacity,
    StyleSheet,
    Switch,
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
import { useIsFocused } from '@react-navigation/native';
import { RefreshControl } from 'react-native-gesture-handler';

const screenWidth = Dimensions.get('window').width;
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
    console.log('difference', difference)
    for (let index = 0; index <= difference; index++) {
        yearDropDowns.push(tempFullYear.toString())
        tempFullYear--;

    }

    return yearDropDowns
}

const HomeScreen = () => {
    const [yearDropDown, setYearDropDown] = useState<any>(getYearsDropdown());

    const [activeTab, setActiveTab] = useState('Today');
    const [selectedValue, setSelectedValue] = useState(fullYear);
    const [radioValue, setRadioValue] = useState('kilowatts');
    const { isDark, setIsDark } = useData();
    const [totalPower, setTotalPower] = useState<any>(0);
    const [totalPowerSavings, setTotalPowerSavings] = useState<any>(0);
    const riveRef = React.useRef<RiveRef>(null);
    const [startTime,setstartTime] = useState(new Date()); // capture time when screen is loaded
    const [diffMinutes, setDiffMinutes] = useState(0);
  const [refreshing, setRefreshing] = useState(false);

    const isFocused = useIsFocused()
const [pvPower,sePvPower] = useState<any>(0.0)
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

  

    const onRefresh = useCallback(() => {
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
    


    const getTotalEnergy = (energy: any,pvPower:any) => {
        sePvPower(pvPower)
        console.log('pvPower',pvPower)
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





    return (
        <ScrollView style={{ flex: 1, backgroundColor: colors.background, padding: 16 }} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
            {/* Dark Mode Switch */}


            {/* Header */}
            <View>
                <Text style={{ fontSize: 24, fontFamily: 'Avenir-Medium', color: colors.text, fontWeight: '800' }}>Home</Text>
                <Text style={{ fontSize: 12, color: colors.subText, fontFamily: 'Avenir-Medium' }}><Text style={{ color: '#74C043' }}>●</Text> R-Solar is up and running.</Text>
            </View>

            {/* Rive Animation */}
            <View >
                <View style={{position:'relative'}}>
                    <View style={{position:'absolute',backgroundColor:'linear-gradient(0deg, rgba(115, 190, 68, 0.10) 0%, rgba(115, 190, 68, 0.10) 100%), rgba(255, 255, 255, 0.80)',borderRadius:8,borderWidth:0.5,borderColor:'rgba(115, 190, 68, 0.60)',padding:8,alignItems:'flex-start',marginLeft:'80%',marginTop:'20%',zIndex:1}}>
                        
                        <Text style={{ color: '#74C043' }}>● Panel</Text>
                        <View style={{flexDirection:'row',gap:5}}>
                        <Text style={{color:colors.text,fontWeight:'500',fontSize:12,fontFamily:'Avenir'}}>{parseFloat(pvPower).toFixed(2)}</Text>
                        <Text style={{color:colors.labelgrey,fontWeight:'500',fontSize:8,fontFamily:'Avenir',marginTop:5}}>kWh</Text>
                        </View>
                    </View>
                {isDark ? <Rive ref={riveRef} resourceName="housedark" animationName='Intro' stateMachineName='Slate Machine 1' autoplay={true} onPlay={() => console.log("Intro started")}
                    onStop={() => {
                        console.log("Intro finished");
                        riveRef.current?.play('Loop'); // Play the loop animation after intro ends
                    }} style={{ width: screenWidth-10, height: 400 }} />
                    : <Rive ref={riveRef} resourceName="houselight" animationName='Intro' stateMachineName='Slate Machine 1' autoplay={true} onPlay={() => console.log("Intro started")}
                        onStop={() => {
                            console.log("Intro finished");
                            riveRef.current?.play('Loop'); // Play the loop animation after intro ends
                        }} style={{ width: screenWidth-10, height: 400 }} />
                }
                </View>
                <View style={{ flexDirection: 'row', gap: -15 }}>
                    {isDark ? <UpDownDark style={{ marginTop: 18 }} /> : <UpDown style={{ marginTop: 18 }} />}
                    <Picker
                        selectedValue={radioValue}
                        onValueChange={(itemValue) => setRadioValue(itemValue)}
                        style={{ color: colors.text, width: 150 }}
                    >
                        <Picker.Item label="kilowatts" value="kilowatts" />
                        {/* <Picker.Item label="watt" value="watt" /> */}
                    </Picker>
                    <View style={{ flexDirection: 'row', marginLeft: '20%' }}>
                        {isDark ? <WatchDark style={{ marginTop: 18, marginRight: 4 }} /> : <Watch style={{ marginTop: 18, marginRight: 4 }} />}
                        <Text style={{ fontSize: 12, color: colors.label, fontWeight: '400', marginTop: 18 }}>Update: {diffMinutes} min ago</Text>
                    </View>
                </View>
            </View>

            {/* Energy Generation Section */}
            <View style={{ borderWidth: 1, borderColor: 'rgba(177, 177, 177, 0.20)', borderStyle: 'solid', borderRadius: 8, paddingTop: 24, alignItems: 'center', paddingRight: '2%', paddingLeft: '2%',backgroundColor:colors.boxBackground }}>
                <Text style={{ fontSize: 12,  color: colors.labelgrey, fontWeight: '400', left: '30%' }}>Today: {new Date().getDate() + ' ' + monthsArray[new Date().getMonth()]}</Text>
               
                <EnergyGeneration color={colors} activeTab={activeTab} getTotalEnergy={getTotalEnergy} refreshing={refreshing} />


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
                                marginVertical:2,
                                paddingHorizontal: 15,
                                backgroundColor: activeTab === tab ? colors.activeTab : 'rgba(230, 230, 230, 0.0)',
                                borderRadius: 20,
                                marginHorizontal: 5,
                            }}
                        >
                            <Text style={{ fontFamily: 'Avenir-Medium', color: colors.text, fontSize: 14 }}>
                                {tab}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Stats Section */}
                <View style={{ paddingBottom: 16, paddingTop: 16, width: '90%' }}>
                    {[
                        { icon: isDark ? <ThunderDark style={{ marginRight: 12 }} /> : <Thunder color={colors.text} style={{ marginRight: 12 }} />, label: 'Total Energy', value: `${totalPower} kWh` },
                        { icon: isDark ? <CottageDark style={{ marginRight: 12 }} /> : <Cottage color={colors.text} style={{ marginRight: 12 }} />, label: 'Home consumption', value: '0 kWh' },
                        { icon: isDark ? <CellTowerDark style={{ marginRight: 12 }} /> : <CellTower color={colors.text} style={{ marginRight: 12 }} />, label: 'Grid export', value: '0 kWh' },
                        { icon: isDark ? <CurrencyRupeeDark style={{ marginRight: 12 }} /> : <CurrencyRupee color={colors.text} style={{ marginRight: 12 }} />, label: 'Savings', value: `₹${totalPowerSavings}` },
                    ].map((item, index, array) => (
                        <View key={index}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 12 }}>
                                {item.icon}
                                <Text style={{ flex: 1, fontFamily: 'Avenir-Medium', color: colors.text }}>{item.label}</Text>
                                <Text style={{ fontFamily: 'Avenir-Medium', color: colors.text }}>{item.value}</Text>
                            </View>
                            {index !== array.length - 1 ?
                                <View style={{ height: 0, alignSelf: 'stretch', borderWidth: 0.5, borderColor: 'rgba(177, 177, 177, 0.30)' }}></View> : null
                            }
                        </View>
                    ))}
                </View>
            </View>
            {/* Saving Report */}
            <View style={{ borderWidth: 1, borderStyle: 'solid', borderColor: 'rgba(177, 177, 177, 0.20)', borderRadius: 8, marginTop: 16, padding: 8, marginBottom: '7%',backgroundColor:colors.boxBackground }}>
                <View style={{ marginTop: 24, flexDirection: 'row', gap: 70 }}>
                    <View style={{ flexDirection: 'row' }}>
                        {isDark ? <TotalSavingDark style={{ marginRight: 10, marginTop: 4 }} /> : <TotalSaving style={{ marginRight: 10, marginTop: 4 }} />}
                        <Text style={{ fontSize: 16, marginBottom: 8, color: colors.label, fontWeight: '400' }}>Saving report</Text>
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

                <Financial color={colors} selectedValue={selectedValue} refreshing={refreshing} />
            </View>
        </ScrollView>
    );
};

export default HomeScreen;
