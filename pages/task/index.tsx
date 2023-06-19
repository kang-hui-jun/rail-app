import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableHighlight,
  RefreshControl,
} from 'react-native';
import {Task as DataType} from '../../types/task';
import {getTaskList} from '../../api/task';
import RenderTag from '../../components/RenderTag';

// @ts-ignore
export const Task = ({navigation}) => {
  const [data, setData] = useState<DataType[]>([]); // 列表数据
  const [refreshing, setRefreshing] = useState(false); // 刷新状态
  const [isLoading, setIsLoading] = useState(false); // 加载更多状态
  const [params, setParams] = useState({
    index: 1,
    size: 10,
  });

  const fetchData = async () => {
    setIsLoading(true);

    // 发送网络请求获取数据
    try {
      const response = await getTaskList(params);

      // 根据请求结果更新数据
      if (params.index === 1) {
        setData(response.data); // 刷新操作，替换原有数据
      } else {
        setData(prevData => [...prevData, ...response.data]); // 加载更多操作，将新数据添加到现有数据的末尾
      }
    } catch (error) {
      console.error(error);
    }

    setIsLoading(false);
  };

  // 初始化加载数据
  useEffect(() => {
    fetchData();
  }, []);

  // 下拉刷新回调函数
  const handleRefresh = () => {
    setRefreshing(true);
    setParams({...params, index: 1}); // 重置页数为1
    fetchData().then(() => setRefreshing(false));
  };

  // 上拉加载更多回调函数
  const handleLoadMore = () => {
    if (!isLoading) {
      setParams(p => ({
        ...params,
        index: p.index + 1,
      }));
      fetchData();
    }
  };

  const handleDetail = (param: {id: number; type: number}) => {
    navigation.navigate('作业详情', {
      ...param,
    });
  };

  const renderItem = ({item}: {item: DataType}) => {
    return (
      <TouchableHighlight
        style={styles.card}
        key={item.id}
        underlayColor='white'
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
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
      />
    </View>
  );
};

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
