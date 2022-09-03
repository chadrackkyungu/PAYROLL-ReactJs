/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import { Row, Col, Badge, Card } from 'react-bootstrap';
import HtmlHead from 'components/html-head/HtmlHead';
import BreadcrumbList from 'components/breadcrumb-list/BreadcrumbList';
import useCustomLayout from 'hooks/useCustomLayout';
import { MENU_PLACEMENT, LAYOUT } from 'constants.js';
import { MdNotificationsActive } from 'react-icons/md';
import PayslipDetails from './components/Payslip-details';

const Payslip = () => {
    const title = 'Payslip';
    const description = 'This is a payslip page';
    const breadcrumbs = [{ to: '', text: 'Payslip' }];
    useCustomLayout({ placement: MENU_PLACEMENT.Vertical, layout: LAYOUT.Fluid });

    const { currentUser } = useSelector((state) => state.auth);
    const token = currentUser?.token;
    const [paySlip, setPayslip] = useState();

    const getPayslip = async () => {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${token}`);

        const requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch("http://localhost:5000/api/v1/payments/me", requestOptions)
            .then(response => response.json())
            .then(result => setPayslip(result.data.leaves))
            .catch(error => console.log('error', error));
    }
    useEffect(() => {
        getPayslip();
    }, []);

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
                            <PayslipDetails paySlipDetail={paySlip} />
                        </div>
                    </section>
                </Col>
            </Row>
        </>
    );
};

export default Payslip;
