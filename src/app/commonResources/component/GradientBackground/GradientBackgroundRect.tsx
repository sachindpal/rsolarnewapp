import React from 'react';
import {View, StyleSheet} from 'react-native';
import Svg, {Defs, Rect, LinearGradient, Stop} from 'react-native-svg';

const GradientBackgroundRect = ({children, from, to}: any) => {
  return (
    <View>
      <Svg height="100%" width="100%" style={[StyleSheet.absoluteFillObject]}>
        <Defs>
          <LinearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
            <Stop offset="0" stopColor={from} />
            <Stop offset="1" stopColor={to} />
          </LinearGradient>
        </Defs>
        <Rect width="100%" height="92.5%" fill="url(#grad)" rx={6} ry={6} />
      </Svg>
      {children}
    </View>
  );
};

export default React.memo(GradientBackgroundRect);
