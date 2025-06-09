import React, { useState } from 'react';
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
import Rive from 'rive-react-native';
import {
  CellTower,
  Cottage,
  CurrencyRupee,
  DropdownUpArrow,
  Thunder,
} from '../../asset/img';
import EnergyGeneration from './EnergyGeneration';
import Financial from './FInancial';

const screenWidth = Dimensions.get('window').width;

const HomeScreen = () => {
  const [activeTab, setActiveTab] = useState('Today');
  const [selectedValue, setSelectedValue] = useState('2025');
  const [isDarkMode, setIsDarkMode] = useState(false);

  const colors = {
    background: isDarkMode ? '#121212' : '#fff',
    text: isDarkMode ? '#fff' : '#000',
    subText: isDarkMode ? '#bbb' : 'rgba(36, 39, 52, 0.50)',
    card: isDarkMode ? '#1E1E1E' : '#F9F9F9',
    tabBg: isDarkMode ? '#222' : 'rgba(231, 230, 236, 0.50)',
    activeTab: isDarkMode ? '#333' : '#FFF',
    label: isDarkMode ? '#ddd' : '#000',
  };

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
        <Rive resourceName="inverter" autoplay style={{ width: screenWidth, height: 400 }} />
        <Text style={{ fontSize: 12, color: colors.subText, marginTop: 8 }}>Power unit</Text>
        <Text style={{ fontSize: 16, color: 'red' }}>0 kWh</Text>
      </View>

      {/* Energy Generation Section */}
      <View>
        <Text style={{ fontSize: 16, marginBottom: 8, color: colors.label }}>Today: 21 May</Text>
        <View style={{ flexDirection: 'row', marginBottom: 8 }}>
          <Text style={{ color: '#F48C06' }}>Home 30%</Text>
          <Text style={{ marginLeft: 16, color: '#F9D57E' }}>Grid 70%</Text>
        </View>
        <EnergyGeneration />
      </View>

      {/* Tabs */}
      <View style={{
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 16,
        marginTop: 24,
        backgroundColor: colors.tabBg,
        borderRadius: 20
      }}>
        {['Today', '1W', '1M', '6M', '1Y'].map((tab) => (
          <TouchableOpacity
            key={tab}
            onPress={() => setActiveTab(tab)}
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
      <View style={{ paddingBottom: 16, paddingTop: 16 }}>
        {[
          { icon: <Thunder color={colors.text} style={{ marginRight: 12 }} />, label: 'Power', value: '11.5 kWh' },
          { icon: <Cottage color={colors.text} style={{ marginRight: 12 }} />, label: 'Home consumption', value: '0 kWh' },
          { icon: <CellTower color={colors.text} style={{ marginRight: 12 }} />, label: 'Grid export', value: '0 kWh' },
          { icon: <CurrencyRupee color={colors.text} style={{ marginRight: 12 }} />, label: 'Savings', value: '₹34' },
        ].map((item, index) => (
          <View key={index} style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 12 }}>
            {item.icon}
            <Text style={{ flex: 1, fontFamily: 'Avenir-Medium', color: colors.text }}>{item.label}</Text>
            <Text style={{ fontFamily: 'Avenir-Medium', color: colors.text }}>{item.value}</Text>
          </View>
        ))}
      </View>

      {/* Saving Report */}
      <View style={{ marginTop: 24, flexDirection: 'row', gap: 110 }}>
        <Text style={{ fontSize: 16, marginBottom: 8, color: colors.label, fontWeight: '400' }}>Saving report</Text>
        <View style={{
          position: 'relative',
          borderColor: 'rgba(177, 177, 177, 0.20)',
          backgroundColor: colors.activeTab,
          borderWidth: 1,
          borderRadius: 50
        }}>
          <Picker
            selectedValue={selectedValue}
            onValueChange={(itemValue) => setSelectedValue(itemValue)}
            style={{ color: colors.text, width: 120 }}
          >
            <Picker.Item label="2025" value="2025" />
            <Picker.Item label="2024" value="2024" />
            <Picker.Item label="2023" value="2023" />
          </Picker>
          {/* <DropdownUpArrow style={{ position: 'absolute', left: 60, top: 18 }} /> */}
        </View>
      </View>

      <Financial />
    </ScrollView>
  );
};

export default HomeScreen;
