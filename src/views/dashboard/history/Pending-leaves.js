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
import "./pending.css";
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { Row, Col, Badge } from 'react-bootstrap';
import HtmlHead from 'components/html-head/HtmlHead';
import BreadcrumbList from 'components/breadcrumb-list/BreadcrumbList';
import useCustomLayout from 'hooks/useCustomLayout';
import { MENU_PLACEMENT, LAYOUT } from 'constants.js';
import { MdNotificationsActive } from 'react-icons/md';
import Cards from "./components/Cards"
import PendingTable from "./components/Pending-table"


const Pending = () => {
    const { currentUser } = useSelector((state) => state.auth);

    const id = currentUser.data?.user._id;
    const token = currentUser?.token;

    const title = 'My Leaves';
    const description = 'This is a History page';
    const breadcrumbs = [{ to: '', text: 'My Leaves' }];
    useCustomLayout({ placement: MENU_PLACEMENT.Vertical, layout: LAYOUT.Fluid });
    const [pendingLeave, setPendingLeave] = useState()

    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    useEffect(() => {
        const pending = () => {
            fetch(`https://payroll.up.railway.app/api/v1/leaves/${id}/status/pending`, requestOptions)
                .then(response => response.json())
                .then(result => setPendingLeave(result.data.leaves))
                .catch(error => console.log('error', error));
        }
        pending();
    }, []);

    // const newArray = pendingLeave?.filter(obj => {
    //     return delete obj.message
    // });

    return (
        <>
            <HtmlHead title={title} description={description} />
            <Row>
                <Col>
                    <section className="scroll-section" id="title">
                        <div className="page-title-container d-flex justify-content-between">
                            <BreadcrumbList items={breadcrumbs} />
                            <Link to="/employee/pending-leave" variant="primary">
                                Private Notification <Badge bg="primary"> <MdNotificationsActive size={18} /> </Badge>
                                <span className="visually-hidden">unread messages</span>
                            </Link>
                        </div>

                        <Cards />
                        <PendingTable data={pendingLeave} />

                    </section>
                </Col>
            </Row>
        </>
    );
};

export default Pending;




