/* eslint-disable prettier/prettier */
import React from 'react';
import { Card, Col, Row, Badge } from 'react-bootstrap';
import CsLineIcons from 'cs-line-icons/CsLineIcons';

const StatsPercentages = () => {
    return (
        <div>
            <Row className="g-2">
                <Col lg="6" xxl="3">
                    <Card>
                        <Card.Body>
                            <Row className="g-0 align-items-center">
                                <Col xs="auto">
                                    <div className="bg-gradient-light sw-6 sh-6 rounded-md d-flex justify-content-center align-items-center">
                                        <CsLineIcons icon="loaf" className="text-white" />
                                    </div>
                                </Col>
                                <Col className="sh-6 ps-3 d-flex flex-column justify-content-center">
                                    <div className="heading mb-0 d-flex align-items-center lh-1-25">Orders</div>
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
                                    <div className="bg-gradient-light sw-6 sh-6 rounded-md d-flex justify-content-center align-items-center">
                                        <CsLineIcons icon="loaf" className="text-white" />
                                    </div>
                                </Col>
                                <Col className="sh-6 ps-3 d-flex flex-column justify-content-center">
                                    <div className="heading mb-0 d-flex align-items-center lh-1-25">Views</div>
                                    <Row className="g-0">
                                        <Col xs="auto">
                                            <div className="cta-2 text-primary">12%</div>
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
                                    <div className="bg-gradient-light sw-6 sh-6 rounded-md d-flex justify-content-center align-items-center">
                                        <CsLineIcons icon="loaf" className="text-white" />
                                    </div>
                                </Col>
                                <Col className="sh-6 ps-3 d-flex flex-column justify-content-center">
                                    <div className="heading mb-0 d-flex align-items-center lh-1-25">Views</div>
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
                                    <div className="bg-gradient-light sw-6 sh-6 rounded-md d-flex justify-content-center align-items-center">
                                        <CsLineIcons icon="loaf" className="text-white" />
                                    </div>
                                </Col>
                                <Col className="sh-6 ps-3 d-flex flex-column justify-content-center">
                                    <div className="heading mb-0 d-flex align-items-center lh-1-25">Views</div>
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
