import {View, Text, StyleSheet} from 'react-native';
import React from 'react';

export const renderTag = (status: number) => {
  switch (status) {
    case 0:
      return (
        <View style={{backgroundColor: '#f29769'}}>
          <Text style={{...styles.tag}}>已制定</Text>
        </View>
      );

    case 1:
      return (
        <View style={{backgroundColor: '#f29769'}}>
          <Text style={{...styles.tag}}>已发布</Text>
        </View>
      );

    case 2:
      return (
        <View style={{backgroundColor: '#f29769'}}>
          <Text style={{...styles.tag}}>已执行</Text>
        </View>
      );

    case 3:
      return (
        <View style={{backgroundColor: '#FF4D4F'}}>
          <Text style={{...styles.tag}}>已取消</Text>
        </View>
      );

    case 4:
      return (
        <View style={{backgroundColor: '#bg4781e1'}}>
          <Text style={{...styles.tag}}>已分组</Text>
        </View>
      );

    case 5:
      return (
        <View style={{backgroundColor: '#bg4781e1'}}>
          <Text style={{...styles.tag}}>已领用</Text>
        </View>
      );

    case 6:
      return (
        <View style={{backgroundColor: '#bg4781e1'}}>
          <Text style={{...styles.tag}}>已下线</Text>
        </View>
      );

    case 7:
      return (
        <View style={{backgroundColor: '#bg4781e1'}}>
          <Text style={{...styles.tag}}>已归还</Text>
        </View>
      );

    case 8:
      return (
        <View style={{backgroundColor: '#FF4D4F'}}>
          <Text style={{...styles.tag}}>已结束</Text>
        </View>
      );

    case 10:
      return (
        <View style={{backgroundColor: '#f29769'}}>
          <Text style={{...styles.tag}}>已开始</Text>
        </View>
      );

    default:
      break;
  }
};

export default function RenderTag({status}: {status: number}) {
  return <View>{renderTag(status)}</View>;
}

const styles = StyleSheet.create({
  tag: {
    padding: 5,
    color: '#FFF',
    borderRadius: 4,
  },
});
