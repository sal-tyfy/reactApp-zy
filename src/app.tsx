// 运行时配置

import { history, RunTimeLayoutConfig, RequestConfig } from '@umijs/max';
import { message, Result } from 'antd';
import { isInAdmin } from './utils';
import { needLogin } from './utils/login';

interface ResponseDataType {
  success: boolean;
  message: string;
}

// 运行时配置
export const request: RequestConfig = {
  // 响应拦截器
  responseInterceptors: [
    (response) => {
      // 拦截响应数据，进行个性化处理
      const data = response.data as ResponseDataType;
      if (!data.success) {
        message.error(data.message);
      }
      return response;
    },
  ],
};

// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
// 更多信息见文档：https://umijs.org/docs/api/runtime-config#getinitialstate
export async function getInitialState() {
  if (needLogin()) {
    history.push('/login');
  }
}

export const layout: RunTimeLayoutConfig = () => {
  return {
    menu: {
      locale: false,
    },
    layout: 'mix',
    headerTitleRender: () => {
      return (
        <div
          style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
          onClick={(e) => {
            e.stopPropagation();
            if (isInAdmin()) {
              history.push('/admin');
            } else {
              history.push('/');
            }
          }}
        >
          <img
            style={{ marginRight: 8, marginLeft: 8 }}
            src="https://img.alicdn.com/tfs/TB1YHEpwUT1gK0jSZFhXXaAtVXa-28-27.svg"
          ></img>
          <span style={{ fontSize: 24, fontWeight: 500 }}>Int</span>
        </div>
      );
    },
    childrenRender: (dom) => {
      if (needLogin() && !location.pathname.startsWith('/login')) {
        return <Result status={'403'} />;
      }
      return <div>{dom}</div>;
    },
  };
};
