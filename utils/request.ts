import {Alert} from 'react-native';
import qs from 'qs';
import RNRestart from 'react-native-restart';
import {deleteToken, getData, getToken} from './auth';
import config from './config';

const apiurl = config.apiUrl;

interface Config extends RequestInit {
  data?: object;
  params?: object;
  file?: boolean;
}

export const request = async (
  endpoint: string,
  {data, params, file = false, ...customConfig}: Config = {},
) => {
  const config = {
    method: 'get',
    headers: {
      'content-type': file ? 'multipart/form-data' : 'application/json',
      Authorization: 'Bearer ' + (await getData()) || '',
    },
    ...customConfig,
  };

  if (data) {
    config.body = JSON.stringify(data);
  }

  if (params) {
    endpoint += `?${qs.stringify(params)}`;
  }

  return fetch(`${apiurl}${endpoint}`, config).then(async response => {
    switch (response.status) {
      case 401:
        Alert.alert('', '登录状态已过期，请重新登录');
        RNRestart.Restart();
        break;

      case 403:
        Alert.alert('', '当前操作没有权限，请联系管理员');
        break;

      default:
        break;
    }

    if (response.ok) {
      const data = await response.json();
      if (data.code === 200) {
        return data;
      } else {
        Alert.alert('', data.msg || "系统未知错误，请反馈给管理员");
        return Promise.reject(data);
      }
    } else {
      const data = await response.json();
      Alert.alert('', data.msg || "系统未知错误，请反馈给管理员");
      return Promise.reject({msg: '请求出错'});
    }
  });
};
