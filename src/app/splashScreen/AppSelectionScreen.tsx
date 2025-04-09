import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DarkLogo, Rsolar } from "../../asset/img";
import { useTranslation } from 'react-i18next';
const AppSelctionScreen = ({ navigation }: any) => {
    const [selectedOption, setSelectedOption] = useState(null);
    const { t: translate } = useTranslation();
    useEffect(() => {
        // Check if user has already selected an option
        // AsyncStorage.getItem("splashChoice").then((value) => {
        //   if (value) {
        //     navigation.replace(value === "option1" ? "SplashScreen1" : "SplashScreen2");
        //   }
        // });
    }, []);

    const handleSelection = async (option: any) => {
        setSelectedOption(option);
        // await AsyncStorage.setItem("splashChoice", option);
        navigation.replace(option === "option1" ? "splash" : "splashRsolar");
    };

    return (
        <View style={[styles.container]}>
           
            <View style={{ top: 80, flexDirection: 'column' }}>
                {/* select a store */}

                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: '#242734', fontFamily: 'Avenir Medium', fontSize: 24, fontWeight: '500' }}>{translate('__Select_a_store__')}</Text>

                </View>

                {/* farmkart store */}
                <TouchableOpacity onPress={() => handleSelection("option1")} style={{ flexDirection: 'row',  alignItems: 'center', marginTop: 40, borderWidth: 1, borderStyle: 'solid', borderColor: 'rgba(0, 0, 0, 0.20)', backgroundColor:'#fff',gap:10,borderRadius:16,marginLeft:20,marginRight:20,width:'100%',paddingRight:30,minWidth:320 }}>

                    {/* for image */}
                        <Image source={require("../../asset/img/farmkartSelectScreenIcon.png")} style={{ width: 120, height: 130 }} />


                    {/* for logo */}
                    <View style={{ flexDirection: 'column',gap:10 }}>
                        <DarkLogo width={145} height={27} />
                        <Text style={{ color: '#242734', fontFamily: 'Avenir Medium', fontWeight: '500' }}>{translate('__Agri_Shopping__')}</Text>
                    </View>

                </TouchableOpacity>




                {/* rsolar store */}
                <TouchableOpacity onPress={() => handleSelection("option2")} style={{ flexDirection: 'row', alignItems: 'center', marginTop: 40, borderWidth: 1, borderStyle: 'solid', borderColor: 'rgba(0, 0, 0, 0.20)', backgroundColor:'#fff',gap:10,borderRadius:16,marginLeft:20,marginRight:20,width:'100%',paddingRight:30,minWidth:320 }}>

                    {/* for image */}
                   
                        <Image source={require("../../asset/img/rsolarSelectScreenIcon.png")} style={{ width: 120, height: 130 }} />


                    {/* for logo */}
                    <View style={{ flexDirection: 'column' }}>
                        {/* <DarkLogo width={145} height={27} /> */}
                        <Rsolar />
                        <Text style={{ color: '#242734', fontFamily: 'Avenir Medium', fontWeight: '500' }}>{translate('__Solar_Power_Services__')}</Text>
                    </View>

                </TouchableOpacity>

            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "white" },
    title: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
    option: { flexDirection: "row", alignItems: "center", marginVertical: 10 },
    radio: { fontSize: 20, color: "gray", marginRight: 10 },
    selected: { color: "blue" },
    text: { fontSize: 18, color: '#000' },
});

export default AppSelctionScreen;
