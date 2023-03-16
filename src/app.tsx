// 运行时配置

import { history, RunTimeLayoutConfig } from '@umijs/max';
import { Result } from 'antd';
import { needLogin } from './utils/login';

// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
// 更多信息见文档：https://umijs.org/docs/api/runtime-config#getinitialstate
export async function getInitialState() {
  if (needLogin()) {
    history.push('/login');
  }
}

export const layout: RunTimeLayoutConfig = () => {
  return {
    logo: 'https://img.alicdn.com/tfs/TB1YHEpwUT1gK0jSZFhXXaAtVXa-28-27.svg',
    title: 'Int',
    menu: {
      locale: false,
    },
    layout: 'mix',
    childrenRender: (dom) => {
      if (needLogin() && !location.pathname.startsWith('/login')) {
        return <Result status={'403'} />;
      }
      return <div>{dom}</div>;
    },
  };
};
