import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {CommonStyle} from '../../../../asset/style/commonStyle';
import {FontStyle} from '../../../../asset/style/FontsStyle';
import {
  getLocalStorageData,
  getUnAuthReqest,
  requestLocationPermission,
  setLocalStorage,
} from '../../../Service/APIServices/axoisService';
import Geolocation from '@react-native-community/geolocation';
import {obj} from '../../../Service/CommonConstant';
import SkeletonLoader from '../../../commonResources/component/SkeletonLoader';

interface dataType {
  weatherInfo: any;
  isGeoPermission: any;
}
const WeatherRender = (props: dataType) => {
  const [weatherObj, setWeather] = useState<any>({});
  const [isLoading, setisLoading] = React.useState(true);
  const [weatherProps, setWeatherProps] = React.useState({});

  useEffect(() => {
    if (props.isGeoPermission) {
      getWeatherInfo();
    } else {
      setisLoading(false);
    }
  }, [props.weatherInfo]);

  const getWeatherInfo = async () => {
    var info: any = await getLocalStorageData('setWeatherInfo');
    var info = JSON.parse(info);
    setWeatherProps(info);
    if (info) {
      const weatherdetail: any = await getUnAuthReqest(
        `${obj.weatherApiUrl}?lat=${info?.coords?.latitude}&lon=${info?.coords?.longitude}&appid=${obj.weatherKey}`,
      );
      const weatherdetails = weatherdetail.data;

      let weatherdetails_temps =
        (Number(weatherdetails.main.temp) - 273.15) * (9 / 5) + 32;
      const weatherDetailObj = {
        imagecode: weatherdetails?.weather[0].icon,
        cloudImage:
          'https://openweathermap.org/img/wn/' +
          weatherdetails?.weather[0].icon +
          '@2x.png',
        Kelvin: Number(weatherdetails.main.temp),
        weatherdetails_temp: weatherdetails_temps.toFixed(2),
        currentCity: weatherdetails.name,
        currentTemperature: (weatherdetails.main.temp - 273.15).toFixed(0),
        wind_speed: weatherdetails.wind.speed,
        humidity: weatherdetails.main.humidity,
      };

      setWeather(weatherDetailObj);
      setisLoading(false);
    }
  };
  return (
    <>
      {isLoading == false ? (
        <View style={[styles.weatherView, CommonStyle.flex_dirRow_alignCenter]}>
          <View style={[CommonStyle.flex_dirRow_alignCenter]}>
            {/* <Image source={require("../../../../asset/img/staticImg/cloud.png")} width={46} height={355} /> */}
            {props.isGeoPermission ? (
              <Image
                source={{uri: weatherObj?.cloudImage}}
                width={55}
                height={65}
              />
            ) : (
              <View style={{width: 55, height: 55}} />
            )}

            <Text style={styles.degree}>{weatherObj?.currentTemperature}</Text>
          </View>
          <View
            style={{
              backgroundColor: '#7E7E7E',
              height: 37,
              width: 1,
              marginLeft: 10,
              marginRight: 10,
            }}
          />
          <View
            style={[
              CommonStyle.flex_dirRow_alignCenter_justifySpbtw,
              {flex: 1},
            ]}>
            <View style={{flex:1}}>
              <Text style={[FontStyle.fontMedium14]}>
                {weatherObj?.currentCity}
              </Text>
              {/* <Text style={[FontStyle.fontMedium12,{color:"#7E7E7E"}]}>{weatherObj?.currentCity}</Text> */}
            </View>
            <View style={{flexDirection: 'row'}}>
              <View style={{marginRight: 8}}>
                <Text style={[{textAlign: 'right'}, FontStyle.fontMedium12]}>
                  Wind
                </Text>
                <Text style={[FontStyle.fontMedium12,{textAlign: 'right'}]}>Humidity</Text>
              </View>
              <View>
                <Text
                  style={[
                    FontStyle.fontMedium12,
                    {textAlign: 'right', color: '#7e7e7e'},
                  ]}>
                  {weatherObj?.wind_speed} km/hr
                </Text>
                <Text style={[FontStyle.fontMedium12, {color: '#7e7e7e',textAlign: 'right',}]}>
                  {weatherObj?.humidity} %
                </Text>
              </View>
            </View>
          </View>
        </View>
      ) : (
        <View
          style={{
            marginRight: 4,
            marginLeft: 4,
            marginTop: 16,
            marginBottom: 8,
          }}>
          <SkeletonLoader
            width={500}
            height={80}
            variant="box"
            variant2="dark"
          />
        </View>
      )}
    </>
  );
};

export default React.memo(WeatherRender);

const styles = StyleSheet.create({
  degree: {
    fontFamily: 'Avenir Medium',
    fontSize: 32,
    color: '#242734',
    fontWeight: '500',
    marginLeft: 8,
  },
  weatherView: {
    marginTop: 8,
    marginHorizontal: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
    elevation: 2,
    backgroundColor: 'white',
  },
});
