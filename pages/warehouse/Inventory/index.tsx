import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import {Inventory as I} from '../../../types/warehouse';
import Divider from '../../../components/Divider';
import RefreshableList from '../../../components/RefreshableList';
import {getInventory} from '../../../api/warehouse';
import Photo from '../../../components/Photo';

export default function Inventory() {
  const renderItem = ({item}: {item: I}) => {
    return (
      <TouchableHighlight
        style={styles.card}
        key={item.id}
        underlayColor="white"
        onPress={() => {}}>
        <View>
          <View style={styles.header}>
            <Text>{item.createTime}</Text>
          </View>

          <Divider />

          <View style={styles.content}>
            <Photo photoList={['924']} />
            <View>
              <Text>{item.warehouseName}</Text>
              {/* <Text>{item.warehouseAddress}</Text> */}
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
      <RefreshableList fetchData={getInventory} renderItem={renderItem} />
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    padding: 22
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
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
    gap: 10
  },
  img: {
    height: 50,
    width: 50,
  },
});
