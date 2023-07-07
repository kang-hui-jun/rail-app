import {View, Text, StyleSheet, ScrollView} from 'react-native';
import React from 'react';
import Divider from '../../../components/Divider';

export function Alarm({detail}: {detail: any}) {
  return (
    <View style={styles.task}>
      <ScrollView>
        <View style={{flex: 1}}>
          {[1, 2, 3, 4, 5, 6].map(item => (
            <View key={item}>
              <View
                style={{flexDirection: 'row', gap: 10, alignItems: 'center'}}>
                <View>
                  <Text style={{color: '#3B80F0'}}>01-14</Text>
                  <Text style={{color: '#9D9FB6'}}>09:45</Text>
                </View>
                <View style={{flex: 1}}>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      color: '#00A877',
                      padding: 5,
                      borderRadius: 50,
                      backgroundColor: 'rgba(0, 168, 119, 0.10)',
                      width: 90,
                      textAlign: 'center',
                      alignItems: 'center',
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
    marginTop: 10,
    flex: 1,
  },
});
