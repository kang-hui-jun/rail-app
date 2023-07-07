import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import CheckBox from '@react-native-community/checkbox';

export const Info = ({detail}: {detail: any}) => {
  return (
    <View style={styles.page}>
      <View style={styles.item}>
        <Text>巡检线路：</Text>
        <Text>{detail.lineName}</Text>
      </View>
      <View style={styles.item}>
        <Text>巡检时间：</Text>
        <Text>{detail.inspectionDate}</Text>
      </View>
      <View style={styles.item}>
        <Text>负责部门：</Text>
        <Text>{detail.deptName}</Text>
      </View>
      <View style={styles.item}>
        <Text>负责人：</Text>
        <Text>{detail.inspectionLeaderName}</Text>
      </View>
      <View style={styles.item}>
        <Text>巡检人：</Text>
        <Text>
          {detail.personListVo?.map(item => item.personName).join(', ')}
        </Text>
      </View>
      <View style={styles.item}>
        <Text>巡检区段：</Text>
        <Text>{detail.inspectionAddr}</Text>
      </View>
      <View style={styles.item}>
        <Text>巡检项：</Text>
        <View style={styles.item}>
          <CheckBox disabled={false} value={true} />
          <CheckBox disabled={false} value={true} />
          <CheckBox disabled={false} value={true} />
          <CheckBox disabled={false} value={true} />
        </View>
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
    alignItems: 'center'
  },
});
