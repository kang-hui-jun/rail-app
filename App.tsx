import React from 'react';
import {AppProvider, useAuth} from './store';
import {AuthenticatedApp} from './AuthenticatedApp';
import {Login} from './pages/login';
import {View} from 'react-native';
import ScanDeviceModule from './ToastExample';
import ImagePicker from 'react-native-image-crop-picker';
// import {Camera, useCameraDevices} from 'react-native-vision-camera';

const Store = () => {
  const context = useAuth();

  // const devices = useCameraDevices('wide-angle-camera');
  // const device = devices.back;

  // if (device == null) return <View />;

  // ScanDeviceModule.initDevice();
  // ScanDeviceModule.open915(33, () => {
  //   console.log('成功');
  //   ScanDeviceModule.startScan915()
  // }, () => {
  //   console.log('失败');

  // })

  // ScanDeviceModule.set915Listener((msg: string) => {
  //   console.log(msg);

  // })


  // 调相机
  // ImagePicker.openCamera({
  //   width: 300,
  //   height: 400,
  //   cropping: true,
  // }).then(image => {
  //   console.log(image);
  // });

  return (
    <View style={{flex: 1}}>
      {/* <Camera device={device} isActive={true} /> */}
      {context?.user ? <AuthenticatedApp /> : <Login />}
    </View>
  );
};

function App(): JSX.Element {
  return (
    <AppProvider>
      <Store />
    </AppProvider>
  );
}

export default App;
