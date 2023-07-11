import {View, Text, StyleSheet, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import Divider from '../../../components/Divider';
import {Alarm as A} from '../../../types/alarm';
import {getOneWorkWarn} from '../../../api/inspection';
import {getDictData} from '../../../api/dict';
import {DictType} from '../../../types/dict';

export function Alarm({detail}: {detail: any}) {
  const [list, setList] = useState<A[]>([]);

  const fetchData = async () => {
    const alarmType = await getDictData('alarm_type');
    const alarmData = await getOneWorkWarn(detail.id);

    const result = alarmData.data.map((item: A) => ({
      ...item,
      type: alarmType.data.find((v: DictType) => item.type == v.dictValue)
        ?.dictLabel,
    }));

    setList(result);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View style={styles.task}>
      <ScrollView>
        <View style={{flex: 1}}>
          {list.map(item => (
            <View key={item.id}>
              <View
                style={{flexDirection: 'row', gap: 10, alignItems: 'center'}}>
                <View>
                  <Text style={{color: '#3B80F0'}}>
                    {item.warnTime.slice(0, 10)}
                  </Text>
                  <Text style={{color: '#9D9FB6'}}>
                    {item.warnTime.slice(10)}
                  </Text>
                </View>
                <View style={{flex: 1}}>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      padding: 5,
                    }}>
                    {item.type}
                  </Text>
                  <Text style={{color: '#9D9FB6'}}>{item.content}</Text>
                </View>
              </View>
              <Divider />
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  task: {
    backgroundColor: '#fff',
    padding: 10,
    gap: 10,
    flexDirection: 'column',
    flex: 1,
  },
});
