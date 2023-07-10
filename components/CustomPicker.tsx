import {useState} from 'react';
import {Modal, ScrollView, Text, TouchableOpacity, View} from 'react-native';

interface Option {
  name: string;
  id: string;
}

interface CustomPickerProps {
  options: Option[];
  defaultValue?: string;
  placeholder?: string;
  onValueChange?: (value: string) => void;
}

export const CustomPicker = ({
  defaultValue,
  placeholder,
  options,
  onValueChange,
}: CustomPickerProps) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedValue, setSelectedValue] = useState(defaultValue || '');

  const toggleModal = () => {
    setShowModal(prevState => !prevState);
  };

  const handleOptionPress = (value: string) => {
    const selectedOption = options.find(option => option.id === value)?.name;

    setSelectedValue(selectedOption || '');
    setShowModal(false);

    onValueChange && onValueChange(value);
  };

  return (
    <View style={{flex: 1}}>
      <TouchableOpacity onPress={toggleModal}>
        <Text style={{color: selectedValue ? '#000' : '#ccc'}}>
          {selectedValue || placeholder}
        </Text>
      </TouchableOpacity>

      <Modal visible={showModal} transparent={true} animationType="fade">
        <TouchableOpacity
          style={{
            flex: 1,
            justifyContent: 'flex-end',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }}
          onPress={toggleModal}>
          <View style={{backgroundColor: 'white', maxHeight: 500, minHeight: 100}}>
            <ScrollView>
              {options.map((option, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => handleOptionPress(option.id)}
                  style={{padding: 16}}>
                  <Text style={{textAlign: 'center'}}>{option.name}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};
