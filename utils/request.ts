import {Alert} from 'react-native';
import qs from 'qs';
import {deleteToken, getToken} from './auth';
import config from './config';

const apiurl = config.apiUrl;

interface Config extends RequestInit {
  data?: object;
  params?: object;
}

export const request = async (
  endpoint: string,
  {data, params, ...customConfig}: Config = {},
) => {
  const token = getToken() || ""
  const config = {
    method: 'get',
    headers: {
      'content-type': 'application/json',
      Authorization: 'Bearer ' + token,
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
        await deleteToken();
        break;

      case 403:
        Alert.alert('', '当前操作没有权限，请联系管理员');
        await deleteToken();
        break;

      default:
        break;
    }

    if (response.ok) {
      const data = await response.json();
      if (data.code === 200) {
        console.log(data);
        return data;
      } else {
        console.log(data);

        Alert.alert('', data.msg);
        return Promise.reject(data);
      }
    } else {
      const data = await response.json();
      console.log(data);

      Alert.alert('', data.msg);
      return Promise.reject({msg: '请求出错'});
    }
  });
};
