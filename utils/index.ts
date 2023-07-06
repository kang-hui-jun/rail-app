import {Dept} from '../types/dept';

export const treeToArray = (tree: Dept[]) => {
  let res: Omit<Dept, 'children'>[] = [];
  for (const item of tree) {
    const {children, ...i} = item;
    if (children && children.length) {
      res = res.concat(treeToArray(children));
    }
    res.push(i);
  }
  return res;
};
