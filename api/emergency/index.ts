import {Params} from '../../types';
import {request} from '../../utils/request';

// 查询应急事件列表
export const getEmergencyEventList = async <T extends Params>(params: T) => {
  const res = await request('/emergencyEvent/list', {
    params,
  });

  const data = {...res, data: res.rows};

  return data;
};

// 查询应急演练列表
export const getEmergencyDrillList = async <T extends Params>(params: T) => {
  const res = await request('/emergencyDrill/list', {
    params,
  });

  const data = {...res, data: res.rows};

  return data;
};

// 0 抢修 1演练

// 新增应急抢修事件
export const addEmergencyEvent = <T extends Params>(data: T) =>
  request('/emergencyEvent/save', {
    method: 'post',
    data,
  });

// 新增应急演练事件
export const addEmergencyDrill = <T extends Params>(data: T) =>
  request('/emergencyDrill/save', {
    method: 'post',
    data,
  });
