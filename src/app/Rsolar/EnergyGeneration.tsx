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

const data = [
    { x: '7', y: 0.8 },
    { x: '8', y: 1.4 },
    { x: '9', y: 2.4 }, // example selected
    { x: '10', y: 1.4 },
    { x: '11', y: 1.4 },
    { x: '12', y: 1 },
    { x: '1pm', y: 0.5 },
];

const screenWidth = Dimensions.get('window').width;

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

const daysOfWeek = [
    'Mon',
    'Tue',
    'Wed',
    'Thu',
    'Fri',
    'Sat',
    'Sun'
]



const EnergyGeneration = ({ color, activeTab, getTotalEnergy, refreshing }: any) => {
    const [selectedIndex, setSelectedIndex] = useState(null);




    //============================================================


    // console.log('activeTab',activeTab)
    const today = new Date();

    const day = today.getDate();           // 1 - 31
    const month = today.getMonth() + 1;    // 0 - 11 (+1 to make it 1 - 12)
    const year = today.getFullYear();      // e.g., 2025

    // console.log(`Date: ${day}-${month}-${year}`);
    const [data, setEnergyData] = useState<any>([
        { hour: '7', home: 0.8, grid: 0.2 },
        { hour: '8', home: 1.5, grid: 0.5 },
        { hour: '9', home: 0.9, grid: 2.1 },
        { hour: '10', home: 1.2, grid: 1.8 },
        { hour: '11', home: 1.1, grid: 0.9 },
        { hour: '12', home: 0.5, grid: 2.5 },
        { hour: '1', home: 1.8, grid: 1.2 },
        { hour: '2', home: 0.6, grid: 2.4 },
        { hour: '3', home: 2.0, grid: 1.0 },
    ])
    const [userInfo, setUserInfo] = useState<any>({})
    const isFocused = useIsFocused()
    const [selectedBarIndex, setSelectedBarIndex] = useState<number | null>(null);

    const [params, setParams] = useState({
        day: day,
        month: month,
        year: year,
        deviceid: '',
        activeTab: undefined
    });

    useEffect(() => {
        // console.log('activeTab', activeTab)
        getUserInfo()
        // console.log('getWeekRange',getWeekRange())
    }, [activeTab, refreshing])

    const getUserInfo = async () => {
        const getInfo: any = await AsyncStorage.getItem('solar_customer_data');
        console.log('sachin', getInfo)
        setUserInfo(JSON.parse(getInfo))

        await getData(JSON.parse(getInfo))
    }

    function getWeekRange(date = new Date()) {
        const day = date.getDay(); // 0 (Sun) - 6 (Sat)
        const diffToMonday = (day === 0 ? -6 : 1) - day; // Adjust Sunday to be end of week
        const monday = new Date(date);
        monday.setDate(date.getDate() + diffToMonday);

        const sunday = new Date(monday);
        sunday.setDate(monday.getDate() + 6);

        const startDateForGetDate = monday.toISOString().split('T')[0]
        const endDateForGetDate = sunday.toISOString().split('T')[0]

        const firstDate = new Date(startDateForGetDate).getDate();
        const lastDate = new Date(endDateForGetDate).getDate();
        console.log('firstDate', firstDate)
        console.log('endDate', lastDate)
        return {
            startDate: monday.toISOString().split('T')[0],  // YYYY-MM-DD
            endDate: sunday.toISOString().split('T')[0],
            firstDate: firstDate,
            lastDate: lastDate
        };
    }


    const getData = (customerData: any) => {
        params.deviceid = customerData.solar_device_id
        params.activeTab = activeTab
        postUnAuthReq(`/rsolar/solar-data`, params)
            .then(async (res: any) => {

                const firstSixMonth = ['1', '2', '3', '4', '5', '6']
                const secondSixMonth = ['7', '8', '9', '10', '11', '12']

                console.log('result:------------', res.data.data.pvPower)
                if (res?.data?.data?.generationData) {
                    var array: any = []
                    // setEnergyData(res.data.data)
                    // if (activeTab == "Today") {
                    for (let index = 0; index < res.data.data.generationData[0].values.length; index++) {
                        const element = res.data.data.generationData[0].values[index];
                        var obj = { hour: `${index + 1}`, home: 0, grid: element };
                        array.push(obj)
                    }
                    // }

                    if (activeTab == "1W") {
                        var array: any = []
                        const previousmonthdays = moment({ year: year, month: params.month - 2 }).daysInMonth()

                        const range = await getWeekRange()
                        //  console.log('range',range)
                        var arrays: any = [
                            { hour: `Mon`, home: 0, grid: 0.00001 },
                            { hour: `Tue`, home: 0, grid: 2 },
                            { hour: `Wed`, home: 0, grid: 0 },
                            { hour: `Thu`, home: 0, grid: 0 },
                            { hour: `Fri`, home: 0, grid: 0 },
                            { hour: `Sat`, home: 0, grid: 0 },
                            { hour: `Sun`, home: 0, grid: 0 },

                        ]
                        let temp = 0;

                        for (let index = 0; index < res.data.data.generationData[0].values.length; index++) {

                            if (range.firstDate < range.lastDate) {

                                const element = res.data.data.generationData[0].values[index - 1];
                                // console.log('-------=============0000000000',element)

                                if (range.firstDate <= index && range.lastDate > index) {

                                    arrays[temp].grid = element;
                                    array.push(arrays[temp])
                                    temp = temp + 1

                                }


                            } else {
                                if (previousmonthdays == range.firstDate) {
                                    range.firstDate = 1;

                                } else {
                                    range.firstDate = range.firstDate + 1;


                                }
                                temp = temp + 1
                            }



                        }
                    }



                    //for 6 months calculation
                    if (activeTab == "6M") {
                        var array: any = []
                        if (firstSixMonth.includes(params.month.toString())) {
                            for (let index = 0; index < 6; index++) {
                                const element = res.data.data.generationData[0].values[index];
                                var obj = { hour: `${months[index]}`, home: 0, grid: element };
                                array.push(obj)
                            }
                            // console.log('array1', data)
                        }

                        if (secondSixMonth.includes(params.month.toString())) {
                            for (let index = 0; index < res.data.data.generationData[0].values.length; index++) {
                                if (index > 5) {
                                    const element = res.data.data.generationData[0].values[index];
                                    var obj = { hour: `${months[index]}`, home: 0, grid: element };
                                    array.push(obj)
                                }

                            }
                        }

                    }


                    if (activeTab == "1Y") {
                        var array: any = []

                        for (let index = 0; index < res.data.data.generationData[0].values.length; index++) {

                            const element = res.data.data.generationData[0].values[index];
                            var obj = { hour: `${months[index]}`, home: 0, grid: element };
                            array.push(obj)

                        }

                    }
                    // console.log('array',array,res.data.data.pvPower)
                    getTotalEnergy(array, res.data.data.pvPower)

                    setEnergyData(array)

                }


            })
            .catch(err => {
                console.log('err', err);
            });
    }

    const gridData = data.map((d: any, ind: any) => ({
        x: d.hour,
        y: d.grid,
        // label: `₹${parseFloat(d.grid).toFixed(1)}`,

    }));

    const barsPerPage = 5;
  const barWidth = 60;
  const chartWidth = data.length * barWidth;
    //============================================================

    const GradientDefs = () => (
        <Defs>
            <LinearGradient id="greenGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <Stop offset="0%" stopColor="#8BC34A" stopOpacity="1" />
                <Stop offset="100%" stopColor="#8BC34A" stopOpacity="0.3" />
            </LinearGradient>
            <LinearGradient id="orangeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <Stop offset="0%" stopColor="#FF9800" stopOpacity="1" />
                <Stop offset="100%" stopColor="#FFEB3B" stopOpacity="0.6" />
            </LinearGradient>
        </Defs>
    );

    return (
        <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
        >
            <VictoryChart
                domainPadding={{ x: 15 }}
                padding={{ top: 20, bottom: 40, left: 40, right: 20 }}
                width={chartWidth}
            >
                <GradientDefs />

                <VictoryAxis
                    style={{
                        tickLabels: { fill: '#777', fontSize: 12 },
                        axis: { stroke: 'transparent' },
                    }}
                />
                <VictoryAxis
                    dependentAxis
                    style={{
                        grid: { stroke: '#ddd', strokeDasharray: '4' },
                        tickLabels: { fill: '#aaa', fontSize: 10 },
                        axis: { stroke: 'transparent' },
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
                    events={[
                        {
                            target: 'data',
                            eventHandlers: {
                                onPressIn: (_, props) => {
                                    setSelectedIndex(props.index);
                                },
                            },
                        },
                    ]}
                />
            </VictoryChart>
        </ScrollView>
    );
}

export default EnergyGeneration;

