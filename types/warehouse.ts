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

export type Return = {
  id: number;
  status: number;
  returnWarehouseName: string;
  receiveWarehouseName: string;
  userName: string;
  createTime: string;
};

export type Inventory = {
  id: number;
  warehouseName: string;
  warehouseAddress: string;
  userName: string;
  createTime: string;
};

export type Scrap = Inventory & {
  status: number;
};
