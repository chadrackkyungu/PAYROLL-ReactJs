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
                                        <li>  Full Name : john Doe  </li>
                                        <li>  Email : john@gmail.co.za  </li>
                                        <li>  Phone Number : 0820000000  </li>
                                    </ul>
                                </Col>

                                <Col md={6}>
                                    <h5 className='text-primary'>Employee details</h5>
                                    <ul className="mt-5">
                                        <li>  Employee Code  :  39124  </li>
                                        <li>  Mode of Pay :  SBI  </li>
                                        <li>  Account Number :  *******8165  </li>
                                        <li>  Paid date : 08 / 08 / 2022  </li>
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