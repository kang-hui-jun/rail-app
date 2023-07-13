import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import History from './History';
import Distributing from '../Distribute/Distributing';

export default function Scrap() {
  const [active, setActive] = useState(0);
  const nav = ['报废申请', '报废记录'];

  const handleTab = (index: number) => {
    setActive(index);
  };
  return (
    <View style={styles.page}>
      <View style={styles.tabs}>
        {nav.map((item, index) => (
          <TouchableOpacity
            style={styles.tab}
            key={item}
            onPress={() => handleTab(index)}>
            <Text
              style={{
                color: active === index ? '#3B80F0' : '#21254D',
                fontSize: 20,
              }}>
              {item}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {active === 0 ? <Distributing /> : <History />}
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: '#FFF',
    height: 60,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
  },
  tag: {
    padding: 5,
    color: '#FFF',
    borderRadius: 4,
  },
});
