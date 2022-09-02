/* eslint-disable no-underscore-dangle */
/* eslint-disable react/button-has-type */
/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { Row, Col, Badge, Card } from 'react-bootstrap';
import HtmlHead from 'components/html-head/HtmlHead';
import BreadcrumbList from 'components/breadcrumb-list/BreadcrumbList';
import useCustomLayout from 'hooks/useCustomLayout';
import { MENU_PLACEMENT, LAYOUT } from 'constants.js';
import { MdNotificationsActive } from 'react-icons/md';
import { MDBDataTable } from "mdbreact"
import Cards from "./components/Cards"


const Pending = () => {
    const { currentUser } = useSelector((state) => state.auth);
    let id = ""; let token = "";

    if (currentUser) {
        id = currentUser.data.user._id ? currentUser.data.user._id : " "
        token = currentUser.token ? currentUser.token : " "
    }

    const title = 'My Leaves';
    const description = 'This is a History page';
    const breadcrumbs = [{ to: '', text: 'My Leaves' }];
    useCustomLayout({ placement: MENU_PLACEMENT.Vertical, layout: LAYOUT.Fluid });
    const [pendingLeave, setPendingLeave] = useState()
    const [message, setMessage] = useState()

    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    useEffect(() => {
        const pending = () => {
            fetch(`http://localhost:5000/api/v1/leaves/${id}/status/pending`, requestOptions)
                .then(response => response.json())
                .then(result => setPendingLeave(result.data.leaves))
                .catch(error => console.log('error', error));
        }
        pending();
    }, []);

    console.log(" Pending", pendingLeave);

    const column = [
        { label: "Leave Type", field: "type", sort: "asc", width: 150 },
        { label: "Leave Start Date", field: "start_date", sort: "asc", width: 150 },
        { label: "Leave End Date", field: "end_date", sort: "asc", width: 150 },
        { label: "Status", field: "status", sort: "asc", width: 150 },
    ];

    const data = {
        columns: column,
        rows: "",
    }

    return (
        <>
            <HtmlHead title={title} description={description} />
            <Row>
                <Col>
                    <section className="scroll-section" id="title">
                        <div className="page-title-container d-flex justify-content-between">
                            <BreadcrumbList items={breadcrumbs} />
                            <Link to="/employee/pending-leave" variant="primary">
                                Private Notification <Badge bg="primary"> <MdNotificationsActive size={18} /> 3</Badge>
                                <span className="visually-hidden">unread messages</span>
                            </Link>
                        </div>

                        <Cards />

                        <Card className="mt-5 px-5">
                            <MDBDataTable entries={5} entriesOptions={[5, 10, 50]} responsive bordered striped hover data={""} fullPagination />
                        </Card>

                    </section>
                </Col>
            </Row>
        </>
    );
};

export default Pending;




