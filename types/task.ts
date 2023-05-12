export type Task = {
  id: number;
  name: string;
  type: number;
  status: number;
  pleaseName: string;
  num: string;
  leaderPersonName: string;
  pinName: string;
  workContent: string;
  groupList: {
    id: number;
    groupName: string;
    leaderName: string;
  }[];
  diseaseList: {
    id: number;
    diseaseMouldName: string;
    diseaseLevel: number;
    status: number;
    remark: string;
    lineName: string;
    lineTypeName: string;
    travelTypeName: string;
    workAreaName: string;
    mileage: string;
  }[];
};
