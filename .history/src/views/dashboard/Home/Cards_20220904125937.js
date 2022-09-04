/* eslint-disable no-use-before-define */
/* eslint-disable prettier/prettier */
import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import CsLineIcons from 'cs-line-icons/CsLineIcons';

const Cards = ({ total, monthlySalary, overTimePrevMonth }) => {


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
                                <div className="display-5 text-primary"> R {total}</div>
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
                                <div className="display-5 text-primary">R {monthlySalary} </div>
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
                                <div className="bg-gradient-light sw-6 sh-6 rounded-xl d-flex justify-content-center align-items-center">
                                    <CsLineIcons icon="dollar" className="text-white" />
                                </div>
                            </Col>
                            <Col>
                                <div className="heading mb-0 sh-8 d-flex align-items-center lh-1-25 ps-3">Total Overtime Earning </div>
                            </Col>
                            <Col xs="auto" className="ps-3">
                                <div className="display-5 text-primary">R {overTimePrevMonth} </div>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </Col>

        </Row>
    );
};

export default Cards;