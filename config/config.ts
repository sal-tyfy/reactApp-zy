import { routes } from './routes';
import { defineConfig } from '@umijs/max';

export default defineConfig({
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  layout: {},
  routes: routes,
  npmClient: 'yarn',
  locale: {
    default: 'zh-CN',
    baseSeparator: '-',
    antd: true,
    baseNavigator: false,
  },
  proxy: {
    '/api': {
      target: 'http://localhost:8080',
      changeOrigin: true,
    },
  },
});
