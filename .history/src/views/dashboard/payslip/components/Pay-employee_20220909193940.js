/* eslint-disable no-underscore-dangle */
/* eslint-disable prettier/prettier */
import React from 'react'
import { Row, Col, Card } from 'react-bootstrap';

function PayEmployee({ employeeDetails }) {
    const urlUser = "http://localhost:5000/img/users/";

    console.log(employeeDetails);

    return (
        <div>
            <Card>
                <Card.Body>
                    <h5 className='mb-5'>Employee Details</h5>
                    <Row>
                        <Col md={2}>
                            <div className="sh-10 me-1 mb-1 d-inline-block">
                                <img src={`${urlUser}${employeeDetails[0]?.photo}`} alt="user" className="img-fluid-height rounded-md" />
                            </div>
                        </Col>
                        <Col md={6}>
                            <Row>
                                <Col md={6}>
                                    <p> <b> Email :</b> {employeeDetails[0]?.email}</p>
                                    <p> <b> Full Name :</b> {employeeDetails[0]?.firstName} {employeeDetails[0]?.lastName}</p>
                                </Col>
                                <Col md={6}>
                                    <p> <b> Employee Number :</b> {employeeDetails[0]?.employeeNumber
                                    }</p>
                                    <p> <b> Phone Number :</b> {employeeDetails[0]?.phoneNumber} </p>
                                </Col>
                            </Row>
                        </Col>
                        <Col md={4}>
                            <p> Employee ID :  {employeeDetails[0]?._id} </p>
                        </Col>
                    </Row>

                    <h5 className='my-5'>Bank Account Details </h5>


                    <Row>
                        <Col md={6}>
                            <Row>
                                <Col md={6}>
                                    <p> <b> Email :</b> {employeeDetails[0]?.email}</p>
                                    <p> <b> Full Name :</b> {employeeDetails[0]?.firstName} {employeeDetails[0]?.lastName}</p>
                                </Col>
                                <Col md={6}>
                                    <p> <b> Employee Number :</b> {employeeDetails[0]?.employeeNumber
                                    }</p>
                                    <p> <b> Phone Number :</b> {employeeDetails[0]?.phoneNumber} </p>
                                </Col>
                            </Row>
                        </Col>
                        <Col md={6}>
                            <Row>
                                <Col md={6}>
                                    <p> <b> Email :</b> {employeeDetails[0]?.email}</p>
                                    <p> <b> Full Name :</b> {employeeDetails[0]?.firstName} {employeeDetails[0]?.lastName}</p>
                                </Col>
                                <Col md={6}>
                                    <p> <b> Employee Number :</b> {employeeDetails[0]?.employeeNumber
                                    }</p>
                                    <p> <b> Phone Number :</b> {employeeDetails[0]?.phoneNumber} </p>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </div>
    )
}

export default PayEmployee