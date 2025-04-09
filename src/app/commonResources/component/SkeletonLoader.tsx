import { Animated } from 'react-native';
import React, { useEffect, useRef } from 'react';

interface skelatonProps {
	width: number|any;
	height: number;
	variant: 'box' | 'circle' | 'default';
	variant2: 'light' | 'dark' | 'default';
}

const SkelatonLoader: React.FC<skelatonProps> = ({ width, height, variant, variant2 }) => {
	const animatedValue = new Animated.Value(0);
	const opacity = useRef(new Animated.Value(0.3));

	let borderRadius = 0;
	if (variant === 'circle') {
		borderRadius = typeof height === 'string' ? parseInt(height, 10) / 2 : height / 2;
	}
	else if (variant === 'box') {
		borderRadius = typeof height === 'string' ? 4 : 4;
	}
	else {
		borderRadius = 0;
	}

	let background = "red"
	if (variant2 === 'light') {
		background = `rgb(249, 249, 255)`
	} else if (variant2 === 'dark') {
		background = `rgba(128, 128, 128,0.15)`
	} else {
		background = `rgb(128, 128, 128)`
	}

	useEffect(() => {
		Animated.loop(
			Animated.sequence([
				Animated.timing(opacity.current, {
					toValue: 1,
					useNativeDriver: true,
					duration: 500,
				}),
				Animated.timing(opacity.current, {
					toValue: 0.3,
					useNativeDriver: true,
					duration: 800,
				}),])
		).start(() => {
			// display()
		});
		return () => {
			closeTimer()
		}
	}, [opacity]);

	const closeTimer = () => {
		opacity.current.stopAnimation(() => {
		})
	}

	const translateX = animatedValue.interpolate({
		inputRange: [0, 1],
		outputRange: [0, 1]
	})
	return (
		<Animated.View
			style={{
				opacity: opacity.current,
				height: height,
				width: width,
				borderRadius,
				overflow: "hidden",
				backgroundColor: background,
				transform: [{ translateX }]
			}}>


		</Animated.View>
	);
};

export default React.memo(SkelatonLoader);