/* eslint-disable prettier/prettier */
import React from 'react';
import { Breadcrumb } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { DEFAULT_PATHS } from 'config.js';

const BreadcrumbList = ({ items = [{ to: '/', text: 'Home' }], basePath = DEFAULT_PATHS.APP }) => {
  return (
    <Breadcrumb className="breadcrumb-container d-inline-block">
      {items.map((breadcrumb, bIndex) => (
        <Breadcrumb.Item key={`breadCrumb.${bIndex}`} linkAs={Link} linkProps={{ to: `${basePath}${breadcrumb.to}` }}>
          <h3>  {breadcrumb.title || breadcrumb.text} </h3>
        </Breadcrumb.Item>
      ))}
    </Breadcrumb>
  );
};
export default BreadcrumbList;
