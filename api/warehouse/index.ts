import {Params} from '../../types';
import {request} from '../../utils/request';

// 查询所有仓库
export const getWarehouse = () => request('/warehouse/listAll');

// 根据仓库id获取每种类型的物资数量
export const getMaterialDetail = (id: string) =>
  request('/material/getMaterialDetail/' + id);

// 分发管理 1：分发中，2：分发记录
export const getDistribute = async <T extends Params>(params: T) => {
  const res = await request('/distributeRecord/list', {params});

  const data = {...res, data: res.rows};

  return data;
};

// 退换管理 1：退换中 2：退换记录
export const getReturn = async <T extends Params>(params: T) => {
  const res = await request('/returnRecord/list', {
    params,
  });

  const data = {...res, data: res.rows};

  return data;
};

// 查询盘点
export const getInventory = async <T extends Params>(params: T) => {
  const res = await request('/inventoryRecord/list', {
    params,
  });

  const data = {...res, data: res.rows};

  return data;
};

// 报废管理 1：报废中 2：报废记录
export const getScrap = async <T extends Params>(params: T) => {
  const res = await request('/scrapRecord/list', {
    params,
  });

  const data = {...res, data: res.rows};

  return data;
};
