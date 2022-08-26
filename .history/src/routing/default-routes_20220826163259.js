import { lazy } from 'react';
// import { DEFAULT_PATHS } from 'config.js';

//* Importing pages components
const NotFound = lazy(() => import('views/default/NotFound'));
const Login = lazy(() => import('views/default/Login'));
const ForgotPassword = lazy(() => import('views/default/ForgotPassword'));
const Register = lazy(() => import('views/default/Register'));
const ResetPassword = lazy(() => import('views/default/ResetPassword'));
const Unauthorized = lazy(() => import('views/default/Unauthorized'));
const InvalidAccess = lazy(() => import('views/default/InvalidAccess'));
const App = lazy(() => import('App.js'));
const Home = lazy(() => import('views/default/Home'));

//*  Pages routings
const defaultRoutes = [
  { path: '/page-not-found', exact: true, component: NotFound },
  { path: '/login', exact: true, component: Login },
  { path: '/register', exact: true, component: Register },
  { path: '/forgot-password', exact: true, component: ForgotPassword },
  { path: '/reset-password', exact: true, component: ResetPassword },
  { path: '/unauthorized', exact: true, component: Unauthorized },
  { path: '/invalid-access', exact: true, component: InvalidAccess },
  { path: '/', component: App },
  { path: '/', exact: true, component: Home },
];

export default defaultRoutes;
