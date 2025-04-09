import { Pressable, StyleSheet, Text, View, Image, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';
import { ColorVariable, commanRadius, CommonStyle } from '../../asset/style/commonStyle';
import { FarmkartGPT, LeftBackIcon, Robot, CloseBlack, AudioButtonModal, Mic, MicOff } from '../../asset/img';
import { useNavigation } from '@react-navigation/native';
import WebView from 'react-native-webview';
import Button from '../commonResources/component/CommonButton/Button';
import { FontStyle } from '../../asset/style/FontsStyle';
import TextTranslation from '../commonResources/component/CommonInput/TextTranslation';
import { getLocalStorageData, postAuthReq } from '../Service/APIServices/axoisService';
import moment from 'moment';
import LottieView from 'lottie-react-native';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import { Platform } from 'react-native';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import { mediaDevices } from 'react-native-webrtc';

const audioRecorderPlayer = new AudioRecorderPlayer();
let controller = new AbortController();
const constraints: any = {
    audio: {
        noiseSuppression: true,
        echoCancellation: true,
        autoGainControl: true,
    },
    video: false,
};



const AudioConv = (props: any) => {
    console.log('props', props?.route?.params?.targetTokens)
    const { t: translate } = useTranslation()
    const navigation = useNavigation<any>()
    const [micOn, setMicOn] = useState(true)

    const [micPermission, setMicPermission] = useState<any>(null);
    const [isRecording, setIsRecording] = useState<any>(false);
    const [isPlaying, setIsPlaying] = useState<any>(false);
    const [lotty, setLotty] = useState<any>(false);
    const [chatDataForValidation, setChatDataForValidation] = useState<any>();
    const [isLoading, setIsLoading] = useState<any>(false);
    const [isSession, setIsSession] = useState(true);
    const [recordedFilePath, setRecordedFilePath] = useState<any>(null);


    useEffect(() => {
        checkMicPermission();

    }, []);

    // Check Microphone Permission
    const checkMicPermission = async () => {
        const permission =
            Platform.OS === 'ios' ? PERMISSIONS.IOS.MICROPHONE : PERMISSIONS.ANDROID.RECORD_AUDIO;

        const result = await check(permission);
        if (result == 'denied') {
            requestMicPermission();
        } else {

            // console.log('mediaDevices',mediaDevices)
            mediaDevices.getUserMedia(constraints)
                .then(stream => {
                    console.log('Microphone access granted with noise suppression.', stream);
                })
                .catch(error => {
                    console.error('Error accessing microphone:', error);
                });
        }
        setMicPermission(result);
    };

    // Request Microphone Permission
    const requestMicPermission = async () => {
        const permission =
            Platform.OS === 'ios' ? PERMISSIONS.IOS.MICROPHONE : PERMISSIONS.ANDROID.RECORD_AUDIO;

        const result = await request(permission);
        setMicPermission(result);

        if (result === RESULTS.GRANTED) {

            mediaDevices.getUserMedia(constraints)
                .then(stream => {
                    console.log('Microphone access granted with noise suppression.');
                })
                .catch(error => {
                    console.error('Error accessing microphone:', error);
                });
            // Alert.alert('Permission Granted', 'You can now use the microphone.');
        } else {
            Alert.alert('Permission Denied', 'Microphone access is required.');
            navigation.navigate('ChatScreen')

        }
    };

    // Start Recording
    const startRecording = async () => {
        if(lotty==true){
            audioRecorderPlayer.stopPlayer();
        }
        const audioSet: any = {
            SampleRate: 48000,  // Standard for clear audio (48kHz)
            Channels: 1,        // Mono recording (better for speech)
            AudioQuality: 'High',
            AudioEncoding: 'aac',
            OutputFormat: 'mpeg_4',
            BitRate: 256000,  // High bit rate for clarity
            AudioSource: 6,   // Android: Uses voice-optimized mic
        };
        try {
            const result = await audioRecorderPlayer.startRecorder(undefined, audioSet);
            //   setRecordedFilePath(result);
            setIsRecording(true);
            
            console.log('Recording Started', 'Your microphone is active.');
        } catch (error) {
            console.log('Error', 'Failed to start recording.');
        }
    };

    // Stop Recording
    const stopRecording = async () => {
        try {
            const result = await audioRecorderPlayer.stopRecorder();
            setIsRecording(false);
            //   setRecordedFilePath(result);
            sendToApi(result)
            console.log(result, 'result');
            console.log('Recording Stopped', `File saved at: ${result}`);
        } catch (error) {
            console.log('Error', 'Failed to stop recording.');
        }
    };



    const sendToApi = async (file: any) => {
       
        setIsLoading(true)
        controller.abort();
        const token = await getLocalStorageData('auth_Token');
        const temp_token = await getLocalStorageData('temp_auth_Token');
        const pass_token = token ? token : temp_token;

        const formData = new FormData();
        formData.append('audio', {
            uri: `file://${file}`,
            name: 'audioRecord.mp4',
            type: 'audio/mp4',
        });
        try {
            const response = await fetch('https://mobileapinew.farmkart.com/api/chatbot/send-message-audio', {
                method: 'POST',
                body: formData,
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${pass_token}`,
                },
            });
            const result = await response.json();
            // console.log('result', result)
            if (result?.data?.audioPath) {
                // setChatDataForValidation(result?.data?.data.conversationsData)
                console.log('sachib', result?.data?.conversationsData?.answer_token)
                // props?.route?.params?.targetTokens
                if (props?.route?.params?.targetTokens <= result?.data?.conversationsData?.answer_token) {
                    setIsSession(false)
                }
                setIsLoading(false)
                setLotty(true)
                
                playRecording(result?.data?.audioPath.url)

            }
        } catch (err) {
            console.log('err', err)
        }
    }

    // Play Recorded Audio
    const playRecording = async (record: any) => {
        if (!record) {
            console.log('No Recording Found', 'Please record an audio first.');
            return;
        }

        try {
            await audioRecorderPlayer.startPlayer(record);
            setIsPlaying(true);

            audioRecorderPlayer.addPlayBackListener((e) => {
                console.log('e.currentPosition',e.currentPosition)
                console.log('e.duration',e.duration)
                if (e.currentPosition >= e.duration) {
                  console.log('Playback finished');
                  setLotty(false)
                  audioRecorderPlayer.stopPlayer();
                  audioRecorderPlayer.removePlayBackListener();
                }
              });
            console.log('Playing Recording', 'Listen to your recorded audio.');
        } catch (error) {
            console.log('Error', 'Failed to play the recording.');
        }
    };

    // Stop Playing Audio
    const stopPlaying = async () => {
        try {
            await audioRecorderPlayer.stopPlayer();
            setIsPlaying(false);

        } catch (error) {
            console.log('Error', 'Failed to stop playback.');
        }
    };
    const navigationToChat = async() => {
        
        navigation.navigate('ChatScreen')
        stopPlaying()
        
    }

    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            <Pressable
                onPress={() => navigationToChat()}
                style={{ left: 300, top: 20 }}>
                <CloseBlack />
            </Pressable>
            <LottieView
                source={require('../../../src/asset/img/Audio_waves.json')}
                autoPlay
                loop={lotty}
                // duration={timeDuration}
                style={{ width: 300, height: 300, position: 'absolute', top: 150, left: 30 }}
            />
            <View style={{ justifyContent: 'center', alignItems: 'center', top: 180 }}>
                <Image source={require("../../asset/img/AudioScreenRaichandIcon.png")} style={{ width: 169, height: 169 }} />



            </View>

            <View style={{ top: 400, justifyContent: 'center', alignItems: 'center' }}>

                {isLoading ?
                    <Pressable style={styles.micLoading}>
                        <LottieView
                            source={require('../../../src/asset/img/Loader.json')}
                            autoPlay
                            loop
                            style={{ width: 100, height: 70, marginLeft: 10 }}
                        />
                    </Pressable> : isRecording ?
                        <Pressable onPress={stopRecording} style={styles.micButtonOff}>
                            <LottieView
                                source={require('../../../src/asset/img/recording.json')}
                                autoPlay
                                loop
                                // duration={timeDuration}
                                style={{ width: 150, height: 150, position: 'absolute' }}
                            />
                            <MicOff />
                        </Pressable> : isSession ? <Pressable onPress={startRecording} style={styles.micButton}>
                            <Mic />

                        </Pressable> :
                            <View style={{flexDirection:'column',gap:16,paddingRight:8,paddingLeft:8,paddingBottom:16,paddingTop:16,marginLeft:16,marginRight:16,bottom:80}}>
                                <View>
                                    <Text style={{color:'#242734',textAlign:'center',fontFamily:'Avenir Medium',fontSize:16,fontWeight:'500'}}>{translate('__TOKEN_EXPIRE_MESSAGE__')}</Text>
                                </View>
                                <View style={{ paddingVertical: 16, paddingHorizontal: 16 }}>
                                <Button
                                    title={translate('__BACK__')}
                                    fontSize={16}
                                    bgGreen
                                    onPress={()=>navigationToChat()}
                                />
                            </View>
                            </View>
                }
                {/* {isRecording ?
                    <Pressable onPress={stopRecording} style={styles.micButtonOff}>
                        <LottieView
                            source={require('../../../src/asset/img/recording.json')}
                            autoPlay
                            loop
                            // duration={timeDuration}
                            style={{ width: 150, height: 150, position: 'absolute' }}
                        />
                        <MicOff />
                    </Pressable> : <Pressable onPress={startRecording} style={styles.micButton}>
                        <Mic />

                    </Pressable>

                } */}
                {isLoading ? <Text style={{ color: '#7E7E7E', fontFamily: 'Avenir Medium', fontWeight: '400', lineHeight: 24, fontSize: 16, marginTop: 16 }}>Dr. Raichand is thinking</Text> : isRecording ?
                    <Text style={{ color: '#7E7E7E', fontFamily: 'Avenir Medium', fontWeight: '400', lineHeight: 24, fontSize: 16, marginTop: 16 }}>{translate('__Tap_to_stop__')}</Text> : <Text style={{ color: '#7E7E7E', fontFamily: 'Avenir Medium', fontWeight: '400', lineHeight: 24, fontSize: 16, marginTop: 16 }}>{translate('__Tap_to_ask__')}</Text>}
                {/* {isRecording ?
                    <Text style={{ color: '#7E7E7E', fontFamily: 'Avenir Medium', fontWeight: '400', lineHeight: 24, fontSize: 16, marginTop: 16 }}>Tap to stop</Text> : <Text style={{ color: '#7E7E7E', fontFamily: 'Avenir Medium', fontWeight: '400', lineHeight: 24, fontSize: 16, marginTop: 16 }}>Tap to ask</Text>} */}
            </View>


            {/* <Button title="Request Microphone Permission" onPress={requestMicPermission} /> */}



        </View>
    )
}

export default AudioConv

// const styles = StyleSheet.create({
//     fotter: {
//         paddingHorizontal: 24,
//         paddingBottom: 24,
//         paddingTop: 8,
//         backgroundColor: "rgba(255, 255, 255, 0.6)",
//         borderTopLeftRadius: 12,
//         borderTopRightRadius: 12
//     },
//     buttonWrap: {
//         alignItems: "center",
//         justifyContent: "center",
//         paddingTop: 11, paddingBottom: 11,
//         paddingHorizontal: 16,
//         height: 54,
//         borderRadius: commanRadius.radi6
//     },
// })

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    lottie: {
        width: 300,
        height: 300,
        position: 'absolute',
        top: 110,
        left: 30,
    },
    imageContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        top: 180,
    },
    image: {
        width: 169,
        height: 169,
    },
    controls: {
        top: 300,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 50,
    },
    micButton: {
        borderRadius: 50,
        backgroundColor: '#73BE44',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
        width: 80,
        height: 80,
    },

    micButtonOff: {
        borderRadius: 50,
        backgroundColor: '#FF5252',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
        width: 80,
        height: 80,
    },
    micLoading: {
        borderRadius: 50,
        backgroundColor: '#D4D4D4',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
        width: 80,
        height: 80,
    },
    stopButton: {
        borderRadius: 50,
        backgroundColor: '#FF5252',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
        width: 80,
        height: 80,
    },
    cancelButton: {
        borderRadius: 50,
        backgroundColor: '#E9E9E9',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
        width: 80,
        height: 80,
    },
    icon: {
        fontSize: 24,
        color: '#fff',
    },
});