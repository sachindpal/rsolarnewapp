import React from 'react';
import {
  View,
  ScrollView,
  Dimensions,
  StyleSheet,
} from 'react-native';
import * as VictoryNative from 'victory-native';

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
  { hour: '7', home: 0.8, grid: 0.2 },
  { hour: '8', home: 1.5, grid: 0.5 },
  { hour: '9', home: 0.9, grid: 2.1 },
  { hour: '10', home: 1.2, grid: 1.8 },
  { hour: '11', home: 1.1, grid: 0.9 },
  { hour: '12', home: 0.5, grid: 2.5 },
  { hour: '1', home: 1.8, grid: 1.2 },
  { hour: '2', home: 0.6, grid: 2.4 },
  { hour: '3', home: 2.0, grid: 1.0 },
];

// Config
const barsPerPage = 5;
const barWidth = 60;
const chartWidth = data.length * barWidth;

const Financial = () => {
  const homeData = data.map(d => ({
    x: d.hour,
    y: d.home,
    label: `Home: ${Math.round((d.home / (d.home + d.grid)) * 100)}%`,
  }));

  const gridData = data.map(d => ({
    x: d.hour,
    y: d.grid,
    label: `Grid: ${Math.round((d.grid / (d.home + d.grid)) * 100)}%`,
  }));

  return (
    <View style={styles.container}>
      {/* Sticky Y-axis */}
      {/* <View style={styles.yAxisContainer}>
        <VictoryChart
          height={300}
          width={70} // Narrow chart just for Y-axis
          padding={{ left: 60, top: 20, bottom: 50, right: 0 }}
          domainPadding={{ y: 10 }}
        >
          <VictoryAxis dependentAxis />
        </VictoryChart>
      </View> */}

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
          <VictoryAxis />
          <VictoryStack>
            <VictoryBar
              data={homeData}
              style={{ data: { fill: 'orange', fillOpacity: 0.5 } }}
              labelComponent={<VictoryTooltip renderInPortal={false}/>}
              barWidth={barWidth * 0.3}
              
            />
            <VictoryBar
              data={gridData}
              style={{ data: { fill: 'orange', fillOpacity: 1 } }}
              labelComponent={<VictoryTooltip renderInPortal={false}/>}
              barWidth={barWidth * 0.3}
              cornerRadius={{ top: 10, bottom: 0 }}
              labels={({ datum }) => `${datum.y}`}  // show y-value
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

export default Financial;
