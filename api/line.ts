import {Params} from '../types';
import {request} from '../utils/request';

export const getLine = () => {
  return request('/metroController/getMetroList', {
    method: 'post',
  });
};

// 根据线路id获取站台
export const getMetroPlatform = <T extends Params>(params: Params) =>
  request('/metroController/getMetroPlatformList', {
    method: 'post',
    params,
  });
