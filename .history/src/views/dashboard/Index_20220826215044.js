/* eslint-disable prettier/prettier */
import React from 'react';
import { Row, Col, Card, Breadcrumb } from 'react-bootstrap';
import HtmlHead from 'components/html-head/HtmlHead';
import BreadcrumbList from 'components/breadcrumb-list/BreadcrumbList';
import useCustomLayout from 'hooks/useCustomLayout';
import { MENU_PLACEMENT, LAYOUT } from 'constants.js';
import CsLineIcons from 'cs-line-icons/CsLineIcons';

const Dashboard = () => {
    const title = 'Home Page';
    const description = 'An empty page with a fluid vertical layout.';
    const breadcrumbs = [{ to: '', text: 'Home' }];
    useCustomLayout({ placement: MENU_PLACEMENT.Vertical, layout: LAYOUT.Fluid });
    return (
        <>
            <HtmlHead title={title} description={description} />
            <Row>
                <Col>
                    <section className="scroll-section" id="title">
                        <div className="page-title-container">
                            {/* <BreadcrumbList items={breadcrumbs} /> */}

                            <h1 className="mb-1 pb-0 display-4">Page Title</h1>
                            <Breadcrumb bsPrefix="list-inline">
                                <Breadcrumb.Item bsPrefix="list-inline-item" href="#" linkProps={{ className: 'muted-link' }}>
                                    <span className="text-small align-middle me-2">HOME PAGE</span> <CsLineIcons icon="chevron-right" size="13" />
                                </Breadcrumb.Item>
                                <Breadcrumb.Item bsPrefix="list-inline-item" href="#" linkProps={{ className: 'muted-link' }}>
                                    <span className="text-small align-middle me-2">LIBRARY</span> <CsLineIcons icon="chevron-right" size="13" />
                                </Breadcrumb.Item>
                                <Breadcrumb.Item bsPrefix="list-inline-item" active linkProps={{ className: 'muted-link' }}>
                                    <a href="#arrows" className="muted-link">
                                        <span className="text-small align-middle me-2">DATA</span>
                                    </a>
                                </Breadcrumb.Item>
                            </Breadcrumb>

                        </div>
                        <Card className="mb-5" body>
                            <p> Home Page</p>
                        </Card>
                    </section>
                </Col>
            </Row>
        </>
    );
};

export default Dashboard;
