import {View, Text, StyleSheet, ScrollView} from 'react-native';
import React from 'react';
import Divider from '../../components/Divider';

export default function Alarm() {
  return (
    <View style={styles.task}>
      <Text style={{fontWeight: 'bold'}}>当前告警</Text>

      <View style={{flex: 1}}>
        {[1, 2, 3].map(item => (
          <View key={item}>
            <View style={{flexDirection: 'row', gap: 10}}>
              <View>
                <Text style={{color: '#3B80F0'}}>01-14</Text>
                <Text style={{color: '#9D9FB6'}}>09:45</Text>
              </View>
              <View style={{flex: 1}}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    color: '#F93C3C',
                    padding: 10,
                    borderRadius: 50,
                  }}>
                  应急救援
                </Text>
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
    marginTop: 10
  },
});
