import {View, Text, ImageBackground, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import config from '../../utils/config';
import TaskInfo from './TaskInfo';
import TaskGroup from './TaskGroup';

const image = {
  uri: config.apiUrl + '/imgs/inspection/detail.png',
};

export default function AddTask() {
  const [active, setActive] = useState(0);

  return (
    <View style={styles.page}>
      <ImageBackground source={image} style={styles.bg}>
        <Text>作业信息</Text>
        <Text>作业分组</Text>
      </ImageBackground>
      {active === 0 ? <TaskInfo setActive={setActive} /> : <TaskGroup />}
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    // backgroundColor: '#FFF',
  },
  bg: {
    width: '100%',
    resizeMode: 'cover',
    height: 150,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});
