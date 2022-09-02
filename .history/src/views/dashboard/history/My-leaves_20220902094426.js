/* eslint-disable no-nested-ternary */
/* eslint-disable consistent-return */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/button-has-type */
/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable prettier/prettier */
/* eslint-disable prefer-template */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import "./my-leaves.css";
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import { Row, Col, Badge, Card, Modal } from 'react-bootstrap';
import HtmlHead from 'components/html-head/HtmlHead';
import BreadcrumbList from 'components/breadcrumb-list/BreadcrumbList';
import useCustomLayout from 'hooks/useCustomLayout';
import { MENU_PLACEMENT, LAYOUT } from 'constants.js';
import { MdNotificationsActive } from 'react-icons/md';
import { MDBDataTable } from "mdbreact"
import { CSVLink, CSVDownload } from "react-csv";
import CsLineIcons from 'cs-line-icons/CsLineIcons';
import Cards from "./components/Cards"
import UpdateLeave from "./components/UpdateLeave";


const MyLeaves = () => {
    const { currentUser } = useSelector((state) => state.auth);

    const title = 'My Leaves';
    const description = 'This is a History page';
    const breadcrumbs = [{ to: '', text: 'My Leaves' }];
    useCustomLayout({ placement: MENU_PLACEMENT.Vertical, layout: LAYOUT.Fluid });

    const [rightModalExample, setRightModalExample] = useState(false);

    const id = currentUser?.data.user._id;
    const token = currentUser?.token;
    if (id === undefined || token === undefined) return

    const [myLeaves, setMyLeave] = useState()

    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    useEffect(() => {
        const approved = () => {
            fetch(`http://localhost:5000/api/v1/leaves/me`, requestOptions)
                .then(response => response.json())
                .then(result => setMyLeave(result.data.leaves))
                .catch(error => console.log('error', error));
        }
        approved();
    }, []);

    console.log(myLeaves?.length)


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
                                        {myLeaves?.map((leave, key) => (
                                            <tr key={"_tr_" + key}>
                                                <td>
                                                    <div className="form-check font-size-16">
                                                        <input type="checkbox" className="form-check-input" id={leave.id} />
                                                        <label className="form-check-label" htmlFor={leave.id}> &nbsp;</label>
                                                    </div>
                                                </td>
                                                <td>{leave.id}</td>
                                                <td>{leave.leaveStartDate}</td>
                                                <td>{leave.leaveEndDate}</td>
                                                <td>{leave.leaveType}</td>
                                                <td><Badge className={
                                                    leave.status === "pending" ? "bg-warning" : leave.status === "decline" ? "bg-danger" : "bg-primary"
                                                } pill>{leave.status}</Badge> </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </Card>

                    </section>
                </Col>
            </Row>

            <section className="scroll-section" id="rightModal">
                <Modal className="modal-right" show={rightModalExample} onHide={() => setRightModalExample(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Update Leave</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <UpdateLeave />
                    </Modal.Body>

                </Modal>
            </section>

        </>
    );
};

export default MyLeaves;




