import {request} from '../../utils/request';

interface Param {
  index: number;
  size: number;
}

export const getMyTaskList = async (param: Param) => {
  const res = await request('/processTaskController/getMyTaskList', {
    method: 'post',
    data: {
      pageNum: param.index,
      pageSize: param.size,
    },
  });

  const data = {...res.data, data: res.data.list};

  return data;
};

// 查询列表
// export function getMyTaskList(data) {
//     return request({
//       url: "/processTaskController/getMyTaskList",
//       method: "post",
//       data: data,
//     });
//   }
//   // 审核
//   export function completeTask(data) {
//     return request({
//       url: "/processTaskController/completeTask",
//       method: "post",
//       data: data,
//     });
//   }
