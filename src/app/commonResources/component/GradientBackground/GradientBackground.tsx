import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Defs, Rect, LinearGradient, Stop, Circle, RadialGradient, Mask } from 'react-native-svg';

const TO_COLOR = 'rgba(107, 84, 39, 1)';
const FROM_COLOR = "rgba(62, 49, 23, 1)";

const GradientBackground = ({ children }: any) => {
    return (
        <View style={{ flex: 1,flexGrow:1,overflow:"visible",zIndex:1}}>
            <Svg height="100%" width="100%" style={StyleSheet.absoluteFillObject}>
                <Defs>
                    <LinearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
                        <Stop offset="0%" stopColor={FROM_COLOR} />
                        <Stop offset="100%" stopColor={FROM_COLOR} />
                    </LinearGradient>

                    <RadialGradient id="sunShadow" cx="50%" cy="0%" r="40%" fx="50%" fy="50%">
                        <Stop offset="0%" stopColor={TO_COLOR} stopOpacity="1" />
                        <Stop offset="100%" stopColor={TO_COLOR} stopOpacity="0" />
                    </RadialGradient>
                </Defs>

                <Rect x="0" y="0" width="100%" height="100%" fill="url(#grad)" />

                <Mask id="mask" x="0" y="0" width="100%" height="100%">
                    <Rect x="0" y="0" width="100%" height="100%" fill="url(#grad)" />
                    <Circle cx="50%" cy="80%" r="100%" fill="url(#sunShadow)" />
                </Mask>

                <Rect x="0" y="0" width="100%" height="100%" fill="url(#sunShadow)" mask="url(#mask)" />
            </Svg>
            {children}
        </View>
    );
};

export default GradientBackground;