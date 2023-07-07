import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Divider from '../../components/Divider';

// @ts-ignore
export const Warehouse = ({navigation}) => {
  const images = {
    分发管理: require('../../assets/warehouse/fenfa.png'),
    退换管理: require('../../assets/warehouse/tuihuan.png'),
    报废管理: require('../../assets/warehouse/baofei.png'),
    物资盘点: require('../../assets/warehouse/pandian.png'),
  };

  const navList: {[key: string]: string}[] = [
    {title: '分发管理'},
    {title: '退换管理'},
    {title: '报废管理'},
    {title: '物资盘点'},
  ];

  return (
    <View style={styles.page}>
      <ImageBackground
        source={require('../../assets/warehouse/bg.png')}
        style={styles.bg}>
        <View style={styles.card}>
          <View style={styles.nav}>
            {navList.map(item => (
              <TouchableOpacity
                key={item.title}
                onPress={() => navigation.navigate(item.title)}>
                <Image
                  style={styles.img}
                  source={images[item.title as keyof typeof images]}
                />
                <Text>{item.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ImageBackground>

      <View style={{...styles.card, marginTop: 80, height: 450}}>
        <ScrollView>
          <View style={styles.header}>
            <Text style={{color: '#21254D', fontWeight: 'bold'}}>库存物资</Text>
            <Image
              style={styles.search}
              source={require('../../assets/warehouse/search.png')}
            />
          </View>

          <View>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(item => (
              <View key={item}>
                <View style={styles.item}>
                  <View style={styles.thing}>
                    <Text style={{color: '#21254D'}}>十字螺丝刀</Text>
                    <Text>规格型号：400mm</Text>
                  </View>
                  <View style={styles.count}>
                    <Text style={{color: '#21254D'}}>45</Text>
                    <Text>总库存</Text>
                  </View>
                </View>
                <Divider />
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  bg: {
    resizeMode: 'cover',
    height: 200,
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 8,
    width: '90%',
    height: 130,
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
  nav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  img: {
    width: 50,
    height: 50,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15
  },
  search: {
    width: 30,
    height: 30,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  thing: {},
  count: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
