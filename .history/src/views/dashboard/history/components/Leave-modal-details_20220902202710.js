/* eslint-disable prettier/prettier */
import React from 'react'
import { Row, Col, Card } from 'react-bootstrap';

function LeaveModalDetails(props) {
    const { leaves, id } = props

    const leave = leaves.filter(lv => { return lv.id === id })
    const leaveObj = Object.assign(...leave);
    console.log("  ", leaveObj);

    console.log(leaves, id);

    return (
        <Card>
            <Row>
                <Col md={6}>
                    <p>Leave Start Date</p>
                    <small>{leaveObj.leaveStartDate}</small>
                </Col>
                <Col md={6}>
                    <p>Leave End Date</p>
                    <small>{leaveObj.leaveEndDate}</small>
                </Col>
            </Row>
            <Row>
                <Col md={12}>
                    <p>Leave Type : <small>{leaveObj.leaveType}</small></p>
                </Col>
            </Row>
        </Card>
    )
}

export default LeaveModalDetails