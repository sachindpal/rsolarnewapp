import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { CommonStyle, commanRadius } from '../../../../asset/style/commonStyle';
import { FontStyle } from '../../../../asset/style/FontsStyle';
import CustomButton from '../../../commonResources/component/CommonButton/CustomButton';
import { useNavigation, useRoute } from '@react-navigation/native';
import { CommonContext } from '../../../commonResources/Context/CommonContext';
import { useTranslation } from 'react-i18next';
import { Add, CloseBlack, CloseIcon, Remove } from '../../../../asset/img';
import TextTranslation from '../../../commonResources/component/CommonInput/TextTranslation';
import { RadioButton } from 'react-native-paper';

const FilterForBrandPopup = (props:any) => {
    const route = useRoute<any>();
    const navigation = useNavigation<any>();
    const { t: translate } = useTranslation();
    const [checked,setChecked] = useState('')
    const [productQty, setproductQty] = React.useState(0);
    
    const goback = () => {
        navigation.goBack();
    };
    const onChecked = (value:any)=>{
        
        setChecked(value)
        navigation.navigate('ViewAllBrands',{lang:props.route.params.lang,sortValue:value});

    }

    useEffect(()=>{
        console.log('props.route.params.sortedValue',props.route.params)
        setChecked(props.route.params.sortedValue)
    },[])

    return (
        <View style={[CommonStyle.mainView, { backgroundColor: 'rgba(0,0,0,0.3)' }]}>
            <Pressable
                style={{ backgroundColor: 'rgba(0,0,0,0.5)', flex: 1 }}
                onPress={goback}
            />
            <View style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                <View style={styles.modelView}>
                    <View style={{
                        flexDirection: 'row', "display": "flex",
                        "justifyContent": "space-between",
                        "alignItems": "center",
                        "alignSelf": "stretch"
                    }}>
                        <TextTranslation style={{
                            "color": "#242734",
                            "fontFamily": "Avenir",
                            "fontSize": 18,
                            "fontStyle": "normal",
                            "fontWeight": "800",
                            "lineHeight": 27
                        }} text={"Sort_by"}/>
                            
                        <Pressable

                            onPress={goback}
                        >
                            <View>
                                <CloseBlack />

                            </View>
                        </Pressable>
                    </View>


                    <View style={{
                        flexDirection: 'row',
                        "alignItems": "flex-start",
                        "gap": 8,
                        "flexGrow": 1,
                        "flexShrink": 0,
                        padding: 16,
                        borderWidth: 1,
                        borderStyle: 'solid',
                        borderColor: '#DCE0EF',
                        marginTop: 20,
                        borderRadius: 6
                    }}>
                        <RadioButton
                            value="popular"
                            status={ checked === 'popular' ? 'checked' : 'unchecked' }
                            onPress={()=>onChecked('popular')}
                            color='#000'
                        />
                        <TextTranslation style={{
                            "color": "#242734",
                            "fontFamily": "Avenir",
                            "fontSize": 16,
                            "fontStyle": "normal",
                            "fontWeight": "800",
                            "lineHeight": 24,
                            marginTop: 4
                        }} text={"Popular"}/>
                            
                    </View>


                    <View style={{
                        flexDirection: 'row',
                        "alignItems": "flex-start",
                        "gap": 8,
                        "flexGrow": 1,
                        "flexShrink": 0,
                        padding: 16,
                        borderWidth: 1,
                        borderStyle: 'solid',
                        borderColor: '#DCE0EF',
                        marginTop: 20,
                        borderRadius: 6
                    }}>
                        <RadioButton
                            value="newest"
                            status={ checked === 'newest' ? 'checked' : 'unchecked' }
                            onPress={()=>onChecked('newest')}
                            color='#000'
                        />
                        <TextTranslation style={{
                            "color": "#242734",
                            "fontFamily": "Avenir",
                            "fontSize": 16,
                            "fontStyle": "normal",
                            "fontWeight": "800",
                            "lineHeight": 24,
                            marginTop: 4
                        }} text={"Newest"} />
                            

                    </View>



                    <View style={{
                        flexDirection: 'row',
                        "alignItems": "flex-start",
                        "gap": 8,
                        "flexGrow": 1,
                        "flexShrink": 0,
                        padding: 16,
                        borderWidth: 1,
                        borderStyle: 'solid',
                        borderColor: '#DCE0EF',
                        marginTop: 20,
                        borderRadius: 6
                    }}>
                        <RadioButton
                            value="asc"
                            status={ checked === 'asc' ? 'checked' : 'unchecked' }
                            onPress={()=>onChecked('asc')}
                            color='#000'
                        />
                        <TextTranslation style={{
                            "color": "#242734",
                            "fontFamily": "Avenir",
                            "fontSize": 16,
                            "fontStyle": "normal",
                            "fontWeight": "800",
                            "lineHeight": 24,
                            marginTop: 4
                        }} text={"Name_A_Z"} />
                            
                    </View>



                    <View style={{
                        flexDirection: 'row',
                        "alignItems": "flex-start",
                        "gap": 8,
                        "flexGrow": 1,
                        "flexShrink": 0,
                        padding: 16,
                        borderWidth: 1,
                        borderStyle: 'solid',
                        borderColor: '#DCE0EF',
                        marginTop: 20,
                        borderRadius: 6
                    }}>
                        <RadioButton
                            value="desc"
                            status={ checked === 'desc' ? 'checked' : 'unchecked' }
                            onPress={()=>onChecked('desc')}
                            color='#000'
                        />
                        <TextTranslation style={{
                            "color": "#242734",
                            "fontFamily": "Avenir",
                            "fontSize": 16,
                            "fontStyle": "normal",
                            "fontWeight": "800",
                            "lineHeight": 24,
                            marginTop: 4
                        }} text={"Name_Z_A"} />
                    </View>

                    <View style={[CommonStyle.flex_dirRow_alignCenter]}>

                    </View>
                </View>
            </View>
        </View>
    );
};

export default FilterForBrandPopup;

const styles = StyleSheet.create({
    imgView: {
        borderWidth: 0.5,
        borderColor: 'rgba(220, 224, 239, 1)',
        borderRadius: commanRadius.radi6,
        overflow: 'hidden',
        width: 110,
        height: 110,
        marginBottom: 10,
        marginTop: 10,
    },
    icon: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        marginTop: -2,
    },
    bottom: {
        paddingTop: 24,
    },
    modelView: {
        backgroundColor: 'white',
        paddingRight: 16,
        paddingLeft: 16,
        paddingTop: 10,
        paddingBottom: 24,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
});
