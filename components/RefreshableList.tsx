import React, { useState, useEffect } from 'react';
import { View, FlatList, RefreshControl, ListRenderItem } from 'react-native';

interface RefreshableListProps<T> {
  fetchData: (page: number) => Promise<T[]>;
  renderItem: ListRenderItem<T>;
}

const RefreshableList = <T extends { id: string | number }>({
  fetchData,
  renderItem,
}: RefreshableListProps<T>) => {
  const [data, setData] = useState<T[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0)

  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    setIsLoading(true);

    try {
      const initialData = await fetchData(page);
      setData(initialData);
    } catch (error) {
      console.error(error);
    }

    setIsLoading(false);
  };

  const handleRefresh = () => {
    setRefreshing(true);
    setPage(1);
    fetchData(1)
      .then((refreshedData) => {
        setData(refreshedData);
        setRefreshing(false);
      })
      .catch((error) => {
        console.error(error);
        setRefreshing(false);
      });
  };

  const handleLoadMore = () => {
    if (!isLoading) {
      setPage((prevPage) => prevPage + 1);
      fetchData(page + 1)
        .then((moreData) => {
          setData((prevData) => [...prevData, ...moreData]);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  return (
    <FlatList<T>
      data={data}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
      }
      onEndReached={handleLoadMore}
      onEndReachedThreshold={0.5}
    />
  );
};

export default RefreshableList;
