/* eslint-disable prettier/prettier */
import React from 'react';
import { Link } from 'react-router-dom';
import { DEFAULT_PATHS } from 'config.js';

const NavLogo = () => {
  return (
    <div className="logo position-relative">
      <Link to={DEFAULT_PATHS.APP}>
        <img src="/img/logo/logo-light-png.png" alt="logo" width={100} />
        <div className="img" />
      </Link>
    </div>
  );
};
export default React.memo(NavLogo);
