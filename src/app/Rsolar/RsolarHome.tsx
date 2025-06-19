import React, { useEffect, useState } from 'react';
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

const screenWidth = Dimensions.get('window').width;
const fullYear = new Date().getFullYear();
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
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [totalPower, setTotalPower] = useState<any>(0);
    const [totalPowerSavings, setTotalPowerSavings] = useState<any>(0);
    const riveRef = React.useRef<RiveRef>(null);
    const colors = {
        background: isDarkMode ? '#121212' : '#fff',
        text: isDarkMode ? '#fff' : '#242734',
        subText: isDarkMode ? '#bbb' : 'rgba(36, 39, 52, 0.50)',
        card: isDarkMode ? '#1E1E1E' : '#F9F9F9',
        tabBg: isDarkMode ? '#222' : 'rgba(231, 230, 236, 0.50)',
        activeTab: isDarkMode ? '#333' : '#FFF',
        label: isDarkMode ? '#ddd' : '#000',
        labelgrey: isDarkMode ? '#ddd' : '#848484',
    };
    const setActiveTabFunction = (tab: any) => {

        setActiveTab(tab)
    }

    useEffect(() => {

    }, [])

    const getTotalEnergy = (energy: any) => {

        if (energy.length > 0) {
            let totalPowers = 0
            for (let index = 0; index < energy.length; index++) {
                const element = energy[index];
                console.log('element.grid', element.grid)
                totalPowers += element.grid

            }
            setTotalPower(totalPowers.toFixed(2))
            let totalSaving = (totalPowers * 10).toFixed(2)
            setTotalPowerSavings(totalSaving)
            console.log('energy', totalPowers)

        }

    }



    return (
        <ScrollView style={{ flex: 1, backgroundColor: colors.background, padding: 16 }}>
            {/* Dark Mode Switch */}
            <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', marginBottom: 12 }}>
                <Text style={{ color: colors.text, marginRight: 8 }}>Dark Mode</Text>
                <Switch
                    value={isDarkMode}
                    onValueChange={(val) => setIsDarkMode(val)}
                    thumbColor={isDarkMode ? '#F48C06' : '#ccc'}
                    trackColor={{ false: '#ccc', true: '#F9D57E' }}
                />
            </View>

            {/* Header */}
            <View>
                <Text style={{ fontSize: 24, fontFamily: 'Avenir-Medium', color: colors.text, fontWeight: '800' }}>Home</Text>
                <Text style={{ fontSize: 12, color: colors.subText, fontFamily: 'Avenir-Medium' }}>● R-Solar is up and running.</Text>
            </View>

            {/* Rive Animation */}
            <View>
                {isDarkMode ? <Rive ref={riveRef} resourceName="housedark" animationName='Intro' stateMachineName='Slate Machine 1' autoplay={true} onPlay={() => console.log("Intro started")}
                    onStop={() => {
                        console.log("Intro finished");
                        riveRef.current?.play('Loop'); // Play the loop animation after intro ends
                    }} style={{ width: screenWidth, height: 400 }} /> 
                    : <Rive ref={riveRef} resourceName="houselight" animationName='Intro' stateMachineName='Slate Machine 1' autoplay={true} onPlay={() => console.log("Intro started")}
                        onStop={() => {
                            console.log("Intro finished");
                            riveRef.current?.play('Loop'); // Play the loop animation after intro ends
                        }} style={{ width: screenWidth, height: 400 }} />
                        }
                <View style={{ flexDirection: 'row', gap: -15 }}>
                    {isDarkMode ? <UpDownDark style={{ marginTop: 18 }} /> : <UpDown style={{ marginTop: 18 }} />}
                    <Picker
                        selectedValue={radioValue}
                        onValueChange={(itemValue) => setRadioValue(itemValue)}
                        style={{ color: colors.text, width: 150 }}
                    >
                        <Picker.Item label="kilowatts" value="kilowatts" />
                        <Picker.Item label="watt" value="watt" />
                    </Picker>
                    <View style={{ flexDirection: 'row', marginLeft: '20%' }}>
                        {isDarkMode ? <WatchDark style={{ marginTop: 18, marginRight: 4 }} /> : <Watch style={{ marginTop: 18, marginRight: 4 }} />}
                        <Text style={{ fontSize: 12, color: colors.label, fontWeight: '400', marginTop: 18 }}>Update: 1min ago</Text>
                    </View>
                </View>
            </View>

            {/* Energy Generation Section */}
            <View style={{ borderWidth: 1, borderColor: 'rgba(177, 177, 177, 0.20)', borderStyle: 'solid', borderRadius: 8, paddingTop: 24, alignItems: 'center', paddingRight: '2%', paddingLeft: '2%' }}>
                <Text style={{ fontSize: 12, marginBottom: 50, color: colors.labelgrey, fontWeight: '400', left: '30%' }}>Today: 21 May</Text>
                <View style={{ flexDirection: 'row', marginBottom: 8, justifyContent: 'center', borderColor: '#F2F2F5', borderWidth: 1, borderRadius: 8, borderStyle: 'solid', width: '50%', alignItems: 'center', paddingVertical: 4, paddingHorizontal: 8 }}>
                    <Text style={{ color: '#F48C06' }}>Home 30%</Text>
                    <Text style={{ marginLeft: 16, color: '#F9D57E' }}>Grid 70%</Text>
                </View>
                <EnergyGeneration color={colors} activeTab={activeTab} getTotalEnergy={getTotalEnergy} />


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
                                paddingHorizontal: 16,
                                backgroundColor: activeTab === tab ? colors.activeTab : colors.tabBg,
                                borderRadius: 20,
                                marginHorizontal: 6,
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
                        { icon: isDarkMode ? <ThunderDark style={{ marginRight: 12 }} /> : <Thunder color={colors.text} style={{ marginRight: 12 }} />, label: 'Power', value: `${totalPower} kWh` },
                        { icon: isDarkMode ? <CottageDark style={{ marginRight: 12 }} /> : <Cottage color={colors.text} style={{ marginRight: 12 }} />, label: 'Home consumption', value: '0 kWh' },
                        { icon: isDarkMode ? <CellTowerDark style={{ marginRight: 12 }} /> : <CellTower color={colors.text} style={{ marginRight: 12 }} />, label: 'Grid export', value: '0 kWh' },
                        { icon: isDarkMode ? <CurrencyRupeeDark style={{ marginRight: 12 }} /> : <CurrencyRupee color={colors.text} style={{ marginRight: 12 }} />, label: 'Savings', value: `₹${totalPowerSavings}` },
                    ].map((item, index) => (
                        <View key={index} style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 12 }}>
                            {item.icon}
                            <Text style={{ flex: 1, fontFamily: 'Avenir-Medium', color: colors.text }}>{item.label}</Text>
                            <Text style={{ fontFamily: 'Avenir-Medium', color: colors.text }}>{item.value}</Text>
                        </View>
                    ))}
                </View>
            </View>
            {/* Saving Report */}
            <View style={{ borderWidth: 1, borderStyle: 'solid', borderColor: 'rgba(177, 177, 177, 0.20)', borderRadius: 8, marginTop: 16, padding: 8, marginBottom: '7%' }}>
                <View style={{ marginTop: 24, flexDirection: 'row', gap: 70 }}>
                    <View style={{ flexDirection: 'row' }}>
                        {isDarkMode ? <TotalSavingDark style={{ marginRight: 10, marginTop: 4 }} /> : <TotalSaving style={{ marginRight: 10, marginTop: 4 }} />}
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

                <Financial color={colors} selectedValue={selectedValue} />
            </View>
        </ScrollView>
    );
};

export default HomeScreen;
