/* eslint-disable prettier/prettier */
import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import HtmlHead from 'components/html-head/HtmlHead';
import BreadcrumbList from 'components/breadcrumb-list/BreadcrumbList';
import useCustomLayout from 'hooks/useCustomLayout';
import { MENU_PLACEMENT, LAYOUT } from 'constants.js';

const Notifications = () => {
    const title = 'notifications';
    const description = 'This is a notification page';
    const breadcrumbs = [{ to: '', text: 'Home' }];
    useCustomLayout({ placement: MENU_PLACEMENT.Vertical, layout: LAYOUT.Fluid });
    return (
        <>
            <HtmlHead title={title} description={description} />
            <Row>
                <Col>
                    <section className="scroll-section" id="title">
                        <div className="page-title-container">
                            <BreadcrumbList items={breadcrumbs} />
                        </div>
                        <Card className="mb-5 p-2">
                            <Row>
                                <Col md={10}>
                                    <div className="notification-img">
                                        <img src="" alt="" />
                                    </div>
                                    <div className="notfications">
                                        <h4>Blanch</h4>
                                        <p> Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione velit expedita animi ab omnis impedit praesentium, tempore minima laborum quam, necessitatibus, perferendis sunt ea accusamus enim quidem non eos! Iste? </p>
                                    </div>
                                </Col>

                                <Col md={2}>
                                    <h4> 2022-08-27 </h4>
                                    <p> Icons </p>
                                </Col>
                            </Row>
                        </Card>
                    </section>
                </Col>
            </Row>
        </>
    );
};

export default Notifications;
