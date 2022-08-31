/* eslint-disable prettier/prettier */
import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import CompanyLogo from "../../../../components/Logo/company-logo";

const PayslipDetails = () => {
    return (
        <Card>
            <CompanyLogo />
            <p className="text-center"> Payment Slip for the month of august 2022 </p>

            <Row className="p-5">
                <Col md={6}>
                    <h4>Company details</h4>
                    <ul>
                        <li> <span> Title </span> HR</li>
                    </ul>
                </Col>
                <Col md={6}>
                    <h4>Employee details</h4>
                </Col>
            </Row>
        </Card>
    )
}


export default PayslipDetails