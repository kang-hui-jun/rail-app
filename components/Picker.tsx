import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {Modal} from 'react-native';
import CheckBox from '@react-native-community/checkbox';

interface Props<T> {
  visible: boolean;
  data: T[];
  selectChange: (ids: number[], names?: string) => void;
}

export default function Picker({
  visible,
  data,
  selectChange,
}: Props<{id: number; name: string; toggleCheckBox: boolean}>) {
  const change = (index: number) => {
    const newData = [...data];
    newData[index].toggleCheckBox = !newData[index].toggleCheckBox;
    const ids = newData
      .filter(item => item.toggleCheckBox)
      .map(item => item.id);
    const names = newData
      .filter(item => item.toggleCheckBox)
      .map(item => item.name)
      .join(',');
    selectChange(ids, names);
  };

  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View style={styles.overlay}>
        <View style={styles.optionsContainer}>
          {data?.map((item, index) => (
            <View key={item.id} style={styles.li}>
              <CheckBox
                disabled={false}
                value={item.toggleCheckBox}
                onValueChange={() => {
                  change(index);
                }}
              />
              <Text>{item.name}</Text>
            </View>
          ))}
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
});
