import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableHighlight,
} from 'react-native';
import {Task as DataType} from '../../types/task';
import {getTaskList} from '../../api/task';
import RenderTag from '../../components/RenderTag';

// @ts-ignore
export const Task = ({navigation}) => {
  const [loadingMore, setLoadingMore] = useState(false);
  const [total, setTotal] = useState(0);
  const [param, setParam] = useState({
    index: 1,
    size: 10,
  });

  const [data, setData] = useState<DataType[]>([]);

  const getData = () => {
    getTaskList(param).then(res => {
      if (param.index === 1) {
        setLoadingMore(true);
        setTotal(res.total);
        setData(res.data);
        setLoadingMore(false);
      } else {
        setData([...data, ...res.data]);
      }
    });
  };

  const handleDetail = (param: {id: number; type: number}) => {
    navigation.navigate('作业详情', {
      ...param,
    });
  };

  useEffect(() => {
    getData();
  }, []);

  const renderItem = ({item}: {item: DataType}) => {
    return (
      <TouchableHighlight
        style={styles.card}
        key={item.id}
        onPress={() => handleDetail({id: item.id, type: item.type})}>
        <View>
          <View style={styles.header}>
            <Text style={styles.title}>{item.name}</Text>
            <RenderTag status={item.status} />
          </View>
          <View style={styles.divider}></View>

          <View style={styles.content}>
            <View>
              <Text>请站点</Text>
              <Text>{item.pleaseName}</Text>
            </View>
            <View>
              <Text style={{...styles.align, color: '#3B80F0'}}>
                {item.num}
              </Text>
              <View style={{...styles.divider, width: 120}}></View>
              <Text style={{...styles.align, color: '#9D9FB6'}}>
                {item.leaderPersonName}
              </Text>
            </View>
            <View>
              <Text>销站点</Text>
              <Text>{item.pinName}</Text>
            </View>
          </View>

          <View style={styles.footer}>
            <Text>作业内容：{item.workContent}</Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  };

  return (
    <View style={styles.page}>
      <FlatList data={data} renderItem={renderItem} />
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
    padding: 22,
  },
  card: {
    backgroundColor: '#FFF',
    padding: 12,
    marginBottom: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
  },
  status: {
    fontSize: 18,
    color: '#FAAD14',
  },
  divider: {
    height: 2,
    backgroundColor: '#F0F1F3',
    marginTop: 10,
    marginBottom: 10,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  align: {
    textAlign: 'center',
  },
  footer: {},
});
