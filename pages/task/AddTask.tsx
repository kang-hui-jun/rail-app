import {View, Text, ImageBackground, StyleSheet, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import TaskInfo from './TaskInfo';
import TaskGroup from './TaskGroup';

// @ts-ignore
export default function AddTask({navigation, route}) {
  const params = route.params;
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (params.active) {
      setActive(1);
    }
  }, []);

  return (
    <View style={styles.page}>
      <ImageBackground
        source={require('../../assets/task/add-task-bg.png')}
        style={styles.bg}>
        <View style={{alignItems: 'center', gap: 5}}>
          <Image
            style={styles.img}
            source={require('../../assets/task/info.png')}
          />
          <Text>作业信息</Text>
        </View>
        <Image
          style={{width: 100, height: 15}}
          source={require('../../assets/task/arrow.png')}
        />
        <View style={{alignItems: 'center', gap: 5}}>
          <View
            style={{
              width: 30,
              height: 30,
              backgroundColor: '#3B80F0',
              borderRadius: 50,
            }}>
            <Text
              style={{
                lineHeight: 30,
                textAlign: 'center',
                color: '#FFF',
                fontSize: 14,
              }}>
              2
            </Text>
          </View>
          <Text>作业分组</Text>
        </View>
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
  img: {
    width: 30,
    height: 30,
  },
});
