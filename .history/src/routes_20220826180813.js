import { DEFAULT_PATHS } from 'config.js';

import HorizontalPage from 'views/Horizontal';
import Dashboard from 'views/dashboard/dashboard';

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
      label: 'menu.dashboard',
      icon: 'grid-3',
      component: Dashboard,
    },
  ],
  sidebarItems: [],
};
export default routesAndMenuItems;
