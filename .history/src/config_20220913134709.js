import { LAYOUT, MENU_BEHAVIOUR, NAV_COLOR, MENU_PLACEMENT, RADIUS, THEME_COLOR } from 'constants.js';

export const IS_DEMO = true;
export const IS_AUTH_GUARD_ACTIVE = true;
export const SERVICE_URL = '/app';
export const USE_MULTI_LANGUAGE = true;

//* THIS IS THE NAME OF THE TITLE INSIDE THE HEADER
export const REACT_HELMET_PROPS = {
  defaultTitle: 'Payroll',
  titleTemplate: '%s | Payroll',
};

//* This is url path name
export const DEFAULT_PATHS = {
  APP: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password',
  USER_WELCOME: '/dashboards/default',
  NOTFOUND: '/page-not-found',
  UNAUTHORIZED: '/unauthorized',
  INVALID_ACCESS: '/invalid-access',
};

export const DEFAULT_SETTINGS = {
  MENU_PLACEMENT: MENU_PLACEMENT.Horizontal,
  MENU_BEHAVIOUR: MENU_BEHAVIOUR.Pinned,
  LAYOUT: LAYOUT.Boxed,
  RADIUS: RADIUS.Rounded,
  COLOR: THEME_COLOR.LightRed,
  NAV_COLOR: NAV_COLOR.Default,
  USE_SIDEBAR: false,
};

//* THE SIDEBAR USER PROFILE 
export const DEFAULT_USER = {
  // id: 1,
  // name: 'Lisa Jackson',
  // thumb: '/img/profile/profile-9.webp',
  // role: USER_ROLE.Admin,
  // email: 'lisajackson@gmail.com',
};

export const REDUX_PERSIST_KEY = 'starter-project';
