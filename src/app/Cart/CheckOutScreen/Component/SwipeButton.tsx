import React, { useCallback, useRef } from 'react';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  Image,
  Animated,
  PanResponder,
} from 'react-native';
import { ColorVariable, CommonStyle } from '../../../../asset/style/commonStyle';
import TextTranslation from '../../../commonResources/component/CommonInput/TextTranslation';
import { FontStyle } from '../../../../asset/style/FontsStyle';

const { width } = Dimensions.get('screen');

interface DataTypes {
  navigateToOrderSucess: () => void;
  title: string;
  img: string;
}

const SwipeButton = ({ navigateToOrderSucess, title, img }: DataTypes) => {
  const translateX = useRef(new Animated.Value(0)).current;
  const maxTranslation = width * 0.7;

  const scrollTo = useCallback((destination: number) => {
    Animated.spring(translateX, {
      toValue: destination,
      damping: 50,
      useNativeDriver: true,
    }).start();
  }, []);

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: Animated.event([null, { dx: translateX }], {
      useNativeDriver: false,
    }),
    onPanResponderRelease: (_, gestureState) => {
      if (gestureState.dx > width / 2.5) {
        navigateToOrderSucess();
        scrollTo(0);
        console.log('Reached the destination');
      } else {
        console.log('Back to position');
        scrollTo(0);
      }
    },
  });

  // Animated styles
  const animatedStyle = {
    transform: [{ translateX }],
  };

  const fadeStyle = {
    opacity: translateX.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 0], // Fade text when swipe starts
    }),
  };

  return (
    <View>
      <View style={[CommonStyle.flex_dirRow_alignCenter, style.switch]}>
        <Animated.View
          style={[
            CommonStyle.alignCenter_justifyCenter,
            animatedStyle,
            {
              backgroundColor: ColorVariable.farmkartGreen,
              width: 60,
              height: 60,
              borderRadius: 30,
            },
          ]}
          {...panResponder.panHandlers}
        >
          {img === 'bag' ? (
            <Image
              source={require('../../../../asset/img/updatedImg/ShoppingbagWhite.png')}
              style={{ width: 24, height: 24 }}
            />
          ) : img === 'card' ? (
            <Image
              source={require('../../../../asset/img/updatedImg/credit_card.png')}
              style={{ width: 24, height: 24 }}
            />
          ) : img === 'lock' ? (
            <Image
              source={require('../../../../asset/img/updatedImg/Lock.png')}
              style={{ width: 64, height: 64 }}
            />
          ) : null}
        </Animated.View>
        <Animated.View style={fadeStyle}>
          <Image
            source={require('../../../../asset/img/updatedImg/SwipeArrow.png')}
            style={{ width: 32, height: 32, marginHorizontal: 8 }}
          />
        </Animated.View>
        <Animated.View style={[fadeStyle, { flex: 1 }]}>
          <TextTranslation
            text={title}
            style={[FontStyle.fontMedium16, { color: ColorVariable.gray }]}
          />
        </Animated.View>
      </View>
    </View>
  );
};

export default SwipeButton;

const style = StyleSheet.create({
  fotter: {
    backgroundColor: ColorVariable.blueBlack,
    paddingVertical: 16,
    marginTop: 16,
    marginBottom: 20,
  },
  switch: {
    backgroundColor: ColorVariable.white,
    padding: 8,
    borderRadius: 50,
  },
});
