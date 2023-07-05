import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
} from 'react-native';
import {Inspection as DataType} from '../../types/inspection';
import {getTaskList} from '../../api/inspection';
import RenderTag from '../../components/RenderTag';
import RefreshableList from '../../components/RefreshableList';
import Divider from '../../components/Divider';

// @ts-ignore
export const Inspection = ({navigation}) => {

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
        underlayColor="white"
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

          <Divider />

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
