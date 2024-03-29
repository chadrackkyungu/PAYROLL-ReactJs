/* eslint-disable prettier/prettier */
import React from 'react';
import { Link } from "react-router-dom";
import { Row, Col, Button, Badge } from 'react-bootstrap';
import HtmlHead from 'components/html-head/HtmlHead';
import BreadcrumbList from 'components/breadcrumb-list/BreadcrumbList';
import useCustomLayout from 'hooks/useCustomLayout';
import { MENU_PLACEMENT, LAYOUT } from 'constants.js';
import { MdNotificationsActive } from 'react-icons/md';
import GeneralMessage from './components/General-message';

const Notifications = () => {
    const title = 'Notifications';
    const description = 'This is a notification page';
    const breadcrumbs = [{ to: '', text: 'Notifications' }];
    useCustomLayout({ placement: MENU_PLACEMENT.Vertical, layout: LAYOUT.Fluid });

    return (
        <>
            <HtmlHead title={title} description={description} />
            <Row>
                <Col>
                    <section className="scroll-section" id="title">
                        <div className="page-title-container d-flex justify-content-between">
                            <BreadcrumbList items={breadcrumbs} />
                            <Link variant="primary">
                                Profile <Badge bg="warning">3</Badge>
                                <span className="visually-hidden">unread messages</span>
                            </Link>
                        </div>
                        <GeneralMessage />
                    </section>
                </Col>
            </Row >
        </>
    );
};

export default Notifications;
