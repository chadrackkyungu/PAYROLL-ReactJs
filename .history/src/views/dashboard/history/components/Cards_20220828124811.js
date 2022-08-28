/* eslint-disable prettier/prettier */
import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import CsLineIcons from 'cs-line-icons/CsLineIcons';
import { Link } from "react-router-dom"

const StatsPercentages = () => {
    return (
        <div>
            <Row className="g-2">
                <Col lg="6" xxl="3">
                    <Card>
                        <Card.Body>
                            <Row className="g-0 align-items-center">
                                <Col xs="auto">
                                    <Link to="#/" className="bg-primary sw-6 sh-6 rounded-md d-flex justify-content-center align-items-center">
                                        <CsLineIcons icon="eye" className="text-white" />
                                    </Link>
                                </Col>
                                <Col className="sh-6 ps-3 d-flex flex-column justify-content-center">
                                    <div className="heading mb-0 d-flex align-items-center lh-1-25">My Leaves</div>
                                    <Row className="g-0">
                                        <Col xs="auto">
                                            <div className="cta-2 text-primary">34</div>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
                <Col lg="6" xxl="3">
                    <Card>
                        <Card.Body>
                            <Row className="g-0 align-items-center">
                                <Col xs="auto">
                                    <div className="bg-warning sw-6 sh-6 rounded-md d-flex justify-content-center align-items-center">
                                        <CsLineIcons icon="eye" className="text-white" />
                                    </div>
                                </Col>
                                <Col className="sh-6 ps-3 d-flex flex-column justify-content-center">
                                    <div className="heading mb-0 d-flex align-items-center lh-1-25 text-warning">Pending</div>
                                    <Row className="g-0">
                                        <Col xs="auto">
                                            <div className="cta-2 text-primary">12</div>
                                        </Col>

                                    </Row>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
                <Col lg="6" xxl="3">
                    <Card>
                        <Card.Body>
                            <Row className="g-0 align-items-center">
                                <Col xs="auto">
                                    <div className="bg-success sw-6 sh-6 rounded-md d-flex justify-content-center align-items-center">
                                        <CsLineIcons icon="eye" className="text-white" />
                                    </div>
                                </Col>
                                <Col className="sh-6 ps-3 d-flex flex-column justify-content-center">
                                    <div className="heading mb-0 d-flex align-items-center lh-1-25 text-success">Approved</div>
                                    <Row className="g-0">
                                        <Col xs="auto">
                                            <div className="cta-2 text-primary">66</div>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
                <Col lg="6" xxl="3">
                    <Card>
                        <Card.Body>
                            <Row className="g-0 align-items-center">
                                <Col xs="auto">
                                    <div className="bg-danger sw-6 sh-6 rounded-md d-flex justify-content-center align-items-center">
                                        <CsLineIcons icon="eye" className="text-white" />
                                    </div>
                                </Col>
                                <Col className="sh-6 ps-3 d-flex flex-column justify-content-center">
                                    <div className="heading mb-0 d-flex align-items-center lh-1-25 text-danger">Declined</div>
                                    <Row className="g-0">
                                        <Col xs="auto">
                                            <div className="cta-2 text-primary">284</div>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default StatsPercentages;
