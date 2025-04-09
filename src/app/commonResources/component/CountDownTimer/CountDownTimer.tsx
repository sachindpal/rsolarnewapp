import React, { memo, useEffect, useState } from 'react'
import { Subscription, timer } from 'rxjs';
import { Text } from 'react-native';

 function CountDown({ seconds, trigger, timerStart, newStyle }: any): any {

	function timeConverter(seconds: number) {
		let min = seconds / 60;

		if (min > 0) {
			if (min > 10) {
				return <Text style={newStyle}>{`${parseInt(String(min))}:${seconds % 60}`}</Text>
			} else {
				return <Text style={newStyle}>{`${parseInt(String(min))}:${seconds % 60}`}</Text>
			}
		} else {
			if (seconds > 10) {
				return <Text style={newStyle}>{`0:${seconds % 60}`}</Text>
			} else {
				return <Text style={newStyle}>{`0:0${seconds % 60}`}</Text>
			}
		}
	}

	let subscribe!: Subscription;
	const secondMs = seconds * 1000;
	const newMs = new Date().getTime();
	const newTime = newMs + secondMs;

	const [time, setTime] = useState<number>(seconds);

	useEffect(() => {
		if (timerStart) {
			subscribe = timer(1000, 1000) //Initial delay 1 seconds and interval countdown also 1 second
				.subscribe(() => {
					let currentTimeInMS = new Date().getTime();
					let targetTimeInMs = newTime;
					let timeLeftInMs = targetTimeInMs - currentTimeInMS;
					let seconds = timeLeftInMs / 1000;
					if (seconds >= 1) {
						setTime(parseInt(String(seconds)));
					} else {
						trigger();
						subscribe.unsubscribe();
					}
				});

			return () => {
				setTime(seconds)
				subscribe.unsubscribe();
			};
		}

		if (!timerStart && subscribe) {
			setTime(seconds)
			subscribe.unsubscribe();
		} else {

		}

	}, [timerStart])

	return timeConverter(time)
}

export default memo(CountDown)