// import React, {useCallback} from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   Dimensions,
//   StyleSheet,
//   Image,
// } from 'react-native';
// import {
//   Gesture,
//   GestureDetector,
//   PanGestureHandler,
// } from 'react-native-gesture-handler';
// import Animated, {
//   useSharedValue,
//   useAnimatedStyle,
//   withSpring,
//   withTiming,
//   runOnJS,
// } from 'react-native-reanimated';
// import {create} from 'react-test-renderer';
// import {ColorVariable, CommonStyle} from '../../../../asset/style/commonStyle';
// import TextTranslation from '../../../commonResources/component/CommonInput/TextTranslation';
// import {FontStyle} from '../../../../asset/style/FontsStyle';

// const {width} = Dimensions.get('screen');

// interface DataTypes {
//   navigateToOrderSucess:()=>void;
//   title: string;
//   img: string;
// }

// const SwipeButton = ({navigateToOrderSucess, title, img}: DataTypes) => {
//   const translateX = useSharedValue(0);
//   const maxTranslation = width * 0.7;
//   const context = useSharedValue({x: 0});
//   const fadeDuration = 200;


//   const scrollTo = useCallback((destination: number) => {
//     'worklet';

//     translateX.value = withSpring(destination, {damping: 50});
//   }, []);

//   const gesture = Gesture.Pan()
//     .onStart(() => {
//       context.value = {x: translateX.value};
//       translateX.value = withTiming(translateX.value, {duration: fadeDuration});
//     })
//     .onUpdate(event => {
//       let newTranslation = event.translationX;
//       if (newTranslation < 0) newTranslation = 0;
//       if (newTranslation > maxTranslation) newTranslation = maxTranslation;
//       translateX.value = newTranslation;
//     })

//     .onEnd(() => {
//       if (translateX.value > width / 2.5) {
//         runOnJS(navigateToOrderSucess)();
//         scrollTo(0);
//         console.log('reched to destination');
      
//       } else if (translateX.value < width / 2) {
//         console.log('back to position');
//         scrollTo(0);
//       }
//     });

//   const animatedStyle = useAnimatedStyle(() => {
//     return {
//       transform: [{translateX: translateX.value}],
//     };
//   });
//   const fadeStyle = useAnimatedStyle(() => {
//     return {
//       opacity: translateX.value === 0 ? 1 : 0, // Fade text when swipe starts
//     };
//   });

//   return (
//     <View>
//       <GestureDetector gesture={gesture}>
//         <View style={[CommonStyle.flex_dirRow_alignCenter, style.switch]}>
//           <Animated.View
//             style={[
//               CommonStyle.alignCenter_justifyCenter,
//               animatedStyle,
//               {
//                 backgroundColor: ColorVariable.farmkartGreen,
//                 width: 60,
//                 height: 60,
//                 borderRadius: 30,
//               },
//             ]}>
//             {img === 'bag' ? (
//               <Image
//                 source={require('../../../../asset/img/updatedImg/ShoppingbagWhite.png')}
//                 style={{width: 24, height: 24}}
//               />
//             ) : img === 'card' ? (
//               <Image
//                 source={require('../../../../asset/img/updatedImg/credit_card.png')}
//                 style={{width: 24, height: 24}}
//               />
//             ) : img === 'lock' ? (
//               <Image
//                 source={require('../../../../asset/img/updatedImg/Lock.png')}
//                 style={{width: 64, height: 64}}
//               />
//             ) : null}
//           </Animated.View>
//           <Animated.View style={fadeStyle}>
//             <Image
//               source={require('../../../../asset/img/updatedImg/SwipeArrow.png')}
//               style={{width: 32, height: 32, marginHorizontal: 8}}
//             />
//           </Animated.View>
//           <Animated.View style={[fadeStyle, {flex: 1}]}>
//             <TextTranslation
//               text={title}
//               style={[FontStyle.fontMedium16, {color: ColorVariable.gray}]}
//             />
//           </Animated.View>
//         </View>
//       </GestureDetector>
//     </View>
//   );
// };

// export default SwipeButton;

// const style = StyleSheet.create({
//   fotter: {
//     backgroundColor: ColorVariable.blueBlack,
//     paddingVertical: 16,
//     marginTop: 16,
//     marginBottom: 20,
//   },
//   switch: {
//     backgroundColor: ColorVariable.white,
//     padding: 8,
//     borderRadius: 50,
//   },
// });
