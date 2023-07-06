import {
  View,
  Modal,
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView,
} from 'react-native';
import React from 'react';
import Divider from './Divider';

interface Props {
  visible: boolean;
  close: () => void;
  data: {id: string; name: string}[];
  change: (item: any) => void;
}

export default function Picker({visible, data, close, change}: Props) {
  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View style={styles.overlay}>
        <View style={styles.optionsContainer}>
          <ScrollView>
            <View style={styles.list}>
              {data?.map(item => (
                <View key={item.id}>
                  <TouchableOpacity
                    style={styles.item}
                    onPress={() => {
                      change(item)
                      close()
                    }}>
                    <Text>{item.name}</Text>
                  </TouchableOpacity>
                  <Divider />
                </View>
              ))}
            </View>
          </ScrollView>
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
    justifyContent: 'flex-end',
  },
  optionsContainer: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingBottom: 20,
    width: '100%',
    height: '50%',
  },
  list: {
    flex: 1,
  },
  item: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
