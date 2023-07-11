import {Params} from '../../types';
import {request} from '../../utils/request';

// 分页查询作业
export const getTaskList = <T extends Params>(params: T) => {
  return request('/InspectionPlan/appList', {method: 'post', params});
};

// 获取作业信息
export const getTaskDetail = <T extends Params>(data: T) => {
  return request('/InspectionWork/get', {method: 'post', data});
};

// 查询单个巡检的所有告警信息
export const getOneWorkWarn = (id: number) =>
  request('/InspectionWork/getOneWorkWarn/' + id);

// 结束作业
export const finishTask = <T extends Params>(data: T) => {
  return request('/InspectionWork/finish', {method: 'post', data});
};

// 查询巡检类型
export const getInspectionType = () => {
  return request('/InspectionType/getAll', {
    method: 'post',
  });
};

// 新增巡检作业
export const addInspection = <T extends Params>(data: T) => {
  return request('/InspectionWork/save', {
    method: 'post',
    data,
  });
};

// 获取巡检作业详情
export const getInspectionTaskDetail = <T extends Params>(data: T) => {
  return request('/InspectionWork/get', {
    method: 'post',
    data,
  });
};

// 获取巡检计划详情
export const getInspectionPlanDetail = (id: number) => {
  return request('/InspectionWork/get/' + id);
};

// 结束巡检作业
export const finish = <T extends Params>(data: T) => {
  return request('/InspectionWork/finish', {
    method: 'post',
    data,
  });
};

// 获取设备
export const getInspectionInfo = <T extends Params>(params: T) => {
  return request('/hard/seperate/getInspectionInfo/1', {
    params,
  });
};

// 根据条件获取工区
export const getMetroWorkAreaList = <T extends Params>(params: T) =>
  request('/metroController/getMetroWorkAreaList', {
    method: 'post',
    params,
  });
