import {View, Text, StyleSheet} from 'react-native';
import React from 'react';

export const Info = ({detail}: {detail: any}) => {

  return (
    <View style={styles.page}>
      <View style={styles.item}>
        <Text>作业线路：</Text>
        <Text>{ detail.lineName }</Text>
      </View>
      <View style={styles.item}>
        <Text>请站点：</Text>
        <Text>{ detail.pleaseName }</Text>
      </View>
      <View style={styles.item}>
        <Text>销站点：</Text>
        <Text>{ detail.pinName }</Text>
      </View>
      <View style={styles.item}>
        <Text>负责人：</Text>
        <Text>{ detail.leaderPersonName }</Text>
      </View>
      <View style={styles.item}>
        <Text>作业部门：</Text>
        <Text>{ detail.deptName }</Text>
      </View>
      <View style={styles.item}>
        <Text>作业内容：</Text>
        <Text>{ detail.workContent }</Text>
      </View>
      <View style={styles.item}>
        <Text>作业区域：</Text>
        <Text>{ detail.workAddr }</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    padding: 20,
    backgroundColor: '#FFF',
    gap: 20,
  },
  item: {
    flexDirection: 'row',
  },
});
