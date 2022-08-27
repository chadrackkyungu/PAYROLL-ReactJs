import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import Layout from 'layout/Layout';
import { useHistory } from 'react-router-dom';

// import routing modules
import RouteIdentifier from 'routing/components/RouteIdentifier';
import { getRoutes } from 'routing/helper';
import routesAndMenuItems from 'routes.js';
import Loading from 'components/loading/Loading';

const App = () => {
  const history = useHistory();
  const { currentUser, isLogin } = useSelector((state) => state.auth);
  console.log(currentUser && isLogin);

  if (!currentUser && isLogin) {
    history.push('/login');
  }

  const routes = useMemo(() => getRoutes({ data: routesAndMenuItems, isLogin, userRole: currentUser.role }), [isLogin, currentUser]);
  if (routes) {
    return (
      <Layout>
        <RouteIdentifier routes={routes} fallback={<Loading />} />
      </Layout>
    );
  }
  return <></>;
};

export default App;
