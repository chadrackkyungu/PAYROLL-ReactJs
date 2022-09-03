/* eslint-disable react/destructuring-assignment */
/* eslint-disable prettier/prettier */
import React from 'react';
import { Row, Col } from 'react-bootstrap';
import CompanyLogo from "../../../../components/Logo/company-logo";

const PayslipDetails = (props) => {

    console.log("details", props.paySlipDetail);
    const { paySlipDetail } = props
    console.log("details", paySlipDetail);
    return (
        <div>
            {
                paySlipDetail.map((payslip, i) => {
                    console.log("Payslip details", payslip);
                    return (
                        <div key={i}>
                            <CompanyLogo />
                            <h4 className="text-center"> Payment Date {payslip.paymentDate} </h4>

                            <Row className="p-5 align-items-center">
                                <Col md={6}>
                                    <h5 className='text-primary'>Company details</h5>
                                    <ul className="mt-5">
                                        <li>  Title :  HR  </li>
                                        <li>  Full Name : {payslip.admin.firstName}  </li>
                                        <li>  Email : {payslip.admin.email}  </li>
                                        <li>  Phone Number : {payslip.admin.phoneNumber}   </li>
                                    </ul>
                                </Col>

                                <Col md={6}>
                                    <h5 className='text-primary'>Employee details</h5>
                                    <ul className="mt-5">
                                        <li>  Employee Code  :  {payslip.user.IdNumber}   </li>
                                        <li>  Mode of Pay :  {payslip.user.accountType}  </li>
                                        <li>  Account Number :   {payslip.user.accountNumber}  </li>
                                        <li>  Paid date : {payslip.paymentDate}  </li>
                                    </ul>
                                </Col>
                            </Row>
                        </div>
                    )
                })
            }
        </div>
    )
}


export default PayslipDetails