export type Warehouse = {
  id: string;
  name: string;
};

export type Distribute = {
  id: number;
  status: number;
  distributeWarehouseName: string;
  receiveWarehouseName: string;
  distributeUserName: string;
  statusName: string;
  createTime: string;
};

export type Material = {
  id: string;
  specsModel: string;
  materialTypeName: string;
  count: string;
};
