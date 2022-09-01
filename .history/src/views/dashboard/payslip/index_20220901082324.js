/* eslint-disable prettier/prettier */
import React from 'react';
import { Link } from "react-router-dom";
import { Row, Col, Badge } from 'react-bootstrap';
import HtmlHead from 'components/html-head/HtmlHead';
import BreadcrumbList from 'components/breadcrumb-list/BreadcrumbList';
import useCustomLayout from 'hooks/useCustomLayout';
import { MENU_PLACEMENT, LAYOUT } from 'constants.js';
import { MdNotificationsActive } from 'react-icons/md';
import PayslipDetails from './components/Payslip-details';
import PayslipTable from './components/Payslip-table';

const Payslip = () => {
    const title = 'Payslip';
    const description = 'This is a payslip page';
    const breadcrumbs = [{ to: '', text: 'Payslip' }];
    useCustomLayout({ placement: MENU_PLACEMENT.Vertical, layout: LAYOUT.Fluid });
    return (
        <>
            <HtmlHead title={title} description={description} />
            <Row>
                <Col>
                    <section className="scroll-section" id="title">
                        <div className="page-title-container d-flex justify-content-between">
                            <BreadcrumbList items={breadcrumbs} />
                            <Link to="/employee/private" variant="primary">
                                Private Notification <Badge bg="primary"> <MdNotificationsActive size={18} /> 3</Badge>
                                <span className="visually-hidden">unread messages</span>
                            </Link>
                        </div>
                        <div className="align-items-center m-5">
                            <PayslipDetails />
                            <PayslipTable />
                            <hr className="mt-5" />
                        </div>
                    </section>
                </Col>
            </Row>
        </>
    );
};

export default Payslip;
