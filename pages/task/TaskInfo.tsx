import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Modal,
  Alert,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import React, {useState} from 'react';
import TypeModal, { T } from './TypeModal';

interface Props {
  setActive: (active: number) => void;
}

export default function TaskInfo({setActive}: Props) {
  const [modalVisible, setModalVisible] = useState(false);
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  // @ts-ignore
  const onChange = (event, selectedDate) => {
    const dateTime = selectedDate
      .toLocaleString()
      .split(' ')[0]
      .replace(/\//g, '-');

    setShow(false);
    setForm({
      ...form,
      dateTime,
    });
  };

  const [form, setForm] = useState({
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

  const closeModal = () => {
    setModalVisible(false);
  };

  const confirm = (param: T[]) => {
    setForm({
      ...form,
      typeList: param
    })
    setModalVisible(false)
  };

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
        {show && (
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
        <View style={styles.divider}></View>

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
        <View style={styles.divider}></View>

        <View style={{...styles.formItem, paddingTop: 15, paddingBottom: 15}}>
          <Text>作业类型</Text>

          <TouchableOpacity
            style={{flex: 1}}
            onPress={() => setModalVisible(true)}>
            <Text style={{color: '#ccc'}}>
              {form.typeList.length && form.typeList.map(item => item.type).join(',') || '请选择'}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.divider}></View>

        <View style={styles.formItem}>
          <Text>作业线路</Text>
          <TextInput style={styles.inp} placeholder="请输入" />
        </View>
        <View style={styles.divider}></View>

        <View style={styles.formItem}>
          <Text>请站点</Text>
          <TextInput style={styles.inp} placeholder="请输入" />
        </View>
        <View style={styles.divider}></View>

        <View style={styles.formItem}>
          <Text>销站点</Text>
          <TextInput style={styles.inp} placeholder="请输入" />
        </View>
        <View style={styles.divider}></View>

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
        <View style={styles.divider}></View>

        <View style={styles.formItem}>
          <Text>作业负责人</Text>
          <TextInput style={styles.inp} placeholder="请输入" />
        </View>
        <View style={styles.divider}></View>

        <View style={styles.formItem}>
          <Text>作业安全员</Text>
          <TextInput style={styles.inp} placeholder="请输入" />
        </View>
        <View style={styles.divider}></View>

        <View style={{...styles.formItem, paddingTop: 15, paddingBottom: 15}}>
          <Text>作业日期</Text>

          <TouchableOpacity style={{flex: 1}} onPress={() => setShow(true)}>
            <Text style={{color: '#ccc'}}>{form.dateTime || '请选择'}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.divider}></View>

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
        <View style={styles.divider}></View>

        <View style={styles.formItem}>
          <Text>作业工班</Text>
          <TextInput style={styles.inp} placeholder="请输入" />
        </View>
        <View style={styles.divider}></View>

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
        <View style={styles.divider}></View>
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

      <TypeModal
        modalVisible={modalVisible}
        closeModal={closeModal}
        confirm={confirm}
      />
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
