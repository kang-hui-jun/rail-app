import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

export const Home = () => {
  return (
    <View style={styles.home}>
      <Text>首页</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  home: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
});
