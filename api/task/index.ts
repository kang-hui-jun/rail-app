import {request} from '../../utils/request';

type Params = object | undefined;

// 分页查询作业
export const getTaskList = <T extends Params>(params: T) => {
  return request('/plan/appList', {method: 'post', params});
};

// 获取作业信息
export const getTaskDetail = <T extends Params>(data: T) => {
  return request('/planWork/get', {method: 'post', data});
};

// 结束作业
export const finishTask = <T extends Params>(data: T) => {
  return request('/planWork/finish', {method: 'post', data});
};

// 结束小组作业
export const finishGroupTask = <T extends Params>(data: T) => {
  return request('/planWork/groupFinishPic', {
    method: 'post',
    data,
  });
};

// 查询告警记录
export const getOneWorkWarn = (id: number) =>
  request('/planWork/getOneWorkWarn/' + id);

// 更新工场清单及电子签名
export const updateSignature = <T extends Params>(data: T) => {
  return request('/planWork/signature', {method: 'post', data});
};

// 查询是否有遗漏工器具
export const getWorkForFinish = (id: number) =>
  request('/planWork/getWorkForFinish/' + id);
