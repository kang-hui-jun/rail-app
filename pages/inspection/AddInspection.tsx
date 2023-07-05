import {View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import React, {useState} from 'react';
import Divider from '../../components/Divider';

export function AddInspection() {
  const [isDatePicker, setIsDatePicker] = useState(false);
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');

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

        <View style={styles.formItem}>
          <Text>线路</Text>
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
          <Text>巡检部门</Text>
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

        <View style={styles.formItem}>
          <Text>巡检类型</Text>
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
          <Text>巡检日期</Text>
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

        <View style={styles.formItem}>
          <Text>负责人</Text>
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
          <Text>巡检人</Text>
          <TextInput
            style={styles.inp}
            placeholder="请输入"
            placeholderTextColor="#ccc"
            onChangeText={v => setForm({...form, name: v})}
            value={form.name}
          />
        </View>

        <Divider />

        <View style={styles.button}>
          <TouchableOpacity
            style={{
              ...styles.btn,
              backgroundColor: '#3B80F0',
            }}
            onPress={() => {
              // next();
            }}>
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
  },
  inp: {
    flex: 1,
  },
  button: {
    height: 80,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10
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
