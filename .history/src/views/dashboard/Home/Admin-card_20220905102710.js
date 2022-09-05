/* eslint-disable camelcase */
/* eslint-disable prefer-template */
/* eslint-disable no-use-before-define */
/* eslint-disable prettier/prettier */
import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import CsLineIcons from 'cs-line-icons/CsLineIcons';

const AdminCards = ({ total, totalYearSal, totalYearOver, total_Monthly_Salary_Overtime, total_Monthly_Salary }) => {

    const totalPay = Math.abs(total) > 999 ? Math.sign(total) * ((Math.abs(total) / 1000).toFixed(1)) + 'k' : Math.sign(total) * Math.abs(total)

    const totalYearSalary = Math.abs(totalYearSal) > 999 ? Math.sign(totalYearSal) * ((Math.abs(totalYearSal) / 1000).toFixed(1)) + 'k' : Math.sign(totalYearSal) * Math.abs(totalYearSal)

    const totalYearOvertime = Math.abs(totalYearOver) > 999 ? Math.sign(totalYearOver) * ((Math.abs(totalYearOver) / 1000).toFixed(1)) + 'k' : Math.sign(totalYearOver) * Math.abs(totalYearOver)

    const total_Monthly_Salary_Overtime_res = Math.abs(total_Monthly_Salary_Overtime) > 999 ? Math.sign(total_Monthly_Salary_Overtime) * ((Math.abs(total_Monthly_Salary_Overtime) / 1000).toFixed(1)) + 'k' : Math.sign(total_Monthly_Salary_Overtime) * Math.abs(total_Monthly_Salary_Overtime)

    const total_Monthly_Salary_res = Math.abs(total_Monthly_Salary) > 999 ? Math.sign(total_Monthly_Salary) * ((Math.abs(total_Monthly_Salary) / 1000).toFixed(1)) + 'k' : Math.sign(total_Monthly_Salary) * Math.abs(total_Monthly_Salary)


    return (
        <Row className="g-3">

            <Col xl="4">
                <Card>
                    <Card.Body className="py-5">
                        <Row className="g-0 align-items-center">
                            <Col xs="auto">
                                <div className="bg-gradient-light sw-6 sh-6 rounded-xl d-flex justify-content-center align-items-center">
                                    <CsLineIcons icon="dollar" className="text-white" />
                                </div>
                            </Col>
                            <Col>
                                <div className="heading mb-0 sh-8 d-flex align-items-center lh-1-25 ps-3">Total Payment for this year including overtime</div>
                            </Col>
                            <Col xs="auto" className="ps-3">
                                <div className="display-5 text-primary"> R {totalPay} </div>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </Col>

            <Col xl="4">
                <Card>
                    <Card.Body className="py-5">
                        <Row className="g-0 align-items-center">
                            <Col xs="auto">
                                <div className="bg-gradient-light sw-6 sh-6 rounded-xl d-flex justify-content-center align-items-center">
                                    <CsLineIcons icon="dollar" className="text-white" />
                                </div>
                            </Col>
                            <Col>
                                <div className="heading mb-0 sh-8 d-flex align-items-center lh-1-25 ps-3">Total Payment for this year, fixed salary </div>
                            </Col>
                            <Col xs="auto" className="ps-3">
                                <div className="display-5 text-primary">R {totalYearSalary} </div>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </Col>

            <Col xl="4">
                <Card >
                    <Card.Body className="py-5">
                        <Row className="g-0 align-items-center">
                            <Col xs="auto">
                                <div className="bg-gradient-light sw-6 sh-6 rounded-xl d-flex justify-content-center align-items-center">
                                    <CsLineIcons icon="dollar" className="text-white" />
                                </div>
                            </Col>
                            <Col>
                                <div className="heading mb-0 sh-8 d-flex align-items-center lh-1-25 ps-3"> Total Payment for this year, over time salary </div>
                            </Col>
                            <Col xs="auto" className="ps-3">
                                <div className="display-5 text-primary">R {totalYearOvertime} </div>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </Col>





            <Col xl="4">
                <Card>
                    <Card.Body className="py-5">
                        <Row className="g-0 align-items-center">
                            <Col xs="auto">
                                <div className="bg-gradient-light sw-6 sh-6 rounded-xl d-flex justify-content-center align-items-center">
                                    <CsLineIcons icon="dollar" className="text-white" />
                                </div>
                            </Col>
                            <Col>
                                <div className="heading mb-0 sh-8 d-flex align-items-center lh-1-25 ps-3">Total Payment for this month including overtime</div>
                            </Col>
                            <Col xs="auto" className="ps-3">
                                <div className="display-5 text-primary"> R {total_Monthly_Salary_Overtime_res} </div>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </Col>

            <Col xl="4">
                <Card>
                    <Card.Body className="py-5">
                        <Row className="g-0 align-items-center">
                            <Col xs="auto">
                                <div className="bg-gradient-light sw-6 sh-6 rounded-xl d-flex justify-content-center align-items-center">
                                    <CsLineIcons icon="dollar" className="text-white" />
                                </div>
                            </Col>
                            <Col>
                                <div className="heading mb-0 sh-8 d-flex align-items-center lh-1-25 ps-3">Total Payment for this month fixed salary </div>
                            </Col>
                            <Col xs="auto" className="ps-3">
                                <div className="display-5 text-primary">R { } </div>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </Col>

            <Col xl="4">
                <Card >
                    <Card.Body className="py-5">
                        <Row className="g-0 align-items-center">
                            <Col xs="auto">
                                <div className="bg-gradient-light sw-6 sh-6 rounded-xl d-flex justify-content-center align-items-center">
                                    <CsLineIcons icon="dollar" className="text-white" />
                                </div>
                            </Col>
                            <Col>
                                <div className="heading mb-0 sh-8 d-flex align-items-center lh-1-25 ps-3"> Total Payment for this month over time salary </div>
                            </Col>
                            <Col xs="auto" className="ps-3">
                                <div className="display-5 text-primary">R { } </div>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </Col>

        </Row>
    );
};

export default AdminCards;