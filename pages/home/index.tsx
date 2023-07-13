import React from 'react';
import {
  StyleSheet,
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
  Text,
  ScrollView,
} from 'react-native';
import Task from './Task';
import Alarm from './Alarm';

const images = {
  巡检管理: require('../../assets/home/task.png'),
  作业管理: require('../../assets/home/inspection.png'),
  库存管理: require('../../assets/home/inspection.png'),
  应急抢修: require('../../assets/home/inspection.png'),
};

const navList = ['巡检管理', '作业管理', '库存管理', '应急抢修'];

// @ts-ignore
export const Home = ({navigation}) => {
  return (
    <View style={styles.home}>
      {/* 头部 */}
      <View style={styles.top}>
        <ImageBackground
          source={require('../../assets/home/home_bg.png')}
          style={styles.bg}>
          <View style={styles.title}>
            <Text style={styles.systemName}>轨行区维养安全管控</Text>
            <View style={styles.headerRight}>
              <TouchableOpacity onPress={() => navigation.navigate('事务通知')}>
                <Image
                  style={styles.icon}
                  source={require('../../assets/home/info.png')}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate('设置')}>
                <Image
                  style={styles.icon}
                  source={require('../../assets/home/set.png')}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.nav}>
            {navList.map(item => (
              <TouchableOpacity
                key={item}
                onPress={() => navigation.navigate(item)}>
                <Image source={images[item as keyof typeof images]} />
                <Text style={{color: '#FFF'}}>{item}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </ImageBackground>
        <View style={styles.fast}>
          <TouchableOpacity style={{flex: 4}}>
            <Image
              style={styles.img}
              source={require('../../assets/home/warehouse.png')}
            />
          </TouchableOpacity>

          <View style={{flex: 5, flexDirection: 'column'}}>
            <TouchableOpacity style={{flex: 1}}>
              <Image
                style={styles.img}
                source={require('../../assets/home/disease.png')}
              />
            </TouchableOpacity>
            <TouchableOpacity style={{flex: 1}}>
              <Image
                style={styles.img}
                source={require('../../assets/home/emergency.png')}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={{flex: 1}}>
        <ScrollView>
          <Task navigation={navigation} />

          <Alarm />
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  home: {
    flex: 1,
    flexDirection: 'column',
    gap: 10,
  },
  top: {
    backgroundColor: '#fff',
    flex: 1,
    flexDirection: 'column',
  },
  bg: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  title: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: 10,
    paddingRight: 10,
  },
  systemName: {color: '#FFF', fontSize: 22, fontWeight: 'bold'},
  headerRight: {gap: 10, flexDirection: 'row'},
  icon: {resizeMode: 'cover', width: 30, height: 30},
  nav: {
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
  },
  fast: {
    flex: 1,
    flexDirection: 'row',
    gap: 10,
    padding: 10,
    paddingTop: 0,
  },
  img: {width: '100%', height: '100%', resizeMode: 'contain'},
});
