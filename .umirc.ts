import { defineConfig } from '@umijs/max';

export default defineConfig({
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  layout: {},
  routes: [
    {
      path: '/',
      redirect: '/algorithmInt',
    },
    {
      name: 'login',
      path: '/login',
      component: './Login',
      hideInMenu: true,
      menuRender: false,
      headerRender: false,
    },
    {
      name: 'HooksInt',
      path: '/hooksInt',
      component: './HooksInt',
    },
    {
      name: 'ComponentsInt',
      path: '/componentsInt',
      component: './ComponentsInt',
    },
    {
      name: 'TestInt',
      path: '/testInt',
      component: './TestInt',
    },
    {
      name: 'AlgorithmInt',
      path: '/algorithmInt',
      component: './AlgorithmInt',
    },
    {
      name: 'TsInt',
      path: '/tsInt',
      component: './TsInt',
    },
    {
      name: 'ReactInt',
      path: '/reactInt',
      component: './ReactInt',
    },
    {
      name: 'SlowRender',
      path: '/slowRender',
      component: './SlowRender',
    },
  ],
  npmClient: 'yarn',
});
