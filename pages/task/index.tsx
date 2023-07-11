import {View, Text, StyleSheet, TouchableHighlight} from 'react-native';
import {Task as DataType} from '../../types/task';
import {getTaskList} from '../../api/task';
import RenderTag from '../../components/RenderTag';
import RefreshableList from '../../components/RefreshableList';
import Divider from '../../components/Divider';

// @ts-ignore
export const Task = ({navigation}) => {
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
        underlayColor="white"
        onPress={() => handleDetail({id: item.id, type: item.type})}>
        <View>
          <View style={styles.header}>
            <Text style={styles.title}>{item.name}</Text>
            <RenderTag status={item.status} />
          </View>
          <Divider />

          <View style={styles.content}>
            <View>
              <Text>请站点</Text>
              <Text>{item.pleaseName}</Text>
            </View>
            <View>
              <Text style={{...styles.align, color: '#3B80F0'}}>
                {item.num}
              </Text>
              <Divider width={200} />
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
      <RefreshableList fetchData={getTaskList} renderItem={renderItem} />
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
