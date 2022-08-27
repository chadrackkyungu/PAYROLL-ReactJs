import { lazy } from 'react';
import { DEFAULT_PATHS } from 'config.js';

//* Pages
const dashboard = lazy(() => import('views/dashboard/Index'));

const employee = {
  notifications: lazy(() => import('views/dashboard/notifications/index')),
  payslip: lazy(() => import('views/dashboard/payslip/index')),
  leave: lazy(() => import('views/dashboard/leave/index')),
  history: lazy(() => import('views/dashboard/history/index')),
  calendar: lazy(() => import('views/dashboard/calendar/index')),
  profile: lazy(() => import('views/dashboard/Profile/index')),
};

const appRoot = DEFAULT_PATHS.APP.endsWith('/') ? DEFAULT_PATHS.APP.slice(1, DEFAULT_PATHS.APP.length) : DEFAULT_PATHS.APP;

const routesAndMenuItems = {
  mainMenuItems: [
    {
      path: DEFAULT_PATHS.APP,
      exact: true,
      redirect: true,
      to: `${appRoot}/dashboard`,
    },
    {
      path: `${appRoot}/dashboard`,
      component: dashboard,
      label: 'menu.dashboard',
      icon: 'shop',
    },
    {
      path: `${appRoot}/dashboard`,
      component: dashboard,
      label: 'menu.dashboard',
      icon: 'grid-3',
      subs: [
        { path: '', label: 'menu.home' },
        { path: '/notifications', label: 'menu.notifications', component: employee.notifications },
        { path: '/payslip', label: 'payslip', component: employee.payslip },
        { path: '/leave', label: 'leave', component: employee.leave },
        { path: '/history', label: 'history', component: employee.history },
        { path: '/calendar', label: 'menu.calendar', component: employee.calendar },
        { path: '/profile', label: 'menu.profile', component: employee.profile },
      ],
    },
  ],
  sidebarItems: [],
};
export default routesAndMenuItems;
