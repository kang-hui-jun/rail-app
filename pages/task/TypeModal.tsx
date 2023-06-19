import {View, Text, Modal, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {getAllType} from '../../api/task';
import { TaskType } from '../../types/task';

interface Props {
  modalVisible: boolean;
  closeModal: () => void;
  confirm: () => void
}

export default function TypeModal({modalVisible, closeModal, confirm}: Props) {
  const [data, setData] = useState<TaskType[]>([]);
  const getTypeList = () => {
    getAllType().then(res => {
      setData(res.data);
      
    });
  };

  useEffect(() => {
    getTypeList()
  }, [])

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
            {data?.map(item => (
              <View key={item.id}>
                <View
                  style={{
                    height: 50,
                    // alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text>{item.type}</Text>
                </View>
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
                confirm();
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
