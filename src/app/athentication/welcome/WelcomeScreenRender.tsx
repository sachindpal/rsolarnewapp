// import React, { useEffect } from 'react';
// import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
// import Animated, { useSharedValue, withTiming, Easing } from 'react-native-reanimated';
// import TextTranslation from '../../commonResources/component/CommonInput/TextTranslation';
// import Button from '../../commonResources/component/CommonButton/Button';
// import { WelcomeFarmkartLogo } from '../../../asset/img';
// import { FontStyle } from '../../../asset/style/FontsStyle';
// import { useNavigation } from '@react-navigation/native';
// import { ColorVariable, commanRadius } from '../../../asset/style/commonStyle';

// export default function WelcomeScreenRender() {
//   const opacity1 = useSharedValue(0);
//   const translateY1 = useSharedValue(100);

//   const opacity2 = useSharedValue(0);
//   const translateY2 = useSharedValue(100);

//   const opacity3 = useSharedValue(0);
//   const translateY3 = useSharedValue(100);

//   const navigation = useNavigation<any>()

//   useEffect(() => {
//     const animateTexts = async () => {
//       await Promise.all([
//         opacity1.value = withTiming(1, { duration: 1000, easing: Easing.inOut(Easing.ease) }),
//         translateY1.value = withTiming(-50, { duration: 1000, easing: Easing.inOut(Easing.ease) }),
//       ]);
//       setTimeout(() => {
//         Promise.all([
//           opacity2.value = withTiming(1, { duration: 1000, easing: Easing.inOut(Easing.ease) }),
//           translateY2.value = withTiming(-50, { duration: 1000, easing: Easing.inOut(Easing.ease) }),
//         ]);
//       }, 1000)

//       setTimeout(() => {
//         Promise.all([
//           opacity3.value = withTiming(1, { duration: 1000, easing: Easing.inOut(Easing.ease) }),
//           translateY3.value = withTiming(-50, { duration: 1000, easing: Easing.inOut(Easing.ease) }),
//         ]);
//       }, 2000)

//     };

//     animateTexts();
//   }, []);

//   return (
//     <View style={styles.container}>
//       <Animated.View style={[styles.topContainer, { opacity: opacity1, transform: [{ translateY: translateY1 }] }]}>
//         <TextTranslation style={FontStyle.fontMedium31} text={"__HELLO__"} />
//         <Text style={FontStyle.fontHeavy40}  >Anand Patidar</Text>
//       </Animated.View>
//       <Animated.View style={[styles.middleContainer, { opacity: opacity2, transform: [{ translateY: translateY2 }] }]}>
//         <TextTranslation style={[FontStyle.fontHeavy24, { marginBottom: 10 }]} text={"__WELCOME_TO__"} />

//         <WelcomeFarmkartLogo width={400} height={50} />

//       </Animated.View>
//       <Animated.View style={[styles.middleContainer, { opacity: opacity3, transform: [{ translateY: translateY3 }] }]}>
//         <TextTranslation style={FontStyle.fontHeavy22} text={"__THANKYOU_FOR__"} />
//         <View style={{ marginTop: 15, marginBottom: 96 }}>
//           <TextTranslation style={[FontStyle.fontMedium18, { textAlign: "center" }]} text={"__AGRICULTURE_PRODUCTS__"} />
//         </View>
//       </Animated.View>
//       <Animated.View style={[{ opacity: opacity3, transform: [{ translateY: translateY3 }] }]}>
//       <Pressable style={styles.btn} onPress={() => navigation.navigate("BottomTabBar")}>
//                         <Image source={require("../../../asset/img/updatedImg/ShoppingbagWhite.png")} style={{ width: 24, height: 24, marginRight: 8 }} />
//                         <TextTranslation style={[FontStyle.fontHeavy18, { color: "white" }]} text={'__START_SHOPPING__'} />
//                     </Pressable>

//       </Animated.View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingLeft: 30,
//     paddingRight: 30,
//     justifyContent: "center",
//   },
//   topContainer: {
//     paddingTop: 50,
//     alignItems: "center"
//   },
//   middleContainer: {
//     paddingTop: 50,
//     alignItems: "center"
//   },
//   text: {
//     fontSize: 24,
//     fontWeight: 'bold',
//   },
//   bottomContainer: {
//     paddingTop: 50,
//     backgroundColor: "pink"
//   },
//   btn: {
//     height: 54,
//     borderRadius: commanRadius.radi6,
//     alignItems: "center",
//     justifyContent: "center",
//     backgroundColor: ColorVariable.farmkartGreen,
//     flexDirection: "row",

// }
// });

import {Image, Modal, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';
import {
  ColorVariable,
  CommonStyle,
  commanRadius,
} from '../../../asset/style/commonStyle';
import {FontStyle} from '../../../asset/style/FontsStyle';
import TextTranslation from '../../commonResources/component/CommonInput/TextTranslation';
import {useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';

interface DataType {
  welcomeModal: boolean;
  welcomeModalFuct: any;
}

const WelcomeScreenRender = ({welcomeModal, welcomeModalFuct}: DataType) => {
  const {t: translate} = useTranslation();
  return (
    <Modal visible={welcomeModal} transparent animationType="fade">
      <View
        style={[
          {backgroundColor: 'rgba(0, 0, 0, 0.4)', flex: 1},
          CommonStyle.alignCenter_justifyCenter,
        ]}>
        <View style={styles.modal}>
          <LottieView
            source={require('../../../asset/img/Namaste.json')}
            autoPlay
            loop
            style={{width: 350, height: 400, marginTop: -54}}
          />
          <View style={{marginTop: -90}}>
            <TextTranslation
              style={FontStyle.fontHeavy24}
              text={'__WELCOME_TO__'}
            />
            <TextTranslation
              style={[FontStyle.fontMedium16, {textAlign: 'center'}]}
              text={'__THANKYOU_FOR__'}
            />
          </View>
          <Pressable style={[styles.btn]} onPress={welcomeModalFuct}>
            <Image
              source={require('../../../asset/img/updatedImg/ShoppingbagWhite.png')}
              style={{width: 24, height: 24, marginRight: 8}}
            />
            <TextTranslation
              style={[FontStyle.fontHeavy18, {color: 'white'}]}
              text={'__START_SHOPPING__'}
            />
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

export default React.memo(WelcomeScreenRender);

const styles = StyleSheet.create({
  btn: {
    height: 54,
    borderRadius: commanRadius.radi6,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: ColorVariable.farmkartGreen,
    flexDirection: 'row',
    width: '100%',
    marginTop: 24,
  },
  modal: {
    alignItems: 'center',
    backgroundColor: 'white',
    width: '95%',
    padding: 16,
    marginHorizontal: 8,
    borderRadius: 6,
    overflow: 'hidden',
  },
});
