import { Params } from '../../types';
import {request} from '../../utils/request';

// 分页查询作业
export const getTaskList = <T extends Params>(params: T) => {
  return request('/InspectionPlan/appList', {method: 'post', params});
};

// 获取作业信息
export const getTaskDetail = <T extends Params>(data: T) => {
  return request('/InspectionWork/get', {method: 'post', data});
};

// 结束作业
export const finishTask = <T extends Params>(data: T) => {
  return request('/InspectionWork/finish', {method: 'post', data});
};
