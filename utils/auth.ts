import AsyncStorage from '@react-native-async-storage/async-storage';
import {LoginForm} from '../types/login-form';
import config from './config';

export const setToken = (token: string) => AsyncStorage.setItem('token', token);
export const getToken = () => AsyncStorage.getItem('token');
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
      console.log('成功');

      return await res.json();
    } else {
      return Promise.reject(await res.json());
    }
  });
};
