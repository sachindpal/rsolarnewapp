import {View, Text, StyleSheet, Pressable} from 'react-native';
import React, {useEffect, useState} from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {
  FullFilledStar,
  HalfFilledStar,
  RateIcon,
  UnFilledStar,
} from '../../../../asset/img';

const RatingStar = ({
  totalStars = 5,
  initialRating = 0,
  size = 30,
  spacing = 10,
  readOnly = false,
  ratingValue,
}: any) => {
  const [rating, setRating] = useState<any>();
  useEffect(() => {
    setRating(initialRating);
  }, [initialRating]);

  const starRating = (val: any) => {
    setRating(val);
    ratingValue(val);
  };

  const renderStar = (index: any) => {
    const starValue = index + 1;
    let starComponent = <UnFilledStar width={size} height={size} />;
    if (rating >= starValue) {
      starComponent = <FullFilledStar width={size} height={size} />;
    } else if (rating >= starValue - 0.5) {
      starComponent = <HalfFilledStar width={size} height={size} />;
    }

    return (
      <Pressable
        key={index}
        onPress={() => !readOnly && starRating(starValue)}
        // onLongPress={() => !readOnly && setRating(starValue)}
        style={{}}>
        {starComponent}
      </Pressable>
    );
  };

  return (
    <View style={[styles.starContainer]}>
      {Array.from({length: totalStars}).map((_, index) => renderStar(index))}
    </View>
  );
};

export default RatingStar;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  starContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
