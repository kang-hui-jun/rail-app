import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {useAuth} from '../../store';

// @ts-ignore
export default function Set({navigation}) {
  const context = useAuth();

  return (
    <View style={styles.set}>
      <View style={styles.card}>
        <Text>轨道维养数字化管控平台</Text>
        <Text>版本：v1.0</Text>
      </View>

      <View style={styles.card}>
        <Text>当前登录账号：{context?.user?.userName || ''}</Text>
      </View>

      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate('体温枪设置')}>
        <Text>体温枪设置</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate('标签监测')}>
        <Text>标签监测</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  set: {
    flex: 1,
    gap: 10,
    padding: 10,
  },

  card: {
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    shadowColor: 'black',
  },
});
