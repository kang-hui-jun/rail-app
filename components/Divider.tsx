import {View, StyleSheet} from 'react-native';
import React from 'react';

export default function Divider({width}: {width?: number}) {
  return <View style={{...styles.divider, width}}></View>;
}

const styles = StyleSheet.create({
  divider: {
    height: 2,
    backgroundColor: '#F0F1F3',
    marginTop: 10,
    marginBottom: 10,
  },
});
