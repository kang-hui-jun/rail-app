import {request} from '../../utils/request';

interface Param {
  index: number;
  size: number;
}

export const getNoticeList = async (param: Param) => {
  const res = await request('/messageController/getMessagePageByFilter', {
    method: 'post',
    data: {
      pageNum: param.index,
      pageSize: param.size,
    },
  });

  const data = {...res.data, data: res.data.list};

  return data;
};
