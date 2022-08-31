/* eslint-disable prettier/prettier */
import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import CompanyLogo from "../../../../components/Logo/company-logo";

const PayslipDetails = () => {
    return (
        <Card>
            <CompanyLogo />
            <h4 className="text-center"> Payment Slip for the month of august 2022 </h4>

            <Row className="p-5">
                <Col md={6}>
                    <h5>Company details</h5>
                    <ul>
                        <li>  Title  <span className="text-black-50"> HR </span> </li>
                    </ul>
                </Col>
                <Col md={6}>
                    <h5>Employee details</h5>
                </Col>
            </Row>
        </Card>
    )
}


export default PayslipDetails