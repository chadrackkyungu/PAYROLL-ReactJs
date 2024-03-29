/* eslint-disable no-underscore-dangle */
/* eslint-disable react/button-has-type */
/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
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
    const id = currentUser.data.user._id ? currentUser.data.user._id : null
    console.log(id);
    const title = 'My Leaves';
    const description = 'This is a History page';
    const breadcrumbs = [{ to: '', text: 'My Leaves' }];
    useCustomLayout({ placement: MENU_PLACEMENT.Vertical, layout: LAYOUT.Fluid });
    const [pendingLeave, setPendingLeave] = useState()
    const [message, setMessage] = useState()

    const pending = async () => {
        try {
            const res = await axios({
                method: 'GET',
                url: `http://localhost:5000/api/v1/leaves/${id}/status/pending`,
            });
            console.log('====================================');
            console.log(res);
            console.log('====================================');
            if (res.data.status === 'success') {
                setPendingLeave(res.data)
            }
        } catch (err) {
            setMessage(`${err.response.data.message}`);
        }
    }
    pending();

    console.log(" Pending", pendingLeave);

    const [dataDb, setData] = useState([
        {
            type: 'Break',
            start_date: "2022-07-14",
            end_date: "2022-07-14",
            status: <Badge bg="warning">  Pending   </Badge>,
        },
    ]);


    const column = [
        { label: "Leave Type", field: "type", sort: "asc", width: 150 },
        { label: "Leave Start Date", field: "start_date", sort: "asc", width: 150 },
        { label: "Leave End Date", field: "end_date", sort: "asc", width: 150 },
        { label: "Status", field: "status", sort: "asc", width: 150 },
    ];

    const data = {
        columns: column,
        rows: dataDb,
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
                            <MDBDataTable entries={5} entriesOptions={[5, 10, 50]} responsive bordered striped hover data={data} fullPagination />
                        </Card>

                    </section>
                </Col>
            </Row>
        </>
    );
};

export default Pending;




