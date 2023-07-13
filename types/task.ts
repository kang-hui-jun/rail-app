import {Disease} from './disease';

export type Person = {
  id: number;
  personId: number;
  personName: string;
};

export type Group = {
  id: string;
  groupName: string;
  leaderName: string;
  status: number;
  personList: Person[];
  leader: string;
  groupPersonList?: Person[];
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
  diseaseList: Disease[];
};

export type TaskType = {
  id: string;
  type: string;
};

export type CreateTask<T> = {
  name: string;
  num: string;
  typeList: T[];
  lineId: string;
  pleaseStand: string;
  pinStand: string;
  workAddr: string;
  leaderPerson: string;
  safePerson: string;
  dateTime: string;
  workTime: string;
  deptId: string;
  workContent: string;
};
