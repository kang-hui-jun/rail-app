import {View, Text, StyleSheet, Image, TouchableHighlight} from 'react-native';
import React, {useEffect} from 'react';
import Divider from '../../components/Divider';
import {getNoticeList} from '../../api/notice';
import RefreshableList from '../../components/RefreshableList';

// @ts-ignore
export default function Notice({navigation}) {
  // 1：已读， 0：未读
  const tag = {
    1: (
      <View style={{...styles.tag, backgroundColor: '#34C68B'}}>
        <Text style={styles.tagC}>已读</Text>
      </View>
    ),
    0: (
      <View style={{...styles.tag, backgroundColor: '#3B80F0'}}>
        <Text style={styles.tagC}>未读</Text>
      </View>
    ),
  };

  const images = {
    0: require('../../assets/notice/idle.png'),
    1: require('../../assets/notice/success.png'),
    2: require('../../assets/notice/error.png'),
  };

  const handleDetail = (item: any) => {
    navigation.navigate('通知详情', {
        ...item
      });
  }

  const renderItem = ({item}: {item: any}) => {
    return (
      <TouchableHighlight
        style={styles.card}
        key={item.id}
        underlayColor="#FFF"
        onPress={() => handleDetail(item)}
      >
        <View>
          <View style={styles.card}>
            <View style={{flexDirection: 'row', gap: 20, alignItems: 'center'}}>
              <Image
                style={{width: 50, height: 50, resizeMode: 'cover'}}
                source={images[item.status as keyof typeof images]}
              />
              <View style={{flex: 1}}>
                <Text style={{color: '#21254D', fontWeight: 'bold'}}>
                  {item.title}
                </Text>
                <Text style={{color: '#9D9FB6'}}>{item.createTime}</Text>
              </View>

              {tag[item.status as keyof typeof tag] || tag[0]}
            </View>

            <View>
              <Text>{item.content}</Text>
            </View>
          </View>

          <Divider />
        </View>
      </TouchableHighlight>
    );
  };

  return (
    <View style={styles.notice}>
      <RefreshableList fetchData={getNoticeList} renderItem={renderItem} />
    </View>
  );
}

const styles = StyleSheet.create({
  notice: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },

  card: {
    padding: 10,
    backgroundColor: '#fff',
    flexDirection: 'column',
    gap: 15,
  },

  tag: {
    padding: 5,
    borderRadius: 8,
  },
  tagC: {
    color: '#fff',
    height: 20,
    width: 40,
    lineHeight: 20,
    textAlign: 'center',
  },
});
