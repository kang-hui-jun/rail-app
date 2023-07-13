import {View, Text, StyleSheet, TouchableHighlight, Image} from 'react-native';
import React from 'react';
import {Return as R} from '../../../types/warehouse';
import Divider from '../../../components/Divider';
import RefreshableList from '../../../components/RefreshableList';
import {getReturn} from '../../../api/warehouse';

export const images = {
  1: require('../../../assets/warehouse/tuihuan/1.png'),
  2: require('../../../assets/warehouse/tuihuan/2.png'),
  3: require('../../../assets/warehouse/tuihuan/3.png'),
  4: require('../../../assets/warehouse/tuihuan/4.png'),
  5: require('../../../assets/warehouse/tuihuan/5.png'),
};

export const renderTag = (status: number) => {
  // 1.待审核 2.审核中 3.已完成 4.已驳回 5.已取消
  switch (status) {
    case 1:
      return (
        <Text style={{...styles.tag, backgroundColor: '#4781E1'}}>待审核</Text>
      );
    case 2:
      return (
        <Text style={{...styles.tag, backgroundColor: '#FF8C2B'}}>审核中</Text>
      );
    case 3:
      return (
        <Text style={{...styles.tag, backgroundColor: '#0CBC8B'}}>已完成</Text>
      );
    case 4:
      return (
        <Text style={{...styles.tag, backgroundColor: '#FF4D4F'}}>已驳回</Text>
      );
    case 5:
      return (
        <Text style={{...styles.tag, backgroundColor: '#C6D1E1'}}>已取消</Text>
      );

    default:
      return <Text style={{...styles.tag}}>未知</Text>;
  }
};

export default function Reruenting() {
  const handleDetail = () => {};

  const renderItem = ({item}: {item: R}) => {
    return (
      <TouchableHighlight
        style={styles.card}
        key={item.id}
        underlayColor="white"
        onPress={() => {}}>
        <View>
          <View style={styles.header}>
            {renderTag(item.status)}
            <Text>{item.createTime}</Text>
          </View>

          <Divider />

          <View style={styles.content}>
            <View>
              <Text>{item.returnWarehouseName}</Text>
              <Text>退换仓库</Text>
            </View>
            <Image
              style={styles.img}
              source={images[item.status as keyof typeof images]}
            />
            <View>
              <Text>{item.receiveWarehouseName || '暂无'}</Text>
              <Text>接收仓库</Text>
            </View>
          </View>

          <View>
            <Text>发起人：{item.userName}</Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  };

  return (
    <View style={styles.page}>
      <RefreshableList
        fetchData={getReturn}
        renderItem={renderItem}
        p={{type: 1}}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    padding: 22,
  },
  card: {
    backgroundColor: '#FFFFFF',
    padding: 12,
    marginBottom: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  tag: {
    padding: 5,
    color: '#FFF',
    borderRadius: 4,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  img: {
    height: 50,
    width: 50,
  },
  align: {
    textAlign: 'center',
  },
});
