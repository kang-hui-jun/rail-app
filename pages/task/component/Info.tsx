import {View, Text, StyleSheet, Image} from 'react-native';
import React from 'react';

export const Info = ({detail}: {detail: any}) => {
  return (
    <View style={styles.page}>
      <View style={styles.item}>
        <Image
          style={styles.img}
          source={require('../../../assets/task/line.png')}
        />
        <Text>作业线路：</Text>
        <Text>{detail.lineName}</Text>
      </View>
      <View style={styles.item}>
      <Image
          style={styles.img}
          source={require('../../../assets/task/time.png')}
        />
        <Text>请站点：</Text>
        <Text>{detail.pleaseName}</Text>
      </View>
      <View style={styles.item}>
      <Image
          style={styles.img}
          source={require('../../../assets/task/time.png')}
        />
        <Text>销站点：</Text>
        <Text>{detail.pinName}</Text>
      </View>
      <View style={styles.item}>
      <Image
          style={styles.img}
          source={require('../../../assets/task/user.png')}
        />
        <Text>负责人：</Text>
        <Text>{detail.leaderPersonName}</Text>
      </View>
      <View style={styles.item}>
      <Image
          style={styles.img}
          source={require('../../../assets/task/dept.png')}
        />
        <Text>作业部门：</Text>
        <Text>{detail.deptName}</Text>
      </View>
      <View style={styles.item}>
      <Image
          style={styles.img}
          source={require('../../../assets/task/content.png')}
        />
        <Text>作业内容：</Text>
        <Text>{detail.workContent}</Text>
      </View>
      <View style={styles.item}>
      <Image
          style={styles.img}
          source={require('../../../assets/task/qd.png')}
        />
        <Text>作业区域：</Text>
        <Text>{detail.workAddr}</Text>
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
    alignItems: 'center',
    gap: 5
  },
  img: {
    width: 20,
    height: 20,
  },
});
