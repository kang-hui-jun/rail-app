import {request} from '../utils/request';

export const getDictData = (dictCode: string) =>
  request('/system/dict/data/type/' + dictCode);
