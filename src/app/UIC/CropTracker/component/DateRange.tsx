import React from 'react';
import {View, Text, StyleSheet, FlatList, Pressable} from 'react-native';
import {ColorVariable, commanRadius} from '../../../../asset/style/commonStyle';
import {FontStyle} from '../../../../asset/style/FontsStyle';
import {from} from 'rxjs';
// import { measure } from 'react-native-reanimated';

interface dataType {
  handleModal: any;
  fromDate: any;
  toDate: any;
  yellowDate: any;
  previousDiseaseDate: any;
  currentLang: any;
}

export const hindiMonths: any = {
  January: 'जनवरी',
  February: 'फरवरी',
  March: 'मार्च',
  April: 'अप्रैल',
  May: 'मई',
  June: 'जून',
  July: 'जुलाई',
  August: 'अगस्त',
  September: 'सितंबर',
  October: 'अक्टूबर',
  November: 'नवंबर',
  December: 'दिसंबर',
};

const DateRange = ({
  handleModal,
  fromDate,
  toDate,
  yellowDate,
  previousDiseaseDate,
  currentLang,
}: dataType) => {
  const startDate = fromDate;
  const endDate = toDate;
  const yellowDay = yellowDate;
  const redDay = previousDiseaseDate?.map((item: any) => {
    let day;
    day = item.diseaseDate;
    return day;
  });

  const [calender, setcalender] = React.useState<any>([]);

  const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  const daysInHindi = ['रवि', 'सोम', 'मंगल', 'बुध', 'गुरु', 'शुक्र', 'शनि'];

  const MonthsShortForm: any = {
    0: 'Jan',
    1: 'Feb',
    2: 'Mar',
    3: 'Apr',
    4: 'May',
    5: 'Jun',
    6: 'Jul',
    7: 'Aug',
    8: 'Sept',
    9: 'Oct',
    10: 'Nov',
    11: 'Dec',
  };

  const getDatesInRange = (startDate: any, endDate: any) => {
    console.log('moonth=>', Object.keys(hindiMonths)[1]);
    const dates = [];
    // Convert start and end dates from strings to Date objects
    const currentDate = new Date(startDate);
    const lastDate = new Date(endDate);
    while (currentDate <= lastDate) {
      const dateObj = {
        date: currentDate.getDate(),
        month: currentDate.getMonth(),
        year: currentDate.getFullYear(),
        day:
          currentLang == 2
            ? daysInHindi[currentDate.getDay()]
            : days[currentDate.getDay()].slice(0, 3),
        currentDate:
          currentDate.toISOString().split('T')[0] ==
          new Date().toISOString().split('T')[0]
            ? true
            : false,
        yellowDay:
          currentDate.toISOString().split('T')[0] === yellowDay ? true : false,
        redDay:
          currentDate.toISOString().split('T')[0] === redDay.toString()
            ? true
            : false,
      };
      dates.push(dateObj);
      // Increment currentDate by one day
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return dates;
  };

  React.useEffect(() => {
    setcalender(getDatesInRange(startDate, endDate));
  }, [previousDiseaseDate]);

  const currentDate = new Date(startDate);

  return (
    <View style={styles.container}>
      <View style={{paddingHorizontal: 8}}>
        <Text style={FontStyle.fontHeavy14}>
          {currentLang === 2
            ? hindiMonths[
                currentDate.toLocaleString('default', {month: 'long'})
              ]
            : currentDate.toLocaleString('default', {month: 'long'})}{' '}
          {currentDate.getFullYear()}
        </Text>
      </View>
      <FlatList
        data={calender}
        horizontal
        contentContainerStyle={{
          alignSelf: 'flex-start',
        }}
        renderItem={item => {
          return (
            <>
              <View style={{alignItems: 'center'}}>
                <View style={{marginTop: 8, marginBottom: 4}}>
                  <Text
                    style={[
                      FontStyle.fontMedium12,
                      {color: 'rgba(36, 39, 52, 0.6)'},
                    ]}>
                    {item.item.day}
                  </Text>
                </View>
                <Pressable
                  onPress={() =>
                    handleModal(
                      item.item.redDay
                        ? 'red'
                        : item.item.yellowDay
                        ? 'yellow'
                        : '',
                      item.item.date,
                      item.item.month,
                      item.item.year,
                    )
                  }
                  style={[
                    styles.date,
                    item.item.currentDate === true ? styles.currentDate : null,
                    {
                      backgroundColor: item.item.redDay
                        ? ColorVariable.errorRed
                        : item.item.yellowDay
                        ? 'rgba(252, 195, 50, 1)'
                        : ColorVariable.white,
                    },
                  ]}>
                  <Text style={[FontStyle.fontMedium18, {fontSize: 20}]}>
                    {item.item.date}
                  </Text>
                </Pressable>
                {currentLang == 2 ? (
                  <View>
                    {item.index == 0 ? (
                      <Text
                        style={[
                          FontStyle.fontMedium12,
                          {color: 'rgba(36, 39, 52, 0.6)'},
                        ]}>
                        {hindiMonths[
                          Object.keys(hindiMonths)[item.item.month]
                        ].slice(0, 3)}
                        .
                      </Text>
                    ) : item.item.date == 1 ? (
                      <Text
                        style={[
                          FontStyle.fontMedium12,
                          {color: 'rgba(36, 39, 52, 0.6)'},
                        ]}>
                        {hindiMonths[
                          Object.keys(hindiMonths)[item.item.month]
                        ].slice(0, 3)}
                        .
                      </Text>
                    ) : null}
                  </View>
                ) : (
                  <View>
                    {item.index == 0 ? (
                      <Text
                        style={[
                          FontStyle.fontMedium12,
                          {color: 'rgba(36, 39, 52, 0.6)'},
                        ]}>
                        {MonthsShortForm[item.item.month]}
                      </Text>
                    ) : item.item.date == 1 ? (
                      <Text
                        style={[
                          FontStyle.fontMedium12,
                          {color: 'rgba(36, 39, 52, 0.6)'},
                        ]}>
                        {MonthsShortForm[item.item.month]}
                      </Text>
                    ) : null}
                  </View>
                )}
              </View>
            </>
          );
        }}
      />
    </View>
  );
};

export default React.memo(DateRange);

const styles = StyleSheet.create({
  container: {
    borderRadius: commanRadius.radi6,
    backgroundColor: 'white',
    padding: 10,
    marginHorizontal: 6,
    marginBottom: 44,
    width: '100%',
  },
  date: {
    width: 40,
    height: 40,
    borderWidth: 1,
    borderColor: ColorVariable.white,
    borderRadius: commanRadius.radi4,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 4,
  },
  currentDate: {
    borderColor: ColorVariable.blueBlack,
  },
});
