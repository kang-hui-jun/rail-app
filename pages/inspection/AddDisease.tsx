import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {getDictData} from '../../api/dict';
import {CustomPicker} from '../../components/CustomPicker';
import Divider from '../../components/Divider';
import {getMetroWorkAreaList} from '../../api/inspection';
import PhotoList from '../../components/PhotoList';

interface DictType {
  dictLabel: string;
  dictValue: string;
}

// @ts-ignore
export default function AddDisease({route, navigation}) {
  const params = route.params;

  const diseaseLevelList = [
    {
      id: '1',
      name: '1',
    },
    {
      id: '2',
      name: '2',
    },
    {
      id: '3',
      name: '3',
    },
  ];

  const [form, setForm] = useState({
    diseaseMouldId: '',
    diseaseLevel: '',
    workAreaId: '',
    travelType: '',
    lineType: '',
    mileage: '',
    remark: '',
  });

  const [typeList, setTypeList] = useState<DictType[]>([]);
  const [travelTypeList, seTtravelTypeList] = useState<DictType[]>([]);
  const [lineTypeList, setLineTypeList] = useState<DictType[]>([]);
  const [workAreaList, setWorkAreaList] = useState([]);

  const fetchData = async () => {
    const diseaseTypeData = await getDictData('disease_type');
    const travelTypeData = await getDictData('travel_type');
    const lineTypeData = await getDictData('line_type');
    const workAreaData = await getMetroWorkAreaList({metroId: params.lineId});

    console.log(workAreaData);

    setTypeList(diseaseTypeData.data);
    seTtravelTypeList(travelTypeData.data);
    setLineTypeList(lineTypeData.data);
    setWorkAreaList(workAreaData.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const lineTypeChange = (value: string) => {};

  const diseaseLevelChange = (value: string) => {};

  const workAreaChange = (value: string) => {};

  const photoChange = (v: string[]) => {
    console.log(v);
  };

  const submit = () => {};

  return (
    <View style={styles.page}>
      <View style={{...styles.formItem}}>
        <Text>病害名称</Text>
        <CustomPicker
          options={typeList.map(item => ({
            id: item.dictValue,
            name: item.dictLabel,
          }))}
          placeholder="请选择"
          onValueChange={lineTypeChange}
        />
      </View>

      <Divider />

      <View style={{...styles.formItem}}>
        <Text>所属线别</Text>
        <CustomPicker
          options={lineTypeList.map(item => ({
            id: item.dictValue,
            name: item.dictLabel,
          }))}
          placeholder="请选择"
          onValueChange={lineTypeChange}
        />
      </View>

      <Divider />

      <View style={{...styles.formItem}}>
        <Text>行别股道</Text>
        <CustomPicker
          options={travelTypeList.map(item => ({
            id: item.dictValue,
            name: item.dictLabel,
          }))}
          placeholder="请选择"
          onValueChange={lineTypeChange}
        />
      </View>

      <Divider />

      <View style={{...styles.formItem}}>
        <Text>所属工区</Text>
        <CustomPicker
          options={workAreaList}
          placeholder="请选择"
          onValueChange={workAreaChange}
        />
      </View>

      <Divider />

      <View style={{...styles.formItem}}>
        <Text>所属里程</Text>
        <TextInput
          style={styles.inp}
          placeholder="请输入"
          placeholderTextColor="#ccc"
          onChangeText={mileage => setForm({...form, mileage})}
          value={form.mileage}
        />
      </View>

      <Divider />

      <View style={{...styles.formItem}}>
        <Text>病害等级</Text>
        <CustomPicker
          options={diseaseLevelList}
          placeholder="请选择"
          onValueChange={diseaseLevelChange}
        />
      </View>

      <Divider />

      <View style={{...styles.formItem}}>
        <Text>病害说明</Text>
        <TextInput
          style={styles.inp}
          placeholder="请输入"
          placeholderTextColor="#ccc"
          onChangeText={remark => setForm({...form, remark})}
          value={form.remark}
        />
      </View>

      <Divider />

      <View
        style={{
          paddingLeft: 10,
          paddingRight: 10,
          flexDirection: 'column',
          alignItems: 'flex-start',
          gap: 10,
        }}>
        <Text>病害图片</Text>

        <PhotoList change={photoChange} />
      </View>

      <Divider />

      <View style={styles.button}>
        <TouchableOpacity
          style={{
            ...styles.btn,
            backgroundColor: '#3B80F0',
          }}
          onPress={submit}>
          <Text style={{color: '#FFFFFF'}}>提交</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  formItem: {
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10,
    height: 50,
  },
  inp: {
    flex: 1,
  },
  button: {
    height: 80,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
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
