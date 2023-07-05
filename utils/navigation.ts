import { NavigationContainerRef } from '@react-navigation/native';
import React from 'react';

// 创建一个引用对象
export const navigationRef = React.createRef<NavigationContainerRef<any>>();

// 导出一个方法，用于执行导航操作
export function navigate(name: string, params?: object) {
  navigationRef.current?.navigate(name, params);
}
