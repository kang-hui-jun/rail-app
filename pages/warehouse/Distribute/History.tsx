import {View, Text, StyleSheet, TouchableHighlight, Image} from 'react-native';
import React from 'react';
import {Distribute as D} from '../../../types/warehouse';
import Divider from '../../../components/Divider';
import RefreshableList from '../../../components/RefreshableList';
import {getDistribute} from '../../../api/warehouse';

const images = {
  1: require('../../../assets/warehouse/fenfa/5.png'),
  2: require('../../../assets/warehouse/fenfa/5.png'),
  3: require('../../../assets/warehouse/fenfa/3.png'),
  4: require('../../../assets/warehouse/fenfa/5.png'),
  5: require('../../../assets/warehouse/fenfa/5.png'),
};

const renderTag = (status: number) => {
  // (1.待出库 2.待确认 3.已完成 4.已驳回 5.已取消)
  switch (status) {
    case 1:
      return (
        <Text style={{...styles.tag, backgroundColor: '#4781E1'}}>待出库</Text>
      );
    case 2:
      return (
        <Text style={{...styles.tag, backgroundColor: '#FF8C2B'}}>待确认</Text>
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

export default function History() {
  const handleDetail = () => {};

  const renderItem = ({item}: {item: D}) => {
    return (
      <TouchableHighlight
        style={styles.card}
        key={item.id}
        underlayColor="white"
        onPress={() => {}}>
        <View>
          <View style={styles.header}>
            {renderTag(item.status)}
            <Text>2022-12-12 14:20:50</Text>
          </View>

          <Divider />

          <View style={styles.content}>
            <View>
              <Text>{item.distributeWarehouseName}</Text>
              <Text>分发仓库</Text>
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
            <Text>发起人：{item.distributeUserName}</Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  };

  return (
    <View style={styles.page}>
      <RefreshableList
        fetchData={getDistribute}
        renderItem={renderItem}
        p={{type: 2}}
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
