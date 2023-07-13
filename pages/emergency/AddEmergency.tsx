import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {addEmergencyEvent, addEmergencyDrill} from '../../api/emergency';
import Divider from '../../components/Divider';
import {CustomMultiPicker} from '../../components/CustomMultiPicker';
import {Person} from '../../types/person';
import {getPerson} from '../../api/person';

export default function AddEmergency() {
  const [person, setPerson] = useState<Person[]>([]);
  const personRef = useRef<any>(null);
  const [form, setForm] = useState({
    name: '',
    personList: [],
  });

  useEffect(() => {
    getPerson().then(res => {
      setPerson(res.data);
    });
  }, []);

  const addPerson = () => {
    personRef?.current?.toggleModal();
  };

  const onSelectChange = (ids: string[]) => {
    const result: any[] = [];

    for (let i = 0; i < ids.length; i++) {
      result.push({
        personName: person?.find(v => v.id === ids[i])?.name,
        id: person?.find(v => v.id === ids[i])?.id,
      });
    }

    setForm({
      ...form,
      personList: result,
    });
  };

  const submit = () => {
    // 0 抢修 addEmergencyEvent 1演练 addEmergencyDrill
  };
  return (
    <View style={styles.page}>
      <ScrollView>
        <View style={styles.formItem}>
          <Text>时间名称</Text>
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
          <Text>事件类型</Text>
        </View>
        <Divider />

        <View style={styles.formItem}>
          <Text>启动预案</Text>
        </View>
        <Divider />

        <View style={styles.formItem}>
          <Text>区域</Text>
        </View>
        <Divider />

        <View style={styles.person}>
          <TouchableOpacity style={styles.addPerson} onPress={addPerson}>
            <Image
              style={styles.img}
              source={require('../../assets/task/add-person.png')}
            />
            <CustomMultiPicker
              ref={personRef}
              options={person}
              placeholder="添加人员"
              isPerson
              onValueChange={onSelectChange}
            />
          </TouchableOpacity>

          {form.personList.map((v, index) => (
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
      </ScrollView>

      <TouchableOpacity style={styles.button} onPress={() => {}}>
        <Text style={styles.btn}>确定</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingBottom: 80,
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
});
