import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  FlatList,
  RefreshControl,
} from 'react-native';
import {Inspection as DataType} from '../../types/inspection';
import {getTaskList} from '../../api/inspection';
import RenderTag from '../../components/RenderTag';

// @ts-ignore
export const Inspection = ({navigation}) => {
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
    navigation.navigate('巡检详情', {
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
          <View style={styles.content}>
            <Text style={styles.text}>巡检路线：{item.lineName}</Text>
            <Text style={styles.text}>巡检代码：{item.num}</Text>
            <Text style={styles.text}>巡检时间：{item.inspectionTime}</Text>
            <Text style={styles.text}>巡检区段：{item.inspectionAddr}</Text>
          </View>

          <View style={styles.divider}></View>

          <View style={styles.footer}>
            {item.personListVo?.map(item => (
              <Text style={styles.person} key={item.personName}>
                {item.personName.charAt(0)}
              </Text>
            ))}
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
  text: {
    fontSize: 16,
    color: '#9D9FB6',
  },
  content: {
    marginTop: 10,
    marginBottom: 10,
  },
  divider: {
    height: 2,
    backgroundColor: '#F0F1F3',
    marginTop: 10,
    marginBottom: 10,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  person: {
    width: 40,
    height: 40,
    textAlign: 'center',
    backgroundColor: '#4781E1',
    borderRadius: 50,
    lineHeight: 40,
    color: '#FFF',
  },
});
