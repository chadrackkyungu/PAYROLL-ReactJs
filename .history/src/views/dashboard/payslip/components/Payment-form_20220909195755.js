/* eslint-disable prettier/prettier */
import React from 'react'
import { Row, Col, Card } from 'react-bootstrap';

function PaymentForm() {
    return (
        <div>
            <Card className="mt-4">
                <Card.Body>
                    <h5 className='mb-5'> <b> Pay me now</b>  </h5>
                    <Row>
                        <Col md={2}>
                            <div className="sh-10 me-1 mb-1 d-inline-block">
                                <img src="https://www.forbes.com/advisor/wp-content/uploads/2019/06/DebitCardStandard-e1560523069690.jpg" alt="user" className="img-fluid-height rounded-md" />
                            </div>
                        </Col>

                        <Col md={6}>
                            <p>jk</p>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </div>
    )
}

export default PaymentForm