import {View, Text, StyleSheet} from 'react-native';
import React from 'react';

const renderTag = (status: number) => {
  switch (status) {
    case 0:
      return <Text style={{...styles.tag}}>已制定</Text>;

    case 1:
      return <Text style={{...styles.tag}}>已发布</Text>;

    case 2:
      return <Text style={{...styles.tag}}>已执行</Text>;

    case 3:
      return <Text style={{...styles.tag}}>已取消</Text>;

    case 4:
      return <Text style={{...styles.tag}}>已分组</Text>;

    case 5:
      return <Text style={{...styles.tag}}>已领用</Text>;

    case 6:
      return <Text style={{...styles.tag}}>已下线</Text>;

    case 7:
      return <Text style={{...styles.tag}}>已归还</Text>;

    case 8:
      return <Text style={{...styles.tag}}>已结束</Text>;

    case 10:
      return <Text style={{...styles.tag}}>已开始</Text>;

    case 11:
      return <Text style={{...styles.tag}}>已清场</Text>;

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
    backgroundColor: 'rgba(71, 129, 225, 0.1)',
    color: '#3B80F0',
    borderRadius: 4,
  },
});
