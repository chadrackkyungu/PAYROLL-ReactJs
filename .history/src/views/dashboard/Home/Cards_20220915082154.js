/* eslint-disable prefer-template */
/* eslint-disable no-use-before-define */
/* eslint-disable prettier/prettier */
import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import CsLineIcons from 'cs-line-icons/CsLineIcons';

const Cards = ({ total, monthlySalary, overTimePrevMonth }) => {

    const totalPay = Math.abs(total) > 999 ? Math.sign(total) * ((Math.abs(total) / 1000).toFixed(1)) + 'k' : Math.sign(total) * Math.abs(total)

    const totalMonthPay = Math.abs(monthlySalary) > 999 ? Math.sign(monthlySalary) * ((Math.abs(monthlySalary) / 1000).toFixed(1)) + 'k' : Math.sign(monthlySalary) * Math.abs(monthlySalary)

    const totalMonthOvertimePay = Math.abs(overTimePrevMonth) > 999 ? Math.sign(overTimePrevMonth) * ((Math.abs(overTimePrevMonth) / 1000).toFixed(1)) + 'k' : Math.sign(overTimePrevMonth) * Math.abs(overTimePrevMonth)

    return (
        <Row className="g-2">

            <Col xl="4">
                <Card>
                    <Card.Body className="py-4">
                        <Row className="g-0 align-items-center">
                            <Col xs="auto">
                                <div className="bg-gradient-light sw-6 sh-6 rounded-xl d-flex justify-content-center align-items-center">
                                    <CsLineIcons icon="dollar" className="text-white" />
                                </div>
                            </Col>
                            <Col>
                                <div className="heading mb-0 sh-8 d-flex align-items-center lh-1-25 ps-3">Total Earning for this year</div>
                            </Col>
                            <Col xs="auto" className="ps-3">
                                <div className="display-5 text-primary"> R {totalPay}</div>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </Col>

            <Col xl="4">
                <Card>
                    <Card.Body className="py-4">
                        <Row className="g-0 align-items-center">
                            <Col xs="auto">
                                <div className="bg-gradient-light sw-6 sh-6 rounded-xl d-flex justify-content-center align-items-center">
                                    <CsLineIcons icon="dollar" className="text-white" />
                                </div>
                            </Col>
                            <Col>
                                <div className="heading mb-0 sh-8 d-flex align-items-center lh-1-25 ps-3">Total Earning for this Month</div>
                            </Col>
                            <Col xs="auto" className="ps-3">
                                <div className="display-5 text-primary">R {!totalMonthPay ? 0 : totalMonthPay} </div>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </Col>

            <Col xl="4">
                <Card >
                    <Card.Body className="py-4">
                        <Row className="g-0 align-items-center">
                            <Col xs="auto">
                                <div className="bg-gradient-light sw-6 sh-6 rounded-xl d-flex justify-content-center align-items-center">
                                    <CsLineIcons icon="dollar" className="text-white" />
                                </div>
                            </Col>
                            <Col>
                                <div className="heading mb-0 sh-8 d-flex align-items-center lh-1-25 ps-3">Total Overtime Earning for this month </div>
                            </Col>
                            <Col xs="auto" className="ps-3">
                                <div className="display-5 text-primary">R {!totalMonthOvertimePay ? 0 : totalMonthOvertimePay} </div>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </Col>

        </Row>
    );
};

export default Cards;