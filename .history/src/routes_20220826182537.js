import { lazy } from 'react';
import { DEFAULT_PATHS } from 'config.js';
// import HorizontalPage from 'views/Horizontal';
// import horizontal from 'views/horizontal';

const dashboard = lazy(() => import('views/dashboard/Dashboard'));

const appRoot = DEFAULT_PATHS.APP.endsWith('/') ? DEFAULT_PATHS.APP.slice(1, DEFAULT_PATHS.APP.length) : DEFAULT_PATHS.APP;

const routesAndMenuItems = {
  mainMenuItems: [
    {
      path: DEFAULT_PATHS.APP,
      exact: true,
      redirect: true,
      to: `${appRoot}/dashboard`,
    },
    // {
    //   path: `${appRoot}/horizontal`,
    //   component: HorizontalPage,
    //   label: 'menu.horizontal',
    //   icon: 'grid-2',
    // },
    {
      path: `${appRoot}/dashboard`,
      component: dashboard,
      label: 'menu.dashboard',
      icon: 'grid-3',
      subs: [
        { path: '/list', label: 'menu.list', component: "products.list" },
        { path: '/detail', label: 'menu.detail', component: "products.detail" },
      ],
    },
  ],
  sidebarItems: [],
};
export default routesAndMenuItems;
