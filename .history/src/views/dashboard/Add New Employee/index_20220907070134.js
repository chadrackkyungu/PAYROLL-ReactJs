/* eslint-disable prettier/prettier */
import React from 'react';
import { Link } from "react-router-dom";
import { Row, Col, Badge, Card } from 'react-bootstrap';
import HtmlHead from 'components/html-head/HtmlHead';
import BreadcrumbList from 'components/breadcrumb-list/BreadcrumbList';
import useCustomLayout from 'hooks/useCustomLayout';
import { MENU_PLACEMENT, LAYOUT } from 'constants.js';
import { MdNotificationsActive } from 'react-icons/md';
import AddNewEmployee from "./components/Form";

const Leave = () => {
    const title = 'Add Employee';
    const description = 'ad a new employee';
    const breadcrumbs = [{ to: '', text: 'Add employee' }];
    useCustomLayout({ placement: MENU_PLACEMENT.Vertical, layout: LAYOUT.Fluid });
    return (
        <>
            <HtmlHead title={title} description={description} />
            <Row>
                <Col>
                    <section className="scroll-section" id="title">
                        <div className="page-title-container d-flex justify-content-between">
                            <BreadcrumbList items={breadcrumbs} />
                            {/* <Link to="/employee/private" variant="primary">
                                Private Notification <Badge bg="primary"> <MdNotificationsActive size={18} /> 3</Badge>
                                <span className="visually-hidden">unread messages</span>
                            </Link> */}
                        </div>
                        <Card className="mb-5 mt-5" body>
                            <AddNewEmployee />
                        </Card>
                    </section>
                </Col>
            </Row>
        </>
    );
};

export default Leave;
