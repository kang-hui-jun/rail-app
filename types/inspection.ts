export type Inspection = {
  id: number;
  name: string;
  lineName: string;
  status: number;
  num: string;
  inspectionTime: string;
  inspectionAddr: string;
  type: number;
  personListVo: {personName: string}[];
};
