import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { CommonStyle } from '../../../../asset/style/commonStyle';
import { FontStyle } from '../../../../asset/style/FontsStyle';
import { useNavigation, useRoute } from '@react-navigation/native';

import {
  getLocalStorageData,
  getUnAuthReqest,
  requestLocationPermission,
  setLocalStorage,
} from '../../../Service/APIServices/axoisService';
import Geolocation from '@react-native-community/geolocation';
import { obj } from '../../../Service/CommonConstant';
import SkeletonLoader from '../../../commonResources/component/SkeletonLoader';
import moment from 'moment';
import { RightArrow } from '../../../../asset/img';
interface dataType {
  weatherInfo: any;
  isGeoPermission: any;
}
const WeatherRender = (props: dataType) => {
  const [weatherObj, setWeather] = useState<any>({});
  const [isLoading, setisLoading] = React.useState(true);
  const [weatherProps, setWeatherProps] = React.useState({});
  const [lat, setLat] = React.useState('');
  const [TodayHours, setTodayHours] = useState<any>([]);
  const [long, setLong] = React.useState('');
  const [objForDays, setObjForDays] = React.useState({});
  
  const navigation = useNavigation<any>();

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
      setLat(info?.coords?.latitude);
      setLong(info?.coords?.longitude)
      getDaysForcast(info?.coords?.latitude,info?.coords?.longitude)

      const weatherdetail: any = await getUnAuthReqest(
        `${obj.weatherApiUrl}?lat=${info?.coords?.latitude}&lon=${info?.coords?.longitude}&appid=${obj.weatherKey}`,
      );
      const weatherdetails = weatherdetail.data;
      let weatherdetails_temps =
        (Number(weatherdetails.main.temp) - 273.15) * (9 / 5) + 32;
      console.log('------------------------------------------------------', weatherdetails)
      const weatherDetailObj = {
        imagecode: weatherdetails?.weather[0].icon,
        cloudImage:
          'https://openweathermap.org/img/wn/' +
          weatherdetails?.weather[0].icon +
          '@4x.png',
        Kelvin: Number(weatherdetails.main.temp),
        weatherdetails_temp: weatherdetails_temps.toFixed(2),
        currentCity: weatherdetails.name,
        currentTemperature: (weatherdetails.main.temp - 273.15).toFixed(0),
        wind_speed: weatherdetails.wind.speed,
        humidity: weatherdetails.main.humidity,
        weather: weatherdetails.weather[0].main,
        temp_max: weatherdetails.main.temp_max,
        temp_min: weatherdetails.main.temp_min
      };

      setWeather(weatherDetailObj);
      setisLoading(false);
    }

  };

  
  const getDaysForcast = (lat:any,long:any)=>{
    const TodayHourss:any = []
    getUnAuthReqest(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&appid=${obj.weatherKey}`).then((data)=>{
       
      var objForDays:any = {
        firstDay:{},
        secondDay:{},
        thirdDay:{},
        fourthDay:{},
        fifthDay:{},
        sixDay:{},
        seventhDay:{}
      }

        for (let index = 0; index < data.data.list.length; index++) {
            const element = data.data.list[index];
            var firstDay = moment().add(1, 'day').format("YYYY-MM-DD");
            var secondDay = moment().add(2, 'day').format("YYYY-MM-DD");
            var thirdDay = moment().add(3, 'day').format("YYYY-MM-DD");
            var fourthDay = moment().add(4, 'day').format("YYYY-MM-DD");
            var fifthDay = moment().add(5, 'day').format("YYYY-MM-DD");
            var sixDay = moment().add(6, 'day').format("YYYY-MM-DD");
            var seventhDay = moment().add(7, 'day').format("YYYY-MM-DD");

            if(element.dt_txt.split(' ')[0] && (element.dt_txt.split(' ')[0] == firstDay)){
              element.iconCustom = `https://openweathermap.org/img/wn/${element.weather[0].icon}@2x.png`
              objForDays.firstDay = element
            }


            if(element.dt_txt.split(' ')[0] && (element.dt_txt.split(' ')[0] == secondDay)){
              element.iconCustom = `https://openweathermap.org/img/wn/${element.weather[0].icon}@2x.png`

              objForDays.secondDay = element

            }


            if(element.dt_txt.split(' ')[0] && (element.dt_txt.split(' ')[0] == thirdDay)){
              element.iconCustom = `https://openweathermap.org/img/wn/${element.weather[0].icon}@2x.png`

              objForDays.thirdDay = element

            }


            if(element.dt_txt.split(' ')[0] && (element.dt_txt.split(' ')[0] == fourthDay)){
              element.iconCustom = `https://openweathermap.org/img/wn/${element.weather[0].icon}@2x.png`

              objForDays.fourthDay = element

            }


            if(element.dt_txt.split(' ')[0] && (element.dt_txt.split(' ')[0] == fifthDay)){
              element.iconCustom = `https://openweathermap.org/img/wn/${element.weather[0].icon}@2x.png`

              objForDays.fifthDay = element

            }


            if(element.dt_txt.split(' ')[0] && (element.dt_txt.split(' ')[0] = sixDay)){
              element.iconCustom = `https://openweathermap.org/img/wn/${element.weather[0].icon}@2x.png`

              objForDays.sixDay = element

            }
            

            if(element.dt_txt.split(' ')[0] && (element.dt_txt.split(' ')[0] = seventhDay)){
              objForDays.seventhDay = element

            }
            if(element.dt_txt.split(' ')[0] && (element.dt_txt.split(' ')[0] == moment().format('YYYY-MM-DD')) ){
              console.log('22222222222222222222222222222222',element.dt_txt.split(' ')[0])
                var timeOnly =  moment(element.dt_txt.split(' ')[1],['hh']).format('hh A')
                element.timeOnly = timeOnly
                TodayHourss.push(element)
            }
            
        }
        setTodayHours(TodayHourss);

        setObjForDays(objForDays)
        console.log('objForDays==========================================',objForDays.firstDay?.weather)
    }).catch((err)=>{
        console.log('=======================================',err)
    })
}
  const openForcast = () => {
    console.log('lklkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk',TodayHours.length)
    navigation.navigate('WetherForcast', { lat, long, weatherdetails: weatherObj, TodayHours: TodayHours,objForDays:objForDays });
  }
  return (
    <>
      {isLoading == false ? (
        <View style={[styles.weatherView, CommonStyle.flex_dirRow_alignCenter]}>
          <View style={[CommonStyle.flex_dirRow_alignCenter]}>
            {/* <Image source={require("../../../../asset/img/staticImg/cloud.png")} width={46} height={355} /> */}
            {props.isGeoPermission ? (
              <Image
                source={{ uri: weatherObj?.cloudImage }}
                width={55}
                height={65}
              />
            ) : (
              <View style={{ width: 55, height: 55 }} />
            )}

            <Text style={styles.degree}>{weatherObj?.currentTemperature}°</Text>
          </View>
          <View
            style={{
              //   backgroundColor: '#7E7E7E',
              //   height: 37,
              //   width: 1,
              marginLeft: 10,
              marginRight: 10,
            }}
          />
          <View
            style={[
              CommonStyle.flex_dirRow_alignCenter_justifySpbtw,
              { flex: 1 },
            ]}>
            <View style={{ flex: 1 }}>
              <Text style={[FontStyle.fontMedium14]}>
                {weatherObj?.currentCity}
              </Text>
              {/* <Text style={[FontStyle.fontMedium12,{color:"#7E7E7E"}]}>{weatherObj?.currentCity}</Text> */}
            </View>
            {weatherObj?.currentTemperature?
            <View style={{padding:8,justifyContent:'center',gap:8,backgroundColor:'#EDF8FF',borderRadius:6}}>
              <Pressable onPress={() => openForcast()}>
                <RightArrow width={24} height={24} />
              </Pressable>

            </View>:<View style={{padding:8,justifyContent:'center',gap:8,backgroundColor:'#EDF8FF',borderRadius:6}}>
              <Pressable >
                <RightArrow width={24} height={24} />
              </Pressable>

            </View>
}
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
    fontSize: 40,
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
