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
                        <li>  Title :  HR  </li>
                        <li>  Full Name : john Doe  </li>
                        <li>  Email : john@gmail.co.za  </li>
                        <li>  Phone Number : 0820000000  </li>
                    </ul>
                </Col>
                <Col md={6}>
                    <h5>Employee details</h5>
                    <ul>
                        <li>  Employee Code  :  39124  </li>
                        <li>  Mode of Pay :  SBI  </li>
                        <li>  Account Number :  *******8165  </li>
                        <li>  Paid date : 08 / 08 / 2022  </li>
                    </ul>
                </Col>
            </Row>
        </Card>
    )
}


export default PayslipDetails