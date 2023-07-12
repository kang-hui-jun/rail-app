import React, {useState, useEffect} from 'react';
import {
  View,
  FlatList,
  RefreshControl,
  ListRenderItem,
  Text,
} from 'react-native';

interface RefreshableListProps<T> {
  fetchData: (page: {
    index: number;
    size: number;
  }) => Promise<{data: T[]; total: number}>;
  renderItem: ListRenderItem<T>;
  p?: any
}

const RefreshableList = <T extends {id: string | number}>({
  fetchData,
  renderItem,
  p
}: RefreshableListProps<T>) => {
  const [data, setData] = useState<T[]>([]); // 列表数据
  const [state, setState] = useState({
    total: 0, // 后端返回的总条数
    refreshing: false, //下拉刷新状态
    isLoading: false, // 加载更多状态
    footerStatus: 0, // 底部展示组件
  });

  const [params, setParams] = useState({
    index: 1,
    size: 10,
  });

  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    setState({
      ...state,
      isLoading: true,
    });

    // 发送网络请求获取数据
    try {
      let status = 0;
      const response = await fetchData({...params, ...p});

      console.log(response);
      

      setState({
        ...state,
        total: response.total,
      });
      if (data.length > response.total) {
        status = 1;
      }
      // 根据请求结果更新数据
      if (params.index === 1) {
        setData(response.data); // 刷新操作，替换原有数据
      } else {
        setData(prevData => [...prevData, ...response.data]); // 加载更多操作，将新数据添加到现有数据的末尾
      }
      setState({...state, footerStatus: status});
    } catch (error) {
      console.error(error);
    }

    setState({
      ...state,
      isLoading: false,
    });
  };

  // 下拉刷新回调函数
  const handleRefresh = () => {
    setState({...state, refreshing: true});
    setParams({...params, index: 1}); // 重置页数为1
    fetchInitialData().then(() => setState({...state, refreshing: false}));
  };

  // 上拉加载更多回调函数
  const handleLoadMore = () => {
    if (!state.isLoading && data.length < state.total) {
      setState({...state, footerStatus: 2});
      setParams(p => ({
        ...params,
        index: p.index + 1,
      }));
      fetchInitialData();
    }
  };

  const renderFooter = () => {
    if (state.footerStatus === 0) {
      return <View></View>;
    }

    if (state.footerStatus === 1) {
      return (
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Text>没有更多数据</Text>
        </View>
      );
    }

    if (state.footerStatus === 2) {
      return (
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Text>正在加载更多数据...</Text>
        </View>
      );
    }
  };

  return (
    <FlatList<T>
      data={data}
      renderItem={renderItem}
      keyExtractor={item => item.id.toString()}
      refreshControl={
        <RefreshControl
          refreshing={state.refreshing}
          onRefresh={handleRefresh}
        />
      }
      ListFooterComponent={renderFooter()}
      onEndReached={handleLoadMore}
      onEndReachedThreshold={0.5}
    />
  );
};

export default RefreshableList;
