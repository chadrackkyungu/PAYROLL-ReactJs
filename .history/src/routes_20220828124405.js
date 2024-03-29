import { lazy } from 'react';
import { DEFAULT_PATHS } from 'config.js';

//* Pages
const dashboard = lazy(() => import('views/dashboard/Index'));
const Private = lazy(() => import('views/dashboard/notifications/private'));

const employee = {
  notifications: lazy(() => import('views/dashboard/notifications/general')),
  payslip: lazy(() => import('views/dashboard/payslip/index')),
  leave: lazy(() => import('views/dashboard/leave/index')),
  history: lazy(() => import('views/dashboard/history/My-leaves')),
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
      path: `${appRoot}/employee`,
      exact: true,
      redirect: true,
      to: `${appRoot}/employee/notifications`,
      label: 'Employee',
      icon: 'grid-3',
      subs: [
        { path: '/notifications', label: 'My Notifications', component: employee.notifications },
        { path: '/payslip', label: 'My Payslip', component: employee.payslip },
        { path: '/leave', label: 'Apply for leave', component: employee.leave },
        { path: '/my-leaves', label: 'My History', component: employee.history },
        { path: '/calendar', label: 'My Calendar', component: employee.calendar },
        { path: '/profile', label: 'My Profile', component: employee.profile },
        { path: `/private`, component: Private },
        { path: `/pending-leave`, component: Private },
        { path: `/approved-leave`, component: Private },
        { path: `/decline-leave`, component: Private },
      ],
    },
  ],
  sidebarItems: [],
};
export default routesAndMenuItems;
