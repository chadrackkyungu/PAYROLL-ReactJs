/* eslint-disable prefer-object-spread */
/* eslint-disable prettier/prettier */
import React from 'react'
import { Row, Col } from 'react-bootstrap';

function EmployeesDetails({ details }) {


    return (
        <div>
            <Row>
                <Col md={6}>
                    <h4 className="text-primary"> Personal Details </h4>
                    <p> Employee Full name : {details[0].firstName} {details[0].lastName} </p>
                    <p> ID Number : {details[0].IdNumber} </p>
                    <p> Phone Number : {details[0].phoneNumber} </p>
                    <p>  Gender : {details[0].gender},  Language : {details[0].language}</p>
                    <p> {details[0].dateOfBirth} </p>
                </Col>
                <Col md={6}>
                    <h4 className="text-primary"> Employee Details </h4>
                    <p> Work Email :  {details[0].email} </p>
                    <p> Role : {details[0].role},  Employee Number : {details[0].employeeNumber} </p>
                    <p> {details[0].startDate} </p>
                </Col>
            </Row>

            <Row>
                <Col md={6}>
                    <h4 className="text-primary"> Address Details </h4>
                    <p> {details[0].city} </p>
                    <p> {details[0].country} </p>
                    <p> {details[0].houseNumber} </p>
                    <p> {details[0].materialStatus} </p>
                    <p> {details[0].streetAddress} </p>
                    <p> {details[0].stateProvince} </p>
                    <p> {details[0].zipCode} </p>
                </Col>
                <Col md={6}>
                    <h4 className="text-primary"> Employee Account Details </h4>
                    <p> {details[0].accountName} </p>
                    <p> {details[0].accountNumber} </p>
                    <p> {details[0].accountType} </p>
                    <p> {details[0].branchName} </p>
                </Col>
            </Row>

        </div>
    )
}

export default EmployeesDetails