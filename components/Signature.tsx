import React from 'react';
import {Button, View} from 'react-native';
import SignatureCapture from 'react-native-signature-capture';

class Signature extends React.Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <SignatureCapture
          style={{flex: 1}}
          onSaveEvent={result => console.log(result)}
          onDragEvent={() => console.log('dragged')}
        />
        {/* <Button title="Save" onPress={() => this.saveSignature()} /> */}
      </View>
    );
  }

  // saveSignature() {
  //   this.refs["sign"].saveImage();
  // }
}

export default Signature;
