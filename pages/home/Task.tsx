import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect} from 'react';
import Divider from '../../components/Divider';
import {getMyTaskList} from '../../api/home';

// @ts-ignore
export default function Task({navigation}) {
  useEffect(() => {
    getMyTaskList({index: 1, size: 10});
  }, []);

  return (
    <View style={styles.task}>
      <View style={styles.header}>
        <Text style={{fontWeight: 'bold'}}>我的工作</Text>
        <TouchableOpacity onPress={() => navigation.navigate('我的工作')}>
          <Text>更多</Text>
        </TouchableOpacity>
      </View>

      <View style={{flex: 1}}>
        {[1, 2, 3].map(item => (
          <View key={item}>
            <View style={{flexDirection: 'row', gap: 10}}>
              <View>
                <Text style={{color: '#3B80F0'}}>01-14</Text>
                <Text style={{color: '#9D9FB6'}}>09:45</Text>
              </View>
              <View style={{flex: 1}}>
                <Text style={{color: '#21254D'}}>巡检计划</Text>
                <Text style={{color: '#9D9FB6'}}>
                  有一份巡检计划待执行，巡检时间2022-01-13至2022-01-14
                </Text>
              </View>
            </View>
            <Divider />
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  task: {
    backgroundColor: '#fff',
    padding: 10,
    gap: 10,
    flexDirection: 'column',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
