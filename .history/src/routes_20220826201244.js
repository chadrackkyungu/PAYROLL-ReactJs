import { lazy } from 'react';
import { DEFAULT_PATHS } from 'config.js';
// import HorizontalPage from 'views/Horizontal';
// import horizontal from 'views/horizontal';

//* Pages
const dashboard = lazy(() => import('views/dashboard/Index'));
const notifications = lazy(() => import('views/dashboard/notifications/index'));
const payslip = lazy(() => import('views/dashboard/payslip/index'));
const leave = lazy(() => import('views/dashboard/leave/index'));
const history = lazy(() => import('views/dashboard/history/index'));
const calendar = lazy(() => import('views/dashboard/calendar/index'));
const profile = lazy(() => import('views/dashboard/Profile/index'));


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
        { path: '/payslip', label: 'payslip', component: payslip },
        { path: '/leave', label: 'leave', component: leave },
        { path: '/history', label: 'history', component: history },
        { path: '/calendar', label: 'menu.calendar', component: calendar },
        { path: '/profile', label: 'menu.profile', component: profile },
      ],
    },
  ],
  sidebarItems: [],
};
export default routesAndMenuItems;
