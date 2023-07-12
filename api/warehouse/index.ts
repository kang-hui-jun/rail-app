import {Params} from '../../types';
import {request} from '../../utils/request';

// 查询所有仓库
export const getWarehouse = () => request('/warehouse/listAll');

// 分发记录 1：分发中，2：分发记录
export const getDistribute = async <T extends Params>(params: T) => {
  const res = await request('/distributeRecord/list', {params});

  const data = {...res, data: res.rows};

  return data;
};

// 根据仓库id获取每种类型的物资数量
export const getMaterialDetail = (id: string) =>
  request('/material/getMaterialDetail/' + id);
