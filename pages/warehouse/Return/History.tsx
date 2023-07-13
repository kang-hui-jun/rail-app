import {View, Text, StyleSheet, TouchableHighlight, Image} from 'react-native';
import React from 'react';
import {Return as R} from '../../../types/warehouse';
import Divider from '../../../components/Divider';
import RefreshableList from '../../../components/RefreshableList';
import {getReturn} from '../../../api/warehouse';
import {images, renderTag} from './Returning';

export default function History() {
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
