import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import React, {useEffect, useState} from 'react';
import Divider from '../../components/Divider';
import {getLine} from '../../api/line';
import {Line} from '../../types/line';
import {getDept} from '../../api/dept';
import {treeToArray} from '../../utils';
import {Dept} from '../../types/dept';
import {getInspectionType} from '../../api/inspection';
import {InspectionType} from '../../types/inspection';
import {getPerson} from '../../api/person';
import {Person} from '../../types/person';
import {CustomPicker} from '../../components/CustomPicker';
import {
  CustomMultiPicker,
} from '../../components/CustomMultiPicker';

export function AddInspection() {
  const [isDatePicker, setIsDatePicker] = useState(false);
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [line, setLine] = useState<Line[]>([]);
  const [dept, setDept] = useState<Omit<Dept, 'children'>[]>([]);
  const [inspectionType, setInspectionType] = useState<InspectionType[]>([]);
  const [person, setPerson] = useState<Person[]>([]);

  const [form, setForm] = useState({
    name: '',
    lineId: '',
    deptId: '',
    num: '',
    inspectionTypeId: '',
    inspectionDate: '',
    inspectionTime: '',
    inspectionAddr: '',
    inspectionLeader: '',
    personList: [],
  });

  // @ts-ignore
  const onChange = (event, selectedDate) => {
    const inspectionDate = selectedDate
      .toLocaleString()
      .split(' ')[0]
      .replace(/\//g, '-');

    setIsDatePicker(false);
    setForm({
      ...form,
      inspectionDate,
    });
  };

  useEffect(() => {
    getLine().then(res => {
      setLine(res.data);
    });

    getDept().then(res => {
      setDept(treeToArray(res.data));
    });

    getInspectionType().then(res => {
      setInspectionType(res.data);
    });

    getPerson().then(res => {
      setPerson(res.data);
    });
  }, []);

  const lineChange = (lineId: string) => {
    setForm({...form, lineId});
  };

  const deptChange = (deptId: string) => {
    setForm({...form, deptId});
  };

  const inspectionChange = (inspectionTypeId: string) => {
    setForm({
      ...form,
      inspectionTypeId,
    });
  };

  const personChange = (personList: string[]) => {

    console.log(personList);
    
    // setForm({...form, personList: item.ids});
    // setPersonName(item.names);
  };

  const submit = () => {
    console.log(form);
  };

  const inspectionLeaderChange = (inspectionLeader: string) => {
    setForm({...form, inspectionLeader});
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
          <Text>巡检名称</Text>
          <TextInput
            style={styles.inp}
            placeholder="请输入"
            placeholderTextColor="#ccc"
            onChangeText={v => setForm({...form, name: v})}
            value={form.name}
          />
        </View>

        <Divider />

        <View style={{...styles.formItem}}>
          <Text>线路</Text>
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

        <View style={{...styles.formItem}}>
          <Text>巡检部门</Text>
          <CustomPicker
            options={dept.map(item => ({id: item.id, name: item.label}))}
            placeholder="请选择"
            onValueChange={deptChange}
          />
        </View>

        <Divider />

        <View style={styles.formItem}>
          <Text>巡检代码</Text>
          <TextInput
            style={styles.inp}
            placeholder="请输入"
            placeholderTextColor="#ccc"
            onChangeText={v => setForm({...form, num: v})}
            value={form.num}
          />
        </View>

        <Divider />

        <View style={{...styles.formItem}}>
          <Text>巡检类型</Text>

          <CustomPicker
            options={inspectionType}
            placeholder="请选择"
            onValueChange={inspectionChange}
          />
        </View>

        <Divider />

        <View style={{...styles.formItem}}>
          <Text>巡检日期</Text>

          <TouchableOpacity
            style={{flex: 1}}
            onPress={() => setIsDatePicker(true)}>
            <Text style={{color: form.inspectionDate ? '#000' : '#ccc'}}>
              {form.inspectionDate || '请选择'}
            </Text>
          </TouchableOpacity>
        </View>

        <Divider />

        <View style={styles.formItem}>
          <Text>巡检时间</Text>
          <TextInput
            style={styles.inp}
            placeholder="请输入"
            placeholderTextColor="#ccc"
            onChangeText={v => setForm({...form, inspectionTime: v})}
            value={form.inspectionTime}
          />
        </View>

        <Divider />

        <View style={styles.formItem}>
          <Text>巡检区段</Text>
          <TextInput
            style={styles.inp}
            placeholder="请输入"
            placeholderTextColor="#ccc"
            onChangeText={v => setForm({...form, inspectionAddr: v})}
            value={form.inspectionAddr}
          />
        </View>

        <Divider />

        <View style={{...styles.formItem}}>
          <Text>负责人</Text>

          <CustomPicker
            options={person}
            placeholder="请选择"
            onValueChange={inspectionLeaderChange}
          />
        </View>

        <Divider />

        <View style={{...styles.formItem}}>
          <Text>巡检人</Text>

          <CustomMultiPicker options={person} placeholder="请选择" onValueChange={personChange} />
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
  button: {
    height: 80,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
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
  list: {
    flex: 1,
  },
});
