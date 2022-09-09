/* eslint-disable prettier/prettier */
import React from 'react'
import { Row, Col, Card } from 'react-bootstrap';

function PayEmployee({ employeeDetails }) {
    const urlUser = "http://localhost:5000/img/users/";

    console.log(employeeDetails);

    return (
        <div>
            <Card>
                <Row>
                    <Col md={6}>
                    </Col>
                    <Col md={6}>
                    </Col>
                </Row>
            </Card>
        </div>
    )
}

export default PayEmployee