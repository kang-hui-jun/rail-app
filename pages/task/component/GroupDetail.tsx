import {View, Text, StyleSheet, Image} from 'react-native';
import React from 'react';
import config from '../../../utils/config';
import {Person} from '../../../types/task';

const image = {
  uri: config.apiUrl + '/imgs/task/avatar.png',
};

// @ts-ignore
export default function GroupDetail({route, navigation}) {
  const params = route.params;
  console.log(params.personList);

  return (
    <View style={styles.page}>
      <View style={styles.card}>
        <View style={styles.title}>
          <Text style={styles.name}>作业人员</Text>
          <Text style={styles.count}>小组人数：{params.personList.length}</Text>
        </View>
        <View style={styles.list}>
          {params.personList?.map((item: Person) => (
            <View style={styles.li} key={item.id}>
              <Image style={styles.avatar} source={image}></Image>
              <Text>{item.personName}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.card}>
        <View style={styles.title}>
          <Text style={styles.name}>领用物资</Text>
          <Text style={styles.count}>物资总数：{params.personList.length}</Text>
        </View>
        <View style={styles.list}>
          {params.personList?.map((item: Person) => (
            <View style={styles.li} key={item.id}>
              <Image style={styles.avatar} source={image}></Image>
              <Text>{item.personName}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.card}>
        <View style={styles.title}>
          <Text style={styles.name}>遗留物品</Text>
          <Text style={styles.count}>
            遗留物品数：{params.personList.length}
          </Text>
        </View>
        <View style={styles.list}>
          {params.personList?.map((item: Person) => (
            <View style={styles.li} key={item.id}>
              <Image style={styles.avatar} source={image}></Image>
              <Text>{item.personName}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    padding: 15,
    gap: 24,
  },
  card: {
    padding: 20,
    flexDirection: 'column',
    boxShadow: '0rpx 2rpx 16rpx 0rpx rgba(20, 54, 108, 0.04)',
    backgroundColor: '#FFFFFF',
    gap: 20,
  },
  title: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {},
  count: {},
  list: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 20,
  },
  li: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    marginBottom: 5,
  },
});
