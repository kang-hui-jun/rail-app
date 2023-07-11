import React, {useRef} from 'react';
import {Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import SignatureCapture from 'react-native-signature-capture';
import RNFetchBlob from 'rn-fetch-blob';
import {request} from '../utils/request';

interface Props {
  visible: boolean;
  close: () => void;
  getImg: (path: string) => void;
}

const Signature = ({visible, close, getImg}: Props) => {
  const signRef = useRef<any>(null);

  const saveSign = () => {
    signRef.current?.saveImage();
  };

  const resetSign = () => {
    signRef.current?.resetImage();
  };

  const _onSaveEvent = (result: {encoded: string; pathName: string}) => {
    const tempImageFilePath =
      RNFetchBlob.fs.dirs.DocumentDir + '/signature.png';

    RNFetchBlob.fs
      .writeFile(tempImageFilePath, result.encoded, 'base64')
      .then(() => {
        const imageFile = {
          uri: 'file://' + tempImageFilePath,
          type: 'image/jpeg',
          name: 'tempImage.jpg',
        };

        const formData = new FormData();
        formData.append('file', imageFile);
        request('/file/upload', {
          method: 'post',
          body: formData,
          file: true,
        }).then(res => {
          getImg(res.data);
        });
      });
  };

  const _onDragEvent = () => {
    console.log('dragged');
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={() => {}}>
      <View style={styles.overlay}>
        <View style={styles.optionsContainer}>
          <SignatureCapture
            ref={signRef}
            style={[{flex: 1}, styles.signature]}
            onSaveEvent={_onSaveEvent}
            onDragEvent={_onDragEvent}
            saveImageFileInExtStorage={false}
            showNativeButtons={false}
            showTitleLabel={false}
            viewMode={'portrait'}
          />
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              style={styles.buttonStyle}
              onPress={() => {
                close();
              }}>
              <Text>取消</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.buttonStyle}
              onPress={() => {
                saveSign();
              }}>
              <Text>确定</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.buttonStyle}
              onPress={() => {
                resetSign();
              }}>
              <Text>重置</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default Signature;

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
  signature: {
    flex: 1,
    borderColor: '#000033',
    borderWidth: 1,
  },
  buttonStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    backgroundColor: '#eeeeee',
    margin: 10,
  },
});
