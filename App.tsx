import React, {useEffect} from 'react';
import {AppProvider, useAuth} from './store';
import {AuthenticatedApp} from './AuthenticatedApp';
import {Login} from './pages/login';
import {NativeEventEmitter, NativeModules, View} from 'react-native';
import ScanDeviceModule from './ToastExample';
import ImagePicker from 'react-native-image-crop-picker';
import RNFetchBlob from 'rn-fetch-blob';
import {request} from './utils/request';
// import {Camera, useCameraDevices} from 'react-native-vision-camera';

function App(): JSX.Element {
  // useEffect(() => {
  //   ScanDeviceModule.initDevice();
  //   ScanDeviceModule.open915(
  //     33,
  //     () => {
  //       console.log('成功');
  //       ScanDeviceModule.startScan915();
  //     },
  //     () => {
  //       console.log('失败');
  //     },
  //   );

  //   const eventEmitter = new NativeEventEmitter(NativeModules.ScanDeviceModule);
  //   eventEmitter.addListener('tagEvent', event => {
  //     console.log(event);
  //   });

  //   return () => {
  //     ScanDeviceModule.close915();
  //   };
  // }, []);

  // 调相机
  // ImagePicker.openCamera({
  //   width: 300,
  //   height: 400,
  //   cropping: true,
  // }).then(image => {
  //   console.log(image);
  //   convertImageToFile(image.path);
  // });

  // const convertImageToFile = (imagePath: string) => {
  //   const tempImageFilePath =
  //     RNFetchBlob.fs.dirs.DocumentDir + '/tempImage.jpg';

  //   RNFetchBlob.fs
  //     .readFile(imagePath, 'base64')
  //     .then(data => {
  //       return RNFetchBlob.fs.writeFile(tempImageFilePath, data, 'base64');
  //     })
  //     .then(() => {
  //       const imageFile = {
  //         uri: 'file://' + tempImageFilePath,
  //         type: 'image/jpeg',
  //         name: 'tempImage.jpg',
  //       };
  //       console.log('Converted image file:', imageFile);
  //       const formData = new FormData();
  //       formData.append('file', imageFile);
  //       request('/file/upload', {
  //         method: 'post',
  //         body: formData,
  //         headers: {
  //           'Content-Type': 'multipart/form-data',
  //           Authorization: 'eyJhbGciOiJIUzUxMiJ9.eyJsb2dpbl91c2VyX2tleSI6IjJjZjViMTE2LTdiZmEtNDc0Mi04NGM0LWFlYzZjMmNkOGE4ZiJ9.k_GoZuMbSr_tDO4aqTSmN4d_g99MkV4mzvvmyrpQJOw-sVVharod3ou7dFhGPZUnuTrB0LdHZK5aTCafhVFJ3A'
  //         },
  //       }).then(res => {
  //         console.log(res);
  //       });
  //     })
  //     .catch(error => {
  //       console.log('Error converting image to file:', error);
  //     });
  // };

  return (
    <AppProvider>
      <View style={{flex: 1}}>
        <AuthenticatedApp />
      </View>
    </AppProvider>
  );
}

export default App;
