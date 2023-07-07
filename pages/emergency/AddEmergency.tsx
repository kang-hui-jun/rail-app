import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import {addEmergencyEvent, addEmergencyDrill} from '../../api/emergency';
import Divider from '../../components/Divider';

export default function AddEmergency() {
  const [form, setForm] = useState({
    name: '',
  });

  const submit = () => {
    // 0 抢修 addEmergencyEvent 1演练 addEmergencyDrill
  };
  return (
    <View style={styles.page}>
      <ScrollView>
        <View style={styles.formItem}>
          <Text>应急名称</Text>
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
    height: 50
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
});
