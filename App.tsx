import React, {useEffect} from 'react';
import {AppProvider, useAuth} from './store';
import {AuthenticatedApp} from './AuthenticatedApp';
import {Login} from './pages/login';
import {NativeEventEmitter, NativeModules, View} from 'react-native';
import ScanDeviceModule from './ToastExample';
import ImagePicker from 'react-native-image-crop-picker';
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
  // });

  return (
    <AppProvider>
      <View style={{flex: 1}}>
        <AuthenticatedApp />
      </View>
    </AppProvider>
  );
}

export default App;
