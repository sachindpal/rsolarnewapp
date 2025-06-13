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





const EnergyGeneration = ({ color, activeTab }: any) => {

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
  }, [activeTab])

  const getUserInfo = async () => {
    const getInfo: any = await AsyncStorage.getItem('solar_customer_data');
    console.log('sachin', getInfo)
    setUserInfo(JSON.parse(getInfo))

    getData(JSON.parse(getInfo))
  }

  const getData = (customerData: any) => {
    params.deviceid = customerData.solar_device_id
    params.activeTab = activeTab
    postUnAuthReq(`/rsolar/solar-data`, params)
      .then((res: any) => {

        const firstSixMonth = ['1', '2', '3', '4', '5', '6']
        const secondSixMonth = ['7', '8', '9', '10', '11', '12']

        // console.log('res:------------', res.data.data)
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
            array = []
            for (let index = 0; index < res.data.data[0].values.length; index++) {
              const element = res.data.data[0].values[index];
              var obj = { hour: `${index}`, home: 0, grid: element };
              array.push(obj)
            }
          }


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
console.log('array',array)

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
    label: `Grid: ${Math.round((d.grid / (d.home + d.grid)) * 100)}%`,
  }));
  // Calculate dynamic values
  const yValues = data.map((d: any) => d.grid);

  const maxY = Math.max(...yValues);
  const avgY = yValues.reduce((sum: any, y: any) => sum + y, 0) / yValues.length;
  console.log('avgY', avgY)
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
          <VictoryAxis dependentAxis style={{
            axis: { stroke: 'transparent' },
            tickLabels: { fill: color.labelgrey, fontSize: 10 }, // X-axis label color
          }} />
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
              style={{ data: { fill: 'orange', fillOpacity: 0.5 } }}
              labelComponent={<VictoryTooltip renderInPortal={false} />}
              barWidth={barWidth * 0.3}

            />
            <VictoryBar
              data={gridData}
              style={{ data: { fill: 'orange', fillOpacity: 1 } }}
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
