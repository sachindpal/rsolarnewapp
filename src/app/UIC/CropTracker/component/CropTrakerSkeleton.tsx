import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import HeaderWithBack from '../../../commonResources/component/Header/HeaderWithBack';
import SkeletonLoader from '../../../commonResources/component/SkeletonLoader';
import {CommonStyle} from '../../../../asset/style/commonStyle';
import CardSkeletonLoader from '../../../commonResources/component/CardSkeletonLoader';

const CropTrakerSkeleton = () => {
  return (
    <View style={{flex: 1}}>
      <HeaderWithBack title="__CROPTRACKER__" />
      <View style={{margin: 20}}>
        <SkeletonLoader width={"90%"} height={20} variant="box" variant2="dark" />
      </View>
      <CardSkeletonLoader/>
      <View style={{margin: 20}}>
        <View style={{marginBottom: 20}}>
          <SkeletonLoader
            width={100}
            height={20}
            variant="box"
            variant2="dark"
          />
        </View>
        <SkeletonLoader
          width={350}
          height={400}
          variant="box"
          variant2="dark"
        />
      </View>
      <View style={{margin: 20}}>
        <SkeletonLoader
          width={350}
          height={100}
          variant="box"
          variant2="dark"
        />
      </View>
    </View>
  );
};

export default CropTrakerSkeleton;

const styles = StyleSheet.create({});
