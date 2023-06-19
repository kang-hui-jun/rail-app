import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {getTaskDetail} from '../../api/task';
import config from '../../utils/config';
import {Info} from './component/Info';
import {Group} from './component/Group';
import {Disease} from './component/Disease';

const image = {
  uri: config.apiUrl + '/imgs/inspection/detail.png',
};

// @ts-ignore
export const Detail = ({route, navigation}) => {
  const params = route.params;
  const [active, setActive] = useState(0);
  const [tabs] = useState(['基本信息', '作业小组', '维养病害']);
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
          <View style={styles.divider}></View>
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
        {active === 1 && <Group detail={detail} />}
        {active === 3 && <Disease detail={detail} />}
      </View>

      <TouchableOpacity style={styles.button} onPress={() => {}}>
        <Text style={styles.btn}>结束作业</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#FFF',
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
  divider: {
    height: 2,
    backgroundColor: '#F0F1F3',
    marginTop: 10,
    marginBottom: 10,
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
  button: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 80,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopColor: '#000',
  },
  btn: {
    borderRadius: 8,
    padding: 16,
    width: '90%',
    alignItems: 'center',
    backgroundColor: '#3B80F0',
    justifyContent: 'center',
    textAlign: 'center',
    color: '#FFF',
    fontSize: 18,
  },
});
