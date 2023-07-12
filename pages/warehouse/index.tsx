import React, {useEffect, useState} from 'react';
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
import {CustomPicker} from '../../components/CustomPicker';
import {Dept} from '../../types/dept';
import {Material, Warehouse as W} from '../../types/warehouse';
import {getMaterialDetail, getWarehouse} from '../../api/warehouse';

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

// @ts-ignore
export const Warehouse = ({navigation}) => {
  const [warehouse, setWarehouse] = useState<W[]>([]);
  const [dept, setDept] = useState<Omit<Dept, 'children'>[]>([]);
  const [warehouseId, setwarehouseId] = useState<string>();
  const [material, setMaterial] = useState<Material[]>([]);

  useEffect(() => {
    getWarehouse().then(res => {
      setWarehouse(res.data);
    });
  }, []);

  useEffect(() => {
    if (warehouseId) {
      getMaterialDetail(warehouseId).then(res => {
        setMaterial(res.data);
      });
    }
  }, [warehouseId]);

  const warehouseChange = (value: string) => {
    setwarehouseId(value);
  };

  return (
    <View style={styles.page}>
      <ImageBackground
        source={require('../../assets/warehouse/bg.png')}
        style={styles.bg}>
        <View style={styles.dept}>
          <Image
            style={styles.select}
            source={require('../../assets/warehouse/select.png')}
          />
          <CustomPicker
            options={warehouse}
            placeholder="请选择仓库"
            onValueChange={warehouseChange}
          />
        </View>
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
            {material.map(item => (
              <View key={item.id}>
                <View style={styles.item}>
                  <View style={styles.thing}>
                    <Text style={{color: '#21254D'}}>
                      {item.materialTypeName}
                    </Text>
                    <Text>规格型号：{item.specsModel || '无'}</Text>
                  </View>
                  <View style={styles.count}>
                    <Text style={{color: '#21254D'}}>{item.count || '0'}</Text>
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
  dept: {
    position: 'absolute',
    left: 30,
    top: 30,
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
  },
  select: {
    width: 30,
    height: 30,
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
    marginBottom: 15,
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
