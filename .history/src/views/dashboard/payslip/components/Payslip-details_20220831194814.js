/* eslint-disable prettier/prettier */
import React from 'react';
import { Row, Col, Badge, Card } from 'react-bootstrap';
import CompanyLogo from "../../../../components/Logo/company-logo";

const PayslipDetails = () => {
    return (
        <Card>
            <CompanyLogo />
            <p className="text-center"> Payment Slip for the month of august 2022 </p>
        </Card>
    )
}


export default PayslipDetails