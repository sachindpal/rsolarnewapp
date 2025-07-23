import React, { useEffect, useState } from 'react';
import { Defs, LinearGradient, Stop } from 'react-native-svg';
import { VictoryBar, VictoryChart, VictoryAxis } from 'victory-native';
import {
    View,
    ScrollView,
    Dimensions,
    StyleSheet,
} from 'react-native';
import * as VictoryNative from 'victory-native';
import { postAuthReq, postUnAuthReq } from '../Service/APIServices/axoisService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import moment from 'moment';


const screenWidth = Dimensions.get('window').width;

// Example data
const data = [
  { hour: "May'25", home: 0.8, grid: 0.2 },
  { hour: "Jun'25", home: 1.5, grid: 0.5 },
  { hour: "July'25", home: 0.9, grid: 2.1 },
  { hour: "Aug'25", home: 1.2, grid: 1.8 },
  { hour: "Sep'25", home: 1.1, grid: 0.9 },
  { hour: "Oct'25", home: 0.5, grid: 2.5 },
  { hour: "Nov'25", home: 1.8, grid: 1.2 },
  { hour: "Dec'25", home: 0.6, grid: 2.4 },
  { hour: "Jan'25", home: 2.0, grid: 1.0 },
];
const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
]


const FinancialDisabled = ({color,selectedValue,refreshing,customerData}:any) => {

    const [selectedIndex, setSelectedIndex] = useState(null);


    const today = new Date();

    const day = today.getDate();           // 1 - 31
    const month = today.getMonth() + 1;    // 0 - 11 (+1 to make it 1 - 12)
    const year = today.getFullYear();      // e.g., 2025
  
    console.log(`Date: ${day}-${month}-${year}`);
    const [data, setEnergyData] = useState<any>([
      { hour: '7', home: 0.8, grid: 0.2 },
      { hour: '8', home: 1.5, grid: 0.5 },
      { hour: '9', home: 0.9, grid: 2.1 },
      { hour: '10', home: 1.2, grid: 1.8 },
      { hour: '11', home: 1.1, grid: 0.9 },
      { hour: '12', home: 0.5, grid: 2.5 },
      { hour: '1', home: 1.8, grid: 1.2 },
      { hour: '2', home: 0.6, grid: 2.4 },
      { hour: '3', home: 2.0, grid: 10.0 },
    ])
    const [userInfo, setUserInfo] = useState<any>({})
    const [params, setParams] = useState({
      year: year,
      deviceid: ''
    });
  
  
    useEffect(() => {
      console.log('selectedValue',selectedValue)
      
      getUserInfo()
    }, [selectedValue,refreshing])
  
    const getUserInfo = async () => {
    //   const getInfo: any = await AsyncStorage.getItem('solar_customer_data');
      
    //   setUserInfo(JSON.parse(getInfo))
  
    //   getData(customerData)
    }
  
    

    const gridData = data.map((d: any, ind: any) => ({
        x: d.hour,
        y: d.grid,
        label: `₹${parseInt(d.grid)*10}`,

    }));

    const barsPerPage = 5;
  const barWidth = 60;
  const chartWidth = data.length * barWidth;
    //============================================================

    const GradientDefs = () => (
        <Defs>
            <LinearGradient id="greenGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <Stop offset="0%" stopColor="rgba(204, 204, 204, 0.80)" stopOpacity="1" />
            <Stop offset="100%" stopColor="rgba(255, 255, 255, 0.80)" stopOpacity="0.3" />
            </LinearGradient>
            <LinearGradient id="orangeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <Stop offset="0%" stopColor="#FF9800" stopOpacity="1" />
                <Stop offset="100%" stopColor="#FFEB3B" stopOpacity="0.6" />
            </LinearGradient>
        </Defs>
    );

    return (
        <View
            
            
        >
            <VictoryChart
                domainPadding={{ x: 15 }}
                padding={{ top: 50, bottom: 40, left: 40, right: 20 }}
                width={chartWidth}
                height={210}
            >

<VictoryNative.VictoryLabel
    text="No Data"
    x={175}         // adjust X to center based on chart width
    y={50}         // adjust Y to vertically position
    textAnchor="middle"
    style={{ fontSize: 14, fill: '#888', fontWeight: '400',fontFamily:'Avenir Medium', }}
  />
                <GradientDefs />

                <VictoryAxis
                    style={{
                        tickLabels: { fill: '#777', fontSize: 12 },
                        axis: { stroke:color.grphHorizontalLine,strokeWidth:0.5,opacity:0.5 },

                    }}
                />
                

                <VictoryBar
                    data={gridData}
                    barWidth={10}
                    cornerRadius={{ top: 5 }}
                    labelComponent={<VictoryNative.VictoryLabel dy={-10} style={{color:color.labelgrey,fill:color.labelgrey}} />}

                    style={{
                        data: {
                            fill: ({ index }) =>
                                index === selectedIndex ? 'url(#orangeGradient)' : 'url(#greenGradient)',
                        },
                    }}
                    // events={[
                    //     {
                    //         target: 'data',
                    //         eventHandlers: {
                    //             onPressIn: (_, props) => {
                    //                 setSelectedIndex(props.index);
                    //             },
                    //         },
                    //     },
                    // ]}
                />
            </VictoryChart>
        </View>
    );
}

export default FinancialDisabled;

