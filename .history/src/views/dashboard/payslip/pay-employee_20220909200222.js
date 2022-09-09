/* eslint-disable no-underscore-dangle */
/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import { Row, Col } from 'react-bootstrap';
import HtmlHead from 'components/html-head/HtmlHead';
import BreadcrumbList from 'components/breadcrumb-list/BreadcrumbList';
import useCustomLayout from 'hooks/useCustomLayout';
import { MENU_PLACEMENT, LAYOUT } from 'constants.js';
import PayEmployee from './components/Pay-employee';
import PaymentForm from './components/Payment-form';

const Payslip = () => {

    const title = 'Pay';
    const description = 'This is a payment page';
    const breadcrumbs = [{ to: '', text: 'Pay' }];
    useCustomLayout({ placement: MENU_PLACEMENT.Vertical, layout: LAYOUT.Fluid });

    const { id } = useParams();
    const { currentUser } = useSelector((state) => state.auth);

    const token = currentUser?.token;
    const [myEmployees, setEmployees] = useState()

    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    useEffect(() => {
        const approved = () => {
            fetch(`http://localhost:5000/api/v1/users`, requestOptions)
                .then(response => response.json())
                .then(result => {
                    // Do not return the current user details
                    const userDet = result?.data?.data?.filter(user => {
                        return user?._id !== currentUser?.data?.user?._id
                    })
                    setEmployees(userDet)
                })
                .catch(error => console.log('error', error));
        }
        approved();
    }, []);

    const employeeDet = myEmployees?.filter(employee => employee._id === id);

    return (
        <>
            <HtmlHead title={title} description={description} />
            <Row>
                <Col>
                    <section className="scroll-section" id="title">
                        <div className="page-title-container d-flex justify-content-between">
                            <BreadcrumbList items={breadcrumbs} />
                        </div>
                        <PayEmployee employeeDetails={employeeDet} />
                        <PaymentForm employeeDetails={employeeDet} />
                    </section>
                </Col>
            </Row>
        </>
    );
};

export default Payslip;
