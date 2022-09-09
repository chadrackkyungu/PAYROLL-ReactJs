/* eslint-disable no-unneeded-ternary */
/* eslint-disable prettier/prettier */
import { lazy } from 'react';
import { DEFAULT_PATHS } from 'config.js';

//* Pages
const dashboard = lazy(() => import('views/dashboard/Index'));
const Private = lazy(() => import('views/dashboard/notifications/private'));
const Pending = lazy(() => import('views/dashboard/history/Pending-leaves'));
const Approved = lazy(() => import('views/dashboard/history/Approved-leaves'));
const Declined = lazy(() => import('views/dashboard/history/Decline-leaves'));

const employee = {
  notifications: lazy(() => import('views/dashboard/notifications/general')),
  payslip: lazy(() => import('views/dashboard/payslip/index')),
  leave: lazy(() => import('views/dashboard/leave/index')),
  history: lazy(() => import('views/dashboard/history/My-leaves')),
  calendar: lazy(() => import('views/dashboard/calendar/index')),
  profile: lazy(() => import('views/dashboard/Profile/index')),
};

const addEmployee = {
  announcement: lazy(() => import('views/dashboard/notifications/general')),
  PaySalary: lazy(() => import('views/dashboard/payslip/pay-employee')),
  PaymentHistory: lazy(() => import('views/dashboard/leave/index')),
  LeaveHistory: lazy(() => import('views/dashboard/history/My-leaves')),
  AddNewEmployee: lazy(() => import('views/dashboard/Add New Employee/index')),
  myEmployee: lazy(() => import('views/dashboard/Add New Employee/My-employees')),
};

const appRoot = DEFAULT_PATHS.APP.endsWith('/') ? DEFAULT_PATHS.APP.slice(1, DEFAULT_PATHS.APP.length) : DEFAULT_PATHS.APP;

const newObject = window.localStorage.getItem("persist:starter-project");
const user = JSON.parse(newObject);
const { currentUser } = JSON.parse(user?.auth)
const userRole = currentUser.data.user.role; console.log(userRole);

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
      label: 'Home',
      icon: 'shop',
    },

    {
      path: `${appRoot}/employee`,
      exact: true,
      redirect: true,
      to: `${appRoot}/employee/notifications`,
      label: 'Employee',
      icon: 'user',
      subs: [
        { path: '/notifications', label: 'My Notifications', component: employee.notifications },
        { path: '/payslip', label: 'My Payslip', component: employee.payslip },
        { path: '/leave', label: 'Apply for leave', component: employee.leave },
        { path: '/my-leaves', label: 'Leave History', component: employee.history },
        { path: '/calendar', label: 'My Calendar', component: employee.calendar },
        { path: '/profile', label: 'My Profile', component: employee.profile },
        { path: `/private`, component: Private },
        { path: `/pending-leave`, component: Pending },
        { path: `/approved-leave`, component: Approved },
        { path: `/decline-leave`, component: Declined },
      ],
    },

    (
      userRole === "admin" && {
        path: `${appRoot}/Admin`,
        exact: true,
        redirect: true,
        to: `${appRoot}/Admin/notifications`,
        label: 'Admin',
        icon: 'user',
        subs: [
          // { path: '/notifications', label: 'My Notifications', component: employee.notifications },
          // { path: '/payslip', label: 'My Payslip', component: employee.payslip },
          // { path: '/leave', label: 'Apply for leave', component: employee.leave },
          // { path: '/my-leaves', label: 'Leave History', component: employee.history },
          { path: '/announcement', label: 'Announcement', component: addEmployee.announcement },
          // { path: '/pay-salary', label: 'Pay Salary', component: addEmployee.PaySalary },
          { path: '/payment-history', label: 'Payment History', component: addEmployee.PaymentHistory },
          { path: '/leave-history', label: 'Leave History', component: addEmployee.LeaveHistory },
          { path: '/calendar', label: 'My Calendar', component: employee.calendar },
          { path: '/add-employee', label: 'My Employees', component: addEmployee.myEmployee },
          { path: '/profile', label: 'My Profile', component: employee.profile },
          { path: `/add-new-employee`, component: addEmployee.AddNewEmployee },
          { path: `/pay`, component: addEmployee.PaySalary },
          { path: `/private`, component: Private },
          { path: `/pending-leave`, component: Pending },
          { path: `/approved-leave`, component: Approved },
          { path: `/decline-leave`, component: Declined },
        ],
      }
    )
  ],
  sidebarItems: [],
};
export default routesAndMenuItems;
