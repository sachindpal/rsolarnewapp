import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import SkeletonLoader from '../../commonResources/component/SkeletonLoader';

const UICSkeletonLoader = () => {
  return (
    <View style={{padding: 24}}>
      <SkeletonLoader width={108} height={28} variant="box" variant2="dark" />
      <View style={{marginTop: 24}}>
        <SkeletonLoader
          width={344}
          height={183}
          variant="box"
          variant2="dark"
        />
      </View>
      <View style={{marginTop: 24}}>
        <SkeletonLoader width={108} height={28} variant="box" variant2="dark" />
      </View>

      <View style={{marginTop: 24, marginRight: 8, flexDirection: 'row'}}>
        <SkeletonLoader
          width={240}
          height={150}
          variant="box"
          variant2="dark"
        />
        <View style={{marginLeft: 8}}>
          <SkeletonLoader
            width={240}
            height={150}
            variant="box"
            variant2="dark"
          />
        </View>
      </View>
      <View style={{margin: 24, alignContent: 'center'}}>
        <SkeletonLoader width={312} height={54} variant="box" variant2="dark" />
      </View>
    </View>
  );
};

export default UICSkeletonLoader;

const styles = StyleSheet.create({});
