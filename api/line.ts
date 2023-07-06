import {request} from '../utils/request';

export const getLine = () => {
  return request('/metroController/getMetroList', {
    method: 'post',
  });
};
