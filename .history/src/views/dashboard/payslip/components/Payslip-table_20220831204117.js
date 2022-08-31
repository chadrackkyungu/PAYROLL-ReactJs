/* eslint-disable react/self-closing-comp */
/* eslint-disable react/no-unknown-property */
/* eslint-disable prettier/prettier */
import React from 'react'
import { Row, Col, Badge, Card } from 'react-bootstrap';

const PayslipTable = () => {



    return (
        <>
            <table class="mt-4 table table-bordered">
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
                        <td>R 12000</td>
                        <td>xx</td>
                        <td>PF</td>
                        <td>R 0.00</td>
                    </tr>
                    <tr>
                        <th scope="row">No. of over time worked</th>
                        <td>xx</td>
                        <td>6</td>
                        <td>xx</td>
                        <td>xx</td>
                    </tr>
                    <tr>
                        <th scope="row">Over Time</th>
                        <td>R 3000 </td>
                        <td>xx</td>
                        <td>Vat</td>
                        <td>R 1000</td>
                    </tr>
                    <tr class="border-top">
                        <th scope="row">Total Earning</th>
                        <td>15000</td>
                        <td>xx</td>
                        <td>Total Deductions</td>
                        <td>1000</td>
                    </tr>
                </tbody>
            </table>
            <Row>
                <Col md={4}>
                    <b>Net Pay : R 14000.00</b>
                </Col>
                <Col md={4}>
                    <b> For Lwazi Blanch </b>
                </Col>
                <Col md={4}>
                    <b> For Lwazi Blanch </b>
                </Col>
            </Row>

        </>
    )
}

export default PayslipTable