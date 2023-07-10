import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

interface CheckBoxProps {
  label: string;
  checked: boolean;
  onChange: () => void;
}

export const CheckBox: React.FC<CheckBoxProps> = ({
  label,
  checked,
  onChange,
}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onChange}>
      <View style={styles.checkbox}>
        {checked && <View style={styles.checkmark} />}
      </View>
      <Text>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#3B80F0',
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmark: {
    width: 12,
    height: 12,
    backgroundColor: '#3B80F0',
  },
});
