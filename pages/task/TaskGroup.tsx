import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet} from 'react-native';
import Divider from '../../components/Divider';
import {Group} from '../../types/task';
import {CustomMultiPicker} from '../../components/CustomMultiPicker';
import {getPerson} from '../../api/person';
import {Person} from '../../types/person';

export default function TaskGroup() {
  const [person, setPerson] = useState<Person[]>([]);
  const personRef = useRef<any>(null);
  const [groupList, setGroupList] = useState<Omit<Group, 'id' | 'status'>[]>(
    [],
  );
  const [groupIndex, setGroupIndex] = useState(0);

  useEffect(() => {
    getPerson().then(res => {
      setPerson(res.data);
    });
  }, []);

  const onChangeText = (value: string, index: number) => {
    const newGroupList = [...groupList];
    newGroupList[index].groupName = value;
    setGroupList(newGroupList);
  };

  const addGroup = () => {
    setGroupList([
      ...groupList,
      {leader: '', groupName: '', leaderName: '', personList: []},
    ]);
  };

  const addPerson = (index: number) => {
    setGroupIndex(index);
    personRef?.current?.toggleModal();
  };

  const onSelectChange = (ids: string[]) => {
    if (!ids.length) {
      const newGroupList = [...groupList];
      newGroupList.splice(0, 1, {
        ...groupList[0],
        personList: [],
        leader: '',
      });
      setGroupList(newGroupList);
      return false;
    }

    const result: any[] = [];

    for (let i = 0; i < ids.length; i++) {
      result.push({
        personName: person?.find(v => v.id === ids[i])?.name,
        id: person?.find(v => v.id === ids[i])?.id,
      });
    }

    const newGroupList = [...groupList];
    newGroupList.splice(groupIndex, 1, {
      ...groupList[groupIndex],
      personList: result,
      leader: result[groupIndex].id,
    });

    setGroupList(newGroupList);
  };

  return (
    <View style={styles.page}>
      <ScrollView>
        <View style={styles.groupList}>
          {groupList.map((item, index) => (
            <View key={index} style={styles.group}>
              <View style={styles.header}>
                <Text>小组名称</Text>
                <TextInput
                  placeholder="请输入"
                  placeholderTextColor="#ccc"
                  onChangeText={val => onChangeText(val, index)}
                  value={item.groupName}
                />
              </View>
              <Divider />
              <View style={styles.person}>
                <TouchableOpacity
                  style={styles.addPerson}
                  onPress={() => addPerson(index)}>
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

                {item.personList.map((v, index) => (
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
            </View>
          ))}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Text>添加小组</Text>
        <TouchableOpacity onPress={addGroup}>
          <Image
            style={{width: 30, height: 30}}
            source={require('../../assets/task/add-group.png')}
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.button} onPress={() => {}}>
        <Text style={styles.btn}>完成</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    marginTop: 10,
    paddingBottom: 170,
  },
  groupList: {
    gap: 10,
  },
  group: {
    padding: 10,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 10,
    paddingTop: 10,
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
  footer: {
    position: 'absolute',
    bottom: 80,
    left: 0,
    right: 0,
    height: 80,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopColor: '#000',
    flexDirection: 'row',
    width: '100%',
    paddingLeft: 10,
    paddingRight: 10,
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
