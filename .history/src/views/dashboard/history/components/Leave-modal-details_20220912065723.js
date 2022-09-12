/* eslint-disable prettier/prettier */
import React from 'react'
import { Row, Col, Card } from 'react-bootstrap';

function LeaveModalDetails(props) {
    const { leaves, id } = props

    const leave = leaves.filter(lv => { return lv.id === id })
    const leaveObj = Object.assign(...leave);

    console.log(leaves, id);

    return (
        <div>
            <Row className="mb-3">
                <Col md={6}>
                    <p className="text-primary"> <b> Leave Start Date </b> </p>
                    <small>{leaveObj.leaveStartDate}</small>
                </Col>
                <Col md={6}>
                    <p className="text-primary"> <b> Leave End Date </b> </p>
                    <small>{leaveObj.leaveEndDate}</small>
                </Col>
            </Row>
            <p> <b className="text-primary"> Leave Type : </b>  <small>{leaveObj.leaveType}</small></p>

            <b className="mb-2 text-primary"> Description : </b>
            <p> {leaveObj.message} </p>

        </div>
    )
}

export default LeaveModalDetails