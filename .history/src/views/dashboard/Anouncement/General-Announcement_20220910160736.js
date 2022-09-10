/* eslint-disable prettier/prettier */
import React from 'react';
import { Row, Col, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import HtmlHead from 'components/html-head/HtmlHead';
import BreadcrumbList from 'components/breadcrumb-list/BreadcrumbList';
import useCustomLayout from 'hooks/useCustomLayout';
import { MENU_PLACEMENT, LAYOUT } from 'constants.js';
import { MdNotificationsActive } from 'react-icons/md';
import General from "./components/General"

const GeneralAnnouncement = () => {
    const title = 'Announcement';
    const description = 'This is an Announcement page';
    const breadcrumbs = [{ to: '', text: 'General Announcement' }];
    useCustomLayout({ placement: MENU_PLACEMENT.Vertical, layout: LAYOUT.Fluid });
    return (
        <>
            <HtmlHead title={title} description={description} />
            <Row>
                <Col>
                    <section className="scroll-section" id="title">
                        <div className="page-title-container d-flex justify-content-between">
                            <BreadcrumbList items={breadcrumbs} />
                            <Link to="/admin/individual-announcement" variant="primary">
                                Employee Announcement <Badge bg="primary"> <MdNotificationsActive size={18} /> </Badge>
                            </Link>
                        </div>
                        <General />
                    </section>
                </Col>
            </Row>
        </>
    );
};

export default GeneralAnnouncement;
