import AsyncStorage from '@react-native-async-storage/async-storage';
import {LoginForm} from '../types/login-form';
import config from './config';
import {Alert} from 'react-native';

export const setToken = async (token: string) =>
  await AsyncStorage.setItem('token', JSON.stringify(token));
export const getToken = async () => await AsyncStorage.getItem('token');
export const deleteToken = () => AsyncStorage.removeItem('token');

export const storeData = async (value: string) => {
  try {
    await AsyncStorage.setItem('token', value);
  } catch (e) {
    // saving error
  }
};

export const getData = async () => {
  try {
    const value = await AsyncStorage.getItem('token');
    if (value !== null) {
      // value previously stored
      return value;
    }
  } catch (e) {
    // error reading value
  }
};

const {apiUrl} = config;

export const login = (form: LoginForm) => {
  return fetch(`${apiUrl}/login`, {
    method: 'post',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(form),
  }).then(async res => {
    if (res.ok) {
      const data = await res.json();
      if (data.code === 200) {
        await storeData(data.token);
        return data;
      }
      Alert.alert('', data.msg);
    } else {
      Alert.alert('', "后端接口连接异常");
      return Promise.reject(await res.json());
    }
  });
};
