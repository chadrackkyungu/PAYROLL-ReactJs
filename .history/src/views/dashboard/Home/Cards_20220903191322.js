/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Card, Col, Row } from 'react-bootstrap';
import CsLineIcons from 'cs-line-icons/CsLineIcons';

const Cards = () => {

    const { currentUser } = useSelector((state) => state.auth);
    const token = currentUser?.token;
    const [paySlip, setPayslip] = useState();

    const getPayslip = async () => {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${token}`);

        const requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch("http://localhost:5000/api/v1/payments/me", requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result.data.leaves);
                setPayslip(result.data.leaves)
            })
            .catch(error => console.log('error', error));
    }
    useEffect(() => {
        getPayslip();
    }, []);

    // const salary = paySlip.map(pay => pay.salaryAmount)
    // const overtimeSalary = paySlip.map(pay => pay.overTimeAmount)
    // const addSalary = salary.reduce((a, b) => a + b);
    // const addOvertime = overtimeSalary.reduce((a, b) => a + b);
    // const totalPayment = addSalary + addOvertime;

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
                                <div className="display-5 text-primary"> R { }</div>
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