import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import React, {useEffect, useState} from 'react';
import {CreateTask, TaskType} from '../../types/task';
import {Line, Platform} from '../../types/line';
import {Dept} from '../../types/dept';
import {getLine, getMetroPlatform} from '../../api/line';
import {getDept} from '../../api/dept';
import {getPerson} from '../../api/person';
import Divider from '../../components/Divider';
import {CustomPicker} from '../../components/CustomPicker';
import {CustomMultiPicker} from '../../components/CustomMultiPicker';
import {Person} from '../../types/person';
import {getAllType} from '../../api/task';
import {treeToArray} from '../../utils';

interface Props {
  setActive: (active: number) => void;
}

export default function TaskInfo({setActive}: Props) {
  const [isDatePicker, setIsDatePicker] = useState(false);
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');

  const [line, setLine] = useState<Line[]>([]);
  const [platform, setPlatform] = useState<Platform[]>([]);
  const [dept, setDept] = useState<Omit<Dept, 'children'>[]>([]);
  const [person, setPerson] = useState<Person[]>([]);
  const [typeList, setTypeList] = useState<TaskType[]>([]);

  // @ts-ignore
  const onChange = (event, selectedDate) => {
    const dateTime = selectedDate
      .toLocaleString()
      .split(' ')[0]
      .replace(/\//g, '-');

    setIsDatePicker(false);
    setForm({
      ...form,
      dateTime,
    });
  };

  const [form, setForm] = useState<CreateTask<any>>({
    name: '',
    num: '',
    typeList: [],
    lineId: '',
    pleaseStand: '',
    pinStand: '',
    workAddr: '',
    leaderPerson: '',
    safePerson: '',
    dateTime: '',
    workTime: '',
    deptId: '',
    workContent: '',
  });

  const fetchData = async () => {
    const line = await getLine();
    const dept = await getDept();
    const person = await getPerson();
    const type = await getAllType();

    setLine(line.data);
    setDept(treeToArray(dept.data));
    setPerson(person.data);
    setTypeList(type.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // getMetroPlatform({metroId: form?.lineId})

  const typeChange = () => {};

  const lineChange = async (metroId: string) => {
    setForm({
      ...form,
      pleaseStand: '',
      pinStand: '',
    });
    const res = await getMetroPlatform({metroId});
    setPlatform(res.data);
  };

  const pleaseStandChange = (value: string) => {};

  const pinStandChange = (value: string) => {};

  const leaderPersonChange = (value: string) => {};

  const safePersonChange = (value: string) => {};

  const deptChange = (value: string) => {};

  const save = () => {
    console.log('保存');
  };

  const next = () => {
    setActive(1);
    console.log('下一步');
  };

  return (
    <View style={styles.page}>
      <ScrollView>
        {isDatePicker && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            // @ts-ignore
            mode={mode}
            is24Hour={true}
            onChange={onChange}
          />
        )}

        <View style={styles.formItem}>
          <Text>作业名称</Text>
          <TextInput
            style={styles.inp}
            placeholder="请输入"
            placeholderTextColor="#ccc"
            onChangeText={v => setForm({...form, name: v})}
            value={form.name}
          />
        </View>
        <Divider />

        <View style={styles.formItem}>
          <Text>作业代码</Text>
          <TextInput
            style={styles.inp}
            placeholder="请输入"
            placeholderTextColor="#ccc"
            onChangeText={v => setForm({...form, num: v})}
            value={form.num}
          />
        </View>
        <Divider />

        <View style={{...styles.formItem, paddingTop: 15, paddingBottom: 15}}>
          <Text>作业类型</Text>

          <CustomMultiPicker
            options={typeList.map(item => ({...item, name: item.type}))}
            placeholder="请选择"
            onValueChange={typeChange}
          />
        </View>
        <Divider />

        <View style={styles.formItem}>
          <Text>作业线路</Text>
          <CustomPicker
            options={line.map(item => ({
              id: item.id,
              name: item.lineName,
            }))}
            placeholder="请选择"
            onValueChange={lineChange}
          />
        </View>
        <Divider />

        <View style={styles.formItem}>
          <Text>请站点</Text>
          <CustomPicker
            options={platform}
            placeholder="请选择"
            onValueChange={pleaseStandChange}
          />
        </View>
        <Divider />

        <View style={styles.formItem}>
          <Text>销站点</Text>
          <CustomPicker
            options={platform}
            placeholder="请选择"
            onValueChange={pinStandChange}
          />
        </View>
        <Divider />

        <View style={styles.formItem}>
          <Text>作业区域</Text>
          <TextInput
            style={styles.inp}
            placeholder="请输入"
            placeholderTextColor="#ccc"
            onChangeText={v => setForm({...form, workAddr: v})}
            value={form.workAddr}
          />
        </View>
        <Divider />

        <View style={styles.formItem}>
          <Text>作业负责人</Text>
          <CustomPicker
            options={person}
            placeholder="请选择"
            onValueChange={leaderPersonChange}
          />
        </View>
        <Divider />

        <View style={styles.formItem}>
          <Text>作业安全员</Text>
          <CustomPicker
            options={person}
            placeholder="请选择"
            onValueChange={safePersonChange}
          />
        </View>
        <Divider />

        <View style={{...styles.formItem, paddingTop: 15, paddingBottom: 15}}>
          <Text>作业日期</Text>

          <TouchableOpacity style={{flex: 1}} onPress={() => {
            setIsDatePicker(true)
          }}>
            <Text style={{color: form.dateTime ? '#000' : '#ccc'}}>{form.dateTime || '请选择'}</Text>
          </TouchableOpacity>
        </View>
        <Divider />

        <View style={styles.formItem}>
          <Text>作业时间</Text>
          <TextInput
            style={styles.inp}
            placeholder="请输入"
            placeholderTextColor="#ccc"
            onChangeText={v => setForm({...form, workTime: v})}
            value={form.workTime}
          />
        </View>
        <Divider />

        <View style={styles.formItem}>
          <Text>作业工班</Text>
          <CustomPicker
            options={dept.map(item => ({id: item.id, name: item.label}))}
            placeholder="请选择"
            onValueChange={deptChange}
          />
        </View>
        <Divider />

        <View style={styles.formItem}>
          <Text>作业内容</Text>
          <TextInput
            style={styles.inp}
            placeholder="请输入"
            placeholderTextColor="#ccc"
            onChangeText={v => setForm({...form, workContent: v})}
            value={form.workContent}
          />
        </View>
        <Divider />
        <View style={styles.button}>
          <TouchableOpacity
            style={{
              ...styles.btn,
              backgroundColor: '#EBEDF1',
            }}
            onPress={() => {
              save();
            }}>
            <Text style={{color: '#21254D'}}>保存作业</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              ...styles.btn,
              backgroundColor: '#3B80F0',
            }}
            onPress={() => {
              next();
            }}>
            <Text style={{color: '#FFFFFF'}}>下一步</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
  divider: {
    height: 1,
    backgroundColor: '#F0F1F3',
    marginTop: 10,
    marginBottom: 10,
  },
  button: {
    height: 80,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopColor: '#000',
    flexDirection: 'row',
    gap: 20,
    // paddingLeft: 10
  },
  btn: {
    borderRadius: 8,
    padding: 16,
    width: '40%',
    alignItems: 'center',
    backgroundColor: '#3B80F0',
    justifyContent: 'center',
    textAlign: 'center',
    color: '#FFF',
    fontSize: 18,
  },

  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
});
