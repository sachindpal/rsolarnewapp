// toastConfig.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FontStyle } from '../../../asset/style/FontsStyle';

const toastConfig = {
  success: ({ text1 }:any) => (
    <View style={styles.container}>
      <Text style={[FontStyle.fontMedium16,{color:"white"}]}>{text1}</Text>
    </View>
  ),
  error: ({ text1 }:any) => (
    <View style={styles.container}>
      <Text style={styles.text}>{text1}</Text>
    </View>
  ),
  info: ({ text1 }:any) => (
    <View style={styles.container}>
      <Text style={styles.text}>{text1}</Text>
    </View>
  ),
};

const styles = StyleSheet.create({
  container: {
    backgroundColor:"#242734",
    padding: 16,
    borderRadius: 8,
    width:"100%",
    marginTop: -30,
    // marginHorizontal: 10,
    zIndex: 2, // Ensure the toast is above other components
    // alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 16,
  },
});

export default toastConfig;
