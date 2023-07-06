import { request } from "../utils/request";

export const getDept = () => request('/system/user/deptTree')