import { defineConfig } from '@umijs/max';

export default defineConfig({
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  layout: {
    title: '@umijs/max',
  },
  routes: [
    {
      path: '/',
      redirect: '/algorithm',
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
      path: '/algorithm',
      component: './Algorithm',
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
