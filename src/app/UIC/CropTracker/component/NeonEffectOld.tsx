// import React, { useEffect } from 'react';
// import { View, StyleSheet } from 'react-native';
// import Animated, { Easing, interpolate, runOnJS, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';




// const GlowingBorder = ({ children }: any) => {
//     const animationValue = useSharedValue(0);

//     useEffect(() => {
//         const startAnimation = () => {
//             animationValue.value = withTiming(1, {
//                 duration: 5000,
//                 easing: Easing.linear,
//             }, () => {
//                 animationValue.value = 0;
//                 runOnJS(startAnimation)()
//             });
//         };

//         startAnimation();
//     }, []);





//     // const animatedBorderStyle = {

//     //         // inputRange: [0, 0.5, 1],
//     //         // outputRange: ['#0FF', '#0FF', 'transparent'],
//     //         // // extrapolate: Extrapolate.CLAMP,

//     // };
//     const animatedBorderStyle = useAnimatedStyle(() => {
//         const opacity = interpolate(animationValue.value, [0, 0.5, 1], [1, 0, 0.2]);
//         const borderWidth = interpolate(animationValue.value, [0,0,1], [1,6,0]);

//         return {
//             borderColor: `rgba(115, 190, 68, ${opacity})`,
//             borderWidth,
//             position: "absolute",
//             top: -3,
//             left: -3,
//             right: -3,
//             bottom: -3,
//             borderRadius: 6,
//             zIndex: 1,
//         };
//     });

//     return (

//         <View style={styles.container}>
//             <View style={{ zIndex: 2 }}>
//                 {children}
//             </View>
//             <Animated.View
//                 style={[animatedBorderStyle]} />


//         </View>

//     );
// };

// const styles = StyleSheet.create({
//     container: {


//     },

// });

// export default React.memo(GlowingBorder);
