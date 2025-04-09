import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Easing } from 'react-native';

const GlowingBorder = ({ children }: any) => {
    const animationValue = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const startAnimation = () => {
            Animated.timing(animationValue, {
                toValue: 1,
                duration: 5000,
                easing: Easing.linear,
                useNativeDriver: false,
            }).start(() => {
                animationValue.setValue(0);
                startAnimation();
            });
        };

        startAnimation();
    }, []);

    const borderColor = animationValue.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: ['rgba(115, 190, 68, 1)', 'rgba(115, 190, 68, 0)', 'rgba(115, 190, 68, 0.2)'],
    });

    const borderWidth = animationValue.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [1, 6, 0],
    });

    return (
        <View style={styles.container}>
            <View style={{ zIndex: 2 }}>{children}</View>
            <Animated.View
                style={[
                    styles.animatedBorder,
                    { borderColor, borderWidth },
                ]}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'relative',
    },
    animatedBorder: {
        position: 'absolute',
        top: -3,
        left: -3,
        right: -3,
        bottom: -3,
        borderRadius: 6,
        zIndex: 1,
    },
});

export default React.memo(GlowingBorder);
