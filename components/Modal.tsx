import {View, Modal as M, StyleSheet} from 'react-native';
import React, {ReactNode} from 'react';

interface Props {
  visible: boolean;
  children: ReactNode;
  close: () => void;
}

export default function Modal({visible, children}: Props) {
  return (
    <M animationType="slide" transparent={true} visible={visible}>
      <View style={styles.overlay}>
        <View style={styles.optionsContainer}>{children}</View>
      </View>
    </M>
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
});
