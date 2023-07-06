import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {Modal} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import {ScrollView} from 'react-native';

interface Props {
  visible: boolean;
  data: {name: string; id: string}[];
  setData: (data: Props['data']) => void;
  change: (item: {ids: string[]; names: string}) => void;
  close: () => void;
}

export default function TreePicker({
  visible,
  data,
  change,
  setData,
  close,
}: Props) {
  const [values, setValues] = useState<{ids: string[]; names: string}>({
    ids: [],
    names: '',
  });
  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View style={styles.overlay}>
        <View style={styles.optionsContainer}>
          <ScrollView>
            {data?.map((item, index) => (
              <View key={item.id} style={styles.li}>
                <CheckBox
                  disabled={false}
                  value={item.toggleCheckBox}
                  onValueChange={() => {
                    const newData = [...data];
                    newData[index].toggleCheckBox =
                      !newData[index].toggleCheckBox;
                    const ids = newData
                      .filter(item => item.toggleCheckBox)
                      .map(item => item.id);
                    const names = newData
                      .filter(item => item.toggleCheckBox)
                      .map(item => item.name)
                      .join(',');

                    setValues({ids, names});

                    setData(newData);
                  }}
                />
                <Text>{item.name}</Text>
              </View>
            ))}
          </ScrollView>
          <View style={styles.button}>
            <TouchableOpacity
              style={{
                ...styles.btn,
                backgroundColor: '#EBEDF1',
              }}
              onPress={() => {
                close();
              }}>
              <Text style={{color: '#21254D'}}>取消</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                ...styles.btn,
                backgroundColor: '#3B80F0',
              }}
              onPress={() => {
                change(values);
                close()
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
    width: '90%',
    height: '90%',
  },
  li: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
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
