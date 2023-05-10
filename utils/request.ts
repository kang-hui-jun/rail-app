import qs from 'qs';
import {deleteToken, getToken} from './auth';
import config from './config';

const apiurl = config.apiUrl;

interface Config extends RequestInit {
  data?: object;
  params?: object;
}

export const request = (
  endpoint: string,
  {data, params, ...customConfig}: Config = {},
) => {
  const config = {
    method: 'get',
    headers: {
      'content-type': 'application/json',
      Authorization: 'Bearer ' + getToken() || '',
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
    if (response.status === 401) {
      await deleteToken();
      return Promise.reject({message: '请重新登录'});
    }
    const data = await response.json();
    if (response.ok) {
      return data;
    } else {
      return Promise.reject(data);
    }
  });
};
