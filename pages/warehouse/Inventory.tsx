import {View, Text, StyleSheet} from 'react-native';
import React from 'react';

export default function Inventory() {
  return (
    <View style={styles.page}>
      <Text>物资盘点</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    padding: 22,
  },
  card: {
    backgroundColor: '#FFFFFF',
    padding: 12,
    marginBottom: 10,
  },
});
