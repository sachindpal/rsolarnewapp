import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import SkeletonLoader from '../../commonResources/component/SkeletonLoader';

const SowingTypeSkeletonLoader = () => {
  return (
    <View style={{padding: 20,flex:1}}>
      <SkeletonLoader width={100} height={30} variant="box" variant2="dark" />
      <View>
        {new Array(0, 5).map((_, index) => {
          return (
            <>
              <View style={{margin:16,flexDirection:"row"}} key={index}>
                <SkeletonLoader
                  width={120}
                  height={120}
                  variant="box"
                  variant2="dark"
                />
              </View>
            </>
          );
        })}
      </View>
    </View>
  );
};

export default SowingTypeSkeletonLoader;

const styles = StyleSheet.create({});
