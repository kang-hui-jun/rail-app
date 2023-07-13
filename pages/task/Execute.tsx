import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Modal,
  ScrollView,
  Image,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import config from '../../utils/config';
import {finishTask, getInspectionTaskDetail} from '../../api/inspection';
import Signature from '../../components/Signature';
import {addTask, getPlanDetail} from '../../api/task';
import {Info} from './component/Info';
import {Group as G} from '../../types/task';
import Divider from '../../components/Divider';
import {Disease as D} from '../../types/disease';
import Photo from '../../components/Photo';
import {renderTag} from './Disease';

const image = {
  uri: config.apiUrl + '/imgs/inspection/detail.png',
};

const tabs = ['基本信息', '作业小组', '维养病害'];

const Group = ({groupList}: {groupList: G[]}) => {
  return (
    <ScrollView>
      <View style={styles.groupList}>
        {groupList.map((item, index) => (
          <View key={index} style={styles.group}>
            <View style={styles.header}>
              <Text>{item.groupName}</Text>
            </View>
            <Divider />
            <View style={styles.person}>
              {item.groupPersonList?.map((v, index) => (
                <View style={styles.addPerson} key={index}>
                  <Image
                    style={styles.img}
                    source={require('../../assets/task/person.png')}
                  />
                  <Text>{v.personName}</Text>
                  {index === 0 && (
                    <Image
                      style={{width: 40, height: 20}}
                      source={require('../../assets/task/leader.png')}
                    />
                  )}
                </View>
              ))}
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const Disease = ({diseaseList}: {diseaseList: D[]}) => {
  return (
    <ScrollView>
      <View
        style={{gap: 10, paddingLeft: 10, paddingRight: 10, paddingBottom: 10}}>
        {diseaseList?.map(item => (
          <View
            style={{
              backgroundColor: '#FFF',
              borderRadius: 8,
              minWidth: 100,
              minHeight: 100,
              padding: 10,
              elevation: 1.5,
              shadowColor: '#000',
              shadowOffset: {width: 0, height: 0},
              shadowOpacity: 1,
              shadowRadius: 1.5,
              gap: 10,
            }}
            key={item.id}>
            <View style={{flexDirection: 'row', gap: 10, alignItems: 'center'}}>
              <Photo photoList={['924']} />
              <View style={{flex: 1}}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text>{item.diseaseMouldName}</Text>
                  {renderTag(item.status)}
                </View>
                <Text>{item.remark}</Text>
              </View>
            </View>

            <View
              style={{
                flexDirection: 'row',
                gap: 10,
                alignItems: 'center',
                flexWrap: 'wrap',
              }}>
              <Image
                style={{width: 25, height: 25}}
                source={require('../../assets/emergency/location.png')}
              />
              <Text>{item.lineName} |</Text>
              <Text>{item.lineTypeName} |</Text>
              <Text>{item.travelTypeName} |</Text>
              <Text>{item.workAreaName}</Text>
            </View>

            <View style={{flexDirection: 'row', gap: 10, alignItems: 'center'}}>
              <Image
                style={{width: 25, height: 25}}
                source={require('../../assets/inspection/mileage.png')}
              />
              <Text>{item.mileage}</Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

// @ts-ignore
export const Execute = ({route, navigation}) => {
  const params = route.params;
  const [active, setActive] = useState(0);
  const [detail, setDetail] = useState<any>({});

  const getDetail = () => {
    getPlanDetail(params.id).then(res => {
      console.log(res.data);

      setDetail(res.data);
    });
  };

  const handleTab = (index: number) => {
    setActive(index);
  };

  useEffect(() => {
    getDetail();
  }, []);

  const handleExecute = () => {
    addTask({
      ...detail,
      status: 10,
      planId: detail.id,
    }).then(res => {
      navigation.navigate('创建作业', {...res.data, active: true});
    });
  };

  return (
    <View style={styles.page}>
      <ImageBackground source={image} style={styles.bg}>
        <Text style={styles.title}>{detail.name}</Text>
        <View style={styles.card}>
          <View style={styles.header}>
            <Text style={styles.num}>{detail.num}</Text>
          </View>
          <View style={styles.divider}></View>
          <View style={styles.date}>
            <View style={styles.start}>
              <Text>{detail.createTime?.slice(0, 10)}</Text>
              <Text>{detail.createTime?.slice(10)}</Text>
            </View>
            <View style={styles.end}>
              <Text>{detail.updateTime?.slice(0, 10) || '空'}</Text>
              <Text>{detail.updateTime?.slice(10) || '空'}</Text>
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
        {active === 1 && <Group groupList={detail.groupList} />}
        {active === 2 && <Disease diseaseList={detail.diseaseList} />}
        {/* {active === 1 && <Cycle detail={detail} navigation={navigation} />}
          {active === 2 && <Alarm detail={detail} />}
          {active === 3 && <Disease detail={detail} navigation={navigation} />} */}
      </View>

      <TouchableOpacity style={styles.button} onPress={handleExecute}>
        <Text style={styles.btn}>执行计划</Text>
      </TouchableOpacity>
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
    color: '#FFF',
    left: 20,
    top: 90,
    position: 'absolute',
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
  start: {
    flexDirection: 'column',
  },
  end: {
    flexDirection: 'column',
  },
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
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionsContainer: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingBottom: 20,
    width: '80%',
    height: '80%',
  },
  signature: {
    flex: 1,
    borderColor: '#000033',
    borderWidth: 1,
  },
  buttonStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    backgroundColor: '#eeeeee',
    margin: 10,
  },
  groupList: {
    gap: 10,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
  },
  group: {
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
  },
  person: {
    flexDirection: 'row',
    // alignItems: 'center',
    flexWrap: 'wrap',
    gap: 20,
    padding: 10,
  },
  addPerson: {
    gap: 5,
    alignItems: 'center',
  },
  img: {
    width: 50,
    height: 50,
  },
});
