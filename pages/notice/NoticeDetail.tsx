import {View, Text, StyleSheet, Image} from 'react-native';
import React from 'react';

// @ts-ignore
export default function NoticeDetail({route, navigation}) {
  const params = route.params;

  console.log(params.content.split('。'));

  return (
    <View style={styles.notice_detail}>
      <View style={styles.header}>
        <Image
          style={styles.img}
          source={require('../../assets/notice/doc.png')}
        />
        <View style={{flex: 1}}>
          <Text style={{color: '#21254D', fontWeight: 'bold'}}>
            {params.title}
          </Text>
          <Text style={{color: '#9D9FB6'}}>{params.senderName}</Text>
          {<Text style={{color: '#9D9FB6'}}>{params.createTime}</Text>}
        </View>
      </View>
      <View>
        {params.content.split('。').map((item: string, index: number) => (
          <Text key={index}>
            {item}
          </Text>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  notice_detail: {
    flex: 1,
    backgroundColor: '#FFF',
    gap: 10,
    padding: 10,
  },

  header: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },

  img: {
    width: 50,
    height: 50,
  },
});
