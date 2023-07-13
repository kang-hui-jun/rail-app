import {View, Text, StyleSheet, TouchableHighlight, Image} from 'react-native';
import React from 'react';
import {Scrap as S} from '../../../types/warehouse';
import Divider from '../../../components/Divider';
import RefreshableList from '../../../components/RefreshableList';
import {getReturn, getScrap} from '../../../api/warehouse';
import {renderTag} from './Scraping';
import Photo from '../../../components/Photo';

export default function History() {
  const handleDetail = () => {};

  const renderItem = ({item}: {item: S}) => {
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
      <RefreshableList
        fetchData={getScrap}
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
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
    gap: 10,
  },
  img: {
    height: 50,
    width: 50,
  },
  align: {
    textAlign: 'center',
  },
});
