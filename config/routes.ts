export const routes = [
  {
    path: '/',
    redirect: '/algorithmInt',
  },
  {
    path: '/admin',
    redirect: '/admin/question',
  },
  {
    name: 'admin',
    path: '/admin',
    access: 'canSeeAdmin',
    flatMenu: true,
    routes: [
      {
        name: '问题列表',
        path: '/admin/question',
        component: './Admin/QuestionList',
      },
      {
        name: '角色管理',
        path: '/admin/role',
        component: './Admin/RoleList',
      },
    ],
  },
  {
    name: 'MySqlInt',
    path: '/mySqlInt',
    access: 'canSeeFront',
    component: './MySqlInt',
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
    access: 'canSeeFront',
    path: '/hooksInt',
    component: './HooksInt',
  },
  {
    name: 'ComponentsInt',
    access: 'canSeeFront',
    path: '/componentsInt',
    component: './ComponentsInt',
  },
  {
    name: 'TestInt',
    access: 'canSeeFront',
    path: '/testInt',
    component: './TestInt',
  },
  {
    name: 'AlgorithmInt',
    access: 'canSeeFront',
    path: '/algorithmInt',
    component: './AlgorithmInt',
  },
  {
    name: 'TsInt',
    access: 'canSeeFront',
    path: '/tsInt',
    component: './TsInt',
  },
  {
    name: 'ReactInt',
    access: 'canSeeFront',
    path: '/reactInt',
    component: './ReactInt',
  },
  {
    name: 'SlowRender',
    access: 'canSeeFront',
    path: '/slowRender',
    component: './SlowRender',
  },
];
