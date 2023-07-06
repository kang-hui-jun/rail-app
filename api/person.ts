import { request } from "../utils/request";

export const getPerson = () => request('/system/person/getAllPerson')