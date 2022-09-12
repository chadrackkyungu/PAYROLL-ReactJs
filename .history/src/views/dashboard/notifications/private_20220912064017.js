/* eslint-disable prettier/prettier */
import React from 'react';
import { Row, Col, Badge } from 'react-bootstrap';
import HtmlHead from 'components/html-head/HtmlHead';
import BreadcrumbList from 'components/breadcrumb-list/BreadcrumbList';
import useCustomLayout from 'hooks/useCustomLayout';
import { MENU_PLACEMENT, LAYOUT } from 'constants.js';
import { MdNotificationsActive } from 'react-icons/md';
import PrivateMessage from './components/Private-message';

const Notifications = () => {
    const title = 'Private Notifications';
    const description = 'This is a notification page';
    const breadcrumbs = [{ to: '', text: 'Private Notifications' }];
    useCustomLayout({ placement: MENU_PLACEMENT.Vertical, layout: LAYOUT.Fluid });

    return (
        <>
            <HtmlHead title={title} description={description} />
            <Row>
                <Col>
                    <section className="scroll-section" id="title">
                        <div className="page-title-container d-flex justify-content-between">
                            <BreadcrumbList items={breadcrumbs} />
                            <Badge bg="primary"> <MdNotificationsActive size={18} /> </Badge>
                            <span className="visually-hidden">unread messages</span>
                        </div>
                        <PrivateMessage />
                    </section>
                </Col>
            </Row >
        </>
    );
};

export default Notifications;
