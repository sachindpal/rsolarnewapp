import React, { useEffect, useState } from 'react';
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
import Svg, { Defs, LinearGradient, Stop, Rect, G } from 'react-native-svg';
const {
    VictoryChart,
    VictoryBar,
    VictoryAxis,
    VictoryStack,
    VictoryTooltip,
    VictoryGroup
} = VictoryNative;

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

    const GradientBar = ({ x, y, width, scale, index }: any) => {
        const height = scale.y(0) - y;

        const isSelected = index === selectedBarIndex;

        return (
            <G key={`bar-${index}`}>
                <Rect
                    x={x - width / 2}
                    y={y}
                    width={10}
                    height={height}
                    rx={10}
                    ry={10}
                    fill={'url(#barGradient)'}
                />
            </G>
        );
    };

    const GradientContainer = (props: any) => (
        <VictoryNative.VictoryContainer {...props}>
            <Defs>
                <LinearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                    <Stop offset="0%" stopColor="rgba(115, 190, 68, 0.80)" />
                    <Stop offset="100%" stopColor="rgba(255, 255, 255, 0.80)" />
                </LinearGradient>
            </Defs>
            {props.children}
        </VictoryNative.VictoryContainer>
    );


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

    // Config
    const barsPerPage = 5;
    const barWidth = 60;
    const chartWidth = data.length * barWidth;

    const homeData = data.map((d: any) => ({
        x: d.hour,
        y: d.home,
        label: `Home: ${Math.round((d.home / (d.home + d.grid)) * 100)}%`,
    }));

    const gridData = data.map((d: any, ind: any) => ({
        x: d.hour,
        y: d.grid,
        // label: `Grid: ${Math.round(d.grid)}%`,
        // label: ind === selectedBarIndex ? `${d.grid}` : ' ',
        label: `${parseFloat(d.grid).toFixed(1)}`
    }));
    console.log('gridData',gridData)
    // Calculate dynamic values
    const yValues = data.map((d: any) => d.grid);

    // const maxY = Math.max(...yValues);
    const avgY = yValues.reduce((sum: any, y: any) => sum + y, 0) / yValues.length;


    const allYValues = data.map((d: any, i: any) => + gridData[i].y);
    // console.log('allYValues',gridData)
    const maxY = Math.ceil(Math.max(...allYValues));
    // const tickStep = 0.5;


    const desiredTicks = 5;
    const roughStep = maxY / desiredTicks;
    const magnitude = Math.pow(10, Math.floor(Math.log10(roughStep)));
    const normalized = roughStep / magnitude;

    let tickStep;
    if (normalized < 1.5) tickStep = 1 * magnitude;
    else if (normalized < 3) tickStep = 2 * magnitude;
    else if (normalized < 7) tickStep = 5 * magnitude;
    else tickStep = 10 * magnitude;


    const tickValues = [];
    for (let i = 0; i <= maxY; i += tickStep) {
        tickValues.push(parseFloat(i.toFixed(1)));
    }

    return (
        <View style={[styles.container, { marginRight: '10%' }]}>
            {/* Sticky Y-axis */}
            <View style={[styles.yAxisContainer, { width: '10%', marginRight: '0%' }]}>
                <VictoryChart

                    height={300}
                    width={700} // Narrow chart just for Y-axis
                    padding={{ left: 30, top: 20, bottom: 50, right: 10 }}
                    domainPadding={{ y: 10 }}
                    key={activeTab}
                >
                    {/* <VictoryAxis dependentAxis style={{
            axis: { stroke: 'transparent' },
            tickLabels: { fill: color.labelgrey, fontSize: 10 }, // X-axis label color
          }} /> */}


                    <VictoryAxis
                        dependentAxis
                        tickValues={tickValues}
                        style={{
                            axis: { stroke: 'transparent' },
                            tickLabels: { fill: '#B5B5B5', fontSize: 10 },
                            ticks: { stroke: 'transparent' },
                            grid: { stroke: '#E6E6E6', strokeWidth: 1 },
                        }}
                    // domain={[0, 1]}
                    />


                </VictoryChart>
            </View>

            {/* Scrollable chart */}
            <ScrollView
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
            >
                <VictoryChart
                    containerComponent={<GradientContainer />}
                    height={300}
                    width={chartWidth}
                    padding={{ left: 500, top: 20, bottom: 50 }}
                    domainPadding={{ x: 20 }}
                    //   domainPadding={{ x: 500 }}
                    domain={{ y: [0, maxY] }}
                >
                    <VictoryAxis style={{
                        tickLabels: { fill: color.labelgrey, fontSize: 10, }, // X-axis label color
                    }} />
                    <VictoryStack>

                        <VictoryGroup >
                            <VictoryBar

                                data={gridData}
                                // labels={({ datum }) => datum.label}
                                labelComponent={
                                    <VictoryTooltip
                                        flyoutStyle={{ fill: '#fff', stroke: '#ccc' }}
                                        style={{ fill: '#000', fontSize: 12 }}
                                        dy={-10}
                                        renderInPortal={false}

                                    />
                                }

                               
                                events={[
                                    {
                                        target: 'data',
                                        eventHandlers: {
                                            onPressIn: () => {
                                                return [
                                                    {
                                                        target: 'data',
                                                        mutation: (props) => {
                                                            setSelectedBarIndex((prev) =>
                                                                prev === props.index ? null : props.index
                                                            );
                                                            return []; // Don't mutate individual bar manually // Save the tapped bar index
                                                        },
                                                    },
                                                ];
                                            },
                                        },
                                    },
                                ]}
                                dataComponent={<GradientBar />}

                            />
                        </VictoryGroup>
                    </VictoryStack>
                </VictoryChart>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        paddingTop: 40,

    },
    yAxisContainer: {
        width: '20%',
    },
});

export default EnergyGeneration;


