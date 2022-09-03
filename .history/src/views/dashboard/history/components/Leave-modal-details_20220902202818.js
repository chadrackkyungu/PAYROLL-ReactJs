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
            <Row className="mb-5">
                <Col md={6}>
                    <p>Leave Start Date</p>
                    <small>{leaveObj.leaveStartDate}</small>
                </Col>
                <Col md={6}>
                    <p>Leave End Date</p>
                    <small>{leaveObj.leaveEndDate}</small>
                </Col>
            </Row>
            <p>Leave Type : <small>{leaveObj.leaveType}</small></p>
            <p> {leaveObj.message} </p>

        </Card>
    )
}

export default LeaveModalDetails