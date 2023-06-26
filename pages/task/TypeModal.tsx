import {View, Text, Modal, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import CheckBox from '@react-native-community/checkbox';
import {getAllType} from '../../api/task';
import {TaskType} from '../../types/task';

export interface T extends TaskType {
  toggleCheckBox: boolean;
}

interface Props {
  modalVisible: boolean;
  closeModal: () => void;
  confirm: (param: T[]) => void;
}

export default function TypeModal({modalVisible, closeModal, confirm}: Props) {
  const [data, setData] = useState<T[]>([]);
  // const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const getTypeList = () => {
    getAllType().then(res => {
      const result = res.data.map((item: T) => ({
        ...item,
        toggleCheckBox: false,
      }));
      setData(result);
    });
  };

  useEffect(() => {
    getTypeList();
  }, []);

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        // Alert.alert('Modal has been closed.');
        // setModalVisible(!modalVisible);
      }}>
      <View style={styles.overlay}>
        <View style={styles.optionsContainer}>
          <View style={styles.list}>
            {data?.map((item, index) => (
              <View key={item.id}>
                <TouchableOpacity
                  style={{
                    height: 50,
                    flexDirection: 'row',
                    alignItems: 'center',
                    // justifyContent: 'center',
                  }}
                  onPress={() => {
                    const newData = [...data];
                    newData[index].toggleCheckBox =
                      !newData[index].toggleCheckBox;
                    setData(newData);
                  }}>
                  <CheckBox
                    disabled={false}
                    value={item.toggleCheckBox}
                    // onValueChange={newValue => setToggleCheckBox(newValue)}
                  />
                  <Text>{item.type}</Text>
                </TouchableOpacity>
                <View style={styles.divider}></View>
              </View>
            ))}
          </View>

          <View style={styles.button}>
            <TouchableOpacity
              style={{
                ...styles.btn,
                backgroundColor: '#EBEDF1',
              }}
              onPress={() => {
                closeModal();
              }}>
              <Text style={{color: '#21254D'}}>取消</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                ...styles.btn,
                backgroundColor: '#3B80F0',
              }}
              onPress={() => {
                confirm(data.filter(item => item.toggleCheckBox));
              }}>
              <Text style={{color: '#FFFFFF'}}>确定</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionsContainer: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingBottom: 20,
    width: '80%',
    height: '80%',
  },
  list: {flex: 1},
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
});
