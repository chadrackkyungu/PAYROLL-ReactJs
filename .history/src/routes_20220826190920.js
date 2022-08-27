import { lazy } from 'react';
import { DEFAULT_PATHS } from 'config.js';
// import HorizontalPage from 'views/Horizontal';
// import horizontal from 'views/horizontal';

//* Pages
const dashboard = lazy(() => import('views/dashboard/Index'));
const notifications = lazy(() => import('views/dashboard/notifications/index'));


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
        { path: '', label: 'menu.home' },
        { path: '/notifications', label: 'notifications', component: notifications },
        { path: '/payslip', label: 'payslip', component: "products.detail" },
        { path: '/leave', label: 'leave', component: "products.detail" },
        { path: '/history', label: 'history', component: "products.detail" },
        { path: '/calendar', label: 'menu.calendar', component: "products.list" },
        { path: '/profile', label: 'menu.profile', component: "products.list" },
      ],
    },
  ],
  sidebarItems: [],
};
export default routesAndMenuItems;
