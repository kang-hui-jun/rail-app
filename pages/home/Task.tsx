import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Divider from '../../components/Divider';
import {getMyTaskList} from '../../api/home';
import {Task as T} from '../../types/process';

const type: {[key: string]: string} = {
  distributeRecord_1: '分发',
  disease_report: '病害上传',
  disease_handle: '病害上传',
  returnRecord: '仓库退换',
  scrapRecord: '仓库报废',
};

// @ts-ignore
export default function Task({navigation}) {
  const [taskList, setTaskList] = useState<T[]>([]);
  useEffect(() => {
    getMyTaskList({index: 1, size: 2});
  }, []);

  const handleDetail = (item: T) => {
    navigation.navigate(type[item.processDefinitionKey]);
  };

  return (
    <View style={styles.task}>
      <View style={styles.header}>
        <Text style={{fontWeight: 'bold'}}>我的工作</Text>
        <TouchableOpacity onPress={() => navigation.navigate('我的工作')}>
          <Text>更多</Text>
        </TouchableOpacity>
      </View>

      <View style={{flex: 1}}>
        {taskList.map(item => (
          <View key={item.processInstanceId}>
            <View style={styles.item}>
              <View>
                <Text style={{color: '#3B80F0'}}>{item.taskCreateTime}</Text>
                <Text style={{color: '#9D9FB6'}}>{item.taskCreateTime}</Text>
              </View>
              <View style={{flex: 1}}>
                <Text style={{color: '#21254D'}}>
                  {item.processInstanceName}
                </Text>
                <Text style={{color: '#9D9FB6'}}>{item.name}</Text>
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
  item: {flexDirection: 'row', gap: 10},
});
