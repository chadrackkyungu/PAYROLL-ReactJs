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
                    <Row>
                        <Col md={6}>
                            <div className="sh-10 me-1 mb-1 d-inline-block">
                                <img src={`${urlUser}${employeeDetails[0].photo}`} alt="user" className="img-fluid-height rounded-md" />
                            </div>
                        </Col>
                        <Col md={6}>
                            <Row>
                                <Col md={6}>
                                    <p>one</p>
                                </Col>
                                <Col md={6}>
                                    <p>two</p>
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