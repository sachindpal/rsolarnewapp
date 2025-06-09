import React, { useState } from 'react';
import { View, Text, Image, ScrollView, Dimensions, TouchableOpacity, StyleSheet } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
// import { Ionicons } from '@expo/vector-icons';
// import riveFile from '../../asset/img/inverter.riv'
import Rive from 'rive-react-native';
import { CellTower, Cottage, CurrencyRupee, DropdownDownArrow, DropdownUpArrow, Thunder } from '../../asset/img';
import EnergyGeneration from './EnergyGeneration';
import Financial from './FInancial';
import RNPickerSelect from 'react-native-picker-select';
import { Picker } from '@react-native-picker/picker';
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const HomeScreen = () => {
  const [activeTab, setActiveTab] = useState('Today');
  const [selectedValue, setSelectedValue] = useState('2025');
  const barData = {
    labels: ['7', '8', '9', '10', '11', '12', '1P'],
    datasets: [
      {
        data: [1, 2, 3, 2, 2, 1, 0.7],
        colors: [
          () => '#F48C06',
          () => '#F48C06',
          () => '#F48C06',
          () => '#F48C06',
          () => '#F48C06',
          () => '#F48C06',
          () => '#F48C06',
        ],
      },
    ],
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#fff', padding: 16 }}>
      {/* Header */}
      <View style={{ flexDirection: 'column', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <Text style={{ fontSize: 24, fontFamily: 'Avenir-Medium', color: '#242734', fontWeight: '800' }}>Home</Text>
        <Text style={{ fontSize: 12, color: 'rgba(36, 39, 52, 0.50)', fontFamily: 'Avenir-Medium', fontWeight: '400' }}>● R-Solar is up and running.</Text>
      </View>

      {/* House Image and Stats */}
      <View >
        <Rive
          resourceName="inverter" // name without .riv if stored in assets
          // artboardName="YourArtboardName" // optional
          // animationName="YourAnimationName" // optional
          autoplay={true}
          style={{ width: screenWidth, height: 400 }}
        />
        <Text style={{ fontSize: 12, color: '#888', marginTop: 8, fontFamily: 'Avenir-Medium' }}>Power unit</Text>
        <Text style={{ fontSize: 16, fontFamily: 'Avenir-Medium', color: 'red' }}>0 kWh</Text>
      </View>



      {/* Bar Graph */}
      <View>
        <Text style={{ fontSize: 16, marginBottom: 8, fontFamily: 'Avenir-Medium', color: '#000' }}>Today: 21 May</Text>
        <View style={{ flexDirection: 'row', marginBottom: 8 }}>
          <Text style={{ fontFamily: 'Avenir-Medium', color: '#F48C06' }}>Home 30%</Text>
          <Text style={{ marginLeft: 16, fontFamily: 'Avenir-Medium', color: '#F9D57E' }}>Grid 70%</Text>
        </View>

        {/* <BarChart
          data={barData}
          width={screenWidth - 32}
          height={220}
          yAxisLabel=""
          yAxisSuffix="" // ← Add this line
          chartConfig={{
            backgroundGradientFrom: '#fff',
            backgroundGradientTo: '#fff',
            decimalPlaces: 1,
            color: () => `#F48C06`,
            labelColor: () => '#000',
            style: { borderRadius: 8 },
            propsForBackgroundLines: { stroke: '#eee' },
          }}
          style={{ borderRadius: 8 }}
          fromZero={true}
          showValuesOnTopOfBars={true}
        />
         */}
        <EnergyGeneration />
      </View>
      {/* Tabs */}
      <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 16, marginTop: 24, backgroundColor: 'rgba(231, 230, 236, 0.50)', borderRadius: 20 }}>
        {['Today', '1W', '1M', '6M', '1Y'].map((tab) => (
          <TouchableOpacity
            key={tab}
            onPress={() => setActiveTab(tab)}
            style={{
              paddingVertical: 6,
              paddingHorizontal: 16,
              backgroundColor: activeTab === tab ? '#FFF' : 'rgba(231, 230, 236, 0.50)',
              borderRadius: activeTab === tab || tab == '1Y' ? 20 : 0,
              marginHorizontal: 6,
              // borderRadius: 20,
            }}
          >
            <Text
              style={{
                fontFamily: 'Avenir-Medium',
                color: '#232734',
                fontSize: 14,
              }}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      {/* Stats Section */}
      <View style={{ paddingBottom: 16, paddingTop: 16 }}>
        {[
          { icon: <Thunder color="#333" style={{ marginRight: 12 }} />, label: 'Power', value: '11.5 kWh' },
          { icon: <Cottage color="#333" style={{ marginRight: 12 }} />, label: 'Home consumption', value: '0 kWh' },
          { icon: <CellTower color="#333" style={{ marginRight: 12 }} />, label: 'Grid export', value: '0 kWh' },
          { icon: <CurrencyRupee color="#333" style={{ marginRight: 12 }} />, label: 'Savings', value: '₹34' },
        ].map((item, index) => (
          <View key={index} style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 12 }}>
            {item.icon}
            <Text style={{ flex: 1, fontFamily: 'Avenir-Medium', color: '#000' }}>{item.label}</Text>
            <Text style={{ fontFamily: 'Avenir-Medium', color: '#000' }}>{item.value}</Text>
          </View>

        ))}
      </View>

      {/* Saving Report */}
      <View style={{ marginTop: 24, flexDirection: 'row',gap:110 }}>
        <Text style={{ fontSize: 16, marginBottom: 8, fontFamily: 'Avenir-Medium', color: '#232734', fontWeight: '400' }}>Saving report</Text>
        <View style={{ position:'relative',borderColor:'rgba(177, 177, 177, 0.20)',backgroundColor:'#FFF',borderWidth:1,borderRadius:50 }}>
          <Picker
            selectedValue={selectedValue}
            onValueChange={(itemValue) => setSelectedValue(itemValue)}
            style={{ color: 'black', width: 120 }}
          >
            <Picker.Item label="2025" value="2025" />
            <Picker.Item label="2024" value="2024" />
            <Picker.Item label="2023" value="2023" />
          </Picker>
          <DropdownUpArrow style={{position:'absolute',left:60,top:18}}/>
        </View>

      </View>
      <Financial />

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginTop: 50,
  },
  label: {
    marginBottom: 10,
    fontSize: 16,
    color: 'black'
  },
  value: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputAndroid: {
    fontSize: 16,
    // paddingHorizontal: 10,
    // paddingVertical: 8,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30,
    width: 70,
    // backgroundColor:'black'
  },
});

export default HomeScreen;
