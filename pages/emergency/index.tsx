import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  Image,
  TouchableOpacity,
} from 'react-native';
import {
  getEmergencyEventList,
  getEmergencyDrillList,
} from '../../api/emergency';
import {Emergency as T} from '../../types/emergency';
import RefreshableList from '../../components/RefreshableList';

export const Emergency = () => {
  const [active, setActive] = useState(0);
  const nav = ['应急抢修', '应急演练'];

  const handleTab = (index: number) => {
    setActive(index);
  };

  const handleDetail = () => {};

  const renderItem = ({item}: {item: T}) => {
    return (
      <TouchableHighlight
        style={styles.card}
        key={item.id}
        underlayColor="white"
        onPress={() => handleDetail()}>
        <View>
          <View style={styles.header}>
            <Image
              style={styles.img}
              source={require('../../assets/emergency/error.png')}
            />
            <View>
              <Text style={styles.title}>315防汛防台应急事件</Text>
              <View style={{flexDirection: 'row'}}>
                <Text style={styles.type}>事件类型</Text>
                <Text style={styles.content}>防汛防台一级预案</Text>
              </View>
            </View>
          </View>

          <View style={styles.footer}>
            <Image
              style={styles.location}
              source={require('../../assets/emergency/location.png')}
            />
            <Text>9号线</Text>
            <Text>线别</Text>
            <Text>行别</Text>
            <Text>9号线</Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  };

  return (
    <View style={styles.page}>
      <View style={styles.tabs}>
        {nav.map((item, index) => (
          <TouchableOpacity key={item} onPress={() => handleTab(index)}>
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
      <RefreshableList
        fetchData={active === 0 ? getEmergencyEventList : getEmergencyDrillList}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
    padding: 22,
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 10,
  },

  card: {
    backgroundColor: '#FFF',
    padding: 12,
    marginBottom: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  img: {
    width: 50,
    height: 50,
  },
  title: {
    color: '#21254D',
  },
  type: {
    color: '#9D9FB6',
  },
  content: {
    color: '#9D9FB6',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 10,
  },
  location: {
    width: 20,
    height: 20,
  },
});
