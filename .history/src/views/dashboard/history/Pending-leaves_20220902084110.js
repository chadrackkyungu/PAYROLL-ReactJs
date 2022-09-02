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
import { Row, Col, Badge, Card, Button } from 'react-bootstrap';
import HtmlHead from 'components/html-head/HtmlHead';
import BreadcrumbList from 'components/breadcrumb-list/BreadcrumbList';
import useCustomLayout from 'hooks/useCustomLayout';
import { MENU_PLACEMENT, LAYOUT } from 'constants.js';
import { MdNotificationsActive } from 'react-icons/md';
import { MDBDataTable } from "mdbreact"
import Cards from "./components/Cards"


const Pending = () => {
    const { currentUser } = useSelector((state) => state.auth);

    const id = currentUser.data.user._id;
    const token = currentUser.token;

    console.log("User ID : ", id);
    console.log("User Token", token);

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
            fetch(`http://localhost:5000/api/v1/leaves/${id}/status/pending`, requestOptions)
                .then(response => response.json())
                .then(result => setPendingLeave(result.data.leaves))
                .catch(error => console.log('error', error));
        }
        pending();
    }, []);

    const newArray = pendingLeave?.filter(obj => {
        return delete obj.message
    });

    // const column = [
    //     { label: "ID", field: "id", sort: "asc", width: 150 },
    //     { label: "Leave start date", field: "leaveStartDate", sort: "asc", width: 150 },
    //     { label: "Leave End date", field: "leaveEndDate", sort: "asc", width: 150 },
    //     { label: "Leave type", field: "leaveType", sort: "asc", width: 150 },
    //     { label: "Status", field: "status", sort: "asc", width: 150 },
    // ];

    // const data = {
    //     columns: column,
    //     rows: newArray,
    // }

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

                        <Card className="mt-5">
                            <div className="table-responsive p-4">
                                <table className="table align-middle table-nowrap mb-0">
                                    <thead className="table-light">
                                        <tr>
                                            <th style={{ width: "20px" }}>
                                                <div className="form-check font-size-16 align-middle">
                                                    <input type="checkbox" className="form-check-input" id="customCheck1" />
                                                    <label className="form-check-label" htmlFor="customCheck1"> &nbsp;</label>
                                                </div>
                                            </th>
                                            <th className="align-middle">Leave ID</th>
                                            <th className="align-middle">Starting dat</th>
                                            <th className="align-middle">Ending date</th>
                                            <th className="align-middle">Type</th>
                                            <th className="align-middle">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {newArray?.map((leave, key) => (
                                            <tr key={"_tr_" + key}>
                                                <td>
                                                    <div className="form-check font-size-16">
                                                        <input type="checkbox" className="form-check-input" id={leave.id} />
                                                        <label className="form-check-label" htmlFor={leave.id}> &nbsp;</label>
                                                    </div>
                                                </td>
                                                <td> <Link to={leave.id} className="text-body fw-bold">{leave.id}</Link></td>
                                                <td>{leave.leaveStartDate}</td>
                                                <td>{leave.leaveEndDate}</td>
                                                <td>{leave.leaveType}</td>
                                                <td><Badge className={"bg-warning font-size-11 badge-soft-" + leave.badgeClass} color={leave.badgeClass} pill>{leave.status}</Badge> </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </Card>

                    </section>
                </Col>
            </Row>
        </>
    );
};

export default Pending;




