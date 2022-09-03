/* eslint-disable react/button-has-type */
/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable prettier/prettier */
/* eslint-disable prefer-template */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { Link } from "react-router-dom";
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

    const title = 'My Leaves';
    const description = 'This is a History page';
    const breadcrumbs = [{ to: '', text: 'My Leaves' }];
    useCustomLayout({ placement: MENU_PLACEMENT.Vertical, layout: LAYOUT.Fluid });

    const [rightModalExample, setRightModalExample] = useState(false);


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
                                        {props.data?.map((leave, key) => (
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
                                                <td><Badge className={"bg-danger font-size-11 badge-soft-" + leave.badgeClass} color={leave.badgeClass} pill>{leave.status}</Badge> </td>
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



