import React from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {CheckBox} from './CheckBox';

interface Option {
  name: string;
  id: string;
}

interface CustomMultiPickerProps {
  options: Option[];
  defaultValue?: string[];
  placeholder?: string;
  onValueChange?: (values: string[]) => void;
  isPerson?: boolean;
}

interface CustomMultiPickerState {
  showModal: boolean;
  selectedValues: string[];
}

export class CustomMultiPicker extends React.Component<
  CustomMultiPickerProps,
  CustomMultiPickerState
> {
  constructor(props: CustomMultiPickerProps) {
    super(props);
    this.state = {
      showModal: false,
      selectedValues: props.defaultValue || [],
    };
  }

  toggleModal = () => {
    this.setState(prevState => ({
      showModal: !prevState.showModal,
    }));
  };

  handleOptionPress = (value: string) => {
    const {selectedValues} = this.state;
    const selectedIndex = selectedValues.indexOf(value);
    let newSelectedValues = [];

    if (selectedIndex === -1) {
      // Add the value to selected values
      newSelectedValues = [...selectedValues, value];
    } else {
      // Remove the value from selected values
      newSelectedValues = selectedValues.filter(v => v !== value);
    }

    this.setState({
      selectedValues: newSelectedValues,
    });
  };

  handleConfirm = () => {
    const {selectedValues} = this.state;
    this.setState({
      showModal: false,
    });
    this.props.onValueChange && this.props.onValueChange(selectedValues);
  };

  render() {
    const {options, placeholder, isPerson} = this.props;
    const {showModal, selectedValues} = this.state;

    return (
      <View>
        <TouchableOpacity onPress={isPerson ? undefined : this.toggleModal}>
          {isPerson ? (
            <Text style={{color: '#ccc'}}>{placeholder}</Text>
          ) : (
            <Text style={{color: selectedValues.length ? '#000' : '#ccc'}}>
              {selectedValues.length > 0
                ? selectedValues
                    .map(value => {
                      const option = options.find(
                        option => option.id === value,
                      );
                      return option ? option.name : '';
                    })
                    .join(', ')
                : placeholder}
            </Text>
          )}
        </TouchableOpacity>

        <Modal visible={showModal} transparent={true} animationType="fade">
          <TouchableOpacity
            style={{
              flex: 1,
              justifyContent: 'flex-end',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
            }}
            onPress={this.toggleModal}>
            <View
              style={{
                backgroundColor: 'white',
                maxHeight: 500,
                minHeight: 100,
              }}>
              <ScrollView>
                {options.map((option, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => this.handleOptionPress(option.id)}
                    style={{padding: 16}}>
                    <CheckBox
                      label={option.name}
                      checked={selectedValues.includes(option.id)}
                      onChange={() => this.handleOptionPress(option.id)}
                    />
                  </TouchableOpacity>
                ))}
              </ScrollView>
              <TouchableOpacity
                style={{padding: 10, alignItems: 'center'}}
                onPress={this.handleConfirm}>
                <Text style={styles.btn}>确定</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  btn: {
    borderRadius: 8,
    padding: 10,
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#3B80F0',
    justifyContent: 'center',
    textAlign: 'center',
    color: '#FFF',
    fontSize: 12,
  },
});
