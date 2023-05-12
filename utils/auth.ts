import AsyncStorage from '@react-native-async-storage/async-storage';
import {LoginForm} from '../types/login-form';
import config from './config';
import {Alert} from 'react-native';

export const setToken = async (token: string) => await AsyncStorage.setItem('token', JSON.stringify(token));
export const getToken = async () => await AsyncStorage.getItem('token');
export const deleteToken = () => AsyncStorage.removeItem('token');

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
        await setToken(data.token)
        return await res.json();
      }
      Alert.alert('', data.msg);
    } else {
      return Promise.reject(await res.json());
    }
  });
};
