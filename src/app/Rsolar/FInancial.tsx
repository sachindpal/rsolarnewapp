import React, { useEffect, useState } from 'react';
import {
  View,
  ScrollView,
  Dimensions,
  StyleSheet,
} from 'react-native';
import * as VictoryNative from 'victory-native';
import { postUnAuthReq } from '../Service/APIServices/axoisService';
import AsyncStorage from '@react-native-async-storage/async-storage';

const {
  VictoryChart,
  VictoryBar,
  VictoryAxis,
  VictoryStack,
  VictoryTooltip,
} = VictoryNative;

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

// Config
const barsPerPage = 5;
const barWidth = 60;
const chartWidth = data.length * barWidth;

const Financial = ({color,selectedValue}:any) => {

    
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
    { hour: '3', home: 2.0, grid: 1.0 },
  ])
  const [userInfo, setUserInfo] = useState<any>({})
  const [params, setParams] = useState({
    year: year,
    deviceid: ''
  });


  useEffect(() => {
    console.log('selectedValue',selectedValue)
    
    getUserInfo()
  }, [selectedValue])

  const getUserInfo = async () => {
    const getInfo: any = await AsyncStorage.getItem('solar_customer_data');
    
    setUserInfo(JSON.parse(getInfo))

    getData(JSON.parse(getInfo))
  }

  const getData = (customerData: any) => {
    params.deviceid = customerData.solar_device_id
    params.year = selectedValue
    console.log('params',params)
    postUnAuthReq(`/rsolar/solar-data`, params)
      .then((res: any) => {

        // console.log('res:------------', res.data.data)
        if (res.data.data) {
          var array:any = []
          // setEnergyData(res.data.data)
          for (let index = 0; index < res.data.data[0].values.length; index++) {
            const element = res.data.data[0].values[index];
            var obj = { hour: `${months[index]}`, home: 0, grid: element };
            array.push(obj)
          }

          console.log('array',data)
          setEnergyData(array)

        }


      })
      .catch(err => {
        console.log('err', err);
      });
  }


//   const homeData = data.map((d:any) => ({
//     x: d.hour,
//     y: d.home,
//     label: `Home: ${Math.round((d.home / (d.home + d.grid)) * 100)}%`,
//   }));

//   const gridData = data.map((d:any) => ({
//     x: d.hour,
//     y: d.grid,
//     label: `Grid: ${Math.round((d.grid / (d.home + d.grid)) * 100)}%`,
//   }));

//   return (
//     <View style={styles.container}>
//       {/* Sticky Y-axis */}
//       {/* <View style={styles.yAxisContainer}>
//         <VictoryChart
//           height={300}
//           width={70} // Narrow chart just for Y-axis
//           padding={{ left: 60, top: 20, bottom: 50, right: 0 }}
//           domainPadding={{ y: 10 }}
//         >
//           <VictoryAxis dependentAxis />
//         </VictoryChart>
//       </View> */}

//       {/* Scrollable chart */}
//       <ScrollView
//         horizontal
//         pagingEnabled
//         showsHorizontalScrollIndicator={false}
//       >
//         <VictoryChart
//           height={300}
//           width={chartWidth}
//           padding={{ left: 10, top: 20, bottom: 50, right: 20 }}
//           domainPadding={{ x: 20 }}
//         >
//           <VictoryAxis style={{
//       tickLabels: { fill: color.labelgrey, fontSize: 10 }, // X-axis label color
//     }} />
//           <VictoryStack>
//             <VictoryBar
//               data={homeData}
//               style={{ data: { fill: 'orange', fillOpacity: 0.5 } }}
//               labelComponent={<VictoryTooltip renderInPortal={false}/>}
//               barWidth={barWidth * 0.3}
              
//             />
//             <VictoryBar
//               data={gridData}
//               style={{ data: { fill: 'orange', fillOpacity: 1 } }}
//               labelComponent={<VictoryTooltip renderInPortal={false}/>}
//               barWidth={barWidth * 0.3}
//               cornerRadius={{ top: 10, bottom: 0 }}
//               labels={({ datum }) => `${datum.y}`}  // show y-value
//             />
//           </VictoryStack>
//         </VictoryChart>
//       </ScrollView>
//     </View>
//   );
// };
const homeData = data.map((d: any) => ({
    x: d.hour,
    y: d.home,
    // label: `₹${d.home}`,
  }));
  
  const gridData = data.map((d: any) => ({
    x: d.hour,
    y: d.grid,
    label: `₹${parseFloat(d.grid).toFixed(1)}`,
  }));
  
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
      >
        <VictoryChart
        //   height={400}
          width={chartWidth}
          padding={{ left: 10, top: 40, bottom: 50, right: 20 }}
          domainPadding={{ x: 20 }}
        >
          <VictoryAxis
            style={{
              tickLabels: { fill: color.labelgrey, fontSize: 10 },
            }}
          />
          <VictoryStack>
            <VictoryBar
              data={homeData}
              style={{ data: { fill: 'orange', fillOpacity: 0.5 } }}
            //   labels={({ datum }) => `₹${parseFloat(datum.y).toFixed(1)}`}
              labelComponent={<VictoryNative.VictoryLabel dy={-10} style={{color:color.labelgrey,fill:color.labelgrey}} />}
              barWidth={barWidth * 0.3}
            />
            <VictoryBar
              data={gridData}
              style={{ data: { fill: 'linear-gradient(180deg, rgba(115, 190, 68, 0.80) 0%, rgba(39, 39, 39, 0.80) 100%)', fillOpacity: 0.6 } }}
            //   labels={({ datum }) => `₹${parseFloat(datum.y).toFixed(1)}`}
              labelComponent={<VictoryNative.VictoryLabel dy={-10} style={{color:color.labelgrey,fill:color.labelgrey}} />}
              barWidth={barWidth * 0.3}
              cornerRadius={{ top: 10, bottom: 0 }}
            />
          </VictoryStack>
        </VictoryChart>
      </ScrollView>
    </View>
  );
  
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingTop: 40,
  },
  yAxisContainer: {
    width: 70,
  },
});

export default Financial;
