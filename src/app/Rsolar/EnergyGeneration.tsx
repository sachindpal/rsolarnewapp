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

const {
  VictoryChart,
  VictoryBar,
  VictoryAxis,
  VictoryStack,
  VictoryTooltip,
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





const EnergyGeneration = ({ color, activeTab,getTotalEnergy }: any) => {

  const today = new Date();

  const day = today.getDate();           // 1 - 31
  const month = today.getMonth() + 1;    // 0 - 11 (+1 to make it 1 - 12)
  const year = today.getFullYear();      // e.g., 2025

  // console.log(`Date: ${day}-${month}-${year}`);
  const [data, setEnergyData] = useState<any>([
    // { hour: '7', home: 0.8, grid: 0.2 },
    // { hour: '8', home: 1.5, grid: 0.5 },
    // { hour: '9', home: 0.9, grid: 2.1 },
    // { hour: '10', home: 1.2, grid: 1.8 },
    // { hour: '11', home: 1.1, grid: 0.9 },
    // { hour: '12', home: 0.5, grid: 2.5 },
    // { hour: '1', home: 1.8, grid: 1.2 },
    // { hour: '2', home: 0.6, grid: 2.4 },
    // { hour: '3', home: 2.0, grid: 1.0 },
  ])
  const [userInfo, setUserInfo] = useState<any>({})
  const isFocused = useIsFocused()
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
  }, [activeTab,isFocused])

  const getUserInfo = async () => {
    const getInfo: any = await AsyncStorage.getItem('solar_customer_data');
    console.log('sachin', getInfo)
    setUserInfo(JSON.parse(getInfo))

    getData(JSON.parse(getInfo))
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
    console.log('firstDate',firstDate)
    console.log('endDate',lastDate)
    return {
      startDate: monday.toISOString().split('T')[0],  // YYYY-MM-DD
      endDate: sunday.toISOString().split('T')[0],
      firstDate:firstDate,
      lastDate:lastDate
    };
  }

  const getData = (customerData: any) => {
    params.deviceid = customerData.solar_device_id
    params.activeTab = activeTab
    postUnAuthReq(`/rsolar/solar-data`, params)
      .then(async(res: any) => {

        const firstSixMonth = ['1', '2', '3', '4', '5', '6']
        const secondSixMonth = ['7', '8', '9', '10', '11', '12']

        console.log('res:------------', res.data.data)
        if (res.data.data) {
          var array: any = []
          // setEnergyData(res.data.data)
          // if (activeTab == "Today") {
          for (let index = 0; index < res.data.data[0].values.length; index++) {
            const element = res.data.data[0].values[index];
            var obj = { hour: `${index + 1}`, home: 0, grid: element };
            array.push(obj)
          }
          // }

          if (activeTab == "1W") {
           const range = await getWeekRange()
            array = [
              { hour: `Mon`, home: 0, grid: 0 },
              { hour: `Tue`, home: 0, grid: 0 },
              { hour: `Wed`, home: 0, grid: 0 },
              { hour: `Thu`, home: 0, grid: 0 },
              { hour: `Fri`, home: 0, grid: 0 },
              { hour: `Sat`, home: 0, grid: 0 },
              { hour: `Sun`, home: 0, grid: 0 },

            ]
            let temp =0;
            
            for (let index = 0; index < res.data.data[0].values.length; index++) {
              
              const element = res.data.data[0].values[index];
              if(range.firstDate >=index+1 && range.firstDate <= index+1){
                
                // var obj = { hour: `${index+1}`, home: 0, grid: element };
                console.log('-------=============0000000000',array[0])
                array[0].grid = element;
                temp++;
              }
              
            }
          }



          //for 6 months calculation
          if (activeTab == "6M") {
            var array: any = []
            if (firstSixMonth.includes(params.month.toString())) {
              for (let index = 0; index < 6; index++) {
                const element = res.data.data[0].values[index];
                var obj = { hour: `${months[index]}`, home: 0, grid: element };
                array.push(obj)
              }
              // console.log('array1', data)
            }

            if (secondSixMonth.includes(params.month.toString())) {
              for (let index = 0; index < res.data.data[0].values.length; index++) {
                if (index > 5) {
                  const element = res.data.data[0].values[index];
                  var obj = { hour: `${months[index]}`, home: 0, grid: element };
                  array.push(obj)
                }

              }
            }

          }


          if (activeTab == "1Y") {
            var array: any = []

              for (let index = 0; index < res.data.data[0].values.length; index++) {

                const element = res.data.data[0].values[index];
                var obj = { hour: `${months[index]}`, home: 0, grid: element };
                array.push(obj)

              }

          }
          getTotalEnergy(array)

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

  const gridData = data.map((d: any) => ({
    x: d.hour,
    y: d.grid,
    // label: `Grid: ${Math.round((d.grid / (d.home + d.grid)) * 100)}%`,
    label: parseFloat(d.grid).toFixed(1),
  }));
  // Calculate dynamic values
  const yValues = data.map((d: any) => d.grid);

  // const maxY = Math.max(...yValues);
  const avgY = yValues.reduce((sum: any, y: any) => sum + y, 0) / yValues.length;
  

  const allYValues = data.map((d:any, i:any) => d.grid + gridData[i].y);
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
    <View style={styles.container}>
      {/* Sticky Y-axis */}
      <View style={styles.yAxisContainer}>
        <VictoryChart
          height={300}
          width={70} // Narrow chart just for Y-axis
          padding={{ left: 60, top: 20, bottom: 50, right: 0 }}
          domainPadding={{ y: 10 }}
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
            />
          {/* ======================================================================== */}
          {/* Max Value Line */}
          {/* <VictoryNative.VictoryLine
        data={[{ x: 0, y: maxY }, { x: 10, y: maxY }]}
        style={{
          data: { stroke: 'red', strokeWidth: 1, strokeDasharray: '4,4' },
        }}
        labels={['Max']}
        labelComponent={<VictoryNative.VictoryLabel dy={-5} />}
      /> */}

          {/* Average Line */}
          {/* <VictoryNative.VictoryLine
        data={[{ x: 0, y: avgY }, { x: 10, y: avgY }]}
        style={{
          data: { stroke: 'blue', strokeWidth: 1, strokeDasharray: '4,4' },
        }}
        labels={['Avg']}
        labelComponent={<VictoryNative.VictoryLabel dy={-5} />}
      /> */}
          {/* ====================================================================================== */}


        </VictoryChart>
      </View>

      {/* Scrollable chart */}
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
      >
        <VictoryChart
          height={300}
          width={chartWidth}
          padding={{ left: 10, top: 20, bottom: 50, right: 20 }}
          domainPadding={{ x: 20 }}
        >
          <VictoryAxis style={{
            tickLabels: { fill: color.labelgrey, fontSize: 10 }, // X-axis label color
          }} />
          <VictoryStack>
            <VictoryBar
              data={homeData}
              style={{ data: { fill: 'linear-gradient(180deg, rgba(115, 190, 68, 0.80) 0%, rgba(39, 39, 39, 0.80) 100%)', fillOpacity: 0.5 } }}
              labelComponent={<VictoryTooltip renderInPortal={false} />}
              barWidth={barWidth * 0.3}

            />
            <VictoryBar
              data={gridData}
              style={{ data: { fill: 'linear-gradient(180deg, rgba(115, 190, 68, 0.80) 0%, rgba(39, 39, 39, 0.80) 100%)', fillOpacity: 0.6 } }}
              labelComponent={<VictoryTooltip renderInPortal={false} />}
              barWidth={barWidth * 0.3}
              cornerRadius={{ top: 10, bottom: 0 }}
            />
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
    width: 70,
  },
});

export default EnergyGeneration;




// import React from 'react';
// import { View, ScrollView, Text, StyleSheet } from 'react-native';
// import { VictoryChart, VictoryBar, VictoryAxis, VictoryStack } from 'victory-native';

// const homeData = [
//   { x: '7', y: 0.5 },
//   { x: '8', y: 1.2 },
//   { x: '9', y: 0.9 },
//   { x: '10', y: 1.5 },
//   { x: '11', y: 1.3 },
//   { x: '12', y: 0.8 },
//   { x: '1pm', y: 0.4 },
// ];

// const gridData = [
//   { x: '7', y: 0.5 },
//   { x: '8', y: 0.9 },
//   { x: '9', y: 2.1 },
//   { x: '10', y: 1.0 },
//   { x: '11', y: 1.2 },
//   { x: '12', y: 0.7 },
//   { x: '1pm', y: 0.3 },
// ];

// const barWidth = 20;
// const chartWidth = homeData.length * 60;

// const ChartComponent = () => {
//   return (
//     <View style={styles.container}>
      
//       {/* 🟡 Legend */}
//       <View style={styles.legendContainer}>
//         <View style={styles.legendItem}>
//           <View style={[styles.dot, { backgroundColor: '#FFE9A0' }]} />
//           <Text style={styles.legendText}>Home 30%</Text>
//         </View>
//         <View style={styles.legendItem}>
//           <View style={[styles.dot, { backgroundColor: '#FFA534' }]} />
//           <Text style={styles.legendText}>Grid 70%</Text>
//         </View>
//       </View>

//       <View style={styles.chartContainer}>
        
//         {/* 📍 Y-Axis */}
//         <View style={styles.yAxisContainer}>
//           <VictoryChart
//             height={300}
//             width={70}
//             padding={{ left: 60, top: 20, bottom: 50, right: 0 }}
//             domainPadding={{ y: 10 }}
//           >
//             <VictoryAxis
//               dependentAxis
//               style={{
//                 axis: { stroke: 'transparent' },
//                 tickLabels: { fill: '#B5B5B5', fontSize: 10 },
//                 ticks: { stroke: 'transparent' },
//                 grid: { stroke: '#E6E6E6', strokeWidth: 1 },
//               }}
//             />
//           </VictoryChart>
//         </View>

//         {/* 📊 Scrollable Chart */}
//         <ScrollView horizontal showsHorizontalScrollIndicator={false}>
//           <VictoryChart
//             height={300}
//             width={chartWidth}
//             padding={{ left: 10, top: 20, bottom: 50, right: 20 }}
//             domainPadding={{ x: 25 }}
//           >
//             <VictoryAxis
//               style={{
//                 tickLabels: { fill: '#B5B5B5', fontSize: 10 },
//                 axis: { stroke: 'transparent' },
//               }}
//             />

//             <VictoryStack>
//               {/* 🟡 Home Segment (Bottom) */}
//               <VictoryBar
//                 data={homeData}
//                 style={{
//                   data: { fill: '#FFE9A0' },
//                 }}
//                 barWidth={barWidth}
//               />

//               {/* 🟠 Grid Segment (Top) */}
//               <VictoryBar
//                 data={gridData}
//                 style={{
//                   data: { fill: '#FFA534' },
//                 }}
//                 barWidth={barWidth}
//                 cornerRadius={{ top: 8, bottom: 0 }}
//               />
//             </VictoryStack>
//           </VictoryChart>
//         </ScrollView>
//       </View>
//     </View>
//   );
// };

// export default ChartComponent;

// const styles = StyleSheet.create({
//   container: {
//     paddingTop: 16,
//     paddingHorizontal: 8,
//   },
//   legendContainer: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     marginBottom: 8,
//   },
//   legendItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginHorizontal: 10,
//   },
//   dot: {
//     width: 8,
//     height: 8,
//     borderRadius: 4,
//     marginRight: 4,
//   },
//   legendText: {
//     fontSize: 12,
//     color: '#333',
//   },
//   chartContainer: {
//     flexDirection: 'row',
//   },
//   yAxisContainer: {
//     width: 60,
//     alignItems: 'flex-end',
//   },
// });
