/* eslint-disable one-var */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable prettier/prettier */
import React from 'react';
import { Row, Col } from 'react-bootstrap';
import CompanyLogo from "../../../../components/Logo/company-logo";

const PayslipDetails = (props) => {
    const { paySlipDetail } = props
    const vat = 1000, pf = 0;

    return (
        <div>
            {
                paySlipDetail.map((payslip, i) => {
                    console.log("Payslip details", payslip);
                    return (
                        <div key={i}>
                            <CompanyLogo />
                            <h4 className="text-center"> <b> Paid Date {payslip.paymentDate}  </b> </h4>

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


                            <div key={i}>
                                <table className="mt-4 table table-bordered">
                                    <thead className="bg-primary">
                                        <tr>
                                            <th scope="col" className="text-white">Earnings</th>
                                            <th scope="col" className="text-white">Amount</th>
                                            <th scope="col" className="text-white">No. of days</th>
                                            <th scope="col" className="text-white">Deductions</th>
                                            <th scope="col" className="text-white">Amount</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <th scope="row">Salary</th>
                                            <td>R {payslip.salaryAmount} </td>
                                            <td>xx</td>
                                            <td>PF</td>
                                            <td>R {pf}.00 </td>
                                        </tr>
                                        <tr>
                                            <th scope="row">No. of over time worked</th>
                                            <td>xx</td>
                                            <td>{payslip.hoursWork}</td>
                                            <td>xx</td>
                                            <td>xx</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Over Time</th>
                                            <td>R {payslip.overTimeAmount}.00 </td>
                                            <td>xx</td>
                                            <td>Vat</td>
                                            <td>R {vat}</td>
                                        </tr>
                                        <tr className="border-top">
                                            <th scope="row">Total Earning</th>
                                            <td>{payslip.salaryAmount + payslip.overTimeAmount}.00</td>
                                            <td>xx</td>
                                            <td>Total Deductions</td>
                                            <td>R {vat - pf}.00 </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <Row>
                                    <Col md={4}>
                                        <b>Net Pay : R {payslip.salaryAmount + payslip.overTimeAmount - vat}.00 </b>
                                    </Col>
                                    <Col md={4}>
                                        <b> For {payslip.user.firstName} {payslip.user.lastName} </b>
                                    </Col>
                                    <Col md={4}>
                                        <b> Authorized Signature </b>
                                    </Col>
                                </Row>

                            </div>
                            <hr className="mt-5 text-danger " />
                        </div>
                    )
                })
            }
        </div>
    )
}


export default PayslipDetails