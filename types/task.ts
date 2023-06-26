export type Person = {
  id: number;
  personId: number;
  personName: string;
};

export type Group = {
  id: number;
  groupName: string;
  leaderName: string;
  status: number;
  personList: Person[]
};

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
  groupList: Group[];
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
  };
};

export type TaskType = {
  id: number;
  type: string;
};
