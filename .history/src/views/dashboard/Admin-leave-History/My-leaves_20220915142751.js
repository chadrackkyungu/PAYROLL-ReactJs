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
import { Row, Col, Badge, Card, Modal, Button, Spinner } from 'react-bootstrap';
import HtmlHead from 'components/html-head/HtmlHead';
import BreadcrumbList from 'components/breadcrumb-list/BreadcrumbList';
import useCustomLayout from 'hooks/useCustomLayout';
import { MENU_PLACEMENT, LAYOUT } from 'constants.js';
import { MdNotificationsActive } from 'react-icons/md';
import Cards from "./components/Cards"
import LeaveModalDetails from "./components/Leave-modal-details";
import { warningMessage, successSubmitLeave } from "../../../components/Notifications/Notifications";


const MyLeaves = () => {
    const { currentUser } = useSelector((state) => state.auth);

    const title = 'My Leaves';
    const description = 'This is a History page';
    const breadcrumbs = [{ to: '', text: 'My Leaves' }];
    useCustomLayout({ placement: MENU_PLACEMENT.Vertical, layout: LAYOUT.Fluid });

    const [rightModalExample, setRightModalExample] = useState(false);
    const [nExample, setNExample] = useState(false);

    const [leaveId, setLeaveId] = useState();
    const [ViewLeave, setViewLeave] = useState(false);
    const token = currentUser?.token;
    const [myLeaves, setMyLeave] = useState()

    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);
    myHeaders.append("Content-Type", "application/json");

    const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    useEffect(() => {
        const approved = () => {
            fetch(`https://payroll.up.railway.app/api/v1/leaves`, requestOptions)
                .then(response => response.json())
                .then(result => setMyLeave(result.data.data))
                .catch(error => console.log('error', error));
        }
        approved();
    }, []);

    const DeleteLeave = () => {
        const raw = ""
        const requestOptionsDelete = {
            method: 'DELETE',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(`https://payroll.up.railway.app/api/v1/leaves/${leaveId}`, requestOptionsDelete)
            .then(response => response.json())
            .then(result => {
                if (result.status === "success") {
                    successSubmitLeave(`You have successful deleted this leave`)
                }
                if (result.status === "fail") {
                    warningMessage(`You have successful deleted this leave`)
                }
            })
            .catch(err => {
                // warningMessage(` 🤒 ${err.response}`)
                successSubmitLeave(`You have successful deleted this leave`)
            });

        setRightModalExample(false)
    }


    if (myLeaves === undefined) {
        return (<div className="d-flex justify-content-center">
            <Spinner animation="border" variant="primary" />
        </div>
        )
    }

    return (
        <>
            <HtmlHead title={title} description={description} />
            <Row>
                <Col>
                    <section className="scroll-section" id="title">
                        <div className="page-title-container d-flex justify-content-between">
                            <BreadcrumbList items={breadcrumbs} />
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
                                            <th className="align-middle">Actions</th>
                                            <th className="align-middle">Actions</th>
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
                                                    leave.status === "pending" ? "bg-warning" : leave.status === "decline" ? "bg-danger" : "bg-success"
                                                } pill>{leave.status}</Badge>
                                                </td>

                                                <td className="cursor-pointer"
                                                    onClick={() => {
                                                        setNExample(true)
                                                        setViewLeave(leave?.id)
                                                    }}>
                                                    <Badge> View </Badge>
                                                </td>

                                                <td>
                                                    <Badge className="bg-danger cursor-pointer"
                                                        onClick={() => {
                                                            setRightModalExample(true)
                                                            setLeaveId(leave.id);
                                                        }}
                                                    > Delete </Badge>
                                                </td>

                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </Card>

                    </section>
                </Col>
            </Row>

            <Modal show={rightModalExample} onHide={() => setRightModalExample(false)}>
                <Modal.Body>
                    <h4 className="text-warning">Are you sure you want to delete this leave? </h4>
                </Modal.Body>

                <Modal.Footer className="d-flex justify-content-around">
                    <Button variant="danger" onClick={() => setRightModalExample(false)}> No </Button>
                    <Button variant="success" onClick={DeleteLeave}>Yes</Button>
                </Modal.Footer>
            </Modal>

            <Modal show={nExample} onHide={() => setNExample(false)}>
                <Modal.Body>
                    <LeaveModalDetails leaves={myLeaves} id={ViewLeave} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={() => setNExample(false)}>Close</Button>
                </Modal.Footer>
            </Modal>

        </>
    );
};

export default MyLeaves;




