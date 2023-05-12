import React from 'react';
import {StyleSheet, View, Text, Image, TouchableHighlight} from 'react-native';
import config from '../../utils/config';

type Menu = {
  path: string;
  title: string;
};

const image = {
  uri: config.apiUrl + '/imgs/home/task.png',
};

const nav: Menu[] = [
  {
    path: 'inspection',
    title: '巡检管理',
  },
  {
    path: 'task',
    title: '作业管理',
  },
  {
    path: 'warehouse',
    title: '库存管理',
  },
  {
    path: 'emergency',
    title: '应急抢修',
  },
  {
    path: 'logout',
    title: '退出登录',
  },
];

// @ts-ignore
const renderMenu = (item: Menu, navigation) => {
  return (
    <TouchableHighlight
      style={styles.menu}
      key={item.path}
      onPress={() => navigation.navigate(item.title)}>
      <View>
        <Image
          style={styles.img}
          source={image}
          // source={{uri: require('../../assets/task.png')}}
        />
        <Text style={styles.title}>{item.title}</Text>
      </View>
    </TouchableHighlight>
  );
};

// @ts-ignore
export const Home = ({navigation}) => {
  return (
    <View style={styles.home}>
      {nav.map(item => renderMenu(item, navigation))}
    </View>
  );
};

const styles = StyleSheet.create({
  home: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    // justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    padding: 12,
  },
  menu: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    flexBasis: '48%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
  },
  img: {
    width: 150,
    height: 150,
  },
  title: {
    fontSize: 24,
    color: '#3B80F0',
  },
});
