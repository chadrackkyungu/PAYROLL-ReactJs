import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import HtmlHead from 'components/html-head/HtmlHead';
import BreadcrumbList from 'components/breadcrumb-list/BreadcrumbList';
import useCustomLayout from 'hooks/useCustomLayout';
import { MENU_PLACEMENT, LAYOUT } from 'constants.js';

const VerticalPage = () => {
  const title = 'Home Page';
  const description = 'An empty page with a fluid vertical layout.';

  const breadcrumbs = [{ to: '', text: 'Home' }];

  useCustomLayout({ placement: MENU_PLACEMENT.Vertical, layout: LAYOUT.Fluid });
  return (
    <>
      <HtmlHead title={title} description={description} />
      <Row>
        <Col>
          {/* Title Start */}
          <section className="scroll-section" id="title">
            <div className="page-title-container">
              <h1 className="mb-0 pb-0 display-4">{title}</h1>
              <BreadcrumbList items={breadcrumbs} />
            </div>
            <Card className="mb-5" body>
              {/* <Card.Text>{description}</Card.Text> */}
              <p> Home Page</p>
            </Card>
          </section>
          {/* Title End */}
        </Col>
      </Row>
    </>
  );
};

export default VerticalPage;
