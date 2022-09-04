/* eslint-disable prettier/prettier */
import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import CsLineIcons from 'cs-line-icons/CsLineIcons';
import { constrainPoint } from '@fullcalendar/react';

const Cards = (props) => {
    const { paySlip } = props
        ?
    const salary = paySlip?.map(pay => pay.salaryAmount)
    const overtimeSalary = paySlip?.map(pay => pay.overTimeAmount)
    const addSalary = salary.reduce((a, b) => a + b);
    const addOvertime = overtimeSalary.reduce((a, b) => a + b);
    const totalPayment = addSalary + addOvertime;

    return (
        <Row className="g-2">
            <Col xl="4">
                {/* <Card className="bg-gradient-light"> */}
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
                                <div className="display-5 text-primary"> R {totalPayment}</div>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </Col>

            <Col xl="4">
                {/* <Card className="hover-border-primary"> */}
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
                                <div className="display-5 text-primary">R 14K</div>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </Col>
            <Col xl="4">
                {/* <Card className="active"> */}
                <Card >
                    <Card.Body className="py-4">
                        <Row className="g-0 align-items-center">
                            <Col xs="auto">
                                <div className="sw-6 sh-6 rounded-xl d-flex justify-content-center align-items-center border border-primary">
                                    <CsLineIcons icon="wallet" className="text-primary" />
                                </div>
                            </Col>
                            <Col>
                                <div className="heading mb-0 sh-8 d-flex align-items-center lh-1-25 ps-3">Total Leaves</div>
                            </Col>
                            <Col xs="auto" className="ps-3">
                                <div className="display-5 text-primary">02</div>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </Col>

        </Row>
    );
};

export default Cards;