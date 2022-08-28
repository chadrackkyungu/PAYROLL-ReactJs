/* eslint-disable prettier/prettier */
import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import CsLineIcons from 'cs-line-icons/CsLineIcons';
import { Link } from "react-router-dom"
import { cardData } from "./data";

const StatsPercentages = () => {
    return (
        <div>
            <Row className="g-2">
                {
                    cardData.map((card, i) =>
                        <Col lg="6" xxl="3" key={i}>
                            <Card>
                                <Card.Body>
                                    <Row className="g-0 align-items-center">
                                        <Col xs="auto">
                                            <Link to={`${card.link}`} className={`bg-${card.color} sw-6 sh-6 rounded-md d-flex justify-content-center align-items-center`}>
                                                <CsLineIcons icon="eye" className="text-white" />
                                            </Link>
                                        </Col>
                                        <Col className="sh-6 ps-3 d-flex flex-column justify-content-center">
                                            <div className={`heading mb-0 d-flex align-items-center lh-1-25 text-${card.color}`}>{card.name}</div>

                                            <Row className="g-0">
                                                <Col xs="auto">
                                                    <div className={`cta-2 text-${card.color}`}>{card.number}</div>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Card>
                        </Col>
                    )
                }

            </Row>
        </div>
    );
};

export default StatsPercentages;
