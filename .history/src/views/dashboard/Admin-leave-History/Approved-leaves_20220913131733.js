/* eslint-disable no-unneeded-ternary */
/* eslint-disable consistent-return */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/self-closing-comp */
/* eslint-disable prefer-template */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/button-has-type */
/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import "./approved.css";
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import { Row, Col, Badge } from 'react-bootstrap';
import HtmlHead from 'components/html-head/HtmlHead';
import BreadcrumbList from 'components/breadcrumb-list/BreadcrumbList';
import useCustomLayout from 'hooks/useCustomLayout';
import { MENU_PLACEMENT, LAYOUT } from 'constants.js';
import { MdNotificationsActive } from 'react-icons/md';
import Cards from "./components/Cards"
import ApprovedTable from './components/Approved-table';


const Approved = () => {
    const { currentUser } = useSelector((state) => state.auth);

    const title = 'My Leaves';
    const description = 'This is a History page';
    const breadcrumbs = [{ to: '', text: 'My Leaves' }];
    useCustomLayout({ placement: MENU_PLACEMENT.Vertical, layout: LAYOUT.Fluid });

    const id = currentUser.data?.user._id;
    const token = currentUser?.token;
    const [approvedLeave, setApprovedLeave] = useState()

    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    useEffect(() => {
        const approved = () => {
            fetch(`https://payroll.up.railway.app/api/v1/leaves/status/approve`, requestOptions)
                .then(response => response.json())
                .then(result => setApprovedLeave(result.data.leaves))
                .catch(error => console.log('error', error));
        }
        approved();
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

                        <Cards />

                        <ApprovedTable data={approvedLeave} />

                    </section>
                </Col>
            </Row>
        </>
    );
};

export default Approved;




