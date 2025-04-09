import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { CommonStyle } from '../../../asset/style/commonStyle';
import SkeletonLoader from './SkeletonLoader';

const CardSkeletonLoader = () => {
  return (
    <View style={CommonStyle.flex_dirRow_alignCenter}>
        {Array.from({length: 3}).map((item: any, index) => {
          return (
            <View key={index} style={{margin: 8}}>
              <SkeletonLoader
                width={100}
                height={100}
                variant="box"
                variant2="dark"
              />
            </View>
          );
        })}
      </View>
  )
}

export default CardSkeletonLoader

const styles = StyleSheet.create({})