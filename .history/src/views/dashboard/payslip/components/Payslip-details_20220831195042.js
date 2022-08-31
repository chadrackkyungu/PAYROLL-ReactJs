/* eslint-disable prettier/prettier */
import React from 'react';
import { Row, Col, Card, CardBody } from 'react-bootstrap';
import CompanyLogo from "../../../../components/Logo/company-logo";

const PayslipDetails = () => {
    return (
        <Card>
            <CompanyLogo />
            <p className="text-center"> Payment Slip for the month of august 2022 </p>

            <Row>
                <CardBody>
                    <Col md={6}>
                        <h5>Company details</h5>
                    </Col>
                    <Col md={6}>
                        <h5>Employee details</h5>
                    </Col>
                </CardBody>
            </Row>
        </Card>
    )
}


export default PayslipDetails