import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import config from '../../utils/config';
import {Info} from './component/Info';
import {Group} from './component/Group';
import Divider from '../../components/Divider';
import {Disease} from './Disease';
import {finishTask, getTaskDetail, getWorkForFinish} from '../../api/task';
import { Alarm } from './component/Alarm';

const image = {
  uri: config.apiUrl + '/imgs/inspection/detail.png',
};

const tabs = ['基本信息', '作业小组', '告警记录', '维养病害'];

// @ts-ignore
export const Detail = ({route, navigation}) => {
  const params = route.params;
  const [active, setActive] = useState(0);
  const [detail, setDetail] = useState<any>({});

  const getDetail = () => {
    getTaskDetail(params).then(res => {
      setDetail(res.data);
    });
  };

  const handleTab = (index: number) => {
    setActive(index);
  };

  useEffect(() => {
    getDetail();
  }, []);

  const confirm = () => {
    finishTask({
      workId: detail.id,
    }).then(res => {
      navigation.navigate('作业管理');
    });
  };

  const handleOver = () => {
    if (detail.status == 11) {
      getWorkForFinish(detail.id).then(res => {
        if (res.msg === '没有遗漏的工器具') {
          confirm();
        } else {
          Alert.alert('', res.msg + '，是否结束作业？', [
            {
              text: '取消',
              style: 'cancel',
            },
            {
              text: '确定',
              onPress: () => {
                confirm();
              },
            },
          ]);
        }
      });
    }
  };

  const handleInventory = () => {
    navigation.navigate('工场清单', {
      id: detail.id
    });
  };

  return (
    <View style={styles.page}>
      <ImageBackground source={image} style={styles.bg}>
        <View style={styles.card}>
          <Text style={styles.title}>{detail.name}</Text>
          <View style={styles.header}>
            <Text numberOfLines={1} style={styles.type}>
              {detail.typeList
                ?.map((item: {typeName: string}) => item.typeName)
                .join(',')}
            </Text>
            <Text style={styles.num}>{detail.num}</Text>
          </View>
          <Divider />
          <View style={styles.date}>
            <View style={styles.start}>
              <Text>{detail.createTime}</Text>
            </View>
            <View style={styles.end}>
              <Text>{detail.updateTime || '空'}</Text>
            </View>
          </View>
        </View>
      </ImageBackground>

      <View style={styles.tab}>
        {tabs.map((item, index) => (
          <TouchableOpacity
            style={{padding: 10}}
            key={item}
            onPress={() => handleTab(index)}>
            <Text style={{color: active === index ? '#21254D' : '#9D9FB6'}}>
              {item}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={{flex: 1, backgroundColor: '#eee', paddingTop: 10}}>
        {active === 0 && <Info detail={detail} />}
        {active === 1 && <Group detail={detail} navigation={navigation} />}
        {active === 2 && <Alarm detail={detail} />}
        {active === 3 && <Disease navigation={navigation} detail={detail} />}
      </View>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.button} onPress={handleOver}>
          <Text
            style={{
              ...styles.btn,
              backgroundColor: detail.status !== 11 ? '#c6d1e1' : '#3B80F0',
            }}>
            结束作业
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleInventory}>
          <Text style={styles.btn}>工厂清单</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingBottom: 80,
  },
  bg: {
    width: '100%',
    resizeMode: 'cover',
    height: 200,
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 8,
    width: '90%',
    minHeight: 100,
    padding: 16,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 130,
    elevation: 1.5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 1,
    shadowRadius: 1.5,
  },
  title: {
    fontSize: 20,
    color: '#9D9FB6',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 20,
    marginTop: 5,
  },
  type: {
    fontSize: 18,
    flex: 1,
  },
  num: {
    fontSize: 18,
    color: '#3B80F0',
  },
  date: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  start: {},
  end: {},
  tab: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 60,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingLeft: 10,
    paddingRight: 10,
    height: 80,
    backgroundColor: '#FFF',
  },
  button: {
    height: 80,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  btn: {
    borderRadius: 8,
    padding: 16,
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#3B80F0',
    justifyContent: 'center',
    textAlign: 'center',
    color: '#FFF',
    fontSize: 18,
  },
});
